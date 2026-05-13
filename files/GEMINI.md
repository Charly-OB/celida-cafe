# GEMINI.md — Antigravity-specific overrides

> Reglas exclusivas para Antigravity (Gemini 3). Tienen **mayor prioridad** que `AGENTS.md` en conflictos.
> Para reglas compartidas con Cursor / Claude Code / Windsurf / Codex, ver `AGENTS.md`.

---

## 🤖 Agent Behavior

- **Idioma de chat:** español (México). Comunicar en español, código y commits en inglés.
- **Modo de trabajo preferido:** Plan → Aprobación → Ejecución → Verificación. NO auto-continue en operaciones destructivas.
- **Verbosidad:** balanceada. Mostrar el "por qué" técnico de las decisiones, sin sobreexplicar conceptos básicos.
- **Cuando dudes, pregunta.** Mejor una pregunta aclaratoria que 200 líneas de código incorrectas.

---

## 🧠 Knowledge Base usage (`.gemini/antigravity/brain/`)

- Cuando descubras una convención específica del proyecto que no esté en `AGENTS.md`, **propón agregarla al brain** (no la agregues silenciosamente).
- Antes de empezar tareas grandes, revisar el brain por decisiones arquitectónicas previas.
- Registrar en el brain: decisiones de stack, patrones de naming descubiertos, gotchas de librerías específicas.

---

## 🪄 Skills habilitadas para este proyecto

- `nextjs-app-router` — patrones App Router de Next 16
- `shadcn-ui` — agregar componentes vía CLI, no copy-paste
- `tailwind-v4` — uso del nuevo motor `@tailwindcss/postcss`
- `react-19-rsc` — Server Components first, Client Components solo cuando necesario
- `jest-testing-library` — patrones de testing con mocks de framer-motion

---

## 🎯 Antigravity-specific safety

- **Auto-continue:** permitido para lectura de archivos, búsquedas, lints, tests. **DESHABILITADO** para:
  - Cualquier `git` que modifique historial (`push`, `reset`, `rebase`, `force`).
  - Eliminación de archivos o directorios.
  - Modificaciones a `package.json` que cambien versiones major.
  - Modificaciones a archivos de configuración (`.eslintrc`, `tsconfig.json`, `next.config.*`).
  - Creación de archivos en `components/ui/` (territorio de shadcn).

- **Artifacts:** al completar una tarea, generar un artifact con: archivos modificados, decisiones tomadas, tests agregados, y siguiente acción sugerida.

- **MCP Servers permitidos:** GitHub (lectura de issues/PRs), Vercel (deploys), Supabase (si se conecta backend en el futuro). NO permitir MCPs de filesystem global ni de shell sin sandbox.

---

## 📊 Verification gates

Antes de marcar una tarea como completa, el agente debe verificar:

1. `npm run lint` → 0 errors, 0 warnings.
2. `npm run test` → todos los tests pasan.
3. `npm run build` → build exitoso.
4. Si se agregó/modificó un componente visible, screenshot del resultado (vía browser tool).
5. Si se tocó SEO, verificar que `sitemap.ts` y `StructuredData.tsx` sigan generando output válido.

---

## 🔄 Continuous Learning

Cuando termines una tarea, si descubriste algo que valga la pena recordar para futuras sesiones:

- Si es una preferencia personal del owner → propón actualizar este `GEMINI.md`.
- Si es una convención del proyecto → propón actualizar `AGENTS.md`.
- Si es conocimiento procedural reutilizable → propón crear un skill en `.agents/skills/`.

Siempre **proponer**, nunca actualizar silenciosamente.
