# AGENTS.md — celida-cafe-spa

> Constitución del proyecto para agentes de IA (Antigravity, Cursor, Claude Code, Windsurf, Codex).
> El agente debe leer este archivo al inicio de cada sesión y respetar sus reglas durante toda la tarea.

---

## 🎯 Project Context

- **Proyecto:** `celida-cafe-spa`
- **Tipo:** Single Page Application de marketing/conversión para **Célida Café**.
- **Repo:** `github.com/Charly-OB/celida-cafe`
- **Owner:** Charly (GitHub: `Charly-OB`) — Ensenada, Baja California, MX.
- **Estado actual:** Post-auditoría fases 1-3 (commit `1a400ec`, 2026-05-11). Working tree limpio.
- **Identidad visual:** **"Editorial Noir"** — modo oscuro por defecto, alto contraste, estética de revista de lujo. NO usar el típico look de "café acogedor con marrones cálidos".

---

## 🧱 Tech Stack (versiones reales — NO cambiar sin aprobación)

- **Framework:** Next.js 16.2.4 (App Router, NO Pages Router)
- **Runtime:** React 19 (Server Components disponibles)
- **Lenguaje:** TypeScript 5.7.3 — strict mode obligatorio
- **Estilos:** Tailwind CSS 4.2.0 (motor nuevo `@tailwindcss/postcss`)
- **UI:** shadcn/ui sobre Radix UI (toda la suite ya instalada en `components/ui/`)
- **Formularios:** react-hook-form 7.54 + zod 3.24 + `@hookform/resolvers`
- **Animación:** framer-motion 12.38
- **Theming:** next-themes 0.4 (dark mode default)
- **Toasts:** sonner 1.7
- **Drawers móviles:** vaul 1.1
- **Carrusel:** embla-carousel-react 8.6
- **Charts:** recharts 2.15 *(validar si se usa, posible candidato a remover)*
- **Calendario:** react-day-picker 9.13 + date-fns 4.1
- **Auth/OTP:** input-otp 1.4 *(instalado pero sin uso confirmado)*
- **Analytics:** @vercel/analytics 1.6
- **Tests:** Jest 30 + Testing Library 16 + ts-jest + jest-environment-jsdom
- **Lint:** ESLint 9 (flat config) + Prettier 3.8 + `eslint-plugin-jsx-a11y`
- **Bundle analyzer:** `@next/bundle-analyzer` (script `npm run analyze`)

---

## 📂 Project Structure

```
celida-cafe-spa/
├── app/                        # App Router (Next 16) — toda ruta vive aquí
│   ├── layout.tsx              # Root layout (incluye ThemeProvider)
│   ├── page.tsx                # Landing principal (compone las sections)
│   ├── globals.css             # Tailwind directives + variables CSS globales
│   ├── robots.ts               # robots.txt dinámico
│   └── sitemap.ts              # sitemap.xml dinámico
├── components/
│   ├── sections/               # Secciones de la landing (Header → Hero → Menu → Gallery → Conversion → Footer)
│   ├── ui/                     # Primitivos shadcn — NO editar manualmente, usar `npx shadcn add`
│   ├── MenuItem.tsx            # Card de producto del menú
│   ├── MenuItemDialog.tsx      # Modal de detalle de producto
│   ├── StructuredData.tsx      # JSON-LD para SEO (Schema.org)
│   └── theme-provider.tsx      # Wrapper de next-themes
├── __tests__/                  # Tests unitarios (Jest + Testing Library)
├── __mocks__/
│   └── framer-motion.tsx       # Mock obligatorio para tests con animaciones
├── components.json             # Config shadcn/ui
└── .prettierrc
```

**Convenciones de archivos:**
- Componentes nuevos en PascalCase (`MenuItem.tsx`, no `menu-item.tsx`).
- Hooks en camelCase con prefijo `use` (`useReducedMotion.ts`).
- Tests espejan el path del archivo: `components/Foo.tsx` → `__tests__/Foo.test.tsx`.

---

## 🎨 Code Style

### TypeScript
- **strict mode siempre activo.** Nunca `any` sin un comentario `// @ts-expect-error` justificado.
- Preferir `interface` para shapes de objetos, `type` para uniones/intersecciones.
- Named exports sobre default exports (excepto en `app/page.tsx` y `app/layout.tsx` que Next requiere default).
- Arrow functions para callbacks, function declarations para componentes top-level.

### React
- **Solo functional components.** Nunca clases.
- Aprovechar **React Server Components por defecto**. Solo agregar `"use client"` cuando sea estrictamente necesario (hooks, event handlers, browser APIs).
- Mantener Client Components lo más abajo posible en el árbol (push down the client boundary).

### Estilos
- **Tailwind v4** únicamente. NO escribir CSS suelto excepto en `globals.css` para variables/resets.
- Variables CSS para tokens de marca ("Editorial Noir") en `globals.css`.
- Usar `cn()` helper (de `lib/utils`) para combinar clases condicionales.
- Animaciones via framer-motion, no via Tailwind transitions cuando hay lógica compleja.

### shadcn/ui
- Agregar componentes con `npx shadcn add <componente>`, NUNCA copiando código manualmente.
- Los componentes en `components/ui/` son editables pero documenta cualquier modificación.

### Imports
- Orden: React → librerías externas → alias internos (`@/`) → relativos.
- Usar el alias `@/` configurado en `tsconfig.json`.

