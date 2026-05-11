# Known Issues — celida-cafe

**Última actualización**: 10 de mayo de 2026
**Estado del proyecto**: Post-auditoría (3 fases completadas), local-only

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

### WAVE Audit — 7 alerts no críticos
Auditoría manual con WAVE Evaluation Tool dio **0 errores, 0 contrast errors, AIM Score 9.8/10**. Quedaron 7 alerts amarillos:

- **4 Redundant alternative text**: imágenes con `alt` que duplica texto del contexto. Revisar y simplificar.
- **1 Missing first level heading**: verificar jerarquía de `<h1>` en página principal.
- **1 Possible heading**: texto que parece título marcado como párrafo.
- **1 Very small text**: identificar texto bajo 14px (probablemente footer/disclaimer) y considerar aumentar.

**Target post-fix**: AIM Score 10/10.

### Lighthouse Desktop no medible en localhost
- **Status**: Error NO_FCP en localhost (carga muy rápida para Lighthouse)
- **Workaround**: medido solo Mobile (85/100/100/96 — excelente)
- **Acción**: re-medir Desktop post-deploy a staging/producción

### Cobertura de useActiveSection.ts (74%)
- **Status**: Líneas 14-20 no cubiertas (edge cases de IntersectionObserver)
- **Impacto**: bajo (hook estable, comportamiento validado manualmente)
- **Acción opcional**: agregar tests de mock IntersectionObserver con thresholds variados

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
