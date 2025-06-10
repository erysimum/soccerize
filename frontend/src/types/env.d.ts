export {}

declare global {
  interface Window {
    env?: {
      VITE_API_BASE_URL?: string
      VITE_SOCKET_URL?: string
    }
  }
}
