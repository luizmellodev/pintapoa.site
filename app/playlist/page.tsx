"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Header from "@/components/header";

export default function PlaylistPage() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-10 bg-black">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
        <Header isMobile={isMobile} />

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
              A trilha sonora perfeita para acompanhar sua experiência criativa
              no PINTA POA.
            </p>
          </div>

          <div className="glass p-4 sm:p-6 rounded-lg mb-8 sm:mb-12 border border-yellow-400/10">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/2Efw0v0dW614FqbRo3Gf5g?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify playlist player"
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <a
              href="https://open.spotify.com/playlist/2Efw0v0dW614FqbRo3Gf5g?si=g5AFDuvNRkWTmIZ5XAyciQ&utm_medium=share&utm_source=website"
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
  );
}
