// SidebarCategories.tsx
import React from 'react';

interface SidebarCategoriesProps {
    onCategorySelect: (category: string) => void;
}

const SidebarCategories: React.FC<SidebarCategoriesProps> = ({ onCategorySelect }) => {
    const categories = [
        { name: "All" },
        { name: "Private Car" },
        { name: "Boat" },
        { name: "Bicycle" },
        { name: "Taxi" },
        { name: "Subway" },
    ];

    return (
        <ul>
            {categories.map((category) => (
                <li 
                    key={category.name} 
                    className="underline-two" 
                    onClick={() => onCategorySelect(category.name === "All" ? "" : category.name)}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
};

export default SidebarCategories;
