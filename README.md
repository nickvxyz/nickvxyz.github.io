# BRUTALIST PORTFOLIO

A minimal, brutalist portfolio/project page with a utilitarian design aesthetic.

## Overview

This is a pre-launch landing page for a fitness commitment project built with pure HTML, CSS, and JavaScript. The design follows brutalist principles: form follows function, no decorative elements, and stark black/white contrast.

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles with CSS custom properties
├── js/
│   └── main.js         # Theme switcher and banner rotation
├── assets/
│   └── images/         # Placeholder for avatar and icons
└── README.md           # This file
```

## How to Run

Simply open `index.html` in any modern web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or use a local development server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve

# Then visit http://localhost:8000
```

## Features

### Theme Switcher
- Toggle between light (white bg) and dark (black bg) modes
- Smooth 300ms transition between themes
- Persists user preference in localStorage
- Respects system color scheme preference as default

### Activity Banners
- Three rotating banners showing community activity
- Each banner displays for ~2.5 seconds
- **Alert shake animation** on each banner change:
  - Sharp horizontal jitter (X-axis only)
  - 10px displacement
  - 300ms duration
  - Linear easing for aggressive feel
- Infinite automatic cycling (no manual controls)

### Design Characteristics
- **Zero rounded corners** - all elements are perfectly square
- **Black and white only** - no colors
- **Monospace typography** for headings and UI elements
- **High contrast** - pure black on white (or inverted)
- **Generous whitespace** - breathing room between elements
- **Strong visual hierarchy** - clear information structure

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, no dependencies)

## Design Rationale

### Layout Concept

The layout uses an **asymmetric grid** structure:

1. **Hero Section**: Large typographic statement dominates the left, with avatar and action buttons anchored to the right. This creates visual tension and draws the eye across the page.

2. **Banner Strip**: A full-width activity feed that interrupts the content flow, creating urgency and FOMO. The shake animation demands attention.

3. **Content Sections**: Two-column grid on desktop that collapses to single column on mobile. Generous line-height and max-width constraints for readability.

4. **Visual Rhythm**: Consistent use of 2px borders creates horizontal divisions that guide the eye down the page while maintaining the brutalist aesthetic.

### Typography

- **SF Mono / Fira Code** for headings and UI (technical, functional feel)
- **Inter** for body text (highly readable, neutral)
- Large type scale for hero (up to 10rem) establishes immediate impact

### Interaction Design

- Hover states use color inversion (bg becomes fg, fg becomes bg)
- No gradients, shadows, or decorative transitions
- The shake animation is intentionally uncomfortable - it's a signal, not decoration

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Improvements

- [ ] Add actual avatar image
- [ ] Connect banner data to real API
- [ ] Add onchain commitment verification
- [ ] Implement actual app/roadmap links
- [ ] Add more activity types to banner rotation
- [ ] Performance optimization for animations

## License

MIT
