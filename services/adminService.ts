import { db } from "@/lib/firebase";
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
} from "firebase/firestore";
import type { EventLocation, EventStatus } from "@/lib/types";

const LOCATIONS_COLLECTION = "locations";
const STATUS_DOC = "status/current";

export const adminService = {
  // Locations
  getAllLocations: async (): Promise<EventLocation[]> => {
    try {
      const locationsQuery = query(
        collection(db, LOCATIONS_COLLECTION),
        orderBy("date", "desc")
      );

      const snapshot = await getDocs(locationsQuery);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          address: data.address,
          date: data.date.toDate().toISOString().split("T")[0],
          time: data.time,
          imageUrl: data.imageUrl || "",
          coordinates: data.coordinates || "",
        };
      });
    } catch (error) {
      console.error("Error getting locations:", error);
      return [];
    }
  },

  addLocation: async (location: Omit<EventLocation, "id">): Promise<void> => {
    try {
      const dateObj = new Date(location.date);

      await addDoc(collection(db, LOCATIONS_COLLECTION), {
        name: location.name,
        address: location.address,
        date: Timestamp.fromDate(dateObj),
        time: location.time,
        imageUrl: location.imageUrl || "",
        coordinates: location.coordinates || "",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding location:", error);
      throw new Error("Failed to add location");
    }
  },

  updateLocation: async (location: EventLocation): Promise<void> => {
    try {
      const dateObj = new Date(location.date);
      const locationRef = doc(db, LOCATIONS_COLLECTION, location.id);

      await updateDoc(locationRef, {
        name: location.name,
        address: location.address,
        date: Timestamp.fromDate(dateObj),
        time: location.time,
        imageUrl: location.imageUrl || "",
        coordinates: location.coordinates || "",
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating location:", error);
      throw new Error("Failed to update location");
    }
  },

  deleteLocation: async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, LOCATIONS_COLLECTION, id));
    } catch (error) {
      console.error("Error deleting location:", error);
      throw new Error("Failed to delete location");
    }
  },

  // Status
  getEventStatus: async (): Promise<EventStatus> => {
    try {
      const statusDoc = await getDoc(doc(db, STATUS_DOC));

      if (statusDoc.exists()) {
        return statusDoc.data().status as EventStatus;
      }

      await setDoc(doc(db, STATUS_DOC), { status: "waiting" });
      return "waiting";
    } catch (error) {
      console.error("Error getting event status:", error);
      return "waiting";
    }
  },

  updateEventStatus: async (status: EventStatus): Promise<void> => {
    try {
      await setDoc(doc(db, STATUS_DOC), {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating event status:", error);
      throw new Error("Failed to update event status");
    }
  },
};