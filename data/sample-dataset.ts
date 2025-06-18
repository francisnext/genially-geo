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
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/vdUTd4rbHExXoF8uM6LR",
    "_id": "vdUTd4rbHExXoF8uM6LR",
    "_createTime": "2025-06-16T15:02:12.484503Z",
    "_updateTime": "2025-06-16T15:02:12.484503Z",
    "fecha": "2025-06-16T15:02:05.961Z",
    "query": "best tools for creating interactive learning materials",
    "ia": "ChatGPT",
    "tools": [
      {
        "sentiment": 0.9,
        "name": "Adobe Captivate",
        "pros": [
          "Easy to use",
          "Many features",
          "Good support"
        ],
        "contras": [
          "Pricey",
          "Steep learning curve"
        ],
        "highlights": [
          "Interactive Content",
          "Responsive Design",
          "VR Capabilities"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "contras": [
          "Expensive",
          "Limited video editing"
        ],
        "name": "Articulate Storyline",
        "pros": [
          "Flexible",
          "Great community",
          "Interactive"
        ],
        "highlights": [
          "Intuitive Interface",
          "Mobile Friendly",
          "Extensive Template Library"
        ],
        "sentiment": 0.8,
        "sources": [
          "https://www.articulate.com/products/storyline-360.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "pros": [
          "User-friendly",
          "Good customer support",
          "Value for money"
        ],
        "contras": [
          "Limited customisation",
          "Issues with updates"
        ],
        "name": "iSpring Suite",
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ],
        "highlights": [
          "PowerPoint integration",
          "Mobile app",
          "Content Library"
        ],
        "sentiment": 0.85
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/su7LVlwUEcLheljb9UYT",
    "_id": "su7LVlwUEcLheljb9UYT",
    "_createTime": "2025-06-16T15:05:05.420382Z",
    "_updateTime": "2025-06-16T15:05:05.420382Z",
    "ia": "ChatGPT",
    "query": "interactive presentation alternatives to PowerPoint",
    "tools": [
      {
        "pros": [
          "Ease of use",
          "Integration with Adobe Suite",
          "Great for eLearning"
        ],
        "name": "Adobe Captivate",
        "cons": [
          "Expensive",
          "Steep learning curve"
        ],
        "highlights": [
          "Rich multimedia features",
          "Interactive content",
          "Mobile friendly"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "sentiment": 0.8
      },
      {
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ],
        "sentiment": 0.9,
        "pros": [
          "Great templates",
          "Excellent customer support",
          "Good for interactive courses"
        ],
        "cons": [
          "Expensive",
          "Limited in terms of design"
        ],
        "name": "Articulate Storyline",
        "highlights": [
          "Interactive content",
          "Easy to use",
          "Great community support"
        ]
      },
      {
        "highlights": [
          "Good for beginners",
          "Lots of features",
          "PowerPoint integration"
        ],
        "sentiment": 0.7,
        "cons": [
          "Limited customisation",
          "Occasional bugs"
        ],
        "pros": [
          "Ease of use",
          "Good value for money",
          "Great customer support"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ],
        "name": "iSpring Suite"
      },
      {
        "name": "Lectora",
        "sources": [
          "https://www.trivantis.com/products/lectora-online-elearning-authoring-tool",
          "https://elearningindustry.com/directory/elearning-software/lectora-inspire/reviews"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive"
        ],
        "sentiment": 0.6,
        "pros": [
          "Lots of features",
          "Good for complex courses",
          "Great customer support"
        ],
        "highlights": [
          "Powerful authoring tool",
          "Customisable",
          "Mobile friendly"
        ]
      }
    ],
    "fecha": "2025-06-16T15:04:58.859Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/rStB5CgZLMAgl6CaesMv",
    "_id": "rStB5CgZLMAgl6CaesMv",
    "_createTime": "2025-06-16T14:59:11.191133Z",
    "_updateTime": "2025-06-16T14:59:11.191133Z",
    "query": "instructional design tools with gamification features",
    "tools": [
      {
        "sentiment": 0.8,
        "highlights": [
          "Powerful authoring tool",
          "Wide range of interactivity",
          "Supports responsive design"
        ],
        "pros": [
          "Rich multimedia capabilities",
          "Advanced quizzing features",
          "Multi-lingual support"
        ],
        "contras": [
          "High learning curve",
          "Expensive licensing"
        ],
        "name": "Adobe Captivate",
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "sentiment": 0.9,
        "contras": [
          "Limited video editing",
          "No Mac version"
        ],
        "pros": [
          "Easy to use",
          "Great animation capabilities",
          "Powerful interactivity"
        ],
        "highlights": [
          "Intuitive user interface",
          "Strong community support",
          "Supports responsive design"
        ],
        "name": "Articulate Storyline"
      },
      {
        "highlights": [
          "Fully-integrated with PowerPoint",
          "Supports mobile learning",
          "High-quality output"
        ],
        "sentiment": 0.85,
        "contras": [
          "Limited customization options",
          "No Mac version"
        ],
        "pros": [
          "Easy to use",
          "Great support team",
          "Rich quiz creation features"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "name": "iSpring Suite"
      }
    ],
    "fecha": "2025-06-16T14:59:04.653Z",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/m8lODXPZRTWomwEICUbi",
    "_id": "m8lODXPZRTWomwEICUbi",
    "_createTime": "2025-06-16T15:00:55.458915Z",
    "_updateTime": "2025-06-16T15:00:55.458915Z",
    "ia": "ChatGPT",
    "query": "free tool for making interactive content",
    "fecha": "2025-06-16T15:00:48.914Z",
    "tools": [
      {
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/adobe-captivate"
        ],
        "highlights": [
          "Interfaz intuitiva",
          "Compatibilidad con SCORM",
          "Extensas opciones de personalización"
        ],
        "pros": [
          "Fácil de usar",
          "Soporte de Adobe",
          "Gran cantidad de plantillas y elementos interactivos"
        ],
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
        "contras": [
          "Costoso",
          "Curva de aprendizaje inicial",
          "Requiere una suscripción a Adobe Creative Cloud"
        ]
      },
      {
        "contras": [
          "Costoso",
          "Funcionalidad limitada en el modo de vista previa",
          "Requiere actualizaciones regulares"
        ],
        "nombre": "Articulate Storyline",
        "highlights": [
          "Funcionalidad de arrastrar y soltar",
          "Amplia gama de plantillas",
          "Compatibilidad con Tin Can API"
        ],
        "pros": [
          "Interfaz amigable",
          "Amplia comunidad de soporte",
          "Opciones de personalización"
        ],
        "sentimiento": 0.9,
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/articulate-storyline"
        ]
      },
      {
        "pros": [
          "Soporte para contenido interactivo",
          "Capacidades de edición de video",
          "Compatibilidad con SCORM y AICC"
        ],
        "sentimiento": 0.7,
        "contras": [
          "Interfaz de usuario menos intuitiva",
          "Funcionalidad de edición de video limitada",
          "Costoso"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online-e-learning-software",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/lectora-inspire"
        ],
        "highlights": [
          "Soporte para HTML5",
          "Interfaz de usuario personalizable",
          "Funciones de colaboración en equipo"
        ],
        "nombre": "Lectora Inspire"
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/lmNJWu1tRIdcqG7xZcCD",
    "_id": "lmNJWu1tRIdcqG7xZcCD",
    "_createTime": "2025-06-16T15:02:32.038151Z",
    "_updateTime": "2025-06-16T15:02:32.038151Z",
    "ia": "ChatGPT",
    "query": "digital storytelling tools for teachers",
    "tools": [
      {
        "pros": [
          "Wide range of features",
          "Supports HTML5",
          "User-friendly interface"
        ],
        "cons": [
          "Expensive",
          "Steep learning curve",
          "Limited customization options"
        ],
        "name": "Adobe Captivate",
        "sources": [
          "https://elearningindustry.com/directory/software/adobe-captivate"
        ],
        "highlights": [
          "Interactive eLearning content",
          "VR capabilities",
          "Responsive design"
        ],
        "sentiment": 0.8
      },
      {
        "sentiment": 0.9,
        "pros": [
          "Intuitive interface",
          "Wide range of templates",
          "Strong community support"
        ],
        "highlights": [
          "Easy to use interface",
          "Accelerated mobile publishing",
          "Interactive content"
        ],
        "name": "Articulate Storyline",
        "cons": [
          "Expensive",
          "Limited customization options",
          "Limited video editing capabilities"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software/articulate-storyline"
        ]
      },
      {
        "pros": [
          "Easy to use",
          "Great customer support",
          "Effective output quality"
        ],
        "highlights": [
          "PowerPoint-based",
          "Mobile-friendly",
          "Interactive quizzes"
        ],
        "name": "iSpring Suite",
        "cons": [
          "Limited functionality",
          "Dependent on PowerPoint",
          "Limited design options"
        ],
        "sentiment": 0.85,
        "sources": [
          "https://elearningindustry.com/directory/software/ispring-suite"
        ]
      }
    ],
    "fecha": "2025-06-16T15:02:25.490Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/kSrJEjinLQkIlFETdzjq",
    "_id": "kSrJEjinLQkIlFETdzjq",
    "_createTime": "2025-06-16T15:01:10.158198Z",
    "_updateTime": "2025-06-16T15:01:10.158198Z",
    "ia": "ChatGPT",
    "query": "best tool for creating microsites",
    "fecha": "2025-06-16T15:01:03.629Z",
    "tools": [
      {
        "contras": [
          "Expensive",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ],
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Advanced features",
          "Wide range of templates",
          "VR capabilities"
        ],
        "pros": [
          "Intuitive interface",
          "Support for SCORM",
          "Mobile friendly"
        ]
      },
      {
        "pros": [
          "Easy to use",
          "Support for SCORM",
          "Mobile friendly"
        ],
        "sentiment": 0.9,
        "contras": [
          "Limited customization options",
          "Expensive"
        ],
        "name": "Articulate Storyline",
        "sources": [
          "https://articulate.com/products/storyline-360"
        ],
        "highlights": [
          "User-friendly",
          "Great community support",
          "Interactive elements"
        ]
      },
      {
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite"
        ],
        "sentiment": 0.85,
        "pros": [
          "Support for SCORM",
          "Quiz creation capability",
          "Mobile friendly"
        ],
        "name": "iSpring Suite",
        "contras": [
          "Limited customization options",
          "Limited interactive elements"
        ],
        "highlights": [
          "PowerPoint integration",
          "Easy to use",
          "Fully responsive design"
        ]
      },
      {
        "pros": [
          "Mobile friendly",
          "Support for SCORM"
        ],
        "name": "Lectora Inspire",
        "sources": [
          "https://www.trivantis.com/products/lectora-online"
        ],
        "highlights": [
          "Advanced scripting capabilities",
          "VR capabilities",
          "Customizable templates"
        ],
        "sentiment": 0.75,
        "contras": [
          "Steep learning curve",
          "Expensive"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gya4tmX7K7jlMdIIAwPV",
    "_id": "gya4tmX7K7jlMdIIAwPV",
    "_createTime": "2025-06-16T14:58:16.112178Z",
    "_updateTime": "2025-06-16T14:58:16.112178Z",
    "tools": [
      {
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "highlights": [
          "Fácil de usar",
          "Interactividad avanzada",
          "Compatibilidad con SCORM"
        ],
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
        "contras": [
          "Interfaz de usuario desactualizada",
          "Puede ser costoso"
        ],
        "pros": [
          "Amplia gama de plantillas",
          "Buenas características de evaluación",
          "Compatibilidad con VR"
        ]
      },
      {
        "pros": [
          "Buenas capacidades de personalización",
          "Capacidades móviles fuertes",
          "Biblioteca de contenido incorporada"
        ],
        "nombre": "Articulate Storyline",
        "contras": [
          "Limitado en la creación de contenido interactivo avanzado",
          "Costoso"
        ],
        "sentimiento": 0.85,
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ],
        "highlights": [
          "Interfaz intuitiva",
          "Amplia comunidad de usuarios",
          "Potentes características de diseño"
        ]
      },
      {
        "nombre": "iSpring Suite",
        "contras": [
          "Interfaz de usuario desactualizada",
          "Limitado en personalización"
        ],
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ],
        "sentimiento": 0.9,
        "pros": [
          "Buenas características de evaluación",
          "Asistencia al cliente sólida",
          "Buen precio"
        ],
        "highlights": [
          "Facilidad de uso",
          "Compatibilidad con PowerPoint",
          "Interactividad avanzada"
        ]
      }
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T14:58:09.574Z",
    "query": "Best SCORM authoring tools"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gl3pOFhdI5pgRAorYgLT",
    "_id": "gl3pOFhdI5pgRAorYgLT",
    "_createTime": "2025-06-16T14:59:25.802659Z",
    "_updateTime": "2025-06-16T14:59:25.802659Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T14:59:19.265Z",
    "query": "best visual communication tools",
    "tools": [
      {
        "highlights": [
          "Multi-Platform",
          "Responsive Design",
          "Interactivity"
        ],
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Interface can be confusing"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
        "pros": [
          "Easy to use",
          "Great community support",
          "Wide range of features"
        ]
      },
      {
        "pros": [
          "Intuitive",
          "Great customer support",
          "Large community of users"
        ],
        "highlights": [
          "User-friendly",
          "Interactive",
          "Mobile-friendly"
        ],
        "contras": [
          "Expensive",
          "Limited in advanced scripting",
          "Need high performance hardware"
        ],
        "sentimiento": 0.9,
        "nombre": "Articulate Storyline",
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ],
        "contras": [
          "Limited customization",
          "Limited in video editing",
          "Need Microsoft Office to run"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Ease of use",
          "Good value for money",
          "Strong user community"
        ],
        "highlights": [
          "PowerPoint integration",
          "Mobile-friendly",
          "Quizzes and Interactions"
        ],
        "nombre": "iSpring Suite"
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gCPRb2Sy6aFWXsckGylA",
    "_id": "gCPRb2Sy6aFWXsckGylA",
    "_createTime": "2025-06-16T14:56:59.022291Z",
    "_updateTime": "2025-06-16T14:56:59.022291Z",
    "tools": [
      {
        "sentimiento": 0.9,
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ],
        "contras": [
          "Costoso",
          "Curva de aprendizaje pronunciada"
        ],
        "nombre": "Adobe Captivate",
        "pros": [
          "Fácil de usar",
          "Amplio rango de plantillas",
          "Soporte para VR"
        ],
        "highlights": [
          "Interactividad",
          "Amplia gama de medios",
          "Simulaciones de software"
        ]
      },
      {
        "contras": [
          "Costoso",
          "Necesidad de actualizaciones frecuentes"
        ],
        "nombre": "Articulate Storyline",
        "highlights": [
          "Interfaz intuitiva",
          "Compatibilidad con SCORM",
          "Personalización"
        ],
        "sources": [
          "https://articulate.com/"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Gran comunidad de soporte",
          "Interfaz similar a PowerPoint",
          "Múltiples opciones de exportación"
        ]
      },
      {
        "highlights": [
          "Complemento de PowerPoint",
          "Compatibilidad con SCORM",
          "Quizzes interactivos"
        ],
        "sentimiento": 0.8,
        "contras": [
          "Limitaciones en la personalización",
          "Problemas de compatibilidad con algunos LMS"
        ],
        "pros": [
          "Fácil de usar",
          "Soporte para móviles",
          "Soporte para video"
        ],
        "sources": [
          "https://www.ispringsolutions.com/"
        ],
        "nombre": "iSpring Suite"
      },
      {
        "sentimiento": 0.75,
        "sources": [
          "https://www.trivantis.com/products/lectora-online/"
        ],
        "pros": [
          "Soporte para VR",
          "Opciones de publicación flexibles",
          "Compatibilidad con múltiples formatos de archivo"
        ],
        "highlights": [
          "Compatibilidad con AICC",
          "Interactividad",
          "Edición de respuesta"
        ],
        "nombre": "Lectora Inspire",
        "contras": [
          "Interfaz desactualizada",
          "Curva de aprendizaje pronunciada"
        ]
      }
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T14:56:52.465Z",
    "query": "what is the best value authoring tool"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/eu5bCLeMwZI9aR0c44O2",
    "_id": "eu5bCLeMwZI9aR0c44O2",
    "_createTime": "2025-06-16T15:04:28.075471Z",
    "_updateTime": "2025-06-16T15:04:28.075471Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "contras": [
          "Can be expensive",
          "Minor software bugs"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "highlights": [
          "Rapid eLearning",
          "Mobile Learning",
          "Responsive Design"
        ],
        "pros": [
          "User-friendly",
          "Offers a variety of features",
          "Good community support"
        ]
      },
      {
        "contras": [
          "Not suitable for complex projects",
          "Learning curve can be steep for beginners"
        ],
        "highlights": [
          "Interactive Learning",
          "Gamification",
          "Mobile Learning"
        ],
        "name": "Articulate Storyline",
        "pros": [
          "Highly interactive",
          "Great customer support",
          "Frequent updates"
        ],
        "sentiment": 0.9,
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ]
      },
      {
        "highlights": [
          "PowerPoint Conversion",
          "Mobile Learning",
          "Content Library"
        ],
        "name": "iSpring Suite",
        "pros": [
          "Easy to use",
          "Good value for money",
          "High compatibility"
        ],
        "sentiment": 0.85,
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ],
        "contras": [
          "Limited customization",
          "Additional costs for support"
        ]
      }
    ],
    "fecha": "2025-06-16T15:04:21.550Z",
    "query": "no-code tools for educational content creation",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/dfpXwcuTR1EpX0VFmpC5",
    "_id": "dfpXwcuTR1EpX0VFmpC5",
    "_createTime": "2025-06-16T15:01:36.958619Z",
    "_updateTime": "2025-06-16T15:01:36.958619Z",
    "query": "best tool for creating interactive infografics",
    "fecha": "2025-06-16T15:01:30.409Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "pros": [
          "Easy to use",
          "Offers a variety of eLearning elements",
          "Excellent support and community"
        ],
        "highlights": [
          "Mobile learning",
          "Interactive eLearning content",
          "Screen recordings"
        ],
        "cons": [
          "Expensive",
          "Can be slow at times",
          "Steep learning curve for beginners"
        ],
        "sentiment": 0.8,
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "cons": [
          "Expensive",
          "Limited customization options",
          "Occasional bugs and crashes"
        ],
        "highlights": [
          "Intuitive user interface",
          "Mobile and web friendly",
          "Powerful interactivity"
        ],
        "sources": [
          "https://articulate.com/",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-3/reviews"
        ],
        "pros": [
          "Easy to learn and use",
          "Great customer support",
          "Wide range of features"
        ],
        "sentiment": 0.85
      },
      {
        "pros": [
          "Easy to use",
          "Good quality screen recording",
          "Wide range of editing tools"
        ],
        "sentiment": 0.75,
        "name": "TechSmith Camtasia",
        "highlights": [
          "Screen recording and video editing",
          "Interactive quizzes",
          "Easy sharing"
        ],
        "cons": [
          "Limited advanced editing features",
          "Can be slow on older computers",
          "Expensive for some users"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/dIvR7CcJeoN0KsarEw1K",
    "_id": "dIvR7CcJeoN0KsarEw1K",
    "_createTime": "2025-06-16T15:04:46.122292Z",
    "_updateTime": "2025-06-16T15:04:46.122292Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:04:39.580Z",
    "tools": [
      {
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "pros": [
          "Interactive features",
          "Multi-platform support",
          "Supports responsive design"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive",
          "Requires high-performance hardware"
        ],
        "highlights": [
          "Easy to use",
          "Variety of templates",
          "Integration with other Adobe products"
        ],
        "name": "Adobe Captivate",
        "sentiment": 0.8
      },
      {
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ],
        "name": "Articulate Storyline",
        "cons": [
          "Expensive",
          "Limited customization options",
          "No support for Mac"
        ],
        "sentiment": 0.9,
        "pros": [
          "Great flexibility",
          "Strong multimedia support",
          "Excellent customer support"
        ],
        "highlights": [
          "Intuitive interface",
          "Powerful features",
          "Strong user community"
        ]
      },
      {
        "cons": [
          "Limited video editing capabilities",
          "No Mac version",
          "Lacks advanced features"
        ],
        "pros": [
          "Interactive quizzes",
          "Mobile friendly",
          "Good customer support"
        ],
        "sentiment": 0.85,
        "name": "iSpring Suite",
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite-max/reviews"
        ],
        "highlights": [
          "Ease of use",
          "PowerPoint integration",
          "Quality of output"
        ]
      }
    ],
    "query": "interactive learning apps for remote teaching"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ctoaZ1YStor4MIDSuqK1",
    "_id": "ctoaZ1YStor4MIDSuqK1",
    "_createTime": "2025-06-16T14:57:56.519431Z",
    "_updateTime": "2025-06-16T14:57:56.519431Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Rich multimedia elements",
          "Responsive design",
          "VR capabilities"
        ],
        "cons": [
          "Pricing can be high for small businesses",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ],
        "pros": [
          "Easy to use",
          "Wide variety of templates",
          "Good community support"
        ]
      },
      {
        "cons": [
          "Limited video editing capabilities",
          "Expensive"
        ],
        "pros": [
          "Intuitive interface",
          "Great for e-learning",
          "Good customer support"
        ],
        "highlights": [
          "Powerful interactivity",
          "Vast template library",
          "Mobile friendly"
        ],
        "sentiment": 0.9,
        "name": "Articulate Storyline",
        "sources": [
          "https://www.articulate.com/products/storyline-360",
          "https://www.capterra.com/p/151022/Articulate-Storyline-2/"
        ]
      },
      {
        "sentiment": 0.85,
        "cons": [
          "Limited animation capabilities",
          "Occasional software bugs"
        ],
        "highlights": [
          "Screen recording",
          "Video editing",
          "Interactive quizzes"
        ],
        "name": "TechSmith Camtasia",
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://www.trustradius.com/products/camtasia/reviews"
        ],
        "pros": [
          "Easy to learn",
          "Powerful editing tools",
          "One-time purchase"
        ]
      }
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T14:57:49.994Z",
    "query": "best authoring tools for instructional designers"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/PaHcPZrCKpN1yVHdaJlw",
    "_id": "PaHcPZrCKpN1yVHdaJlw",
    "_createTime": "2025-06-16T15:05:58.541420Z",
    "_updateTime": "2025-06-16T15:05:58.541420Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "highlights": [
          "Rich multimedia features",
          "VR capabilities",
          "Responsive design"
        ],
        "pros": [
          "Intuitive UI",
          "Wide range of templates",
          "Great community support"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "contras": [
          "Steep learning curve",
          "Expensive",
          "Requires high system performance"
        ],
        "name": "Adobe Captivate",
        "sentiment": 0.8
      },
      {
        "sentiment": 0.9,
        "contras": [
          "Limited collaboration features",
          "Expensive",
          "Dependent on Flash for some features"
        ],
        "name": "Articulate Storyline",
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "highlights": [
          "Easy to use",
          "Interactive elements",
          "Mobile friendly"
        ],
        "pros": [
          "Powerful editing features",
          "Excellent customer support",
          "Regular updates"
        ]
      },
      {
        "pros": [
          "Easy to learn",
          "High-quality output",
          "Integrates with PowerPoint"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "contras": [
          "Limited interactive features",
          "Expensive",
          "No HTML5 output"
        ],
        "name": "TechSmith Camtasia",
        "highlights": [
          "Screen recording",
          "Video editing",
          "Animations and effects"
        ],
        "sentiment": 0.7
      }
    ],
    "query": "tools for engaging audiences in presentations",
    "fecha": "2025-06-16T15:05:51.997Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Ohb5W51AkT0GC3eS6D4H",
    "_id": "Ohb5W51AkT0GC3eS6D4H",
    "_createTime": "2025-06-16T14:58:54.018531Z",
    "_updateTime": "2025-06-16T14:58:54.018531Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive for small businesses",
          "Requires high system resources"
        ],
        "sentiment": 0.8,
        "pros": [
          "Wide range of features",
          "Supports responsive design",
          "Good community support"
        ],
        "highlights": [
          "Powerful tool",
          "Interactive learning",
          "VR capabilities"
        ]
      },
      {
        "highlights": [
          "Intuitive interface",
          "Good for beginners",
          "Strong customer support"
        ],
        "cons": [
          "Expensive",
          "Limited in advanced capabilities",
          "Occasional bugs"
        ],
        "sentiment": 0.9,
        "name": "Articulate Storyline",
        "pros": [
          "Easy to use",
          "Great flexibility",
          "Good for rapid eLearning"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.html",
          "https://www.capterra.com/p/150269/Articulate-Storyline-2/"
        ]
      },
      {
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://www.trustradius.com/products/camtasia/reviews"
        ],
        "cons": [
          "Limited interactivity",
          "Not ideal for complex projects",
          "Limited support for mobile learning"
        ],
        "sentiment": 0.7,
        "name": "TechSmith Camtasia",
        "pros": [
          "Easy to use",
          "Affordable",
          "Good quality output"
        ],
        "highlights": [
          "Great for video-based learning",
          "Screen recording capabilities",
          "Powerful editing tools"
        ]
      }
    ],
    "fecha": "2025-06-16T14:58:47.473Z",
    "ia": "ChatGPT",
    "query": "LMS-compatible authoring tools for instructional designers"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/NU4ekD1SDWQNxRReLxcw",
    "_id": "NU4ekD1SDWQNxRReLxcw",
    "_createTime": "2025-06-16T15:04:15.313682Z",
    "_updateTime": "2025-06-16T15:04:15.313682Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:04:08.800Z",
    "query": "create branching scenarios for e-learning",
    "tools": [
      {
        "pros": [
          "Easy to use",
          "Great for eLearning content",
          "Excellent support"
        ],
        "highlights": [
          "Interactive content",
          "Wide range of templates",
          "Mobile learning support"
        ],
        "name": "Adobe Captivate",
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ],
        "sentiment": 0.9,
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Requires high system resources"
        ]
      },
      {
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://www.capterra.com/p/133438/Articulate-Storyline-2/"
        ],
        "highlights": [
          "Powerful features",
          "Intuitive interface",
          "Extensive library of resources"
        ],
        "sentiment": 0.8,
        "name": "Articulate Storyline",
        "contras": [
          "Expensive",
          "Limited collaboration features",
          "Lacks advanced reporting"
        ],
        "pros": [
          "Excellent for interactive content",
          "Great support community",
          "Regular updates"
        ]
      },
      {
        "name": "iSpring Suite",
        "contras": [
          "Limited customization",
          "Lacks some advanced features",
          "Dependent on PowerPoint"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://www.g2.com/products/ispring/reviews"
        ],
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Mobile-friendly",
          "Content library"
        ],
        "pros": [
          "Ease of use",
          "Excellent customer support",
          "Value for money"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/JMh1gE0e5WfzaktdOV9T",
    "_id": "JMh1gE0e5WfzaktdOV9T",
    "_createTime": "2025-06-16T15:06:21.531924Z",
    "_updateTime": "2025-06-16T15:06:21.531924Z",
    "fecha": "2025-06-16T15:06:15.006Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "pros": [
          "Extensive features",
          "Flexible and customizable",
          "Integration with other Adobe products"
        ],
        "highlights": [
          "Rich media elements",
          "Mobile learning",
          "Software simulations"
        ],
        "name": "Adobe Captivate",
        "sentiment": 0.9,
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "contras": [
          "Steep learning curve",
          "Expensive"
        ]
      },
      {
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-3/reviews"
        ],
        "name": "Articulate Storyline",
        "contras": [
          "Limited mobile support",
          "Expensive"
        ],
        "pros": [
          "Easy to use",
          "Great community support",
          "Lots of templates"
        ],
        "highlights": [
          "User-friendly interface",
          "Interactive slides",
          "Software simulations"
        ],
        "sentiment": 0.8
      },
      {
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia/reviews"
        ],
        "name": "TechSmith Camtasia",
        "pros": [
          "Easy to use",
          "Good video editing tools",
          "Affordable"
        ],
        "sentiment": 0.7,
        "contras": [
          "Limited eLearning features",
          "Limited interactivity"
        ],
        "highlights": [
          "Screen recording",
          "Video editing",
          "Interactive quizzes"
        ]
      }
    ],
    "query": "best live polling tools"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/FcpwlbTg4a9UsHU3svpU",
    "_id": "FcpwlbTg4a9UsHU3svpU",
    "_createTime": "2025-06-16T15:00:09.292396Z",
    "_updateTime": "2025-06-16T15:00:09.292396Z",
    "query": "tools for building online escape rooms for students",
    "tools": [
      {
        "pros": [
          "Easy to use",
          "Excellent support",
          "Great community"
        ],
        "name": "Adobe Captivate",
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ],
        "sentiment": 0.8,
        "highlights": [
          "Powerful multimedia features",
          "Wide range of templates",
          "Interactive eLearning content"
        ],
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Requires high performance computer"
        ]
      },
      {
        "sentiment": 0.9,
        "highlights": [
          "Intuitive user interface",
          "Powerful animation features",
          "eLearning game design capabilities"
        ],
        "name": "Articulate Storyline",
        "contras": [
          "Expensive",
          "Limited mobile support",
          "Requires regular updates"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ],
        "pros": [
          "Easy to use",
          "Excellent customer service",
          "Wide range of features"
        ]
      },
      {
        "pros": [
          "Easy to use",
          "Good value for money",
          "Great for beginners"
        ],
        "name": "TechSmith Camtasia",
        "highlights": [
          "Powerful screen recording",
          "Video editing capabilities",
          "Interactive video quizzes"
        ],
        "contras": [
          "Limited advanced editing features",
          "Limited animation features",
          "Occasional software crashes"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia/reviews"
        ],
        "sentiment": 0.7
      }
    ],
    "fecha": "2025-06-16T15:00:02.754Z",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/9fKb1G98rIy92WG6LZqZ",
    "_id": "9fKb1G98rIy92WG6LZqZ",
    "_createTime": "2025-06-16T15:03:19.171955Z",
    "_updateTime": "2025-06-16T15:03:19.171955Z",
    "query": "how to make interactive lesson plans online",
    "tools": [
      {
        "pros": [
          "Intuitive User Interface",
          "Strong Community Support",
          "Highly Customizable"
        ],
        "highlights": [
          "Interactivity",
          "Responsive Design",
          "Multimedia Integration"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "sentiment": 0.8,
        "cons": [
          "Steep Learning Curve",
          "Expensive"
        ],
        "name": "Adobe Captivate"
      },
      {
        "pros": [
          "Easy to Use",
          "Flexible and Scalable",
          "Good Customer Support"
        ],
        "highlights": [
          "Interactive Content",
          "Mobile Friendly",
          "Built-in Templates"
        ],
        "name": "Articulate Storyline",
        "cons": [
          "Limited Video Editing",
          "Subscription Model"
        ],
        "sentiment": 0.9,
        "sources": [
          "https://www.articulate.com/products/storyline-360.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "iSpring Suite",
        "highlights": [
          "PowerPoint Integration",
          "Mobile Learning",
          "Content Library"
        ],
        "sentiment": 0.7,
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "cons": [
          "Limited Customization",
          "Requires Microsoft Office"
        ],
        "pros": [
          "User-Friendly",
          "High Quality Output",
          "Good Value for Money"
        ]
      }
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:03:12.618Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/5XtJvjfH3Ire76kJ8a5T",
    "_id": "5XtJvjfH3Ire76kJ8a5T",
    "_createTime": "2025-06-16T15:05:17.953061Z",
    "_updateTime": "2025-06-16T15:05:17.953061Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "contras": [
          "Expensive",
          "Steep learning curve"
        ],
        "name": "Adobe Captivate",
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "highlights": [
          "Easy to use",
          "Feature-rich",
          "Supports responsive design"
        ],
        "pros": [
          "Great for eLearning",
          "Supports SCORM",
          "Good community support"
        ],
        "sentiment": 0.8
      },
      {
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "sentiment": 0.9,
        "pros": [
          "Powerful",
          "Flexible",
          "Good community"
        ],
        "contras": [
          "Expensive",
          "Limited in some aspects"
        ],
        "name": "Articulate Storyline",
        "highlights": [
          "Intuitive interface",
          "Good for interactive courses",
          "Great support"
        ]
      },
      {
        "contras": [
          "Limited functionality compared to others",
          "Support could be better"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ],
        "highlights": [
          "Easy to use",
          "Good for PowerPoint users",
          "Great for quizzes"
        ],
        "name": "iSpring Suite",
        "pros": [
          "User-friendly",
          "Good for mobile learning",
          "Affordable"
        ],
        "sentiment": 0.85
      }
    ],
    "query": "how to make animated and clickable presentations",
    "fecha": "2025-06-16T15:05:11.430Z"
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
