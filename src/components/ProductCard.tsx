import React from "react";
import Image from "next/image";
interface propsTypes {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
}

const ProductCard: React.FC<propsTypes> = ({
  img,
  title,
  desc,
  rating,
  price,
}) => {
  // const
  return (
    <div className="border border-gray-200 rounded-xl max-w-[400px] p-4">
      <div>
        <Image
          className="w-full h-auto"
          src={img}
          width={200}
          height={200}
          alt={title}
        />
      </div>
      <div className="space-y-2 py-2">
        <h2 className="text-orange">{title}</h2>
        <p className="text-gray-500 max-w-[150px]">{desc}</p>
        <div className="font-bold flex gap-4">
            ${price}
            <del className="text-gray-400 font-normal">${parseInt(price)+ 50 }.00</del>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
