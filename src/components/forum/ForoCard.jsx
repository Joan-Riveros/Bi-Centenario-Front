import React from 'react'
import { Link } from 'react-router-dom'
import { FiMessageCircle } from 'react-icons/fi'

function ForoCard({ topic }) {
    return (
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-darkSecondary shadow hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold text-primary dark:text-accent tracking-tight mb-3">
                {topic.title}
            </h2>

            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                {topic.content}
            </p>

            <div className="flex items-center justify-between mt-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span>
                    📅 Fecha de Publicación: {new Date(topic.created_at).toLocaleDateString()}
                </span>
                {topic.num_respuestas !== undefined && (
                    <span className="flex items-center gap-1">
                        <FiMessageCircle /> {topic.num_respuestas} respuestas
                    </span>
                )}
            </div>

            <Link
                to={`/foro/${topic.id}`}
                className="inline-block mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
                Ver discusión →
            </Link>
        </div>
    )
}

export default ForoCard
