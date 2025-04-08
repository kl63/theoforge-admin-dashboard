# Theoforge - Typography Guide (v1.1 - Tailwind CSS)

## 1. Philosophy & Principles

As outlined in the Theoforge Brand Guide, our brand archetype is The Sage: knowledgeable, trustworthy, guiding, clear, and structured. Our typography is fundamental to expressing these attributes.

The primary goals of our typographic system are:

*   **Clarity & Legibility:** Ensure text is easy to read and understand across all devices and contexts.
*   **Hierarchy:** Establish a clear visual order that guides the user through the content logically.
*   **Consistency:** Apply typographic styles uniformly across the platform to build trust and predictability.
*   **Accessibility:** Meet or exceed WCAG guidelines for text contrast and size.
*   **Professionalism:** Reflect the expertise and authority of The Sage archetype.

## 2. Typefaces

We utilize two primary typefaces configured in `tailwind.config.js` under `theme.extend.fontFamily`.

*   **Poppins (Headings):** A geometric sans-serif used for headlines and major callouts. Its modern, clean lines convey approachability and structure.
    *   *Implementation:* Use the CSS variable `var(--font-poppins)` or Tailwind class `font-poppins`.
    *   *Available Weights:* 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold). Use classes like `font-medium`, `font-semibold`, `font-bold`.
*   **Public Sans (Body & UI):** A neutral, highly legible sans-serif designed for user interfaces. Used for body text, paragraphs, UI elements (buttons, labels), and captions. Its clarity supports the trustworthy and guiding nature of the brand.
    *   *Implementation:* Use the CSS variable `var(--font-public-sans)` or Tailwind class `font-sans` (if configured as default sans).
    *   *Available Weights:* 400 (Regular), 500 (Medium), 700 (Bold). Use classes like `font-normal`, `font-medium`, `font-bold`.

**Tailwind Configuration Example:**

```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'var(--font-public-sans)', ...fontFamily.sans],
        poppins: ['Poppins', 'var(--font-poppins)', 'sans-serif'],
      },
      // Add font sizes and line heights here (see section 3)
    },
  },
  plugins: [],
};
```
*Note: Ensure fonts are properly loaded (e.g., via Next/Font or CSS `@import`).*

## 3. Typographic Scale

The following scale **should be configured** in `tailwind.config.js` under `theme.extend.fontSize` and potentially `theme.extend.lineHeight` (or use utility classes directly).

| Use Case          | Font Family   | Weight       | Size Class (rem/px) | Line Height Class | Notes                                          |
| :---------------- | :------------ | :----------- | :------------------ | :---------------- | :--------------------------------------------- |
| Primary Title (H1)| Poppins       | `font-bold`  | `text-4xl` (2.75rem)*| `leading-tight`** | `<h1>` or component                            |
| Major Title (H2)  | Poppins       | `font-semibold`| `text-3xl` (2.25rem)*| `leading-snug`**  | `<h2>` or component                            |
| Sub Title (H3)    | Poppins       | `font-semibold`| `text-2xl` (1.75rem)*| `leading-snug`**  | `<h3>` or component                            |
| Minor Heading (H4)| Poppins       | `font-medium`| `text-xl` (1.375rem)*| `leading-normal`**| `<h4>`, Card titles                           |
| Small Heading (H5)| Poppins       | `font-medium`| `text-lg` (1.125rem)*| `leading-normal`**| `<h5>`, Labels                                 |
| Card Title (H6)   | Poppins       | `font-medium`| `text-base` (1rem)*  | `leading-relaxed`**| `<h6>`, Secondary labels                      |
| Body Text 1       | Public Sans   | `font-normal`| `text-base` (1rem)   | `leading-relaxed` | `<p>`, Main content                            |
| Body Text 2       | Public Sans   | `font-normal`| `text-sm` (0.875rem) | `leading-normal`  | Secondary text, descriptions                   |
| Button Text       | Public Sans   | `font-semibold`| `text-sm` or `text-base`*** | `leading-normal` | Buttons (*Needs decision/standardization*)   |
| Caption Text      | Public Sans   | `font-normal`| `text-xs` (0.75rem)  | `leading-normal`  | Image captions, metadata                       |
| Overline Text     | Public Sans   | `font-normal`| `text-xs` (0.75rem)  | `leading-loose`***| Group labels (**Needs review/standardization**) |

*   *Custom Sizes:* The rem/px values listed are desired targets. **Configure these explicitly in `tailwind.config.js` under `theme.extend.fontSize`** if they don't exactly match default Tailwind classes (`text-4xl`, `text-3xl`, etc.). Example:
    ```javascript
    // tailwind.config.js -> theme.extend
    fontSize: {
      '4xl': ['2.75rem', '1.15'], // ~44px, Use array for size + line-height
      '3xl': ['2.25rem', '1.2'],  // ~36px
      '2xl': ['1.75rem', '1.25'], // ~28px
      'xl': ['1.375rem', '1.3'], // ~22px
      'lg': ['1.125rem', '1.4'], // ~18px
      // 'base' (1rem/16px) and 'sm' (0.875rem/14px) and 'xs' (0.75rem/12px) usually fine as default
    }
    ```
**  *Line Height:* Tailwind's default line height classes (`leading-tight`, `leading-normal`, etc.) can be used, or define specific values in the `fontSize` config as shown above.
*** *Standardization:* Decide on standard button text size (`text-sm` or `text-base`?) and review the overline style.

## 4. Color & Contrast

*   **Primary Text:** Use `text-neutral-900` (or the configured primary text color).
*   **Secondary Text:** Use `text-neutral-700` (or the configured secondary text color).
*   Ensure sufficient contrast ratios (WCAG AA minimum) for all text against its background. Refer to the **[Color Guide](./color_guide.md)**.

## 5. Responsive Typography

*   Use Tailwind's responsive variants (e.g., `text-2xl md:text-3xl lg:text-4xl`) to adjust font sizes across breakpoints for optimal readability.
*   Control line lengths using container width classes (e.g., `max-w-prose`) where appropriate for large blocks of text.

## 6. Implementation

*   The single source of truth for fonts, sizes, and line heights is `tailwind.config.js`.
*   Apply typography using utility classes directly on HTML elements (`<h1 className="font-poppins font-bold text-4xl ...">`) or within React components.
*   **Create abstract components:** Build reusable components like `<Heading level={1} className="...">` or `<Paragraph variant="secondary">` to encapsulate common typographic patterns and reduce class repetition.

## 7. Spacing

*   Establish consistent vertical spacing (margins between headings, paragraphs) using Tailwind's spacing utilities (e.g., `mt-4`, `mb-6`), derived from the **[Spacing Guide](./spacing_guide.md)**.

---
*Version 1.1 - Updated for Tailwind CSS implementation.*
