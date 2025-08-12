// components/commons/MovieCard.tsx
import { MovieProps } from "@/interfaces";
import Image from "next/image";
import React from "react";

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="h-[563px]">
      <div>
        {/*
          Using `Image` component from Next.js for optimization.
          The `width` and `height` are required, but the image will
          scale to fit the container thanks to the Tailwind classes.
        */}
        <Image
          className="h-[430px] w-full rounded-md hover:cursor-pointer object-cover"
          src={posterImage}
          width={430}
          height={430}
          alt={title}
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-xl text-[#E2D609]">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;