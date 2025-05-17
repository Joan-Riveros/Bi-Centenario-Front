import React from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaLock, FaSearch, FaFileAlt, FaComments } from 'react-icons/fa';
import Button from '../components/Button';

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
