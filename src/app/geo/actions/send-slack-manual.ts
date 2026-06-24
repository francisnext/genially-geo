"use server"

import { sendSlackNotificationAction } from "./slack-notification"
import { fetchLatestStrategicReport } from "@/lib/geo/strategic-report-service"

export async function sendSlackManualAction() {
  try {
    const report = await fetchLatestStrategicReport()

    if (!report) {
      return {
        success: false,
        error: "No hay informe disponible para enviar"
      }
    }

    const result = await sendSlackNotificationAction(report)
    return result
  } catch (error) {
    console.error("Error sending manual Slack notification:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
