import React, { useState, useMemo } from "react";
import { Info, ExternalLink, CheckCircle2, Search, X } from "lucide-react";

// --- Mock GameWindow component for demonstration ---
const GameWindow = ({ children, title, isModal, onClose }) => {
  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white border-[6px] border-[#2f3542] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-[#2f3542] p-3 flex justify-between items-center">
            <span className="text-white font-mono text-sm font-bold uppercase tracking-widest">{title}</span>
            <button onClick={onClose} className="text-white hover:text-pink-400 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-[6px] border-[#2f3542] w-full shadow-[10px_10px_0px_#f1f2f6] overflow-hidden">
      <div className="bg-[#2f3542] p-2 flex items-center gap-2">
        <div className="flex gap-1.5 ml-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-white/60 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mr-8">
            {title}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
};

// --- Main QuestsScene Component ---
const QuestsScene = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

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
     {
      id: 5,
      name: "SIInventory Mage Tool",
      category: "E-COMMERCE",
      desc: "เครื่องมือจัดการคลังสินค้าอัจฉริยะสำหรับร้านค้าขนาดกลาง",
      details:
        "ระบบหลังบ้านที่ช่วยพ่อค้าแม่ค้าออนไลน์วิเคราะห์ยอดขายและทำนายแนวโน้มสินค้าที่กำลังจะหมดสต็อกอัตโนมัติ",
      emoji: "📦",
      tech: ["Vue.js", "Go", "MongoDB"],
    },
  ];

  const filters = ["ALL", "E-COMMERCE", "SOCIAL", "BLOCKCHAIN"];

  // Search and Filter Logic combined
  const filteredQuests = useMemo(() => {
    return questData.filter((q) => {
      const matchesFilter = activeFilter === "ALL" || q.category === activeFilter;
      const matchesSearch = q.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           q.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f1f2f6] p-4 md:p-8 lg:p-12">
      <GameWindow title="WORLD_MAP.MAP">
        <div className="flex flex-col space-y-6 mb-8 border-b-4 border-gray-100 pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#2f3542] tracking-tight">
              Completed Quests
            </h2>

            {/* Search Bar - New Addition */}
            <div className="relative w-full lg:w-72">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="ค้นหาภารกิจ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-[3px] border-[#2f3542] pl-12 pr-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all font-thai placeholder:text-gray-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] md:text-[11px] px-4 py-2 border-[3px] font-bold tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-[#ff7eb6] border-[#2f3542] text-white shadow-[4px_4px_0px_#2f3542]"
                    : "bg-white border-gray-200 text-gray-400 hover:border-[#2f3542] hover:text-[#2f3542]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Quest List */}
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
            <div className="text-center py-20 border-4 border-dashed border-gray-100 bg-gray-50/30">
              <p className="text-gray-400 font-thai text-xl">
                ไม่พบภารกิจที่ตรงกับการค้นหาของคุณ... 👾
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
              <div className="text-6xl p-6 bg-gray-50 border-[4px] border-[#2f3542] shrink-0 shadow-lg">
                {selectedQuest.emoji}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[10px] font-bold text-pink-500 mb-2 uppercase tracking-widest">
                  {selectedQuest.category}
                </div>
                <h3 className="text-xl md:text-2xl mb-3 text-[#2f3542] font-black uppercase leading-none">
                  {selectedQuest.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 font-bold text-lg">
                  <CheckCircle2 size={20} /> MISSION COMPLETED
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase text-[#2f3542] border-l-8 border-[#ff7eb6] pl-4">
                Mission Description
              </h4>
              <p className="text-gray-700 font-thai text-lg md:text-xl leading-relaxed">
                {selectedQuest.details}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase text-[#2f3542] border-l-8 border-[#a29bfe] pl-4">
                Tech Stack Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedQuest.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-[#a29bfe15] border-[3px] border-[#a29bfe] px-3 py-1 text-sm font-bold uppercase text-[#a29bfe] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-8 border-t-4 border-dashed border-gray-200 flex justify-center sm:justify-end">
              <button
                onClick={() => setSelectedQuest(null)}
                className="w-full sm:w-auto bg-[#2f3542] text-white font-bold text-[12px] px-8 py-4 shadow-[5px_5px_0px_#ff7eb6] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#ff7eb6] active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all uppercase tracking-widest"
              >
                Close Log
              </button>
            </div>
          </div>
        </GameWindow>
      )}
    </div>
  );
};

const QuestCard = ({ name, desc, onDetails }) => (
  <div 
    onClick={onDetails}
    className="bg-white border-[4px] border-[#2f3542] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-gray-50 transition-all cursor-pointer group shadow-[6px_6px_0px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#ff7eb620]"
  >
    <div className="flex-1 w-full">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 bg-green-100 border-[3px] border-green-500 flex items-center justify-center text-green-600 shrink-0 font-bold text-xl shadow-inner">
          ✓
        </div>
        <h3 className="text-sm md:text-base font-black group-hover:text-[#a29bfe20] leading-none uppercase tracking-wide transition-colors">
          {name}
        </h3>
      </div>
      <p className="text-lg md:text-xl text-gray-500 pl-14 leading-tight font-thai">
        {desc}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6 pl-0 sm:pl-14">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="flex items-center justify-center gap-2 font-thai text-[15px] font-bold bg-[#f1f2f6] border-[3px] border-[#2f3542] px-4 py-2.5 shadow-[4px_4px_0px_#2f3542] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all hover:bg-white"
        >
          <Info size={16} /> ดูรายละเอียดภารกิจ
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Link implementation here
          }}
          className="flex items-center justify-center gap-2 font-thai text-[15px] font-bold bg-[#a29bfe20] border-[3px] border-[#2f3542] px-4 py-2.5 shadow-[4px_4px_0px_#2f3542] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all hover:bg-[#a29bfe] hover:text-white"
        >
          <ExternalLink size={16} /> ไปยังหน้าเว็บไซต์
        </button>
      </div>
    </div>
  </div>
);

export default QuestsScene;