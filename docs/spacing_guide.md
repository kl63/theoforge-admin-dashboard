# Theoforge - Spacing Guide (v1.1 - Tailwind CSS)

## 1. Philosophy & System: The 8-Point Grid

Consistent spacing is essential for creating a clean, structured, and professional user interface that aligns with Theoforge's "Sage" brand archetype. We utilize the **8-Point Grid System** as the foundation for all spacing and sizing.

**Why the 8-Point Grid?**

*   **Consistency:** All spatial relationships (padding, margin, element dimensions) are derived from a single base unit (8px), creating predictable rhythm.
*   **Efficiency:** Simplifies design and development decisions. Instead of arbitrary pixel values, you use multiples of 8.
*   **Cross-Platform Adaptability:** Scales well across different screen sizes and resolutions.
*   **Professional Standard:** Widely adopted in modern UI/UX design.

**Base Unit:**

*   **1 spacing unit = 8px**

## 2. Tailwind Configuration

Tailwind CSS naturally aligns with a spacing scale. By default, its numeric spacing utilities (e.g., `p-4`, `m-2`, `gap-8`) map to `0.25rem` increments (`1` = 0.25rem, `2` = 0.5rem, `4` = 1rem). With a default browser font size of 16px, this means:

*   `1` = 4px
*   `2` = 8px (Our base unit)
*   `3` = 12px
*   `4` = 16px
*   `5` = 20px
*   `6` = 24px
*   `8` = 32px
*   etc.

**To strictly enforce the 8-point grid (multiples of 8px), you might need to customize the `theme.spacing` scale in `tailwind.config.js`:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Define explicit 8px increments if needed
        '1': '8px',   // Replaces default 4px
        '2': '16px',  // Replaces default 8px
        '3': '24px',  // Replaces default 12px
        '4': '32px',  // Replaces default 16px
        '5': '40px',  // Replaces default 20px
        '6': '48px',  // Replaces default 24px
        '7': '56px',  // Replaces default 28px
        '8': '64px',  // Replaces default 32px
        '9': '72px',  // Replaces default 36px
        '10': '80px', // Replaces default 40px
        '11': '88px', // Replaces default 44px
        '12': '96px', // Replaces default 48px
        // Add larger values as needed, maintaining the 8px increment
        // ... e.g., '16': '128px'
      }
    }
  },
  plugins: []
};
```
*   **Decision:** Evaluate if sticking to Tailwind's default 4px increments (where `p-2`, `p-4`, `p-6`, `p-8` correspond to 8px, 16px, 24px, 32px) is sufficient, or if explicitly overriding the scale for stricter 8px multiples is preferred.

## 3. Usage Guidelines

*   **Source of Truth:** `tailwind.config.js` (either default or customized spacing scale).
*   **Application:** Use Tailwind's spacing utility classes for *all* margins, padding, gaps, and fixed width/height dimensions where appropriate.
    *   **Padding:** `p-2`, `px-4`, `pt-6` (translates to 8px, 16px horizontal, 24px top based on config)
    *   **Margin:** `m-4`, `mx-auto`, `mb-8` (translates to 16px, auto horizontal, 32px bottom based on config)
    *   **Gaps (Flexbox/Grid):** `gap-4`, `gap-x-6`, `gap-y-2`
    *   **Dimensions:** `w-8`, `h-16`, `min-w-24` (corresponds to spacing scale units, e.g., 32px, 64px, 96px with default config)
*   **Consistency is Key:** Avoid arbitrary pixel values (`style={{ padding: '15px' }}`) or inconsistent spacing. Always use the defined scale via utility classes.
*   **Layout Components:** Utilize Flexbox (`flex`, `items-center`, `justify-between`) and Grid (`grid`, `grid-cols-3`) with `gap-*` utilities for managing layout structure and spacing between elements.

## 4. Common Spacing Values (Examples based on default Tailwind 4px increment scale)

| Use Case                      | Tailwind Classes (Example) | Pixels (Approx) |
| :---------------------------- | :------------------------- | :-------------- |
| Small Icon Padding            | `p-1` or `p-2`             | 4px or 8px      |
| Inline Element Spacing        | `mx-2` or `gap-2`          | 8px             |
| Button Padding (Y/X)          | `py-2 px-4`                | 8px / 16px      |
| Input/Field Padding         | `p-3` or `p-4`             | 12px or 16px    |
| Card Internal Padding         | `p-4` or `p-6`             | 16px or 24px    |
| Section Padding (Y)           | `py-8` or `py-12`          | 32px or 48px    |
| Gaps Between Cards/Items    | `gap-4` or `gap-6`         | 16px or 24px    |
| Margin Below Headings         | `mb-4` or `mb-6`           | 16px or 24px    |
| Margin Below Paragraphs       | `mb-4`                     | 16px            |
| Page Container Padding (X)    | `px-4` or `px-6`           | 16px or 24px    |

*Note: Adjust these examples if you customize the spacing scale in `tailwind.config.js`.*

## 5. Implementation

*   Ensure Tailwind CSS is properly installed and configured in the project.
*   Apply spacing consistently using utility classes in your React components.
*   Refactor existing components to remove hardcoded pixel values for spacing and replace them with Tailwind classes.

---
*Version 1.1 - Updated for Tailwind CSS implementation.*
