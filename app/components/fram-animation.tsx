"use client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

const IMAGES = ["japan", "jungle", "new-york", "desert"];

const imgURL = IMAGES.map(
  (img) =>
    `https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/why-framer-motion/${img}.webp`
);

export function FrameAnimation() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const preloadImages = imgURL.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    Promise.all(
      preloadImages.map((img) => {
        return new Promise((resolve) => {
          img.onload = resolve;
        });
      })
    ).then(() => setLoaded(true));
  }, []);

  const imagesToShow = useMemo(
    () => imgURL.slice(index, Math.min(index + 3, imgURL.length)),
    [index, imgURL]
  );

  const transition = { duration: 0.5, bounce: 0, type: "spring" };

  return (
    <>
      <MotionConfig transition={transition}>
        {loaded && (
          // <AnimatePresence mode="popLayout">
          <>
            {showGrid ? (
              <div className="grid grid-cols-3 gap-4 p-4">
                {imagesToShow.map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    width={200}
                    height={200}
                    layoutId={src}
                    className="rounded-xl bg-neutral-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                ))}
              </div>
            ) : (
              imagesToShow.map((src, i) => (
                <AnimatePresence key={src} mode="popLayout">
                  <motion.img
                    key={src}
                    layoutId={src}
                    src={src}
                    width={400}
                    height={400}
                    className={clsx("absolute", "rounded-xl", "bg-neutral-500")}
                    initial={{
                      opacity: 1 - (i + 1) * 0.2,
                      y: -32 * (i + 1),
                      scale: 1 - (i + 1) * 0.06,
                      filter: "blur(10px)",
                      zIndex: 9999 - i,
                    }}
                    animate={{
                      opacity: 1 - i * 0.2,
                      y: -32 * i,
                      scale: 1 - i * 0.06,
                      filter: "blur(0px)",
                      zIndex: 9999 - i,
                    }}
                    exit={{
                      opacity: 0,
                      y: 50,
                      scale: 0.5,
                      filter: "blur(10px)",
                      zIndex: -1,
                    }}
                  />
                </AnimatePresence>
              ))
            )}
            {/*  </AnimatePresence> */}
          </>
        )}

        <div className="absolute bottom-0 w-full flex justify-center space-x-4">
          <button
            className="bg-gray-200 p-2 rounded-xl"
            onClick={() => setIndex(Math.max(index - 1, 0))}
            disabled={index === 0}
          >
            Prev
          </button>
          <button
            className="bg-gray-200 p-2 rounded-xl"
            onClick={() => setIndex(Math.min(index + 1, 9999))}
          >
            Next
          </button>
          <button
            className="bg-gray-200 p-2 rounded-xl"
            onClick={() => setShowGrid((prev) => !prev)}
          >
            Show Grid
          </button>
        </div>
      </MotionConfig>
    </>
  );
}
