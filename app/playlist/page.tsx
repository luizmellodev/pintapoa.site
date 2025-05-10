"use client"

import { motion } from "framer-motion"
import { Paintbrush, Music } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PlaylistPage() {
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
            <Button variant="link" size={isMobile ? "sm" : "default"} className="text-yellow-400 font-extralight">
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
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extralight tracking-wider text-yellow-400 mb-3 sm:mb-4">
              Nossa Playlist
            </h2>
            <p className="text-gray-300 font-extralight max-w-lg mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              A trilha sonora perfeita para acompanhar sua experiência criativa no PINTA POA.
            </p>
          </div>

          <div className="glass p-4 sm:p-6 rounded-lg mb-8 sm:mb-12 border border-yellow-400/10">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5KARSbCT7Rb?utm_source=generator"
                width="100%"
                height={isMobile ? "300" : "380"}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded"
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DX5KARSbCT7Rb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-green-600/10 text-green-500 border border-green-600/30 rounded-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-light tracking-widest"
            >
              <Music className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> ABRIR NO SPOTIFY
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
