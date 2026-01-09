import React from "react";
import { X } from "lucide-react";

// เพิ่ม prop noPadding เพื่อควบคุมระยะขอบข้างใน
const GameWindow = ({
  children,
  title,
  onClose,
  isModal = false,
  noPadding = false,
}) => (
  <div
    className={`
    ${
      isModal
        ? "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2f3542]/80 backdrop-blur-sm"
        : "relative w-full"
    }
  `}
  >
    <div
      className={`
      relative bg-[#fff] border-[4px] border-[#2f3542] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] md:shadow-[12px_12px_0px_rgba(0,0,0,0.1)] flex flex-col w-full animate-[zoomIn_0.3s_ease-out]
      ${isModal ? "max-w-2xl" : "max-w-6xl"} 
    `}
    >
      <div className="bg-[#2f3542] p-2 flex justify-between items-center shrink-0">
        <span className="font-pixel text-[10px] md:text-[12px] text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 border border-white" /> {title}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 transition-colors p-1"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {/* ปรับตรงนี้: ถ้า noPadding เป็น true ให้ p-0 ถ้าไม่ให้ใช้ padding เดิม */}
      <div
        className={`${
          noPadding ? "p-0" : "p-4 md:p-8"
        } overflow-y-auto max-h-[85vh] font-thai text-lg md:text-xl leading-relaxed`}
      >
        {children}
      </div>
    </div>
  </div>
);

export default GameWindow;
