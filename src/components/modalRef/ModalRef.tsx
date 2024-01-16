import { motion, useAnimate } from "framer-motion";
import { ReactNode, forwardRef, useEffect, useImperativeHandle } from "react";

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

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

type ModalPropsUnion = {
  backdropColor?: string;
  onBackdropPress: () => void;
  openDuration?: number;
  closeDuration?: number;
  children: ReactNode;
};

export interface RefForModal {
  handleAnimate: () => void;
}

const ModalRef = forwardRef<RefForModal, ModalPropsUnion>((props, ref) => {
  const {
    backdropColor,
    onBackdropPress,
    openDuration,
    closeDuration,
    children,
  } = props;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { opacity: 0 });
  }, []);

  const handleOpenAnimate = async () => {
    animate(
      scope.current,
      {
        opacity: 1,
        display: "flex",
      },
      { duration: openDuration ? openDuration / 1000 : 0.3 }
    );
    animate("#modal", {
      scale: 1,
    });
  };
  const handleCloseAnimate = async () => {
    animate(
      scope.current,
      {
        opacity: 0,
        transitionEnd: {
          display: "none",
        },
      },
      { duration: closeDuration ? closeDuration / 1000 : 0.3 }
    );
    animate("#modal", {
      scale: 0,
    });
  };

  useImperativeHandle(ref, () => {
    return {
      handleAnimate: handleOpenAnimate,
    };
  });

  return (
    <div
      ref={scope}
      className={`${
        !backdropColor &&
        "bg-gradient-to-r from-blue-100/70 via-purple-100/70 to-pink-100/70"
      }  fixed top-0 hidden right-0 left-0 z-50 w-full h-screen p-4 items-center justify-center`}
      style={{
        backgroundColor: backdropColor,
      }}
      onClick={onBackdropPress}
    >
      <div
        id="modal"
        className="bg-white pt-8 pb-6 px-10 rounded-lg shadow-md fixed top-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <motion.img
          className="absolute top-2 right-2 size-6 cursor-pointer opacity-90"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={handleCloseAnimate}
          src="./images/close.png"
          alt=""
        />
        {children}
      </div>
    </div>
  );
});

export default ModalRef;