---

## 🛠️ Commands

```bash
npm run dev          # Dev server en localhost:3000
npm run build        # Build de producción (debe pasar siempre antes de merge)
npm run start        # Servir el build
npm run lint         # ESLint flat config — debe pasar sin warnings
npm run test         # Jest una sola vez
npm run test:watch   # Jest en watch mode
npm run analyze      # Bundle analyzer (abre reporte HTML)
```

**Antes de cualquier commit el agente debe correr:** `npm run lint && npm run test && npm run build`. Si alguno falla, no commitear.

---

## 🌿 Git Conventions

- **Branch principal:** `main`
- **Conventional Commits obligatorio:**
  - `feat:` nueva funcionalidad
  - `fix:` corrección de bug
  - `refactor:` cambio interno sin alterar comportamiento
  - `perf:` mejora de performance
  - `test:` agregar/modificar tests
  - `docs:` documentación
  - `chore:` mantenimiento (deps, config)
  - `style:` formato/lint (no cambio funcional)
- **Atomicidad:** un commit = una unidad lógica. Si el mensaje necesita "y", son dos commits.
- **Mensajes en inglés**, descripción corta (<72 caracteres), imperativo ("add" no "added").
- Antes de hacer push: `git pull --rebase origin main`.

---

## 🛡️ Critical Safety Rules (Guardrails)

Estas reglas **overridean** el auto-continue de Antigravity. El agente DEBE pausar y pedir confirmación humana en estos casos:

1. **Nunca eliminar archivos** sin confirmación explícita del usuario en el chat.
2. **Nunca commitear ni pushear** sin que el usuario lo apruebe explícitamente.
3. **Nunca correr `git push --force`** ni `git reset --hard` sobre commits ya pusheados.
4. **Nunca modificar `package.json` versiones major** (Next, React, Tailwind, TS) sin aprobación. Patches y minors están OK.
5. **Nunca editar archivos en `components/ui/`** sin avisar — son generados por shadcn.
6. **Nunca agregar dependencias nuevas** sin justificar el por qué y comparar contra alternativas ya instaladas.
7. **Nunca deshabilitar reglas de ESLint** mediante `// eslint-disable` sin un comentario que explique el motivo.
8. **Nunca deshabilitar tests** con `.skip` o `xit`. Si un test rompe, arreglar el código o el test, no esconderlo.
9. **Nunca usar `any` ni `@ts-ignore`** sin un comentario justificando.
10. **Nunca exponer secrets** (API keys, tokens) en el código. Usar `.env.local` (ignorado por git) y `process.env.*`.
11. **Antes de cualquier refactor que toque >5 archivos**, presentar un plan al usuario y esperar aprobación.

---

## ⚠️ Project-Specific Gotchas

- **`framer-motion` requiere mock en tests.** El mock vive en `__mocks__/framer-motion.tsx`. Si agregas componentes que usan motion, los tests deben seguir funcionando con ese mock.
- **`useReducedMotion` debe respetarse en cualquier animación nueva.** El usuario tiene tests que verifican esto. No introducir animaciones que ignoren `prefers-reduced-motion`.
- **Dark mode es el default**, no light mode. Cualquier nuevo componente debe lucir bien en dark primero, light segundo.
- **SEO es crítico:** si agregas páginas nuevas, actualizar `app/sitemap.ts` y considerar agregar JSON-LD en `StructuredData.tsx`.
- **El `package.json` tiene `"name": "my-project"`** (default sin renombrar). Tarea pendiente: cambiar a `"celida-cafe-spa"`.
- **Sin CI/CD montado todavía.** No existe `.github/workflows/`. Si se agrega, debe incluir lint + test + build.
- **Posibles dependencias muertas:** `recharts` e `input-otp` están instaladas pero sin uso confirmado en el árbol de componentes. Validar antes de usarlas o removerlas.

---

## ✅ Lo que YA está cubierto (no reinventar)

- SEO técnico: JSON-LD, sitemap dinámico, robots dinámico.
- Accesibilidad: `prefers-reduced-motion` respetado + Radix primitives + `eslint-plugin-jsx-a11y`.
- Dark mode vía `next-themes`.
- Tests unitarios: Header, MenuItem, StructuredData, useReducedMotion.
- Bundle analyzer configurado.
- Prettier + ESLint flat config.

---

## 🚀 Roadmap sugerido (orden de prioridad)

1. Renombrar `package.json` → `"name": "celida-cafe-spa"`.
2. Montar GitHub Actions: workflow con `lint + test + build` en cada push y PR.
3. Auditar dependencias muertas con `npx depcheck`.
4. Definir destino de `input-otp` (sistema de reservas/lealtad) o remover.
5. Lighthouse baseline en producción → fijar métricas objetivo (LCP <2.5s, CLS <0.1).
6. Tests de integración para flujo completo de la landing.
7. Decidir hosting de producción (probablemente Vercel dado `@vercel/analytics`).

---

## 👤 Owner Preferences

- Idioma de comunicación: **español** (México). Código y commits en inglés.
- Estilo: directo, técnico, conciso. Explicar el "por qué" de las decisiones.
- Sugerir mejoras proactivas, pero pedir aprobación antes de implementarlas.
- Si una instrucción es ambigua, **hacer preguntas aclaratorias** antes de generar código extenso.
