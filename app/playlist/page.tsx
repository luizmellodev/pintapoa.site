"use client"

import { motion } from "framer-motion"
import { Paintbrush, Music } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlaylistPage() {
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
            <Button variant="link" className="text-yellow-400 font-extralight">
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight tracking-wider text-yellow-400 mb-4">Nossa Playlist</h2>
            <p className="text-gray-300 font-extralight max-w-lg mx-auto mb-8">
              A trilha sonora perfeita para acompanhar sua experiência criativa no PINTA POA.
            </p>
          </div>

          <div className="glass p-6 rounded-lg mb-12 border border-yellow-400/10">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5KARSbCT7Rb?utm_source=generator"
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded"
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DX5KARSbCT7Rb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-transparent hover:bg-green-600/10 text-green-500 border border-green-600/30 rounded-none px-6 py-3 text-base font-light tracking-widest"
            >
              <Music className="mr-2 h-5 w-5" /> ABRIR NO SPOTIFY
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
