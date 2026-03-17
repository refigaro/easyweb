# Convención de Commits (Easyweb)

Este documento define el formato recomendado para los próximos commits del proyecto.

## Formato base

Usar siempre:

`tipo: mensaje corto en infinitivo`

Ejemplos de estilo del mensaje:
- `agregar sección de testimonios`
- `corregir enlaces de navegación`
- `ajustar espaciado del hero`

## Tipos permitidos

- `feat`: nueva sección o funcionalidad
- `fix`: corrección de errores
- `refactor`: reestructura interna sin cambiar comportamiento
- `style`: cambios visuales o de estilos
- `content`: cambios de textos, imágenes o contenido editorial
- `chore`: mantenimiento técnico (configuración, limpieza, gitignore, etc.)

## Ejemplos para este proyecto

- `feat: agregar sección de testimonios en home`
- `fix: corregir enlaces de navegación en páginas de servicios`
- `style: ajustar espaciado y tipografía en hero principal`
- `content: actualizar copy de CTA en our-work`
- `chore: agregar reglas de gitignore para entorno local`

## Reglas prácticas

- Un commit debe resolver una sola intención principal.
- Evitar títulos largos; idealmente <= 72 caracteres.
- Escribir siempre en español para consistencia del equipo.
- Si el cambio es importante, agregar descripción con viñetas en el cuerpo del commit.

## Plantilla recomendada

Título:

`tipo: acción concreta del cambio`

Descripción (opcional):

- Qué se cambió
- Dónde se cambió
- Por qué se cambió
- Impacto esperado

## Comando sugerido

```bash
git commit -m "fix: corregir enlaces de navegación en servicios" \
  -m "- Se actualizaron rutas internas hacia páginas existentes.
- Se verificó navegación en desktop y mobile.
- No se modificó contenido comercial."
```
