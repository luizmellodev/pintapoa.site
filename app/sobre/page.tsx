"use client"

import { motion } from "framer-motion"
import { Paintbrush, Instagram, Users, Palette, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SobrePage() {
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

        <div className="flex justify-center space-x-4 mb-16">
          <Link href="/">
            <Button variant="link" className="text-gray-400 hover:text-yellow-400 font-extralight">
              INÍCIO
            </Button>
          </Link>
          <Link href="/sobre">
            <Button variant="link" className="text-yellow-400 font-extralight">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-yellow-400 mb-4">
              Experiências criativas para
            </h2>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wider text-emerald-400 mb-8">
              + artistas em ascensão!
            </h2>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-6 py-3 text-base font-light tracking-widest"
            >
              <Instagram className="h-5 w-5 mr-2" /> SIGA NO INSTAGRAM
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-yellow-400/30 pt-4">
              <Users className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-extralight yellow-text mb-3">Comunidade</h3>
              <p className="text-gray-300 font-extralight">
                Conectamos artistas, entusiastas e curiosos em um ambiente acolhedor e inspirador.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-emerald-400/30 pt-4">
              <Palette className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-extralight green-text mb-3">Criatividade</h3>
              <p className="text-gray-300 font-extralight">
                Estimulamos a expressão artística em um formato descontraído, acompanhado de boa comida.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="border-t-2 border-orange-400/30 pt-4">
              <MapPin className="h-8 w-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-extralight orange-text mb-3">Descoberta</h3>
              <p className="text-gray-300 font-extralight">
                Cada evento acontece em um local diferente de Porto Alegre, promovendo a exploração da cidade.
              </p>
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">COMO FUNCIONA</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-yellow-400 font-light">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-yellow-400 mb-2">Revelação do local</h3>
                  <p className="text-gray-300 font-extralight">
                    Alguns dias antes do evento, revelamos o local onde acontecerá o próximo PINTA POA.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-emerald-400 font-light">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-emerald-400 mb-2">Compra de ingressos</h3>
                  <p className="text-gray-300 font-extralight">
                    Os ingressos são vendidos exclusivamente pelo nosso Instagram. Vagas limitadas para garantir uma
                    experiência de qualidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-orange-400 font-light">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-extralight text-orange-400 mb-2">Experiência completa</h3>
                  <p className="text-gray-300 font-extralight">
                    No dia do evento, você terá acesso a materiais de arte, orientação criativa e uma deliciosa
                    refeição, tudo incluído no ingresso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-extralight mb-6 tracking-wide yellow-text">PRÓXIMO EVENTO</h2>
            <div className="inline-flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                <span className="text-gray-300 font-extralight">15 de Maio, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-400 mr-2" />
                <span className="text-gray-300 font-extralight">Porto Alegre</span>
              </div>
            </div>
            <a
              href="https://instagram.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-pink-600/10 text-pink-400 border border-pink-600/30 rounded-none px-6 py-3 text-base font-light tracking-widest"
            >
              <Instagram className="h-5 w-5 mr-2" /> GARANTA SUA VAGA
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
