import React from "react";
import GameWindow from "./GameWindow";
import Pim_Profile from "../assets/Pim_Profile.png";
import Temmy_Profile from "../assets/Temmy_Profile.png";
import Aim_Profile from "../assets/Aim_Profile.png";
import Tata_Profile from "../assets/Tata_Profile.png";
import Potter_Profile from "../assets/Potter_Profile.png";
import Dos_Profile from "../assets/Dos_Profile.png";
import Nut_Profile from "../assets/Nut_Profile.png";
import Fink_Profile from "../assets/Fink_Profile.png";

const PartyScene = () => (
  <GameWindow title="PARTY_GUILD.UI">
    <h2 className="font-thai text-2xl md:text-3xl font-bold mb-10 text-center uppercase text-[#2f3542]">
      Party Members / สมาชิกในทีม
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <TeamMemberCard
        name="Nattakit Rattanarak"
        role="Project Manager"
        emoji={<img src={Temmy_Profile} alt="Temmy_Profile" />}
        bio="หัวหน้าทีมผู้คุมเกม วางแผนทุกด่าน และเปลี่ยน Logic ที่ซับซ้อนให้กลายเป็นเวทมนตร์ของทีม"
      />
      <TeamMemberCard
        name="Pimvichada Janphensuriya"
        role="Frontend Developer"
        emoji={<img src={Pim_Profile} alt="Pim_Profile" />}
        bio="Frontend สายดีไซน์ โค้ดลื่นไหล พร้อมพลังงานจากชาไทยแก้วโปรด"
      />
      <TeamMemberCard
        name="Lalitwadee Tangsriwong"
        role="Frontend Developer"
        emoji={<img src={Aim_Profile} alt="Aim_Profile" />}
        bio="Frontend ผู้เชื่อว่า 99 ใน Roblox คือที่สุด และ UI ต้องปังเหมือนเลเวลอัป"
      />
      <TeamMemberCard
        name="Onphairin Chandee"
        role="UX/UI Designer"
        emoji={<img src={Fink_Profile} alt="Fink_Profile" />}
        bio="นักออกแบบ UX/UI ผู้เปลี่ยนไอเดียให้กลายเป็นประสบการณ์ที่ใช้ง่ายและสวยงาม"
      /> 
      <TeamMemberCard
        name="Kirati Amathin"
        role="Testter"
        emoji={<img src={Tata_Profile} alt="Tata_Profile" />}
        bio="Tester สายบู๊ ลุยทุกบั๊ก ไม่ปล่อยให้เออเรอร์รอดออกไปจากระบบ"
      />
      <TeamMemberCard
        name="Kritphat Onsuwan"
        role="FullStack Developer"
        emoji={<img src={Nut_Profile} alt="Nut_Profile" />}
        bio="Full Stack ที่ขับได้ครบทุกเกียร์ จัดการได้ทั้งหน้าเว็บและหลังบ้าน"
      />
      <TeamMemberCard
        name="Sutthipong Pikunyam"
        role="FullStack Developer"
        emoji={<img src={Dos_Profile} alt="Dos_Profile" />}
        bio="Full Stack ผู้ดูแลหลายส่วนของระบบ พร้อมเชื่อมทุกอย่างให้ทำงานร่วมกันอย่างลงตัว"
      />
      <TeamMemberCard
        name="Punnapong Akkarachotinan"
        role="FullStack Developer"
        emoji={<img src={Potter_Profile} alt="Potter_Profile" />}
        bio="Full Stack สายอเนกประสงค์ รับมือได้ทุกงาน และพร้อมซัพพอร์ตทีมทุกสถานการณ์"
      />
    </div>
  </GameWindow>
);

const TeamMemberCard = ({ name, role, emoji, bio }) => (
  <div className="border-[4px] border-[#2f3542] p-4 md:p-6 bg-gray-50 flex flex-col h-full hover:bg-white hover:translate-y-[-4px] transition-all ]">
    <div className="text-6xl md:text-7xl mb-4 text-center  drop-shadow-md shrink-0">
      {emoji}
    </div>
    <div className="text-center mb-4 border-b-2 border-[#2f3542] pb-3 shrink-0">
      <h3 className="font-pixel text-[10px] md:text-xs mb-2 uppercase">
        {name}
      </h3>
      <div className="inline-block bg-[#ff7eb615] px-3 py-1 border-[2px] border-[#ff7eb6] ">
        <p className="font-pixel text-[8px] md:text-[10px] text-[#ff7eb6] uppercase leading-relaxed ">
          {role}
        </p>
      </div>
    </div>
    <div className="flex-1 flex flex-col justify-center mb-4 px-1">
      <p className="text-lg md:text-xl leading-tight text-gray-700 text-center italic font-thai font-light">
        "{bio}"
      </p>
    </div>
    <div className="pt-3 border-t-2 border-dashed border-gray-300 flex justify-center gap-2 items-center shrink-0">
      <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[1px_1px_0px_black]" />
      <span className="font-pixel text-[8px] text-gray-400">ONLINE</span>
    </div>
  </div>
);

export default PartyScene;
