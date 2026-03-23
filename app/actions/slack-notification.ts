"use server"

import { StrategicReport } from "@/lib/strategic-report-service"

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const DASHBOARD_URL = "https://genially-geo.vercel.app" // Actualiza con tu URL real

export async function sendSlackNotificationAction(report: StrategicReport) {
  try {
    if (!SLACK_WEBHOOK_URL) {
      return {
        success: false,
        error: "SLACK_WEBHOOK_URL no está configurado"
      }
    }

    // Extraer puntos destacados (lo bueno y lo malo)
    const strengths = report.reportContent.clusters
      .flatMap(c => c.strengths.slice(0, 2))
      .slice(0, 5)
      .join("\n• ")

    const weaknesses = report.reportContent.clusters
      .flatMap(c => c.weaknesses.slice(0, 2))
      .slice(0, 5)
      .join("\n• ")

    // Obtener máximo SoV
    const maxSov = Math.max(...report.reportContent.clusters.map(c => c.sov)).toFixed(1)

    // Contar clusters donde SoV > 50%
    const strongClusters = report.reportContent.clusters.filter(c => c.sov > 50).length

    // Construir mensaje Slack
    const message = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📊 Informe Estratégico GEO Actualizado"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Resumen Ejecutivo*\n${report.reportContent.summary.substring(0, 300)}...`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*📈 Share of Voice Máximo*\n${maxSov}%\n(${strongClusters} clusters > 50%)`
            },
            {
              type: "mrkdwn",
              text: `*📅 Datos del Lote*\n${new Date(report.date).toLocaleDateString('es-ES')}`
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*✅ Lo Bueno (Fortalezas)*\n• ${strengths}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*⚠️ Lo Malo (Puntos Ciegos)*\n• ${weaknesses}`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Plan de Optimización: ${report.reportContent.actionPlan.length} acciones estratégicas*`
          }
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Ver Dashboard Completo"
              },
              url: `${DASHBOARD_URL}/`,
              style: "primary"
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Análisis Competitivo"
              },
              url: `${DASHBOARD_URL}/analisis-competidores`
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
      message: "Notificación enviada a Slack exitosamente"
    }
  } catch (error) {
    console.error("Error sending Slack notification:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al enviar a Slack"
    }
  }
}
