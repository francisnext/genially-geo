export interface MarcaMencionada {
  marca: string
  sentimiento: number
  highlights: string[]
  pros: string[]
  cons: string[]
  sources?: string[]
}

export interface Tool {
  name?: string
  sentiment?: number
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  sources?: string[]
  // Propiedades alternativas en español
  nombre?: string
  sentimiento?: number
  contras?: string[]
}

export interface QueryData {
  _id: string
  _name?: string
  _createTime?: string
  _updateTime?: string
  menciona_marca?: boolean
  menciona_dominio?: boolean | null
  marcasMencionadas?: MarcaMencionada[]
  tools?: Tool[]
  query: string
  fecha: string
  ia: string
  respuesta?: string | null
  // Campos adicionales
  marcaMencionada?: string
  dominioMencionado?: string
  sentimiento?: number
  highlights?: string[]
  pros?: string[]
  cons?: string[]
  sources?: string[]
}

// Dataset preconfigurado para pruebas
export const SAMPLE_DATASET: QueryData[] = 
  [
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/yagTaK3fq9i1dBPsRl1L",
      "_id": "yagTaK3fq9i1dBPsRl1L",
      "_createTime": "2025-07-09T08:53:09.785480Z",
      "_updateTime": "2025-07-09T08:53:09.785480Z",
      "fecha": "2025-07-09T08:53:00.136Z",
      "ia": "ChatGPT",
      "tools": [
        {
          "sentiment": 0.9,
          "pros": [
            "Great user interface",
            "Wide range of templates",
            "Excellent customer support"
          ],
          "highlights": [
            "Interactive course creation",
            "Supports SCORM, xAPI, AICC, and PENS",
            "Easy to use"
          ],
          "sources": [
            "https://www.articulate.com/products/storyline-why.php",
            "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
          ],
          "name": "Articulate Storyline",
          "cons": [
            "Quite expensive",
            "Requires high system specs",
            "Limited customization options"
          ]
        },
        {
          "sentiment": 0.8,
          "highlights": [
            "Supports SCORM, AICC, xAPI",
            "VR capabilities",
            "Responsive design"
          ],
          "cons": [
            "Steep learning curve",
            "Expensive",
            "Occasional bugs"
          ],
          "sources": [
            "https://elearning.adobe.com/adobe-captivate-prime/",
            "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
          ],
          "name": "Adobe Captivate",
          "pros": [
            "Powerful features",
            "Great for complex projects",
            "Supports VR"
          ]
        },
        {
          "name": "iSpring Suite",
          "pros": [
            "Easy to use",
            "Great for beginners",
            "Good customer support"
          ],
          "highlights": [
            "Supports SCORM, AICC, xAPI",
            "PowerPoint-based",
            "Interactive quizzes"
          ],
          "sources": [
            "https://www.ispringsolutions.com/ispring-suite",
            "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
          ],
          "cons": [
            "Limited customization",
            "No Mac version",
            "Limited video capabilities"
          ],
          "sentiment": 0.85
        }
      ],
      "query": "Best tools for creating SCORM courses"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/yVOUGCGzqxpHQMdAph22",
      "_id": "yVOUGCGzqxpHQMdAph22",
      "_createTime": "2025-07-09T08:55:16.656447Z",
      "_updateTime": "2025-07-09T08:55:16.656447Z",
      "ia": "ChatGPT",
      "query": "free tool for making interactive content",
      "tools": [
        {
          "sources": [
            "https://h5p.org/",
            "https://elearningindustry.com/directory/elearning-software/h5p/reviews"
          ],
          "highlights": [
            "Easy to use",
            "Great variety of content types",
            "Embeddable"
          ],
          "pros": [
            "User-friendly interface",
            "Supports multiple content types",
            "Responsive and mobile-friendly"
          ],
          "cons": [
            "Limited customization",
            "No built-in analytics"
          ],
          "name": "H5P",
          "sentiment": 0.8
        },
        {
          "name": "ThingLink",
          "highlights": [
            "Interactive images and videos",
            "VR creation",
            "Good for storytelling"
          ],
          "cons": [
            "Limited free version",
            "No offline access"
          ],
          "sources": [
            "https://www.thinglink.com/",
            "https://www.g2.com/products/thinglink/reviews"
          ],
          "pros": [
            "Easy to embed",
            "Supports 360° images/videos",
            "Customizable"
          ],
          "sentiment": 0.7
        },
        {
          "sources": [
            "https://www.sutori.com/",
            "https://www.edshelf.com/tool/sutori/"
          ],
          "cons": [
            "Limited design options",
            "Requires internet connection"
          ],
          "name": "Sutori",
          "sentiment": 0.75,
          "highlights": [
            "Timeline creation",
            "Collaborative",
            "Good for education"
          ],
          "pros": [
            "Easy to use",
            "Collaborative features",
            "Great for presentations and reports"
          ]
        }
      ],
      "fecha": "2025-07-09T08:55:06.943Z"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/tfWjNr043zZn0gANItd0",
      "_id": "tfWjNr043zZn0gANItd0",
      "_createTime": "2025-07-09T08:54:14.387676Z",
      "_updateTime": "2025-07-09T08:54:14.387676Z",
      "fecha": "2025-07-09T08:54:04.756Z",
      "ia": "ChatGPT",
      "tools": [
        {
          "nombre": "Kahoot!",
          "highlights": [
            "Interactividad",
            "Diversión",
            "Aprendizaje a través del juego"
          ],
          "sentimiento": 0.9,
          "contras": [
            "Requiere acceso a internet",
            "Interfaz puede resultar abrumadora para algunos"
          ],
          "sources": [
            "https://kahoot.com",
            "https://www.edutopia.org/article/using-kahoot-purpose"
          ],
          "pros": [
            "Fácil de usar",
            "Gran variedad de cuestionarios",
            "Promueve la participación activa"
          ]
        },
        {
          "sources": [
            "https://quizizz.com",
            "https://www.commonsense.org/education/website/quizizz"
          ],
          "highlights": [
            "Auto-paced learning",
            "Real-time feedback",
            "Gamified elements"
          ],
          "pros": [
            "Diversas categorías de cuestionarios",
            "Permite aprender a su propio ritmo",
            "Incluye elementos gamificados como avatares y puntos"
          ],
          "contras": [
            "Requiere una curva de aprendizaje",
            "No todas las funciones son gratuitas"
          ],
          "nombre": "Quizizz",
          "sentimiento": 0.85
        },
        {
          "pros": [
            "Promueve el trabajo en equipo",
            "Fomenta la participación",
            "Ayuda a gestionar el aula"
          ],
          "sources": [
            "https://www.classcraft.com",
            "https://www.edsurge.com/product-reviews/classcraft"
          ],
          "nombre": "Classcraft",
          "sentimiento": 0.8,
          "highlights": [
            "Rol playing game",
            "Collaborative learning",
            "Classroom management"
          ],
          "contras": [
            "Requiere tiempo para configurar",
            "Dependencia de la tecnología"
          ]
        }
      ],
      "query": "gamified learning platforms"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/swDnw675AY7b8QcBN4Kh",
      "_id": "swDnw675AY7b8QcBN4Kh",
      "_createTime": "2025-07-09T10:05:33.665273Z",
      "_updateTime": "2025-07-09T10:05:33.665273Z",
      "query": "what is the best value authoring tool",
      "fecha": "2025-07-09T10:05:23.744Z",
      "ia": "Gemini",
      "tools": null
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/sE8L6MqWoBQqW4m93Cel",
      "_id": "sE8L6MqWoBQqW4m93Cel",
      "_createTime": "2025-07-09T08:58:17.119668Z",
      "_updateTime": "2025-07-09T08:58:17.119668Z",
      "tools": null,
      "ia": "ChatGPT",
      "fecha": "2025-07-09T08:58:07.522Z",
      "query": "best interactive EdTech tools"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/rEkGEtbMjg37QFj9U1FR",
      "_id": "rEkGEtbMjg37QFj9U1FR",
      "_createTime": "2025-07-09T09:01:13.057975Z",
      "_updateTime": "2025-07-09T09:01:13.057975Z",
      "ia": "ChatGPT",
      "query": "tools for engaging audiences in presentations",
      "fecha": "2025-07-09T09:01:03.417Z",
      "tools": [
        {
          "name": "Prezi",
          "highlights": [
            "Interactive design",
            "Zoomable canvas",
            "Collaborative feature"
          ],
          "sentiment": 0.9,
          "pros": [
            "Engaging",
            "Easy to use",
            "Creative",
            "Collaborative"
          ],
          "sources": [
            "https://prezi.com",
            "https://www.g2.com/products/prezi/reviews"
          ],
          "cons": [
            "Limited customization",
            "Learning curve"
          ]
        },
        {
          "sources": [
            "https://www.sli.do",
            "https://www.capterra.com/p/142918/Slido/"
          ],
          "pros": [
            "Engages audience",
            "Easy to set up",
            "Provides real-time feedback"
          ],
          "sentiment": 0.85,
          "name": "Slido",
          "cons": [
            "Limited free version",
            "Internet dependency"
          ],
          "highlights": [
            "Polling",
            "Audience Q&A",
            "Interactive quizzes"
          ]
        },
        {
          "highlights": [
            "Live polls",
            "Interactive presentations",
            "Quiz creator"
          ],
          "name": "Mentimeter",
          "pros": [
            "Interactive",
            "Versatile",
            "Good analytics"
          ],
          "sentiment": 0.88,
          "sources": [
            "https://www.mentimeter.com",
            "https://www.trustradius.com/products/mentimeter/reviews"
          ],
          "cons": [
            "Internet dependent",
            "Limited customization"
          ]
        },
        {
          "sources": [
            "https://www.kahoot.com",
            "https://www.reviews.io/company-reviews/store/kahoot"
          ],
          "pros": [
            "Engaging",
            "Fun",
            "Customizable"
          ],
          "name": "Kahoot!",
          "cons": [
            "Internet dependent",
            "Limited free version"
          ],
          "highlights": [
            "Game-based learning",
            "Interactive quizzes",
            "Live or self-paced games"
          ],
          "sentiment": 0.93
        }
      ]
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/qr3fVBXJTcVVPuzQwzxO",
      "_id": "qr3fVBXJTcVVPuzQwzxO",
      "_createTime": "2025-07-09T09:05:23.266216Z",
      "_updateTime": "2025-07-09T09:05:23.266216Z",
      "query": "How can marketers create interactive landing pages?",
      "tools": [
        {
          "name": "Instapage",
          "sentiment": 0.9,
          "pros": [
            "Easy to use",
            "Integration with various platforms",
            "Excellent customer service"
          ],
          "contras": [
            "Pricey for small businesses",
            "Limited in some design aspects"
          ],
          "highlights": [
            "Customizable templates",
            "A/B testing",
            "Conversion analytics"
          ],
          "sources": [
            "https://www.instapage.com/",
            "https://www.g2.com/products/instapage/reviews"
          ]
        },
        {
          "sentiment": 0.85,
          "name": "Unbounce",
          "contras": [
            "Can be slow at times",
            "Slightly steep learning curve for beginners"
          ],
          "highlights": [
            "Drag-and-drop builder",
            "100+ templates",
            "Dynamic text replacement for PPC campaigns"
          ],
          "pros": [
            "Ability to copy and paste elements",
            "Good mobile customization",
            "A/B testing"
          ],
          "sources": [
            "https://unbounce.com/",
            "https://www.capterra.com/p/140807/Unbounce/"
          ]
        },
        {
          "sentiment": 0.75,
          "sources": [
            "https://www.leadpages.net/",
            "https://www.trustradius.com/products/leadpages/reviews"
          ],
          "pros": [
            "Easy to use interface",
            "Good range of integrations",
            "Affordable"
          ],
          "highlights": [
            "Unlimited landing pages",
            "Alert bars and pop-ups",
            "Built-in payments"
          ],
          "name": "Leadpages",
          "contras": [
            "Limited customization options",
            "Customer service could be improved"
          ]
        }
      ],
      "fecha": "2025-07-09T09:05:13.655Z",
      "ia": "ChatGPT"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/qo9iWiOPLcGPKbGcLicT",
      "_id": "qo9iWiOPLcGPKbGcLicT",
      "_createTime": "2025-07-09T10:05:33.610079Z",
      "_updateTime": "2025-07-09T10:05:33.610079Z",
      "fecha": "2025-07-09T10:05:23.810Z",
      "query": "what is the best value authoring tool",
      "tools": null,
      "ia": "Gemini"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ov4Wx6SRAqd510GKRjSO",
      "_id": "ov4Wx6SRAqd510GKRjSO",
      "_createTime": "2025-07-09T08:53:40.804950Z",
      "_updateTime": "2025-07-09T08:53:40.804950Z",
      "fecha": "2025-07-09T08:53:31.236Z",
      "query": "instructional design tools with gamification features",
      "tools": [
        {
          "pros": [
            "Easy to use",
            "Wide range of interactive elements",
            "Great for eLearning"
          ],
          "contras": [
            "Can be expensive",
            "May require training to use effectively"
          ],
          "nombre": "Articulate Storyline",
          "sources": [
            "https://www.articulate.com/products/storyline-why.php"
          ],
          "highlights": [
            "Interactive Learning",
            "Customizable Characters",
            "Gamification Elements"
          ],
          "sentimiento": 0.8
        },
        {
          "pros": [
            "Advanced features",
            "VR capabilities",
            "Integration with Adobe products"
          ],
          "highlights": [
            "VR capabilities",
            "Responsive designs",
            "Gamification features"
          ],
          "contras": [
            "Steep learning curve",
            "Expensive"
          ],
          "sentimiento": 0.7,
          "sources": [
            "https://www.adobe.com/products/captivate.html"
          ],
          "nombre": "Adobe Captivate"
        },
        {
          "sentimiento": 0.85,
          "contras": [
            "Limited customization",
            "Reporting could be improved"
          ],
          "highlights": [
            "Course Authoring",
            "Blended Learning",
            "Gamification"
          ],
          "pros": [
            "User-friendly interface",
            "Integration with various tools",
            "Great customer service"
          ],
          "nombre": "TalentLMS",
          "sources": [
            "https://www.talentlms.com/features"
          ]
        },
        {
          "highlights": [
            "Cloud-based",
            "Collaborative",
            "Gamification features"
          ],
          "nombre": "Gomo Learning",
          "pros": [
            "Easy to use",
            "Collaborative",
            "Good for mobile learning"
          ],
          "sources": [
            "https://www.gomolearning.com/"
          ],
          "sentimiento": 0.75,
          "contras": [
            "Limited assessment options",
            "Limited customization"
          ]
        }
      ],
      "ia": "ChatGPT"
    },
    {
      "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/nU9lhWJrgU92HPzXaOXf",
      "_id": "nU9lhWJrgU92HPzXaOXf",
      "_createTime": "2025-07-09T08:58:45.992945Z",
      "_updateTime": "2025-07-09T08:58:45.992945Z",
      "ia": "ChatGPT",
      "fecha": "2025-07-09T08:58:36.321Z",
      "query": "platforms for creating interactive training materials",
      "tools": [
        {
          "contras": [
            "Limitado en personalización",
            "Puede ser costoso para pequeñas empresas",
            "No es tan eficiente para proyectos a gran escala"
          ],
          "nombre": "Articulate 360",
          "pros": [
            "Permite la creación de contenido interactivo y atractivo",
            "Fácil de aprender y usar",
            "Alta calidad de productos finales"
          ],
          "sentimiento": 0.9,
          "highlights": [
            "Amplia gama de funcionalidades",
            "Excelente soporte al cliente",
            "Fácil de usar"
          ],
          "sources": [
            "https://www.capterra.com/p/150269/Articulate-360/",
            "https://www.trustradius.com/products/articulate-360/reviews"
          ]
        },
        {
          "nombre": "Adobe Captivate",
          "sentimiento": 0.8,
          "sources": [
            "https://www.capterra.com/p/66655/Adobe-Captivate/",
            "https://www.trustradius.com/products/adobe-captivate/reviews"
          ],
          "contras": [
            "Curva de aprendizaje empinada",
            "Costoso",
            "Interfaz de usuario no tan intuitiva"
          ],
          "highlights": [
            "Funcionalidad robusta",
            "Soporte para SCORM y xAPI",
            "Tiene una prueba gratuita"
          ],
          "pros": [
            "Capacidad para crear simulaciones de software",
            "Soporte para VR y contenido interactivo",
            "Amplia gama de plantillas y activos"
          ]
        },
        {
          "nombre": "iSpring Suite",
          "pros": [
            "Permite la creación de evaluaciones y cuestionarios",
            "Buena relación calidad-precio",
            "Soporte al cliente de alta calidad"
          ],
          "sentimiento": 0.85,
          "highlights": [
            "Fácil de usar",
            "Integración con PowerPoint",
            "Soporte para contenido interactivo"
          ],
          "contras": [
            "Limitaciones en la personalización",
            "No es tan robusto como otros productos",
            "Dependencia de PowerPoint para algunas funcionalidades"
          ],
          "sources": [
            "https://www.capterra.com/p/127611/iSpring-Suite/",
            "https://www.trustradius.com/products/ispring-suite/reviews"
          ]
        }
      ]
    }
  ]
