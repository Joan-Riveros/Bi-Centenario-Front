import React, { useState } from 'react';
import { motion } from 'framer-motion';

type CardProps = {
    card: {
        src: string;
        title: string;
        category: string;
        content: React.ReactNode;
    };
    index: number;
};

export const AppleCardDocuments = ({ card }: CardProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative flex flex-col h-80 w-64 md:h-[24rem] md:w-[18rem] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1B262C] shadow-md transition-transform hover:scale-[1.02]"
        >
            <img
                src={card.src}
                alt={card.title}
                onLoad={() => setIsLoading(false)}
                className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${isLoading ? 'blur-sm' : 'blur-0'}`}
                loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10" />

            <div className="relative z-20 p-4 flex flex-col justify-end h-full text-white font-sans">
                <p className="text-xs font-medium">{card.category}</p>
                <p className="text-lg font-semibold mt-1 leading-tight">{card.title}</p>
                <div className="mt-4 text-sm text-gray-100">{card.content}</div>
            </div>
        </motion.div>
    );
};