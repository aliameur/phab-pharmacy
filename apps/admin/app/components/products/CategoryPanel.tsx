import react from 'react';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import ProductItem from './ProductItem';

interface Props {
    products: PricedProduct[];
    category: {
        handle : string;
    };
}

export default function CategoryPanel({ products, category} : Props) {

    return (
        <div className='flex flex-col items-left w-full p-4 my-4 bg-white dark:bg-gray-800 dark:text-white'>
            <h1 className='mb-4 text-4xl font-extrabold text-gray-900 dark:text-white'>{category.handle}</h1>
            <div className="carousel carousel-center p-4 space-x-4 rounded-box">
                {products.map(product => (
                    <ProductItem product={product} />
                ))}
            </div>
        </div>
    );
}
