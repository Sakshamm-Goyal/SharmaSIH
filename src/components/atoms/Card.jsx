import React from 'react';
import { cn } from "../../lib/utils";

// Import local images and GIFs
import heartImage from '../../assets/images/carpentary.jpeg';  // Assuming this path for local image
import litmusImage from '../../assets/images/litmus.jpeg'; // Assuming this path for local image
import circuitImage from '../../assets/images/electrical.jpeg'; // Assuming this path for local image
import heartGif from '../../assets/images/carpentary.gif';  // Assuming this path for local GIF
import litmusGif from '../../assets/images/litmus.gif'; // Assuming this path for local GIF
import circuitGif from '../../assets/images/electrical.gif'; // Assuming this path for local GIF

const assets = {
  "heart": {
    image: heartImage,
    gif: heartGif,
  },
  "litmus-paper": {
    image: litmusImage,
    gif: litmusGif,
  },
  "electrical-circuit": {
    image: circuitImage,
    gif: circuitGif,
  },
  // Add more assets as needed
};

const Card = ({ id, title }) => {
  const { image, gif } = assets[id] || {};

  return (
    <div
      className={cn(
        "group w-full cursor-pointer overflow-hidden relative h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
        "transition-all duration-500",
        "dark:bg-white dark:shadow-lg dark:border dark:border-gray-300"
      )}
    >
      {/* Static Image Thumbnail */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 group-hover:opacity-0"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* GIF on Hover */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: `url(${gif})`,
        }}
      />

      <div className="relative z-10 text-white">
        <h1 className="font-bold text-white text-xl md:text-3xl">{title}</h1>
        <p className="font-normal text-white my-4">
          This card is for some special elements, like displaying background gifs on hover only.
        </p>
      </div>
    </div>
  );
};

export default Card;
