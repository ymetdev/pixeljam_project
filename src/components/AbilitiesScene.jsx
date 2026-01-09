import React from "react";
import GameWindow from "./GameWindow";
import { Sword, Wand2, Smartphone, Sparkles } from "lucide-react";

const AbilitiesScene = () => (
  <GameWindow title="SKILLS_MENU.EXE">
    <h2 className="font-thai text-2xl md:text-3xl font-bold mb-8 border-b-4 border-gray-100 pb-4 uppercase text-[#2f3542]">
      Abilities / ความสามารถ
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <SkillItem
        icon={<Sword className="text-pink-500" />}
        title="Web Architecture"
        desc="ออกแบบและพัฒนาเว็บไซต์ด้วยโครงสร้างที่แข็งแกร่ง มุ่งเน้นประสิทธิภาพและความปลอดภัย"
      />
      <SkillItem
        icon={<Wand2 className="text-blue-500" />}
        title="Interactive Design"
        desc="สร้างสรรค์ UI ที่สวยงามและลื่นไหล พร้อมระบบ Animation ที่ช่วยยกระดับประสบการณ์ผู้ใช้"
      />
      <SkillItem
        icon={<Smartphone className="text-yellow-500" />}
        title="Application Development"
        desc="เปลี่ยนไอเดียให้เป็นแอปพลิเคชันที่ใช้งานได้จริง ครอบคลุมการทำงานในทุกแพลตฟอร์ม"
      />
      <SkillItem
        icon={<Sparkles className="text-purple-500" />}
        title="Branding & Identity"
        desc="สร้างตัวตนและเอกลักษณ์ให้แบรนด์ของคุณโดดเด่น และเป็นที่จดจำในโลกดิจิทัล"
      />
    </div>
  </GameWindow>
);

const SkillItem = ({ icon, title, desc }) => (
  <div className="flex gap-5 p-5 border-[4px] border-dashed border-gray-200 hover:border-solid hover:border-[#2f3542] transition-all group cursor-pointer bg-white shadow-sm hover:shadow-md">
    <div className="bg-gray-50 p-4 border-[2px] border-gray-200 group-hover:bg-[#ff7eb620] group-hover:border-[#ff7eb6] flex items-center justify-center shrink-0">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-pixel text-[10px] md:text-[12px] uppercase text-[#2f3542]">
          {title}
        </h3>
      </div>
      <p className="text-lg md:text-xl text-gray-600 font-thai leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default AbilitiesScene;
