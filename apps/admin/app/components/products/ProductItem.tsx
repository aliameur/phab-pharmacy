import React from "react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

interface Props {
    product: PricedProduct;
}

export default function ProductsViewer({ product }: Props) {

    return (
        <div className="carousel-item">
            <div className="p-2 bg-slate-700 rounded-lg shadow-lg">
                <img src={product.thumbnail ?? ''} alt={product.title} className='h-52 w-52 px-4 pt-4' />
                <div className="flex items-center space-x-2 p-4">
                    <span className="truncate">{product.title}</span>
                    <button className="p-1">
                        <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>
                
            </div>
        </div>
    );
};