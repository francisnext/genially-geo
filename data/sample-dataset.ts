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
export const SAMPLE_DATASET: QueryData[] = 
  [
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/yaq2bBvUwiq4CaO7FcsG",
    "_id": "yaq2bBvUwiq4CaO7FcsG",
    "_createTime": "2025-06-04T13:55:20.325117Z",
    "_updateTime": "2025-06-04T13:55:20.325117Z",
    "fecha": "2025-06-04T13:55:02.177Z",
    "menciona_marca": true,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "cons": [
          "Interface can be overwhelming for beginners",
          "Limited advanced interactivity features"
        ],
        "pros": [
          "Comprehensive animation and transition effects",
          "Broad compatibility and sharing capabilities"
        ],
        "marca": "PowerPoint",
        "sentimiento": 0.8,
        "highlights": [
          "Widely used and easily accessible in Microsoft Office suite"
        ]
      },
      {
        "cons": [
          "Steeper learning curve",
          "Limited offline capabilities"
        ],
        "sentimiento": 0.7,
        "pros": [
          "Visually captivating animations",
          "Non-linear presentation capabilities"
        ],
        "marca": "Prezi",
        "highlights": [
          "Unique zooming presentation style"
        ]
      },
      {
        "pros": [
          "Real-time collaboration features",
          "Cloud storage and accessibility"
        ],
        "cons": [
          "Fewer animation options compared to competitors",
          "Requires internet for full feature access"
        ],
        "highlights": [
          "Integrates well with Google Workspace"
        ],
        "marca": "Google Slides",
        "sentimiento": 0.75
      },
      {
        "cons": [
          "Limited customization for advanced users",
          "Some features require subscription"
        ],
        "marca": "Canva",
        "pros": [
          "Rich template library",
          "Easy-to-use animation tools"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "User-friendly interface with drag-and-drop features"
        ]
      },
      {
        "highlights": [
          "Optimized for Apple devices"
        ],
        "pros": [
          "High-quality animations and graphics",
          "Seamless integration within Apple's ecosystem"
        ],
        "marca": "Keynote",
        "sentimiento": 0.8,
        "cons": [
          "Compatibility issues with non-Apple devices",
          "Limited collaborative features compared to Google Slides"
        ]
      }
    ],
    "menciona_dominio": null,
    "respuesta": null,
    "query": "how to make animated and clickable presentations"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ux3opEUdoMGoORwNxI7G",
    "_id": "ux3opEUdoMGoORwNxI7G",
    "_createTime": "2025-06-04T13:57:10.378798Z",
    "_updateTime": "2025-06-04T13:57:10.378798Z",
    "menciona_dominio": null,
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:56:57.885Z",
    "marcasMencionadas": [
      {
        "pros": [
          "Extensive template library",
          "Collaborative features",
          "Free and premium plans available"
        ],
        "marca": "Canva",
        "cons": [
          "Limited offline capabilities",
          "Some advanced features require a paid subscription"
        ],
        "highlights": [
          "Versatile graphic design tool",
          "User-friendly interface"
        ],
        "sentimiento": 0.9
      },
      {
        "pros": [
          "Drag-and-drop editor",
          "Customizable infographic templates",
          "Brand kit for maintaining consistency"
        ],
        "sentimiento": 0.8,
        "cons": [
          "Learning curve for beginners",
          "Some features behind paywall"
        ],
        "highlights": [
          "Interactive presentation capabilities",
          "Robust data visualization tools"
        ],
        "marca": "Visme"
      },
      {
        "marca": "Adobe Spark",
        "pros": [
          "Professional-looking templates",
          "Easy social media content creation",
          "Mobile and web-based platforms"
        ],
        "highlights": [
          "Part of Adobe Creative Cloud",
          "Seamless integration with other Adobe products"
        ],
        "cons": [
          "Fewer customization options than other Adobe tools",
          "Requires Adobe account, which can be costly"
        ],
        "sentimiento": 0.7
      },
      {
        "sentimiento": 0.75,
        "pros": [
          "User-friendly with drag-and-drop options",
          "Variety of templates available"
        ],
        "marca": "Piktochart",
        "highlights": [
          "Specialized in infographics and data visualization",
          "Simple and clean design"
        ],
        "cons": [
          "Limited free version",
          "Complex charts may require some effort"
        ]
      },
      {
        "highlights": [
          "Dynamic and engaging presentation style",
          "Zoomable presentation canvas"
        ],
        "cons": [
          "A unique format may have a learning curve",
          "Can be expensive for premium features"
        ],
        "sentimiento": 0.6,
        "marca": "Prezi",
        "pros": [
          "Innovative presentation formats",
          "Engaging visual effects"
        ]
      }
    ],
    "respuesta": null,
    "menciona_marca": true,
    "query": "best visual communication tools"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ucT081fNjjGMG3pOkPtJ",
    "_id": "ucT081fNjjGMG3pOkPtJ",
    "_createTime": "2025-06-09T06:16:41.000123Z",
    "_updateTime": "2025-06-09T06:16:41.000123Z",
    "menciona_dominio": null,
    "respuesta": null,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "highlights": [
          "Widely used for creating eLearning content",
          "Supports VR projects"
        ],
        "marca": "Adobe Captivate",
        "cons": [
          "Steeper learning curve",
          "Higher cost"
        ],
        "pros": [
          "Robust features for eLearning",
          "VR and responsive design capabilities"
        ],
        "sentimiento": 0.8
      },
      {
        "sentimiento": 0.85,
        "marca": "Articulate Storyline",
        "pros": [
          "Easy to use",
          "Wide range of features for storytelling"
        ],
        "cons": [
          "Limited customization",
          "Costly subscriptions"
        ],
        "highlights": [
          "Highly intuitive",
          "Great for eLearning courses"
        ]
      },
      {
        "highlights": [
          "Offers interactive visual creations",
          "Templates and animations available"
        ],
        "marca": "Genially",
        "cons": [
          "Lack of advanced features",
          "Limited offline access"
        ],
        "sentimiento": 0.75,
        "pros": [
          "User-friendly interface",
          "Enhances visual content"
        ]
      },
      {
        "cons": [
          "May require technical knowledge",
          "Limited support"
        ],
        "sentimiento": 0.7,
        "marca": "H5P",
        "highlights": [
          "Open-source tool",
          "Community-driven content"
        ],
        "pros": [
          "Free to use",
          "Integrates with LMS platforms"
        ]
      },
      {
        "cons": [
          "Some features locked behind paywall",
          "Uses can be basic"
        ],
        "pros": [
          "Easy to use",
          "Versatile for different types of content"
        ],
        "highlights": [
          "Popular for graphic design",
          "Broad range of templates"
        ],
        "sentimiento": 0.9,
        "marca": "Canva"
      }
    ],
    "menciona_marca": true,
    "fecha": "2025-06-09T06:16:24.849Z",
    "query": "best tool for interactive content tool"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/qWFYASjm2Q4oKBfNVN9n",
    "_id": "qWFYASjm2Q4oKBfNVN9n",
    "_createTime": "2025-06-09T06:19:01.202910Z",
    "_updateTime": "2025-06-09T06:19:01.202910Z",
    "respuesta": null,
    "fecha": "2025-06-09T06:18:47.418Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "highlights": [
          "User-friendly interface",
          "Templates and design elements"
        ],
        "cons": [
          "Limited customization options for advanced designers",
          "Some paid features"
        ],
        "sentimiento": 0.9,
        "pros": [
          "Easy to use",
          "Wide variety of templates",
          "Affordable"
        ]
      },
      {
        "highlights": [
          "Comprehensive suite of design tools",
          "Professional-grade quality"
        ],
        "marca": "Adobe Creative Cloud",
        "cons": [
          "Expensive",
          "Steeper learning curve"
        ],
        "pros": [
          "Extensive toolset",
          "Industry standard",
          "Frequent updates"
        ],
        "sentimiento": 0.8
      },
      {
        "highlights": [
          "Data visualization tools",
          "Presentation capabilities"
        ],
        "cons": [
          "Limited animations",
          "Free version has restrictions"
        ],
        "sentimiento": 0.7,
        "marca": "Visme",
        "pros": [
          "Good for infographics and presentations",
          "Interactive content"
        ]
      },
      {
        "pros": [
          "Engages audience",
          "Unique presentation format"
        ],
        "marca": "Prezi",
        "cons": [
          "Can be complex to use",
          "May cause motion sickness"
        ],
        "sentimiento": 0.75,
        "highlights": [
          "Dynamic presentation style",
          "Non-linear presentations"
        ]
      },
      {
        "sentimiento": 0.7,
        "highlights": [
          "Good for infographic creation",
          "User-friendly"
        ],
        "cons": [
          "Limited design options in free version",
          "Less suitable for complex designs"
        ],
        "marca": "Piktochart",
        "pros": [
          "Easy to use",
          "Good variety of templates for infographics"
        ]
      }
    ],
    "query": "best visual communication tools",
    "menciona_marca": true,
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/oCYKog84oqMw5DqNTZDD",
    "_id": "oCYKog84oqMw5DqNTZDD",
    "_createTime": "2025-06-09T06:18:06.957056Z",
    "_updateTime": "2025-06-09T06:18:06.957056Z",
    "menciona_dominio": null,
    "respuesta": null,
    "marcasMencionadas": [
      {
        "highlights": [
          "Wide range of tools for course creation",
          "User-friendly interface"
        ],
        "marca": "Articulate 360",
        "cons": [
          "Relatively high cost",
          "Steeper learning curve for beginners"
        ],
        "sentimiento": 0.9,
        "pros": [
          "Rapid e-learning authoring",
          "Excellent customer support",
          "Rich multimedia integration"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "highlights": [
          "Supports VR and 360-degree media",
          "Integration with other Adobe products"
        ],
        "pros": [
          "Highly customizable",
          "Robust features for advanced users"
        ],
        "sentimiento": 0.8,
        "cons": [
          "Complex interface for new users",
          "Higher price point"
        ]
      },
      {
        "pros": [
          "Easy to use",
          "Good customer support",
          "Free plan available"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "Great for entrepreneurs and small businesses",
          "Offers marketing and sales tools"
        ],
        "marca": "Thinkific",
        "cons": [
          "Limited customization options",
          "Transaction fees on lower plans"
        ]
      },
      {
        "marca": "iSpring Suite",
        "highlights": [
          "Powerful PowerPoint integration",
          "Comprehensive training tools"
        ],
        "cons": [
          "Less advanced features compared to others",
          "Limited design options"
        ],
        "sentimiento": 0.75,
        "pros": [
          "Easy integration with PowerPoint",
          "Affordable pricing plans"
        ]
      }
    ],
    "menciona_marca": true,
    "query": "platforms to build interactive learning modules",
    "ia": "ChatGPT",
    "fecha": "2025-06-09T06:17:51.692Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/l3eR7fxypvOpf115uZnf",
    "_id": "l3eR7fxypvOpf115uZnf",
    "_createTime": "2025-06-09T06:17:33.510360Z",
    "_updateTime": "2025-06-09T06:17:33.510360Z",
    "fecha": "2025-06-09T06:17:15.253Z",
    "respuesta": null,
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "pros": [
          "Innovative and engaging presentation style.",
          "Great for storytelling and visual effects."
        ],
        "marca": "Prezi",
        "cons": [
          "Can be confusing for first-time users.",
          "Limited offline access."
        ],
        "highlights": [
          "Zooming user interface offers dynamic presentations.",
          "Popular choice for non-linear presentations."
        ]
      },
      {
        "pros": [
          "Accessible for beginners with no design skills.",
          "Extensive library of images and graphics."
        ],
        "highlights": [
          "User-friendly with a wide range of templates.",
          "Drag-and-drop functionality makes it easy to use."
        ],
        "cons": [
          "Some advanced features require a paid subscription.",
          "Limited animation options compared to more specialized tools."
        ],
        "marca": "Canva",
        "sentimiento": 0.9
      },
      {
        "marca": "Google Slides",
        "pros": [
          "Free to use with a Google account.",
          "Excellent for collaborative work."
        ],
        "highlights": [
          "Seamless collaboration in real time.",
          "Integration with other Google Workspace apps."
        ],
        "cons": [
          "Design options are somewhat limited compared to competitors.",
          "Offline functionality requires specific setup."
        ],
        "sentimiento": 0.85
      },
      {
        "sentimiento": 0.75,
        "marca": "Keynote",
        "cons": [
          "Limited compatibility with non-Apple devices.",
          "Less widely used than some other alternatives, which might lead to compatibility issues."
        ],
        "pros": [
          "Optimized for Apple devices.",
          "Offers professional-quality design features."
        ],
        "highlights": [
          "Apple's own presentation software.",
          "High-quality, cinematic transitions and effects."
        ]
      },
      {
        "marca": "Visme",
        "cons": [
          "Some features locked behind paywalls.",
          "User interface can be overwhelming at first."
        ],
        "sentimiento": 0.8,
        "pros": [
          "Versatile tool for more than just presentations.",
          "Includes analytics for understanding viewer engagement."
        ],
        "highlights": [
          "Emphasis on visual content creation.",
          "Tools for building infographics and reports as well."
        ]
      }
    ],
    "ia": "ChatGPT",
    "query": "interactive presentation alternatives to PowerPoint",
    "menciona_dominio": null,
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/jqPnlzqMLlrBP9m4Atcu",
    "_id": "jqPnlzqMLlrBP9m4Atcu",
    "_createTime": "2025-06-04T13:54:32.502145Z",
    "_updateTime": "2025-06-04T13:54:32.502145Z",
    "ia": "ChatGPT",
    "respuesta": null,
    "menciona_marca": true,
    "query": "best tools for interactive learning materials",
    "fecha": "2025-06-04T13:54:14.658Z",
    "menciona_dominio": true,
    "marcasMencionadas": [
      {
        "cons": [
          "Free version has limited features.",
          "May not support in-depth learning."
        ],
        "sentimiento": 0.8,
        "marca": "Kahoot!",
        "highlights": [
          "Widely popular for engaging quizzes and games."
        ],
        "pros": [
          "Interactive and fun for students.",
          "Easy to use interface.",
          "Works across multiple platforms."
        ]
      },
      {
        "pros": [
          "Large library of user-generated content.",
          "Supports different study methods such as flashcards and games.",
          "Easy sharing and collaboration options."
        ],
        "sentimiento": 0.75,
        "marca": "Quizlet",
        "cons": [
          "Subscription required for advanced features.",
          "Content quality can vary due to user-generated nature."
        ],
        "highlights": [
          "Offers a variety of study modes and flashcards."
        ]
      },
      {
        "highlights": [
          "Integrates interactive lessons, videos, and assessments."
        ],
        "sentimiento": 0.85,
        "marca": "Nearpod",
        "cons": [
          "Steeper learning curve for new users.",
          "Advanced features require a paid subscription."
        ],
        "pros": [
          "Strong integration with Google Classroom.",
          "Variety of media and engagement tools.",
          "Real-time functionality for live classes."
        ]
      },
      {
        "marca": "Edmodo",
        "cons": [
          "Interface may seem outdated.",
          "Limited analytical and grading tools."
        ],
        "pros": [
          "Facilitates communication between teachers and students.",
          "Allows for sharing resources and collaboration.",
          "Free for teachers and students."
        ],
        "highlights": [
          "Acts as a social learning platform."
        ],
        "sentimiento": 0.7
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/jaGRjXq7BtyBGsa4xxWy",
    "_id": "jaGRjXq7BtyBGsa4xxWy",
    "_createTime": "2025-06-09T06:17:15.997700Z",
    "_updateTime": "2025-06-09T06:17:15.997700Z",
    "respuesta": null,
    "query": "platforms to create gamified classroom content",
    "marcasMencionadas": [
      {
        "pros": [
          "Easy to use",
          "Engaging for students",
          "Wide range of templates"
        ],
        "sentimiento": 0.8,
        "highlights": [
          "Popular platform for creating interactive quizzes"
        ],
        "marca": "Kahoot!",
        "cons": [
          "Limited customization options",
          "Some features require a paid subscription"
        ]
      },
      {
        "highlights": [
          "Allows for self-paced quizzes"
        ],
        "sentimiento": 0.7,
        "cons": [
          "Interface can be cluttered",
          "Advanced features need a subscription"
        ],
        "pros": [
          "Flexible quiz settings",
          "Integrates with LMS",
          "Good analytics"
        ],
        "marca": "Quizizz"
      },
      {
        "cons": [
          "Steeper learning curve",
          "Can be distracting"
        ],
        "pros": [
          "Highly engaging",
          "Promotes teamwork",
          "Customizable"
        ],
        "highlights": [
          "RPG-style gamification"
        ],
        "sentimiento": 0.75,
        "marca": "Classcraft"
      },
      {
        "highlights": [
          "Interactive lessons"
        ],
        "marca": "Nearpod",
        "cons": [
          "Can be expensive",
          "Requires stable internet connection"
        ],
        "pros": [
          "Interactive multimedia content",
          "Supports real-time assessment",
          "Variety of learning materials"
        ],
        "sentimiento": 0.7
      },
      {
        "pros": [
          "Cuts long videos into segments",
          "Embedded questions",
          "Tracks student progress"
        ],
        "sentimiento": 0.65,
        "marca": "Edpuzzle",
        "highlights": [
          "Video-based lessons"
        ],
        "cons": [
          "Limited free features",
          "Video sourcing can be time-consuming"
        ]
      }
    ],
    "fecha": "2025-06-09T06:17:00.205Z",
    "ia": "ChatGPT",
    "menciona_marca": true,
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/io1XorCLnLKXGKWLQMN2",
    "_id": "io1XorCLnLKXGKWLQMN2",
    "_createTime": "2025-06-09T06:18:12.244880Z",
    "_updateTime": "2025-06-09T06:18:12.244880Z",
    "respuesta": null,
    "fecha": "2025-06-09T06:17:58.573Z",
    "menciona_dominio": null,
    "menciona_marca": true,
    "query": "creative tools for digital storytelling",
    "marcasMencionadas": [
      {
        "marca": "Adobe Creative Cloud",
        "cons": [
          "Expensive",
          "Steep learning curve"
        ],
        "highlights": [
          "Comprehensive suite for digital creation"
        ],
        "sentimiento": 0.8,
        "pros": [
          "Wide range of tools",
          "Industry standard",
          "Regular updates"
        ]
      },
      {
        "marca": "Canva",
        "sentimiento": 0.9,
        "cons": [
          "Limited advanced features",
          "Some designs can feel generic"
        ],
        "highlights": [
          "User-friendly design tool"
        ],
        "pros": [
          "Easy to use",
          "Affordable",
          "Rich template library"
        ]
      },
      {
        "highlights": [
          "Professional video editing for macOS"
        ],
        "cons": [
          "Expensive",
          "Mac-only"
        ],
        "pros": [
          "Powerful editing features",
          "Optimized for Mac"
        ],
        "sentimiento": 0.75,
        "marca": "Final Cut Pro"
      },
      {
        "sentimiento": 0.85,
        "marca": "Blender",
        "highlights": [
          "Open-source 3D creation suite"
        ],
        "pros": [
          "Free and open-source",
          "Extensive features",
          "Active community"
        ],
        "cons": [
          "Can be complex for beginners"
        ]
      },
      {
        "marca": "StoryMapJS",
        "cons": [
          "Limited customization options"
        ],
        "pros": [
          "Free to use",
          "Engaging format",
          "Easy integration"
        ],
        "sentimiento": 0.8,
        "highlights": [
          "Interactive storytelling with maps"
        ]
      }
    ],
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ihP6U8jC2PGIJQMSmceP",
    "_id": "ihP6U8jC2PGIJQMSmceP",
    "_createTime": "2025-06-09T06:18:18.177971Z",
    "_updateTime": "2025-06-09T06:18:18.177971Z",
    "menciona_marca": true,
    "respuesta": null,
    "ia": "ChatGPT",
    "query": "platforms for interactive landing pages",
    "menciona_dominio": null,
    "fecha": "2025-06-09T06:18:03.998Z",
    "marcasMencionadas": [
      {
        "marca": "Unbounce",
        "cons": [
          "Can be expensive for smaller businesses",
          "Limited integrations with some third-party apps"
        ],
        "highlights": [
          "Easy drag-and-drop editor",
          "Extensive template library"
        ],
        "pros": [
          "User-friendly interface",
          "Powerful customization options",
          "A/B testing capabilities"
        ],
        "sentimiento": 0.8
      },
      {
        "marca": "Instapage",
        "sentimiento": 0.75,
        "pros": [
          "Highly customizable templates",
          "Strong analytics tools",
          "Good for team collaboration"
        ],
        "highlights": [
          "Collaboration features",
          "Personalization options"
        ],
        "cons": [
          "Higher cost compared to other platforms",
          "Steeper learning curve for beginners"
        ]
      },
      {
        "sentimiento": 0.7,
        "highlights": [
          "Affordable",
          "Efficient layout builder"
        ],
        "marca": "Leadpages",
        "pros": [
          "Cost-effective for small to medium businesses",
          "Solid integration with marketing tools"
        ],
        "cons": [
          "Limited design flexibility compared to others",
          "Fewer advanced features"
        ]
      },
      {
        "pros": [
          "Highly customizable design",
          "SEO-friendly",
          "Comprehensive CMS"
        ],
        "marca": "Webflow",
        "cons": [
          "Can be complex for beginners",
          "Higher price point"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "Full control over design",
          "CMS capabilities"
        ]
      },
      {
        "highlights": [
          "Integration with WordPress",
          "Large community support"
        ],
        "sentimiento": 0.9,
        "pros": [
          "Extensive free version",
          "Seamless integration with WordPress",
          "Numerous add-ons and themes"
        ],
        "marca": "Elementor",
        "cons": [
          "Performance can be affected with too many plugins",
          "Some features require additional purchases"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/gqxW3RS5F3AzDWUAzs1K",
    "_id": "gqxW3RS5F3AzDWUAzs1K",
    "_createTime": "2025-06-04T13:54:11.465871Z",
    "_updateTime": "2025-06-04T13:54:11.465871Z",
    "ia": "ChatGPT",
    "respuesta": null,
    "query": "best authoring tools",
    "menciona_dominio": true,
    "menciona_marca": true,
    "fecha": "2025-06-04T13:53:59.714Z",
    "marcasMencionadas": [
      {
        "highlights": [
          "Rich feature set",
          "High-quality output"
        ],
        "pros": [
          "Supports responsive design",
          "Integrates with other Adobe products",
          "Comprehensive user support"
        ],
        "marca": "Adobe Captivate",
        "cons": [
          "Steep learning curve",
          "Higher cost compared to other tools"
        ],
        "sentimiento": 0.8
      },
      {
        "cons": [
          "Relatively expensive",
          "Can be slow on large projects"
        ],
        "pros": [
          "Intuitive interface",
          "Strong community support",
          "Wide range of templates"
        ],
        "marca": "Articulate Storyline",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly interface",
          "Powerful capabilities"
        ]
      },
      {
        "cons": [
          "Less intuitive interface",
          "Limited collaborative features"
        ],
        "pros": [
          "Robust interaction capabilities",
          "Good multimedia support"
        ],
        "marca": "Lectora Inspire",
        "sentimiento": 0.7,
        "highlights": [
          "Good for compliance training"
        ]
      },
      {
        "cons": [
          "Not as feature-rich as others",
          "Limited design capabilities"
        ],
        "pros": [
          "Easy to use",
          "Affordable",
          "Integrates well with PowerPoint"
        ],
        "highlights": [
          "PowerPoint integration"
        ],
        "sentimiento": 0.85,
        "marca": "iSpring Suite"
      },
      {
        "highlights": [
          "Great for video tutorials"
        ],
        "marca": "Camtasia",
        "sentimiento": 0.75,
        "pros": [
          "Simple video editing capabilities",
          "Easy to learn"
        ],
        "cons": [
          "Not ideal for complex eLearning courses",
          "Higher price for limited eLearning features"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/g7etQBRZdWh5okdsvfbd",
    "_id": "g7etQBRZdWh5okdsvfbd",
    "_createTime": "2025-06-09T06:17:00.832492Z",
    "_updateTime": "2025-06-09T06:17:00.832492Z",
    "marcasMencionadas": [
      {
        "pros": [
          "Great for creating responsive content",
          "Powerful interaction features",
          "Regular updates"
        ],
        "highlights": [
          "Widely used for eLearning courses",
          "Integrates well with other Adobe products"
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "cons": [
          "Can be expensive",
          "Steep learning curve for beginners"
        ]
      },
      {
        "pros": [
          "Highly intuitive and user-friendly",
          "Rich in interactivity options",
          "Strong community support"
        ],
        "marca": "Articulate Storyline",
        "highlights": [
          "Best suited for interactive courses",
          "Known for ease of use"
        ],
        "sentimiento": 0.85,
        "cons": [
          "Higher price point",
          "Limited advanced programming features"
        ]
      },
      {
        "sentimiento": 0.9,
        "cons": [
          "Limited interactivity compared to other tools",
          "Price can be high for advanced features"
        ],
        "pros": [
          "Easy to use even for beginners",
          "Good video editing features",
          "Frequent updates"
        ],
        "highlights": [
          "Popular for video tutorials and presentations",
          "Simple and effective tool"
        ],
        "marca": "Camtasia"
      },
      {
        "pros": [
          "Good for large teams",
          "Easy to update and manage courses",
          "Responsive output"
        ],
        "cons": [
          "Expensive for small teams",
          "Limited off-the-shelf animations"
        ],
        "marca": "Elucidat",
        "highlights": [
          "Cloud-based authoring tool",
          "Supports collaborative work"
        ],
        "sentimiento": 0.7
      },
      {
        "highlights": [
          "Comprehensive authoring tool",
          "Strong customization options"
        ],
        "marca": "Lectora Inspire",
        "pros": [
          "Flexible and powerful",
          "Great for compliance courses",
          "Strong accessibility support"
        ],
        "sentimiento": 0.75,
        "cons": [
          "Complex for beginners",
          "Higher price range"
        ]
      }
    ],
    "fecha": "2025-06-09T06:16:39.551Z",
    "query": "what is the best authoring tool in terms of quality/price ratio",
    "menciona_marca": true,
    "respuesta": null,
    "ia": "ChatGPT",
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/fyFCgESOTdBqIxHOOPCr",
    "_id": "fyFCgESOTdBqIxHOOPCr",
    "_createTime": "2025-06-09T06:19:06.653412Z",
    "_updateTime": "2025-06-09T06:19:06.653412Z",
    "ia": "ChatGPT",
    "respuesta": null,
    "menciona_marca": true,
    "marcasMencionadas": [
      {
        "cons": [
          "Relatively expensive",
          "Limited flexibility in design"
        ],
        "pros": [
          "User-friendly interface",
          "Wide range of templates",
          "Strong community support"
        ],
        "highlights": [
          "Easy to use",
          "Comprehensive tools suite"
        ],
        "marca": "Articulate 360",
        "sentimiento": 0.8
      },
      {
        "cons": [
          "Steep learning curve",
          "High cost"
        ],
        "pros": [
          "Rich multimedia support",
          "Advanced interactions"
        ],
        "highlights": [
          "Responsive design features",
          "Supports VR learning"
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.7
      },
      {
        "cons": [
          "Complex interface",
          "Limited template library"
        ],
        "highlights": [
          "Robust mobile learning capabilities"
        ],
        "marca": "Lectora Online",
        "pros": [
          "Strong set of assessment tools",
          "Good mobile compatibility"
        ],
        "sentimiento": 0.6
      },
      {
        "pros": [
          "User-friendly",
          "Great for collaboration"
        ],
        "marca": "Elucidat",
        "highlights": [
          "Scalable for large teams",
          "Real-time collaboration"
        ],
        "sentimiento": 0.75,
        "cons": [
          "Limited offline access",
          "Higher price point"
        ]
      },
      {
        "cons": [
          "Limited advanced features",
          "Relies heavily on PowerPoint"
        ],
        "pros": [
          "Easy for beginners",
          "Affordable pricing"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "PowerPoint integration",
          "Accessible and affordable"
        ],
        "marca": "iSpring Suite"
      }
    ],
    "menciona_dominio": true,
    "query": "top web-based authoring tools for e-learning",
    "fecha": "2025-06-09T06:18:52.789Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/eyDcg2ZTDeil1xBH4CBq",
    "_id": "eyDcg2ZTDeil1xBH4CBq",
    "_createTime": "2025-06-09T06:18:37.061461Z",
    "_updateTime": "2025-06-09T06:18:37.061461Z",
    "respuesta": null,
    "menciona_marca": true,
    "marcasMencionadas": [
      {
        "cons": [
          "Expensive for small institutions or individuals.",
          "Limited Mac compatibility."
        ],
        "pros": [
          "Intuitive interface suitable for beginners.",
          "Powerful feature set for creating complex interactions."
        ],
        "highlights": [
          "Robust course creation",
          "Widely used in eLearning"
        ],
        "marca": "Articulate Storyline",
        "sentimiento": 0.9
      },
      {
        "highlights": [
          "Rich media integration",
          "Interactivity"
        ],
        "cons": [
          "Steeper learning curve.",
          "Higher price point."
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "pros": [
          "Comprehensive tool for creating responsive content.",
          "Strong support for VR and interactive videos."
        ]
      },
      {
        "cons": [
          "Not as feature-rich for interactive learning.",
          "Output file size can be large."
        ],
        "highlights": [
          "Screen recording",
          "Video editing"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Excellent tool for creating video tutorials.",
          "User-friendly interface with plenty of features."
        ],
        "marca": "Camtasia"
      },
      {
        "pros": [
          "Highly customizable due to open-source nature.",
          "Wide range of plugins and community support."
        ],
        "highlights": [
          "Open-source",
          "Customizable"
        ],
        "marca": "Moodle",
        "sentimiento": 0.9,
        "cons": [
          "More complex setup process for non-technical users.",
          "Requires hosting and maintenance."
        ]
      },
      {
        "marca": "Google Classroom",
        "highlights": [
          "Integrated with Google services",
          "Easy collaboration"
        ],
        "pros": [
          "Free for educational institutions.",
          "Seamless integration with other Google services."
        ],
        "cons": [
          "Limited customization options.",
          "Dependent on Google ecosystem."
        ],
        "sentimiento": 0.88
      }
    ],
    "fecha": "2025-06-09T06:18:21.682Z",
    "menciona_dominio": null,
    "query": "best authoring tools for education",
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/drYdj64X8T6xAspw6iUr",
    "_id": "drYdj64X8T6xAspw6iUr",
    "_createTime": "2025-06-04T13:54:48.584900Z",
    "_updateTime": "2025-06-04T13:54:48.584900Z",
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:54:34.929Z",
    "menciona_marca": true,
    "query": "tools to build online escape rooms for students",
    "marcasMencionadas": [
      {
        "marca": "Genially",
        "sentimiento": 0.8,
        "cons": [
          "Curva de aprendizaje para nuevos usuarios",
          "Requiere conexión a Internet estable"
        ],
        "highlights": [
          "Interactividad atractiva",
          "Herramientas versátiles"
        ],
        "pros": [
          "Ofrece una amplia gama de opciones de personalización",
          "Integración fácil con materiales educativos"
        ]
      },
      {
        "sentimiento": 0.7,
        "highlights": [
          "Interactividad visual",
          "Fácil de usar"
        ],
        "marca": "Thinglink",
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
        "highlights": [
          "Accesible y gratuito",
          "Fácil de compartir"
        ],
        "cons": [
          "Interactividad limitada",
          "No está diseñado específicamente para escape rooms"
        ],
        "sentimiento": 0.6,
        "pros": [
          "Familiaridad generalizada",
          "Fácil de configurar y usar"
        ]
      },
      {
        "marca": "Escape Room Maker",
        "cons": [
          "Opciones limitadas de personalización",
          "Soporte técnico variable"
        ],
        "pros": [
          "Fácil de usar para estudiantes",
          "Elementos temáticos incorporados"
        ],
        "sentimiento": 0.75,
        "highlights": [
          "Especializado en escape rooms",
          "Interfaz intuitiva"
        ]
      }
    ],
    "menciona_dominio": null,
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/ddRFEcaXiga3dHMXb2Ue",
    "_id": "ddRFEcaXiga3dHMXb2Ue",
    "_createTime": "2025-06-04T13:55:06.902983Z",
    "_updateTime": "2025-06-04T13:55:06.902983Z",
    "menciona_marca": true,
    "fecha": "2025-06-04T13:54:54.897Z",
    "respuesta": null,
    "ia": "ChatGPT",
    "menciona_dominio": null,
    "query": "tools for visual storytelling in education",
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "highlights": [
          "Easy to use",
          "Wide range of templates"
        ],
        "sentimiento": 0.9,
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
        "pros": [
          "High-quality outputs",
          "Integration with other Adobe products"
        ],
        "highlights": [
          "Integration with Adobe ecosystem",
          "Powerful design tools"
        ],
        "marca": "Adobe Spark",
        "sentimiento": 0.85,
        "cons": [
          "Complex for beginners",
          "Requires subscription for full features"
        ]
      },
      {
        "cons": [
          "Steep learning curve",
          "Can be distracting if overused"
        ],
        "sentimiento": 0.75,
        "marca": "Prezi",
        "highlights": [
          "Unique presentation style",
          "Dynamic transitions"
        ],
        "pros": [
          "Interactive designs",
          "Zooming feature"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.8,
        "pros": [
          "Simple to use",
          "Strong infographic features"
        ],
        "cons": [
          "Limited customization",
          "Somewhat costly premium options"
        ],
        "highlights": [
          "Infographic creation",
          "Templates for beginners"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/bJAAzoILl3v8ZfQjlJ12",
    "_id": "bJAAzoILl3v8ZfQjlJ12",
    "_createTime": "2025-06-04T13:54:19.323393Z",
    "_updateTime": "2025-06-04T13:54:19.323393Z",
    "marcasMencionadas": [
      {
        "marca": "Articulate Storyline",
        "highlights": [
          "Widely used",
          "Good for interactive content"
        ],
        "pros": [
          "User-friendly interface",
          "Comprehensive feature set"
        ],
        "sentimiento": 0.8,
        "cons": [
          "High price",
          "Steep learning curve for beginners"
        ]
      },
      {
        "sentimiento": 0.7,
        "pros": [
          "Integration with Adobe ecosystem",
          "Advanced features for experienced users"
        ],
        "highlights": [
          "Trusted brand",
          "Powerful but complex"
        ],
        "marca": "Adobe Captivate",
        "cons": [
          "Expensive",
          "Can be challenging for new users"
        ]
      },
      {
        "pros": [
          "Affordable",
          "Ease of use",
          "Comprehensive support"
        ],
        "cons": [
          "Limited advanced features compared to other tools"
        ],
        "highlights": [
          "Value for money",
          "Easy PowerPoint conversion"
        ],
        "marca": "iSpring Suite",
        "sentimiento": 0.85
      },
      {
        "highlights": [
          "Good for accessible content"
        ],
        "pros": [
          "Strong accessibility features",
          "Customizable templates"
        ],
        "marca": "Lectora Inspire",
        "sentimiento": 0.75,
        "cons": [
          "Complex interface",
          "Higher price point"
        ]
      },
      {
        "sentimiento": 0.8,
        "marca": "Camtasia",
        "highlights": [
          "Best for video-based content"
        ],
        "cons": [
          "Limited e-learning interactivity",
          "Pricey for its feature set"
        ],
        "pros": [
          "Excellent for screen recording",
          "Easy to use"
        ]
      }
    ],
    "ia": "ChatGPT",
    "respuesta": null,
    "menciona_marca": true,
    "fecha": "2025-06-04T13:54:06.708Z",
    "query": "what is the best authoring tool in terms of quality/price ratio",
    "menciona_dominio": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/aptD4nI8LUKSnxKW1Tal",
    "_id": "aptD4nI8LUKSnxKW1Tal",
    "_createTime": "2025-06-04T13:55:27.629674Z",
    "_updateTime": "2025-06-04T13:55:27.629674Z",
    "fecha": "2025-06-04T13:55:15.477Z",
    "menciona_marca": true,
    "menciona_dominio": true,
    "marcasMencionadas": [
      {
        "cons": [
          "Limited customization for some templates",
          "Requires internet connection for editing"
        ],
        "sentimiento": 0.9,
        "pros": [
          "User-friendly interface",
          "Collaborative features",
          "Variety of design elements"
        ],
        "marca": "Canva",
        "highlights": [
          "Easy to use",
          "Wide range of templates"
        ]
      },
      {
        "pros": [
          "Innovative designs",
          "Team collaboration features",
          "Integrations with other tools"
        ],
        "highlights": [
          "Real-time collaboration",
          "Modern design"
        ],
        "sentimiento": 0.8,
        "cons": [
          "Learning curve for new users",
          "More suited for tech-savvy users"
        ],
        "marca": "Pitch"
      },
      {
        "sentimiento": 0.7,
        "pros": [
          "Engaging visual styles",
          "Zooming function for presentations",
          "Cloud-based access"
        ],
        "highlights": [
          "Zooming presentation style"
        ],
        "marca": "Prezi",
        "cons": [
          "Can be complex to navigate",
          "May cause motion sickness for some viewers"
        ]
      },
      {
        "pros": [
          "Free to use",
          "Easy collaboration",
          "Seamless integration with Google services"
        ],
        "highlights": [
          "Integration with Google Workspace"
        ],
        "sentimiento": 0.8,
        "marca": "Google Slides",
        "cons": [
          "Limited features compared to specialized tools",
          "Requires Google account"
        ]
      },
      {
        "sentimiento": 0.7,
        "pros": [
          "Familiar to most users",
          "Rich features",
          "Customizable"
        ],
        "marca": "PowerPoint",
        "highlights": [
          "Widely used"
        ],
        "cons": [
          "Can be overwhelming with features",
          "Requires Microsoft Office subscription"
        ]
      }
    ],
    "query": "modern tools for creating pitch decks",
    "ia": "ChatGPT",
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Z2K7hcroEM0EbDVvLCnZ",
    "_id": "Z2K7hcroEM0EbDVvLCnZ",
    "_createTime": "2025-06-04T13:54:59.712606Z",
    "_updateTime": "2025-06-04T13:54:59.712606Z",
    "query": "interactive presentation alternatives to PowerPoint",
    "menciona_marca": true,
    "menciona_dominio": null,
    "fecha": "2025-06-04T13:54:43.737Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "pros": [
          "Dynamic, non-linear approach.",
          "Visually engaging with zoom and pan effects.",
          "Cloud-based, accessible from anywhere."
        ],
        "cons": [
          "Can be challenging for first-time users.",
          "Limited customization compared to traditional slides."
        ],
        "highlights": [
          "Prezi offers a unique zoomable canvas.",
          "Non-linear presentations that engage the audience."
        ],
        "marca": "Prezi"
      },
      {
        "sentimiento": 0.75,
        "cons": [
          "Free version has limited features.",
          "Heavier focus on design, less on presentation dynamics."
        ],
        "pros": [
          "Extensive library of templates and graphics.",
          "User-friendly drag-and-drop interface.",
          "Integrates well with images and videos."
        ],
        "marca": "Canva",
        "highlights": [
          "Canva is known for its user-friendly interface and design flexibility."
        ]
      },
      {
        "sentimiento": 0.7,
        "cons": [
          "Less interactive features compared to specialized tools.",
          "Design options are fairly standard."
        ],
        "marca": "Google Slides",
        "pros": [
          "Easily share and collaborate in real-time.",
          "Integrates smoothly with Google Workspace."
        ],
        "highlights": [
          "Collaborative capabilities make Google Slides stand out."
        ]
      },
      {
        "pros": [
          "AI-assisted design for quick creation.",
          "Focus on simplicity and efficiency."
        ],
        "marca": "Slidebean",
        "cons": [
          "Limited manual control over design.",
          "Subscription cost can be high for premium features."
        ],
        "highlights": [
          "Slidebean aims to automate slide design with AI."
        ],
        "sentimiento": 0.65
      },
      {
        "pros": [
          "High-quality templates and transitions.",
          "Seamlessly integrates within Apple ecosystem."
        ],
        "cons": [
          "Available only on Apple devices.",
          "Less customization for advanced users."
        ],
        "highlights": [
          "Keynote is Apple's own presentation software, known for its sleek aesthetics."
        ],
        "sentimiento": 0.68,
        "marca": "Keynote"
      }
    ],
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/YfwN1vyUu0zy78WaeqWL",
    "_id": "YfwN1vyUu0zy78WaeqWL",
    "_createTime": "2025-06-09T06:18:55.773658Z",
    "_updateTime": "2025-06-09T06:18:55.773658Z",
    "ia": "ChatGPT",
    "menciona_marca": true,
    "fecha": "2025-06-09T06:18:41.578Z",
    "query": "interactive storytelling platforms for teachers",
    "respuesta": null,
    "menciona_dominio": true,
    "marcasMencionadas": [
      {
        "highlights": [
          "Encourages creativity",
          "User-friendly interface"
        ],
        "sentimiento": 0.8,
        "pros": [
          "Large library of art to inspire stories",
          "Easy for students to use and collaborate"
        ],
        "cons": [
          "Limited customization options",
          "Some features locked behind paywall"
        ],
        "marca": "Storybird"
      },
      {
        "cons": [
          "Steeper learning curve",
          "Requires some understanding of scripting languages"
        ],
        "pros": [
          "Completely free and open-source",
          "Powerful for creating interactive stories"
        ],
        "marca": "Twine",
        "highlights": [
          "Open-source and versatile",
          "Fosters student creativity"
        ],
        "sentimiento": 0.7
      },
      {
        "sentimiento": 0.9,
        "highlights": [
          "Widely accessible",
          "Supports collaboration"
        ],
        "marca": "Google Slides",
        "cons": [
          "Limited storytelling capabilities",
          "Requires internet access for full features"
        ],
        "pros": [
          "Familiar interface for many users",
          "Integrated with other Google tools"
        ]
      },
      {
        "marca": "Adobe Spark",
        "highlights": [
          "Visually appealing results",
          "Easy to use"
        ],
        "pros": [
          "Professional-quality templates",
          "Supports multiple media formats"
        ],
        "sentimiento": 0.85,
        "cons": [
          "Subscription required for full access",
          "Limited support for complex interactions"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/YOO8PQG2osclqvAwQGtR",
    "_id": "YOO8PQG2osclqvAwQGtR",
    "_createTime": "2025-06-04T13:56:52.857165Z",
    "_updateTime": "2025-06-04T13:56:52.857165Z",
    "marcasMencionadas": [
      {
        "highlights": [
          "Highly regarded for ease of use and comprehensive tools."
        ],
        "cons": [
          "Higher cost",
          "Requires advanced features for complex projects"
        ],
        "marca": "Articulate 360",
        "sentimiento": 0.9,
        "pros": [
          "Intuitive interface",
          "Extensive library of assets",
          "Responsive support"
        ]
      },
      {
        "pros": [
          "Strong multimedia integration",
          "Advanced interactivity options"
        ],
        "highlights": [
          "Powerful for creating responsive and immersive content."
        ],
        "cons": [
          "Steeper learning curve",
          "Occasional performance issues"
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.7
      },
      {
        "highlights": [
          "Great for video-based training content."
        ],
        "pros": [
          "Easy video editing",
          "Good library of effects"
        ],
        "marca": "Camtasia",
        "cons": [
          "Less suited for non-video materials",
          "Can be resource-intensive"
        ],
        "sentimiento": 0.8
      },
      {
        "highlights": [
          "Integrates well with PowerPoint."
        ],
        "sentimiento": 0.75,
        "pros": [
          "User-friendly",
          "Multiple output formats"
        ],
        "marca": "iSpring Suite",
        "cons": [
          "Limited interactive elements",
          "Basic design options"
        ]
      },
      {
        "highlights": [
          "Widely used open-source LMS."
        ],
        "marca": "Moodle",
        "pros": [
          "Highly customizable",
          "Community support"
        ],
        "sentimiento": 0.65,
        "cons": [
          "Requires technical skills for setup",
          "Interface can be dated"
        ]
      }
    ],
    "menciona_marca": true,
    "fecha": "2025-06-04T13:56:41.898Z",
    "respuesta": null,
    "query": "platforms to create interactive training material",
    "menciona_dominio": true,
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Rhab5qlL4RWfQvczSw1G",
    "_id": "Rhab5qlL4RWfQvczSw1G",
    "_createTime": "2025-06-04T13:57:02.667064Z",
    "_updateTime": "2025-06-04T13:57:02.667064Z",
    "menciona_dominio": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "respuesta": null,
    "query": "interactive storytelling platforms for teachers",
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "highlights": [
          "User-friendly interface",
          "Great for visual storytelling"
        ],
        "pros": [
          "Encourages creativity and writing skills",
          "Easy to use for both teachers and students"
        ],
        "marca": "Storybird",
        "cons": [
          "Limited customization options",
          "Some features require a subscription"
        ]
      },
      {
        "sentimiento": 0.9,
        "cons": [
          "Might require some initial learning curve for beginners",
          "Limited to animations and simple games"
        ],
        "highlights": [
          "Highly interactive",
          "Engages students in coding through storytelling"
        ],
        "pros": [
          "Free to use",
          "Strong community support",
          "Excellent for teaching basic programming concepts"
        ],
        "marca": "Scratch"
      },
      {
        "marca": "Boomwriter",
        "cons": [
          "Some features are locked behind a paywall",
          "Might not suit all writing curriculums"
        ],
        "sentimiento": 0.7,
        "pros": [
          "Encourages collaborative writing projects",
          "Integrates with Google Classroom"
        ],
        "highlights": [
          "Collaborative writing platform",
          "Students can publish their work"
        ]
      },
      {
        "sentimiento": 0.6,
        "cons": [
          "Premium features require a subscription",
          "Interface can be overwhelming at first"
        ],
        "marca": "Evernote",
        "highlights": [
          "Note-taking with storytelling capabilities",
          "Cross-platform compatibility"
        ],
        "pros": [
          "Good organization tools for stories",
          "Cloud synchronization"
        ]
      }
    ],
    "fecha": "2025-06-04T13:56:48.151Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/RUaAixpOFWzzGE7af893",
    "_id": "RUaAixpOFWzzGE7af893",
    "_createTime": "2025-06-09T06:18:49.973507Z",
    "_updateTime": "2025-06-09T06:18:49.973507Z",
    "respuesta": null,
    "fecha": "2025-06-09T06:18:35.498Z",
    "marcasMencionadas": [
      {
        "highlights": [
          "Flexible and powerful authoring tool"
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "pros": [
          "Wide range of features for creating responsive eLearning content",
          "Strong support for interactive elements"
        ],
        "cons": [
          "Steep learning curve for beginners",
          "Relatively expensive"
        ]
      },
      {
        "pros": [
          "Comprehensive suite of apps",
          "Great community and support",
          "Easy to use for beginners"
        ],
        "highlights": [
          "User-friendly interface and robust toolkit"
        ],
        "cons": [
          "Higher subscription cost",
          "Limited customization options in some templates"
        ],
        "marca": "Articulate 360",
        "sentimiento": 0.9
      },
      {
        "pros": [
          "Easy integration with existing PowerPoint presentations",
          "Useful for simple interactivity"
        ],
        "highlights": [
          "Familiar tool for many users"
        ],
        "marca": "Microsoft PowerPoint with Office Mix",
        "sentimiento": 0.7,
        "cons": [
          "Limited advanced features for interactivity",
          "Requires additional plugins"
        ]
      },
      {
        "marca": "Camtasia",
        "pros": [
          "Simple video editing and screen recording",
          "Good for beginners"
        ],
        "cons": [
          "Limited interactivity features compared to other platforms",
          "Can become slow with large projects"
        ],
        "sentimiento": 0.75,
        "highlights": [
          "Excellent for video-based learning content"
        ]
      },
      {
        "marca": "Elucidat",
        "cons": [
          "Requires an internet connection",
          "Subscription model may not suit small businesses"
        ],
        "highlights": [
          "Cloud-based, collaborative authoring tool"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Great for large teams",
          "Easy to scale and manage content"
        ]
      }
    ],
    "menciona_dominio": null,
    "ia": "ChatGPT",
    "query": "platforms to create interactive training material",
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QltBdB4bBOvw99pXYo9r",
    "_id": "QltBdB4bBOvw99pXYo9r",
    "_createTime": "2025-06-04T13:56:21.331902Z",
    "_updateTime": "2025-06-04T13:56:21.331902Z",
    "menciona_dominio": null,
    "query": "interactive infographic creation tools",
    "menciona_marca": true,
    "respuesta": null,
    "fecha": "2025-06-04T13:56:04.189Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "cons": [
          "Limited customization in the free version"
        ],
        "sentimiento": 0.9,
        "pros": [
          "Easy to use",
          "Extensive library of elements and templates",
          "Collaborative features"
        ],
        "marca": "Canva",
        "highlights": [
          "User-friendly interface",
          "Wide range of templates"
        ]
      },
      {
        "highlights": [
          "Versatile design features",
          "Strong presentation capabilities"
        ],
        "marca": "Visme",
        "cons": [
          "Learning curve can be steep for beginners"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Variety of templates and design assets",
          "Interactive elements",
          "Branding tools"
        ]
      },
      {
        "sentimiento": 0.8,
        "highlights": [
          "Specialization in data visualization",
          "Live data integration"
        ],
        "cons": [
          "Advanced features are limited to paid plans"
        ],
        "pros": [
          "Ease of creating data-driven infographics",
          "Variety of graphs and charts",
          "Real-time updates"
        ],
        "marca": "Infogram"
      },
      {
        "marca": "Piktochart",
        "highlights": [
          "Simplified design process",
          "Focus on storytelling"
        ],
        "sentimiento": 0.75,
        "pros": [
          "Easy for beginners",
          "Rich selection of templates",
          "Presentation feature"
        ],
        "cons": [
          "Customization may be limited for complex designs"
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QjkXb32PAxTSjbNXV8NR",
    "_id": "QjkXb32PAxTSjbNXV8NR",
    "_createTime": "2025-06-09T06:17:08.564633Z",
    "_updateTime": "2025-06-09T06:17:08.564633Z",
    "menciona_dominio": null,
    "query": "best tools for interactive learning materials",
    "marcasMencionadas": [
      {
        "highlights": [
          "Versatile",
          "Feature-rich"
        ],
        "cons": [
          "Expensive",
          "Steep learning curve"
        ],
        "marca": "Adobe Captivate",
        "pros": [
          "Supports responsive design",
          "Integrates multimedia",
          "Good for quizzes and assessments"
        ],
        "sentimiento": 0.8
      },
      {
        "sentimiento": 0.85,
        "cons": [
          "Costly",
          "Limited in flexibility compared to some competitors"
        ],
        "pros": [
          "Intuitive interface",
          "Powerful interactive elements"
        ],
        "marca": "Articulate Storyline",
        "highlights": [
          "User-friendly",
          "Strong community"
        ]
      },
      {
        "highlights": [
          "Open-source",
          "Customizable"
        ],
        "marca": "Moodle",
        "cons": [
          "Requires technical expertise",
          "Interface can be outdated"
        ],
        "pros": [
          "Free",
          "Highly customizable",
          "Large community"
        ],
        "sentimiento": 0.75
      },
      {
        "marca": "Nearpod",
        "cons": [
          "Some features require paid version",
          "Limited offline capabilities"
        ],
        "sentimiento": 0.7,
        "pros": [
          "Interactive presentations",
          "Real-time assessment"
        ],
        "highlights": [
          "Engages students",
          "Integrates with popular tools"
        ]
      },
      {
        "sentimiento": 0.9,
        "marca": "Google Classroom",
        "highlights": [
          "Widely used",
          "Integrates with Google workspace"
        ],
        "pros": [
          "Free",
          "Easy to use",
          "Great for collaboration"
        ],
        "cons": [
          "Limited to Google's ecosystem",
          "Less customizable"
        ]
      }
    ],
    "ia": "ChatGPT",
    "respuesta": null,
    "menciona_marca": true,
    "fecha": "2025-06-09T06:16:52.525Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/QZdjSPfD5KM5lyP7ZvfA",
    "_id": "QZdjSPfD5KM5lyP7ZvfA",
    "_createTime": "2025-06-04T13:55:59.907851Z",
    "_updateTime": "2025-06-04T13:55:59.907851Z",
    "fecha": "2025-06-04T13:55:44.560Z",
    "respuesta": null,
    "menciona_dominio": null,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "sentimiento": 0.9,
        "cons": [
          "Limited customization options",
          "Requires Adobe account"
        ],
        "marca": "Adobe Spark",
        "highlights": [
          "Versatile tool for creating videos, web pages, and graphics"
        ],
        "pros": [
          "Easy to use",
          "Templates available",
          "Integrates with Adobe Creative Cloud"
        ]
      },
      {
        "highlights": [
          "Popular for its drag-and-drop interface"
        ],
        "marca": "Canva",
        "cons": [
          "Some features require paid subscription",
          "Limited offline access"
        ],
        "sentimiento": 0.85,
        "pros": [
          "User-friendly",
          "Extensive template library",
          "Free tier available"
        ]
      },
      {
        "marca": "StoryMapJS",
        "highlights": [
          "Specializes in map-based storytelling"
        ],
        "sentimiento": 0.75,
        "cons": [
          "Steeper learning curve",
          "Limited design flexibility"
        ],
        "pros": [
          "Interactive maps",
          "Free to use",
          "Easy integration with media"
        ]
      },
      {
        "sentimiento": 0.8,
        "pros": [
          "Visually dynamic presentations",
          "Platform-independent",
          "Collaboration features"
        ],
        "highlights": [
          "Unique zooming presentation style"
        ],
        "cons": [
          "Can be confusing to new users",
          "Requires stable internet connection"
        ],
        "marca": "Prezi"
      },
      {
        "marca": "Trello",
        "cons": [
          "Not specifically designed for storytelling",
          "Limited advanced features on free plan"
        ],
        "highlights": [
          "Organizational tool often used for planning stories"
        ],
        "sentimiento": 0.6,
        "pros": [
          "Highly customizable",
          "Supports team collaboration",
          "Free version available"
        ]
      }
    ],
    "menciona_marca": true,
    "query": "creative tools for digital storytelling"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/OZV9kpSCiKF91HGkw114",
    "_id": "OZV9kpSCiKF91HGkw114",
    "_createTime": "2025-06-04T13:54:39.744653Z",
    "_updateTime": "2025-06-04T13:54:39.744653Z",
    "query": "platforms to create gamified classroom content",
    "marcasMencionadas": [
      {
        "sentimiento": 0.9,
        "marca": "Kahoot!",
        "highlights": [
          "Popular for quizzes and interactive games"
        ],
        "cons": [
          "Limited game customization",
          "Requires internet access"
        ],
        "pros": [
          "Easy to use",
          "Engages students effectively",
          "Variety of game types"
        ]
      },
      {
        "highlights": [
          "Offers self-paced learning"
        ],
        "sentimiento": 0.85,
        "marca": "Quizizz",
        "cons": [
          "Interface can be overwhelming",
          "Requires student accounts"
        ],
        "pros": [
          "Customizable quizzes",
          "Integration with other tools",
          "Self-paced feature"
        ]
      },
      {
        "highlights": [
          "Focuses on student collaboration and behavior"
        ],
        "sentimiento": 0.8,
        "marca": "Classcraft",
        "cons": [
          "Steep learning curve",
          "May require upgrade for full features"
        ],
        "pros": [
          "Promotes teamwork",
          "Behavior management features",
          "Custom quests"
        ]
      },
      {
        "cons": [
          "Can be resource-heavy",
          "Some features behind paywall"
        ],
        "pros": [
          "Interactive features",
          "Embedded formative assessments",
          "360-degree virtual tours"
        ],
        "highlights": [
          "Supports interactive presentations and assessments"
        ],
        "marca": "Nearpod",
        "sentimiento": 0.78
      },
      {
        "sentimiento": 0.82,
        "cons": [
          "Free version is limited",
          "Requires continuous platform updates"
        ],
        "marca": "Gimkit",
        "pros": [
          "Earns in-game currency",
          "Customizable games",
          "Incentivizes learning"
        ],
        "highlights": [
          "Game-show style quizzes"
        ]
      }
    ],
    "fecha": "2025-06-04T13:54:27.660Z",
    "menciona_marca": true,
    "respuesta": null,
    "menciona_dominio": null,
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/NexTKbZX9TGy5Mfng0ei",
    "_id": "NexTKbZX9TGy5Mfng0ei",
    "_createTime": "2025-06-04T13:55:36.001613Z",
    "_updateTime": "2025-06-04T13:55:36.001613Z",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "highlights": [
          "Versatility",
          "Professional templates"
        ],
        "cons": [
          "Requires Adobe account",
          "Limited free version features"
        ],
        "marca": "Adobe Spark",
        "pros": [
          "Wide range of design elements",
          "Integration with Adobe Ecosystem",
          "User-friendly interface"
        ]
      },
      {
        "pros": [
          "Interactive options",
          "Rich media integration",
          "Templates for various purposes"
        ],
        "highlights": [
          "Interactivity",
          "Ease of use"
        ],
        "sentimiento": 0.75,
        "marca": "Visme",
        "cons": [
          "Limited free version",
          "Learning curve for advanced features"
        ]
      },
      {
        "pros": [
          "Real-time collaboration",
          "Robust prototyping features",
          "Community support"
        ],
        "sentimiento": 0.9,
        "marca": "Figma",
        "cons": [
          "Steeper learning curve for beginners",
          "May require internet connection"
        ],
        "highlights": [
          "Collaboration",
          "Design flexibility"
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.7,
        "cons": [
          "Templates can be limiting",
          "Less suited for comprehensive design projects"
        ],
        "highlights": [
          "Infographic creation",
          "Ease of use"
        ],
        "pros": [
          "Strong infographic capabilities",
          "Intuitive drag-and-drop interface"
        ]
      },
      {
        "marca": "Crello",
        "pros": [
          "Large template library",
          "Accessibility in free version",
          "Animations available"
        ],
        "cons": [
          "Basic features in free plan",
          "Can feel limited compared to more robust tools"
        ],
        "highlights": [
          "Free starting point",
          "Animated elements"
        ],
        "sentimiento": 0.65
      }
    ],
    "respuesta": null,
    "menciona_dominio": true,
    "query": "alternatives to Canva for interactive design",
    "menciona_marca": true,
    "fecha": "2025-06-04T13:55:22.873Z"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/LdsAV9grLR6uCFUCcaDY",
    "_id": "LdsAV9grLR6uCFUCcaDY",
    "_createTime": "2025-06-09T06:17:39.211563Z",
    "_updateTime": "2025-06-09T06:17:39.211563Z",
    "fecha": "2025-06-09T06:17:25.981Z",
    "ia": "ChatGPT",
    "respuesta": null,
    "menciona_dominio": null,
    "query": "tools for visual storytelling in education",
    "menciona_marca": true,
    "marcasMencionadas": [
      {
        "marca": "Canva",
        "cons": [
          "Limited customization for advanced users",
          "Some features require paid subscription"
        ],
        "highlights": [
          "Intuitive design tools",
          "Wide range of templates"
        ],
        "pros": [
          "User-friendly interface",
          "Affordable premium options"
        ],
        "sentimiento": 0.9
      },
      {
        "sentimiento": 0.85,
        "pros": [
          "High-quality templates",
          "Seamless integration with Adobe products"
        ],
        "marca": "Adobe Spark",
        "cons": [
          "Steep learning curve for beginners",
          "Higher cost for full functionality"
        ],
        "highlights": [
          "Professional design tools",
          "Integration with Adobe suite"
        ]
      },
      {
        "highlights": [
          "Specializes in infographics",
          "Strong analytics tools"
        ],
        "marca": "Piktochart",
        "sentimiento": 0.8,
        "pros": [
          "Variety of infographic options",
          "Easy data visualization"
        ],
        "cons": [
          "Limited free version",
          "Some features can be complex to master"
        ]
      },
      {
        "pros": [
          "Engaging presentation styles",
          "Collaboration features"
        ],
        "highlights": [
          "Dynamic presentations",
          "Unique zoom feature"
        ],
        "sentimiento": 0.75,
        "cons": [
          "Can cause motion sickness",
          "Limited linear presentation options"
        ],
        "marca": "Prezi"
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/LVXG9pX5EifI77E9XozB",
    "_id": "LVXG9pX5EifI77E9XozB",
    "_createTime": "2025-06-09T06:17:45.986533Z",
    "_updateTime": "2025-06-09T06:17:45.986533Z",
    "menciona_dominio": null,
    "respuesta": null,
    "ia": "ChatGPT",
    "fecha": "2025-06-09T06:17:30.824Z",
    "menciona_marca": true,
    "marcasMencionadas": [
      {
        "sentimiento": 0.9,
        "marca": "PowerPoint",
        "cons": [
          "Steeper learning curve for advanced features",
          "Requires a Microsoft 365 subscription"
        ],
        "pros": [
          "Easy to use with pre-made templates",
          "Great animation and transition effects",
          "Embedded multimedia options"
        ],
        "highlights": [
          "Widely used",
          "Integration with Microsoft Office"
        ]
      },
      {
        "cons": [
          "Limited animation options",
          "Requires internet connection"
        ],
        "pros": [
          "Easy to share and collaborate in real-time",
          "Free to use with a Google account",
          "Responsive design"
        ],
        "highlights": [
          "Collaboration features",
          "Cloud-based"
        ],
        "sentimiento": 0.8,
        "marca": "Google Slides"
      },
      {
        "pros": [
          "Non-linear presentation style",
          "Highly engaging visuals",
          "Unique transition effects"
        ],
        "highlights": [
          "Zooming interface",
          "Dynamic presentations"
        ],
        "cons": [
          "Can be difficult to navigate for first-time users",
          "Subscription required for full features"
        ],
        "marca": "Prezi",
        "sentimiento": 0.7
      },
      {
        "cons": [
          "Limited animations compared to other options",
          "Requires premium for certain content"
        ],
        "sentimiento": 0.85,
        "pros": [
          "Extensive template library",
          "Easy drag-and-drop interface",
          "Integrations with multimedia"
        ],
        "marca": "Canva",
        "highlights": [
          "Design-friendly",
          "User-friendly"
        ]
      }
    ],
    "query": "how to make animated and clickable presentations"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/IXlyXnP3rOEpgvQkcON5",
    "_id": "IXlyXnP3rOEpgvQkcON5",
    "_createTime": "2025-06-09T06:16:47.968718Z",
    "_updateTime": "2025-06-09T06:16:47.968718Z",
    "menciona_dominio": null,
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "marca": "Adobe Captivate",
        "pros": [
          "Great for complex projects",
          "Interactive features"
        ],
        "highlights": [
          "Rich multimedia support",
          "Responsive design"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive"
        ]
      },
      {
        "marca": "Articulate Storyline",
        "cons": [
          "Limited Mac support",
          "High cost"
        ],
        "sentimiento": 0.85,
        "pros": [
          "User-friendly",
          "Active community support"
        ],
        "highlights": [
          "Powerful quiz creation",
          "Intuitive interface"
        ]
      },
      {
        "cons": [
          "Outdated interface",
          "Higher learning curve"
        ],
        "pros": [
          "Flexible publishing options",
          "Robust assessment tools"
        ],
        "sentimiento": 0.75,
        "marca": "Lectora Inspire",
        "highlights": [
          "Good for multilingual projects",
          "Integration with Camtasia"
        ]
      },
      {
        "sentimiento": 0.8,
        "highlights": [
          "Seamless PowerPoint integration",
          "Mobile-friendly"
        ],
        "marca": "iSpring Suite",
        "cons": [
          "Less advanced interaction features",
          "Windows-only"
        ],
        "pros": [
          "Affordable pricing",
          "Ease of use"
        ]
      },
      {
        "cons": [
          "Requires subscription",
          "Occasional performance issues"
        ],
        "pros": [
          "Collaborative features",
          "Good for large teams"
        ],
        "sentimiento": 0.7,
        "marca": "Elucidat",
        "highlights": [
          "Cloud-based collaboration",
          "SCORM compliant"
        ]
      }
    ],
    "respuesta": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "fecha": "2025-06-09T06:16:32.580Z",
    "query": "best authoring tools"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/HbugIwLCcbtdPLsM16o7",
    "_id": "HbugIwLCcbtdPLsM16o7",
    "_createTime": "2025-06-09T06:18:43.918758Z",
    "_updateTime": "2025-06-09T06:18:43.918758Z",
    "respuesta": null,
    "fecha": "2025-06-09T06:18:28.646Z",
    "menciona_dominio": true,
    "query": "tools like Genially for making visual content",
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "cons": [
          "Limited free plan",
          "Can be slow at times"
        ],
        "marca": "Genially",
        "highlights": [
          "Popular tool for interactive visual content"
        ],
        "pros": [
          "User-friendly",
          "Interactive features",
          "Collaborative options"
        ],
        "sentimiento": 0.8
      },
      {
        "highlights": [
          "Widely used graphic design platform"
        ],
        "sentimiento": 0.9,
        "cons": [
          "Limited customization options",
          "Some advanced features require payment"
        ],
        "marca": "Canva",
        "pros": [
          "Intuitive interface",
          "Rich template library",
          "Affordable pricing"
        ]
      },
      {
        "sentimiento": 0.75,
        "pros": [
          "Engaging presentation style",
          "Easy to use",
          "Cloud-based"
        ],
        "marca": "Prezi",
        "highlights": [
          "Unique zooming presentation style"
        ],
        "cons": [
          "Steep learning curve",
          "Expensive for premium features"
        ]
      },
      {
        "pros": [
          "Brand integration",
          "Quality output",
          "Mobile app available"
        ],
        "sentimiento": 0.8,
        "highlights": [
          "Part of the Adobe Creative Cloud"
        ],
        "marca": "Adobe Spark",
        "cons": [
          "Basic features are limited in free version",
          "Requires Adobe subscription for full features"
        ]
      },
      {
        "cons": [
          "Limited design flexibility",
          "Some features locked behind a paywall"
        ],
        "pros": [
          "Infographic templates",
          "Data visualization tools",
          "Easy to export"
        ],
        "sentimiento": 0.7,
        "highlights": [
          "Specializes in infographics and reports"
        ],
        "marca": "Piktochart"
      }
    ],
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Gxbi8ys4TeN35JhY4MsU",
    "_id": "Gxbi8ys4TeN35JhY4MsU",
    "_createTime": "2025-06-04T13:56:38.443006Z",
    "_updateTime": "2025-06-04T13:56:38.443006Z",
    "ia": "ChatGPT",
    "query": "best authoring tools for education",
    "fecha": "2025-06-04T13:56:24.706Z",
    "respuesta": null,
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "cons": [
          "High learning curve",
          "Expensive"
        ],
        "pros": [
          "Supports responsive design",
          "Has interactive elements like quizzes and simulations",
          "Integrates with Adobe Creative Suite"
        ],
        "marca": "Adobe Captivate",
        "highlights": [
          "Versatile tool for creating interactive eLearning content"
        ]
      },
      {
        "sentimiento": 0.85,
        "marca": "Articulate Storyline",
        "pros": [
          "Intuitive interface",
          "Wide range of interactivity options",
          "Strong community support"
        ],
        "cons": [
          "Costly",
          "Limited graphics editing capabilities"
        ],
        "highlights": [
          "Popular tool known for ease of use"
        ]
      },
      {
        "cons": [
          "Relies heavily on PowerPoint",
          "Limited advanced features compared to competitors"
        ],
        "marca": "iSpring Suite",
        "sentimiento": 0.75,
        "pros": [
          "Easy to use for those familiar with PowerPoint",
          "Comprehensive suite with a variety of tools"
        ],
        "highlights": [
          "Integrates with PowerPoint for easy conversion"
        ]
      },
      {
        "highlights": [
          "Widely used open-source Learning Management System"
        ],
        "cons": [
          "Can be complex to set up",
          "Requires hosting and server management"
        ],
        "sentimiento": 0.9,
        "marca": "Moodle",
        "pros": [
          "Highly customizable",
          "Strong community support",
          "Free"
        ]
      },
      {
        "sentimiento": 0.7,
        "cons": [
          "Can be overwhelming for beginners",
          "Expensive compared to some other tools"
        ],
        "pros": [
          "Good for creating accessible content",
          "Comprehensive feature set"
        ],
        "highlights": [
          "Known for strong compliance support"
        ],
        "marca": "Lectora Inspire"
      }
    ],
    "menciona_dominio": null,
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/Fk3Z1GSJpBYiag8nhZzt",
    "_id": "Fk3Z1GSJpBYiag8nhZzt",
    "_createTime": "2025-06-04T13:54:04.564423Z",
    "_updateTime": "2025-06-04T13:54:04.564423Z",
    "fecha": "2025-06-04T13:53:51.297Z",
    "menciona_dominio": null,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "cons": [
          "Steeper learning curve for beginners",
          "Cost can be high for small businesses"
        ],
        "marca": "Ceros",
        "highlights": [
          "Ceros allows for creation of stunning and highly customizable interactive content."
        ],
        "pros": [
          "User-friendly drag-and-drop interface",
          "No coding required",
          "Highly customizable templates"
        ],
        "sentimiento": 0.85
      },
      {
        "cons": [
          "Limited customization in free version",
          "Can be slow with heavy animations"
        ],
        "highlights": [
          "Genially offers a broad variety of interactive content types that can be used for education and marketing."
        ],
        "marca": "Genially",
        "pros": [
          "Wide range of templates",
          "Intuitive interface",
          "Suitable for educators and marketers"
        ],
        "sentimiento": 0.9
      },
      {
        "marca": "Canva",
        "pros": [
          "Extensive library of design elements",
          "Good for beginners",
          "Affordable pricing"
        ],
        "sentimiento": 0.88,
        "cons": [
          "Limited interactivity compared to dedicated tools",
          "Occasional performance issues with complex projects"
        ],
        "highlights": [
          "Canva offers a wealth of design elements for creating interactive presentations and graphics."
        ]
      },
      {
        "pros": [
          "Powerful animation capabilities",
          "Broad format support",
          "Part of Adobe Creative Cloud integration"
        ],
        "cons": [
          "Requires technical skills",
          "Steep learning curve",
          "Higher cost"
        ],
        "highlights": [
          "Adobe Animate is a powerful tool for creating rich interactive animations."
        ],
        "sentimiento": 0.8,
        "marca": "Adobe Animate"
      },
      {
        "highlights": [
          "Visme allows users to create engaging and interactive presentations and infographics."
        ],
        "pros": [
          "Variety of templates and design tools",
          "Easy to use",
          "Good for creating professional-looking infographics"
        ],
        "sentimiento": 0.83,
        "marca": "Visme",
        "cons": [
          "Some features require a premium subscription",
          "Limited video export options"
        ]
      }
    ],
    "respuesta": null,
    "menciona_marca": true,
    "query": "best tool for interactive content tool"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/AZsdAQKcePICeUDCS4EK",
    "_id": "AZsdAQKcePICeUDCS4EK",
    "_createTime": "2025-06-04T13:56:29.568711Z",
    "_updateTime": "2025-06-04T13:56:29.568711Z",
    "query": "how to make interactive lesson plans online",
    "respuesta": null,
    "ia": "ChatGPT",
    "marcasMencionadas": [
      {
        "marca": "Google Classroom",
        "pros": [
          "User-friendly",
          "Free for educators",
          "Good integration with other Google tools"
        ],
        "highlights": [
          "Widely used in schools",
          "Integrates well with Google Workspace"
        ],
        "sentimiento": 0.8,
        "cons": [
          "Limited customization",
          "Requires Google account"
        ]
      },
      {
        "marca": "Kahoot!",
        "sentimiento": 0.85,
        "pros": [
          "Fun and interactive",
          "Easy to use",
          "Free basic version"
        ],
        "highlights": [
          "Engaging game-based platform",
          "Popular among students"
        ],
        "cons": [
          "Limited question types",
          "Advanced features require payment"
        ]
      },
      {
        "cons": [
          "Some features are not free",
          "Learning curve for advanced functions"
        ],
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
        ]
      },
      {
        "highlights": [
          "Social media-like interface",
          "Collaboration-friendly"
        ],
        "cons": [
          "Less feature-rich compared to other platforms",
          "Interface can be cluttered"
        ],
        "marca": "Edmodo",
        "pros": [
          "Community features",
          "Easy collaboration tools",
          "User-friendly"
        ],
        "sentimiento": 0.7
      },
      {
        "highlights": [
          "Open-source platform",
          "Highly customizable"
        ],
        "pros": [
          "Customizable",
          "Wide range of plugins",
          "Community support"
        ],
        "sentimiento": 0.6,
        "cons": [
          "Difficult to set up",
          "Requires more technical knowledge"
        ],
        "marca": "Moodle"
      }
    ],
    "menciona_dominio": true,
    "fecha": "2025-06-04T13:56:16.514Z",
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/9SEOz7DAKF3A1F32xJzS",
    "_id": "9SEOz7DAKF3A1F32xJzS",
    "_createTime": "2025-06-04T13:57:17.305773Z",
    "_updateTime": "2025-06-04T13:57:17.305773Z",
    "marcasMencionadas": [
      {
        "sentimiento": 0.9,
        "pros": [
          "Comprehensive toolkit for course creation",
          "Regular updates and support",
          "Strong community"
        ],
        "highlights": [
          "User-friendly interface",
          "Powerful features"
        ],
        "cons": [
          "Subscription-based pricing can be expensive",
          "High learning curve for beginners"
        ],
        "marca": "Articulate 360"
      },
      {
        "cons": [
          "Steeper learning curve",
          "Price can be a barrier for some users"
        ],
        "pros": [
          "Advanced features for complex courses",
          "Good for responsive projects"
        ],
        "marca": "Adobe Captivate",
        "sentimiento": 0.8,
        "highlights": [
          "Rich multimedia integration",
          "Responsive design capabilities"
        ]
      },
      {
        "pros": [
          "Good for creating SCORM-compliant courses",
          "Collaboration tools"
        ],
        "marca": "Lectora Online",
        "cons": [
          "Interface can be outdated",
          "Less intuitive compared to competitors"
        ],
        "highlights": [
          "Robust features for e-learning",
          "Supports multiple languages"
        ],
        "sentimiento": 0.7
      },
      {
        "sentimiento": 0.85,
        "cons": [
          "Pricing may limit small teams",
          "Some advanced features are lacking"
        ],
        "marca": "Elucidat",
        "highlights": [
          "Easy for teams to collaborate",
          "Cloud-based platform"
        ],
        "pros": [
          "Great for team collaboration",
          "Easy to create custom themes"
        ]
      },
      {
        "highlights": [
          "Integration with PowerPoint",
          "Easy to use"
        ],
        "sentimiento": 0.75,
        "pros": [
          "Quick learning curve",
          "Comprehensive support and resources"
        ],
        "marca": "iSpring Suite",
        "cons": [
          "Design capabilities are limited",
          "Less suited for complex interactivity"
        ]
      }
    ],
    "query": "top web-based authoring tools for e-learning",
    "ia": "ChatGPT",
    "respuesta": null,
    "fecha": "2025-06-04T13:57:05.567Z",
    "menciona_marca": true,
    "menciona_dominio": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/87vp27QNYamq64ZRgIxB",
    "_id": "87vp27QNYamq64ZRgIxB",
    "_createTime": "2025-06-04T13:56:09.041701Z",
    "_updateTime": "2025-06-04T13:56:09.041701Z",
    "menciona_dominio": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "fecha": "2025-06-04T13:55:55.108Z",
    "query": "platforms for interactive landing pages",
    "marcasMencionadas": [
      {
        "marca": "Unbounce",
        "highlights": [
          "User-friendly interface",
          "Excellent A/B testing features"
        ],
        "sentimiento": 0.8,
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
        "cons": [
          "Cost can be prohibitive for small businesses",
          "May require third-party tools for full functionality"
        ],
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
        ]
      },
      {
        "pros": [
          "Wide range of integrations",
          "Responsive support team",
          "Variety of templates"
        ],
        "cons": [
          "Lack advanced features compared to competitors",
          "Some users report slow loading times"
        ],
        "sentimiento": 0.7,
        "marca": "Leadpages",
        "highlights": [
          "Affordable for small businesses",
          "Strong conversion tools"
        ]
      },
      {
        "pros": [
          "Professional-grade results",
          "Great for designers",
          "Flexible hosting options"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "Highly customizable design",
          "No coding required"
        ],
        "cons": [
          "Steep learning curve",
          "Limited template options"
        ],
        "marca": "Webflow"
      }
    ],
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/80nYzQ86nOnIKEYfztyS",
    "_id": "80nYzQ86nOnIKEYfztyS",
    "_createTime": "2025-06-04T13:56:46.725298Z",
    "_updateTime": "2025-06-04T13:56:46.725298Z",
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "cons": [
          "Curva de aprendizaje inicial",
          "Algunas funciones solo están disponibles en planes pagos"
        ],
        "marca": "Genially",
        "highlights": [
          "Excelente herramienta para contenido interactivo"
        ],
        "pros": [
          "Interfaz amigable",
          "Gran variedad de plantillas",
          "Integración con otras plataformas"
        ]
      },
      {
        "cons": [
          "Personalización limitada",
          "Funciones avanzadas requieren pago"
        ],
        "marca": "Canva",
        "sentimiento": 0.85,
        "highlights": [
          "Popular entre diseñadores y no-diseñadores"
        ],
        "pros": [
          "Extensa biblioteca de recursos",
          "Fácil de usar",
          "Colaboración en tiempo real"
        ]
      },
      {
        "marca": "Visme",
        "pros": [
          "Soporte para gráficos y visualización de datos",
          "Opciones de animación"
        ],
        "cons": [
          "Requiere suscripción para desbloquear todo el potencial",
          "Puede ser abrumador para nuevos usuarios"
        ],
        "highlights": [
          "Herramienta versátil para presentaciones"
        ],
        "sentimiento": 0.75
      },
      {
        "pros": [
          "Fácil creación de infografías",
          "Plantillas profesionales"
        ],
        "highlights": [
          "Ideal para infografías"
        ],
        "sentimiento": 0.7,
        "marca": "Piktochart",
        "cons": [
          "Menos opciones de personalización",
          "Funcionalidades limitadas en el plan gratuito"
        ]
      },
      {
        "pros": [
          "Presentaciones no lineales",
          "Impacto visual"
        ],
        "marca": "Prezi",
        "cons": [
          "Dificultad de uso inicial",
          "Suscripción necesaria para funciones avanzadas"
        ],
        "highlights": [
          "Conocido por presentaciones dinámicas"
        ],
        "sentimiento": 0.65
      }
    ],
    "ia": "ChatGPT",
    "menciona_dominio": true,
    "query": "tools like Genially for making visual content",
    "respuesta": null,
    "fecha": "2025-06-04T13:56:33.608Z",
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/5oohFLv2x33S1sxUR9Tk",
    "_id": "5oohFLv2x33S1sxUR9Tk",
    "_createTime": "2025-06-09T06:18:23.844634Z",
    "_updateTime": "2025-06-09T06:18:23.844634Z",
    "fecha": "2025-06-09T06:18:09.837Z",
    "ia": "ChatGPT",
    "menciona_marca": true,
    "menciona_dominio": null,
    "marcasMencionadas": [
      {
        "cons": [
          "Limited free version",
          "Requires internet connection"
        ],
        "marca": "Visme",
        "sentimiento": 0.8,
        "highlights": [
          "User-friendly interface",
          "Wide range of templates"
        ],
        "pros": [
          "Easy to use",
          "Collaboration features",
          "Customizable templates"
        ]
      },
      {
        "highlights": [
          "Popular for beginners",
          "Extensive resource library"
        ],
        "pros": [
          "Free version available",
          "Intuitive design",
          "Many templates"
        ],
        "cons": [
          "Advanced features are paid",
          "Limited offline access"
        ],
        "marca": "Canva",
        "sentimiento": 0.9
      },
      {
        "sentimiento": 0.75,
        "marca": "Piktochart",
        "highlights": [
          "Focus on infographics"
        ],
        "cons": [
          "Limited flexibility",
          "Subscription-based model"
        ],
        "pros": [
          "Specialized in infographics",
          "Good customer support"
        ]
      },
      {
        "pros": [
          "Strong in data visualization",
          "Interactive charts"
        ],
        "highlights": [
          "Great for data visualization"
        ],
        "cons": [
          "Requires learning curve for new users",
          "Limited design options"
        ],
        "marca": "Infogram",
        "sentimiento": 0.7
      },
      {
        "pros": [
          "Collaboration tools",
          "Extensive template library"
        ],
        "sentimiento": 0.65,
        "marca": "Venngage",
        "highlights": [
          "Team collaboration features"
        ],
        "cons": [
          "Paid plans are pricey",
          "Somewhat generic designs"
        ]
      }
    ],
    "respuesta": null,
    "query": "interactive infographic creation tools"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/3QK2RtgC54JI2LrA5cqE",
    "_id": "3QK2RtgC54JI2LrA5cqE",
    "_createTime": "2025-06-09T06:18:30.091744Z",
    "_updateTime": "2025-06-09T06:18:30.091744Z",
    "fecha": "2025-06-09T06:18:15.564Z",
    "marcasMencionadas": [
      {
        "cons": [
          "Opciones de diseño limitadas",
          "Requiere conexión a internet"
        ],
        "sentimiento": 0.8,
        "pros": [
          "Interfaz intuitiva",
          "Integración con otras herramientas de Google"
        ],
        "marca": "Google Slides",
        "highlights": [
          "Fácil de usar",
          "Compatible con Google Classroom"
        ]
      },
      {
        "pros": [
          "Amplias opciones de diseño",
          "Posibilidad de usar sin conexión"
        ],
        "marca": "Microsoft PowerPoint",
        "cons": [
          "Requiere instalación de software",
          "Curva de aprendizaje más pronunciada"
        ],
        "highlights": [
          "Herramienta conocida",
          "Funcionalidades avanzadas"
        ],
        "sentimiento": 0.75
      },
      {
        "marca": "Nearpod",
        "cons": [
          "Puede ser costoso",
          "Requiere registro de usuarios"
        ],
        "pros": [
          "Gran interacción",
          "Funciones de evaluación integradas"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "Interactividad avanzada",
          "Feedback en tiempo real"
        ]
      },
      {
        "marca": "Kahoot!",
        "cons": [
          "Enfocado principalmente en cuestionarios",
          "Puede distraer de otros contenidos"
        ],
        "pros": [
          "Aumenta la participación estudiantil",
          "Fácil de configurar y usar"
        ],
        "sentimiento": 0.9,
        "highlights": [
          "Aprendizaje basado en juegos",
          "Facilita la participación"
        ]
      }
    ],
    "menciona_marca": true,
    "ia": "ChatGPT",
    "query": "how to make interactive lesson plans online",
    "menciona_dominio": null,
    "respuesta": null
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/1rPR3hjn1R4teN2PD7W9",
    "_id": "1rPR3hjn1R4teN2PD7W9",
    "_createTime": "2025-06-09T06:17:52.914362Z",
    "_updateTime": "2025-06-09T06:17:52.914362Z",
    "respuesta": null,
    "menciona_dominio": null,
    "ia": "ChatGPT",
    "query": "modern tools for creating pitch decks",
    "marcasMencionadas": [
      {
        "highlights": [
          "Easy to use",
          "Wide range of templates"
        ],
        "pros": [
          "User-friendly interface",
          "Collaborative features",
          "Affordable"
        ],
        "cons": [
          "Limited customization options",
          "Requires internet connection"
        ],
        "sentimiento": 0.9,
        "marca": "Canva"
      },
      {
        "marca": "Pitch",
        "cons": [
          "Requires learning curve",
          "Subscription-based"
        ],
        "sentimiento": 0.85,
        "highlights": [
          "Collaborative features",
          "Real-time editing"
        ],
        "pros": [
          "Strong collaboration features",
          "Modern templates",
          "Integrates with other tools"
        ]
      },
      {
        "highlights": [
          "Industry standard",
          "High customization"
        ],
        "marca": "PowerPoint",
        "cons": [
          "Complex for beginners",
          "Can be expensive without subscription"
        ],
        "sentimiento": 0.75,
        "pros": [
          "Wide range of functionalities",
          "High level of customization",
          "Widely used"
        ]
      },
      {
        "cons": [
          "Limited design options",
          "Requires Google account"
        ],
        "marca": "Google Slides",
        "highlights": [
          "Cloud integration",
          "Easy collaboration"
        ],
        "sentimiento": 0.8,
        "pros": [
          "Free to use",
          "Easy collaboration",
          "Accessible anywhere"
        ]
      },
      {
        "cons": [
          "Steeper learning curve",
          "Not suitable for all presentation types"
        ],
        "marca": "Prezi",
        "highlights": [
          "Unique presentation style",
          "Dynamic transitions"
        ],
        "pros": [
          "Engaging presentation style",
          "Dynamic and memorable"
        ],
        "sentimiento": 0.7
      }
    ],
    "fecha": "2025-06-09T06:17:37.678Z",
    "menciona_marca": true
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/0okBLYAtSdTAGvP8sITl",
    "_id": "0okBLYAtSdTAGvP8sITl",
    "_createTime": "2025-06-09T06:18:00.113113Z",
    "_updateTime": "2025-06-09T06:18:00.113113Z",
    "fecha": "2025-06-09T06:17:44.503Z",
    "respuesta": null,
    "menciona_marca": true,
    "ia": "ChatGPT",
    "menciona_dominio": null,
    "query": "alternatives to Canva for interactive design",
    "marcasMencionadas": [
      {
        "pros": [
          "Amplias opciones de personalización.",
          "Integración con otras herramientas de Adobe."
        ],
        "sentimiento": 0.8,
        "cons": [
          "Requiere una suscripción a Adobe.",
          "Puede tener una curva de aprendizaje pronunciada para principiantes."
        ],
        "marca": "Adobe Spark",
        "highlights": [
          "Adobe Spark ofrece una experiencia de diseño accesible y poderosa."
        ]
      },
      {
        "highlights": [
          "Visme es robusto y fácil de usar para crear contenido interactivo."
        ],
        "sentimiento": 0.75,
        "cons": [
          "La versión gratuita tiene limitaciones notables.",
          "Puede ser más lenta en cargarse debido a funciones avanzadas."
        ],
        "pros": [
          "Buena funcionalidad para presentaciones interactivas.",
          "Gran colección de plantillas."
        ],
        "marca": "Visme"
      },
      {
        "marca": "Figma",
        "cons": [
          "Puede ser menos intuitivo para usuarios sin experiencia previa en diseño.",
          "Opciones avanzadas pueden ser abrumadoras para principiantes."
        ],
        "highlights": [
          "Figma es ideal para la colaboración y el diseño basado en la web."
        ],
        "sentimiento": 0.85,
        "pros": [
          "Excelentes características de colaboración en tiempo real.",
          "Funciona en la nube, facilitando el acceso desde cualquier dispositivo."
        ]
      },
      {
        "marca": "InVision",
        "sentimiento": 0.7,
        "pros": [
          "Interactividad avanzada para prototipos.",
          "Herramientas de colaboración útiles."
        ],
        "cons": [
          "Los planes premium pueden ser costosos.",
          "Puede requerir un tiempo para aprender a utilizar todas sus funcionalidades eficientemente."
        ],
        "highlights": [
          "InVision proporciona una fuerte plataforma de prototipado."
        ]
      },
      {
        "marca": "Piktochart",
        "sentimiento": 0.72,
        "cons": [
          "Opciones de personalización más limitadas.",
          "Las funciones avanzadas están reservadas para cuentas premium."
        ],
        "pros": [
          "Fácil de usar, ideal para principiantes.",
          "Buena selección de plantillas y gráficos."
        ],
        "highlights": [
          "Piktochart simplifica la creación de contenido visual atractivo."
        ]
      }
    ]
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/0TQlOvNwWqRrtIOqymCb",
    "_id": "0TQlOvNwWqRrtIOqymCb",
    "_createTime": "2025-06-09T06:17:23.640412Z",
    "_updateTime": "2025-06-09T06:17:23.640412Z",
    "query": "tools to build online escape rooms for students",
    "fecha": "2025-06-09T06:17:07.596Z",
    "marcasMencionadas": [
      {
        "marca": "Genially",
        "cons": [
          "Curva de aprendizaje para funciones avanzadas",
          "Opciones limitadas en la versión gratuita"
        ],
        "sentimiento": 0.8,
        "pros": [
          "Interfaz intuitiva",
          "Amplias opciones de personalización",
          "Facilidad de integración con otros medios digitales"
        ],
        "highlights": [
          "herramienta visualmente atractiva",
          "facilidad de uso para crear contenido interactivo"
        ]
      },
      {
        "cons": [
          "Funcionalidades limitadas para personalización",
          "Menos adecuado para experiencias visuales e interactivas"
        ],
        "marca": "Google Forms",
        "pros": [
          "Gratuito con una cuenta de Google",
          "Fácil de compartir y colaborar",
          "Integración sencilla con otros servicios de Google"
        ],
        "highlights": [
          "amplia accesibilidad y facilidad de uso",
          "buena para acertijos basados en texto"
        ],
        "sentimiento": 0.7
      },
      {
        "cons": [
          "Requiere una cierta adaptación al ecosistema de Microsoft",
          "Interfaz puede ser abrumadora para nuevos usuarios"
        ],
        "marca": "Microsoft OneNote",
        "sentimiento": 0.6,
        "pros": [
          "Plataforma robusta para organización de contenido",
          "Gratis con una cuenta de Microsoft",
          "Soporte para multimedia"
        ],
        "highlights": [
          "útil para estructuras de pistas y colaboración",
          "flexible para múltiples formatos de contenido"
        ]
      },
      {
        "pros": [
          "Especializado en el desarrollo de escape rooms",
          "Herramientas integradas para pistas y desafíos"
        ],
        "sentimiento": 0.75,
        "highlights": [
          "plataforma especializada en escape rooms",
          "permite a los usuarios crear juegos con facilidad"
        ],
        "marca": "Escape Room Maker",
        "cons": [
          "Limitaciones en personalización fuera del marco establecido",
          "Puede requerir suscripción para características completas"
        ]
      }
    ],
    "menciona_dominio": null,
    "menciona_marca": true,
    "respuesta": null,
    "ia": "ChatGPT"
  },
  {
    "_name": "projects/genially-geo-461306/databases/(default)/documents/queries/04qU5wo02hF6KRKDWf0y",
    "_id": "04qU5wo02hF6KRKDWf0y",
    "_createTime": "2025-06-04T13:55:49.398990Z",
    "_updateTime": "2025-06-04T13:55:49.398990Z",
    "respuesta": null,
    "fecha": "2025-06-04T13:55:31.148Z",
    "query": "platforms to build interactive learning modules",
    "menciona_dominio": null,
    "marcasMencionadas": [
      {
        "sentimiento": 0.8,
        "pros": [
          "Comprehensive tools for creating interactive courses",
          "Strong community and support",
          "Integration with various LMS"
        ],
        "highlights": [
          "Well-rounded suite",
          "E-learning leader"
        ],
        "marca": "Articulate 360",
        "cons": [
          "High cost",
          "Steep learning curve for beginners"
        ]
      },
      {
        "marca": "Adobe Captivate",
        "cons": [
          "Complex for new users",
          "Subscription-based pricing"
        ],
        "pros": [
          "Excellent for multimedia-rich content",
          "Responsive design features",
          "Advanced interactivity options"
        ],
        "sentimiento": 0.7,
        "highlights": [
          "Powerful multimedia integration"
        ]
      },
      {
        "cons": [
          "Limited control over pricing",
          "High competition among courses"
        ],
        "pros": [
          "Wide audience reach",
          "Flexible course creation",
          "Analytics and tracking tools"
        ],
        "sentimiento": 0.6,
        "highlights": [
          "Popular platform for course hosting"
        ],
        "marca": "Udemy"
      },
      {
        "pros": [
          "Free to use",
          "Seamless integration with G Suite tools",
          "Ideal for collaborative learning"
        ],
        "marca": "Google Classroom",
        "sentimiento": 0.9,
        "highlights": [
          "User-friendly and accessible for educational institutions"
        ],
        "cons": [
          "Limited in advanced LMS features",
          "Depends on Google ecosystem"
        ]
      },
      {
        "highlights": [
          "Engagement through gamification"
        ],
        "marca": "Kahoot!",
        "cons": [
          "Limited depth in content delivery",
          "Best suited for synchronous activities"
        ],
        "pros": [
          "Highly engaging quizzes and games",
          "Easy to set up and use",
          "Great for live interactive sessions"
        ],
        "sentimiento": 0.85
      }
    ],
    "ia": "ChatGPT",
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
