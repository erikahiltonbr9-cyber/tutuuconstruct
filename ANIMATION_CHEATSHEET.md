# Text Animation System - Quick Reference

## 🚀 Common Patterns

### Hero Section
```tsx
<div className="hero-badge">Badge</div>
<h1 className="hero-title">Main Title</h1>
<p className="hero-subtitle">Description</p>
<div className="hero-cta">
  <Button className="button-lift-hover">CTA</Button>
</div>
<div className="hero-stats">
  <p className="stat-number">200+</p>
</div>
```

### Section Header
```tsx
<SectionHeader 
  title="Section Title"  // Auto: .section-title
  subtitle="Subtitle"    // Auto: .section-subtitle
/>
```

### Scroll Animation
```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

<div ref={ref} className={`scroll-slide-up ${isVisible ? 'is-visible' : ''}`}>
  Content
</div>
```

### Card Grid with Hovers
```tsx
<div className="stagger-children">
  <div className="card-hover"><Card /></div>
  <div className="card-hover"><Card /></div>
  <div className="card-hover"><Card /></div>
</div>
```

---

## 📚 Class Reference

### Headings
| Class | Duration | Delay | Effect |
|-------|----------|-------|--------|
| `.hero-title` | 1s | 200ms | Fade + slide up |
| `.heading-animate` | 0.8s | 0ms | Fade + slide up |
| `.heading-reveal` | 0.9s | 0ms | Fade + letter spacing |
| `.section-title` | 0.8s | 0ms | Fade + slide up |

### Paragraphs
| Class | Duration | Delay | Effect |
|-------|----------|-------|--------|
| `.paragraph-animate` | 0.7s | 200ms | Fade + slide up |
| `.hero-subtitle` | 1s | 400ms | Fade + slide up |
| `.section-subtitle` | 0.8s | 200ms | Fade in |

### Buttons
| Class | Hover Effect |
|-------|--------------|
| `.button-lift-hover` | Lift -3px + shadow |
| `.button-scale-hover` | Scale 1.05 + shadow |
| `.button-glow-hover` | Gradient glow |

### Links
| Class | Hover Effect |
|-------|--------------|
| `.link-underline` | Underline expand |
| `.link-underline-gradient` | Gradient underline |
| `.link-slide-in` | Sliding underline |

### Scroll Animations
| Class | Effect |
|-------|--------|
| `.scroll-fade-in` | Fade in |
| `.scroll-slide-up` | Fade + slide up 30px |
| `.scroll-slide-left` | Fade + slide left 40px |
| `.scroll-slide-right` | Fade + slide right 40px |
| `.scroll-scale` | Fade + scale 0.9→1 |

**Remember**: Add `.is-visible` when `isVisible` is true

### Cards
| Class | Hover Effect |
|-------|--------------|
| `.card-hover` | Lift -8px + large shadow |
| `.card-hover-subtle` | Lift -4px + small shadow |

### Special Effects
| Class | Effect |
|-------|--------|
| `.gradient-text` | Static gradient text |
| `.gradient-text-animate` | Animated gradient |
| `.text-shimmer` | Shimmer across text |
| `.stat-number` | Number entrance |
| `.badge-pulse` | Pulsing animation |

### Utility
| Class | Delay |
|-------|-------|
| `.animate-delay-100` | 100ms |
| `.animate-delay-200` | 200ms |
| `.animate-delay-300` | 300ms |
| `.animate-delay-400` | 400ms |
| `.animate-delay-500` | 500ms |
| `.animate-delay-600` | 600ms |

---

## ⚡ Timing Guide

### Durations
- **Fast**: 0.3s (hovers, small UI)
- **Medium**: 0.6s-0.7s (standard content)
- **Slow**: 0.8s-1s (hero, large sections)

### Easing
- **ease-out**: Entrances, fade-ins
- **cubic-bezier(0.4, 0, 0.2, 1)**: Premium feel

### Delays
- **0ms**: First element
- **100-200ms**: Second element
- **300-400ms**: Hero CTAs
- **500-800ms**: Stats, final elements

---

## 🎨 Color Gradients

```css
/* Primary Gradient */
background: linear-gradient(147.776deg, #8e2021 2.3578%, #ff563f 52.662%, #ffb6f1 102.97%);

/* Gradient Text */
.gradient-text {
  background: linear-gradient(...);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🔧 React Hooks

### useScrollAnimation
```tsx
const { ref, isVisible } = useScrollAnimation({
  threshold: 0.2,      // 20% visible to trigger
  rootMargin: '0px',   // Margin around viewport
  triggerOnce: true    // Animate only once
});
```

### useStaggeredScrollAnimation
```tsx
const { refs, areVisible } = useStaggeredScrollAnimation(
  3,    // Number of items
  150   // Delay between items (ms)
);

{items.map((item, i) => (
  <div ref={refs[i]} className={areVisible[i] ? 'is-visible' : ''}>
    {item}
  </div>
))}
```

---

## 🎯 Component-Specific

### Navigation
```tsx
<Link className="link-underline-gradient">Link</Link>
<Button className="button-lift-hover">CTA</Button>
```

### Product Cards
```tsx
<Link className="card-hover">
  <ProductCard />
</Link>
```

### Feature Grid
```tsx
<div className="stagger-children">
  <FeatureCard /> {/* 100ms delay */}
  <FeatureCard /> {/* 200ms delay */}
  <FeatureCard /> {/* 300ms delay */}
</div>
```

---

## ✅ Checklist

Before deploying animations:
- [ ] Used only `transform` and `opacity`
- [ ] Duration 0.3s–0.8s
- [ ] Added scroll animations where appropriate
- [ ] Applied hover effects to buttons/cards
- [ ] Tested with reduced motion enabled
- [ ] Verified stagger doesn't exceed 6 items
- [ ] Checked mobile performance

---

## 📁 File Locations

- **Animations CSS**: `/src/styles/animations.css`
- **React Hooks**: `/src/app/hooks/useScrollAnimation.ts`
- **Example Usage**: `/src/app/pages/LandingPage.tsx`
- **Full Guide**: `/ANIMATION_GUIDE.md`

---

## 🐛 Quick Fixes

**Animation not working?**
- Check class name spelling
- Verify `.is-visible` added for scroll animations
- Ensure `ref` attached to element

**Too fast/slow?**
- Add `.animate-delay-XXX` class
- Check `prefers-reduced-motion` setting

**Scroll animation issues?**
- Adjust `threshold` (0.1–0.3)
- Check parent overflow settings
- Verify Intersection Observer support
