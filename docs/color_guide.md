# Theoforge - Color Guide (v1.1 - Tailwind CSS)

## 1. Color Philosophy & Strategy

Color is a primary vehicle for communicating Theoforge's brand identity as The Sage: knowledgeable, trustworthy, guiding, clear, and structured. Our color strategy aims to build trust, convey expertise, ensure clarity, and create a professional, sophisticated visual experience appropriate for engaging senior executives (CEO/CIO) in Fortune 100 companies.

Key Strategic Principles:

*   **Trust & Stability:** Establish a foundation of trust through a stable, authoritative primary color.
*   **Clarity & Structure:** Utilize a clear neutral palette for optimal readability and visual organization.
*   **Sophistication & Quality:** Employ secondary colors subtly to signal premium value and expertise.
*   **Focused Action:** Use accent colors sparingly and purposefully to guide users towards key actions.
*   **Accessibility:** Ensure all color combinations meet or exceed WCAG AA contrast requirements, demonstrating consideration and professionalism.

## 2. Core Palette Definition & Configuration

This palette **must be configured** in the `tailwind.config.js` file under the `theme.extend.colors` section.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary: Deep Teal
        primary: {
          DEFAULT: '#00695C', // Teal 700 (main)
          light: '#439889',
          dark: '#003D33',
        },
        // Secondary: Muted Gold
        secondary: {
          DEFAULT: '#B8860B', // DarkGoldenrod (main)
          light: '#E6A634',
          dark: '#8A5F00',
        },
        // Accent: Bright Orange (For critical CTAs)
        accent: {
          DEFAULT: '#F57C00', // Orange 700 (main)
          light: '#FFAD42',
          dark: '#BB4D00',
        },
        // Neutrals (Tailwind's built-in gray scale is often sufficient, but define specifics if needed)
        neutral: { // Example using Tailwind's gray
          900: '#212121', // Text Primary
          700: '#616161', // Text Secondary
          500: '#9E9E9E', // Text Disabled
          300: '#E0E0E0', // Divider
          // Add other shades as needed: 100, 200, 400, 600, 800 etc.
        },
        // Backgrounds (can often use neutral shades or white/black)
        background: {
          DEFAULT: '#FFFFFF', // default bg
          paper: '#FFFFFF',   // paper/card bg
        },
        // System Feedback Colors (Consider prefixing, e.g., 'feedback-error')
        error: '#D32F2F', // Red 700
        info: '#0288D1', // Light Blue 700
        success: '#2E7D32', // Green 700
      },
    },
  },
  plugins: [],
};
```

*   **Naming Convention:** Use semantic names (`primary`, `secondary`, `accent`, `neutral`). The `DEFAULT` key is used for classes like `bg-primary`, `text-secondary`. Shades are accessed like `bg-primary-light`, `text-neutral-900`.
*   **Contrast Text:** Tailwind doesn't have a built-in `contrastText` concept. You must manually choose appropriate text colors for backgrounds (e.g., `text-white` or `text-neutral-900`) to ensure contrast.

## 3. Color Usage Guidelines

*   **Dominance:** The primary Teal (`bg-primary`, `text-primary`) and Neutrals (`bg-white`, `bg-neutral-100`, `text-neutral-900`, `text-neutral-700`) should dominate.
*   **Secondary Accentuation:** Use Muted Gold (`text-secondary`, `border-secondary`) sparingly for high-value highlights (e.g., `<span className="text-secondary font-semibold">...</span>`). Avoid using it for general interactive elements.
*   **CTA Hierarchy:** Reserve Bright Orange (`bg-accent`, `hover:bg-accent-dark`) exclusively for the most critical CTAs. Less critical actions should use Primary Teal (`bg-primary`, `hover:bg-primary-dark`).
*   **Text Hierarchy:** Use `text-neutral-900` for main content/headings. Use `text-neutral-700` for supporting information, labels, metadata where contrast allows. `text-neutral-500` for disabled states.
*   **Consistency:** Strictly adhere to the Tailwind configuration. Use utility classes (e.g., `bg-primary`, `text-accent`, `border-neutral-300`). Avoid arbitrary style attributes (`style={{ color: '#B8860B' }}`).

## 4. Accessibility & Contrast

*   **Minimum Standard:** All text/background combinations *must* meet WCAG 2.1 Level AA contrast ratios.
*   **Target Audience Consideration:** For critical text content aimed at potentially older executives, strive for Level AAA compliance where design permits, particularly for `text-neutral-700`.
*   **Tooling:** Utilize contrast checking tools (browser extensions, online checkers, Tailwind contrast plugins if available) during design and development.
*   **Verification Needed:** Apply appropriate text colors (e.g., `text-white` or `text-neutral-900`) and verify contrast for:
    *   `text-neutral-700` (`#616161`) on `bg-white` (`#FFFFFF`) - *Ratio is 4.68:1 (AA Pass)*. Consider `text-neutral-800` (`#424242`, 7.26:1) for better comfort if needed.
    *   Text on `bg-secondary` (`#B8860B`) - *Requires dark text (e.g., `text-neutral-900`) or white text only for large/bold elements.* White text has a ratio of 3.9:1 (Fail AA Normal).
    *   Text on `bg-accent` (`#F57C00`) - *Requires dark text (e.g., `text-neutral-900`) or white text only for large/bold elements.* White text has a ratio of 3.05:1 (Fail AA Normal).

## 5. Implementation Notes

*   **Source of Truth:** `tailwind.config.js`
*   **Usage:** Apply colors via Tailwind utility classes in your React components (e.g., `className="bg-primary text-white p-4"`).
*   **Component Abstraction:** Encapsulate common color combinations in reusable React components to maintain consistency (e.g., a `<Button variant="primary">` component that applies `bg-primary text-white hover:bg-primary-dark`).

---
*Version 1.1 - Updated for Tailwind CSS implementation.*
