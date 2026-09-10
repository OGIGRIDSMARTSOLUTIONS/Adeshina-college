/** Education motion — academic slide/tilt; distinct from Health fade+scale. */
export const educationEase = [0.25, 0.9, 0.3, 1] as const;

export const educationFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: educationEase },
  },
};

/** Copy enters from the left (classroom chalkboard feel). */
export const educationSlideIn = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: educationEase },
  },
};

/** Cards rise with a slight academic tilt — not Health’s soft scale. */
export const educationCardTilt = {
  hidden: { opacity: 0, y: 36, rotate: -1.25 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.62, ease: educationEase },
  },
};

export const educationStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const educationStaggerCards = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};
