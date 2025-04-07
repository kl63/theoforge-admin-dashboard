# Theoforge - Typography Guide (v1.0)

## 1. Philosophy & Principles

As outlined in the Theoforge Brand Guide, our brand archetype is The Sage: knowledgeable, trustworthy, guiding, clear, and structured. Our typography is fundamental to expressing these attributes.

The primary goals of our typographic system are:

*   **Clarity & Legibility:** Ensure text is easy to read and understand across all devices and contexts.
*   **Hierarchy:** Establish a clear visual order that guides the user through the content logically.
*   **Consistency:** Apply typographic styles uniformly across the platform to build trust and predictability.
*   **Accessibility:** Meet or exceed WCAG guidelines for text contrast and size.
*   **Professionalism:** Reflect the expertise and authority of The Sage archetype.

## 2. Typefaces

We utilize two primary typefaces to create a balance between engaging display text and highly readable body copy:

*   **Poppins (Headings):** A geometric sans-serif used for headlines (H1-H6) and major callouts. Its modern, clean lines convey approachability and structure.
    *   *Implementation:* `var(--font-poppins)`
    *   *Available Weights (as per Brand Guide):* 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) - *Ensure theme usage aligns.*
*   **Public Sans (Body & UI):** A neutral, highly legible sans-serif designed for user interfaces. Used for body text, paragraphs, UI elements (buttons, labels), and captions. Its clarity supports the trustworthy and guiding nature of the brand.
    *   *Implementation:* `var(--font-public-sans)`
    *   *Available Weights (as per Brand Guide):* 400 (Regular), 500 (Medium), 700 (Bold) - *Ensure theme usage aligns.*

## 3. Typographic Scale

The following scale, defined in `/src/theme/theme.ts`, provides a structured hierarchy for all text elements. Sizes are based on a root font size of 16px.

| Variant   | Font Family   | Weight | Size (rem/px)    | Line Height | Usage Notes                                    |
| :-------- | :------------ | :----- | :--------------- | :---------- | :--------------------------------------------- |
| `h1`      | Poppins       | 700    | 2.75rem / 44px   | 1.15        | Primary page titles                            |
| `h2`      | Poppins       | 600    | 2.25rem / 36px   | 1.2         | Major section titles                           |
| `h3`      | Poppins       | 600    | 1.75rem / 28px   | 1.25        | Sub-section titles                             |
| `h4`      | Poppins       | 500    | 1.375rem / 22px  | 1.3         | Minor headings, card titles (consider `h5/h6`) |
| `h5`      | Poppins       | 500    | 1.125rem / 18px  | 1.4         | Small headings, prominent labels               |
| `h6`      | Poppins       | 500    | 1rem / 16px      | 1.5         | Card titles, secondary labels                  |
| `body1`   | Public Sans   | 400    | 1rem / 16px      | 1.6         | Main paragraph text                            |
| `body2`   | Public Sans   | 400    | 0.875rem / 14px  | 1.5         | Secondary text, descriptions, help text        |
| `button`  | Public Sans   | 600*   | 0.9375rem / 15px | 1.75        | Buttons, calls to action (*Weight TBD/Confirm*) |
| `caption` | Public Sans   | 400    | 0.75rem / 12px   | 1.66        | Image captions, metadata, small print          |
| `overline`| Public Sans   | 400    | 0.75rem / 12px   | 2.66**      | Group labels, status indicators (**LH Review**) |

*   *Note on Button Weight:* The theme default might be 500, but component override uses 600. Needs standardization (recommend 600).
** *Note on Overline Line Height:* The defined line height (2.66) is unusually large and requires review in context. Default usually ~1.5-1.6.

## 4. Color & Contrast

*   **Primary Text:** `theme.palette.text.primary` (`#212121` / `grey[900]`)
*   **Secondary Text:** `theme.palette.text.secondary` (`#616161` / `grey[700]`)
*   Ensure sufficient contrast ratios (WCAG AA minimum) for all text against its background, especially for smaller text (`body2`, `caption`). Refer to the main Brand Guide for palette details.

## 5. Responsive Typography

*   The system utilizes responsive font sizes for key elements like headings (as seen in `HeroSection`) to ensure optimal readability across different screen sizes. Apply this principle consistently where large type variations are needed.
*   Line lengths should be kept within reasonable limits (typically 45-75 characters) for comfortable reading, especially for `body1`.

## 6. Implementation

*   The single source of truth for the typographic scale and base styles is `/src/theme/theme.ts`.
*   Utilize the defined Material UI `Typography` variants (`h1`-`h6`, `body1`, etc.) wherever possible to ensure consistency. Avoid local overrides unless absolutely necessary and justified.
*   Use the CSS variables `var(--font-poppins)` and `var(--font-public-sans)` for applying fonts outside of Material UI components if needed.

## 7. Spacing

*   *(To Be Defined)* Establish consistent vertical spacing rules (e.g., margins between headings and paragraphs, spacing within lists) to create a harmonious vertical rhythm. Base spacing on the theme's spacing unit (`theme.spacing(...)`).

---
*Version 1.0 - Initial Draft based on theme.ts and brand_guide.md v0.2*
