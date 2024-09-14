import React from 'react';
import { cn } from "../../lib/utils";

// Import local images and GIFs
import heartImage from '../../assets/images/carpentary.jpeg';  // Assuming this path for local image
import litmusImage from '../../assets/images/litmus.jpeg'; // Assuming this path for local image
import circuitImage from '../../assets/images/electrical.jpeg'; // Assuming this path for local image
import circuitGif from '../../assets/images/electrical.gif'; // Assuming this path for local image
import heartGif from '../../assets/images/carpentary.gif';  // Assuming this path for local GIF
import litmusGif from '../../assets/images/litmus.gif'; // Assuming this path for local GIF
import algebraImage from '../../assets/images/Algebra.jpg'; // Assuming this path for local GIF
import civilImage from '../../assets/images/ancient-civil.jpg'; // Assuming this path for local GIF
import cellImage from '../../assets/images/cell.jpg'; // Assuming this path for local GIF
import digestImage from '../../assets/images/digest.jpg'; // Assuming this path for local GIF
import geoImage from '../../assets/images/geo.jpg'; // Assuming this path for local GIF
import lawImage from '../../assets/images/laws-of-motion.jpg'; // Assuming this path for local GIF
import opticsImage from '../../assets/images/optics.jpg'; // Assuming this path for local GIF
import warImage from '../../assets/images/world-war2.jpg'; // Assuming this path for local GIF
import photosynthesisImage from '../../assets/images/photosynthesis.jpg'; // Assuming this path for local GIF
import phImage from '../../assets/images/ph.png'; // Assuming this path for local GIF
import envImage from '../../assets/images/env.jpg'; // Assuming this path for local GIF
import industryImage from '../../assets/images/industry.jpg'; // Assuming this path for local GIF
import acidImage from '../../assets/images/acidbase.jpg'; // Assuming this path for local GIF
import chemImage from '../../assets/images/chemical.jpg'; // Assuming this path for local GIF

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
  "algebra_basics": {
    image: algebraImage,
    gif: null, // No GIF available
  },
  "ancient_civilizations": {
    image: civilImage,
    gif: null, // No GIF available
  },
  "cell_structure": {
    image: cellImage,
    gif: null, // No GIF available
  },
  "human_digestion": {
    image: digestImage,
    gif: null, // No GIF available
  },
  "geography": {
    image: geoImage,
    gif: null, // No GIF available
  },
  "laws_of_motion": {
    image: lawImage,
    gif: null, // No GIF available
  },
  "optics": {
    image: opticsImage,
    gif: null, // No GIF available
  },
  "photosynthesis": {
    image: photosynthesisImage,
    gif: null, // No GIF available
  },
  "world_war_ii": {
    image: warImage,
    gif: null, // No GIF available
  },
  "ph_scale": {
    image: phImage,
    gif: null, // No GIF available
  },
  "environmental_management": {
    image: envImage,
    gif: null, // No GIF available
  },
  "industry": {
    image: industryImage,
    gif: null, // No GIF available
  },
  "acid_base_reactions": {
    image: acidImage,
    gif: null, // No GIF available
  },
  "chemical_indicators": {
    image: chemImage,
    gif: null, // No GIF available
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
          Click on the card to start the course
        </p>
      </div>
    </div>
  );
};

export default Card;
