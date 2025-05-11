"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  Paintbrush,
  MapIcon,
  HourglassIcon,
  HeartIcon,
  XCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventLocation, EventStatus } from "@/lib/types";
import { getEventStatus } from "@/services/adminService";
import {
  getLatestLocation,
  getPastLocations,
} from "@/services/locationService";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "@/components/header";

export default function Home() {
  const [status, setStatus] = useState<EventStatus>("waiting");
  const [location, setLocation] = useState<EventLocation | null>(null);
  const [pastLocations, setPastLocations] = useState<EventLocation[]>([]);
  const [revealStage, setRevealStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentStatus = await getEventStatus();
        console.log("Status atual:", currentStatus);
        setStatus(currentStatus);

        // Buscar a localização mais recente independente do status
        const latestLocation = await getLatestLocation();
        if (latestLocation) setLocation(latestLocation);
        console.log("Localização mais recente:", latestLocation);

        // Buscar localizações anteriores
        const past = await getPastLocations(5);
        setPastLocations(past);
        console.log("Localizações anteriores:", past);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReveal = () => {
    setRevealStage(1);
    // Progress through reveal stages
    const timer1 = setTimeout(() => setRevealStage(2), 3000);

    return () => {
      clearTimeout(timer1);
    };
  };

  // Renderizar conteúdo com base no status
  const renderStatusContent = () => {
    switch (status) {
      case "waiting":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="mb-6 sm:mb-8"
              >
                <HourglassIcon className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-extralight mb-6 sm:mb-8 tracking-wide yellow-text">
                Aguardando próxima revelação...
              </h2>
              <p className="text-gray-300 font-extralight mb-8 max-w-md mx-auto">
                Estamos preparando uma nova localização para o próximo evento.
                Fique atento às nossas redes sociais para não perder a
                revelação!
              </p>
              <motion.a
                href="https://instagram.com/pintapoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="/icons/instagram-icon.svg"
                  alt="Instagram"
                  width={isMobile ? 20 : 24}
                  height={isMobile ? 20 : 24}
                  className="mr-2 hover:opacity-80 transition-opacity"
                />{" "}
                SEGUIR NO INSTAGRAM
              </motion.a>
            </div>
          </motion.div>
        );

      case "active":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-20"
          >
            {location && (
              <>
                {revealStage === 0 ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="mb-6 sm:mb-8"
                    >
                      <Paintbrush className="h-12 w-12 sm:h-16 sm:w-16 text-orange-400 mx-auto" />
                    </motion.div>
                    <h2 className="text-xl sm:text-2xl font-extralight mb-6 sm:mb-8 tracking-wide yellow-text">
                      Próxima localização pronta para ser revelada
                    </h2>
                    <Button
                      onClick={handleReveal}
                      className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-light tracking-widest"
                    >
                      INICIAR REVELAÇÃO
                    </Button>
                  </div>
                ) : (
                  <div>
                    {revealStage === 1 && (
                      <div className="text-center space-y-6">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          <MapIcon className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-400 mx-auto mb-6 sm:mb-8" />
                        </motion.div>
                        <div className="h-1 w-full max-w-md mx-auto bg-orange-400/20">
                          <motion.div
                            className="h-full bg-orange-400"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                          />
                        </div>
                        <p className="text-gray-400 font-extralight">
                          Localizando próximo evento em Porto Alegre...
                        </p>
                      </div>
                    )}

                    {revealStage === 2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="glass p-6 sm:p-8 max-w-sm sm:max-w-md mx-auto border border-emerald-400/30"
                      >
                        <motion.h2
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-2xl sm:text-3xl font-extralight green-text tracking-wider mb-6 text-center"
                        >
                          {location.name}
                        </motion.h2>

                        <div className="space-y-4 mb-8">
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-start"
                          >
                            <MapPin className="h-5 w-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-extralight text-sm sm:text-base">
                              {location.address}
                            </p>
                          </motion.div>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-start"
                          >
                            <Calendar className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-extralight text-sm sm:text-base">
                              {new Date(location.date).toLocaleDateString(
                                "pt-BR",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </motion.div>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex items-start"
                          >
                            <Clock className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-extralight text-sm sm:text-base">
                              {location.time}
                            </p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="text-center"
                        >
                          <h3 className="text-lg sm:text-xl font-extralight yellow-text tracking-wide mb-4">
                            GARANTA SUA VAGA
                          </h3>
                          <motion.a
                            href="https://instagram.com/pintapoa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img
                              src="/icons/instagram-icon.svg"
                              alt="Instagram"
                              width={isMobile ? 20 : 24}
                              height={isMobile ? 20 : 24}
                              className="mr-2 hover:opacity-80 transition-opacity"
                            />{" "}
                            Envie uma mensagem!
                          </motion.a>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        );

      case "see-you-soon":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
                className="mb-6 sm:mb-8"
              >
                <HeartIcon className="h-12 w-12 sm:h-16 sm:w-16 text-pink-400 mx-auto" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
                Até Breve!
              </h2>
              <p className="text-gray-300 font-extralight mb-8 max-w-md mx-auto">
                Estamos preparando novidades incríveis para o próximo evento.
                Fique ligado em nossas redes sociais para ser o primeiro a saber
                quando voltarmos!
              </p>
              <motion.a
                href="https://instagram.com/pintapoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="/icons/instagram-icon.svg"
                  alt="Instagram"
                  width={isMobile ? 20 : 24}
                  height={isMobile ? 20 : 24}
                  className="mr-2 hover:opacity-80 transition-opacity"
                />{" "}
                SEGUIR NO INSTAGRAM
              </motion.a>
            </div>
          </motion.div>
        );

      case "ended":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-20"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="mb-6 sm:mb-8"
              >
                <XCircleIcon className="h-12 w-12 sm:h-16 sm:w-16 text-orange-400 mx-auto" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
                Projeto Finalizado
              </h2>
              <p className="text-gray-300 font-extralight mb-8 max-w-md mx-auto">
                O PINTA POA chegou ao fim. Agradecemos a todos que participaram
                e fizeram parte desta jornada artística incrível. Fique atento
                para futuros projetos!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="https://instagram.com/pintapoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="/icons/instagram-icon.svg"
                    alt="Instagram"
                    width={isMobile ? 20 : 24}
                    height={isMobile ? 20 : 24}
                    className="mr-2 hover:opacity-80 transition-opacity"
                  />{" "}
                  VER NOSSA HISTÓRIA!
                </motion.a>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-10 bg-black">
      <Header isMobile={isMobile} />
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
          </div>
        ) : (
          <>
            {renderStatusContent()}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text border-b border-yellow-400/20 pb-2">
                LOCALIZAÇÕES ANTERIORES
              </h2>

              {pastLocations.length === 0 ? (
                <p className="text-gray-400 font-extralight text-sm sm:text-base">
                  Nenhuma localização anterior encontrada.
                </p>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {pastLocations.map((location) => (
                    <motion.div
                      key={location.id}
                      whileHover={{ x: 5 }}
                      className="border-l-2 border-emerald-400/30 pl-3 sm:pl-4 py-1"
                    >
                      <h3 className="text-base sm:text-lg font-extralight green-text mb-2">
                        {location.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                              {location.address}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                              {new Date(location.date).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-xs sm:text-sm">
                              {location.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
