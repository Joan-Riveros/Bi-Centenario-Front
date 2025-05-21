import React from 'react'
import ForoCard from './ForoCard'

function TopicList({ topics, loading }) {
    if (loading) {
        return <p className="text-center col-span-2">Cargando temas...</p>
    }

    if (topics.length === 0) {
        return <p className="text-center col-span-2">No hay temas en esta categoría.</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {topics.map((topic) => (
                <ForoCard key={topic.id} topic={topic} />
            ))}
        </div>
    )
}

export default TopicList
