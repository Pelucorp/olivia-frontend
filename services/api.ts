import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Health check
export const checkHealth = async () => {
  const response = await api.get("/api/health")
  return response.data
}

// Document APIs
export const uploadDocument = async (formData: FormData) => {
  const response = await api.post("/api/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const getDocument = async (id: string) => {
  const response = await api.get(`/api/documents/${id}`)
  return response.data
}

export const getAllDocuments = async () => {
  const response = await api.get("/api/documents")
  return response.data
}

export const analyzeDocument = async (id: string) => {
  const response = await api.post(`/api/documents/${id}/analyze`)
  return response.data
}

export const deleteDocument = async (id: string) => {
  const response = await api.delete(`/api/documents/${id}`)
  return response.data
}

export default api
