"use client"

import { motion } from "framer-motion"
import { Paintbrush, Instagram, Users, Palette, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function SobrePage() {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-10 bg-black">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center mb-6 sm:mb-8"
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
            <Paintbrush className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mr-2 sm:mr-3" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider yellow-text">
            PINTA <span className="text-orange-400">POA</span>
          </h1>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16">
          <Link href="/">
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
              INÍCIO
            </Button>
          </Link>
          <Link href="/sobre">
            <Button variant="link" size={isMobile ? "sm" : "default"} className="text-yellow-400 font-extralight">
              SOBRE
            </Button>
          </Link>
          <Link href="/expandir">
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
              EXPANDIR
            </Button>
          </Link>
          <Link href="/estabelecimentos">
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
              LOCAIS
            </Button>
          </Link>
          <Link href="/playlist">
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
              PLAYLIST
            </Button>
          </Link>
          <Link href="/referencias">
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
              REFS
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-yellow-400 mb-3 sm:mb-4">
              Experiências criativas para
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-6 sm:mb-8">
              + artistas em ascensão!
            </h2>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> SIGA NO INSTAGRAM
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-yellow-400/30 pt-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight yellow-text mb-2 sm:mb-3">Comunidade</h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Conectamos artistas, entusiastas e curiosos em um ambiente acolhedor e inspirador.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-emerald-400/30 pt-4">
              <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight green-text mb-2 sm:mb-3">Criatividade</h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Estimulamos a expressão artística em um formato descontraído, acompanhado de boa comida.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-orange-400/30 pt-4">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-extralight orange-text mb-2 sm:mb-3">Descoberta</h3>
              <p className="text-gray-300 font-extralight text-sm sm:text-base">
                Cada evento acontece em um local diferente de Porto Alegre, promovendo a exploração da cidade.
              </p>
            </motion.div>
          </div>

          <div className="mb-10 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              COMO FUNCIONA
            </h2>
            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-yellow-400 font-light text-sm sm:text-base">1</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-yellow-400 mb-1 sm:mb-2">
                    Revelação do local
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Alguns dias antes do evento, revelamos o local onde acontecerá o próximo PINTA POA.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-emerald-400 font-light text-sm sm:text-base">2</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-emerald-400 mb-1 sm:mb-2">
                    Compra de ingressos
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    Os ingressos são vendidos exclusivamente pelo nosso Instagram. Vagas limitadas para garantir uma
                    experiência de qualidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-3 sm:mr-4 mt-1">
                  <span className="text-orange-400 font-light text-sm sm:text-base">3</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extralight text-orange-400 mb-1 sm:mb-2">
                    Experiência completa
                  </h3>
                  <p className="text-gray-300 font-extralight text-sm sm:text-base">
                    No dia do evento, você terá acesso a materiais de arte, orientação criativa e uma deliciosa
                    refeição, tudo incluído no ingresso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-6 tracking-wide yellow-text">
              PRÓXIMO EVENTO
            </h2>
            <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-6 mb-6 sm:mb-8 space-y-3 sm:space-y-0">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 mr-2" />
                <span className="text-gray-300 font-extralight text-sm sm:text-base">15 de Maio, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mr-2" />
                <span className="text-gray-300 font-extralight text-sm sm:text-base">Porto Alegre</span>
              </div>
            </div>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> GARANTA SUA VAGA
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
