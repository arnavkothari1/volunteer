import { saveAs } from 'file-saver'
import Papa from 'papaparse'

interface ExportOptions {
  format: 'csv' | 'json'
  timeRange: string
}

interface AnalyticsRecord {
  date: string
  value: number
  label: string
  [key: string]: string | number // for any additional properties
}

type ExportData = AnalyticsRecord[]

export const analyticsExport = {
  exportData: async (data: ExportData, options: ExportOptions): Promise<void> => {
    switch (options.format) {
      case 'csv':
        return exportCSV(data, options)
      case 'json':
        return exportJSON(data, options)
      default:
        throw new Error('Unsupported export format')
    }
  },
}

function exportCSV(data: ExportData, options: ExportOptions): void {
  const csvContent = Papa.unparse(data)
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, `analytics_${options.timeRange}.csv`)
}

function exportJSON(data: ExportData, options: ExportOptions): void {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  saveAs(blob, `analytics_${options.timeRange}.json`)
} 