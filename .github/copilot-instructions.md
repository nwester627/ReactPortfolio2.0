# Copilot Instructions for AI Agents

## Project Overview

- **Type:** Modern single-page portfolio built with Next.js, React, and Tailwind CSS.
- **Purpose:** Showcase developer skills, projects, and resume with a highly interactive, animated, and theme-aware UI.
- **Live Demo:** https://www.nicolaswester.com/

## Architecture & Key Patterns

- **Component Structure:**
  - All main UI sections are React components under `src/components/` (see `home/` for landing, resume, projects, etc.; `common/` for shared UI like buttons, layout, modals).
  - Theme context (`src/context/ThemeContext.jsx`) provides dark/light mode and is used throughout for color and style toggling.
  - Animations and frosted glass effects are implemented with Tailwind and custom CSS.
- **Resume Preview:**
  - Resume popover is contextual (not modal), animated, and responsive down to 344px. See `Intro.jsx` and `PdfResumeViewer.jsx` for logic and error handling.
  - Fallback to Google Drive iframe if PDF fails to load; error messages and download links are always provided.
- **Data:**
  - Project and testimonial data are in `src/lib/` as JS modules.
  - No backend; all data is static or fetched from public APIs.
- **Contact Form:**
  - Uses EmailJS for email delivery; see `Contact.jsx` for integration and validation logic.

## Developer Workflows

- **Install:** `yarn install` or `npm install`
- **Dev Server:** `yarn dev` or `npm run dev` (Next.js, usually on port 3000 or 3001)
- **Build (Static Export):** `yarn build` then `yarn export` (see Next.js docs for static export details)
- **Deploy:**
  - GitHub Actions workflow in `.github/workflows/nextjs.yml` builds and deploys to GitHub Pages using static export (`out/` directory).
  - Push to `master` triggers deploy.
- **Testing:** No formal test suite; manual browser testing is standard.

## Project-Specific Conventions

- **Styling:**
  - Tailwind CSS is used for all layout and color. Custom classes (e.g., `text-lavender`, `bg-lavender`) are defined in `tailwind.config.js`.
  - Responsive breakpoints are carefully tuned for mobile (down to 344px min width).
- **Theme Handling:**
  - Use `isDarkMode` from ThemeContext for all color and background logic. Never hardcode colors; always use theme-aware classes.
- **Component Imports:**
  - Use dynamic imports for components that depend on browser APIs (e.g., PDF rendering) to avoid SSR issues.
- **Error Handling:**
  - Always provide a fallback and user-friendly error message for external resources (PDF, iframe, etc.).

## Integration Points

- **EmailJS:** Used for contact form; API keys are not in repo, must be set in environment or config.
- **Google Drive:** Used as fallback for resume preview.
- **React Icons:** Used for all iconography.

## Examples

- See `src/components/home/Intro.jsx` for popover, theme, and responsive patterns.
- See `src/components/common/GlassButton.jsx` for reusable button styling.
- See `src/context/ThemeContext.jsx` for theme logic and usage.

---

**For AI agents:**

- Always match the project's theme and responsive conventions.
- When adding new UI, use Tailwind and ThemeContext for all colors and breakpoints.
- When in doubt, reference existing components in `src/components/` for style and structure.
