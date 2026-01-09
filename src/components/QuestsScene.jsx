import React, { useState } from "react";
import GameWindow from "./GameWindow";
import { Info, ExternalLink, CheckCircle2 } from "lucide-react";

const QuestsScene = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const questData = [
    {
      id: 1,
      name: "E-Commerce Dungeon",
      category: "E-COMMERCE",
      desc: "แพลตฟอร์มขายสินค้าที่รองรับผู้ใช้งานหลักแสนคนต่อวัน",
      details:
        "โปรเจกต์นี้เป็นการสร้างระบบ Marketplace ขนาดใหญ่ที่รองรับการชำระเงินหลายรูปแบบ การจัดการสต็อกสินค้าแบบ Real-time และระบบรักษาความปลอดภัยของข้อมูลลูกค้าขั้นสูงสุด",
      emoji: "🛍️",
      tech: ["React", "Node.js", "Redis", "PostgreSQL"],
    },
    {
      id: 2,
      name: "Social Hub Quest",
      category: "SOCIAL",
      desc: "คอมมูนิตี้สำหรับเหล่านักสะสม Pixel Art ทั่วโลก",
      details:
        "พื้นที่สำหรับศิลปินดิจิทัลในการแบ่งปันผลงานพิกเซลอาร์ต มีระบบประมูล NFT และห้องแชทสไตล์เรโทรสำหรับสมาชิก",
      emoji: "🖼️",
      tech: ["Next.js", "Tailwind CSS", "Firebase", "Web3"],
    },
    {
      id: 3,
      name: "Crypto Vault Raid",
      category: "BLOCKCHAIN",
      desc: "ระบบจัดการสินทรัพย์ดิจิทัลที่มีความปลอดภัยระดับสูงสุด",
      details:
        "แอปพลิเคชันสำหรับตรวจสอบและจัดการเหรียญคริปโต พร้อมระบบแจ้งเตือนราคาแบบด่วนและกราฟวิเคราะห์แนวโน้มตลาด",
      emoji: "🔐",
      tech: ["Flutter", "GraphQL", "Python", "Docker"],
    },
    {
      id: 4,
      name: "Inventory Mage Tool",
      category: "E-COMMERCE",
      desc: "เครื่องมือจัดการคลังสินค้าอัจฉริยะสำหรับร้านค้าขนาดกลาง",
      details:
        "ระบบหลังบ้านที่ช่วยพ่อค้าแม่ค้าออนไลน์วิเคราะห์ยอดขายและทำนายแนวโน้มสินค้าที่กำลังจะหมดสต็อกอัตโนมัติ",
      emoji: "📦",
      tech: ["Vue.js", "Go", "MongoDB"],
    },
  ];

  const filters = ["ALL", "E-COMMERCE", "SOCIAL", "BLOCKCHAIN"];
  const filteredQuests =
    activeFilter === "ALL"
      ? questData
      : questData.filter((q) => q.category === activeFilter);

  return (
    <>
      <GameWindow title="WORLD_MAP.MAP">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b-4 border-gray-100 pb-6">
          <h2 className="font-thai text-2xl md:text-3xl font-bold uppercase text-[#2f3542]">
            Completed Quests
          </h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-pixel text-[8px] md:text-[10px] px-3 py-1.5 border-[3px] transition-all ${
                  activeFilter === f
                    ? "bg-[#ff7eb6] border-[#2f3542] text-white"
                    : "bg-white border-gray-200 text-gray-400 hover:border-[#2f3542]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {filteredQuests.length > 0 ? (
            filteredQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                name={quest.name}
                desc={quest.desc}
                onDetails={() => setSelectedQuest(quest)}
              />
            ))
          ) : (
            <div className="text-center py-12 border-4 border-dashed border-gray-100">
              <p className="font-thai text-gray-400">
                ยังไม่มีภารกิจในหมวดหมู่นี้...
              </p>
            </div>
          )}
        </div>
      </GameWindow>

      {/* Modal for Details */}
      {selectedQuest && (
        <GameWindow
          isModal
          title={`QUEST_DETAIL: ${selectedQuest.name}`}
          onClose={() => setSelectedQuest(null)}
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b-4 border-gray-100 pb-6">
              <div className="text-7xl p-6 bg-gray-50 border-[4px] border-[#2f3542] shrink-0 shadow-lg">
                {selectedQuest.emoji}
              </div>
              <div className="text-center sm:text-left">
                <div className="font-pixel text-[10px] text-pink-500 mb-2 uppercase">
                  {selectedQuest.category}
                </div>
                <h3 className="font-pixel text-xl md:text-2xl mb-3 text-[#2f3542] uppercase leading-none">
                  {selectedQuest.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-green-600 font-bold font-thai text-xl">
                  <CheckCircle2 size={24} /> MISSION COMPLETED
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-pixel text-[12px] uppercase text-[#2f3542] border-l-8 border-[#ff7eb6] pl-4">
                Mission Description
              </h4>
              <p className="text-gray-700 font-thai text-xl md:text-2xl leading-relaxed">
                {selectedQuest.details}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-pixel text-[12px] uppercase text-[#2f3542] border-l-8 border-[#a29bfe] pl-4">
                Tech Stack Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedQuest.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-[#a29bfe15] border-[3px] border-[#a29bfe] px-4 py-2 text-md font-pixel uppercase text-[#a29bfe] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-8 border-t-4 border-dashed border-gray-200 flex justify-center sm:justify-end">
              <button
                onClick={() => setSelectedQuest(null)}
                className="w-full sm:w-auto bg-[#2f3542] text-white font-pixel text-[12px] px-10 py-5 shadow-[6px_6px_0px_#ff7eb6] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all uppercase"
              >
                Close Log
              </button>
            </div>
          </div>
        </GameWindow>
      )}
    </>
  );
};

const QuestCard = ({ name, desc, onDetails }) => (
  <div className="bg-white border-[4px] border-[#2f3542] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50 transition-colors cursor-pointer group shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
    <div className="flex-1 w-full">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 bg-green-100 border-[3px] border-green-500 flex items-center justify-center text-green-600 shrink-0 font-bold text-xl shadow-inner">
          ✓
        </div>
        <h3 className="font-pixel text-[12px] md:text-[14px] group-hover:text-[#ff7eb6] leading-none uppercase">
          {name}
        </h3>
      </div>
      <p className="text-xl md:text-2xl text-gray-500 pl-14 leading-tight font-thai">
        {desc}
      </p>

      {/* 2 Buttons for each quest */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 pl-0 sm:pl-14">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="flex items-center justify-center gap-3 font-thai text-[16px] font-medium bg-[#f1f2f6] border-[4px] border-[#2f3542] px-5 py-3 shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all hover:bg-white"
        >
          <Info size={18} /> ดูรายละเอียดภารกิจ
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center justify-center gap-3 font-thai text-[16px] font-medium bg-[#a29bfe20] border-[4px] border-[#2f3542] px-5 py-3 shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all hover:bg-[#a29bfe] hover:text-white"
        >
          <ExternalLink size={18} /> ไปยังหน้าเว็บไซต์
        </button>
      </div>
    </div>
  </div>
);

export default QuestsScene;
