"use client"

import { motion } from "framer-motion"
import { Paintbrush, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ReferenciasPage() {
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
            <Button
              variant="link"
              size={isMobile ? "sm" : "default"}
              className="text-gray-400 hover:text-yellow-400 font-extralight"
            >
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
            <Button variant="link" size={isMobile ? "sm" : "default"} className="text-yellow-400 font-extralight">
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
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-wider text-yellow-400 mb-3 sm:mb-4">
              Referências Visuais
            </h2>
            <p className="text-gray-300 font-extralight max-w-lg mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              Nossa coleção de inspirações no Pinterest para estimular sua criatividade.
            </p>
          </div>

          <div className="glass p-4 sm:p-6 rounded-lg mb-8 sm:mb-12 border border-yellow-400/10">
            <a
              href="https://pinterest.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-gray-400 hover:text-yellow-400 flex items-center justify-end mb-3 sm:mb-4"
            >
              Ver no Pinterest <ExternalLink className="h-3 w-3 ml-1" />
            </a>

            <iframe
              src="https://www.pinterest.com/pintapoa/_created/"
              width="100%"
              height={isMobile ? "400" : "600"}
              frameBorder="0"
              className="rounded"
              title="Pinterest Board"
            ></iframe>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <a
              href="https://pinterest.com/pintapoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-red-600/10 text-red-400 border border-red-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? "16" : "20"}
                height={isMobile ? "16" : "20"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              SEGUIR NO PINTEREST
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
