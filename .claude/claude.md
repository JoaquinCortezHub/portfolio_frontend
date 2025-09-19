# claude.md — Project Context for Claude

> Purpose: Provide Claude (or any assistant) clear, actionable context about this AI/ML portfolio project, its design principles, architecture, coding conventions, and optimization strategies for maintenance, feature development, debugging, and PR reviews.

---

## 1) Project Overview

**Project name:** Portfolio Frontend (Joaquin Cortez | AI & ML)

**Description:** A modern, performance-optimized personal portfolio website showcasing AI and ML expertise. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a comprehensive component library, Sanity CMS integration, and adherence to industry-best frontend practices.

**Primary goals:**
- Present professional portfolio (projects, services, about, blog, contact)
- Demonstrate AI/ML expertise and business capabilities
- Provide seamless user experience with optimal performance
- Showcase technical proficiency through clean, scalable architecture

**Technology stack:**
- **Framework:** Next.js 15.2.4 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1.9 with custom animations
- **CMS:** Sanity (next-sanity 10.0.10)
- **UI Components:** Radix UI primitives + shadcn/ui
- **Forms:** React Hook Form with Zod validation
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React
- **Deployment:** Vercel (auto-synced with v0.dev)

---

## 2) Design Principles & Architecture

This project follows **industry-best practices** as outlined in the context documentation:

### Core Design Principles
- **Users first:** Minimal cognitive load, predictable flows, clear feedback
- **Accessibility by default:** WCAG AA compliance, semantic HTML, keyboard navigation
- **Performance-driven:** Optimized Core Web Vitals (LCP < 2.5s, minimal CLS, low INP)
- **Component-driven:** Atomic Design methodology with reusable, composable components
- **Responsive & mobile-first:** Fluid layouts tested across all breakpoints

### Landing Page Strategy
- **Hero section:** Clear value proposition + primary CTA (benefit-first messaging)
- **Feature highlights:** Interactive demos and visual proof of capabilities
- **Social proof:** Testimonials, case studies, and trust signals
- **Progressive disclosure:** Complex features revealed on demand
- **Performance optimization:** Preloaded hero assets, optimized images, minimal JS

### SEO & Technical Standards
- **Static Generation (SSG)** for optimal SEO and performance
- **Structured data (JSON-LD)** for rich search results
- **Clean URLs** and proper meta tags per page
- **Sitemap generation** and canonical tags
- **Mobile optimization** and fast loading speeds

---

## 3) Development Workflow

### Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Environment Variables
Required environment variables for Sanity CMS:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=931obkaz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Code Quality Standards
- **Formatting:** Prettier + ESLint integration
- **Type checking:** Strict TypeScript configuration
- **Performance:** Bundle analysis and Core Web Vitals monitoring
- **Accessibility:** Automated testing with axe-core and manual keyboard testing

---

## 4) Project Structure

```
portfolio_frontend/
├── .claude/                    # Claude-specific config and context
├── app/                        # Next.js App Router
│   ├── api/                   # API routes (services, posts)
│   ├── components/            # Page-specific components
│   ├── services/[slug]/       # Dynamic service pages
│   ├── globals.css           # Global styles and Tailwind directives
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page component structure
├── components/                # Shared component library
│   ├── ui/                   # Base UI components (shadcn/ui)
│   └── theme-provider.tsx    # Theme management
├── context/                   # Design principles and guidelines
├── hooks/                     # Custom React hooks
├── lib/                      # Utilities and helpers
├── public/                   # Static assets
├── sanity/                   # Sanity CMS configuration
└── [config files]           # TypeScript, Tailwind, Next.js config
```

### Key Architecture Decisions
- **App Router:** Leverages Next.js 15 App Router for optimal performance and SEO
- **Component separation:** Clear distinction between layout, UI, and page components
- **CMS integration:** Headless Sanity CMS for dynamic content management
- **Utility-first CSS:** Tailwind for consistent design system and rapid development
- **Type safety:** Full TypeScript coverage with strict configuration

---

## 5) Component Guidelines & Patterns

### UI Component Architecture
- **Base components:** Located in `components/ui/` (buttons, forms, navigation)
- **Compound components:** Built from base components for specific features
- **Page components:** Feature-specific components in `app/components/`

### Coding Conventions
- **Naming:** PascalCase for components, camelCase for functions/variables
- **Props:** TypeScript interfaces for all component props
- **State management:** Local state with hooks, server state with Sanity client
- **Error handling:** Error boundaries and graceful degradation

### Styling Patterns
- **Utility-first:** Tailwind classes for rapid development
- **Component variants:** Class Variance Authority (CVA) for dynamic styling
- **Responsive design:** Mobile-first approach with Tailwind breakpoints
- **Dark mode:** Theme provider with system preference detection

---

## 6) Content Management & Data Flow

