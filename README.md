# GenTimes - Modern Technology News Platform

![GenTimes Preview (Light/Dark Mode)](/public/og-image.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Framework: Next.js 16](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org)
[![CMS: Strapi v5](https://img.shields.io/badge/Strapi-v5-purple)](https://strapi.io)
[![Status: Educational](https://img.shields.io/badge/Status-Reference_Project-orange)](https://github.com/dmsda/gentimes)

> A production-grade, national-scale open-source news platform built for the AI era.

**GenTimes** is a reference architecture for building modern, high-performance content platforms. It demonstrates how to combine the flexibility of a Headless CMS (Strapi) with the performance of a cutting-edge Frontend (Next.js App Router).

---

## 🚀 Key Features

### Frontend (Next.js)
- **⚡ Performance First**: LCP < 1.2s, Core Web Vitals optimized via Server Components & ISR.
- **📱 App-Like Experience**: PWA support with offline capability, install prompts, and mobile-first navigation.
- **🎨 Modern Design**: Premium dark mode ecosystem, consistent typography (Inter + Source Serif), and fluid animations.
- **🔍 SEO & Discovery**: AI Overview-optimized structure, JSON-LD schema, and Google News sitemaps.
- **🛡️ Resilience**: Privacy-first analytics, graceful degradation, and hydration-safe architecture.

### Backend (Strapi CMS)
- **📊 Custom Analytics**: Self-hosted dashboard tracking views without PII/Cookies.
- **🔥 Trending Engine**: Automated gravity-based algorithm to rank hot stories.
- **🤖 SEO Assistant**: Real-time content analysis for "AI Readiness" and search ranking.
- **📧 Newsletter**: Integrated double-opt-in subscription system.
- **💬 Community**: Comment system with moderation workflow.

---

## 🛠 Tech Stack

| Component | Technology | Reasoning |
|-----------|------------|-----------|
| **Frontend** | Next.js 16 (App Router) | Best-in-class performance, SEO, and Server Components. |
| **Styling** | Tailwind CSS v4 | Utility-first, responsive, and maintainable styles. |
| **CMS** | Strapi v5 | Headless, extensible, and self-hosted content management. |
| **Database** | SQLite (Dev) / Postgres (Prod) | Reliable relational data storage. |
| **State** | React Server Components | Minimized client-side JavaScript bundle. |

---

## 📂 Repository Structure

The project is structured as a monorepo-lite:

```bash
├── src/                # Frontend source code (Next.js)
│   ├── app/            # App Router pages & API routes
│   ├── components/     # UI Components (Server & Client)
│   └── lib/            # Utilities & Data Fetching
├── cms/                # Backend source code (Strapi)
│   ├── src/api/        # Custom Content Types & Controllers
│   └── config/         # Database & Plugin configuration
├── public/             # Static assets (Images, Icons, SVG)
└── docs/               # Detailed architectural documentation
```

---

## 📖 Documentation

Detailed documentation is available in the `/docs` directory:

- 🏗 **[System Architecture](docs/architecture.md)**: Full system diagram and design patterns.
- 🔍 **[SEO Strategy](docs/seo-strategy.md)**: How we optimize for Google AI Overviews (SGE).
- ⚙️ **[CMS Overview](docs/cms-overview.md)**: Content schemas, workflows, and custom plugins.
- ⚡ **[Performance Notes](docs/performance-notes.md)**: Optimization audit, metrics, and tuning guide.

---

## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- NPM or Yarn

### 1. Clone the Repository
```bash
git clone https://github.com/dmsda/gentimes.git
cd gentimes
```

### 2. Setup Backend (CMS)
```bash
cd cms
npm install
cp .env.example .env
npm run develop
# Strapi will start on http://localhost:1337
```

### 3. Setup Frontend
 Open a new terminal:
```bash
# Return to root
npm install
cp .env.example .env.local
npm run dev
# Frontend will start on http://localhost:3000
```

---

## 👥 Author

**Dimas Aditya**  
*Full Stack Engineer & Open Source Enthusiast*

Designing systems that bridge the gap between performance and user experience.

- 🌐 [GitHub Profile](https://github.com/dmsda)

---

## 🤝 Contributing

Contributions are welcome! This project is intended for educational and reference purposes, but improvements are always appreciated. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
