import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Define custom API functionality
const api = {
  fetchHello: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hello')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    } catch (error) {
      console.error('Failed to fetch data:', error)
      return null
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to the renderer process
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
