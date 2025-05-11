"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import {
  getAllLocations,
  addLocation,
  updateLocation,
  deleteLocation,
  updateEventStatus,
} from "@/lib/data";
import type { EventLocation, EventStatus } from "@/lib/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AdminLayout } from "@/components/admin-layout";
import { StatusCard } from "@/components/admin-status-card";
import { LocationList } from "@/components/admin-location-list";
import {
  EditLocationDialog,
  DeleteLocationDialog,
  AddLocationDialog,
} from "@/components/admin-dialogs";

const statusOptions = {
  waiting: "Aguardando",
  active: "Ativo (Mostrar Localização Atual)",
  "see-you-soon": "Até Breve",
  ended: "Fim do Projeto",
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<EventLocation[]>([]);
  const [currentStatus, setCurrentStatus] = useState<EventStatus>("waiting");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<EventLocation | null>(
    null
  );
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchData();
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const allLocations = await getAllLocations();
      setLocations(allLocations);
      setCurrentStatus(allLocations.length > 0 ? "active" : "waiting");
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: EventStatus) => {
    try {
      await updateEventStatus(status);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddLocation = async (newLocation: Omit<EventLocation, "id">) => {
    try {
      if (!auth.currentUser) {
        console.error("User is not authenticated");
        return;
      }

      await addLocation(newLocation);
      setIsAddDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to add location:", error);
    }
  };

  const handleEditClick = (location: EventLocation) => {
    setCurrentLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleUpdateLocation = async (updatedLocation: EventLocation) => {
    try {
      await updateLocation(updatedLocation);
      setIsEditDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

  const handleDeleteClick = (location: EventLocation) => {
    setCurrentLocation(location);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteLocation = async () => {
    try {
      if (currentLocation) {
        await deleteLocation(currentLocation.id);
        setIsDeleteDialogOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout onSignOut={handleSignOut}>
      <StatusCard
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        statusOptions={statusOptions}
      />
      <LocationList
        locations={locations}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onAdd={() => setIsAddDialogOpen(true)}
        isMobile={isMobile}
      />
      <AddLocationDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddLocation}
        isMobile={isMobile}
      />
      {currentLocation && (
        <>
          <EditLocationDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            location={currentLocation}
            onSave={handleUpdateLocation}
          />
          <DeleteLocationDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            location={currentLocation}
            onConfirm={handleDeleteLocation}
          />
        </>
      )}
    </AdminLayout>
  );
}
