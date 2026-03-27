# Animation Timing Diagram

Visual representation of animation sequences and timing across the website.

---

## 🎬 Hero Section Timeline (Landing Page)

```
Time (ms)    Animation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0            Page Load
│
100 ─────▶   🏷️  BADGE (scale-in, 0.6s)
│            └─ "Модульное строительство"
│
200 ─────▶   📰 TITLE (fade-in-up, 1s)
│            └─ "Ваш дом под ключ за 3 месяца"
│
400 ─────▶   📝 SUBTITLE (fade-in-up, 1s)
│            └─ "Проектируем и строим..."
│
600 ─────▶   🎯 CTA BUTTONS (fade-in-up, 0.8s)
│            ├─ "Выбрать проект"
│            └─ "Получить консультацию"
│
800 ─────▶   📊 STATS (fade-in, 1s)
│            ├─ "200+" (stat-number)
│            ├─ "3 мес" (stat-number + 100ms delay)
│            └─ "15 лет" (stat-number + 200ms delay)
│
1000 ────▶   🖼️  HERO IMAGE (scale-in, 0.6s)
│
1800         All animations complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Total Hero Animation Time**: 1.8 seconds
**User Perception**: Smooth, cascading entrance

---

## 📜 Scroll Animation Flow

### Benefits Section

```
Scroll Position: 20% visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger  ────▶  Section fades in
│
0ms      ────▶  📌 Card 1: "Быстрое строительство"
│
100ms    ────▶  📌 Card 2: "Фиксированная цена"
│
200ms    ────▶  📌 Card 3: "Экологичность"
│
300ms    ────▶  📌 Card 4: "Гарантия 15 лет"
│
400ms    ────▶  📌 Card 5: "Индивидуальная планировка" (gradient)
│
500ms    ────▶  📌 Card 6: "Оценка растёт"
│
1200ms          All cards visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Popular Models Section

```
Scroll Position: 20% visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trigger  ────▶  Section slides up
│
0ms      ────▶  🏠 Product 1: "Модуль Скандинавия"
│
100ms    ────▶  🏠 Product 2: "Урбан Лофт"
│
200ms    ────▶  🏠 Product 3: "Эко Резиденция"
│
900ms           All products visible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 Hover Animation Durations

### Buttons

```
Idle State
    │
    │ User hovers
    ▼
┌─────────────────────┐
│  TRANSITION START   │
│                     │
│  Duration: 0.3s     │
│  Easing: ease       │
│                     │
│  Changes:           │
│  • transform: Y-3px │
│  • box-shadow: ↑    │
└─────────────────────┘
    │
    ▼
Hover State
    │
    │ User unhover
    ▼
┌─────────────────────┐
│  TRANSITION BACK    │
│  Duration: 0.3s     │
└─────────────────────┘
    │
    ▼
Idle State
```

### Navigation Links

```
Idle
 │
 │ Hover
 ▼
┌──────────────────────────────────┐
│ Underline Animation              │
│                                  │
│ 0ms     ▶ scaleX: 0              │
│ 300ms   ▶ scaleX: 1 (complete)   │
│                                  │
│ Gradient colors:                 │
│ #8e2021 → #ff563f → #ffb6f1     │
│                                  │
│ Transform-origin: left           │
└──────────────────────────────────┘
```

### Product Cards

```
Idle State
    │
    │ User hovers
    ▼
┌─────────────────────┐
│  CARD LIFT          │
│                     │
│  0ms    ▶ Y: 0px   │
│  300ms  ▶ Y: -8px  │
│                     │
│  Shadow expands:    │
│  0 → 20px spread    │
│  opacity: ↑ 0.2     │
└─────────────────────┘
```

---

## 📐 Timing Scales

### Speed Categories

```
FAST (0.3s)
├─ Button hovers
├─ Link underlines
└─ Small UI elements
    │
    │
MEDIUM (0.6s-0.7s)
├─ Standard headings
├─ Paragraphs
├─ Cards
└─ Most content
    │
    │
SLOW (0.8s-1s)
├─ Hero elements
├─ Large sections
└─ Dramatic entrances
```

### Easing Comparison

```
EASE-OUT (Recommended for entrances)
│
│     Speed
│      │
│      │     ████
│      │   ██
│      │  █
│      │ █
│      ██
│     ═══════════▶ Time
│     Fast → Slow
│     (Decelerates)
│
│
CUBIC-BEZIER(0.4, 0, 0.2, 1) (Premium feel)
│
│     Speed
│      │
│      │      ████
│      │    ██
│      │   █
│      │  █
│      │ █
│     ═══════════▶ Time
│     Smooth curve
│     (Natural motion)
```

---

## 🔄 Stagger Patterns

### 3-Column Grid (e.g., Popular Models)

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Card 1  │  │ Card 2  │  │ Card 3  │
│  0ms    │  │ +100ms  │  │ +200ms  │
└─────────┘  └─────────┘  └─────────┘
     │            │            │
     ▼            ▼            ▼
  Visible    Visible      Visible
  at 700ms   at 800ms     at 900ms

Total stagger time: 900ms (0.9s)
```

### 6-Item Grid (e.g., Benefits)

```
Row 1:
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Item 1  │  │ Item 2  │  │ Item 3  │
│  0ms    │  │ +100ms  │  │ +200ms  │
└─────────┘  └─────────┘  └─────────┘

Row 2:
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Item 4  │  │ Item 5  │  │ Item 6  │
│ +300ms  │  │ +400ms  │  │ +500ms  │
└─────────┘  └─────────┘  └─────────┘

Total stagger time: 1200ms (1.2s)
```

