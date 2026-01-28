# Design System Update

## Overview
Updated the entire application to match a professional iOS-native finance app aesthetic with SF Pro font family, refined color palette, and improved spacing.

---

## 1. Typography

### Font Family
**Primary:** SF Pro Display / SF Pro Text (Apple system font)
- Fallbacks: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', system-ui, sans-serif`

### Font Weights
- **Regular (400)** → Secondary labels, body text, dates
- **Medium (500)** → Tabs, section labels, buttons
- **Semibold (600)** → Section titles, headings, metric values
- **Bold (700)** → Primary numbers (P&L values)

### Font Sizes
- **Page titles:** 19-20px (Semibold 600)
- **Primary numbers:** 20-22px (Bold 700)
- **Percentages:** 16-18px (Semibold 600)
- **Section labels:** 14px (Medium 500)
- **Tabs:** 16px (Medium 500)
- **Dates/metadata:** 13px (Regular 400)
- **Small text:** 12px (Regular 400)

---

## 2. Color Palette

### Primary Colors

#### Positive Green (Profits)
```css
#2DBE8C
```
- Used for: Positive P&L, profit indicators, graph lines
- Gradient fill top: `rgba(45, 190, 140, 0.35)`
- Gradient fill bottom: `rgba(45, 190, 140, 0.05)`

#### Negative Red (Losses)
```css
#E5533D
```
- Used for: Negative P&L, loss indicators
- Gradient fill top: `rgba(229, 83, 61, 0.35)`
- Gradient fill bottom: `rgba(229, 83, 61, 0.05)`

#### Primary Blue (Interactive)
```css
#2563EB
```
- Used for: Active tabs, selected states, CTAs

### Text Colors

#### Primary Text
```css
#0F172A  /* Dark slate, near-black */
```
- Used for: Main headings, titles, primary numbers

#### Secondary Text
```css
#6B7280  /* Cool gray */
```
- Used for: Labels, metadata, secondary info

#### Tertiary Text (Axis labels)
```css
#9CA3AF  /* Light gray */
```
- Used for: Chart axis labels, subtle text

### UI Elements

#### Dividers / Borders
```css
#E5E7EB
```

#### Background Colors
- Main background: `#F8FAFC` (slightly tinted)
- Card background: `#FFFFFF`
- Inactive pill/button: `#F1F5F9`

---

## 3. Component Styling

### Cards & Containers
- **Border radius:** 16px (rounded, modern)
- **Box shadow:** `0 1px 3px rgba(0, 0, 0, 0.04)` (subtle)
- **Border:** `1px solid #E5E7EB`
- **Background:** `#FFFFFF`

### Buttons & Pills
- **Border radius:** 16-18px (pill style)
- **Background (inactive):** `#F1F5F9`
- **Border:** `1px solid #E5E7EB`
- **Active text color:** `#2563EB`
- **Font weight:** 500 (Medium)

### Tabs
- **Font size:** 16px
- **Font weight:** 500 (inactive), 600 (active)
- **Active indicator:** 3px height, `#2563EB`
- **Text color:** `#6B7280` (inactive), `#0F172A` (active)

---

## 4. Spacing System

### Grid
- **Base unit:** 8px
- Consistent spacing: 8px, 12px, 16px, 20px, 24px

### Component Padding
- **Large cards:** 24px
- **Medium cards:** 20px
- **Small cards:** 16px
- **Buttons:** 6-8px vertical, 12-16px horizontal

---

## 5. Chart Styling

### Line Charts
- **Line width:** 2.5px
- **Positive line:** `#2DBE8C`
- **Negative line:** `#E5533D`
- **Active dot:** 6px radius, white stroke (2px)
- **Cursor line:** Dashed, `#2DBE8C`

### Axis Styling
- **Axis labels:** `#9CA3AF`, 12px
- **Grid lines:** `#E5E7EB`, 0.5px (or very faint)
- **Font:** SF Pro Text

### Donut Charts
- **Stocks segment:** `#2DBE8C`
- **Options segment:** `#E5E7EB`
- **Outer ring:** `#2563EB`

---

## 6. Design Philosophy

### Vibe
- iOS-native
- Minimal & clean
- Finance / trust-focused
- No harsh blacks or neon colors

### Key Principles
1. **Subtle shadows** - Barely visible, just enough depth
2. **Generous whitespace** - Let content breathe
3. **Rounded corners** - 12-16px for modern feel
4. **Consistent spacing** - 8px grid system
5. **Muted colors** - Professional, not flashy
6. **Clear hierarchy** - Font weights and sizes guide the eye

---

## 7. Files Updated

### Global Styles
- `src/index.css` - Base typography and colors
- `src/App.css` - App background and navigation

### Component Styles
- `src/components/HeaderBar.css` - Header typography and colors
- `src/components/Navigation.css` - Tab styling
- `src/components/PnLOverview.css` - Card styling, metrics, dropdowns
- `src/components/TrendAnalysis.css` - Chart container, tooltips, summaries
- `src/components/AssetClassChart.css` - Donut chart and legend
- `src/components/PnLCalendar.css` - Calendar grid and day cells

### Component Logic
- `src/components/TrendAnalysis.jsx` - Chart colors and gradients
- `src/components/AssetClassChart.jsx` - Pie chart colors

---

## 8. Accessibility

- Maintained sufficient color contrast ratios
- Font sizes remain readable (minimum 11px on mobile)
- Interactive elements have clear hover states
- Consistent focus indicators

---

## Next Steps (Optional Enhancements)

1. **Add SF Pro font files** - Currently using system fallbacks
2. **Dark mode support** - Implement alternate color scheme
3. **Animation refinements** - Add subtle transitions (200ms ease)
4. **Loading states** - Skeleton screens with gradient shimmer
5. **Micro-interactions** - Button press states, hover effects

---

*Last updated: January 28, 2026*
