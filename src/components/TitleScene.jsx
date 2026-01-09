import React from "react";

const TitleScene = ({ onStart }) => (
  <div className="text-center flex flex-col items-center justify-center py-4 md:py-12 w-full animate-[zoomIn_0.3s_ease-out]">
    <div className="animate-float mb-6 md:mb-10">
      <div className="relative inline-block mb-4">
        <div className="text-7xl md:text-9xl mb-4 text-[#2f3542] drop-shadow-lg">
          🛸
        </div>
        <div className="absolute -top-2 -right-4 bg-[#ff7eb6] p-2 md:p-3 border-[3px] md:border-[4px] border-[#2f3542] font-pixel text-[8px] md:text-[10px] text-white uppercase shadow-[4px_4px_0_black]">
          READY!
        </div>
      </div>
      <h1 className="font-pixel text-3xl md:text-6xl lg:text-8xl text-white drop-shadow-[8px_8px_0_#2f3542] tracking-tighter mb-6 uppercase">
        Pixel Jam
      </h1>
      <div className="inline-block bg-[#2f3542] px-6 py-3 border-[3px] border-white shadow-xl">
        <p className="font-pixel text-[10px] md:text-[14px] text-white tracking-widest uppercase">
          A Creative Software House
        </p>
      </div>
    </div>

    <div className="space-y-4 w-full max-w-[300px] md:max-w-md">
      <button
        onClick={onStart}
        className="w-full bg-white border-[5px] border-[#2f3542] p-5 md:p-8 font-pixel text-sm md:text-lg shadow-[8px_8px_0_#2f3542] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all active:bg-gray-100 uppercase"
      >
        Press Start
      </button>
    </div>
  </div>
);

export default TitleScene;
