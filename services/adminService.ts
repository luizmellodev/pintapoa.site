import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  setDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import type { EventLocation, EventStatus } from "@/lib/types"

// Constantes
const STATUS_DOC = "status/current"
const LOCATIONS_COLLECTION = "locations"

// Gerenciar status do evento
export const getEventStatus = async (): Promise<EventStatus> => {
  try {
    const statusDoc = await getDoc(doc(db, STATUS_DOC))

    if (statusDoc.exists()) {
      return statusDoc.data().status as EventStatus
    }

    // Se não existir, criar com status padrão "waiting"
    await setDoc(doc(db, STATUS_DOC), { status: "waiting" })
    return "waiting"
  } catch (error) {
    console.error("Erro ao obter status do evento:", error)
    return "waiting" // Fallback padrão
  }
}

export const updateEventStatus = async (status: EventStatus): Promise<void> => {
  try {
    await setDoc(doc(db, STATUS_DOC), {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Erro ao atualizar status do evento:", error)
    throw new Error("Falha ao atualizar status do evento")
  }
}

// CRUD de localizações
export const getAllLocations = async (): Promise<EventLocation[]> => {
  console.log("Iniciando getAllLocations")
  try {
    // Verificar se o Firestore está inicializado
    if (!db) {
      console.error("Firestore não inicializado")
      return []
    }

    console.log("Criando query para coleção:", LOCATIONS_COLLECTION)
    const locationsQuery = query(collection(db, LOCATIONS_COLLECTION), orderBy("date", "desc"))
    console.log("Query criada:", locationsQuery)

    console.log("Executando getDocs...")
    const snapshot = await getDocs(locationsQuery)
    console.log("Snapshot obtido, docs:", snapshot.docs.length)

    if (snapshot.empty) {
      console.log("Nenhuma localização encontrada")
      return []
    }

    const locations: EventLocation[] = []

    // Processar cada documento individualmente para evitar que um erro em um documento afete todos
    for (const doc of snapshot.docs) {
      try {
        const data = doc.data()
        console.log("Processando documento:", doc.id, data)

        // Verificar se data.date existe e é um Timestamp
        if (!data.date || typeof data.date.toDate !== "function") {
          console.warn("data.date inválido para o documento", doc.id, data.date)
          // Usar data atual como fallback
          locations.push({
            id: doc.id,
            name: data.name || "Sem nome",
            address: data.address || "Sem endereço",
            date: new Date().toISOString().split("T")[0],
            time: data.time || "00:00",
            imageUrl: data.imageUrl || "",
            coordinates: data.coordinates || "",
          })
        } else {
          locations.push({
            id: doc.id,
            name: data.name,
            address: data.address,
            date: data.date.toDate().toISOString().split("T")[0],
            time: data.time,
            imageUrl: data.imageUrl || "",
            coordinates: data.coordinates || "",
          })
        }
      } catch (docError) {
        console.error("Erro ao processar documento:", doc.id, docError)
        // Continuar com o próximo documento
      }
    }

    console.log("Localizações processadas com sucesso:", locations.length, locations)
    return locations
  } catch (error) {
    console.error("Erro ao obter localizações:", error)
    return []
  }
}

export const addLocation = async (location: Omit<EventLocation, "id">): Promise<string> => {
  console.log("Iniciando addLocation com dados:", location)
  try {
    // Verificar se a data é válida
    if (!location.date) {
      console.error("Data inválida:", location.date)
      throw new Error("Data inválida")
    }

    const dateObj = new Date(location.date)
    console.log("Data convertida:", dateObj)

    // Criar objeto para o Firestore
    const locationData = {
      name: location.name,
      address: location.address,
      date: Timestamp.fromDate(dateObj),
      time: location.time,
      imageUrl: location.imageUrl || "",
      coordinates: location.coordinates || "",
      createdAt: serverTimestamp(),
    }

    console.log("Dados formatados para Firestore:", locationData)

    // Adicionar ao Firestore
    const docRef = await addDoc(collection(db, LOCATIONS_COLLECTION), locationData)
    console.log("Documento adicionado com ID:", docRef.id)

    return docRef.id
  } catch (error) {
    console.error("Erro detalhado ao adicionar localização:", error)
    throw error
  }
}

export const updateLocation = async (updatedLocation: EventLocation): Promise<void> => {
  try {
    // Converter string de data para Timestamp do Firestore
    const dateObj = new Date(updatedLocation.date)
    const locationRef = doc(db, LOCATIONS_COLLECTION, updatedLocation.id)

    await updateDoc(locationRef, {
      name: updatedLocation.name,
      address: updatedLocation.address,
      date: Timestamp.fromDate(dateObj),
      time: updatedLocation.time,
      imageUrl: updatedLocation.imageUrl || "",
      coordinates: updatedLocation.coordinates || "",
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Erro ao atualizar localização:", error)
    throw new Error("Falha ao atualizar localização")
  }
}

export const deleteLocation = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, LOCATIONS_COLLECTION, id))
  } catch (error) {
    console.error("Erro ao excluir localização:", error)
    throw new Error("Falha ao excluir localização")
  }
}
