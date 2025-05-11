import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import type { EventLocation } from "@/lib/types"
import { getEventStatus } from "./adminService"

// Constantes
const LOCATIONS_COLLECTION = "locations"

// Obter a localização mais recente (ativa)
export const getLatestLocation = async (): Promise<EventLocation | null> => {
  try {
    const locationsQuery = query(collection(db, LOCATIONS_COLLECTION), orderBy("date", "desc"), limit(1))

    const snapshot = await getDocs(locationsQuery)

    if (snapshot.empty) {
      return null
    }

    const doc = snapshot.docs[0]
    const data = doc.data()

    return {
      id: doc.id,
      name: data.name,
      address: data.address,
      date: data.date.toDate().toISOString().split("T")[0],
      time: data.time,
      imageUrl: data.imageUrl || "",
      coordinates: data.coordinates || "",
    }
  } catch (error) {
    console.error("Erro ao obter localização mais recente:", error)
    return null
  }
}

// Obter localizações anteriores (excluindo a mais recente)
export const getPastLocations = async (countLimit = 5): Promise<EventLocation[]> => {
  try {
    console.log("Iniciando getPastLocations com limite:", limit)

    // Buscar todas as localizações ordenadas por data (mais recente primeiro)
    const locationsQuery = query(
      collection(db, LOCATIONS_COLLECTION),
      orderBy("date", "desc"),
      limit(countLimit + 1), // +1 para caso precisemos filtrar a mais recente
    )

    const snapshot = await getDocs(locationsQuery)
    console.log("Snapshot obtido, docs:", snapshot.docs.length)

    if (snapshot.empty) {
      console.log("Nenhuma localização encontrada")
      return []
    }

    // Obter o status atual para determinar se devemos filtrar a localização mais recente
    const status = await getEventStatus()
    console.log("Status atual:", status)

    // Converter os documentos para o formato EventLocation
    let locations = snapshot.docs.map((doc) => {
      const data = doc.data()

      // Verificar se data.date existe e é um Timestamp
      if (!data.date || typeof data.date.toDate !== "function") {
        console.error("Erro: data.date inválido para o documento", doc.id, data.date)
        // Usar data atual como fallback
        return {
          id: doc.id,
          name: data.name || "Sem nome",
          address: data.address || "Sem endereço",
          date: new Date().toISOString().split("T")[0],
          time: data.time || "00:00",
          imageUrl: data.imageUrl || "",
          coordinates: data.coordinates || "",
        }
      }

      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        date: data.date.toDate().toISOString().split("T")[0],
        time: data.time,
        imageUrl: data.imageUrl || "",
        coordinates: data.coordinates || "",
      }
    })

    // Se o status for "active", remover a localização mais recente da lista
    if (status === "active" && locations.length > 0) {
      locations = locations.slice(1)
      console.log("Removida a localização mais recente, restantes:", locations.length)
    }

    // Limitar ao número solicitado
    if (locations.length > countLimit) {
      locations = locations.slice(0, countLimit)
      console.log("Lista limitada a", countLimit, "localizações")
    }

    console.log("Localizações anteriores processadas:", locations.length, locations)
    return locations
  } catch (error) {
    console.error("Erro ao obter localizações anteriores:", error)
    return []
  }
}

// Verificar se há uma localização ativa
export const hasActiveLocation = async (): Promise<boolean> => {
  try {
    const status = await getEventStatus()
    if (status !== "active") {
      return false
    }

    const latest = await getLatestLocation()
    return !!latest
  } catch (error) {
    console.error("Erro ao verificar localização ativa:", error)
    return false
  }
}
