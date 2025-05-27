# Encuesta de Uso de Software en Gerencia de Geología

Este proyecto es una aplicación React que utiliza [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) con Chakra UI para recolectar información sobre el uso de software en la Gerencia de Geología.

## Estructura

- **src/software_form.tsx**: Contiene el formulario principal y el esquema JSON con lógica condicional para mostrar preguntas según los softwares seleccionados.
- **public/**: Archivos estáticos.
- **package.json**: Dependencias y scripts del proyecto.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia la aplicación:
   ```
   npm run dev
   ```

## Uso

El formulario permite seleccionar los softwares utilizados y, según la selección, muestra preguntas adicionales sobre frecuencia de uso, nivel de entrenamiento, certificaciones y módulos utilizados.

## Personalización

Puedes modificar el archivo `src/software_form.tsx` para agregar o quitar softwares, cambiar preguntas o ajustar la lógica condicional.

## Tecnologías

- React
- react-jsonschema-form
- Chakra UI

## Licencia

Uso interno para Geovalidata / Gerencia de Geología Quellaveco.
