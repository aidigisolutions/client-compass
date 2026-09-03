"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, Facebook, Instagram } from "lucide-react";
import { COMPANY, WHATSAPP_HREF } from "@/lib/data/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-center gap-3">

      {/* Back To Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-xl"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call */}
      <motion.a
        href={COMPANY.phoneHref}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full shadow-xl"
        style={{ backgroundColor: "#D39B00" }}
      >
        <Phone className="h-7 w-7 text-white" />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-8 fill-white"
        >
          <path d="M19.11 17.39c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.14-1.3-.79-.71-1.33-1.58-1.48-1.84-.16-.27-.02-.42.12-.56.13-.13.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.48-.84-2.03-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.64 1.11 2.82.13.18 1.91 2.91 4.63 4.08.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.22-.63.22-1.16.16-1.28-.07-.11-.25-.18-.52-.31z"/>
          <path d="M16.01 3C8.83 3 3 8.73 3 15.8c0 2.27.6 4.48 1.73 6.42L3 29l6.98-1.67A13.1 13.1 0 0016.01 29C23.19 29 29 23.27 29 16.2 29 9.13 23.19 3 16.01 3zm0 23.55c-1.88 0-3.72-.5-5.33-1.45l-.38-.22-4.14.99 1.1-4.03-.25-.41a10.44 10.44 0 01-1.61-5.63c0-5.79 4.76-10.5 10.61-10.5 5.85 0 10.61 4.71 10.61 10.5 0 5.79-4.76 10.5-10.61 10.5z"/>
        </svg>
      </motion.a>

      {/* Facebook */}
      <motion.a
        href="https://www.facebook.com/share/15fxJqdrsd/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#1877F2] shadow-xl"
      >
        <Facebook className="h-7 w-7 text-white" />
      </motion.a>

      {/* Instagram */}
      <motion.a
        href="https://www.instagram.com/argbuildtech/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full shadow-xl"
        style={{
          background:
            "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
        }}
      >
        <Instagram className="h-7 w-7 text-white" />
      </motion.a>

    </div>
  );
}