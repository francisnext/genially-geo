# Genially Geo - Análisis de Competidores y Auditoría de IA

Esta aplicación permite analizar la posición de Genially frente a sus competidores y auditar URLs para simular su visibilidad en búsquedas de IA.

## 🚀 Características

### 📊 Análisis de Competidores
- Visualización de datos de competidores con gráficos interactivos
- Filtros por IA y marcas seleccionadas
- Cálculo de "share of voice" (porcentaje de menciones)
- Autocompletado para selección de marcas

### 🔍 Auditoría de IA
- Análisis de URLs para simular visibilidad en búsquedas de IA
- Extracción inteligente de contenido usando parsing HTML propio
- Generación de consultas sintéticas con Gemini
- Cálculo de cobertura basado en similitud coseno
- Logs detallados en tiempo real

## 🛠️ Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Gemini API
GEMINI_API_KEY=tu_api_key_de_gemini
```

### 3. Obtener API Key de Google Gemini
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia la key y pégala en tu archivo `.env.local`

### 4. Ejecutar la aplicación
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
genially-geo/
├── app/
│   ├── api/
│   │   ├── audit-url/          # API para auditoría de URLs
│   │   └── optimizador-analyze/ # API para análisis de competidores
│   ├── analisis-competidores/  # Página de análisis de competidores
│   ├── audit/                  # Página de auditoría de IA
│   └── ...
├── components/                 # Componentes reutilizables
├── data/                      # Datos de competidores
└── lib/                       # Utilidades y funciones
```

## 🔧 Tecnologías Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Gráficos**: Recharts
- **IA**: Google Gemini API
- **Parsing HTML**: Regex personalizado para extracción de contenido

## 📊 Funcionalidades Detalladas

### Análisis de Competidores
- Gráfico de barras mostrando "share of voice" por plataforma
- Filtro por IA con opción "Todas" (promedio de todas las IAs)
- Selección de marcas con Genially siempre incluido
- Autocompletado para añadir más marcas

### Auditoría de IA
- **Extracción de contenido**: Parsing HTML propio que extrae:
  - Headings (h1-h6)
  - Párrafos (p)
  - Elementos de lista (li)
  - Divs con contenido significativo
- **Análisis de entidad**: Identificación de la entidad principal
- **Generación de consultas**: 5 consultas sintéticas relevantes
- **Cálculo de cobertura**: Similitud coseno entre consultas y contenido
- **Logs en tiempo real**: Visibilidad completa del proceso

## 🎯 Uso

### Análisis de Competidores
1. Ve a la página "Análisis de Competidores"
2. Selecciona una IA del dropdown (o "Todas")
3. Añade o quita marcas usando el autocompletado
4. Visualiza el "share of voice" en el gráfico

### Auditoría de IA
1. Ve a la página "Auditoría de IA"
2. Ingresa una URL para auditar
3. Observa los logs en tiempo real
4. Revisa los resultados:
   - Entidad detectada
   - Porcentaje de cobertura
   - Consultas con estado de cobertura
   - Chunks más relevantes

## 🔍 Logs de Auditoría

La auditoría muestra logs detallados como:
```
✅ HTML fetched successfully (Length: 538,562 characters)
✅ Chunks extracted successfully (Extracted 590 chunks)
✅ Entity extracted successfully (Entity: Genially)
✅ Queries generated successfully (Generated 5 queries)
✅ Embeddings generated successfully (Queries: 5, Chunks: 590)
✅ Similarity calculations completed (Covered queries: 3/5)
✅ Audit completed successfully (Total coverage: 60.0%)
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
