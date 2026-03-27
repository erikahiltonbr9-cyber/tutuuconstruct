# Text Animation System - Developer Guide

This guide provides comprehensive documentation for implementing text animations throughout the modular homes construction website.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Animation Categories](#animation-categories)
4. [CSS Class Reference](#css-class-reference)
5. [React Hook Usage](#react-hook-usage)
6. [Implementation Examples](#implementation-examples)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility](#accessibility)

---

## Overview

The animation system is built with:
- **Pure CSS** for maximum performance (GPU-accelerated transforms and opacity)
- **Intersection Observer API** for scroll-triggered animations via React hooks
- **Consistent timing** and easing functions for premium feel
- **Mobile-first** responsive design
- **Accessibility-first** with reduced motion support

### Design Principles

- **Subtle & Premium**: Animations enhance UX without overwhelming users
- **Fast & Smooth**: 0.3s–0.8s duration with cubic-bezier easing
- **Consistent**: Reusable patterns across all components
- **Performant**: Only animates `transform` and `opacity` properties

---

## Quick Start

### 1. Basic Text Animation

```tsx
// Fade in with upward motion
<h1 className="heading-animate">
  Your Heading
</h1>

// Paragraph with delayed fade-in
<p className="paragraph-animate">
  Your paragraph text
</p>
```

### 2. Scroll-Triggered Animation

```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function MyComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div 
      ref={ref} 
      className={`scroll-slide-up ${isVisible ? 'is-visible' : ''}`}
    >
      Content animates when scrolled into view
    </div>
  );
}
```

### 3. Button Hover Effects

```tsx
<button className="button-lift-hover">
  Hover Me
</button>

<button className="button-glow-hover">
  Glow Effect
</button>
```

---

## Animation Categories

### 1. **Heading Animations** (H1–H3)

**Purpose**: Draw attention to important titles with elegant entrance animations

**Classes**:
- `.hero-title` - Main hero heading with 1s fade-in + slide up
- `.heading-animate` - Standard section headings (0.8s)
- `.heading-animate-fast` - Faster animation (0.6s)
- `.heading-reveal` - Letter-spacing reveal effect (0.9s)
- `.section-title` - For SectionHeader components

**Usage**:
```tsx
<h1 className="hero-title">
  Your Dream Home in 3 Months
</h1>

<h2 className="heading-animate">
  Benefits of Modular Homes
</h2>
```

**Timing**:
- Duration: 0.6s–1s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Effect: Fade-in + translateY(-20px → 0)

---

### 2. **Paragraph Animations**

**Purpose**: Smooth entrance for body text without distraction

**Classes**:
- `.paragraph-animate` - Standard paragraph animation (0.7s, 200ms delay)
- `.paragraph-fade` - Simple fade-in (0.8s, 300ms delay)
- `.hero-subtitle` - Hero section descriptions (0.4s delay)
- `.section-subtitle` - Section descriptions (0.2s delay)

**Usage**:
```tsx
<p className="paragraph-animate">
  We design and build energy-efficient modular homes...
</p>
```

**Timing**:
- Duration: 0.7s–0.8s
- Delay: 200ms–400ms
- Easing: `ease-out`

---

### 3. **Button & CTA Animations**

**Purpose**: Interactive hover effects to encourage clicks

**Classes**:
- `.button-lift-hover` - Subtle lift with shadow (translateY: -3px)
- `.button-scale-hover` - Slight scale increase (scale: 1.05)
- `.button-glow-hover` - Gradient glow effect on hover
- `.hero-cta` - Hero section CTA buttons (0.6s delay entrance)

**Usage**:
```tsx
<Button className="button-lift-hover">
  Request Quote
</Button>

<Link to="/catalog">
  <Button className="button-glow-hover">
    View Catalog
  </Button>
</Link>
```

**Hover Timing**:
- Transition: 0.3s ease
- Effects: transform, box-shadow

---

### 4. **Navigation Link Animations**

**Purpose**: Elegant underline effects for navigation menus

**Classes**:
- `.link-underline` - Simple underline expand
- `.link-underline-gradient` - Gradient underline (red → orange → pink)
- `.link-slide-in` - Sliding underline from left

**Usage**:
```tsx
<Link to="/about" className="link-underline-gradient">
  About Us
</Link>
```

**Timing**:
- Transition: 0.3s–0.4s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Effect: scaleX(0 → 1) with transform-origin animation

---

### 5. **Scroll-Triggered Animations**

**Purpose**: Animate content as user scrolls through the page

**Classes**:
- `.scroll-fade-in` - Simple opacity transition
- `.scroll-slide-up` - Fade + slide up from below
- `.scroll-slide-left` - Fade + slide from left
- `.scroll-slide-right` - Fade + slide from right
- `.scroll-scale` - Fade + scale from 0.9 to 1

**Usage**:
```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Section() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div 
      ref={ref}
      className={`scroll-slide-up ${isVisible ? 'is-visible' : ''}`}
    >
      Content
    </div>
  );
}
```

**Timing**:
- Transition: 0.8s ease-out
- Threshold: 0.1–0.3 (10%–30% visibility)
- triggerOnce: true (default)

---

### 6. **Staggered Animations**

**Purpose**: Animate multiple children with sequential delays

**Classes**:
- `.stagger-children` - Automatically staggers up to 6 children

**Usage**:
```tsx
<div className="stagger-children">
  <div>Item 1</div> {/* 100ms delay */}
  <div>Item 2</div> {/* 200ms delay */}
  <div>Item 3</div> {/* 300ms delay */}
</div>
```

**Timing**:
- Base animation: 0.7s fade-in-up
- Delay increment: 100ms per child
- Max children: 6 (600ms total stagger)

---

### 7. **Card Hover Effects**

**Purpose**: Interactive feedback for product/feature cards

**Classes**:
- `.card-hover` - Dramatic lift effect (-8px, larger shadow)
- `.card-hover-subtle` - Gentle lift effect (-4px)

**Usage**:
```tsx
<div className="card-hover">
  <ProductCard {...props} />
</div>
```

**Timing**:
- Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Effect: translateY + box-shadow

---

### 8. **Special Effects**

**Purpose**: Premium visual enhancements for key elements

**Classes**:
- `.gradient-text` - Static gradient text fill
- `.gradient-text-animate` - Animated gradient shift
- `.text-shimmer` - Shimmer effect across text
- `.gradient-border-animate` - Animated gradient border
- `.stat-number` - Number counter animation
- `.badge-pulse` - Pulsing badge effect

**Usage**:
```tsx
<h1 className="gradient-text-animate">
  Premium Feature
</h1>

<div className="gradient-border-animate">
  Special Card
</div>

<span className="badge-pulse">New</span>
```

---

## CSS Class Reference

### Core Animation Keyframes

```css
@keyframes fadeIn          /* 0 → 1 opacity */
@keyframes fadeInUp        /* fade + translateY(20px → 0) */
@keyframes fadeInDown      /* fade + translateY(-20px → 0) */
@keyframes slideInLeft     /* fade + translateX(-30px → 0) */
@keyframes slideInRight    /* fade + translateX(30px → 0) */
@keyframes scaleIn         /* fade + scale(0.95 → 1) */
@keyframes textReveal      /* fade + letter-spacing(0.1em → 0) */
@keyframes gradientShift   /* Animates gradient position */
@keyframes underlineExpand /* scaleX(0 → 1) */
@keyframes countUp         /* Number entrance effect */
@keyframes pulse           /* Opacity pulse */
@keyframes shimmer         /* Text shimmer effect */
```

### Animation Delays

```css
.animate-delay-100  /* 100ms */
.animate-delay-200  /* 200ms */
.animate-delay-300  /* 300ms */
.animate-delay-400  /* 400ms */
.animate-delay-500  /* 500ms */
.animate-delay-600  /* 600ms */
```

---

## React Hook Usage

### `useScrollAnimation`

Triggers animations when element enters viewport.

**Parameters**:
```typescript
interface UseScrollAnimationOptions {
  threshold?: number;      // 0-1, visibility % to trigger (default: 0.1)
  rootMargin?: string;     // Margin around viewport (default: '0px')
  triggerOnce?: boolean;   // Animate only once (default: true)
}
```

**Returns**:
```typescript
{
  ref: RefObject<HTMLDivElement>;  // Attach to element
  isVisible: boolean;              // Visibility state
}
```

**Example**:
```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Component() {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  
  return (
    <div 
      ref={ref}
      className={`scroll-slide-up ${isVisible ? 'is-visible' : ''}`}
    >
      Animated content
    </div>
  );
}
```

### `useStaggeredScrollAnimation`

Animates multiple items with staggered delays.

**Parameters**:
```typescript
count: number;   // Number of items to animate
delay?: number;  // Delay between items in ms (default: 100)
```

**Returns**:
```typescript
{
  refs: Array<(el: HTMLDivElement | null) => void>;
  areVisible: boolean[];
}
```

**Example**:
```tsx
import { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

function List() {
  const { refs, areVisible } = useStaggeredScrollAnimation(3, 150);
  
  return (
    <>
      {items.map((item, i) => (
        <div
          key={i}
          ref={refs[i]}
          className={`scroll-fade-in ${areVisible[i] ? 'is-visible' : ''}`}
        >
          {item}
        </div>
      ))}
    </>
  );
}
```

---

## Implementation Examples

### Hero Section Pattern

```tsx
<section>
  {/* Badge */}
  <div className="hero-badge">
    <HomeIcon />
    <span>Modular Construction</span>
  </div>
  
  {/* Main Heading */}
  <h1 className="hero-title">
    Your Dream Home in 3 Months
  </h1>
  
  {/* Subtitle */}
  <p className="hero-subtitle">
    We design and build energy-efficient modular homes...
  </p>
  
  {/* CTA Buttons */}
  <div className="hero-cta">
    <Button className="button-lift-hover">
      View Projects
    </Button>
  </div>
  
  {/* Stats */}
  <div className="hero-stats">
    <div>
      <p className="stat-number">200+</p>
      <p>Homes Built</p>
    </div>
  </div>
</section>
```

### Section with Scroll Animation

```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section 
      ref={ref}
      className={`scroll-fade-in ${isVisible ? 'is-visible' : ''}`}
    >
      <SectionHeader 
        title="Benefits"
        subtitle="Why choose modular homes"
      />
      
      <div className="stagger-children">
        <FeatureCard title="Fast Build" />
        <FeatureCard title="Eco-Friendly" />
        <FeatureCard title="Affordable" />
      </div>
    </section>
  );
}
```

### Product Grid with Card Hovers

```tsx
<div className="grid grid-cols-3 gap-6">
  {products.map((product) => (
    <Link 
      key={product.id} 
      to={`/catalog/${product.slug}`}
      className="card-hover"
    >
      <ProductCard {...product} />
    </Link>
  ))}
</div>
```

### Navigation Links

```tsx
<nav>
  <Link to="/about" className="link-underline-gradient">
    About
  </Link>
  <Link to="/catalog" className="link-underline-gradient">
    Catalog
  </Link>
  <Button className="button-lift-hover">
    Contact
  </Button>
</nav>
```

---

## Performance Guidelines

### Best Practices

1. **Only animate `transform` and `opacity`**
   - These properties are GPU-accelerated
   - Avoid animating `width`, `height`, `top`, `left`

2. **Use `will-change` sparingly**
   - Only for actively animating elements
   - Remove after animation completes

3. **Batch animations**
   - Use `.stagger-children` for lists
   - Trigger multiple animations together

4. **Optimize Intersection Observer**
   - Set appropriate `threshold` (0.1–0.3)
   - Use `triggerOnce: true` when possible

### Performance Checklist

- ✅ Animations use only `transform` and `opacity`
- ✅ Duration between 0.3s–0.8s
- ✅ Maximum 6 staggered items per group
- ✅ Scroll animations trigger once by default
- ✅ Reduced motion media query supported

---

## Accessibility

### Reduced Motion Support

The system automatically respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Guidelines

1. **Never rely on animation alone** to convey information
2. **Ensure content is readable** before animations complete
3. **Keep animations subtle** - they should enhance, not distract
4. **Test with reduced motion** enabled in OS settings

---

## Animation Timing Reference

### Duration Scales

| Speed | Duration | Use Case |
|-------|----------|----------|
| Fast  | 0.3s     | Button hovers, small UI elements |
| Medium| 0.6s–0.7s| Headings, cards, standard content |
| Slow  | 0.8s–1s  | Hero elements, large sections |

### Easing Functions

| Easing | CSS Value | Use Case |
|--------|-----------|----------|
| Standard | `ease` | General purpose |
| Ease Out | `ease-out` | Entrances, fade-ins |
| Smooth | `cubic-bezier(0.4, 0, 0.2, 1)` | Premium feel, headings |

### Delay Patterns

| Pattern | Timing | Use Case |
|---------|--------|----------|
| Immediate | 0ms | First element |
| Quick | 100ms–200ms | Second element, related content |
| Medium | 300ms–400ms | Hero CTAs, delayed content |
| Long | 500ms–800ms | Stats, final elements |

---

## CSS File Organization

All animations are defined in `/src/styles/animations.css`:

```
animations.css
├── Core Animation Definitions (@keyframes)
├── Utility Classes (Base animations)
├── Animation Delays
├── Heading Animations
├── Paragraph Animations
├── Button Animations
├── Link Animations
├── Gradient Text Effects
├── Staggered Children
├── Scroll-triggered Animations
├── Component-Specific Animations
├── Premium Effects
└── Accessibility & Performance
```

---

## Browser Support

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Intersection Observer**: Polyfill not required (95%+ support)
- **CSS Custom Properties**: Full support in target browsers
- **Flexbox/Grid**: Full support

---

## Troubleshooting

### Animation not triggering

1. Check element has animation class applied
2. Verify class name spelling (e.g., `.hero-title` not `.hero-titel`)
3. For scroll animations, ensure `isVisible` is added
4. Check if parent has `overflow: hidden` that cuts off visibility

### Animation too fast/slow

1. Add `.animate-delay-XXX` class to delay start
2. Override duration with custom class if needed
3. Check if `prefers-reduced-motion` is affecting timing

### Scroll animation not working

1. Ensure `useScrollAnimation` hook is called
2. Check `ref` is attached to correct element
3. Verify `isVisible` state is added to className
4. Adjust `threshold` option (try 0.1–0.3 range)

---

## Next Steps

1. **Apply animations** to remaining pages (Catalog, Product Detail, Contact)
2. **Test performance** on lower-end devices
3. **Gather user feedback** on animation timing
4. **A/B test** different animation styles for CTAs
5. **Monitor metrics** (bounce rate, engagement) post-implementation

---

## Contact & Support

For questions or custom animation requests:
- Check `/src/styles/animations.css` for full implementation
- Review `/src/app/hooks/useScrollAnimation.ts` for React hooks
- See `/src/app/pages/LandingPage.tsx` for complete examples

**Remember**: Animations should enhance the user experience, not define it. Keep them subtle, performant, and accessible.
