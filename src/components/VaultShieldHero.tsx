import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle, Zap, LockKeyhole, Fingerprint } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: easing,
    },
  }),
};

export const VaultShieldHero: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--color-text)",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero Content */}
      <div
        className="relative z-20 mx-auto max-w-5xl px-5 sm:px-8 flex flex-col items-start"
        style={{
          paddingTop: "clamp(40px, 8vw, 72px)",
        }}
      >
        {/* Hero Heading */}
        <motion.h1
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.65rem, 5vw, 3rem)",
            lineHeight: "1.05",
            letterSpacing: "-0.01em",
            color: "var(--color-text)",
            maxWidth: "560px",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Zap size={24} className="inline" style={{ top: "-2px", position: "relative" }} />
            Lock Down
          </span>{" "}
          Your Passwords with{" "}
          <span className="inline-flex items-center gap-2">
            <LockKeyhole size={24} className="inline" style={{ top: "-2px", position: "relative" }} />
            Ironclad
          </span>{" "}
          <span className="inline-flex items-center gap-2">
            Security
            <Fingerprint size={24} className="inline" style={{ top: "-2px", position: "relative" }} />
          </span>
        </motion.h1>

        {/* Hero Subtext */}
        <motion.p
          custom={0.15}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            lineHeight: "1.65",
            opacity: 0.8,
            maxWidth: "560px",
          }}
        >
          Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools for your non-stop world.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          custom={0.3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-between gap-8 transition-all"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "white",
            borderRadius: "50px",
            padding: "17px 24px",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            boxShadow: "0 4px 24px rgba(115,66,226,0.28)",
            minWidth: "210px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get It Free
          <ArrowRightCircle size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default VaultShieldHero;
