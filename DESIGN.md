---
name: KeepIt
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#565d63'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f757c'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  margin-mobile: 20px
  gutter-mobile: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system focuses on a **Minimalist** and **Corporate Modern** aesthetic tailored for a high-productivity mobile experience. The brand personality is professional, organized, and focused, catering to users who value clarity and intellectual efficiency. 

The visual language prioritizes deep focus through a "content-first" approach, utilizing generous white space and a precise typographic hierarchy. The emotional response should be one of calm control—transforming the chaos of daily thoughts into a structured digital environment. The interface remains unobtrusive, using subtle depth and high-contrast interactions to guide the user without visual noise.

## Colors
This design system utilizes a refined light-mode palette centered around Indigo and Slate. 

- **Primary (#6366F1):** Used for key actions, active states, and focus indicators. It provides a vibrant, modern energy against the neutral background.
- **Secondary (#F8FAFC):** A soft gray used for large surface areas and background fills to reduce eye strain compared to pure white.
- **Tertiary (#E2E8F0):** Used for subtle borders and dividers, maintaining structure without creating harsh visual breaks.
- **Neutral (#0F172A):** A high-contrast slate used for primary text and headings to ensure maximum legibility and a premium feel.

Semantic colors (Success: #10B981, Error: #EF4444) should be used sparingly for status indicators.

## Typography
The typography utilizes **Inter**, a typeface designed for screen readability. The scale is built on a tight ratio to maintain a professional, information-dense look suitable for a note-taking application.

- **Headlines:** Use Bold (700) or SemiBold (600) weights with slight negative letter-spacing to create a compact, modern feel.
- **Body:** Standardized at 16px for primary notes and 14px for secondary metadata. 
- **Labels:** Used for tags, timestamps, and button text, often utilizing uppercase for the `label-md` role to differentiate from body content.
- **Language Support:** All typography must accommodate French character sets (accents, cedillas) without clipping line heights.

## Layout & Spacing
The layout follows a **fluid grid** model optimized for mobile devices. It relies on a 4px baseline shift to ensure all elements align harmoniously.

- **Margins:** A consistent 20px horizontal margin is applied to the main viewport.
- **Gutter:** 12px spacing between elements in a list or grid view.
- **Reflow:** On tablet devices, the single-column list view transitions into a master-detail view (sidebar for navigation, main panel for note editing) to utilize the extra horizontal space.
- **Vertical Rhythm:** Elements are stacked using increments of 8px (`stack-sm`, `md`, `lg`) to maintain a clean, rhythmic vertical flow.

## Elevation & Depth
Elevation in the design system is achieved through **low-contrast outlines** paired with **ambient shadows**. This avoids the "heavy" look of traditional material design while still providing clear tactile affordances.

- **Level 0 (Surface):** The background (`#F8FAFC`).
- **Level 1 (Cards):** Uses a white background with a 1px border (`#E2E8F0`) and a very soft, diffused shadow (Offset: 0, 4px; Blur: 12px; Color: rgba(15, 23, 42, 0.04)).
- **Level 2 (Modals/Floating Action Buttons):** Increases shadow opacity and blur to suggest higher proximity to the user.
- **Interactions:** When a card is pressed, it should subtly shrink (98% scale) rather than increasing shadow, emphasizing a "tactile click" feel.

## Shapes
The shape language is defined by a **Rounded** (Level 2) philosophy. 

- **Base Cards:** 12px corner radius (`rounded-lg` equivalent) provides a friendly yet structured appearance.
- **Buttons & Inputs:** 8px corner radius to maintain a slightly more formal, professional edge than the softer cards.
- **Selection Indicators:** Small indicators (like checkbox backgrounds) use a 4px radius.
- **Pills:** Used exclusively for tags or status chips, utilizing a fully rounded (999px) radius to distinguish them from structural components.

## Components
Consistent styling across components ensures the app feels like a singular, cohesive tool.

- **Buttons:**
  - **Primary:** Background `#6366F1`, Text `#FFFFFF`, 8px radius. High contrast for clear "Call to Action" (e.g., "Nouvelle Note").
  - **Secondary:** Background transparent, Border 1px `#E2E8F0`, Text `#0F172A`.
- **Cards (Notes):** 12px radius, white fill, 1px border. Title in `headline-sm`, snippet in `body-md` (max 3 lines).
- **Chips (Tags):** Fully rounded, background `#E2E8F0`, text `label-sm`.
- **Input Fields:** 8px radius, background `#FFFFFF`, border 1px `#E2E8F0`. Focus state should use a 2px `#6366F1` border.
- **Lists:** Clean separation using `stack-md`. Dividers should be 1px thick and use color `#E2E8F0`.
- **Checkboxes:** 4px radius, when active, fill with `#6366F1` and use a white checkmark.
- **Floating Action Button (FAB):** Circular, Primary color background, white icon. Elevated with a Level 2 shadow.
