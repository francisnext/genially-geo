"use server"

import { StrategicReport } from "@/lib/geo/strategic-report-service"

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const DASHBOARD_URL = "https://genially-geo.vercel.app"

export async function sendSlackNotificationAction(report: StrategicReport) {
  try {
    if (!SLACK_WEBHOOK_URL) {
      return { success: false, error: "SLACK_WEBHOOK_URL no está configurado" }
    }

    const clusters = report.reportContent.clusters
    const actionPlan = report.reportContent.actionPlan

    // Métricas globales
    const avgSov = (clusters.reduce((a: any, c: any) => a + c.sov, 0) / clusters.length).toFixed(1)
    const maxSovCluster = clusters.reduce((a, b) => a.sov > b.sov ? a : b)
    const minSovCluster = clusters.reduce((a, b) => a.sov < b.sov ? a : b)
    const avgSentiment = (clusters.reduce((a: any, c: any) => a + c.sentiment, 0) / clusters.length * 10).toFixed(1)
    const strongClusters = clusters.filter(c => c.sov > 50).length

    // Top 3 clusters ordenados por SoV
    const topClusters = [...clusters].sort((a, b) => b.sov - a.sov).slice(0, 4)

    const clusterLines = topClusters.map(c => {
      const sovBar = c.sov >= 66 ? "🟢" : c.sov >= 33 ? "🟡" : "🔴"
      const sentEmoji = c.sentiment > 0.5 ? "😊" : c.sentiment < 0 ? "😟" : "😐"
      return `${sovBar} *${c.name}* — SoV: ${c.sov.toFixed(1)}% | Sent: ${sentEmoji} ${(c.sentiment * 10).toFixed(1)}/10`
    }).join("\n")

    // Acciones prioritarias (High first, max 3)
    const urgentActions = [...actionPlan]
      .sort((a, b) => (a.priority === "High" ? -1 : b.priority === "High" ? 1 : 0))
      .slice(0, 3)
      .map((a) => {
        const p = a.priority === "High" ? "🔥" : a.priority === "Medium" ? "⚡" : "💡"
        return `${p} *${a.title}* — _${a.term ?? ""}_ \n    ${a.description.substring(0, 100)}...`
      }).join("\n\n")

    // Cluster más débil → insight
    const weakInsight = minSovCluster.weaknesses[0] ?? "Sin datos"

    const message = {
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: "📊 Informe GEO — Actualización Estratégica", emoji: true }
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `📅 Datos del lote: *${new Date(report.date).toLocaleDateString("es-ES")}* · Generado: ${new Date(report.generatedAt).toLocaleString("es-ES")}` }
          ]
        },
        { type: "divider" },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*🎯 Resumen Ejecutivo*\n${report.reportContent.summary}` }
        },
        { type: "divider" },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*📈 SoV Medio*\n${avgSov}%` },
            { type: "mrkdwn", text: `*💚 Clusters dominantes*\n${strongClusters} de ${clusters.length} (>50%)` },
            { type: "mrkdwn", text: `*🏆 Mejor cluster*\n${maxSovCluster.name} — ${maxSovCluster.sov.toFixed(1)}%` },
            { type: "mrkdwn", text: `*🤖 Sentimiento medio IA*\n${avgSentiment}/10` }
          ]
        },
        { type: "divider" },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*📊 Estado por Cluster (Top ${topClusters.length})*\n${clusterLines}` }
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `⚠️ *Cluster más débil:* ${minSovCluster.name} (${minSovCluster.sov.toFixed(1)}%) · Brecha clave: ${weakInsight}` }
          ]
        },
        { type: "divider" },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*🚀 Plan de Acción — ${actionPlan.length} acciones · Prioridades inmediatas:*\n\n${urgentActions}` }
        },
        { type: "divider" },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "📊 Ver Dashboard", emoji: true },
              url: `${DASHBOARD_URL}/`,
              style: "primary"
            },
            {
              type: "button",
              text: { type: "plain_text", text: "🧠 Estrategia GEO", emoji: true },
              url: `${DASHBOARD_URL}/debilidades-oportunidades`
            },
            {
              type: "button",
              text: { type: "plain_text", text: "🔍 Análisis Competitivo", emoji: true },
              url: `${DASHBOARD_URL}/analisis-competidores`
            }
          ]
        }
      ]
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    })

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`)
    }

    return { success: true, message: "Notificación enviada a Slack exitosamente" }
  } catch (error) {
    console.error("Error sending Slack notification:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido al enviar a Slack"
    }
  }
}
