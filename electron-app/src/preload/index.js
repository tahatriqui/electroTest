import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'



// Use `contextBridge` APIs to expose Electron APIs to the renderer process
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)

  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  
}
