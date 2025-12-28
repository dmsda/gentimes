/**
 * File Upload Lifecycle Hook
 * 
 * Automatically converts uploaded images to WebP format
 * for optimal web performance.
 */
import fs from 'fs';
import path from 'path';

export default {
  async afterCreate(event: any) {
    const { result } = event;

    // Only process images (not videos, pdfs, etc.)
    if (!result.mime?.startsWith('image/')) {
      return;
    }

    // Skip if already WebP
    if (result.mime === 'image/webp') {
      return;
    }

    // Skip SVG (can't be converted)
    if (result.mime === 'image/svg+xml') {
      return;
    }

    try {
      // Dynamically import sharp (to avoid issues if not installed)
      const sharp = (await import('sharp')).default;

      const uploadDir = path.join(strapi.dirs.static.public, 'uploads');
      const originalPath = path.join(uploadDir, result.hash + result.ext);

      // Check if file exists
      if (!fs.existsSync(originalPath)) {
        strapi.log.warn(`Original file not found: ${originalPath}`);
        return;
      }

      const webpFilename = result.hash + '.webp';
      const webpPath = path.join(uploadDir, webpFilename);

      // Convert to WebP
      await sharp(originalPath)
        .webp({ quality: 85 })
        .toFile(webpPath);

      // Get file stats
      const webpStats = fs.statSync(webpPath);

      // Update database record with WebP info
      await strapi.db.query('plugin::upload.file').update({
        where: { id: result.id },
        data: {
          ext: '.webp',
          mime: 'image/webp',
          size: +(webpStats.size / 1024).toFixed(2), // KB
          url: `/uploads/${webpFilename}`,
        },
      });

      // Delete original file to save space
      if (fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
      }

      // Also convert format variations if they exist
      if (result.formats) {
        for (const [formatName, formatData] of Object.entries(result.formats)) {
          const format = formatData as { hash: string; ext: string; url?: string };
          const formatPath = path.join(uploadDir, format.hash + format.ext);

          if (fs.existsSync(formatPath)) {
            const formatWebpPath = path.join(uploadDir, format.hash + '.webp');

            await sharp(formatPath)
              .webp({ quality: 85 })
              .toFile(formatWebpPath);

            // Delete original format
            fs.unlinkSync(formatPath);

            // Update format info
            format.ext = '.webp';
            format.url = `/uploads/${format.hash}.webp`;
          }
        }

        // Update formats in database
        await strapi.db.query('plugin::upload.file').update({
          where: { id: result.id },
          data: {
            formats: result.formats,
          },
        });
      }

      strapi.log.info(`Converted image to WebP: ${webpFilename}`);
    } catch (error) {
      strapi.log.error('WebP conversion failed:', error);
    }
  },
};
