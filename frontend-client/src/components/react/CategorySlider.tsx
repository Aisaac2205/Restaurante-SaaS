import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Category } from '@/types';

interface Props {
    categories: Category[];
}

export const CategorySlider: React.FC<Props> = ({ categories }) => {
    const [activeCategory, setActiveCategory] = useState<number>(categories[0]?.id || 0);

    // Handle scrolling to section
    const scrollToCategory = (categoryId: number) => {
        setActiveCategory(categoryId);
        const element = document.getElementById(`category-${categoryId}`);
        if (element) {
            const offset = 180; // Header height + padding adjustments
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white sticky top-16 z-30 shadow-sm border-b border-gray-100 py-3">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={12}
                    slidesPerView="auto"
                    className="w-full"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} style={{ width: 'auto' }}>
                            <button
                                onClick={() => scrollToCategory(category.id)}
                                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${activeCategory === category.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}
                            >
                                {category.name}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
