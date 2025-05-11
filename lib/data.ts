"use server"

import type { EventLocation, EventStatus } from "./types"
import { auth, db } from "./firebase"
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

// Collection references
const STATUS_DOC = "status/current"
const LOCATIONS_COLLECTION = "locations"

// Get the current event status
export async function getEventStatus(): Promise<EventStatus> {
  try {
    const statusDoc = await getDoc(doc(db, STATUS_DOC))

    if (statusDoc.exists()) {
      return statusDoc.data().status as EventStatus
    }

    // If no status document exists, create one with default "waiting" status
    await setDoc(doc(db, STATUS_DOC), { status: "waiting" })
    return "waiting"
  } catch (error) {
    console.error("Error getting event status:", error)
    return "waiting" // Default fallback
  }
}

// Update the event status
export async function updateEventStatus(status: EventStatus): Promise<void> {
  try {
    await setDoc(doc(db, STATUS_DOC), {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating event status:", error)
    throw new Error("Failed to update event status")
  }
}

// Get all locations
export async function getAllLocations(): Promise<EventLocation[]> {
  try {
    const locationsQuery = query(collection(db, LOCATIONS_COLLECTION), orderBy("date", "desc"))

    const snapshot = await getDocs(locationsQuery)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        address: data.address,
        date: data.date.toDate().toISOString().split("T")[0], // Convert Firestore Timestamp to YYYY-MM-DD
        time: data.time,
        imageUrl: data.imageUrl || "",
        coordinates: data.coordinates || "",
      }
    })
  } catch (error) {
    console.error("Error getting locations:", error)
    return []
  }
}

// Get the latest location
export async function getLatestLocation(): Promise<EventLocation | null> {
  try {
    const locationsQuery = query(collection(db, LOCATIONS_COLLECTION), orderBy("date", "desc"))

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
    console.error("Error getting latest location:", error)
    return null
  }
}

// Add a new location
export async function addLocation(location: Omit<EventLocation, 'id'>): Promise<void> {
  try {

    const user = auth.currentUser
    if (!user) {
      throw new Error("User not authenticated")
    }
    
    // Convert string date to Firestore Timestamp
    const dateObj = new Date(location.date)

    await addDoc(collection(db, LOCATIONS_COLLECTION), {
      name: location.name,
      address: location.address,
      date: Timestamp.fromDate(dateObj),
      time: location.time,
      imageUrl: location.imageUrl || "",
      coordinates: location.coordinates || "",
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error adding location:", error)
    throw new Error("Failed to add location")
  }
}

// Update an existing location
export async function updateLocation(updatedLocation: EventLocation): Promise<void> {
  try {
    // Convert string date to Firestore Timestamp
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
    console.error("Error updating location:", error)
    throw new Error("Failed to update location")
  }
}

// Delete a location
export async function deleteLocation(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, LOCATIONS_COLLECTION, id))
  } catch (error) {
    console.error("Error deleting location:", error)
    throw new Error("Failed to delete location")
  }
}
