/**
 * Email Subscription API Route
 * 
 * Handles newsletter subscriptions:
 * 1. Validates email format
 * 2. Creates entry in Strapi CMS
 * 3. Optionally sends confirmation email
 */

import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing subscriber in Strapi
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    };

    const checkParams = new URLSearchParams({
      'filters[email][$eq]': normalizedEmail,
    });

    const checkResponse = await fetch(
      `${STRAPI_URL}/api/subscribers?${checkParams}`,
      { headers }
    );

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      if (checkData.data && checkData.data.length > 0) {
        const existingSubscriber = checkData.data[0];
        if (existingSubscriber.attributes.status === 'active') {
          return NextResponse.json(
            { success: false, message: 'Email already subscribed' },
            { status: 409 }
          );
        }
        // Reactivate if previously unsubscribed
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/subscribers/${existingSubscriber.id}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              data: { status: 'active', subscribedAt: new Date().toISOString() },
            }),
          }
        );

        if (updateResponse.ok) {
          return NextResponse.json({
            success: true,
            message: 'Welcome back! Subscription reactivated.',
          });
        }
      }
    }

    // Create new subscriber
    const createResponse = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          email: normalizedEmail,
          subscribedAt: new Date().toISOString(),
          status: 'active',
        },
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      console.error('Strapi error:', errorData);
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email with Nodemailer
    // await sendConfirmationEmail(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your inbox.',
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
