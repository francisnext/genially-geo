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
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/wohtD6A9U4ytyA7vFttn",
    "_id": "wohtD6A9U4ytyA7vFttn",
    "_createTime": "2025-06-20T08:32:43.607724Z",
    "_updateTime": "2025-06-20T08:32:43.607724Z",
    "query": "How can corporate trainers create engaging onboarding materials?",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Interactive elements",
          "Mobile friendly",
          "VR capabilities"
        ],
        "pros": [
          "Great for simulations",
          "Offers a lot of interactivity",
          "Supports SCORM"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software/adobe-captivate"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "User-friendly",
          "Interactive",
          "Customizable"
        ],
        "pros": [
          "Intuitive interface",
          "Good community support",
          "Loads of features"
        ],
        "cons": [
          "Expensive",
          "Limited in advanced scripting"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software/articulate-storyline"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint-based",
          "Quiz maker",
          "Dialogue simulations"
        ],
        "pros": [
          "Easy to use",
          "Great customer service",
          "Good value for money"
        ],
        "cons": [
          "Limited customization",
          "No Mac version"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software/ispring-suite"
        ]
      }
    ],
    "fecha": "2025-06-20T08:32:43.903Z"
  },
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
        "name": "Adobe Captivate",
        "sentiment": 0.9,
        "highlights": [
          "Interactive Content",
          "Responsive Design",
          "VR Capabilities"
        ],
        "pros": [
          "Easy to use",
          "Many features",
          "Good support"
        ],
        "contras": [
          "Pricey",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.8,
        "highlights": [
          "Intuitive Interface",
          "Mobile Friendly",
          "Extensive Template Library"
        ],
        "pros": [
          "Flexible",
          "Great community",
          "Interactive"
        ],
        "contras": [
          "Expensive",
          "Limited video editing"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Mobile app",
          "Content Library"
        ],
        "pros": [
          "User-friendly",
          "Good customer support",
          "Value for money"
        ],
        "contras": [
          "Limited customisation",
          "Issues with updates"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
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
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Rich multimedia features",
          "Interactive content",
          "Mobile friendly"
        ],
        "pros": [
          "Ease of use",
          "Integration with Adobe Suite",
          "Great for eLearning"
        ],
        "cons": [
          "Expensive",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Interactive content",
          "Easy to use",
          "Great community support"
        ],
        "pros": [
          "Great templates",
          "Excellent customer support",
          "Good for interactive courses"
        ],
        "cons": [
          "Expensive",
          "Limited in terms of design"
        ],
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.7,
        "highlights": [
          "Good for beginners",
          "Lots of features",
          "PowerPoint integration"
        ],
        "pros": [
          "Ease of use",
          "Good value for money",
          "Great customer support"
        ],
        "cons": [
          "Limited customisation",
          "Occasional bugs"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
      },
      {
        "name": "Lectora",
        "sentiment": 0.6,
        "highlights": [
          "Powerful authoring tool",
          "Customisable",
          "Mobile friendly"
        ],
        "pros": [
          "Lots of features",
          "Good for complex courses",
          "Great customer support"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online-elearning-authoring-tool",
          "https://elearningindustry.com/directory/elearning-software/lectora-inspire/reviews"
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
    "tools": [
      {
        "name": "Adobe Captivate",
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
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive user interface",
          "Strong community support",
          "Supports responsive design"
        ],
        "pros": [
          "Easy to use",
          "Great animation capabilities",
          "Powerful interactivity"
        ],
        "contras": [
          "Limited video editing",
          "No Mac version"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "Fully-integrated with PowerPoint",
          "Supports mobile learning",
          "High-quality output"
        ],
        "pros": [
          "Easy to use",
          "Great support team",
          "Rich quiz creation features"
        ],
        "contras": [
          "Limited customization options",
          "No Mac version"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      }
    ],
    "ia": "ChatGPT",
    "query": "instructional design tools with gamification features",
    "fecha": "2025-06-16T14:59:04.653Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/rFTNqYbLRC8sRLEJQa6a",
    "_id": "rFTNqYbLRC8sRLEJQa6a",
    "_createTime": "2025-06-20T08:31:55.483994Z",
    "_updateTime": "2025-06-20T08:31:55.483994Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Ease of use",
          "Wide range of templates",
          "Advanced features"
        ],
        "pros": [
          "Interactive content",
          "Multimedia support",
          "Mobile-friendly"
        ],
        "contras": [
          "Expensive",
          "Requires learning curve",
          "May have compatibility issues"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "User-friendly",
          "Powerful interactivity",
          "Great community support"
        ],
        "pros": [
          "Intuitive interface",
          "Wide range of templates",
          "Good for beginners"
        ],
        "contras": [
          "Costly",
          "Limited customization",
          "Updates can cause issues"
        ],
        "sources": [
          "https://articulate.com/products/storyline",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-3/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Mobile learning",
          "Content Library"
        ],
        "pros": [
          "Easy to use",
          "Good tech support",
          "Affordable"
        ],
        "contras": [
          "Limited interactivity",
          "Requires PowerPoint",
          "No Mac version"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite-max/reviews"
        ]
      }
    ],
    "fecha": "2025-06-20T08:31:55.817Z",
    "query": "How can teachers track student engagement in digital content?"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/m8lODXPZRTWomwEICUbi",
    "_id": "m8lODXPZRTWomwEICUbi",
    "_createTime": "2025-06-16T15:00:55.458915Z",
    "_updateTime": "2025-06-16T15:00:55.458915Z",
    "tools": [
      {
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
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
        "contras": [
          "Costoso",
          "Curva de aprendizaje inicial",
          "Requiere una suscripción a Adobe Creative Cloud"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/adobe-captivate"
        ]
      },
      {
        "nombre": "Articulate Storyline",
        "sentimiento": 0.9,
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
        "contras": [
          "Costoso",
          "Funcionalidad limitada en el modo de vista previa",
          "Requiere actualizaciones regulares"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/articulate-storyline"
        ]
      },
      {
        "nombre": "Lectora Inspire",
        "sentimiento": 0.7,
        "highlights": [
          "Soporte para HTML5",
          "Interfaz de usuario personalizable",
          "Funciones de colaboración en equipo"
        ],
        "pros": [
          "Soporte para contenido interactivo",
          "Capacidades de edición de video",
          "Compatibilidad con SCORM y AICC"
        ],
        "contras": [
          "Interfaz de usuario menos intuitiva",
          "Funcionalidad de edición de video limitada",
          "Costoso"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online-e-learning-software",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools/companies/lectora-inspire"
        ]
      }
    ],
    "query": "free tool for making interactive content",
    "fecha": "2025-06-16T15:00:48.914Z",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/lmNJWu1tRIdcqG7xZcCD",
    "_id": "lmNJWu1tRIdcqG7xZcCD",
    "_createTime": "2025-06-16T15:02:32.038151Z",
    "_updateTime": "2025-06-16T15:02:32.038151Z",
    "query": "digital storytelling tools for teachers",
    "fecha": "2025-06-16T15:02:25.490Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Interactive eLearning content",
          "VR capabilities",
          "Responsive design"
        ],
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
        "sources": [
          "https://elearningindustry.com/directory/software/adobe-captivate"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Easy to use interface",
          "Accelerated mobile publishing",
          "Interactive content"
        ],
        "pros": [
          "Intuitive interface",
          "Wide range of templates",
          "Strong community support"
        ],
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
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint-based",
          "Mobile-friendly",
          "Interactive quizzes"
        ],
        "pros": [
          "Easy to use",
          "Great customer support",
          "Effective output quality"
        ],
        "cons": [
          "Limited functionality",
          "Dependent on PowerPoint",
          "Limited design options"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software/ispring-suite"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/lSGN9RiEWrwpOlyYZNTK",
    "_id": "lSGN9RiEWrwpOlyYZNTK",
    "_createTime": "2025-06-20T08:31:40.571309Z",
    "_updateTime": "2025-06-20T08:31:40.571309Z",
    "fecha": "2025-06-20T08:31:40.884Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Intuitive UI",
          "Wide range of templates",
          "Powerful scripting capabilities"
        ],
        "pros": [
          "Easy to use",
          "Advanced interaction features",
          "Good customer support"
        ],
        "contras": [
          "High learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.capterra.com/p/151219/Adobe-Captivate/"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "User-friendly",
          "Great community support",
          "Mobile-friendly"
        ],
        "pros": [
          "Interactive elements",
          "Responsive design",
          "Good for beginners and experts"
        ],
        "contras": [
          "Limited video editing",
          "Expensive"
        ],
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://www.capterra.com/p/134022/Articulate-Storyline/"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Wide functionality",
          "Good for eLearning"
        ],
        "pros": [
          "Easy to use",
          "Great customer service",
          "Mobile-friendly"
        ],
        "contras": [
          "Limited video editing",
          "Could use more templates"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://www.capterra.com/p/147165/iSpring-Suite/"
        ]
      }
    ],
    "query": "Are there tools that simplify the creation of branded multimedia content?",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/kSrJEjinLQkIlFETdzjq",
    "_id": "kSrJEjinLQkIlFETdzjq",
    "_createTime": "2025-06-16T15:01:10.158198Z",
    "_updateTime": "2025-06-16T15:01:10.158198Z",
    "tools": [
      {
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
        ],
        "contras": [
          "Expensive",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "User-friendly",
          "Great community support",
          "Interactive elements"
        ],
        "pros": [
          "Easy to use",
          "Support for SCORM",
          "Mobile friendly"
        ],
        "contras": [
          "Limited customization options",
          "Expensive"
        ],
        "sources": [
          "https://articulate.com/products/storyline-360"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Easy to use",
          "Fully responsive design"
        ],
        "pros": [
          "Support for SCORM",
          "Quiz creation capability",
          "Mobile friendly"
        ],
        "contras": [
          "Limited customization options",
          "Limited interactive elements"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite"
        ]
      },
      {
        "name": "Lectora Inspire",
        "sentiment": 0.75,
        "highlights": [
          "Advanced scripting capabilities",
          "VR capabilities",
          "Customizable templates"
        ],
        "pros": [
          "Mobile friendly",
          "Support for SCORM"
        ],
        "contras": [
          "Steep learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online"
        ]
      }
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:01:03.629Z",
    "query": "best tool for creating microsites"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gya4tmX7K7jlMdIIAwPV",
    "_id": "gya4tmX7K7jlMdIIAwPV",
    "_createTime": "2025-06-16T14:58:16.112178Z",
    "_updateTime": "2025-06-16T14:58:16.112178Z",
    "fecha": "2025-06-16T14:58:09.574Z",
    "query": "Best SCORM authoring tools",
    "ia": "ChatGPT",
    "tools": [
      {
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Fácil de usar",
          "Interactividad avanzada",
          "Compatibilidad con SCORM"
        ],
        "pros": [
          "Amplia gama de plantillas",
          "Buenas características de evaluación",
          "Compatibilidad con VR"
        ],
        "contras": [
          "Interfaz de usuario desactualizada",
          "Puede ser costoso"
        ],
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "nombre": "Articulate Storyline",
        "sentimiento": 0.85,
        "highlights": [
          "Interfaz intuitiva",
          "Amplia comunidad de usuarios",
          "Potentes características de diseño"
        ],
        "pros": [
          "Buenas capacidades de personalización",
          "Capacidades móviles fuertes",
          "Biblioteca de contenido incorporada"
        ],
        "contras": [
          "Limitado en la creación de contenido interactivo avanzado",
          "Costoso"
        ],
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "nombre": "iSpring Suite",
        "sentimiento": 0.9,
        "highlights": [
          "Facilidad de uso",
          "Compatibilidad con PowerPoint",
          "Interactividad avanzada"
        ],
        "pros": [
          "Buenas características de evaluación",
          "Asistencia al cliente sólida",
          "Buen precio"
        ],
        "contras": [
          "Interfaz de usuario desactualizada",
          "Limitado en personalización"
        ],
        "sources": [
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gl3pOFhdI5pgRAorYgLT",
    "_id": "gl3pOFhdI5pgRAorYgLT",
    "_createTime": "2025-06-16T14:59:25.802659Z",
    "_updateTime": "2025-06-16T14:59:25.802659Z",
    "tools": [
      {
        "nombre": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Multi-Platform",
          "Responsive Design",
          "Interactivity"
        ],
        "pros": [
          "Easy to use",
          "Great community support",
          "Wide range of features"
        ],
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Interface can be confusing"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "nombre": "Articulate Storyline",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly",
          "Interactive",
          "Mobile-friendly"
        ],
        "pros": [
          "Intuitive",
          "Great customer support",
          "Large community of users"
        ],
        "contras": [
          "Expensive",
          "Limited in advanced scripting",
          "Need high performance hardware"
        ],
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "nombre": "iSpring Suite",
        "sentimiento": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Mobile-friendly",
          "Quizzes and Interactions"
        ],
        "pros": [
          "Ease of use",
          "Good value for money",
          "Strong user community"
        ],
        "contras": [
          "Limited customization",
          "Limited in video editing",
          "Need Microsoft Office to run"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
      }
    ],
    "ia": "ChatGPT",
    "query": "best visual communication tools",
    "fecha": "2025-06-16T14:59:19.265Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gCPRb2Sy6aFWXsckGylA",
    "_id": "gCPRb2Sy6aFWXsckGylA",
    "_createTime": "2025-06-16T14:56:59.022291Z",
    "_updateTime": "2025-06-16T14:56:59.022291Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "nombre": "Adobe Captivate",
        "sentimiento": 0.9,
        "highlights": [
          "Interactividad",
          "Amplia gama de medios",
          "Simulaciones de software"
        ],
        "pros": [
          "Fácil de usar",
          "Amplio rango de plantillas",
          "Soporte para VR"
        ],
        "contras": [
          "Costoso",
          "Curva de aprendizaje pronunciada"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ]
      },
      {
        "nombre": "Articulate Storyline",
        "sentimiento": 0.85,
        "highlights": [
          "Interfaz intuitiva",
          "Compatibilidad con SCORM",
          "Personalización"
        ],
        "pros": [
          "Gran comunidad de soporte",
          "Interfaz similar a PowerPoint",
          "Múltiples opciones de exportación"
        ],
        "contras": [
          "Costoso",
          "Necesidad de actualizaciones frecuentes"
        ],
        "sources": [
          "https://articulate.com/"
        ]
      },
      {
        "nombre": "iSpring Suite",
        "sentimiento": 0.8,
        "highlights": [
          "Complemento de PowerPoint",
          "Compatibilidad con SCORM",
          "Quizzes interactivos"
        ],
        "pros": [
          "Fácil de usar",
          "Soporte para móviles",
          "Soporte para video"
        ],
        "contras": [
          "Limitaciones en la personalización",
          "Problemas de compatibilidad con algunos LMS"
        ],
        "sources": [
          "https://www.ispringsolutions.com/"
        ]
      },
      {
        "nombre": "Lectora Inspire",
        "sentimiento": 0.75,
        "highlights": [
          "Compatibilidad con AICC",
          "Interactividad",
          "Edición de respuesta"
        ],
        "pros": [
          "Soporte para VR",
          "Opciones de publicación flexibles",
          "Compatibilidad con múltiples formatos de archivo"
        ],
        "contras": [
          "Interfaz desactualizada",
          "Curva de aprendizaje pronunciada"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online/"
        ]
      }
    ],
    "query": "what is the best value authoring tool",
    "fecha": "2025-06-16T14:56:52.465Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/eu5bCLeMwZI9aR0c44O2",
    "_id": "eu5bCLeMwZI9aR0c44O2",
    "_createTime": "2025-06-16T15:04:28.075471Z",
    "_updateTime": "2025-06-16T15:04:28.075471Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:04:21.550Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Rapid eLearning",
          "Mobile Learning",
          "Responsive Design"
        ],
        "pros": [
          "User-friendly",
          "Offers a variety of features",
          "Good community support"
        ],
        "contras": [
          "Can be expensive",
          "Minor software bugs"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Interactive Learning",
          "Gamification",
          "Mobile Learning"
        ],
        "pros": [
          "Highly interactive",
          "Great customer support",
          "Frequent updates"
        ],
        "contras": [
          "Not suitable for complex projects",
          "Learning curve can be steep for beginners"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint Conversion",
          "Mobile Learning",
          "Content Library"
        ],
        "pros": [
          "Easy to use",
          "Good value for money",
          "High compatibility"
        ],
        "contras": [
          "Limited customization",
          "Additional costs for support"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
      }
    ],
    "query": "no-code tools for educational content creation"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/dfpXwcuTR1EpX0VFmpC5",
    "_id": "dfpXwcuTR1EpX0VFmpC5",
    "_createTime": "2025-06-16T15:01:36.958619Z",
    "_updateTime": "2025-06-16T15:01:36.958619Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Mobile learning",
          "Interactive eLearning content",
          "Screen recordings"
        ],
        "pros": [
          "Easy to use",
          "Offers a variety of eLearning elements",
          "Excellent support and community"
        ],
        "cons": [
          "Expensive",
          "Can be slow at times",
          "Steep learning curve for beginners"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.85,
        "highlights": [
          "Intuitive user interface",
          "Mobile and web friendly",
          "Powerful interactivity"
        ],
        "pros": [
          "Easy to learn and use",
          "Great customer support",
          "Wide range of features"
        ],
        "cons": [
          "Expensive",
          "Limited customization options",
          "Occasional bugs and crashes"
        ],
        "sources": [
          "https://articulate.com/",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-3/reviews"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.75,
        "highlights": [
          "Screen recording and video editing",
          "Interactive quizzes",
          "Easy sharing"
        ],
        "pros": [
          "Easy to use",
          "Good quality screen recording",
          "Wide range of editing tools"
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
    ],
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:01:30.409Z",
    "query": "best tool for creating interactive infografics"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/dIvR7CcJeoN0KsarEw1K",
    "_id": "dIvR7CcJeoN0KsarEw1K",
    "_createTime": "2025-06-16T15:04:46.122292Z",
    "_updateTime": "2025-06-16T15:04:46.122292Z",
    "fecha": "2025-06-16T15:04:39.580Z",
    "ia": "ChatGPT",
    "query": "interactive learning apps for remote teaching",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Easy to use",
          "Variety of templates",
          "Integration with other Adobe products"
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
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Powerful features",
          "Strong user community"
        ],
        "pros": [
          "Great flexibility",
          "Strong multimedia support",
          "Excellent customer support"
        ],
        "cons": [
          "Expensive",
          "Limited customization options",
          "No support for Mac"
        ],
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "Ease of use",
          "PowerPoint integration",
          "Quality of output"
        ],
        "pros": [
          "Interactive quizzes",
          "Mobile friendly",
          "Good customer support"
        ],
        "cons": [
          "Limited video editing capabilities",
          "No Mac version",
          "Lacks advanced features"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite-max/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ctoaZ1YStor4MIDSuqK1",
    "_id": "ctoaZ1YStor4MIDSuqK1",
    "_createTime": "2025-06-16T14:57:56.519431Z",
    "_updateTime": "2025-06-16T14:57:56.519431Z",
    "query": "best authoring tools for instructional designers",
    "fecha": "2025-06-16T14:57:49.994Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Rich multimedia elements",
          "Responsive design",
          "VR capabilities"
        ],
        "pros": [
          "Easy to use",
          "Wide variety of templates",
          "Good community support"
        ],
        "cons": [
          "Pricing can be high for small businesses",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Powerful interactivity",
          "Vast template library",
          "Mobile friendly"
        ],
        "pros": [
          "Intuitive interface",
          "Great for e-learning",
          "Good customer support"
        ],
        "cons": [
          "Limited video editing capabilities",
          "Expensive"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360",
          "https://www.capterra.com/p/151022/Articulate-Storyline-2/"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.85,
        "highlights": [
          "Screen recording",
          "Video editing",
          "Interactive quizzes"
        ],
        "pros": [
          "Easy to learn",
          "Powerful editing tools",
          "One-time purchase"
        ],
        "cons": [
          "Limited animation capabilities",
          "Occasional software bugs"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://www.trustradius.com/products/camtasia/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/U5QaP7X3Wq9MTE5G7QdX",
    "_id": "U5QaP7X3Wq9MTE5G7QdX",
    "_createTime": "2025-06-20T08:33:28.982443Z",
    "_updateTime": "2025-06-20T08:33:28.982443Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-20T08:33:29.261Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Interactive content creation",
          "Responsive design",
          "VR capabilities"
        ],
        "pros": [
          "Versatile",
          "Great for eLearning",
          "Wide range of features"
        ],
        "contras": [
          "Steep learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Variety of templates",
          "Interactive elements"
        ],
        "pros": [
          "Easy to use",
          "Great community support",
          "Flexible"
        ],
        "contras": [
          "Limited customization",
          "Expensive"
        ],
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://www.g2.com/products/articulate-storyline/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Mobile-friendly",
          "Content Library"
        ],
        "pros": [
          "Intuitive interface",
          "Great for beginners",
          "Affordable"
        ],
        "contras": [
          "Limited interactivity",
          "Dependent on PowerPoint"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://www.g2.com/products/ispring-suite/reviews"
        ]
      }
    ],
    "query": "How can I create visual storytelling pieces for marketing?"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QeiURHYJp3y9fr62wAyg",
    "_id": "QeiURHYJp3y9fr62wAyg",
    "_createTime": "2025-06-20T08:31:27.378147Z",
    "_updateTime": "2025-06-20T08:31:27.378147Z",
    "query": "What are the best platforms for creating interactive presentations?",
    "fecha": "2025-06-20T08:31:27.650Z",
    "ia": "ChatGPT",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Interactive Content",
          "Assessments",
          "Responsive Design"
        ],
        "pros": [
          "Great User Interface",
          "Wide range of templates",
          "Good for mobile learning"
        ],
        "contras": [
          "High learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Custom Interactivity",
          "Screen Recording",
          "Translation Support"
        ],
        "pros": [
          "Easy to use",
          "Powerful interactivity",
          "Good community support"
        ],
        "contras": [
          "Limited design capabilities",
          "Expensive"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.html"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "Video Lectures",
          "Interactive Quizzes",
          "Dialogue Simulations"
        ],
        "pros": [
          "Integrates with PowerPoint",
          "Easy to use",
          "Good for video courses"
        ],
        "contras": [
          "Limited customization",
          "Requires PowerPoint"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite"
        ]
      },
      {
        "name": "Lectora Online",
        "sentiment": 0.75,
        "highlights": [
          "Responsive Course Design",
          "Interactive Video",
          "Customizable Templates"
        ],
        "pros": [
          "Strong accessibility support",
          "Advanced scripting capabilities"
        ],
        "contras": [
          "Difficult for beginners",
          "Limited templates"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/PaHcPZrCKpN1yVHdaJlw",
    "_id": "PaHcPZrCKpN1yVHdaJlw",
    "_createTime": "2025-06-16T15:05:58.541420Z",
    "_updateTime": "2025-06-16T15:05:58.541420Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:05:51.997Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
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
        "contras": [
          "Steep learning curve",
          "Expensive",
          "Requires high system performance"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Easy to use",
          "Interactive elements",
          "Mobile friendly"
        ],
        "pros": [
          "Powerful editing features",
          "Excellent customer support",
          "Regular updates"
        ],
        "contras": [
          "Limited collaboration features",
          "Expensive",
          "Dependent on Flash for some features"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.7,
        "highlights": [
          "Screen recording",
          "Video editing",
          "Animations and effects"
        ],
        "pros": [
          "Easy to learn",
          "High-quality output",
          "Integrates with PowerPoint"
        ],
        "contras": [
          "Limited interactive features",
          "Expensive",
          "No HTML5 output"
        ],
        "sources": [
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      }
    ],
    "query": "tools for engaging audiences in presentations"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/OnWurSsu2fIq73q6w8KC",
    "_id": "OnWurSsu2fIq73q6w8KC",
    "_createTime": "2025-06-20T08:33:15.787659Z",
    "_updateTime": "2025-06-20T08:33:15.787659Z",
    "query": "What are the top trends in interactive content for education?",
    "ia": "ChatGPT",
    "fecha": "2025-06-20T08:33:16.089Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Multimedia integration",
          "Responsive design",
          "eLearning quizzes"
        ],
        "pros": [
          "Powerful features",
          "Great support",
          "Flexibility"
        ],
        "cons": [
          "High learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Drag-and-drop interface",
          "Interactive elements",
          "eLearning templates"
        ],
        "pros": [
          "User-friendly",
          "Good community support",
          "Wide range of features"
        ],
        "cons": [
          "Limited customization",
          "Issues with HTML5 output"
        ],
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.85,
        "highlights": [
          "Screen recording",
          "Video editing",
          "Animation features"
        ],
        "pros": [
          "Easy to use",
          "High-quality output",
          "Great for video-based learning"
        ],
        "cons": [
          "Limited interactivity",
          "Expensive"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia-9/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.95,
        "highlights": [
          "PowerPoint integration",
          "eLearning quizzes",
          "Content library"
        ],
        "pros": [
          "Intuitive interface",
          "Wide range of tools",
          "Good customer support"
        ],
        "cons": [
          "Limited video editing",
          "Requires PowerPoint for some features"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/elearning-software/ispring-suite/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Ohb5W51AkT0GC3eS6D4H",
    "_id": "Ohb5W51AkT0GC3eS6D4H",
    "_createTime": "2025-06-16T14:58:54.018531Z",
    "_updateTime": "2025-06-16T14:58:54.018531Z",
    "query": "LMS-compatible authoring tools for instructional designers",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Powerful tool",
          "Interactive learning",
          "VR capabilities"
        ],
        "pros": [
          "Wide range of features",
          "Supports responsive design",
          "Good community support"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive for small businesses",
          "Requires high system resources"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Good for beginners",
          "Strong customer support"
        ],
        "pros": [
          "Easy to use",
          "Great flexibility",
          "Good for rapid eLearning"
        ],
        "cons": [
          "Expensive",
          "Limited in advanced capabilities",
          "Occasional bugs"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.html",
          "https://www.capterra.com/p/150269/Articulate-Storyline-2/"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.7,
        "highlights": [
          "Great for video-based learning",
          "Screen recording capabilities",
          "Powerful editing tools"
        ],
        "pros": [
          "Easy to use",
          "Affordable",
          "Good quality output"
        ],
        "cons": [
          "Limited interactivity",
          "Not ideal for complex projects",
          "Limited support for mobile learning"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://www.trustradius.com/products/camtasia/reviews"
        ]
      }
    ],
    "fecha": "2025-06-16T14:58:47.473Z",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/NU4ekD1SDWQNxRReLxcw",
    "_id": "NU4ekD1SDWQNxRReLxcw",
    "_createTime": "2025-06-16T15:04:15.313682Z",
    "_updateTime": "2025-06-16T15:04:15.313682Z",
    "ia": "ChatGPT",
    "query": "create branching scenarios for e-learning",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.9,
        "highlights": [
          "Interactive content",
          "Wide range of templates",
          "Mobile learning support"
        ],
        "pros": [
          "Easy to use",
          "Great for eLearning content",
          "Excellent support"
        ],
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Requires high system resources"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.8,
        "highlights": [
          "Powerful features",
          "Intuitive interface",
          "Extensive library of resources"
        ],
        "pros": [
          "Excellent for interactive content",
          "Great support community",
          "Regular updates"
        ],
        "contras": [
          "Expensive",
          "Limited collaboration features",
          "Lacks advanced reporting"
        ],
        "sources": [
          "https://articulate.com/products/storyline-360",
          "https://www.capterra.com/p/133438/Articulate-Storyline-2/"
        ]
      },
      {
        "name": "iSpring Suite",
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
        ],
        "contras": [
          "Limited customization",
          "Lacks some advanced features",
          "Dependent on PowerPoint"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://www.g2.com/products/ispring/reviews"
        ]
      }
    ],
    "fecha": "2025-06-16T15:04:08.800Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/KehX9gT2BduRHV1BxRbk",
    "_id": "KehX9gT2BduRHV1BxRbk",
    "_createTime": "2025-06-20T08:33:42.244243Z",
    "_updateTime": "2025-06-20T08:33:42.244243Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Responsive design",
          "Interactive content",
          "VR capabilities"
        ],
        "pros": [
          "Intuitive user interface",
          "Wide array of multimedia elements",
          "Strong community support"
        ],
        "contras": [
          "Expensive license",
          "Steep learning curve for beginners",
          "Occasional software bugs"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-tools/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Powerful interactivity",
          "Mobile-friendly",
          "Easily customizable"
        ],
        "pros": [
          "User-friendly",
          "Rich media integration",
          "Great support and tutorials"
        ],
        "contras": [
          "Limited in advanced scripting",
          "No Mac version",
          "Higher price point"
        ],
        "sources": [
          "https://articulate.com/p/storyline-3",
          "https://elearningindustry.com/directory/software-tools/articulate-storyline-3/reviews"
        ]
      },
      {
        "name": "Lectora Inspire",
        "sentiment": 0.7,
        "highlights": [
          "Responsive design",
          "Powerful scripting",
          "Multi-language support"
        ],
        "pros": [
          "Flexible and customizable",
          "SCORM compliant",
          "Good customer support"
        ],
        "contras": [
          "Interface may seem outdated",
          "Lacks built-in templates",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.trivantis.com/products/lectora-online-elearning-authoring-tool",
          "https://elearningindustry.com/directory/software-tools/lectora-inspire/reviews"
        ]
      }
    ],
    "fecha": "2025-06-20T08:33:42.554Z",
    "query": "How can marketers create interactive landing pages?",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/JMh1gE0e5WfzaktdOV9T",
    "_id": "JMh1gE0e5WfzaktdOV9T",
    "_createTime": "2025-06-16T15:06:21.531924Z",
    "_updateTime": "2025-06-16T15:06:21.531924Z",
    "query": "best live polling tools",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:06:15.006Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.9,
        "highlights": [
          "Rich media elements",
          "Mobile learning",
          "Software simulations"
        ],
        "pros": [
          "Extensive features",
          "Flexible and customizable",
          "Integration with other Adobe products"
        ],
        "contras": [
          "Steep learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.8,
        "highlights": [
          "User-friendly interface",
          "Interactive slides",
          "Software simulations"
        ],
        "pros": [
          "Easy to use",
          "Great community support",
          "Lots of templates"
        ],
        "contras": [
          "Limited mobile support",
          "Expensive"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-3/reviews"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.7,
        "highlights": [
          "Screen recording",
          "Video editing",
          "Interactive quizzes"
        ],
        "pros": [
          "Easy to use",
          "Good video editing tools",
          "Affordable"
        ],
        "contras": [
          "Limited eLearning features",
          "Limited interactivity"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/IGKaeLWzy5bLosJiCMcg",
    "_id": "IGKaeLWzy5bLosJiCMcg",
    "_createTime": "2025-06-20T08:32:31.612565Z",
    "_updateTime": "2025-06-20T08:32:31.612565Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-20T08:32:31.919Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Easy to use",
          "Powerful features",
          "Great for e-learning"
        ],
        "pros": [
          "Advanced interactivity",
          "Responsive design",
          "VR capabilities"
        ],
        "cons": [
          "High learning curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Flexible and customizable",
          "Built-in templates"
        ],
        "pros": [
          "Highly interactive",
          "Mobile friendly",
          "Strong community support"
        ],
        "cons": [
          "Limited video editing",
          "Expensive"
        ],
        "sources": [
          "https://www.articulate.com"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.7,
        "highlights": [
          "Screen recording",
          "Video editing",
          "Annotations"
        ],
        "pros": [
          "Easy to use",
          "Good video quality",
          "Library of assets"
        ],
        "cons": [
          "Limited interactivity",
          "Not specifically for e-learning"
        ],
        "sources": [
          "https://www.techsmith.com"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Quizzes",
          "Interactions"
        ],
        "pros": [
          "User-friendly",
          "Mobile ready",
          "SCORM compliant"
        ],
        "cons": [
          "Limited video editing",
          "Requires PowerPoint"
        ],
        "sources": [
          "https://www.ispringsolutions.com"
        ]
      }
    ],
    "query": "How do educators build escape games for the classroom?"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/FcpwlbTg4a9UsHU3svpU",
    "_id": "FcpwlbTg4a9UsHU3svpU",
    "_createTime": "2025-06-16T15:00:09.292396Z",
    "_updateTime": "2025-06-16T15:00:09.292396Z",
    "fecha": "2025-06-16T15:00:02.754Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Powerful multimedia features",
          "Wide range of templates",
          "Interactive eLearning content"
        ],
        "pros": [
          "Easy to use",
          "Excellent support",
          "Great community"
        ],
        "contras": [
          "Expensive",
          "Steep learning curve",
          "Requires high performance computer"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/elearning-software/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive user interface",
          "Powerful animation features",
          "eLearning game design capabilities"
        ],
        "pros": [
          "Easy to use",
          "Excellent customer service",
          "Wide range of features"
        ],
        "contras": [
          "Expensive",
          "Limited mobile support",
          "Requires regular updates"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/elearning-software/articulate-storyline-2/reviews"
        ]
      },
      {
        "name": "TechSmith Camtasia",
        "sentiment": 0.7,
        "highlights": [
          "Powerful screen recording",
          "Video editing capabilities",
          "Interactive video quizzes"
        ],
        "pros": [
          "Easy to use",
          "Good value for money",
          "Great for beginners"
        ],
        "contras": [
          "Limited advanced editing features",
          "Limited animation features",
          "Occasional software crashes"
        ],
        "sources": [
          "https://www.techsmith.com/video-editor.html",
          "https://elearningindustry.com/directory/elearning-software/techsmith-camtasia/reviews"
        ]
      }
    ],
    "query": "tools for building online escape rooms for students",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/EKrdw4fcSan8tp6hFtH9",
    "_id": "EKrdw4fcSan8tp6hFtH9",
    "_createTime": "2025-06-20T08:30:48.783171Z",
    "_updateTime": "2025-06-20T08:30:48.783171Z",
    "ia": "ChatGPT",
    "query": "Which tools can help educators design engaging learning materials?",
    "fecha": "2025-06-20T08:30:48.608Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Easy to use",
          "Wide range of features",
          "Excellent support"
        ],
        "pros": [
          "Great for eLearning",
          "Offers responsive design",
          "Supports various media types"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive",
          "Occasional software bugs"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://www.g2.com/products/adobe-captivate/reviews"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Powerful features",
          "Community support"
        ],
        "pros": [
          "Easy to learn",
          "Flexibility in design",
          "Great for interactive content"
        ],
        "cons": [
          "Expensive",
          "Limited in mobile",
          "Issues with HTML5 output"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.html",
          "https://www.g2.com/products/articulate-storyline/reviews"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "User-friendly",
          "Integration with PowerPoint",
          "Quality customer support"
        ],
        "pros": [
          "Comprehensive toolkit",
          "Mobile-friendly",
          "Good for beginners"
        ],
        "cons": [
          "Limited customization",
          "Lack of advanced features",
          "Issues with updates"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://www.g2.com/products/ispring-suite/reviews"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/9fKb1G98rIy92WG6LZqZ",
    "_id": "9fKb1G98rIy92WG6LZqZ",
    "_createTime": "2025-06-16T15:03:19.171955Z",
    "_updateTime": "2025-06-16T15:03:19.171955Z",
    "ia": "ChatGPT",
    "query": "how to make interactive lesson plans online",
    "fecha": "2025-06-16T15:03:12.618Z",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
        "highlights": [
          "Interactivity",
          "Responsive Design",
          "Multimedia Integration"
        ],
        "pros": [
          "Intuitive User Interface",
          "Strong Community Support",
          "Highly Customizable"
        ],
        "cons": [
          "Steep Learning Curve",
          "Expensive"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Interactive Content",
          "Mobile Friendly",
          "Built-in Templates"
        ],
        "pros": [
          "Easy to Use",
          "Flexible and Scalable",
          "Good Customer Support"
        ],
        "cons": [
          "Limited Video Editing",
          "Subscription Model"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-360.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.7,
        "highlights": [
          "PowerPoint Integration",
          "Mobile Learning",
          "Content Library"
        ],
        "pros": [
          "User-Friendly",
          "High Quality Output",
          "Good Value for Money"
        ],
        "cons": [
          "Limited Customization",
          "Requires Microsoft Office"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/5XtJvjfH3Ire76kJ8a5T",
    "_id": "5XtJvjfH3Ire76kJ8a5T",
    "_createTime": "2025-06-16T15:05:17.953061Z",
    "_updateTime": "2025-06-16T15:05:17.953061Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-16T15:05:11.430Z",
    "query": "how to make animated and clickable presentations",
    "tools": [
      {
        "name": "Adobe Captivate",
        "sentiment": 0.8,
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
        "contras": [
          "Expensive",
          "Steep learning curve"
        ],
        "sources": [
          "https://www.adobe.com/products/captivate.html",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "Articulate Storyline",
        "sentiment": 0.9,
        "highlights": [
          "Intuitive interface",
          "Good for interactive courses",
          "Great support"
        ],
        "pros": [
          "Powerful",
          "Flexible",
          "Good community"
        ],
        "contras": [
          "Expensive",
          "Limited in some aspects"
        ],
        "sources": [
          "https://www.articulate.com/products/storyline-why.php",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
        ]
      },
      {
        "name": "iSpring Suite",
        "sentiment": 0.85,
        "highlights": [
          "Easy to use",
          "Good for PowerPoint users",
          "Great for quizzes"
        ],
        "pros": [
          "User-friendly",
          "Good for mobile learning",
          "Affordable"
        ],
        "contras": [
          "Limited functionality compared to others",
          "Support could be better"
        ],
        "sources": [
          "https://www.ispringsolutions.com/ispring-suite",
          "https://elearningindustry.com/directory/software-categories/elearning-authoring-tools"
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
