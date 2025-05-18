import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaHistory, FaLock, FaSearch, FaFileAlt, FaComments } from 'react-icons/fa';
import Button from '../components/Button'; 


import {
    CardContainer as ThreeDCardContainer,
    CardBody as ThreeDCardBody,
    CardItem as ThreeDCardItem
} from '../components/ui/3d-card';


import {
    Carousel as AppleCarousel, 
    Card as AppleCard 
} from '../components/ui/apple-cards-carousel'; 


const APPLE_CAROUSEL_DATA = [
    {
        category: "Manuscrito Colonial",
        title: "Carta Real de 1750",
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/1801_Antoine-Jean_Gros_-_Bonaparte_on_the_Bridge_at_Arcole.jpg", 
        content: (
        <div className="p-4 md:p-6 text-neutral-700 dark:text-neutral-200 space-y-3">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Correspondencia Virreinal</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/1801_Antoine-Jean_Gros_-_Bonaparte_on_the_Bridge_at_Arcole.jpg" alt="Detalle Sello Real" className="rounded-md shadow w-full mb-3" />
            <p className="text-sm md:text-base">
                Esta carta, enviada desde la corona española, detalla instrucciones administrativas para el Alto Perú.
                Un documento crucial para entender la burocracia y el control colonial en la región.
            </p>
            <p className="text-xs italic">Escrita en papel verjurado con tinta ferrogálica.</p>
        </div>
        ),
    },
    {
        category: "Fotografía Fundacional",
        title: "Construcción del Palacio",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg",
        content: (
        <div className="p-4 md:p-6 text-neutral-700 dark:text-neutral-200 space-y-3">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Albores de la República</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg" alt="Obreros construyendo el palacio" className="rounded-md shadow w-full mb-3" />
            <p className="text-sm md:text-base">
                Una rara fotografía que captura una de las primeras fases de construcción del Palacio de Gobierno en Sucre.
                Testimonio visual del esfuerzo por establecer los símbolos de la nueva nación.
            </p>
        </div>
        ),
    },
    {
        category: "Arte Indígena",
        title: "Textil Ceremonial Andino",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Siege-alesia-vercingetorix-jules-cesar.jpg", 
        content: (
        <div className="p-4 md:p-6 text-neutral-700 dark:text-neutral-200 space-y-3">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Tejiendo la Cosmovisión</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Siege-alesia-vercingetorix-jules-cesar.jpg" alt="Detalle iconografía textil" className="rounded-md shadow w-full mb-3" />
            <p className="text-sm md:text-base">
                Un exquisito textil ceremonial de la región andina, cuyos patrones y colores narran historias ancestrales
                y representan la conexión profunda con la naturaleza y el cosmos.
            </p>
            <p className="text-xs italic">Elaborado con fibras de alpaca y tintes naturales.</p>
        </div>
        ),
    },
    
];


const appleCarouselItems = APPLE_CAROUSEL_DATA.map((card, index) => (
    <AppleCard card={card} index={index} key={card.title + "-" + index} layout />
));


function HomePage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-16 bg-white dark:bg-darkBase min-h-screen transition-colors duration-300">

            <section className="text-center space-y-4 animation-fadeIn">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-textDark">
                    Archivo Bicentenario de Bolivia
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Preservando la memoria de una nación, digitalizando el pasado para las futuras generaciones.
                </p>
                <Link to="/search">
                    <Button variant="contrast" className="mt-4 text-lg px-8 py-3">
                        Explorar Documentos
                    </Button>
                </Link>
            </section>

            <section className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">¿Qué es el Repositorio?</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Es una plataforma digital dedicada a conservar y difundir documentos históricos fundamentales del proceso de independencia y formación de Bolivia. Diseñado para investigadores, estudiantes y ciudadanos curiosos.
                </p>
            </section>

            <section className="flex justify-center items-center my-12 md:my-16">
                <ThreeDCardContainer
                    className="inter-var" 
                    containerClassName="py-0" 
                >
                    <ThreeDCardBody className="bg-gray-100 dark:bg-darkSecondary relative group/card dark:hover:shadow-2xl dark:hover:shadow-sky-500/[0.2] border-black/[0.1] dark:border-white/[0.2] w-[calc(100vw-4rem)] sm:w-[35rem] md:w-[45rem] lg:w-[55rem] h-auto rounded-xl p-4 md:p-6 border">
                        <ThreeDCardItem
                            translateZ="80"
                            className="w-full"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/6/64/Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg" 
                                alt="Imagen destacada del Archivo Bicentenario de Bolivia"
                                className="h-auto w-full object-contain rounded-lg group-hover/card:shadow-xl transition-shadow duration-300 max-h-[60vh] md:max-h-[70vh]"
                            />
                        </ThreeDCardItem>
                        <ThreeDCardItem
                            as="h3"
                            translateZ="50"
                            className="text-center text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-200 mt-4"
                        >
                            Una Ventana al Pasado Boliviano
                        </ThreeDCardItem>
                    </ThreeDCardBody>
                </ThreeDCardContainer>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white dark:bg-darkSecondary rounded-xl shadow-md">
                    <FaHistory className="mx-auto text-4xl text-primary mb-4" />
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Memoria Histórica</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Conservamos actas, cartas y decretos clave de la historia boliviana.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-darkSecondary rounded-xl shadow-md">
                    <FaLock className="mx-auto text-4xl text-primary mb-4" />
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Acceso Seguro</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Tus datos están protegidos y el acceso es libre para todos.
                    </p>
                </div>
                <div className="p-6 bg-white dark:bg-darkSecondary rounded-xl shadow-md">
                    <FaFileAlt className="mx-auto text-4xl text-primary mb-4" />
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Contenido Validado</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Los documentos están revisados por instituciones académicas reconocidas.
                    </p>
                </div>
            </section>

            <section className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">¿Cómo funciona?</h2>
                <div className="flex flex-col md:flex-row justify-center gap-8 text-left mt-4">
                    <div className="flex items-start gap-4 max-w-sm mx-auto">
                        <FaSearch className="text-3xl text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">1. Busca documentos</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Utiliza filtros por año, autor o tipo de documento.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 max-w-sm mx-auto">
                        <FaFileAlt className="text-3xl text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">2. Léelos digitalmente</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Visualízalos con nuestro visor tipo libro.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 max-w-sm mx-auto">
                        <FaComments className="text-3xl text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">3. Comenta y comparte</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Comparte tus ideas y debates históricos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-12 md:my-20 w-full">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8 md:mb-12">
                    Galería de Tesoros Documentales
                </h2>
                <AppleCarousel items={appleCarouselItems} />
            </section>

            <section className="text-center mt-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Empieza tu recorrido por la historia de Bolivia 🇧🇴
                </h2>
                <Link to="/search">
                    <Button variant="contrast" className="mt-4 text-lg px-6 py-3">
                        Ver documentos históricos
                    </Button>
                </Link>
            </section>
        </div>
    );
}

export default HomePage;