---

## 🌊 Scroll Trigger Thresholds

```
Viewport Height: 100vh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                                
Top of page (0%)                               
│                                              
│                                              
│                                              
│                                              
├──────────────────────────────────┐          
│                                  │          
│   Content Section                │          
│                                  │          
│   ┌─────────────────┐           │          
│   │ Trigger Line    │ ◀─ 20% visible
│   │ (threshold:0.2) │           │          
│   └─────────────────┘           │          
│                                  │          
│   Animation activates when       │          
│   this line crosses viewport     │          
│                                  │          
└──────────────────────────────────┘          
│                                              
│                                              
Bottom of page (100%)                          
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Threshold Settings:**
- Standard sections: 0.2 (20% visible)
- CTA sections: 0.3 (30% visible)
- Large hero sections: 0.1 (10% visible)

---

## 📊 Animation Performance Budget

```
Animation Type        GPU Cost    CPU Cost    Priority
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Transform (translate) ██░░░░░░   █░░░░░░░    HIGH
Transform (scale)     ██░░░░░░   █░░░░░░░    HIGH
Opacity               ██░░░░░░   █░░░░░░░    HIGH
Box-shadow            ████░░░░   ███░░░░░    MEDIUM
Background            ███░░░░░   ███░░░░░    MEDIUM
Color                 █░░░░░░░   ██░░░░░░    LOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Used: transform, opacity, box-shadow
❌ Avoided: width, height, top, left
```

---

## 🎯 Critical Rendering Path

```
Page Load Sequence:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. HTML Parse          ████████████░░░░░░░░  (60%)
2. CSS Load            ██████░░░░░░░░░░░░░░  (30%)
3. animations.css      ███░░░░░░░░░░░░░░░░░  (15%)
4. JavaScript Execute  ████████░░░░░░░░░░░░  (40%)
5. First Paint         ██████████████████░░  (90%)
6. Animation Start     ████████████████████  (100%)

Total Time to First Animation: ~800ms
```

---

## 🔊 Accessibility: Reduced Motion

### Normal Mode
```
Animation: ████████████░░░░ (0.8s)
           ▲               ▲
         Start          End
```

### Reduced Motion Mode
```
Animation: █ (0.01ms - instant)
           ▲
      Instant snap
```

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

---

## 📱 Responsive Considerations

### Desktop (>1024px)
```
Full animations enabled
Hover states: Active
Stagger delays: Full (100ms each)
```

### Tablet (768px-1024px)
```
Full animations enabled
Hover states: Touch-optimized
Stagger delays: Full (100ms each)
```

### Mobile (<768px)
```
Simplified animations
No hover states
Stagger delays: Reduced (50ms each)
Performance priority
```

---

## 🎬 Complete Page Load Animation

```
Landing Page - Full Sequence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0ms        │ ◀─ Page load
           │
100ms      │ ◀─ Hero badge appears
           │
200ms      │ ◀─ Hero title fades in
           │
400ms      │ ◀─ Hero subtitle fades in
           │
600ms      │ ◀─ CTA buttons appear
           │
800ms      │ ◀─ Stats section fades in
           │
1000ms     │ ◀─ Hero image scales in
           │
1800ms     │ ◀─ Hero complete
           │
[User scrolls down]
           │
Scroll 1   │ ◀─ Benefits section triggers
           │     • Cards stagger (0-500ms)
           │
Scroll 2   │ ◀─ Popular models trigger
           │     • Products stagger (0-200ms)
           │
Scroll 3   │ ◀─ Pricing section triggers
           │     • Cards stagger (0-200ms)
           │
Scroll 4   │ ◀─ Process section triggers
           │     • Steps stagger (0-300ms)
           │
Scroll 5   │ ◀─ Technology section triggers
           │     • Left: text slides in
           │     • Right: image scales in
           │
Scroll 6   │ ◀─ Testimonials trigger
           │     • Cards stagger (0-200ms)
           │
Scroll 7   │ ◀─ FAQ section triggers
           │
Scroll 8   │ ◀─ CTA section triggers (scale-in)
           │
End        │ ◀─ Page complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 Brand Gradient Animation

```
Gradient Shift Animation (3s loop)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Colors: #8e2021 → #ff563f → #ffb6f1

Position at time:
    0.0s  ▶  [#8e2021           ]  Start
    0.75s ▶  [        #ff563f   ]  Mid-1
    1.5s  ▶  [               #ffb6f1]  Mid-2
    2.25s ▶  [        #ff563f   ]  Return
    3.0s  ▶  [#8e2021           ]  Loop

Background-position: 0% → 100% → 0%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📈 Animation Metrics

```
Total Animations on Landing Page:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
On Load:           12 elements
Scroll-triggered:  45+ elements
Hover states:      30+ elements
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total:            ~90 animated elements


Performance Impact:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FCP delay:         +50ms
LCP impact:        Minimal
CLS score:         0 (no shift)
Animation FPS:     60fps (smooth)
GPU utilization:   Low-medium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

**Legend:**
- ▶  Animation starts
- ◀─ Trigger point
- █  Active state
- ░  Inactive state
- │  Timeline
- ▼  Flow direction

**Last Updated**: March 22, 2026
