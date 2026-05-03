# Round Calendar — Vite + React + TypeScript

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Typecheck + build | `npm run build` (runs `tsc -b && vite build`) |
| Lint | `npm run lint` |
| Preview production build | `npm run preview` |

Typecheck separately: `npx tsc --noEmit`

## Key facts

- **Week starts Monday.** `getFirstDayOfMonth` converts JS Sunday=0 to Monday=0 via `(getDay() + 6) % 7`
- **Calendar layout:** 3 rows × 5 columns CSS grid. Months placed clockwise: Jan top-center → Mar top-right → Apr right → May bottom-right → Jun/Jul/Aug bottom → Sep bottom-left → Oct left → Nov/Dec top-left
- **Entrypoint:** `src/main.tsx` → `src/App.tsx`
- **Components:** `YearSelector`, `RoundCalendar` (grid), `MonthCell` (mini month grid)
- **Calendar logic:** `src/utils/calendar.ts`
- **Today highlighted** via `isToday()` check (blue circle, `.day.today`)
- **Month cell width:** 250px
- **No tests** configured
- **React 19, TypeScript ~6.0, Vite 8, ESLint**
- **Styled with plain CSS** (no CSS-in-JS, no Tailwind)
