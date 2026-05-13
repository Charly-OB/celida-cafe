# PROJECT_CONTEXT — celida-cafe-spa

> Documento de contexto para handoff técnico (humano o IA).
> Última actualización: 2026-05-12 — Owner: Charly (Charly-OB)

---

## 🎯 Qué es este proyecto

SPA (Single Page Application) de marketing/conversión para **Célida Café**.
Landing page pública con secciones: Header, Hero, Menú, Galería, Conversión, Footer.

- Repo: `github.com/Charly-OB/celida-cafe` (privado)
- Estado: **Post-auditoría fases 1-3 completada** (commit `1a400ec`, único commit en main)
- Path local: `C:\Users\JuanCarlos\Desktop\Startup1\celida-cafe-spa`

---

## 🧱 Stack técnico

| Capa | Tech | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| Runtime | React | 19 |
| Lenguaje | TypeScript | 5.7.3 |
| Estilos | Tailwind CSS v4 | 4.2.0 |
| UI Kit | shadcn/ui sobre Radix | toda la suite |
| Formularios | react-hook-form + zod | 7.54 / 3.24 |
| Animación | framer-motion | 12.38 |
| Theming | next-themes | 0.4 (dark mode) |
| Testing | Jest 30 + Testing Library 16 | |
| Lint | ESLint 9 (flat) + Prettier 3.8 | + jsx-a11y |
| Analytics | @vercel/analytics | 1.6 |
| Bundle analyzer | @next/bundle-analyzer | script `npm run analyze` |
| Tooling AI | Claude Code | `.claude/settings.local.json` |

### Librerías instaladas pero sin uso confirmado en árbol
- `input-otp` (1.4) — terreno preparado para auth OTP
- `recharts` (2.15) — probablemente residuo de preset shadcn
- `react-day-picker` + `date-fns` — posible sistema de reservas a futuro

---

## 📂 Arquitectura de archivos

```
celida-cafe-spa/
├── app/                        # App Router (Next 16)
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing principal
│   ├── globals.css
│   ├── robots.ts               # SEO: robots.txt dinámico
│   └── sitemap.ts              # SEO: sitemap.xml dinámico
├── components/
│   ├── sections/               # Secciones de la landing
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Menu.tsx
│   │   ├── Gallery.tsx
│   │   ├── Conversion.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # Primitivos shadcn (accordion, alert-dialog, etc.)
│   ├── MenuItem.tsx
│   ├── MenuItemDialog.tsx      # Modal de detalle de producto
│   ├── StructuredData.tsx      # JSON-LD para SEO
│   └── theme-provider.tsx      # next-themes wrapper
├── __tests__/                  # Tests unitarios
│   ├── Header.test.tsx
│   ├── MenuItem.test.tsx
│   ├── StructuredData.test.tsx
│   └── useReducedMotion.test.ts
├── __mocks__/
│   └── framer-motion.tsx       # Mock para tests
├── components.json             # Config shadcn/ui
├── .prettierrc
└── package.json                # name: "my-project" ← pendiente cambiar
```

---

## ✅ Lo que ya está cubierto

- **SEO técnico:** JSON-LD structured data, sitemap y robots dinámicos
- **Accesibilidad:** `prefers-reduced-motion` respetado + Radix primitives + `eslint-plugin-jsx-a11y`
- **Dark mode:** vía `next-themes`
- **Tests unitarios:** Header, MenuItem, StructuredData, useReducedMotion
- **Performance hooks:** bundle analyzer configurado (`npm run analyze`)
- **Identidad visual:** "Editorial Noir" (dark mode, alto contraste, estética editorial premium)

---

## 🔧 Scripts disponibles

```bash
npm run dev          # dev server
npm run build        # build producción
npm run start        # servir build
npm run lint         # ESLint flat config
npm run test         # Jest una vez
npm run test:watch   # Jest watch mode
npm run analyze      # bundle analyzer
```

---

## ⚠️ Deuda técnica conocida

1. `package.json` → `"name": "my-project"` (default sin renombrar)
2. Sin CI/CD (no hay `.github/workflows/`)
3. Posibles dependencias muertas: `recharts`, `input-otp` (validar uso real)
4. Un solo commit en historial — falta granularidad para rollbacks quirúrgicos
5. Sin `.env.example` documentado (verificar si aplica)

---

## 🚀 Próximos pasos sugeridos (orden de prioridad)

1. Renombrar el proyecto en `package.json`
2. Auditar dependencias muertas con `npx depcheck`
3. Montar workflow de GitHub Actions: `lint + test + build` en PR
4. Definir si `input-otp` se queda (sistema de reservas/lealtad) o sale
5. Lighthouse audit en producción → fijar baseline de performance
6. Agregar tests de integración para flujo completo de la landing
7. Decidir hosting de producción (probablemente Vercel dado `@vercel/analytics`)

---

## 🎨 Identidad de marca (Editorial Noir)

- Modo oscuro como default
- Contrastes profundos
- Tipografía editorial (revisar `app/layout.tsx` para fonts)
- Estética de revista de lujo, no de "café típico"

---

## 👤 Contexto del owner

- **Charly** (GitHub: `Charly-OB`)
- Ubicación: Ensenada, Baja California, MX
- Rol: Analista de Datos + Founder/CEO de Dial App
- Preferencias: soluciones escalables, código completo, explicaciones del "por qué" técnico
- Stack secundario: Python, SQL, Supabase, Render, Docker, Railway
