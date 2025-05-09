"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Calendar, Paintbrush, MapIcon, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { EventLocation, EventStatus } from "@/lib/types"

// Example location data for Porto Alegre
const exampleLocation: EventLocation = {
  id: "example-1",
  name: "Parque Farroupilha (Redenção)",
  address: "Av. João Pessoa - Farroupilha, Porto Alegre - RS, 90040-000",
  date: "2025-05-15",
  time: "14:00 - 17:00",
}

const examplePastLocations: EventLocation[] = [
  {
    id: "past-1",
    name: "Parque Moinhos de Vento (Parcão)",
    address: "R. Comendador Caminha, 132 - Moinhos de Vento, Porto Alegre - RS",
    date: "2025-04-10",
    time: "15:00 - 18:00",
  },
  {
    id: "past-2",
    name: "Orla do Guaíba",
    address: "Av. Edvaldo Pereira Paiva - Praia de Belas, Porto Alegre - RS",
    date: "2025-03-20",
    time: "10:00 - 13:00",
  },
]

export default function Home() {
  const [status, setStatus] = useState<EventStatus>("active") // Set to active for the example
  const [location, setLocation] = useState<EventLocation>(exampleLocation)
  const [pastLocations, setPastLocations] = useState<EventLocation[]>(examplePastLocations)
  const [revealStage, setRevealStage] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // For the example, we'll use the hardcoded data instead of fetching
        // Uncomment these lines when you want to use real data
        /*
        const currentStatus = await getEventStatus()
        setStatus(currentStatus)

        if (currentStatus === "active") {
          const latestLocation = await getLatestLocation()
          if (latestLocation) setLocation(latestLocation)
          
          const allLocations = await getAllLocations()
          // Filter out the latest location from past locations
          const past = allLocations.filter(loc => loc.id !== latestLocation?.id)
          setPastLocations(past)
        }
        */
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleReveal = () => {
    setRevealStage(1)
    // Progress through reveal stages
    const timer1 = setTimeout(() => setRevealStage(2), 3000)
    const timer2 = setTimeout(() => setRevealStage(3), 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-10 bg-black">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
          >
            <Paintbrush className="h-8 w-8 text-yellow-400 mr-3" />
          </motion.div>
          <h1 className="text-3xl font-extralight tracking-wider yellow-text">
            PINTA <span className="text-orange-400">POA</span>
          </h1>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <Link href="/sobre">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              SOBRE
            </Button>
          </Link>
          <Link href="/expandir">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              EXPANDIR
            </Button>
          </Link>
          <Link href="/estabelecimentos">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              ESTABELECIMENTOS
            </Button>
          </Link>
          <Link href="/playlist">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              PLAYLIST
            </Button>
          </Link>
          <Link href="/referencias">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              REFERÊNCIAS
            </Button>
          </Link>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          <motion.a
            href="https://instagram.com/pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-pink-400 hover:text-pink-300"
          >
            <Instagram className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://tiktok.com/@pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-gray-400 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-music"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </motion.a>
          <motion.a
            href="mailto:contato@pintapoa.com.br"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Mail className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://pinterest.com/pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-red-400 hover:text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </motion.a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin"></div>
          </div>
        ) : (
          <>
            {status === "active" && location && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-20"
              >
                {revealStage === 0 ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="mb-8"
                    >
                      <Paintbrush className="h-16 w-16 text-orange-400 mx-auto" />
                    </motion.div>
                    <h2 className="text-2xl font-extralight mb-8 tracking-wide yellow-text">
                      Próxima localização pronta para ser revelada
                    </h2>
                    <Button
                      onClick={handleReveal}
                      className="bg-transparent hover:bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-none px-8 py-6 text-base font-light tracking-widest"
                    >
                      INICIAR REVELAÇÃO
                    </Button>
                  </div>
                ) : (
                  <div>
                    {revealStage === 1 && (
                      <div className="text-center space-y-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                          <MapIcon className="h-16 w-16 text-emerald-400 mx-auto mb-8" />
                        </motion.div>
                        <div className="h-1 w-full max-w-md mx-auto bg-orange-400/20">
                          <motion.div
                            className="h-full bg-orange-400"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                          />
                        </div>
                        <p className="text-gray-400 font-extralight">Localizando próximo evento em Porto Alegre...</p>
                      </div>
                    )}

                    {revealStage === 2 && (
                      <div className="text-center space-y-8">
                        <div className="reveal-container">
                          <h2 className="text-3xl font-extralight green-text tracking-wider">{location.name}</h2>
                          <div className="reveal-overlay"></div>
                        </div>

                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="fade-in flex items-start">
                            <MapPin className="h-5 w-5 text-orange-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-left text-gray-300 font-extralight">{location.address}</p>
                          </div>
                          <div className="fade-in-delay-1 flex items-start">
                            <Calendar className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-left text-gray-300 font-extralight">
                              {new Date(location.date).toLocaleDateString("pt-BR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="fade-in-delay-2 flex items-start">
                            <Clock className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-left text-gray-300 font-extralight">{location.time}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {revealStage === 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="glass p-8 max-w-2xl mx-auto border border-emerald-400/30"
                      >
                        <motion.h2
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-3xl font-extralight green-text tracking-wider mb-6 text-center"
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
                            <p className="text-gray-300 font-extralight">{location.address}</p>
                          </motion.div>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex items-start"
                          >
                            <Calendar className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-extralight">
                              {new Date(location.date).toLocaleDateString("pt-BR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </motion.div>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex items-start"
                          >
                            <Clock className="h-5 w-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-extralight">{location.time}</p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="text-center"
                        >
                          <h3 className="text-xl font-extralight yellow-text tracking-wide mb-4">GARANTA SUA VAGA</h3>
                          <motion.a
                            href="https://instagram.com/pintapoa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-6 py-3 text-base font-light tracking-widest"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Instagram className="h-5 w-5 mr-2" /> COMPRAR NO INSTAGRAM
                          </motion.a>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Past Locations Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl font-extralight mb-6 tracking-wide yellow-text border-b border-yellow-400/20 pb-2">
                LOCALIZAÇÕES ANTERIORES
              </h2>

              {pastLocations.length === 0 ? (
                <p className="text-gray-400 font-extralight">Nenhuma localização anterior encontrada.</p>
              ) : (
                <div className="space-y-8">
                  {pastLocations.map((location) => (
                    <motion.div
                      key={location.id}
                      whileHover={{ x: 5 }}
                      className="border-l-2 border-emerald-400/30 pl-4 py-1"
                    >
                      <h3 className="text-lg font-extralight green-text mb-2">{location.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-sm">{location.address}</p>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-sm">
                              {new Date(location.date).toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-400 font-extralight text-sm">{location.time}</p>
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
  )
}
