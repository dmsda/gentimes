// Mock data for GenTimes Tech News Website

import { Article, Author, Category } from './types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/authors/sarah.jpg',
    role: 'Senior Tech Editor',
    bio: 'Covering AI and emerging technologies for over a decade.',
  },
  {
    id: '2',
    name: 'Marcus Williams',
    avatar: '/authors/marcus.jpg',
    role: 'Gadgets Correspondent',
    bio: 'Hardware enthusiast and consumer tech reviewer.',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: '/authors/elena.jpg',
    role: 'Startup Reporter',
    bio: 'Tracking the next big thing in Silicon Valley and beyond.',
  },
  {
    id: '4',
    name: 'James Park',
    avatar: '/authors/james.jpg',
    role: 'Software Analyst',
    bio: 'Deep dives into software trends and developer tools.',
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', color: '#3B82F6' },
  { id: '2', name: 'AI', slug: 'ai', color: '#8B5CF6' },
  { id: '3', name: 'Gadgets', slug: 'gadgets', color: '#F59E0B' },
  { id: '4', name: 'Internet', slug: 'internet', color: '#10B981' },
  { id: '5', name: 'Software', slug: 'software', color: '#EC4899' },
  { id: '6', name: 'Startups', slug: 'startups', color: '#EF4444' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Rise of Quantum Computing: What It Means for the Future of Technology',
    slug: 'rise-of-quantum-computing-future-technology',
    excerpt: 'Quantum computers are no longer science fiction. Here\'s how they\'re reshaping industries from drug discovery to cryptography.',
    content: `
## The Quantum Revolution Is Here

For decades, quantum computing existed only in research labs and the imaginations of physicists. Today, it's becoming a practical reality that promises to revolutionize everything from medicine to finance.

### Understanding Quantum Advantage

Unlike classical computers that process information in binary bits (0s and 1s), quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously. This property, known as superposition, allows quantum computers to process exponentially more information.

"We're witnessing the dawn of a new computational era," says Dr. Maria Santos, lead researcher at the Quantum Computing Institute. "Problems that would take classical computers millions of years can now be solved in hours."

### Real-World Applications

**Drug Discovery**: Pharmaceutical companies are using quantum simulations to model molecular interactions, potentially cutting drug development time from years to months.

**Financial Modeling**: Banks are exploring quantum algorithms for risk assessment and portfolio optimization.

**Cryptography**: While quantum computers pose a threat to current encryption methods, they also enable new, unbreakable quantum encryption protocols.

### The Road Ahead

Despite the promise, significant challenges remain. Qubits are extremely fragile, requiring temperatures near absolute zero to function. Error rates are still high, and scaling up remains difficult.

However, tech giants like IBM, Google, and Microsoft are investing billions in overcoming these hurdles. Many experts predict practical quantum advantage in specific applications within the next five years.

As we stand at this technological crossroads, one thing is clear: the quantum future is not a matter of if, but when.
    `,
    featuredImage: 'https://picsum.photos/seed/quantum/1200/630',
    category: categories[0],
    author: authors[0],
    publishedAt: '2024-12-27T08:00:00Z',
    readingTime: 8,
    tags: ['quantum computing', 'future tech', 'innovation'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'GPT-5 and the Next Generation of AI Assistants',
    slug: 'gpt-5-next-generation-ai-assistants',
    excerpt: 'OpenAI\'s upcoming model promises unprecedented reasoning capabilities. We explore what this means for the future of work.',
    content: `
## The Evolution of Language Models

The AI landscape is about to shift dramatically with the anticipated release of GPT-5. Building on the success of its predecessors, this new model represents a quantum leap in artificial intelligence capabilities.

### What Makes GPT-5 Different

Early reports suggest GPT-5 features significant improvements in:

- **Reasoning**: More sophisticated logical thinking and problem-solving
- **Memory**: Extended context windows enabling longer conversations
- **Multimodality**: Native understanding of text, images, audio, and video
- **Reliability**: Reduced hallucinations and improved factual accuracy

### Impact on Industries

From healthcare to legal services, the implications are profound. AI assistants powered by next-generation models could handle increasingly complex tasks, fundamentally changing how professionals work.
    `,
    featuredImage: 'https://picsum.photos/seed/ai-assistant/1200/630',
    category: categories[1],
    author: authors[0],
    publishedAt: '2024-12-26T14:00:00Z',
    readingTime: 6,
    tags: ['AI', 'GPT-5', 'OpenAI', 'machine learning'],
  },
  {
    id: '3',
    title: 'Apple Vision Pro 2: Everything We Know So Far',
    slug: 'apple-vision-pro-2-everything-we-know',
    excerpt: 'The next iteration of Apple\'s spatial computer is expected to be lighter, more powerful, and more affordable.',
    content: `
## Apple's Vision for the Future

Apple's Vision Pro marked the company's bold entry into spatial computing. Now, rumors are swirling about its successor, promising to address many of the first generation's limitations.

### Expected Improvements

- **Weight Reduction**: Sources suggest a 30% lighter design
- **M4 Chip**: Enhanced performance with the latest Apple silicon
- **Price Point**: A potential $2,499 starting price, down from $3,499
- **Battery Life**: Improved external battery with 4+ hours of use

### Release Timeline

Industry analysts predict a late 2025 or early 2026 release, giving Apple time to refine the platform and expand visionOS capabilities.
    `,
    featuredImage: 'https://picsum.photos/seed/vision-pro/1200/630',
    category: categories[2],
    author: authors[1],
    publishedAt: '2024-12-26T10:00:00Z',
    readingTime: 5,
    tags: ['Apple', 'Vision Pro', 'AR', 'VR', 'spatial computing'],
  },
  {
    id: '4',
    title: 'The Death of the Traditional Web Browser',
    slug: 'death-of-traditional-web-browser',
    excerpt: 'AI-powered browsing experiences are challenging the decades-old paradigm of tabs and URLs.',
    content: `
## A New Era of Web Navigation

For over two decades, web browsers have remained fundamentally unchanged: address bar, tabs, back button. But a new wave of AI-native browsers is reimagining how we interact with the web.

### The AI Browser Revolution

Companies like Arc, Opera, and even newcomers like Browser Company are integrating AI directly into the browsing experience. Instead of managing dozens of tabs, users can now ask their browser to find, summarize, and act on information.

### What's Changing

- **Semantic Search**: Find content by meaning, not keywords
- **Automatic Organization**: AI categorizes and manages your browsing
- **Action-Oriented**: Browsers that do tasks, not just display pages
    `,
    featuredImage: 'https://picsum.photos/seed/browser/1200/630',
    category: categories[3],
    author: authors[3],
    publishedAt: '2024-12-25T16:00:00Z',
    readingTime: 4,
    tags: ['internet', 'browsers', 'AI', 'web'],
  },
  {
    id: '5',
    title: 'Why Rust Is Becoming the Language of the Future',
    slug: 'rust-programming-language-future',
    excerpt: 'Memory safety, performance, and developer happiness are driving Rust\'s meteoric rise.',
    content: `
## The Rise of Rust

Once considered a niche language for systems programming, Rust has exploded in popularity, now powering critical infrastructure at companies like Microsoft, Amazon, and Meta.

### Why Developers Love Rust

- **Memory Safety**: Eliminates entire classes of bugs at compile time
- **Performance**: Matches C/C++ while being much safer
- **Modern Tooling**: Cargo package manager sets the standard
- **Community**: One of the most welcoming programming communities

### Adoption Trends

Rust has topped Stack Overflow's "most loved language" survey for eight consecutive years. Major projects like the Linux kernel are now accepting Rust contributions.
    `,
    featuredImage: 'https://picsum.photos/seed/rust/1200/630',
    category: categories[4],
    author: authors[3],
    publishedAt: '2024-12-25T12:00:00Z',
    readingTime: 7,
    tags: ['programming', 'Rust', 'software development'],
  },
  {
    id: '6',
    title: 'Y Combinator\'s Top 10 Startups to Watch in 2025',
    slug: 'y-combinator-top-startups-2025',
    excerpt: 'From AI infrastructure to climate tech, these companies are poised to define the next era of innovation.',
    content: `
## The Next Wave of Innovation

Y Combinator has been the launchpad for companies like Airbnb, Stripe, and DoorDash. As we enter 2025, a new batch of startups is capturing investor attention and tackling the world's biggest problems.

### The Top 10

1. **Nexus AI** - Enterprise AI infrastructure
2. **CarbonScale** - Carbon capture optimization
3. **NeuroLink Health** - AI-powered diagnostics
4. **QuantumSecure** - Post-quantum cryptography
5. **SynthBio** - Synthetic biology platform

And five more companies pushing the boundaries of what's possible in healthcare, finance, and sustainability.

### What Sets Them Apart

These startups share common traits: exceptional technical founders, clear market opportunities, and business models designed for the AI era.
    `,
    featuredImage: 'https://picsum.photos/seed/startups/1200/630',
    category: categories[5],
    author: authors[2],
    publishedAt: '2024-12-24T09:00:00Z',
    readingTime: 9,
    tags: ['startups', 'Y Combinator', 'venture capital'],
  },
  {
    id: '7',
    title: 'The Complete Guide to Building with Next.js 15',
    slug: 'complete-guide-nextjs-15',
    excerpt: 'Server Components, App Router, and everything you need to know about the latest Next.js release.',
    content: `
## Next.js 15: A Developer's Guide

Next.js 15 represents a major evolution in React development, with improved performance, enhanced DX, and exciting new features.

### Key Features

- **Turbopack Stable**: Lightning-fast builds in development
- **Partial Pre-rendering**: Best of static and dynamic
- **Server Actions**: Simplified data mutations
- **Improved Caching**: More predictable and configurable

### Best Practices

This comprehensive guide walks through architecture patterns, optimization techniques, and real-world examples to help you build production-ready applications.
    `,
    featuredImage: 'https://picsum.photos/seed/nextjs/1200/630',
    category: categories[4],
    author: authors[3],
    publishedAt: '2024-12-24T14:00:00Z',
    readingTime: 12,
    tags: ['Next.js', 'React', 'web development'],
  },
  {
    id: '8',
    title: 'Samsung Galaxy S25 Ultra: Leaked Specs and Features',
    slug: 'samsung-galaxy-s25-ultra-leaked-specs',
    excerpt: 'Major camera upgrades, AI features, and a new design language are expected in Samsung\'s next flagship.',
    content: `
## Samsung's Next Flagship

The Galaxy S25 Ultra is shaping up to be Samsung's most ambitious smartphone yet, with leaked specifications pointing to significant upgrades across the board.

### Expected Specifications

- **Display**: 6.9" Dynamic AMOLED with improved brightness
- **Processor**: Snapdragon 8 Gen 4 for Galaxy
- **Camera**: New 200MP sensor with revolutionary AI processing
- **Battery**: 5,500mAh with 65W charging

### AI-First Approach

Samsung is reportedly doubling down on Galaxy AI features, with on-device processing for real-time translation, photo enhancement, and productivity tools.
    `,
    featuredImage: 'https://picsum.photos/seed/samsung/1200/630',
    category: categories[2],
    author: authors[1],
    publishedAt: '2024-12-23T11:00:00Z',
    readingTime: 5,
    tags: ['Samsung', 'Android', 'smartphones'],
  },
  {
    id: 'sponsored-1',
    title: 'How CloudScale Reduced Their Infrastructure Costs by 60%',
    slug: 'cloudscale-infrastructure-costs-case-study',
    excerpt: 'A deep dive into modern cloud optimization strategies that deliver real results.',
    content: `
## Transforming Cloud Economics

CloudScale, a growing SaaS company, faced a common challenge: rapidly increasing infrastructure costs as their user base expanded. Here's how they achieved dramatic savings.

### The Challenge

Like many startups, CloudScale's cloud spending was growing faster than revenue. They needed a solution that wouldn't compromise performance.

### The Solution

Through a combination of right-sizing, reserved instances, and intelligent auto-scaling, CloudScale transformed their cloud economics.

*This article is sponsored content from our partners.*
    `,
    featuredImage: 'https://picsum.photos/seed/cloud/1200/630',
    category: categories[0],
    author: authors[0],
    publishedAt: '2024-12-27T06:00:00Z',
    readingTime: 4,
    tags: ['cloud', 'infrastructure', 'cost optimization'],
    isSponsored: true,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((article) => article.category.slug === categorySlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.isFeatured);
}

export function getTrendingArticles(limit: number = 5): Article[] {
  return articles
    .filter((article) => !article.isSponsored)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getSponsoredArticle(): Article | undefined {
  return articles.find((article) => article.isSponsored);
}
