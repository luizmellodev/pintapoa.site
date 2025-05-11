"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { userService } from "@/services/userService";
import { adminService } from "@/services/adminService";
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

// Custom Hook para autenticação
function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await userService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return { user, loading, handleSignOut };
}

const statusOptions = {
  waiting: "Aguardando",
  active: "Ativo (Mostrar Localização Atual)",
  "see-you-soon": "Até Breve",
  ended: "Fim do Projeto",
};

const initialLocationState: Omit<EventLocation, "id"> = {
  name: "",
  address: "",
  date: "",
  time: "",
  imageUrl: "",
  coordinates: "",
};

export default function AdminPage() {
  const { user, loading: authLoading, handleSignOut } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Estados
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<EventLocation[]>([]);
  const [currentStatus, setCurrentStatus] = useState<EventStatus>("waiting");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<EventLocation | null>(
    null
  );
  const [newLocation, setNewLocation] =
    useState<Omit<EventLocation, "id">>(initialLocationState);

  // Carregar dados iniciais
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Buscar dados
  const fetchData = async () => {
    try {
      setLoading(true);
      const [allLocations, status] = await Promise.all([
        adminService.getAllLocations(),
        adminService.getEventStatus(),
      ]);
      setLocations(allLocations);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleStatusChange = async (status: EventStatus) => {
    try {
      await adminService.updateEventStatus(status);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddLocation = async () => {
    console.log("Adding location:", newLocation);
    try {
      await adminService.addLocation(newLocation);
      console.log("Location added successfully");
      setIsAddDialogOpen(false);
      setNewLocation(initialLocationState);
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
      await adminService.updateLocation(updatedLocation);
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
        await adminService.deleteLocation(currentLocation.id);
        setIsDeleteDialogOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // Main render
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
        action={handleAddLocation}
        location={newLocation}
        setLocation={setNewLocation}
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
