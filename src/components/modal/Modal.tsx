import { motion } from "framer-motion";
import { ReactNode } from "react";

const variantModel = (
  openDuration: number = 300,
  closeDuration: number = 300
) => ({
  open: {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: openDuration / 1000,
    },
  },
  closed: {
    x: 0,
    y: 0,
    scale: 0,
    transition: {
      ease: "easeOut",
      duration: closeDuration / 1000,
    },
  },
});

const variantBackground = (
  openDuration: number = 300,
  closeDuration: number = 300
) => ({
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: { duration: 0 },
      ease: "easeOut",
      duration: openDuration / 1000,
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      opacity: { ease: "easeOut", duration: closeDuration / 1000 },
      scale: { delay: closeDuration / 1000, duration: 0 },
    },
  },
});

type ModalPropsUnion = {
  isOpen: boolean;
  changeOpen: () => void;
  backdropColor?: string;
  onBackdropPress: () => void;
  openDuration?: number;
  closeDuration?: number;
  children: ReactNode;
};

export default function Modal(props: ModalPropsUnion) {
  const {
    isOpen,
    changeOpen,
    backdropColor,
    onBackdropPress,
    openDuration,
    closeDuration,
    children,
  } = props;

  return (
    <motion.div
      className={`${
        !backdropColor &&
        "bg-gradient-to-r from-blue-100/70 via-purple-100/70 to-pink-100/70"
      }  fixed top-0 right-0 left-0 z-50 w-full h-screen p-4 flex items-center justify-center`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      style={{
        backgroundColor: backdropColor,
      }}
      variants={variantBackground(openDuration, closeDuration)}
      onClick={() => {
        if (isOpen) onBackdropPress();
      }}
    >
      <motion.div
        className={`bg-white pt-8 pb-6 px-10 rounded-lg shadow-md fixed top-10`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        animate={isOpen ? "open" : "closed"}
        variants={variantModel(openDuration, closeDuration)}
      >
        <motion.img
          className="absolute top-2 right-2 size-6 cursor-pointer opacity-90"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={changeOpen}
          src="./images/close.png"
          alt=""
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
