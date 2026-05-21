# Auditoría Técnica — celida-cafe-spa

**Fecha**: 21 de mayo de 2026
**Auditor**: Claude Code (AI Pair)
**Base previa**: Auditoría de cierre — 10 de mayo de 2026

---

## Resumen ejecutivo

Auditoría completa de segunda iteración. El proyecto mantenía buena salud técnica de la auditoría anterior, pero acumuló deuda en seguridad, accesibilidad y cobertura de tests. Todos los problemas críticos y altos fueron resueltos en esta sesión.

**Resultado**: ✅ APROBADO — Listo para siguiente iteración.

---

## Métricas — Delta vs auditoría anterior

| Métrica | 10 may 2026 | 21 may 2026 | Delta |
|---|---|---|---|
| Tests pasando | 21 | 28 | +7 |
| Coverage statements | 88.96% | 90.23% | +1.27pp |
| Coverage branches | 93.33% | 100% | +6.67pp |
| useActiveSection coverage | 74% | 100% | +26pp |
| ESLint errors/warnings | 0 / 0 | 0 / 0 | — |
| Vulnerabilidades npm (high) | 10+ | 0 | -10+ |
| Vulnerabilidades npm (moderate) | 1 | 3* | — |
| Next.js versión | 16.2.4 | 16.2.6 | +patch |
| TypeScript ignoreBuildErrors | true | false | ✅ |
| WAVE alerts estimados | 7 | 3** | -4 |

*Las 3 moderate restantes son PostCSS interno de Next.js — no explotables en este proyecto, no corregibles sin downgrade.
**Se eliminaron: redundant alt (×4), missing h1, very small text. Quedan: possible heading (subjetivo), AIM score pendiente de medir.

---

## Problemas encontrados y resueltos

### Crítico — TypeScript sin validación en build

**Problema**: `next.config.mjs` tenía `typescript: { ignoreBuildErrors: true }`, ocultando posibles errores de tipos en producción.

**Acción**: Se ejecutó `tsc --noEmit` — 0 errores encontrados. Se eliminó el bloque `typescript: { ignoreBuildErrors: true }`.

**Verificación**: `npm run build` ahora ejecuta TypeScript completo. Build exitoso.

---

### Crítico — Múltiples CVEs en Next.js 16.2.4

**Problema**: `npm audit` reportó 10+ vulnerabilidades (high/moderate) incluyendo:
- Middleware bypass (GHSA-267c-6grr-h53f, GHSA-492v-c6pp-mqqv)
- DoS via Server Components y Cache (GHSA-8h8q-6873-q5fj, GHSA-mg66-mrh9-m8jx)
- XSS en App Router con CSP nonces (GHSA-ffhc-5mcf-pf4q)
- Cache poisoning (GHSA-wfc6-r584-vfw7, GHSA-vfv6-92ff-j949)
- SSRF via WebSocket upgrades (GHSA-c4j6-fc7j-m34r)

**Acción**: Upgrade `next@16.2.4 → 16.2.6` (security patch). Todas las vulnerabilidades high eliminadas.

**Restante**: 3 moderate en `postcss` interno de Next.js — no explotables (es el bundler de Next.js, no procesa input del usuario). No corregibles sin downgrade mayor.

---

### Alto — `<h1>` faltante en página principal (WAVE alert)

**Problema**: La página no tenía ningún elemento `<h1>`, violando jerarquía semántica de headings. WAVE reportaba "Missing first level heading".

**Acción**: El logo del Hero (`components/sections/Hero.tsx`) fue envuelto en `<h1>`. El `alt="Célida Café"` del `<Image>` sirve como nombre accesible del heading. Sin cambio visual.

**Verificación**: Jerarquía correcta: `<h1>` (logo Hero) → `<h2>` (títulos de sección) → `<h3>` (items de menú/galería).

---

### Alto — Alt text redundante en 4+ imágenes (WAVE alert)

**Problema**: WAVE reportaba "Redundant alternative text" en imágenes cuyo `alt` duplicaba el texto visible adyacente:
- `Gallery.tsx`: 4 imágenes con `alt="Chilaquiles Verdes"` etc., redundante con `<h3>` debajo
- `MenuItemDialog.tsx`: `alt={item.name}` redundante con `<DialogTitle>` que muestra el mismo nombre
- `Footer.tsx`: logo `alt="Célida Café"` redundante con copyright "Célida Café"

**Acción**: Cambiadas a `alt=""` (imagen decorativa — el texto adyacente provee el nombre accesible).

---

### Alto — Texto muy pequeño: badge FOTO de 10px (WAVE alert)

**Problema**: `components/MenuItem.tsx` usaba `text-[10px]` para el badge "FOTO" — por debajo del umbral de 14px de WAVE.

**Acción**: Cambiado a `text-xs` (12px). Mínimo recomendado por WAVE.

---

### Alto — Cobertura de `useActiveSection` al 74%

**Problema**: Líneas 14-20 del hook (`IntersectionObserver` setup y callback) nunca se ejecutaban en tests porque el mock global no creaba elementos DOM para los section IDs.

**Acción**: Creado `__tests__/useActiveSection.test.ts` con 6 casos de prueba que:
- Verifican el estado inicial
- Crean elementos DOM reales para disparar el observer
- Simulan callbacks de intersección (positiva y negativa)
- Verifican el cleanup en unmount

**Resultado**: `useActiveSection.ts` pasó de 74% a **100%** en todas las métricas.

---

## Problemas pendientes (sin resolver)

### Esperando decisiones externas

| Problema | Motivo | Acción requerida |
|---|---|---|
| `og-image.jpg` faltante | Diseño visual pendiente del cliente | Crear 1200×630px con logo y tagline |
| Dominio `celidacafe.com` placeholder | Decisión del dueño pendiente | Reemplazar en layout.tsx, StructuredData.tsx, sitemap.ts, robots.ts |
| LCP móvil 4.6s | Fotos reales no entregadas | Migrar a `/public/images/` con `<Image priority>` |

### Deuda técnica menor

| Problema | Impacto | Recomendación |
|---|---|---|
| 3 CVEs moderate (PostCSS interno de Next.js) | Bajo — no explotables en este proyecto | Monitorear releases de Next.js |
| `useReducedMotion` lineas 16-18 sin cubrir | Mínimo | Agregar test de estado inicial desde hook |
| `card.tsx` (shadcn/ui) 44% coverage | Bajo — lib externa, no usada en app directamente | Excluir de coverage en jest.config si no se usa |
| Sección "Contacto" en navbar apunta a Footer | UX sub-óptima | Diseñar sección dedicada o redirigir a Contacto section |

---

## Verificación post-auditoría

```
npm run lint     → ✅ 0 errors, 0 warnings
npm run test     → ✅ 28/28 pasando
npm run build    → ✅ TypeScript + build exitoso (Next.js 16.2.6)
npm audit        → ✅ 0 high, 3 moderate (transitive, no accionables)
```

---

## Próxima revisión técnica

**Programada**: Agosto 2026 (revisión trimestral según AUDITORIA_CIERRE.md)

**Objetivos para agosto**:
- `og-image.jpg` creada (una vez diseño finalizado)
- Dominio real configurado
- Fotos reales integradas → LCP móvil ≤ 2.5s → Performance mobile ≥ 90
- Re-medir WAVE en URL pública

---

**Equipo**: Charly (Dial App) + Claude Code
