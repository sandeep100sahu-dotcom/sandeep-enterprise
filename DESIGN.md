# Design Brief — Steel Plant Store Web ERP Phase 1

## Purpose & Tone
Operational inventory dashboard for steel plant warehouse staff. Data-dense, high-contrast, precise. Command-center aesthetic: confident, efficient, no ambiguity.

## Visual Direction
Industrial utilitarian. Cool steel grays as operational backbone. Amber/orange for critical alerts and urgent action items. Subtle greens for healthy stock status. Minimal decorative elements — every pixel serves function. High contrast borders separate data domains.

## Differentiation
Industrial grid UI with intentional color coding: red alerts, green health, amber caution. Sidebar navigation as vertical command panel. Dense tabular layouts optimized for warehouse operations and inventory lookups. No gradients, no blur, no decorative animations — operational clarity first.

## Color Palette

| Semantic       | Light OKLCH         | Dark OKLCH          | Purpose                                 |
|:---------------|:--------------------|:-------------------|:----------------------------------------|
| Background     | 0.97 0 0            | 0.12 0.02 260      | Page surface, neutral workspace         |
| Foreground     | 0.18 0.02 260       | 0.92 0.01 0        | Primary text, operational data          |
| Card           | 0.99 0 0            | 0.16 0.02 260      | Data containers, KPI cards, tables      |
| Primary        | 0.45 0.08 260       | 0.62 0.15 260      | Action buttons, active states           |
| Accent (Alert) | 0.62 0.2 50         | 0.62 0.2 50        | Warnings, pending items, urgent flags   |
| Destructive    | 0.54 0.25 30        | 0.62 0.22 28       | Critical failures, deletions            |
| Sidebar        | 0.165 0.02 260      | 0.12 0.02 260      | Left nav panel, operational control     |
| Chart-1/2/3/4  | Blues, cyans, cool  | Steel color range   | Multi-series data visualization         |

## Typography
- **Display**: Fraunces (bold, serif) — titles, module headers, KPI labels
- **Body**: General Sans (400/500 weights) — dense tables, item descriptions, form fields
- **Mono**: Geist Mono (500) — serial numbers, item codes, SKU references, technical specs

## Elevation & Depth
- Sidebar: darker base, visible `sidebar-border` to separate from content
- Card borders: 1px border in `border` color, no shadows
- Hover states: `bg-muted/5` lift, `.transition-smooth` on interactive elements
- No elevation shadows — flat industrial design

## Structural Zones

| Zone          | Light BG       | Dark BG        | Treatment                                  |
|:--------------|:---------------|:---------------|:-------------------------------------------|
| Sidebar       | 0.98 0 0       | 0.12 0.02 260  | Darker, vertical menu, primary brand       |
| Top Navbar    | 0.99 0 0       | 0.16 0.02 260  | Search bar, user profile, light border-b   |
| Main Content  | 0.97 0 0       | 0.12 0.02 260  | Grid of data cards, alternating `card` bg  |
| Card          | 0.99 0 0       | 0.16 0.02 260  | Bordered container, KPI/table sections     |
| Footer        | 0.88 0.02 0    | 0.18 0.02 260  | Minimal, audit logs only                   |

## Spacing & Rhythm
- **Base unit**: 0.5rem (8px). Spacing scale: 2px (0.125), 4px (0.25), 8px (0.5), 12px (0.75), 16px (1), 24px (1.5), 32px (2)
- **Cards**: 1rem padding, 1rem gap between cards in grid
- **Sidebar items**: 0.5rem px, 0.5rem py, rounded-sm (2px radius)
- **Type leading**: 1.5 for body, 1.2 for display
- **Borders**: 1px throughout, no variations

## Component Patterns
- **KPI Cards**: `data-card` utility — border, padding, rounded-md, card bg, transition hover
- **Sidebar Items**: `sidebar-item` utility — dark bg, rounded-sm, hover lift, active state uses `sidebar-primary` with `sidebar-primary-foreground`
- **Alerts**: `.alert-amber`, `.alert-red`, `.alert-green` — thin border, semi-transparent bg, high-contrast text
- **Tables**: Dense rows, `text-sm`, minimal padding, alternating row bg (muted/5)
- **Buttons**: Solid `primary` bg, no rounded corners or minimal radius, high contrast text

## Motion & Interaction
- `.transition-smooth`: all 0.3s easing on interactive elements (buttons, hover states, menu items)
- No entrance animations, no floating/pulsing effects
- Focus states: `ring-2 ring-ring` on inputs/buttons
- Disabled state: `opacity-50` with `cursor-not-allowed`

## Constraints
- Mobile-first responsive (`sm:`, `md:`, `lg:` breakpoints)
- Dark mode as default for industrial operations, light mode available for admin settings
- Chrome/Edge optimized, modern browser features only
- No animations on page load, no decorative elements beyond functional borders
- High contrast AA+ in both light and dark modes
- Sidebar collapses to hamburger menu on `sm` screens

## Signature Detail
Industrial grid system with color-coded urgency zones. A red-bordered "Pending Repair" card stands next to a green "Healthy Stock" card, creating visual urgency hierarchy without motion or decorative flourish. Sidebar acts as operation control panel — every menu item has clear icon + label, active state highlighted in amber.
