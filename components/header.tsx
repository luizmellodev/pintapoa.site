// components/Header.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { bogeyman } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
type HeaderProps = {
  isMobile?: boolean;
};

export default function Header({ isMobile = false }: HeaderProps) {
  return (
    <>
      <motion.div
        className="flex items-center justify-center mb-6 sm:mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className={`${bogeyman.className} text-3xl sm:text-4xl text-yellow-400`}
        >
          PINTA
        </h1>
        <h1 className="ml-1">POA</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {[
            { href: "/", label: "INÍCIO" },
            { href: "/sobre", label: "SOBRE" },
            { href: "/cidades", label: "CIDADES" },
            { href: "/bares", label: "BARES" },
            { href: "/playlist", label: "PLAYLIST" },
            { href: "/referencias", label: "REFS" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="link"
                size={isMobile ? "sm" : "default"}
                className="text-gray-400 hover:text-yellow-400 font-extralight"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex justify-center space-x-6 mb-10 sm:mb-16">
          <motion.a
            href="https://instagram.com/pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-pink-400 hover:text-pink-300"
          >
            <img
              src="/icons/instagram-icon.svg"
              alt="Instagram"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              className="hover:opacity-80 transition-opacity"
            />
          </motion.a>

          <motion.a
            href="https://tiktok.com/@pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-gray-400 hover:text-gray-300"
          >
            <img
              src="/icons/tiktok-icon.svg"
              alt="Tiktok"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              className="hover:opacity-80 transition-opacity"
            />
          </motion.a>

          <motion.a
            href="mailto:contato@pintapoa.com.br"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.a>

          <motion.a
            href="https://pinterest.com/pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-red-400 hover:text-red-300"
          >
            <img
              src="/icons/pinterest-icon.svg"
              alt="Pinterest"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              className="hover:opacity-80 transition-opacity"
            />
          </motion.a>

          <motion.a
            href="https://pinterest.com/pintapoa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.1 }}
            className="text-red-400 hover:text-red-300"
          >
            <img
              src="/icons/spotify-icon.svg"
              alt="Spotify"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              className="hover:opacity-80 transition-opacity"
            />
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
