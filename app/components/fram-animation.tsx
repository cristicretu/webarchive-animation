"use client";

import { AnimatePresence, MotionConfig, motion, spring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

const IMAGES = ["japan", "jungle", "new-york", "desert"];

const imgURL = IMAGES.map((img) => {
  return `https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/why-framer-motion/${img}.webp`;
});

export function FrameAnimation() {
  const [index, setIndex] = useState(0);

  const imagesToShow = useMemo(() => {
    return imgURL.slice(index, Math.min(index + 3, imgURL.length));
  }, [index, imgURL]);

  const handleNext = () => {
    if (index + 1 < imgURL.length) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <>
      <MotionConfig
        // transition={{
        //   type: "spring",
        //   // stiffness: 300,
        //   // damping: 30,
        //   duration: 1,
        // }}

        transition={{ duration: 0.5, bounce: 0, type: "spring" }}

        // transition={{ duration: 5 }}
      >
        {/* </AnimatePresence> */}
        <AnimatePresence initial={false} mode="popLayout">
          {/* first card */}
          <motion.img
            key={imagesToShow[0]}
            layoutId={imagesToShow[0]}
            src={imagesToShow[0]}
            className={clsx(
              "absolute",
              "w-1/3",
              "rounded-xl",
              "bg-neutral-500",
              "z-50"
            )}
            initial={{ opacity: 0, y: 32, scale: 0.8, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0.5,
              y: -32,
              scale: 0.8,
              filter: "blur(10px)",
            }}
          />

          {/* second card */}
          <motion.img
            key={imagesToShow[1]}
            layoutId={imagesToShow[1]}
            src={imagesToShow[1]}
            className={clsx(
              "absolute",
              "w-1/3",
              "rounded-xl",
              "bg-neutral-500",
              "z-40"
            )}
            initial={{ opacity: 0, y: 64, scale: 0.8 }}
            animate={{
              opacity: 0.8,
              y: -32,
              scale: 0.94,
              filter: "blur(0px)",
            }}
          />

          {/* third card */}
          <motion.img
            key={imagesToShow[2]}
            layoutId={imagesToShow[2]}
            src={imagesToShow[2]}
            className={clsx(
              "absolute",
              "w-1/3",
              "rounded-xl",
              "bg-neutral-500",
              "z-30"
            )}
            initial={{ opacity: 0, y: 96, scale: 0.8 }}
            animate={{
              opacity: 0.6,
              y: -64,
              scale: 0.88,
              filter: "blur(0px)",
            }}
          />
        </AnimatePresence>

        <div className="absolute bottom-0 w-full flex justify-center">
          <button
            className="bg-gray-200 p-2 rounded-xl"
            onClick={handlePrev}
            disabled={index === 0}
          >
            Prev
          </button>
          <button className="bg-gray-200 p-2 rounded-xl" onClick={handleNext}>
            Next
          </button>
        </div>
      </MotionConfig>
    </>
  );
}
