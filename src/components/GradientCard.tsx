import React from "react";

interface GradientCardProps {
  title: string;
  value: string;
  imageSrc: string;
  imageAlt: string;
}

const GradientCard: React.FC<GradientCardProps> = ({ title, value, imageSrc, imageAlt }) => {
  return (
    <div className="bg-gradient-to-r from-[#45F882] to-[#FFBE18] p-[0.1rem] rounded-lg w-full">
      <div className="bg-[#1A1D26] h-fit py-[2rem] flex justify-center items-center gap-4 rounded-lg border-solid border-image-source[linear-gradient(90deg, #45F882 0%, #FFBE18 100%)] border-image-slice-1">
        {/* Text Section */}
        <div className="text-center flex flex-col">
          <p className="font-rajdhani text-white">{title}</p>
          <p className="font-rajdhani font-bold text-white">{value}</p>
        </div>
        {/* Icon Section with Gradient Circle */}
        <div className="relative w-[64px] h-[64px] rounded-full p-[2px] bg-gradient-to-r from-[#45F882] to-[#FFBE18]">
          <div className="flex justify-center items-center w-full h-full rounded-full bg-[#0E1B22]">
            <img src={imageSrc} alt={imageAlt} className="w-[42px] h-[42px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
