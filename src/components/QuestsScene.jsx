import React, { useState, useMemo, useEffect } from "react";
import {
  Info,
  ExternalLink,
  CheckCircle2,
  Search,
  X,
  ChevronDown,
} from "lucide-react";

// --- GameWindow Component ---
const GameWindow = ({ children, title, isModal, onClose }) => {
  if (isModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-sans">
        <div className="bg-white border-[4px] border-[#2f3542] w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col shadow-[12px_12px_0px_rgba(0,0,0,0.3)]">
          <div className="bg-[#2f3542] p-3 flex justify-between items-center shrink-0">
            <span className="text-white font-mono text-xs font-bold uppercase tracking-widest pl-2">
              {title}
            </span>
            <button
              onClick={onClose}
              className="text-white hover:text-pink-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b-[6px] md:border-[6px] border-[#2f3542] w-full h-full flex flex-col overflow-hidden font-sans">
      {/* OS-Style Title Bar - ปรับขนาดให้ดูมีน้ำหนักขึ้น */}
      <div className="bg-[#2f3542] p-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5 ml-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-white/40 font-mono text-[11px] font-bold uppercase tracking-[0.4em] mr-8">
            {title}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f9f9fb]">
        {children}
      </div>
    </div>
  );
};

// --- QuestCard Component ---
const QuestCard = ({ name, desc, category, onDetails }) => (
  <div
    onClick={onDetails}
    className="bg-white border-[3px] border-[#2f3542] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-all cursor-pointer group shadow-[4px_4px_0px_#2f3542] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#ff7eb620]"
  >
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-8 h-8 bg-green-100 border-[2.5px] border-green-500 flex items-center justify-center text-green-600 shrink-0 font-bold text-sm shadow-inner">
          ✓
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest leading-none mb-1">
            {category}
          </span>
          <h3 className="text-sm md:text-base font-black group-hover:text-pink-600 leading-none uppercase tracking-wide truncate">
            {name}
          </h3>
        </div>
      </div>
      <p className="text-sm text-gray-500 pl-11 truncate font-thai leading-snug">
        {desc}
      </p>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onDetails();
      }}
      className="shrink-0 flex items-center justify-center gap-2 text-xs font-bold bg-[#f1f2f6] border-[2.5px] border-[#2f3542] px-4 py-2 shadow-[3px_3px_0px_#2f3542] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all font-thai"
    >
      <Info size={16} /> ดูรายละเอียด
    </button>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const INITIAL_COUNT = 5;
  const [displayLimit, setDisplayLimit] = useState(INITIAL_COUNT);

  const questData = [
    {
      id: 1,
      name: "E-Commerce Dungeon",
      category: "E-COMMERCE",
      desc: "แพลตฟอร์มขายสินค้าที่รองรับผู้ใช้งานหลักแสนคนต่อวัน",
      emoji: "🛍️",
      tech: ["React", "Node.js", "Redis", "PostgreSQL"],
      details:
        "โปรเจกต์ Marketplace ขนาดใหญ่ที่รองรับการชำระเงินหลายรูปแบบและการจัดการสต็อกสินค้าแบบ Real-time พร้อมระบบรักษาความปลอดภัยขั้นสูงสุด",
    },
    {
      id: 2,
      name: "Social Hub Quest",
      category: "SOCIAL",
      desc: "คอมมูนิตี้สำหรับเหล่านักสะสม Pixel Art ทั่วโลก",
      emoji: "🖼️",
      tech: ["Next.js", "Tailwind CSS", "Firebase", "Web3"],
      details:
        "พื้นที่สำหรับศิลปินดิจิทัลในการแบ่งปันผลงานพิกเซลอาร์ต มีระบบประมูล NFT และห้องแชทสไตล์เรโทรสำหรับสมาชิก",
    },
    {
      id: 3,
      name: "Crypto Vault Raid",
      category: "BLOCKCHAIN",
      desc: "ระบบจัดการสินทรัพย์ดิจิทัลที่มีความปลอดภัยสูงสุด",
      emoji: "🔐",
      tech: ["Flutter", "GraphQL", "Python", "Docker"],
      details:
        "แอปพลิเคชันสำหรับตรวจสอบและจัดการเหรียญคริปโต พร้อมระบบแจ้งเตือนราคาแบบด่วนและกราฟวิเคราะห์แนวโน้มตลาด",
    },
    {
      id: 4,
      name: "Inventory Mage Tool",
      category: "E-COMMERCE",
      desc: "เครื่องมือจัดการคลังสินค้าอัจฉริยะสำหรับร้านค้า",
      emoji: "📦",
      tech: ["Vue.js", "Go", "MongoDB"],
      details:
        "ระบบหลังบ้านที่ช่วยพ่อค้าแม่ค้าออนไลน์วิเคราะห์ยอดขายและทำนายแนวโน้มสินค้าที่กำลังจะหมดสต็อกอัตโนมัติ",
    },
    {
      id: 5,
      name: "SIInventory Mage Tool",
      category: "E-COMMERCE",
      desc: "เครื่องมือจัดการคลังสินค้าอัจฉริยะสำหรับร้านค้า",
      emoji: "📦",
      tech: ["Vue.js", "Go", "MongoDB"],
      details:
        "ระบบหลังบ้านที่ช่วยพ่อค้าแม่ค้าออนไลน์วิเคราะห์ยอดขายและทำนายแนวโน้มสินค้าที่กำลังจะหมดสต็อกอัตโนมัติ",
    },
  ];

  const filters = ["ALL", "E-COMMERCE", "SOCIAL", "BLOCKCHAIN"];

  const filteredQuests = useMemo(() => {
    return questData.filter((q) => {
      const matchesFilter =
        activeFilter === "ALL" || q.category === activeFilter;
      const matchesSearch =
        q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    setDisplayLimit(INITIAL_COUNT);
  }, [activeFilter, searchQuery]);

  const visibleQuests = filteredQuests.slice(0, displayLimit);
  const hasMore = filteredQuests.length > displayLimit;

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
      <GameWindow title="WORLD_MAP.LOG">
        {/* Header Area - ปรับ Padding และขนาด Font ให้สมดุล */}
        <div className="sticky top-0 z-20 bg-white border-b-[4px] border-gray-100 p-6 md:p-8 space-y-6 shrink-0">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-xl md:text-2xl font-black uppercase text-[#2f3542] flex items-center gap-3 tracking-tight">
              <span className="bg-[#2f3542] text-white px-2.5 py-1 text-xs">
                LOG_ENTRY
              </span>
              Missions Completed
            </h2>

            <div className="relative w-full lg:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="ค้นหาภารกิจ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-[3.5px] border-[#2f3542] pl-11 pr-10 py-2.5 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all text-sm font-bold font-thai placeholder:text-gray-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] md:text-xs px-4 py-2 border-[3px] font-black tracking-widest transition-all ${
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

        {/* Scrollable Quest List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-4">
            {visibleQuests.length > 0 ? (
              <>
                {visibleQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    name={quest.name}
                    desc={quest.desc}
                    category={quest.category}
                    onDetails={() => setSelectedQuest(quest)}
                  />
                ))}

                {hasMore && (
                  <div className="pt-6 flex justify-center pb-8">
                    <button
                      onClick={() => setDisplayLimit((prev) => prev + 3)}
                      className="group flex items-center gap-3 bg-white border-[3px] border-[#2f3542] px-8 py-3 font-black text-xs uppercase tracking-[0.2em] shadow-[5px_5px_0px_#2f3542] hover:shadow-[7px_7px_0px_#2f3542] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all font-thai"
                    >
                      โหลดภารกิจเพิ่มเติม
                      <ChevronDown
                        size={18}
                        className="group-hover:translate-y-1 transition-transform"
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border-[4px] border-dashed border-gray-200 bg-white">
                <p className="text-gray-400 font-bold font-thai text-lg">
                  ไม่พบข้อมูลภารกิจที่คุณกำลังค้นหา... 👾
                </p>
              </div>
            )}
            <div className="h-10"></div>
          </div>
        </div>
      </GameWindow>

      {/* Modal for Details - ปรับขนาดให้อ่านง่าย */}
      {selectedQuest && (
        <GameWindow
          isModal
          title={`LOG_DETAIL: ${selectedQuest.name}`}
          onClose={() => setSelectedQuest(null)}
        >
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b-4 border-gray-100 pb-8">
              <div className="text-5xl p-5 bg-gray-50 border-[3.5px] border-[#2f3542] shadow-xl shrink-0">
                {selectedQuest.emoji}
              </div>
              <div className="text-center sm:text-left min-w-0">
                <div className="text-[11px] font-bold text-pink-500 mb-1.5 uppercase tracking-widest leading-none">
                  {selectedQuest.category}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#2f3542] uppercase leading-tight mb-2">
                  {selectedQuest.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 font-bold text-sm">
                  <CheckCircle2 size={18} /> MISSION COMPLETED
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase text-[#2f3542] border-l-4 border-[#ff7eb6] pl-3 tracking-widest">
                Mission Description
              </h4>
              <p className="text-gray-700 font-thai text-base md:text-lg leading-relaxed">
                {selectedQuest.details}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase text-[#2f3542] border-l-4 border-[#a29bfe] pl-3 tracking-widest">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedQuest.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-white border-[2.5px] border-[#a29bfe] px-3 py-1 text-[11px] font-bold uppercase text-[#a29bfe]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t-4 border-dashed border-gray-100 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#a29bfe20] text-[#2f3542] font-black text-xs py-4 border-[3px] border-[#2f3542] shadow-[5px_5px_0px_#2f3542] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all uppercase font-thai">
                <ExternalLink size={18} /> เยี่ยมชมโปรเจกต์
              </button>
              <button
                onClick={() => setSelectedQuest(null)}
                className="flex-1 bg-[#2f3542] text-white font-black text-xs py-4 shadow-[5px_5px_0px_#ff7eb6] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#ff7eb6] active:translate-y-0 active:shadow-none transition-all uppercase tracking-widest font-thai"
              >
                กลับไปที่รายการ
              </button>
            </div>
          </div>
        </GameWindow>
      )}

      {/* Custom CSS for a clean scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f2f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2f3542;
          border-radius: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff7eb6;
        }
      `}</style>
    </div>
  );
}
