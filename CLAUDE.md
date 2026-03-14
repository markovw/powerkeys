# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite HMR)
npm run build    # Type-check + production build (tsc -b && vite build)
npm test         # Run tests once (Vitest)
```

No dedicated lint command — TypeScript strict mode (`strict: true`, `noUnusedLocals`, `noUnusedParameters`) enforces code quality at build time.

To run a single test file:
```bash
npx vitest run src/test/App.test.tsx
```

## Architecture

Single-component React app with no routing or external state management. All logic lives in `src/App.tsx`.

**Data flow:**
- `bindings[]` — array of `Binding` objects defining each Caps Lock + key shortcut (title, description, color accent, modifiers)
- `keyRows[][]` — 6 rows of `KeySpec` objects defining the physical keyboard layout
- `bindingMap` — `Map<string, Binding>` derived from `bindings[]` for O(1) lookup by key ID
- `positionKeyboard()` — converts `keyRows` into absolutely-positioned keycap elements
- `activeKeyId` state — drives the focus card display and `.keycap--selected` styling
- `copyState` state — manages clipboard button feedback (`idle | copied | failed`)

**Rendering sections:**
1. Hero header with "Copy config" button (writes Karabiner JSON to clipboard)
2. Focus card — updates on key hover/focus to show the active binding's details
3. Keyboard stage — absolutely-positioned keycap buttons, color-coded by binding

**CSS:** All styling in `styles.css` using CSS custom properties. Key classes: `.keycap--hyper` (has a binding), `.keycap--selected` (currently active), `.keycap--active` (hovered). Breakpoints at 900px and 640px.

**Tests:** `src/test/setup.ts` mocks `navigator.clipboard.writeText`. Three tests cover: heading render, focus state on key focus, clipboard copy flow.
