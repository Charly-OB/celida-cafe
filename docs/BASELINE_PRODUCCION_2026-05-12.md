# Baseline de Métricas — Producción
**Fecha**: 12 de mayo de 2026
**URL**: https://celida-cafe.vercel.app/
**Herramienta**: PageSpeed Insights (Lighthouse 13.0.1)
**Condiciones Mobile**: Moto G Power emulado, throttling 4G lenta, HeadlessChromium 146

---

## 📱 Lighthouse — Mobile

| Métrica | Score |
|---|---|
| **Performance** | 79 ⚠️ |
| **Accessibility** | 100 ✅ |
| **Best Practices** | 100 ✅ |
| **SEO** | 100 ✅ |

**Core Web Vitals Mobile**:
- FCP (First Contentful Paint): 1.9s
- LCP (Largest Contentful Paint): 4.6s ⚠️
- TBT (Total Blocking Time): 60ms ✅
- CLS (Cumulative Layout Shift): 0 ✅
- Speed Index: 5.0s

**Causa del LCP elevado**: imágenes en URLs externas (Vercel Blob Storage) + Hero usando `background-image` CSS sin preload. Se resuelve cuando lleguen las fotos reales del cliente (ver `KNOWN_ISSUES.md`).

---

## 🖥️ Lighthouse — Desktop

| Métrica | Score |
|---|---|
| **Performance** | 98 ✅ |
| **Accessibility** | 100 ✅ |
| **Best Practices** | 100 ✅ |
| **SEO** | 100 ✅ |

**Core Web Vitals Desktop**:
- FCP: 0.4s ✅
- LCP: 1.0s ✅
- TBT: 61ms ✅
- CLS: 0 ✅

---

## 🎯 Comparativa vs. baseline local (10 mayo)

| Métrica | Local Mobile | Producción Mobile | Producción Desktop |
|---|---|---|---|
| Performance | 85 | 79 | **98** ✅ |
| Accessibility | 100 | 100 ✅ | 100 ✅ |
| Best Practices | 96 | **100** ✅ | **100** ✅ |
| SEO | 100 | 100 ✅ | 100 ✅ |

**Nota**: La baja en Performance Mobile (85→79) se debe a que la red simulada en producción (4G lenta real) es más estricta que la emulación local de Lighthouse. El LCP de las imágenes externas es el factor dominante.

---

## ✅ Estado del deploy

- [x] Deploy exitoso en Vercel (Hobby plan)
- [x] GitHub Actions CI activo (lint + test + build en cada push)
- [x] Dependabot configurado (PRs semanales los lunes)
- [x] `@vercel/analytics` activo y colectando datos
- [x] HTTPS automático por Vercel
- [x] Next.js image optimization activada (`remotePatterns`)

---

## 📋 Bloqueantes para siguiente mejora

| Bloqueo | Impacto | Acción |
|---|---|---|
| Fotos reales pendientes | LCP Mobile 4.6s → ~1.5s | Recibir fotos, mover a `/public/images/` |
| Dominio real no registrado | URLs usan `celidacafe.com` placeholder | Confirmar con dueño |
| og-image.jpg no generada | Previews en redes sin imagen | Generar post-diseño final |

---

## 🚀 Objetivo próxima revisión (cuando lleguen las fotos)

- Performance Mobile ≥ 90
- LCP Mobile ≤ 2.5s
- Mantener Accessibility + SEO + Best Practices en 100
