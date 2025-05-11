"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  getAllLocations,
  updateEventStatus,
  addLocation,
  updateLocation,
  deleteLocation,
  getEventStatus,
} from "@/services/adminService"; // Mantendo o caminho correto
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

const initialLocationState: Omit<EventLocation, "id"> = {
  name: "",
  address: "",
  date: "",
  time: "",
  imageUrl: "",
  coordinates: "",
};

export default function AdminPage() {
  const { user, loading: authLoading, signOut } = useAuth();
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

  // Adicionar useEffect para logar quando o estado locations muda
  useEffect(() => {
    console.log("AdminPage - Estado locations atualizado:", locations);
  }, [locations]);

  // Carregar dados iniciais
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Buscar dados
  const fetchData = async () => {
    console.log("Iniciando fetchData");
    try {
      setLoading(true);

      // Buscar localizações e status separadamente para melhor depuração
      console.log("Buscando localizações...");
      const allLocations = await getAllLocations();
      console.log("Localizações recebidas:", allLocations);

      console.log("Buscando status...");
      const status = await getEventStatus();
      console.log("Status recebido:", status);

      // Atualizar o estado com os dados recebidos
      setLocations(allLocations);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLocations([]);
    } finally {
      setLoading(false);
      // Usar o valor atualizado diretamente, não o estado que pode não ter sido atualizado ainda
      console.log("fetchData concluído. Loading:", false);
    }
  };

  // Atualizar os handlers para usar as funções importadas diretamente
  const handleStatusChange = async (status: EventStatus) => {
    try {
      await updateEventStatus(status); // Chamar função diretamente
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddLocation = async () => {
    console.log("Tentando adicionar localização:", newLocation);
    try {
      await addLocation(newLocation);
      console.log("Localização adicionada com sucesso");
      setIsAddDialogOpen(false);
      setNewLocation(initialLocationState);
      await fetchData(); // Recarregar os dados
    } catch (error) {
      console.error("Erro ao adicionar localização:", error);
    }
  };

  const handleEditClick = (location: EventLocation) => {
    setCurrentLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleUpdateLocation = async (updatedLocation: EventLocation) => {
    try {
      await updateLocation(updatedLocation); // Chamar função diretamente
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
        await deleteLocation(currentLocation.id); // Chamar função diretamente
        setIsDeleteDialogOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  // Atualizar o handler de logout
  const handleSignOut = async () => {
    try {
      await signOut(); // Usar a função do contexto
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    router.push("/login");
    return null;
  }

  // Verificar se locations é um array válido antes de renderizar
  const validLocations = Array.isArray(locations) ? locations : [];
  console.log("AdminPage - Renderizando com validLocations:", validLocations);

  // Main render
  return (
    <AdminLayout onSignOut={handleSignOut}>
      <StatusCard
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        statusOptions={statusOptions}
      />

      {/* Adicionar um log para depuração */}
      <div className="hidden">
        {(() => {
          console.log("Renderizando LocationList com:", {
            locations: validLocations,
            loading,
            locationsCount: validLocations.length,
          });
          return null;
        })()}
      </div>

      <LocationList
        locations={validLocations}
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