// Función para obtener estadísticas del dataset
export const getDatasetStats = () => {
  const totalRecords = SAMPLE_DATASET.length
  const recordsWithBrands = SAMPLE_DATASET.filter((item) => item.menciona_marca).length
  const recordsWithGenially = SAMPLE_DATASET.filter((item) =>
    item.marcasMencionadas?.some((marca) => marca.marca.toLowerCase().includes("genially")),
  ).length

  const uniqueQueries = new Set(SAMPLE_DATASET.map((item) => item.query.toLowerCase())).size
  const uniqueBrands = new Set(
    SAMPLE_DATASET.filter((item) => item.marcasMencionadas)
      .flatMap((item) => item.marcasMencionadas!)
      .map((marca) => marca.marca),
  ).size

  return {
    totalRecords,
    recordsWithBrands,
    recordsWithGenially,
    uniqueQueries,
    uniqueBrands,
    geniallyMarketShare: recordsWithBrands > 0 ? (recordsWithGenially / recordsWithBrands) * 100 : 0,
  }
}

export const GEO_DIAG_JSON = 
{
  "debilidades": [
    {
      "descripcion": "No aparece en directorios clave como G2, Capterra, TrustRadius o eLearningIndustry en categorías como e-learning o authoring tools.",
      "prioridad": "alta"
    },
    {
      "descripcion": "Escasa presencia en artículos comparativos o listicles de herramientas interactivas, SCORM, LMS o presentaciones alternativas.",
      "prioridad": "alta"
    },
    {
      "descripcion": "Falta de uso de keywords semánticas relevantes como 'SCORM', 'LTI', 'authoring tool', 'gamified learning', 'interactive course creator', etc.",
      "prioridad": "alta"
    },
    {
      "descripcion": "Contenido del sitio orientado a términos de marca propios ('genial', 'crear contenido visual') pero no alineado con términos que buscan usuarios y modelos LLM.",
      "prioridad": "media"
    },
    {
      "descripcion": "Sitemap sin páginas dedicadas a verticales como formación corporativa, educación, onboarding, marketing interactivo o e-learning técnico.",
      "prioridad": "media"
    },
    {
      "descripcion": "Ausencia de schemas estructurados para FAQs, productos o comparativas que ayuden al crawling semántico por parte de LLMs o Google.",
      "prioridad": "baja"
    }
  ],
  "estrategias_y_oportunidades": [
    {
      "accion": "Optimizar contenido existente con términos como 'SCORM', 'LTI', 'interactive training', 'gamification in learning'",
      "coste": "bajo",
      "prioridad": "alta"
    },
    {
      "accion": "Crear landing pages específicas para queries comunes como 'PowerPoint alternative', 'interactive lesson builder', 'SCORM authoring tool'",
      "coste": "medio",
      "prioridad": "alta"
    },
    {
      "accion": "Registrar Genially en plataformas como G2, Capterra, eLearningIndustry con reseñas verificadas",
      "coste": "medio",
      "prioridad": "alta"
    },
    {
      "accion": "Aplicar schema.org estructurado en páginas clave (FAQ, Producto, Comparativa)",
      "coste": "medio",
      "prioridad": "media"
    },
    {
      "accion": "Publicar artículos comparativos desde el blog de Genially (ej. 'Genially vs. Prezi vs. Canva') con enfoque neutral SEO-oriented",
      "coste": "bajo",
      "prioridad": "media"
    },
    {
      "accion": "Crear contenido específico por caso de uso (onboarding, formación, marketing, educación) optimizado para keywords LLM-friendly",
      "coste": "medio",
      "prioridad": "alta"
    },
    {
      "accion": "Impulsar backlinks y menciones en medios de terceros mediante PR o acuerdos editoriales (guest posts, partnerships)",
      "coste": "alto",
      "prioridad": "media"
    },
    {
      "accion": "Recoger y publicar testimonios o casos de uso reales en educación y empresas que destaquen funcionalidad SCORM, interactividad o ROI",
      "coste": "medio",
      "prioridad": "media"
    },
    {
      "accion": "Incluir Genially en vídeos, podcasts o webinars comparativos sobre herramientas e-learning o visuales",
      "coste": "alto",
      "prioridad": "baja"
    }
  ]
}

