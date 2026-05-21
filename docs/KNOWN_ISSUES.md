# Known Issues — celida-cafe

**Última actualización**: 21 de mayo de 2026
**Estado del proyecto**: En producción — `celida-cafe.vercel.app`

---

## 🚧 Bloqueado por decisiones externas (esperando inputs)

### Dominio no registrado
- **Status**: Pendiente decisión del dueño
- **Impacto**: `metadataBase`, `og:url`, sitemap y StructuredData usan placeholder `celidacafe.com`
- **Acción al resolver**: reemplazar URL en estos archivos:
  - `app/layout.tsx` (metadataBase)
  - `components/StructuredData.tsx` (schema image URL)
  - `app/sitemap.ts` (sitemap base URL)
  - `app/robots.ts` (robots base URL)

### og-image.jpg no generada
- **Status**: TODO documentado en `app/layout.tsx:29`
- **Especificación**: 1200×630 px, JPG optimizado, con logo Célida + tagline
- **Impacto**: previews en redes sociales se ven sin imagen
- **Acción**: generar cuando diseño visual final esté confirmado por dueño

### LCP móvil elevado (4.6s) — bloqueado por fotos pendientes
- **Status**: ⏸️ Bloqueado — esperando fotografías reales del cliente
- **Causa raíz**: las imágenes actuales son URLs externas (Vercel Blob Storage). El Hero usa `background-image` CSS, que el browser no puede priorizar ni precargar automáticamente.
- **Impacto**: Performance mobile = 79/100 (objetivo: ≥90). Desktop = 98/100 ✅
- **Solución al resolver**: 
  1. Colocar fotos reales en `/public/images/`
  2. Reemplazar `style={{ backgroundImage }}` del Hero por `<Image>` de Next.js con `priority`
  3. Actualizar `FEATURED_IMAGES` en `lib/constants.ts` a rutas locales (`/images/...`)
  4. Resultado esperado: LCP baja a ~1.5-2.0s, Performance mobile sube a ≥90

### Sección "Contacto" en navbar
- **Status**: Link en navbar apunta a sección no implementada (feature pendiente)
- **Impacto**: click no hace nada, pero es feature WIP, no bug
- **Decisión pendiente**: 
  - (a) eliminar link temporalmente
  - (b) reemplazar con scroll a Footer con info de contacto básica
  - (c) mantener href="#" hasta que se diseñe la sección
- **Recomendación técnica**: opción (b) para mejor UX inmediata

---

## ⚠️ Deuda técnica conocida

### WAVE Audit — 3 alerts restantes (de 7 originales)
Auditoría manual con WAVE Evaluation Tool dio **0 errores, 0 contrast errors, AIM Score 9.8/10**. En la auditoría del 21 may 2026 se corrigieron 4 de 7 alerts:

- ~~**4 Redundant alternative text**~~: ✅ Resuelto — Gallery, Footer, MenuItemDialog cambiadas a `alt=""`.
- ~~**1 Missing first level heading**~~: ✅ Resuelto — Logo en Hero.tsx envuelto en `<h1>`.
- ~~**1 Very small text**~~: ✅ Resuelto — Badge FOTO en MenuItem.tsx cambiado de 10px a `text-xs` (12px).
- **1 Possible heading**: texto que parece título marcado como párrafo. Pendiente de re-medir en URL pública.

**Target**: AIM Score 10/10 (pendiente re-medición post-deploy).

### Lighthouse Desktop no medible en localhost
- **Status**: Error NO_FCP en localhost (carga muy rápida para Lighthouse)
- **Workaround**: medido solo Mobile (85/100/100/96 — excelente)
- **Acción**: re-medir Desktop post-deploy a staging/producción

### ~~Cobertura de useActiveSection.ts (74%)~~ ✅ Resuelto (21 may 2026)
- Cobertura llevada a **100%** en todas las métricas con 6 nuevos tests en `__tests__/useActiveSection.test.ts`.

### Notas estéticas pendientes de aprobación del dueño
- Observaciones detectadas en Bloque 2 (auditoría manual mobile)
- **Acción**: presentar en próxima junta con Juan Carlos para aprobación
- (Ver notas separadas anotadas durante revisión manual del 10 de mayo)

---

## 🔧 Stack y dependencias — riesgos a monitorear

### Next.js 16.2.4 + Turbopack (bleeding edge)
- **Status**: Stack muy nuevo, ecosistema todavía estabilizándose
- **Riesgo**: incompatibilidades con plugins/libs de la comunidad
- **Monitoreo**: revisar release notes de Next en cada update
- **Plan B**: downgrade a Next 15 LTS si surgen issues bloqueantes

### Tailwind v4 (CSS-first config)
- **Status**: Sin `tailwind.config.js`, todo en CSS
- **Riesgo**: plugins de comunidad pueden no estar portados a v4
- **Acción**: antes de instalar cualquier plugin de Tailwind, verificar compatibilidad con v4

---

## 🎯 Mejoras futuras (no bloqueantes)

### Optimización de active section indicator en mobile
- `rootMargin: -50%` puede comportarse raro en viewports muy chiquitos (< 380px)
- Probar en dispositivos reales (no solo DevTools emulation)

### Bundle size analysis
- Correr `pnpm analyze` después del deploy para identificar oportunidades de tree-shake
- Focus en bundles de framer-motion y librerías de animación

### Dark mode toggle
- Actualmente diseño está locked en dark mode (requisito original)
- Si en el futuro se requiere light mode, hay que crear toggle + variables CSS

---

## 📅 Timeline de revisión

| Fecha | Acción | Responsable |
|---|---|---|
| 10 may 2026 | Auditoría inicial completada | Charly + IA pair |
| 21 may 2026 | Segunda auditoría: seguridad, a11y, tests | Charly + IA pair |
| Ago 2026 | Próxima revisión técnica (3 meses) | Charly |
| TBD | Pre-deploy a staging: re-medir Desktop Lighthouse + WAVE en URL pública | Charly |
| TBD | Post-deploy a producción: validación final + monitoring Core Web Vitals | Charly |

---

## 📞 Contactos del proyecto

- **Developer/Owner técnico**: Charly (Dial App)
- **Cliente/Dueño**: [nombre dueño Célida Café]
- **Stack**: Next.js 16.2.4 + TypeScript + Tailwind v4 + Framer Motion + shadcn/ui + Jest

---

**Próximo paso**: cuando el dueño confirme dominio + diseño final, resolver bloqueos externos y proceder a deploy.
