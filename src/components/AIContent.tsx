/**
 * AI-Friendly Article Components
 * 
 * Components optimized for Google AI Overview extraction.
 * These components provide semantic structure that AI can easily parse and quote.
 */

import React from 'react';

interface ArticleSummaryProps {
  /** What is this article about? */
  topic: string;
  /** Why does it matter? */
  importance: string;
  /** Key takeaway in one sentence */
  takeaway: string;
}

/**
 * ArticleSummary - AI-optimized intro block
 * 
 * This component creates an answer-first introduction that AI can easily extract.
 * It should appear at the very beginning of every article.
 */
export function ArticleSummary({ topic, importance, takeaway }: ArticleSummaryProps) {
  return (
    <div 
      className="mb-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6"
      itemScope
      itemType="https://schema.org/Article"
    >
      <p className="mb-3 text-lg leading-relaxed text-neutral-200">
        <strong className="text-white">{topic}</strong>
      </p>
      <p className="mb-3 text-neutral-300 leading-relaxed">
        {importance}
      </p>
      <p className="text-neutral-400 italic">
        <strong>Key takeaway:</strong> {takeaway}
      </p>
    </div>
  );
}

interface KeyPointsProps {
  title?: string;
  points: string[];
}

/**
 * KeyPoints - Bullet list optimized for AI extraction
 * 
 * AI Overview frequently pulls from bullet lists.
 * Use this for facts, steps, or key information.
 */
export function KeyPoints({ title = 'Key Points', points }: KeyPointsProps) {
  return (
    <aside className="my-8 rounded-lg border border-blue-900/50 bg-blue-950/30 p-6" aria-label={title}>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">
        {title}
      </h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-neutral-300">
            <svg 
              className="mt-1 h-4 w-4 shrink-0 text-blue-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

interface DefinitionProps {
  term: string;
  definition: string;
}

/**
 * Definition - Semantic definition block
 * 
 * Provides clear, quotable definitions that AI can extract.
 * Use for explaining technical terms, concepts, or products.
 */
export function Definition({ term, definition }: DefinitionProps) {
  return (
    <dl className="my-6 rounded-lg border-l-4 border-blue-500 bg-neutral-900/50 p-4">
      <dt className="mb-2 text-lg font-semibold text-white">{term}</dt>
      <dd className="text-neutral-300 leading-relaxed">{definition}</dd>
    </dl>
  );
}

interface ComparisonTableProps {
  title?: string;
  headers: string[];
  rows: string[][];
}

/**
 * ComparisonTable - Structured comparison for AI parsing
 * 
 * Tables are excellent for AI extraction when comparing products,
 * features, or options.
 */
export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  return (
    <figure className="my-8">
      {title && (
        <figcaption className="mb-4 text-sm font-semibold text-neutral-400">
          {title}
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-neutral-950 hover:bg-neutral-900/50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 text-neutral-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

interface TimelineProps {
  events: { date: string; title: string; description?: string }[];
}

/**
 * Timeline - Chronological information display
 * 
 * Good for explaining history, development progress, or future roadmaps.
 */
export function Timeline({ events }: TimelineProps) {
  return (
    <div className="my-8">
      <ol className="relative border-l border-neutral-700">
        {events.map((event, index) => (
          <li key={index} className="mb-6 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {index + 1}
            </span>
            <time className="mb-1 block text-sm font-medium text-blue-400">
              {event.date}
            </time>
            <h4 className="text-lg font-semibold text-white">{event.title}</h4>
            {event.description && (
              <p className="mt-1 text-neutral-400">{event.description}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
  source?: string;
}

/**
 * QuoteBlock - Expert quotes with attribution
 * 
 * Expert quotes add authority and are often cited by AI Overview.
 */
export function QuoteBlock({ quote, author, role, source }: QuoteBlockProps) {
  return (
    <blockquote 
      className="my-8 border-l-4 border-blue-500 pl-6"
      itemScope
      itemType="https://schema.org/Quotation"
    >
      <p className="mb-4 text-lg italic text-neutral-200" itemProp="text">
        "{quote}"
      </p>
      <footer className="text-sm text-neutral-400">
        <cite itemProp="creator" className="not-italic">
          <span className="font-semibold text-neutral-300">{author}</span>
          {role && <span>, {role}</span>}
        </cite>
        {source && (
          <span className="ml-2">— {source}</span>
        )}
      </footer>
    </blockquote>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItemProps[];
}

/**
 * FAQSection - Question/Answer format for AI extraction
 * 
 * FAQ format is highly favorable for AI Overview as it provides
 * direct question-answer pairs.
 */
export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="my-8" aria-label="Frequently Asked Questions">
      <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
      <dl className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-6"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <dt 
              className="mb-3 text-lg font-semibold text-white"
              itemProp="name"
            >
              {faq.question}
            </dt>
            <dd 
              className="text-neutral-300 leading-relaxed"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{faq.answer}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
