export interface MarcaMencionada {
  marca: string
  sentimiento: number
  highlights: string[]
}

export interface QueryData {
  _id: string
  menciona_marca: boolean
  marcasMencionadas?: MarcaMencionada[]
  query: string
  fecha: string
  ia: string
}

// Dataset preconfigurado para pruebas
export const SAMPLE_DATASET: QueryData[] = [
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/yaq2bBvUwiq4CaO7FcsG",
    "_id": "yaq2bBvUwiq4CaO7FcsG",
    "_createTime": "2025-06-04T13:55:20.325117Z",
    "_updateTime": "2025-06-04T13:55:20.325117Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:55:02.177Z",
    "query": "how to make animated and clickable presentations",
    "menciona_marca": true,
    "menciona_dominio": null,
    "respuesta": null,
    "marcasMencionadas": [
      {
        "marca": "PowerPoint",
        "sentimiento": 0.8,
        "highlights": [
          "Widely used and easily accessible in Microsoft Office suite"
        ],
        "pros": [
          "Comprehensive animation and transition effects",
          "Broad compatibility and sharing capabilities"
        ],
        "cons": [
          "Interface can be overwhelming for beginners",
          "Limited advanced interactivity features"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.7,
        "highlights": [
          "Unique zooming presentation style"
        ],
        "pros": [
          "Visually captivating animations",
          "Non-linear presentation capabilities"
        ],
        "cons": [
          "Steeper learning curve",
          "Limited offline capabilities"
        ]
      },
      {
        "marca": "Google Slides",
        "sentimiento": 0.75,
        "highlights": [
          "Integrates well with Google Workspace"
        ],
        "pros": [
          "Real-time collaboration features",
          "Cloud storage and accessibility"
        ],
        "cons": [
          "Fewer animation options compared to competitors",
          "Requires internet for full feature access"
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.85,
        "highlights": [
          "User-friendly interface with drag-and-drop features"
        ],
        "pros": [
          "Rich template library",
          "Easy-to-use animation tools"
        ],
        "cons": [
          "Limited customization for advanced users",
          "Some features require subscription"
        ]
      },
      {
        "marca": "Keynote",
        "sentimiento": 0.8,
        "highlights": [
          "Optimized for Apple devices"
        ],
        "pros": [
          "High-quality animations and graphics",
          "Seamless integration within Apple's ecosystem"
        ],
        "cons": [
          "Compatibility issues with non-Apple devices",
          "Limited collaborative features compared to Google Slides"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ux3opEUdoMGoORwNxI7G",
    "_id": "ux3opEUdoMGoORwNxI7G",
    "_createTime": "2025-06-04T13:57:10.378798Z",
    "_updateTime": "2025-06-04T13:57:10.378798Z",
    "menciona_marca": true,
    "ia": "ChatGPT",
    "respuesta": null,
    "query": "best visual communication tools",
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "sentimiento": 0.9,
        "highlights": [
          "Versatile graphic design tool",
          "User-friendly interface"
        ],
        "pros": [
          "Extensive template library",
          "Collaborative features",
          "Free and premium plans available"
        ],
        "cons": [
          "Limited offline capabilities",
          "Some advanced features require a paid subscription"
        ]
      },
      {
        "marca": "Visme",
        "sentimiento": 0.8,
        "highlights": [
          "Interactive presentation capabilities",
          "Robust data visualization tools"
        ],
        "pros": [
          "Drag-and-drop editor",
          "Customizable infographic templates",
          "Brand kit for maintaining consistency"
        ],
        "cons": [
          "Learning curve for beginners",
          "Some features behind paywall"
        ]
      },
      {
        "marca": "Adobe Spark",
        "sentimiento": 0.7,
        "highlights": [
          "Part of Adobe Creative Cloud",
          "Seamless integration with other Adobe products"
        ],
        "pros": [
          "Professional-looking templates",
          "Easy social media content creation",
          "Mobile and web-based platforms"
        ],
        "cons": [
          "Fewer customization options than other Adobe tools",
          "Requires Adobe account, which can be costly"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.75,
        "highlights": [
          "Specialized in infographics and data visualization",
          "Simple and clean design"
        ],
        "pros": [
          "User-friendly with drag-and-drop options",
          "Variety of templates available"
        ],
        "cons": [
          "Limited free version",
          "Complex charts may require some effort"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.6,
        "highlights": [
          "Dynamic and engaging presentation style",
          "Zoomable presentation canvas"
        ],
        "pros": [
          "Innovative presentation formats",
          "Engaging visual effects"
        ],
        "cons": [
          "A unique format may have a learning curve",
          "Can be expensive for premium features"
        ]
      }
    ],
    "fecha": "2025-06-04T13:56:57.885Z",
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/jqPnlzqMLlrBP9m4Atcu",
    "_id": "jqPnlzqMLlrBP9m4Atcu",
    "_createTime": "2025-06-04T13:54:32.502145Z",
    "_updateTime": "2025-06-04T13:54:32.502145Z",
    "respuesta": null,
    "menciona_dominio": true,
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:54:14.658Z",
    "marcasMencionadas": [
      {
        "marca": "Kahoot!",
        "sentimiento": 0.8,
        "highlights": [
          "Widely popular for engaging quizzes and games."
        ],
        "pros": [
          "Interactive and fun for students.",
          "Easy to use interface.",
          "Works across multiple platforms."
        ],
        "cons": [
          "Free version has limited features.",
          "May not support in-depth learning."
        ]
      },
      {
        "marca": "Quizlet",
        "sentimiento": 0.75,
        "highlights": [
          "Offers a variety of study modes and flashcards."
        ],
        "pros": [
          "Large library of user-generated content.",
          "Supports different study methods such as flashcards and games.",
          "Easy sharing and collaboration options."
        ],
        "cons": [
          "Subscription required for advanced features.",
          "Content quality can vary due to user-generated nature."
        ]
      },
      {
        "marca": "Nearpod",
        "sentimiento": 0.85,
        "highlights": [
          "Integrates interactive lessons, videos, and assessments."
        ],
        "pros": [
          "Strong integration with Google Classroom.",
          "Variety of media and engagement tools.",
          "Real-time functionality for live classes."
        ],
        "cons": [
          "Steeper learning curve for new users.",
          "Advanced features require a paid subscription."
        ]
      },
      {
        "marca": "Edmodo",
        "sentimiento": 0.7,
        "highlights": [
          "Acts as a social learning platform."
        ],
        "pros": [
          "Facilitates communication between teachers and students.",
          "Allows for sharing resources and collaboration.",
          "Free for teachers and students."
        ],
        "cons": [
          "Interface may seem outdated.",
          "Limited analytical and grading tools."
        ]
      }
    ],
    "menciona_marca": true,
    "query": "best tools for interactive learning materials"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gqxW3RS5F3AzDWUAzs1K",
    "_id": "gqxW3RS5F3AzDWUAzs1K",
    "_createTime": "2025-06-04T13:54:11.465871Z",
    "_updateTime": "2025-06-04T13:54:11.465871Z",
    "marcasMencionadas": [
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Rich feature set",
          "High-quality output"
        ],
        "pros": [
          "Supports responsive design",
          "Integrates with other Adobe products",
          "Comprehensive user support"
        ],
        "cons": [
          "Steep learning curve",
          "Higher cost compared to other tools"
        ]
      },
      {
        "marca": "Articulate Storyline",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly interface",
          "Powerful capabilities"
        ],
        "pros": [
          "Intuitive interface",
          "Strong community support",
          "Wide range of templates"
        ],
        "cons": [
          "Relatively expensive",
          "Can be slow on large projects"
        ]
      },
      {
        "marca": "Lectora Inspire",
        "sentimiento": 0.7,
        "highlights": [
          "Good for compliance training"
        ],
        "pros": [
          "Robust interaction capabilities",
          "Good multimedia support"
        ],
        "cons": [
          "Less intuitive interface",
          "Limited collaborative features"
        ]
      },
      {
        "marca": "iSpring Suite",
        "sentimiento": 0.85,
        "highlights": [
          "PowerPoint integration"
        ],
        "pros": [
          "Easy to use",
          "Affordable",
          "Integrates well with PowerPoint"
        ],
        "cons": [
          "Not as feature-rich as others",
          "Limited design capabilities"
        ]
      },
      {
        "marca": "Camtasia",
        "sentimiento": 0.75,
        "highlights": [
          "Great for video tutorials"
        ],
        "pros": [
          "Simple video editing capabilities",
          "Easy to learn"
        ],
        "cons": [
          "Not ideal for complex eLearning courses",
          "Higher price for limited eLearning features"
        ]
      }
    ],
    "query": "best authoring tools",
    "ia": "ChatGPT",
    "menciona_dominio": true,
    "fecha": "2025-06-04T13:53:59.714Z",
    "respuesta": null,
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/drYdj64X8T6xAspw6iUr",
    "_id": "drYdj64X8T6xAspw6iUr",
    "_createTime": "2025-06-04T13:54:48.584900Z",
    "_updateTime": "2025-06-04T13:54:48.584900Z",
    "menciona_marca": true,
    "fecha": "2025-06-04T13:54:34.929Z",
    "query": "tools to build online escape rooms for students",
    "menciona_dominio": null,
    "respuesta": null,
    "marcasMencionadas": [
      {
        "marca": "Genially",
        "sentimiento": 0.8,
        "highlights": [
          "Interactividad atractiva",
          "Herramientas versátiles"
        ],
        "pros": [
          "Ofrece una amplia gama de opciones de personalización",
          "Integración fácil con materiales educativos"
        ],
        "cons": [
          "Curva de aprendizaje para nuevos usuarios",
          "Requiere conexión a Internet estable"
        ]
      },
      {
        "marca": "Thinglink",
        "sentimiento": 0.7,
        "highlights": [
          "Interactividad visual",
          "Fácil de usar"
        ],
        "pros": [
          "Permite crear experiencias inmersivas",
          "Integración multimedia sencilla"
        ],
        "cons": [
          "Opciones limitadas en la versión gratuita",
          "Puede ser costoso para grandes instituciones"
        ]
      },
      {
        "marca": "Google Forms",
        "sentimiento": 0.6,
        "highlights": [
          "Accesible y gratuito",
          "Fácil de compartir"
        ],
        "pros": [
          "Familiaridad generalizada",
          "Fácil de configurar y usar"
        ],
        "cons": [
          "Interactividad limitada",
          "No está diseñado específicamente para escape rooms"
        ]
      },
      {
        "marca": "Escape Room Maker",
        "sentimiento": 0.75,
        "highlights": [
          "Especializado en escape rooms",
          "Interfaz intuitiva"
        ],
        "pros": [
          "Fácil de usar para estudiantes",
          "Elementos temáticos incorporados"
        ],
        "cons": [
          "Opciones limitadas de personalización",
          "Soporte técnico variable"
        ]
      }
    ],
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ddRFEcaXiga3dHMXb2Ue",
    "_id": "ddRFEcaXiga3dHMXb2Ue",
    "_createTime": "2025-06-04T13:55:06.902983Z",
    "_updateTime": "2025-06-04T13:55:06.902983Z",
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "sentimiento": 0.9,
        "highlights": [
          "Easy to use",
          "Wide range of templates"
        ],
        "pros": [
          "User-friendly interface",
          "Diverse design options",
          "Good free version"
        ],
        "cons": [
          "Some features are paid",
          "Limited advanced design tools"
        ]
      },
      {
        "marca": "Adobe Spark",
        "sentimiento": 0.85,
        "highlights": [
          "Integration with Adobe ecosystem",
          "Powerful design tools"
        ],
        "pros": [
          "High-quality outputs",
          "Integration with other Adobe products"
        ],
        "cons": [
          "Complex for beginners",
          "Requires subscription for full features"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.75,
        "highlights": [
          "Unique presentation style",
          "Dynamic transitions"
        ],
        "pros": [
          "Interactive designs",
          "Zooming feature"
        ],
        "cons": [
          "Steep learning curve",
          "Can be distracting if overused"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.8,
        "highlights": [
          "Infographic creation",
          "Templates for beginners"
        ],
        "pros": [
          "Simple to use",
          "Strong infographic features"
        ],
        "cons": [
          "Limited customization",
          "Somewhat costly premium options"
        ]
      }
    ],
    "menciona_marca": true,
    "respuesta": null,
    "fecha": "2025-06-04T13:54:54.897Z",
    "ia": "ChatGPT",
    "query": "tools for visual storytelling in education",
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/bJAAzoILl3v8ZfQjlJ12",
    "_id": "bJAAzoILl3v8ZfQjlJ12",
    "_createTime": "2025-06-04T13:54:19.323393Z",
    "_updateTime": "2025-06-04T13:54:19.323393Z",
    "respuesta": null,
    "query": "what is the best authoring tool in terms of quality/price ratio",
    "fecha": "2025-06-04T13:54:06.708Z",
    "menciona_dominio": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Articulate Storyline",
        "sentimiento": 0.8,
        "highlights": [
          "Widely used",
          "Good for interactive content"
        ],
        "pros": [
          "User-friendly interface",
          "Comprehensive feature set"
        ],
        "cons": [
          "High price",
          "Steep learning curve for beginners"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.7,
        "highlights": [
          "Trusted brand",
          "Powerful but complex"
        ],
        "pros": [
          "Integration with Adobe ecosystem",
          "Advanced features for experienced users"
        ],
        "cons": [
          "Expensive",
          "Can be challenging for new users"
        ]
      },
      {
        "marca": "iSpring Suite",
        "sentimiento": 0.85,
        "highlights": [
          "Value for money",
          "Easy PowerPoint conversion"
        ],
        "pros": [
          "Affordable",
          "Ease of use",
          "Comprehensive support"
        ],
        "cons": [
          "Limited advanced features compared to other tools"
        ]
      },
      {
        "marca": "Lectora Inspire",
        "sentimiento": 0.75,
        "highlights": [
          "Good for accessible content"
        ],
        "pros": [
          "Strong accessibility features",
          "Customizable templates"
        ],
        "cons": [
          "Complex interface",
          "Higher price point"
        ]
      },
      {
        "marca": "Camtasia",
        "sentimiento": 0.8,
        "highlights": [
          "Best for video-based content"
        ],
        "pros": [
          "Excellent for screen recording",
          "Easy to use"
        ],
        "cons": [
          "Limited e-learning interactivity",
          "Pricey for its feature set"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/aptD4nI8LUKSnxKW1Tal",
    "_id": "aptD4nI8LUKSnxKW1Tal",
    "_createTime": "2025-06-04T13:55:27.629674Z",
    "_updateTime": "2025-06-04T13:55:27.629674Z",
    "menciona_marca": true,
    "respuesta": null,
    "ia": "ChatGPT",
    "menciona_dominio": true,
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "sentimiento": 0.9,
        "highlights": [
          "Easy to use",
          "Wide range of templates"
        ],
        "pros": [
          "User-friendly interface",
          "Collaborative features",
          "Variety of design elements"
        ],
        "cons": [
          "Limited customization for some templates",
          "Requires internet connection for editing"
        ]
      },
      {
        "marca": "Pitch",
        "sentimiento": 0.8,
        "highlights": [
          "Real-time collaboration",
          "Modern design"
        ],
        "pros": [
          "Innovative designs",
          "Team collaboration features",
          "Integrations with other tools"
        ],
        "cons": [
          "Learning curve for new users",
          "More suited for tech-savvy users"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.7,
        "highlights": [
          "Zooming presentation style"
        ],
        "pros": [
          "Engaging visual styles",
          "Zooming function for presentations",
          "Cloud-based access"
        ],
        "cons": [
          "Can be complex to navigate",
          "May cause motion sickness for some viewers"
        ]
      },
      {
        "marca": "Google Slides",
        "sentimiento": 0.8,
        "highlights": [
          "Integration with Google Workspace"
        ],
        "pros": [
          "Free to use",
          "Easy collaboration",
          "Seamless integration with Google services"
        ],
        "cons": [
          "Limited features compared to specialized tools",
          "Requires Google account"
        ]
      },
      {
        "marca": "PowerPoint",
        "sentimiento": 0.7,
        "highlights": [
          "Widely used"
        ],
        "pros": [
          "Familiar to most users",
          "Rich features",
          "Customizable"
        ],
        "cons": [
          "Can be overwhelming with features",
          "Requires Microsoft Office subscription"
        ]
      }
    ],
    "fecha": "2025-06-04T13:55:15.477Z",
    "query": "modern tools for creating pitch decks"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Z2K7hcroEM0EbDVvLCnZ",
    "_id": "Z2K7hcroEM0EbDVvLCnZ",
    "_createTime": "2025-06-04T13:54:59.712606Z",
    "_updateTime": "2025-06-04T13:54:59.712606Z",
    "menciona_dominio": null,
    "respuesta": null,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Prezi",
        "sentimiento": 0.8,
        "highlights": [
          "Prezi offers a unique zoomable canvas.",
          "Non-linear presentations that engage the audience."
        ],
        "pros": [
          "Dynamic, non-linear approach.",
          "Visually engaging with zoom and pan effects.",
          "Cloud-based, accessible from anywhere."
        ],
        "cons": [
          "Can be challenging for first-time users.",
          "Limited customization compared to traditional slides."
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.75,
        "highlights": [
          "Canva is known for its user-friendly interface and design flexibility."
        ],
        "pros": [
          "Extensive library of templates and graphics.",
          "User-friendly drag-and-drop interface.",
          "Integrates well with images and videos."
        ],
        "cons": [
          "Free version has limited features.",
          "Heavier focus on design, less on presentation dynamics."
        ]
      },
      {
        "marca": "Google Slides",
        "sentimiento": 0.7,
        "highlights": [
          "Collaborative capabilities make Google Slides stand out."
        ],
        "pros": [
          "Easily share and collaborate in real-time.",
          "Integrates smoothly with Google Workspace."
        ],
        "cons": [
          "Less interactive features compared to specialized tools.",
          "Design options are fairly standard."
        ]
      },
      {
        "marca": "Slidebean",
        "sentimiento": 0.65,
        "highlights": [
          "Slidebean aims to automate slide design with AI."
        ],
        "pros": [
          "AI-assisted design for quick creation.",
          "Focus on simplicity and efficiency."
        ],
        "cons": [
          "Limited manual control over design.",
          "Subscription cost can be high for premium features."
        ]
      },
      {
        "marca": "Keynote",
        "sentimiento": 0.68,
        "highlights": [
          "Keynote is Apple's own presentation software, known for its sleek aesthetics."
        ],
        "pros": [
          "High-quality templates and transitions.",
          "Seamlessly integrates within Apple ecosystem."
        ],
        "cons": [
          "Available only on Apple devices.",
          "Less customization for advanced users."
        ]
      }
    ],
    "menciona_marca": true,
    "fecha": "2025-06-04T13:54:43.737Z",
    "query": "interactive presentation alternatives to PowerPoint"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/YOO8PQG2osclqvAwQGtR",
    "_id": "YOO8PQG2osclqvAwQGtR",
    "_createTime": "2025-06-04T13:56:52.857165Z",
    "_updateTime": "2025-06-04T13:56:52.857165Z",
    "menciona_dominio": true,
    "ia": "ChatGPT",
    "menciona_marca": true,
    "marcasMencionadas": [
      {
        "marca": "Articulate 360",
        "sentimiento": 0.9,
        "highlights": [
          "Highly regarded for ease of use and comprehensive tools."
        ],
        "pros": [
          "Intuitive interface",
          "Extensive library of assets",
          "Responsive support"
        ],
        "cons": [
          "Higher cost",
          "Requires advanced features for complex projects"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.7,
        "highlights": [
          "Powerful for creating responsive and immersive content."
        ],
        "pros": [
          "Strong multimedia integration",
          "Advanced interactivity options"
        ],
        "cons": [
          "Steeper learning curve",
          "Occasional performance issues"
        ]
      },
      {
        "marca": "Camtasia",
        "sentimiento": 0.8,
        "highlights": [
          "Great for video-based training content."
        ],
        "pros": [
          "Easy video editing",
          "Good library of effects"
        ],
        "cons": [
          "Less suited for non-video materials",
          "Can be resource-intensive"
        ]
      },
      {
        "marca": "iSpring Suite",
        "sentimiento": 0.75,
        "highlights": [
          "Integrates well with PowerPoint."
        ],
        "pros": [
          "User-friendly",
          "Multiple output formats"
        ],
        "cons": [
          "Limited interactive elements",
          "Basic design options"
        ]
      },
      {
        "marca": "Moodle",
        "sentimiento": 0.65,
        "highlights": [
          "Widely used open-source LMS."
        ],
        "pros": [
          "Highly customizable",
          "Community support"
        ],
        "cons": [
          "Requires technical skills for setup",
          "Interface can be dated"
        ]
      }
    ],
    "respuesta": null,
    "query": "platforms to create interactive training material",
    "fecha": "2025-06-04T13:56:41.898Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Rhab5qlL4RWfQvczSw1G",
    "_id": "Rhab5qlL4RWfQvczSw1G",
    "_createTime": "2025-06-04T13:57:02.667064Z",
    "_updateTime": "2025-06-04T13:57:02.667064Z",
    "fecha": "2025-06-04T13:56:48.151Z",
    "ia": "ChatGPT",
    "menciona_marca": true,
    "respuesta": null,
    "menciona_dominio": null,
    "query": "interactive storytelling platforms for teachers",
    "marcasMencionadas": [
      {
        "marca": "Storybird",
        "sentimiento": 0.8,
        "highlights": [
          "User-friendly interface",
          "Great for visual storytelling"
        ],
        "pros": [
          "Encourages creativity and writing skills",
          "Easy to use for both teachers and students"
        ],
        "cons": [
          "Limited customization options",
          "Some features require a subscription"
        ]
      },
      {
        "marca": "Scratch",
        "sentimiento": 0.9,
        "highlights": [
          "Highly interactive",
          "Engages students in coding through storytelling"
        ],
        "pros": [
          "Free to use",
          "Strong community support",
          "Excellent for teaching basic programming concepts"
        ],
        "cons": [
          "Might require some initial learning curve for beginners",
          "Limited to animations and simple games"
        ]
      },
      {
        "marca": "Boomwriter",
        "sentimiento": 0.7,
        "highlights": [
          "Collaborative writing platform",
          "Students can publish their work"
        ],
        "pros": [
          "Encourages collaborative writing projects",
          "Integrates with Google Classroom"
        ],
        "cons": [
          "Some features are locked behind a paywall",
          "Might not suit all writing curriculums"
        ]
      },
      {
        "marca": "Evernote",
        "sentimiento": 0.6,
        "highlights": [
          "Note-taking with storytelling capabilities",
          "Cross-platform compatibility"
        ],
        "pros": [
          "Good organization tools for stories",
          "Cloud synchronization"
        ],
        "cons": [
          "Premium features require a subscription",
          "Interface can be overwhelming at first"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QltBdB4bBOvw99pXYo9r",
    "_id": "QltBdB4bBOvw99pXYo9r",
    "_createTime": "2025-06-04T13:56:21.331902Z",
    "_updateTime": "2025-06-04T13:56:21.331902Z",
    "fecha": "2025-06-04T13:56:04.189Z",
    "menciona_marca": true,
    "respuesta": null,
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly interface",
          "Wide range of templates"
        ],
        "pros": [
          "Easy to use",
          "Extensive library of elements and templates",
          "Collaborative features"
        ],
        "cons": [
          "Limited customization in the free version"
        ]
      },
      {
        "marca": "Visme",
        "sentimiento": 0.85,
        "highlights": [
          "Versatile design features",
          "Strong presentation capabilities"
        ],
        "pros": [
          "Variety of templates and design assets",
          "Interactive elements",
          "Branding tools"
        ],
        "cons": [
          "Learning curve can be steep for beginners"
        ]
      },
      {
        "marca": "Infogram",
        "sentimiento": 0.8,
        "highlights": [
          "Specialization in data visualization",
          "Live data integration"
        ],
        "pros": [
          "Ease of creating data-driven infographics",
          "Variety of graphs and charts",
          "Real-time updates"
        ],
        "cons": [
          "Advanced features are limited to paid plans"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.75,
        "highlights": [
          "Simplified design process",
          "Focus on storytelling"
        ],
        "pros": [
          "Easy for beginners",
          "Rich selection of templates",
          "Presentation feature"
        ],
        "cons": [
          "Customization may be limited for complex designs"
        ]
      }
    ],
    "query": "interactive infographic creation tools",
    "menciona_dominio": null,
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QZdjSPfD5KM5lyP7ZvfA",
    "_id": "QZdjSPfD5KM5lyP7ZvfA",
    "_createTime": "2025-06-04T13:55:59.907851Z",
    "_updateTime": "2025-06-04T13:55:59.907851Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Adobe Spark",
        "sentimiento": 0.9,
        "highlights": [
          "Versatile tool for creating videos, web pages, and graphics"
        ],
        "pros": [
          "Easy to use",
          "Templates available",
          "Integrates with Adobe Creative Cloud"
        ],
        "cons": [
          "Limited customization options",
          "Requires Adobe account"
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.85,
        "highlights": [
          "Popular for its drag-and-drop interface"
        ],
        "pros": [
          "User-friendly",
          "Extensive template library",
          "Free tier available"
        ],
        "cons": [
          "Some features require paid subscription",
          "Limited offline access"
        ]
      },
      {
        "marca": "StoryMapJS",
        "sentimiento": 0.75,
        "highlights": [
          "Specializes in map-based storytelling"
        ],
        "pros": [
          "Interactive maps",
          "Free to use",
          "Easy integration with media"
        ],
        "cons": [
          "Steeper learning curve",
          "Limited design flexibility"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.8,
        "highlights": [
          "Unique zooming presentation style"
        ],
        "pros": [
          "Visually dynamic presentations",
          "Platform-independent",
          "Collaboration features"
        ],
        "cons": [
          "Can be confusing to new users",
          "Requires stable internet connection"
        ]
      },
      {
        "marca": "Trello",
        "sentimiento": 0.6,
        "highlights": [
          "Organizational tool often used for planning stories"
        ],
        "pros": [
          "Highly customizable",
          "Supports team collaboration",
          "Free version available"
        ],
        "cons": [
          "Not specifically designed for storytelling",
          "Limited advanced features on free plan"
        ]
      }
    ],
    "menciona_marca": true,
    "respuesta": null,
    "menciona_dominio": null,
    "query": "creative tools for digital storytelling",
    "fecha": "2025-06-04T13:55:44.560Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/OZV9kpSCiKF91HGkw114",
    "_id": "OZV9kpSCiKF91HGkw114",
    "_createTime": "2025-06-04T13:54:39.744653Z",
    "_updateTime": "2025-06-04T13:54:39.744653Z",
    "respuesta": null,
    "ia": "ChatGPT",
    "menciona_marca": true,
    "fecha": "2025-06-04T13:54:27.660Z",
    "menciona_dominio": null,
    "query": "platforms to create gamified classroom content",
    "marcasMencionadas": [
      {
        "marca": "Kahoot!",
        "sentimiento": 0.9,
        "highlights": [
          "Popular for quizzes and interactive games"
        ],
        "pros": [
          "Easy to use",
          "Engages students effectively",
          "Variety of game types"
        ],
        "cons": [
          "Limited game customization",
          "Requires internet access"
        ]
      },
      {
        "marca": "Quizizz",
        "sentimiento": 0.85,
        "highlights": [
          "Offers self-paced learning"
        ],
        "pros": [
          "Customizable quizzes",
          "Integration with other tools",
          "Self-paced feature"
        ],
        "cons": [
          "Interface can be overwhelming",
          "Requires student accounts"
        ]
      },
      {
        "marca": "Classcraft",
        "sentimiento": 0.8,
        "highlights": [
          "Focuses on student collaboration and behavior"
        ],
        "pros": [
          "Promotes teamwork",
          "Behavior management features",
          "Custom quests"
        ],
        "cons": [
          "Steep learning curve",
          "May require upgrade for full features"
        ]
      },
      {
        "marca": "Nearpod",
        "sentimiento": 0.78,
        "highlights": [
          "Supports interactive presentations and assessments"
        ],
        "pros": [
          "Interactive features",
          "Embedded formative assessments",
          "360-degree virtual tours"
        ],
        "cons": [
          "Can be resource-heavy",
          "Some features behind paywall"
        ]
      },
      {
        "marca": "Gimkit",
        "sentimiento": 0.82,
        "highlights": [
          "Game-show style quizzes"
        ],
        "pros": [
          "Earns in-game currency",
          "Customizable games",
          "Incentivizes learning"
        ],
        "cons": [
          "Free version is limited",
          "Requires continuous platform updates"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/NexTKbZX9TGy5Mfng0ei",
    "_id": "NexTKbZX9TGy5Mfng0ei",
    "_createTime": "2025-06-04T13:55:36.001613Z",
    "_updateTime": "2025-06-04T13:55:36.001613Z",
    "menciona_marca": true,
    "ia": "ChatGPT",
    "query": "alternatives to Canva for interactive design",
    "menciona_dominio": true,
    "respuesta": null,
    "marcasMencionadas": [
      {
        "marca": "Adobe Spark",
        "sentimiento": 0.8,
        "highlights": [
          "Versatility",
          "Professional templates"
        ],
        "pros": [
          "Wide range of design elements",
          "Integration with Adobe Ecosystem",
          "User-friendly interface"
        ],
        "cons": [
          "Requires Adobe account",
          "Limited free version features"
        ]
      },
      {
        "marca": "Visme",
        "sentimiento": 0.75,
        "highlights": [
          "Interactivity",
          "Ease of use"
        ],
        "pros": [
          "Interactive options",
          "Rich media integration",
          "Templates for various purposes"
        ],
        "cons": [
          "Limited free version",
          "Learning curve for advanced features"
        ]
      },
      {
        "marca": "Figma",
        "sentimiento": 0.9,
        "highlights": [
          "Collaboration",
          "Design flexibility"
        ],
        "pros": [
          "Real-time collaboration",
          "Robust prototyping features",
          "Community support"
        ],
        "cons": [
          "Steeper learning curve for beginners",
          "May require internet connection"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.7,
        "highlights": [
          "Infographic creation",
          "Ease of use"
        ],
        "pros": [
          "Strong infographic capabilities",
          "Intuitive drag-and-drop interface"
        ],
        "cons": [
          "Templates can be limiting",
          "Less suited for comprehensive design projects"
        ]
      },
      {
        "marca": "Crello",
        "sentimiento": 0.65,
        "highlights": [
          "Free starting point",
          "Animated elements"
        ],
        "pros": [
          "Large template library",
          "Accessibility in free version",
          "Animations available"
        ],
        "cons": [
          "Basic features in free plan",
          "Can feel limited compared to more robust tools"
        ]
      }
    ],
    "fecha": "2025-06-04T13:55:22.873Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Gxbi8ys4TeN35JhY4MsU",
    "_id": "Gxbi8ys4TeN35JhY4MsU",
    "_createTime": "2025-06-04T13:56:38.443006Z",
    "_updateTime": "2025-06-04T13:56:38.443006Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Versatile tool for creating interactive eLearning content"
        ],
        "pros": [
          "Supports responsive design",
          "Has interactive elements like quizzes and simulations",
          "Integrates with Adobe Creative Suite"
        ],
        "cons": [
          "High learning curve",
          "Expensive"
        ]
      },
      {
        "marca": "Articulate Storyline",
        "sentimiento": 0.85,
        "highlights": [
          "Popular tool known for ease of use"
        ],
        "pros": [
          "Intuitive interface",
          "Wide range of interactivity options",
          "Strong community support"
        ],
        "cons": [
          "Costly",
          "Limited graphics editing capabilities"
        ]
      },
      {
        "marca": "iSpring Suite",
        "sentimiento": 0.75,
        "highlights": [
          "Integrates with PowerPoint for easy conversion"
        ],
        "pros": [
          "Easy to use for those familiar with PowerPoint",
          "Comprehensive suite with a variety of tools"
        ],
        "cons": [
          "Relies heavily on PowerPoint",
          "Limited advanced features compared to competitors"
        ]
      },
      {
        "marca": "Moodle",
        "sentimiento": 0.9,
        "highlights": [
          "Widely used open-source Learning Management System"
        ],
        "pros": [
          "Highly customizable",
          "Strong community support",
          "Free"
        ],
        "cons": [
          "Can be complex to set up",
          "Requires hosting and server management"
        ]
      },
      {
        "marca": "Lectora Inspire",
        "sentimiento": 0.7,
        "highlights": [
          "Known for strong compliance support"
        ],
        "pros": [
          "Good for creating accessible content",
          "Comprehensive feature set"
        ],
        "cons": [
          "Can be overwhelming for beginners",
          "Expensive compared to some other tools"
        ]
      }
    ],
    "query": "best authoring tools for education",
    "menciona_marca": true,
    "fecha": "2025-06-04T13:56:24.706Z",
    "respuesta": null,
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Fk3Z1GSJpBYiag8nhZzt",
    "_id": "Fk3Z1GSJpBYiag8nhZzt",
    "_createTime": "2025-06-04T13:54:04.564423Z",
    "_updateTime": "2025-06-04T13:54:04.564423Z",
    "menciona_dominio": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:53:51.297Z",
    "query": "best tool for interactive content tool",
    "marcasMencionadas": [
      {
        "marca": "Ceros",
        "sentimiento": 0.85,
        "highlights": [
          "Ceros allows for creation of stunning and highly customizable interactive content."
        ],
        "pros": [
          "User-friendly drag-and-drop interface",
          "No coding required",
          "Highly customizable templates"
        ],
        "cons": [
          "Steeper learning curve for beginners",
          "Cost can be high for small businesses"
        ]
      },
      {
        "marca": "Genially",
        "sentimiento": 0.9,
        "highlights": [
          "Genially offers a broad variety of interactive content types that can be used for education and marketing."
        ],
        "pros": [
          "Wide range of templates",
          "Intuitive interface",
          "Suitable for educators and marketers"
        ],
        "cons": [
          "Limited customization in free version",
          "Can be slow with heavy animations"
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.88,
        "highlights": [
          "Canva offers a wealth of design elements for creating interactive presentations and graphics."
        ],
        "pros": [
          "Extensive library of design elements",
          "Good for beginners",
          "Affordable pricing"
        ],
        "cons": [
          "Limited interactivity compared to dedicated tools",
          "Occasional performance issues with complex projects"
        ]
      },
      {
        "marca": "Adobe Animate",
        "sentimiento": 0.8,
        "highlights": [
          "Adobe Animate is a powerful tool for creating rich interactive animations."
        ],
        "pros": [
          "Powerful animation capabilities",
          "Broad format support",
          "Part of Adobe Creative Cloud integration"
        ],
        "cons": [
          "Requires technical skills",
          "Steep learning curve",
          "Higher cost"
        ]
      },
      {
        "marca": "Visme",
        "sentimiento": 0.83,
        "highlights": [
          "Visme allows users to create engaging and interactive presentations and infographics."
        ],
        "pros": [
          "Variety of templates and design tools",
          "Easy to use",
          "Good for creating professional-looking infographics"
        ],
        "cons": [
          "Some features require a premium subscription",
          "Limited video export options"
        ]
      }
    ],
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/AZsdAQKcePICeUDCS4EK",
    "_id": "AZsdAQKcePICeUDCS4EK",
    "_createTime": "2025-06-04T13:56:29.568711Z",
    "_updateTime": "2025-06-04T13:56:29.568711Z",
    "fecha": "2025-06-04T13:56:16.514Z",
    "marcasMencionadas": [
      {
        "marca": "Google Classroom",
        "sentimiento": 0.8,
        "highlights": [
          "Widely used in schools",
          "Integrates well with Google Workspace"
        ],
        "pros": [
          "User-friendly",
          "Free for educators",
          "Good integration with other Google tools"
        ],
        "cons": [
          "Limited customization",
          "Requires Google account"
        ]
      },
      {
        "marca": "Kahoot!",
        "sentimiento": 0.85,
        "highlights": [
          "Engaging game-based platform",
          "Popular among students"
        ],
        "pros": [
          "Fun and interactive",
          "Easy to use",
          "Free basic version"
        ],
        "cons": [
          "Limited question types",
          "Advanced features require payment"
        ]
      },
      {
        "marca": "Nearpod",
        "sentimiento": 0.75,
        "highlights": [
          "Interactive presentations",
          "Real-time student feedback"
        ],
        "pros": [
          "Interactive features",
          "Integrates with other platforms",
          "Visual engagement"
        ],
        "cons": [
          "Some features are not free",
          "Learning curve for advanced functions"
        ]
      },
      {
        "marca": "Edmodo",
        "sentimiento": 0.7,
        "highlights": [
          "Social media-like interface",
          "Collaboration-friendly"
        ],
        "pros": [
          "Community features",
          "Easy collaboration tools",
          "User-friendly"
        ],
        "cons": [
          "Less feature-rich compared to other platforms",
          "Interface can be cluttered"
        ]
      },
      {
        "marca": "Moodle",
        "sentimiento": 0.6,
        "highlights": [
          "Open-source platform",
          "Highly customizable"
        ],
        "pros": [
          "Customizable",
          "Wide range of plugins",
          "Community support"
        ],
        "cons": [
          "Difficult to set up",
          "Requires more technical knowledge"
        ]
      }
    ],
    "ia": "ChatGPT",
    "query": "how to make interactive lesson plans online",
    "respuesta": null,
    "menciona_dominio": true,
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/9SEOz7DAKF3A1F32xJzS",
    "_id": "9SEOz7DAKF3A1F32xJzS",
    "_createTime": "2025-06-04T13:57:17.305773Z",
    "_updateTime": "2025-06-04T13:57:17.305773Z",
    "marcasMencionadas": [
      {
        "marca": "Articulate 360",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly interface",
          "Powerful features"
        ],
        "pros": [
          "Comprehensive toolkit for course creation",
          "Regular updates and support",
          "Strong community"
        ],
        "cons": [
          "Subscription-based pricing can be expensive",
          "High learning curve for beginners"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Rich multimedia integration",
          "Responsive design capabilities"
        ],
        "pros": [
          "Advanced features for complex courses",
          "Good for responsive projects"
        ],
        "cons": [
          "Steeper learning curve",
          "Price can be a barrier for some users"
        ]
      },
      {
        "marca": "Lectora Online",
        "sentimiento": 0.7,
        "highlights": [
          "Robust features for e-learning",
          "Supports multiple languages"
        ],
        "pros": [
          "Good for creating SCORM-compliant courses",
          "Collaboration tools"
        ],
        "cons": [
          "Interface can be outdated",
          "Less intuitive compared to competitors"
        ]
      },
      {
        "marca": "Elucidat",
        "sentimiento": 0.85,
        "highlights": [
          "Easy for teams to collaborate",
          "Cloud-based platform"
        ],
        "pros": [
          "Great for team collaboration",
          "Easy to create custom themes"
        ],
        "cons": [
          "Pricing may limit small teams",
          "Some advanced features are lacking"
        ]
      },
      {
        "marca": "iSpring Suite",
        "sentimiento": 0.75,
        "highlights": [
          "Integration with PowerPoint",
          "Easy to use"
        ],
        "pros": [
          "Quick learning curve",
          "Comprehensive support and resources"
        ],
        "cons": [
          "Design capabilities are limited",
          "Less suited for complex interactivity"
        ]
      }
    ],
    "fecha": "2025-06-04T13:57:05.567Z",
    "ia": "ChatGPT",
    "menciona_marca": true,
    "respuesta": null,
    "query": "top web-based authoring tools for e-learning",
    "menciona_dominio": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/87vp27QNYamq64ZRgIxB",
    "_id": "87vp27QNYamq64ZRgIxB",
    "_createTime": "2025-06-04T13:56:09.041701Z",
    "_updateTime": "2025-06-04T13:56:09.041701Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Unbounce",
        "sentimiento": 0.8,
        "highlights": [
          "User-friendly interface",
          "Excellent A/B testing features"
        ],
        "pros": [
          "Drag-and-drop builder",
          "Wide range of templates",
          "Integrations with other marketing tools"
        ],
        "cons": [
          "Higher pricing tiers",
          "Some features are complex for beginners"
        ]
      },
      {
        "marca": "Instapage",
        "sentimiento": 0.75,
        "highlights": [
          "Robust personalization capabilities",
          "Effective analytics tools"
        ],
        "pros": [
          "Easy to use",
          "Good CRM integrations",
          "High level of customization"
        ],
        "cons": [
          "Cost can be prohibitive for small businesses",
          "May require third-party tools for full functionality"
        ]
      },
      {
        "marca": "Leadpages",
        "sentimiento": 0.7,
        "highlights": [
          "Affordable for small businesses",
          "Strong conversion tools"
        ],
        "pros": [
          "Wide range of integrations",
          "Responsive support team",
          "Variety of templates"
        ],
        "cons": [
          "Lack advanced features compared to competitors",
          "Some users report slow loading times"
        ]
      },
      {
        "marca": "Webflow",
        "sentimiento": 0.85,
        "highlights": [
          "Highly customizable design",
          "No coding required"
        ],
        "pros": [
          "Professional-grade results",
          "Great for designers",
          "Flexible hosting options"
        ],
        "cons": [
          "Steep learning curve",
          "Limited template options"
        ]
      }
    ],
    "query": "platforms for interactive landing pages",
    "respuesta": null,
    "fecha": "2025-06-04T13:55:55.108Z",
    "menciona_dominio": null,
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/80nYzQ86nOnIKEYfztyS",
    "_id": "80nYzQ86nOnIKEYfztyS",
    "_createTime": "2025-06-04T13:56:46.725298Z",
    "_updateTime": "2025-06-04T13:56:46.725298Z",
    "menciona_marca": true,
    "ia": "ChatGPT",
    "menciona_dominio": true,
    "fecha": "2025-06-04T13:56:33.608Z",
    "marcasMencionadas": [
      {
        "marca": "Genially",
        "sentimiento": 0.8,
        "highlights": [
          "Excelente herramienta para contenido interactivo"
        ],
        "pros": [
          "Interfaz amigable",
          "Gran variedad de plantillas",
          "Integración con otras plataformas"
        ],
        "cons": [
          "Curva de aprendizaje inicial",
          "Algunas funciones solo están disponibles en planes pagos"
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.85,
        "highlights": [
          "Popular entre diseñadores y no-diseñadores"
        ],
        "pros": [
          "Extensa biblioteca de recursos",
          "Fácil de usar",
          "Colaboración en tiempo real"
        ],
        "cons": [
          "Personalización limitada",
          "Funciones avanzadas requieren pago"
        ]
      },
      {
        "marca": "Visme",
        "sentimiento": 0.75,
        "highlights": [
          "Herramienta versátil para presentaciones"
        ],
        "pros": [
          "Soporte para gráficos y visualización de datos",
          "Opciones de animación"
        ],
        "cons": [
          "Requiere suscripción para desbloquear todo el potencial",
          "Puede ser abrumador para nuevos usuarios"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.7,
        "highlights": [
          "Ideal para infografías"
        ],
        "pros": [
          "Fácil creación de infografías",
          "Plantillas profesionales"
        ],
        "cons": [
          "Menos opciones de personalización",
          "Funcionalidades limitadas en el plan gratuito"
        ]
      },
      {
        "marca": "Prezi",
        "sentimiento": 0.65,
        "highlights": [
          "Conocido por presentaciones dinámicas"
        ],
        "pros": [
          "Presentaciones no lineales",
          "Impacto visual"
        ],
        "cons": [
          "Dificultad de uso inicial",
          "Suscripción necesaria para funciones avanzadas"
        ]
      }
    ],
    "respuesta": null,
    "query": "tools like Genially for making visual content"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/04qU5wo02hF6KRKDWf0y",
    "_id": "04qU5wo02hF6KRKDWf0y",
    "_createTime": "2025-06-04T13:55:49.398990Z",
    "_updateTime": "2025-06-04T13:55:49.398990Z",
    "marcasMencionadas": [
      {
        "marca": "Articulate 360",
        "sentimiento": 0.8,
        "highlights": [
          "Well-rounded suite",
          "E-learning leader"
        ],
        "pros": [
          "Comprehensive tools for creating interactive courses",
          "Strong community and support",
          "Integration with various LMS"
        ],
        "cons": [
          "High cost",
          "Steep learning curve for beginners"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "sentimiento": 0.7,
        "highlights": [
          "Powerful multimedia integration"
        ],
        "pros": [
          "Excellent for multimedia-rich content",
          "Responsive design features",
          "Advanced interactivity options"
        ],
        "cons": [
          "Complex for new users",
          "Subscription-based pricing"
        ]
      },
      {
        "marca": "Udemy",
        "sentimiento": 0.6,
        "highlights": [
          "Popular platform for course hosting"
        ],
        "pros": [
          "Wide audience reach",
          "Flexible course creation",
          "Analytics and tracking tools"
        ],
        "cons": [
          "Limited control over pricing",
          "High competition among courses"
        ]
      },
      {
        "marca": "Google Classroom",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly and accessible for educational institutions"
        ],
        "pros": [
          "Free to use",
          "Seamless integration with G Suite tools",
          "Ideal for collaborative learning"
        ],
        "cons": [
          "Limited in advanced LMS features",
          "Depends on Google ecosystem"
        ]
      },
      {
        "marca": "Kahoot!",
        "sentimiento": 0.85,
        "highlights": [
          "Engagement through gamification"
        ],
        "pros": [
          "Highly engaging quizzes and games",
          "Easy to set up and use",
          "Great for live interactive sessions"
        ],
        "cons": [
          "Limited depth in content delivery",
          "Best suited for synchronous activities"
        ]
      }
    ],
    "query": "platforms to build interactive learning modules",
    "ia": "ChatGPT",
    "respuesta": null,
    "fecha": "2025-06-04T13:55:31.148Z",
    "menciona_dominio": null,
    "menciona_marca": true
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
