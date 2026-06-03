import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { useEffect, useState } from "react";
import headerImg1 from "../../assets/head.jpg";

const typingText = "Bangun Masa Depan";

const rotatingTexts = [
    "Tanpa Ragu!",
    "Tanpa Ribet!",
    "Bersama Kami!"
];

const Header: React.FC = () => {
    const [index, setIndex] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.07, duration: 0.3 }
        }));
    }, [controls]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % rotatingTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const variantsSlide = {
        enterLeft: { opacity: 0, x: -100 },
        enterRight: { opacity: 0, x: 100 },
        center: { opacity: 1, x: 0 },
        exitLeft: { opacity: 0, x: -100 },
        exitRight: { opacity: 0, x: 100 },
    };

    const variantsUp = {
        enter: { opacity: 0, y: 50 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    };

    return (
        <header
            id="home"
            className="relative min-h-screen flex items-center justify-start bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url(${headerImg1})` }}
        >
            <div className="absolute inset-0 bg-neutral-800/50 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-3xl w-full px-4 md:px-6 text-left flex flex-col justify-end min-h-full pb-10 md:pb-24">
                <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-white leading-tight tracking-wide flex flex-wrap">
                    {typingText.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={controls}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </h1>

                <div className="h-16 sm:h-20 overflow-hidden mb-2 relative">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={rotatingTexts[index]}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6 }}
                            className="absolute text-2xl sm:text-3xl md:text-6xl font-extrabold text-white leading-tight tracking-wide"
                            variants={
                                rotatingTexts[index] === "Tanpa Ragu!"
                                    ? {
                                        enter: variantsSlide.enterLeft,
                                        center: variantsSlide.center,
                                        exit: variantsSlide.exitRight,
                                    }
                                    : rotatingTexts[index] === "Tanpa Ribet!"
                                        ? {
                                            enter: variantsSlide.enterRight,
                                            center: variantsSlide.center,
                                            exit: variantsSlide.exitLeft,
                                        }
                                        : variantsUp
                            }
                        >
                            {rotatingTexts[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="text-white text-sm sm:text-base md:text-xl leading-relaxed mb-6 sm:mb-8 text-justify max-w-full"
                >
                    Mitra Terpercaya Anda untuk Solusi Konstruksi yang Efisien dan Tepat Waktu.
                    Dari perencanaan hingga pelaksanaan, kami pastikan setiap proyek berjalan lancar,
                    praktis, dan sesuai anggaran — tanpa ribet dan penuh kepastian.
                </motion.p>
            </div>
        </header>
    );
};

export default Header;
