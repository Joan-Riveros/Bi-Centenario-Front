import React, { JSX, useState } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

type Card = {
    id: number
    content: JSX.Element | React.ReactNode | string
    className: string
    thumbnail: string
}

interface LayoutGridProps {
    cards: Card[]
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ cards }) => {
    const [selected, setSelected] = useState<Card | null>(null)
    const [lastSelected, setLastSelected] = useState<Card | null>(null)

    const handleClick = (card: Card) => {
        setLastSelected(selected)
        setSelected(card)
    }

    const handleOutsideClick = () => {
        setLastSelected(selected)
        setSelected(null)
    }

    return (
        <div className="w-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative min-h-[400px]">
            {cards.map((card) => (
                <div key={card.id} className="relative">
                    <motion.div
                        onClick={() => handleClick(card)}
                        className={clsx(
                        card.className,
                        "relative overflow-hidden transition-all duration-300 ease-in-out min-h-[280px]",
                        selected?.id === card.id
                            ? "fixed inset-0 z-50 flex justify-center items-center bg-white dark:bg-darkSecondary rounded-xl p-4"
                            : lastSelected?.id === card.id
                            ? "z-40 bg-white dark:bg-base rounded-xl h-full w-full"
                            : "bg-white dark:bg-darkSecondary rounded-xl h-full w-full"
                        )}
                        layoutId={`card-${card.id}`}
                    >
                        {selected?.id === card.id && <SelectedCard selected={selected} />}
                        <ImageComponent card={card} />
                    </motion.div>
                </div>
            ))}

            <motion.div
                onClick={handleOutsideClick}
                className={clsx(
                    "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10 transition-opacity",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none"
                )}
                animate={{ opacity: selected?.id ? 0.3 : 0 }}
            />
        </div>
    )
}
/*
const ImageComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <motion.img
            layoutId={`image-${card.id}-image`}
            src={card.thumbnail}
            height={500}
            width={500}
            className="object-cover object-center absolute inset-0 h-full w-full transition duration-300"
            alt="card"
        />
    )
}*/
const ImageComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div className="relative w-full h-full">
            <motion.img
                layoutId={`image-${card.id}-image`}
                src={card.thumbnail}
                alt="card"
                className="object-cover w-full h-full rounded-xl"
            />
        </div>
    )
}

const SelectedCard: React.FC<{ selected: Card }> = ({ selected }) => {
    return (
        <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="absolute inset-0 h-full w-full bg-black z-10"
            />
            <motion.div
                layoutId={`content-${selected?.id}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative px-6 md:px-8 pb-4 z-[70]"
            >
                {selected?.content}
            </motion.div>
        </div>
    )
}
