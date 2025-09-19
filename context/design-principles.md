# Industry Best Web Design & Frontend Practices

This document serves as context for Claude Code agents. It outlines **UX/UI principles, frontend architecture patterns, best practices, common mistakes, and always-have-in-mind considerations** for building modern, scalable, and user-friendly web applications.

---

## Top-level Principles

- **Users first**: reduce cognitive load, provide feedback, keep flows predictable.  
- **Accessibility by default**: follow WCAG POUR principles (Perceivable, Operable, Understandable, Robust).  
- **Fast & reliable**: optimize Core Web Vitals (LCP, CLS, INP).  
- **Systematic UI**: build with a component-driven design system (Atomic Design).  
- **Architect for teams**: pick patterns that match your team size and release needs.

---

## Best UX / UI Practices

### Heuristics & Cognitive Load

- Follow Nielsen’s usability heuristics (system status, error prevention, minimalist design, etc.).  
- Favor **recognition over recall** — use familiar patterns and terminology.  

### Accessibility

- Aim for WCAG **AA** compliance.  
- Use semantic HTML, keyboard navigation, correct ARIA attributes, and proper contrast ratios.  
- Automate accessibility checks with tools like axe-core, Pa11y, or Lighthouse.  

### Performance as UX

- Optimize **Largest Contentful Paint (LCP)**, avoid **Cumulative Layout Shift (CLS)**, and reduce input delay.  
- Techniques: responsive images, code-splitting, critical CSS, deferred JS.  

### Responsive & Mobile-first

- Design for mobile first.  
- Use fluid layouts and test at multiple breakpoints.  

### Motion & Micro-interactions

- Use subtle animations to communicate state (loading, success, error).  
- Respect "reduce motion" user preference.  

### Visual Hierarchy & Typography

- Use spacing, scale, and contrast to indicate importance.  
- Keep typography readable: good line-height, limited fonts, and consistent sizing.  

### Error Handling & Feedback

- Provide inline validation and actionable recovery steps.  
- Errors should guide, not frustrate.

---

## Best Frontend Architecture Patterns

### Component-driven Development

- Use **Atomic Design**: atoms → molecules → organisms → templates → pages.  
- Document components with **Storybook** (or similar).  

### Layered Separation of Concerns

- Split **presentational components** (UI only) and **container components** (data/state logic).  

### State Management

- Prefer local state (hooks).  
- Use libraries like **React Query / SWR** for server state.  
- Use global state only when necessary (Context, Zustand, Redux Toolkit).  

### Rendering Modes

- Choose SSR/SSG/ISR for SEO and initial load performance.  
- CSR for highly interactive sections.  

### Monorepo vs Multi-repo

- Monorepo with workspaces (pnpm, Turborepo, Nx) for shared components and DX.  
- Multi-repo only when teams are fully autonomous.  

### Micro-frontends (large orgs only)

- Enable independent deployments (module federation, server composition).  
- Be aware: adds complexity and coordination overhead.  

### Build & CI

- Incremental builds, caching, lint/type checks.  
- Automate accessibility, visual regression, and performance tests.

---

## Best Design Patterns & Practices

### Components & Styling

- Keep components small and composable.  
- Apply consistent naming (BEM, utility-first, or CSS Modules).  
- Centralize tokens (colors, spacing, typography).  

### API & Data Layer

- Abstract API calls in `lib/api` or custom hooks.  
- Handle errors, retries, and authentication consistently.  

### Security & Privacy

- Never expose secrets in client code.  
- Use HTTP-only cookies or secure tokens for auth.  
- Validate and sanitize server inputs.  

### Testing

- **Unit**: Jest/Vitest for logic and components.  
- **Integration**: React Testing Library.  
- **E2E**: Playwright/Cypress.  
- **Visual regression**: Percy, Chromatic, or Playwright snapshots.  

---

## Common Beginner Mistakes

1. Ignoring accessibility.  
2. Shipping large, bloated bundles.  
3. No design system or inconsistent UI.  
4. Overusing frameworks/libraries unnecessarily.  
5. Hardcoding content (no i18n support).  
6. Skipping tests and CI.  
7. Poor image handling (no optimization, missing sizes).  
8. Ignoring Core Web Vitals.  

---

## Always-have-in-mind Considerations

- **Accessibility**: test with screen readers and keyboard navigation.  
- **Performance**: set budgets (e.g. ≤150KB JS initial load).  
- **Scalability**: establish patterns early for components and state.  
- **Developer Experience**: enforce lint/format/type-checks, document conventions.  
- **Security**: all client inputs are untrusted.  
- **Observability**: collect metrics, logs, and traces.  
- **Privacy & Legal**: handle cookies, GDPR/PII, and data compliance.  

---

## Quick QA Checklist

### Visual / UX

- Identify changed components/pages.  
- Check responsiveness at mobile, tablet, desktop.  
- Test reduced motion.  
- Take screenshots at 1440px desktop & 375px mobile.  

### Accessibilityy

- Keyboard navigation works end-to-end.  
- Run automated axe/Lighthouse accessibility tests.  

### Performance

- Run Lighthouse & Core Web Vitals check.  
- Confirm images optimized & no layout shifts.  

### Code & CI

- Run lint, type-check, and tests.  
- Update visual regression snapshots.  
- Ensure no secrets in client-side code.  

---

## References

- Nielsen Norman Group — 10 Usability Heuristics  
- W3C — WCAG Guidelines  
- Google web.dev — Core Web Vitals  
- Brad Frost — Atomic Design  
- Micro-frontends.org — Micro-frontend Architecture  

---