### Sanity CMS Integration
- **Client configuration:** `sanity/client.ts` with environment-based settings
- **Content types:** Projects, services, blog posts, and portfolio data
- **API routes:** Server-side data fetching in `app/api/`
- **Static generation:** Pre-built pages with ISR for content updates

### Data Fetching Strategy
- **Server Components:** Default for SEO and performance
- **Client Components:** For interactive features and real-time updates
- **API routes:** Backend logic for data processing and validation

---

## 7) Performance & SEO Optimization

### Performance Targets
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **Cumulative Layout Shift (CLS):** < 0.1
- **Interaction to Next Paint (INP):** < 200ms

### Optimization Techniques
- **Image optimization:** Next.js Image component with responsive sizing
- **Code splitting:** Dynamic imports for heavy components
- **Static generation:** Pre-built HTML for all public pages
- **Critical CSS:** Inlined above-the-fold styles

### SEO Implementation
- **Meta tags:** Dynamic metadata per page
- **Structured data:** JSON-LD for portfolio and service content
- **Sitemap:** Automated generation with content updates
- **Clean URLs:** Semantic routing structure

---

## 8) Claude Interaction Guidelines

When working with this codebase, Claude should:

### Code Modifications
1. **Preserve design system:** Follow existing Tailwind patterns and component structure
2. **Maintain type safety:** Update TypeScript interfaces when changing data shapes
3. **Follow conventions:** Match existing naming, export styles, and architectural patterns
4. **Test accessibility:** Ensure keyboard navigation and screen reader compatibility

### Adding Features
1. **Start with planning:** Use TodoWrite tool for complex multi-step tasks
2. **Check existing patterns:** Review similar components before creating new ones
3. **Consider performance:** Implement lazy loading and optimization strategies
4. **Update documentation:** Reflect changes in relevant context files

### Debugging Approach
1. **Check console errors:** Look for TypeScript, runtime, and accessibility issues
2. **Verify data flow:** Ensure Sanity client configuration and API responses
3. **Test responsiveness:** Validate across mobile, tablet, and desktop breakpoints
4. **Performance audit:** Run Lighthouse and Core Web Vitals checks

### Code Review Focus
- **Component reusability:** Ensure components follow atomic design principles
- **Performance impact:** Check bundle size and runtime performance
- **Accessibility compliance:** Verify WCAG guidelines and keyboard navigation
- **SEO optimization:** Confirm proper meta tags and structured data

---

## 9) Common Tasks & Examples

### Adding a New Component
```typescript
// components/ui/new-component.tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  children: React.ReactNode
  className?: string
}

export function NewComponent({ variant, className, children }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant }), className)}>
      {children}
    </div>
  )
}
```

### Adding a New Page Section
```typescript
// app/components/new-section.tsx
import { client } from "@/sanity/client"

interface SectionData {
  title: string
  content: string
  // Add proper types based on Sanity schema
}

async function fetchSectionData(): Promise<SectionData> {
  // GROQ query to fetch data from Sanity
  return client.fetch(`*[_type == "sectionType"][0]`)
}

export default async function NewSection() {
  const data = await fetchSectionData()

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">{data.title}</h2>
        <p className="text-lg text-gray-300">{data.content}</p>
      </div>
    </section>
  )
}
```

---

## 10) Quality Checklist

Before shipping any changes:

### Visual & UX
- [ ] Responsive design tested on mobile, tablet, desktop (375px, 768px, 1440px)
- [ ] Dark mode compatibility (if applicable)
- [ ] Loading states and error handling
- [ ] Micro-interactions and animations respect `prefers-reduced-motion`

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals within target ranges
- [ ] Images optimized with proper alt text
- [ ] Bundle size impact analyzed

### Code Quality
- [ ] TypeScript compilation without errors
- [ ] ESLint passing without warnings
- [ ] Component props properly typed
- [ ] Error boundaries in place for fallbacks

### Accessibility
- [ ] Keyboard navigation functional end-to-end
- [ ] Screen reader compatibility tested
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Focus indicators visible and logical

---

## 11) Deployment & Monitoring

### Vercel Integration
- **Automatic deployments:** Connected to GitHub repository
- **Preview deployments:** Available for all pull requests
- **Analytics:** Core Web Vitals monitoring in production
- **Edge functions:** API routes optimized for global performance

### Content Management
- **Sanity Studio:** Separate instance for content editing
- **Incremental Static Regeneration:** Automatic updates when content changes
- **Preview mode:** Draft content preview for editors

---

## 12) References & Resources

- **Design System:** Based on shadcn/ui and Radix UI primitives
- **Performance:** Web.dev Core Web Vitals guidance
- **Accessibility:** WCAG 2.1 AA guidelines
- **SEO:** Next.js SEO best practices
- **React Patterns:** Documented in `context/framework-guideline.md`

---

*This document serves as the single source of truth for project context, architecture decisions, and development guidelines. Keep it updated as the project evolves.*
