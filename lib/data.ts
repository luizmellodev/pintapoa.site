"use server"

import type { EventLocation, EventStatus } from "./types"
import { promises as fs } from "fs"
import path from "path"
import { isFirebaseEnabled } from "./firebase"

// In a real application, this would be stored in a database
// For this example, we'll use a JSON file
const DATA_FILE_PATH = path.join(process.cwd(), "data.json")

// Initialize the data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE_PATH)
  } catch (error) {
    // File doesn't exist, create it with default data
    const defaultData = {
      status: "waiting",
      locations: [],
    }
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData, null, 2))
  }
}

// Read data from the file
async function readData() {
  await initDataFile()
  const data = await fs.readFile(DATA_FILE_PATH, "utf8")
  return JSON.parse(data)
}

// Write data to the file
async function writeData(data: any) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2))
}

// Get the current event status
export async function getEventStatus(): Promise<EventStatus> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // return await getStatusFromFirebase();
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  return data.status || "waiting"
}

// Update the event status
export async function updateEventStatus(status: EventStatus): Promise<void> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // await updateStatusInFirebase(status);
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  data.status = status
  await writeData(data)
}

// Get all locations
export async function getAllLocations(): Promise<EventLocation[]> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // return await getLocationsFromFirebase();
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  return data.locations || []
}

// Get the latest location
export async function getLatestLocation(): Promise<EventLocation | null> {
  const locations = await getAllLocations()

  if (locations.length === 0) {
    return null
  }

  // Sort by date (newest first) and return the first one
  return locations.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })[0]
}

// Add a new location
export async function addLocation(location: EventLocation): Promise<void> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // await addLocationToFirebase(location);
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  data.locations = [...data.locations, location]
  await writeData(data)
}

// Update an existing location
export async function updateLocation(updatedLocation: EventLocation): Promise<void> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // await updateLocationInFirebase(updatedLocation);
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  data.locations = data.locations.map((loc: EventLocation) => (loc.id === updatedLocation.id ? updatedLocation : loc))
  await writeData(data)
}

// Delete a location
export async function deleteLocation(id: string): Promise<void> {
  if (isFirebaseEnabled) {
    // Firebase implementation would go here
    // await deleteLocationFromFirebase(id);
    throw new Error("Firebase is not yet implemented")
  }

  const data = await readData()
  data.locations = data.locations.filter((loc: EventLocation) => loc.id !== id)
  await writeData(data)
}

// Firebase implementations (to be uncommented when Firebase is enabled)
/*
async function getStatusFromFirebase(): Promise<EventStatus> {
  // Implementation using Firebase
}

async function updateStatusInFirebase(status: EventStatus): Promise<void> {
  // Implementation using Firebase
}

async function getLocationsFromFirebase(): Promise<EventLocation[]> {
  // Implementation using Firebase
}

async function addLocationToFirebase(location: EventLocation): Promise<void> {
  // Implementation using Firebase
}

async function updateLocationInFirebase(updatedLocation: EventLocation): Promise<void> {
  // Implementation using Firebase
}

async function deleteLocationFromFirebase(id: string): Promise<void> {
  // Implementation using Firebase
}
*/
