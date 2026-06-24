"use server"

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const DASHBOARD_URL = "https://genially-geo.vercel.app"

export async function sendSlackAnnouncementAction() {
  try {
    if (!SLACK_WEBHOOK_URL) {
      return {
        success: false,
        error: "SLACK_WEBHOOK_URL no está configurado"
      }
    }
    const message = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🚀 Nueva Automatización: Informes Estratégicos Quincenales"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hola Luis,\n\nTe aviso de una nueva funcionalidad que acabo de implementar en nuestro sistema GEO Intelligence:"
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*📊 Informes Estratégicos Automáticos*\n\nA partir de ahora, cada 2 semanas recibirás automáticamente un resumen ejecutivo con:\n\n✅ *Lo Bueno* - Nuestras fortalezas principales\n⚠️ *Lo Malo* - Puntos ciegos y oportunidades de mejora\n📈 *Métricas Clave* - Share of Voice máximo y clusters destacados\n🎯 *Plan de Acción* - Recomendaciones estratégicas prioritarias"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*¿Por qué cada 2 semanas?*\n\nEste ciclo nos permite:\n• Monitorear tendencias sin ruido diario\n• Tomar decisiones informadas en base a datos consolidados\n• Enfocarnos en lo que realmente importa para la estrategia GEO"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*¿Qué puedes hacer?*\n\n1️⃣ Recibir automáticamente los informes cada quincena\n2️⃣ Acceder al dashboard completo en cualquier momento\n3️⃣ Solicitar análisis adicionales bajo demanda"
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "El primer informe se enviará próximamente. Permanece atento a este canal 👀"
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Ver Dashboard GEO"
              },
              url: `${DASHBOARD_URL}/debilidades-oportunidades`,
              style: "primary"
            }
          ]
        }
      ]
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`)
    }

    return {
      success: true,
      message: "Anuncio enviado a Slack exitosamente"
    }
  } catch (error) {
    console.error("Error sending Slack announcement:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
