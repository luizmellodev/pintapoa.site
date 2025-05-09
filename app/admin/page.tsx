"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Edit,
  Trash2,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  LogOut,
  Compass,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getAllLocations,
  addLocation,
  updateLocation,
  deleteLocation,
  updateEventStatus,
} from "@/lib/data";
import type { EventLocation, EventStatus } from "@/lib/types";

// Portuguese translations for status options
const statusOptions = {
  waiting: "Aguardando",
  active: "Ativo (Mostrar Localização Atual)",
  "see-you-soon": "Até Breve",
  ended: "Fim do Projeto",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [locations, setLocations] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<EventStatus>("waiting");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<EventLocation | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<EventLocation>>({
    name: "",
    address: "",
    date: "",
    time: "",
    imageUrl: "",
    coordinates: "",
  });

  // Check authentication status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const allLocations = await getAllLocations();
      setLocations(allLocations);

      // In a real app, you would fetch the current status from the server
      if (allLocations.length > 0) {
        setCurrentStatus("active");
      } else {
        setCurrentStatus("waiting");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (status: EventStatus) => {
    try {
      await updateEventStatus(status);
      setCurrentStatus(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      if (
        !formData.name ||
        !formData.address ||
        !formData.date ||
        !formData.time
      ) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      await addLocation({
        id: Date.now().toString(),
        name: formData.name || "",
        address: formData.address || "",
        date: formData.date || new Date().toISOString().split("T")[0],
        time: formData.time || "",
        imageUrl: formData.imageUrl || "",
        coordinates: formData.coordinates || "",
      });

      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        address: "",
        date: "",
        time: "",
        imageUrl: "",
        coordinates: "",
      });
      fetchData();
    } catch (error) {
      console.error("Failed to add location:", error);
    }
  };

  const handleEditClick = (location: EventLocation) => {
    setCurrentLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      date: new Date(location.date).toISOString().split("T")[0],
      time: location.time,
      imageUrl: location.imageUrl,
      coordinates: location.coordinates,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateLocation = async () => {
    try {
      if (!currentLocation) return;

      if (
        !formData.name ||
        !formData.address ||
        !formData.date ||
        !formData.time
      ) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
      }

      await updateLocation({
        id: currentLocation.id,
        name: formData.name || "",
        address: formData.address || "",
        date: formData.date || new Date().toISOString().split("T")[0],
        time: formData.time || "",
        imageUrl: formData.imageUrl || "",
        coordinates: formData.coordinates || "",
      });

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
      if (!currentLocation) return;

      await deleteLocation(currentLocation.id);
      setIsDeleteDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Show loading state while checking authentication
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-6 md:p-10 bg-black">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="mr-3 hover:bg-yellow-400/10 text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-extralight tracking-wider yellow-text">
              Painel de Administração
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400 hidden md:inline-block font-extralight">
              {session?.user?.email || "Admin"}
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
              >
                <LogOut className="h-4 w-4 mr-2" /> SAIR
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider">
                    <PlusCircle className="h-4 w-4 mr-2" /> ADICIONAR LOCAL
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
                      Adicionar Novo Local
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label
                        htmlFor="name"
                        className="text-gray-300 font-extralight"
                      >
                        Nome do Local
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="ex: Parque Ibirapuera"
                        className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label
                        htmlFor="address"
                        className="text-gray-300 font-extralight"
                      >
                        Endereço
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Endereço completo"
                        rows={2}
                        className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="date"
                          className="text-gray-300 font-extralight"
                        >
                          Data
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="time"
                          className="text-gray-300 font-extralight"
                        >
                          Horário
                        </Label>
                        <Input
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          placeholder="ex: 14:00 - 17:00"
                          className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label
                        htmlFor="imageUrl"
                        className="text-gray-300 font-extralight"
                      >
                        URL da Imagem (opcional)
                      </Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
                    >
                      CANCELAR
                    </Button>
                    <Button
                      onClick={handleAddLocation}
                      className="bg-transparent hover:bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-none font-extralight tracking-wider"
                    >
                      ADICIONAR
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass border-yellow-400/10 shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400 font-extralight tracking-wide">
                <Settings className="h-5 w-5 mr-2" /> STATUS DO EVENTO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label className="text-gray-300 font-extralight">
                  Status Atual:{" "}
                  <span className="text-orange-400">
                    {statusOptions[currentStatus]}
                  </span>
                </Label>
                <Select
                  value={currentStatus}
                  onValueChange={(value) =>
                    handleStatusChange(value as EventStatus)
                  }
                >
                  <SelectTrigger className="bg-black/50 border-white/10 focus:ring-yellow-400/30 font-extralight">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="glass border-yellow-400/10">
                    <SelectItem value="waiting">
                      {statusOptions.waiting}
                    </SelectItem>
                    <SelectItem value="active">
                      {statusOptions.active}
                    </SelectItem>
                    <SelectItem value="see-you-soon">
                      {statusOptions["see-you-soon"]}
                    </SelectItem>
                    <SelectItem value="ended">{statusOptions.ended}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.h2
          className="text-xl font-extralight mb-6 tracking-wide yellow-text border-b border-yellow-400/20 pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          GERENCIAR LOCALIZAÇÕES
        </motion.h2>

        {loading ? (
          <motion.div
            className="flex justify-center items-center h-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
          </motion.div>
        ) : locations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-400 font-extralight">
              Nenhuma localização adicionada ainda.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {locations.map((location) => (
              <motion.div
                key={location.id}
                variants={item}
                className="border-l-2 border-emerald-400/30 pl-4 py-1"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-extralight green-text mb-2">
                      {location.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-400 font-extralight text-sm">
                            {location.address}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-400 font-extralight text-sm">
                            {new Date(location.date).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-400 font-extralight text-sm">
                            {location.time}
                          </p>
                        </div>
                        {location.coordinates && (
                          <div className="flex items-start">
                            <Compass className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-sm font-mono">
                              {location.coordinates}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(location)}
                        className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
                      >
                        <Edit className="h-4 w-4 mr-1" /> EDITAR
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(location)}
                        className="bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 rounded-none font-extralight tracking-wider"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> EXCLUIR
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
            <DialogHeader>
              <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
                Editar Localização
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="edit-name"
                  className="text-gray-300 font-extralight"
                >
                  Nome do Local
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="edit-address"
                  className="text-gray-300 font-extralight"
                >
                  Endereço
                </Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="edit-date"
                    className="text-gray-300 font-extralight"
                  >
                    Data
                  </Label>
                  <Input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="edit-time"
                    className="text-gray-300 font-extralight"
                  >
                    Horário
                  </Label>
                  <Input
                    id="edit-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="edit-coordinates"
                  className="text-gray-300 font-extralight"
                >
                  Coordenadas
                </Label>
                <Input
                  id="edit-coordinates"
                  name="coordinates"
                  value={formData.coordinates}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight font-mono"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="edit-imageUrl"
                  className="text-gray-300 font-extralight"
                >
                  URL da Imagem
                </Label>
                <Input
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10 focus:border-yellow-400/50 text-white font-extralight"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
              >
                CANCELAR
              </Button>
              <Button
                onClick={handleUpdateLocation}
                className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none font-extralight tracking-wider"
              >
                SALVAR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px] glass border-yellow-400/10">
            <DialogHeader>
              <DialogTitle className="text-yellow-400 text-xl font-extralight tracking-wide">
                Confirmar Exclusão
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-300 font-extralight">
                Tem certeza que deseja excluir "{currentLocation?.name}"? Esta
                ação não pode ser desfeita.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-transparent hover:bg-white/5 text-gray-300 border border-white/10 rounded-none font-extralight"
              >
                CANCELAR
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteLocation}
                className="bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/30 rounded-none font-extralight tracking-wider"
              >
                EXCLUIR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
