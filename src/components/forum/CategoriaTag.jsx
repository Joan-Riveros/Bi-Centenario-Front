// src/pages/foro/components/CategoriaTag.jsx
import React from 'react'

function CategoriaTag({ category, isActive, onClick }) {
    return (
        <button
            onClick={() => onClick(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                isActive
                ? 'bg-primary text-white border-primary'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            >
            {category.name}
        </button>
    )
}

export default CategoriaTag
