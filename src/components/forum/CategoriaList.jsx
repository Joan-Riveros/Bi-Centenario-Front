import React from 'react'
import CategoriaTag from './CategoriaTag'

function CategoriaList({ categories, selectedCategoryId, onSelect }) {
    return (
        <div className="flex flex-wrap gap-2 justify-center mt-2">
            {categories.map((cat) => (
                <CategoriaTag
                    key={cat.id}
                    category={cat}
                    isActive={cat.id === selectedCategoryId}
                    onClick={onSelect}
                />
            ))}
        </div>
    )
}

export default CategoriaList
