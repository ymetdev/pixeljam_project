import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Users,
  Map as MapIcon,
  Sword,
  Sparkles,
  Smartphone,
  Wand2,
  Mail,
  Heart,
  Star,
  Coins,
  ChevronRight,
  X,
  Plus,
  Shield,
  LayoutGrid,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Info,
  CheckCircle2,
  Filter,
} from "lucide-react";

// --- UI Components ---

// หน้าต่างแสดงผล (Game Window)
const GameWindow = ({ children, title, onClose, isModal = false }) => (
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
      ${isModal ? "max-w-2xl" : "max-w-4xl"}
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
      <div className="p-4 md:p-8 overflow-y-auto max-h-[70vh] font-thai text-lg md:text-xl leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// ปุ่มเมนูที่ปรับเปลี่ยนตามขนาดหน้าจอ (Sidebar / Bottom Nav)
const MenuButton = ({
  children,
  active,
  onClick,
  icon: Icon,
  isBottomNav = false,
}) => {
  if (isBottomNav) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 transition-all ${
          active ? "text-[#ff7eb6] bg-[#f1f2f6]" : "text-gray-500"
        }`}
      >
        <Icon size={24} />
        <span className="font-thai text-[10px] font-medium uppercase truncate w-full text-center px-1">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 border-[4px] transition-all
        ${
          active
            ? "bg-[#ff7eb6] border-[#2f3542] translate-x-2 text-white shadow-none"
            : "bg-white border-[#2f3542] shadow-[4px_4px_0px_#2f3542] hover:translate-x-1 hover:shadow-[2px_2px_0px_#2f3542]"
        }
      `}
    >
      {Icon && <Icon size={22} />}
      <span className="font-thai text-[16px] font-medium uppercase">
        {children}
      </span>
    </button>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentScene, setCurrentScene] = useState("title");

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Mitr:wght@300;400;500&family=VT323&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const navItems = [
    { id: "title", label: "หน้าหลัก", icon: Gamepad2 },
    { id: "abilities", label: "ความสามารถ", icon: Sword },
    { id: "quests", label: "ภารกิจ", icon: MapIcon },
    { id: "party", label: "ปาร์ตี้", icon: Users },
    { id: "boss", label: "บอสใหญ่", icon: Star },
  ];

  const renderScene = () => {
    switch (currentScene) {
      case "title":
        return <TitleScene onStart={() => setCurrentScene("abilities")} />;
      case "abilities":
        return <AbilitiesScene />;
      case "quests":
        return <QuestsScene />;
      case "party":
        return <PartyScene />;
      case "boss":
        return <BossScene />;
      default:
        return <TitleScene />;
    }
  };

  return (
    <div className="min-h-screen bg-[#a29bfe] grid-bg selection:bg-[#ff7eb6] selection:text-white flex flex-col items-center justify-center overflow-x-hidden p-4 md:p-8">
      <style>{`
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .font-vt323 { font-family: 'VT323', monospace; }
        .font-thai { font-family: 'Mitr', sans-serif; }
        
        .grid-bg {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px);
          background-size: 20px 20px;
        }
        @media (min-width: 768px) { .grid-bg { background-size: 40px 40px; } }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Main Game Interface Wrapper */}
      <div className="w-full max-w-7xl flex flex-col gap-6 mb-16 md:mb-0">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start justify-center">
          {/* SIDE NAVIGATION (Desktop Only) */}
          <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0 sticky top-8">
            {navItems.map((item) => (
              <MenuButton
                key={item.id}
                active={currentScene === item.id}
                onClick={() => setCurrentScene(item.id)}
                icon={item.icon}
              >
                {item.label}
              </MenuButton>
            ))}

            <div className="mt-4 p-5 border-[4px] border-[#2f3542] bg-white shadow-[4px_4px_0px_#2f3542]">
              <h4 className="font-pixel text-[10px] mb-3 uppercase text-pink-500">
                Active Quest:
              </h4>
              <p className="font-thai text-[16px] leading-tight text-[#2f3542]">
                "ออกแบบระบบที่รองรับทุกหน้าจออย่างสมบูรณ์"
              </p>
            </div>
          </aside>

          {/* MAIN VIEWPORT */}
          <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px]">
            {renderScene()}
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION (Mobile/Tablet Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[4px] border-[#2f3542] flex justify-around items-stretch shadow-[0_-4px_10px_rgba(0,0,0,0.1)] h-20">
        {navItems.map((item) => (
          <MenuButton
            key={item.id}
            isBottomNav
            active={currentScene === item.id}
            onClick={() => setCurrentScene(item.id)}
            icon={item.icon}
          >
            {item.label}
          </MenuButton>
        ))}
      </nav>
    </div>
  );
}

// --- Scene Components ---

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

const AbilitiesScene = () => (
  <GameWindow title="SKILLS_MENU.EXE">
    <h2 className="font-thai text-2xl md:text-3xl font-bold mb-8 border-b-4 border-gray-100 pb-4 uppercase text-[#2f3542]">
      Abilities / ความสามารถ
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <SkillItem
        icon={<Sword className="text-pink-500" />}
        title="Web Forging"
        level="99"
        desc="เราตีเหล็ก (Code) ให้กลายเป็นเว็บไซต์ที่แข็งแกร่งและทรงพลัง พร้อมลุยทุกสมรภูมิออนไลน์"
      />
      <SkillItem
        icon={<Wand2 className="text-blue-500" />}
        title="UI Sorcery"
        level="85"
        desc="ร่ายมนตร์สร้างสรรค์ Interface ให้สวยงาม ลื่นไหล และน่าหลงใหลด้วย Animation"
      />
      <SkillItem
        icon={<Smartphone className="text-yellow-500" />}
        title="App Alchemy"
        level="90"
        desc="เล่นแร่แปรธาตุไอเดียให้กลายเป็นแอปพลิเคชันที่ใช้งานได้จริงในทุกแพลตฟอร์ม"
      />
      <SkillItem
        icon={<Sparkles className="text-purple-500" />}
        title="Brand Quest"
        level="77"
        desc="สร้างเอกลักษณ์แบรนด์ให้โดดเด่นและเป็นที่จดจำเหมือนตัวเอกในเกม RPG"
      />
    </div>
  </GameWindow>
);

const SkillItem = ({ icon, title, level, desc }) => (
  <div className="flex gap-5 p-5 border-[4px] border-dashed border-gray-200 hover:border-solid hover:border-[#2f3542] transition-all group cursor-pointer bg-white shadow-sm hover:shadow-md">
    <div className="bg-gray-50 p-4 border-[2px] border-gray-200 group-hover:bg-[#ff7eb620] group-hover:border-[#ff7eb6] flex items-center justify-center shrink-0">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-pixel text-[10px] md:text-[12px] uppercase text-[#2f3542]">
          {title}
        </h3>
        <span className="font-pixel text-[8px] text-[#ff7eb6]">
          LVL {level}
        </span>
      </div>
      <p className="text-lg md:text-xl text-gray-600 font-thai leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

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

const PartyScene = () => (
  <GameWindow title="PARTY_GUILD.UI">
    <h2 className="font-thai text-2xl md:text-3xl font-bold mb-10 text-center uppercase text-[#2f3542]">
      Party Members / สมาชิกในทีม
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      <TeamMemberCard
        name="Alex"
        role="Lead Developer"
        emoji="🧑‍💻"
        bio="หัวหน้าทีมพัฒนาที่เปลี่ยน Logic ที่ซับซ้อนให้กลายเป็นเวทมนตร์"
      />
      <TeamMemberCard
        name="Sam"
        role="Art Director"
        emoji="👩‍🎨"
        bio="นักออกแบบ UI/UX ผู้สร้างสรรค์โลกดิจิทัลด้วยความใส่ใจในทุกพิกเซล"
      />
      <TeamMemberCard
        name="Sky"
        role="Project Mage"
        emoji="🧙‍♂️"
        bio="PM ผู้ดูแลโปรเจกต์และปกป้องทีมเพื่อให้ภารกิจสำเร็จลุล่วง"
      />
    </div>
  </GameWindow>
);

const TeamMemberCard = ({ name, role, emoji, bio }) => (
  <div className="border-[4px] border-[#2f3542] p-4 md:p-6 bg-gray-50 flex flex-col h-full hover:bg-white hover:translate-y-[-4px] transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
    <div className="text-6xl md:text-7xl mb-4 text-center animate-float drop-shadow-md shrink-0">
      {emoji}
    </div>
    <div className="text-center mb-4 border-b-2 border-[#2f3542] pb-3 shrink-0">
      <h3 className="font-pixel text-[10px] md:text-xs mb-2 uppercase">
        {name}
      </h3>
      <div className="inline-block bg-[#ff7eb615] px-3 py-1 border-[2px] border-[#ff7eb6]">
        <p className="font-pixel text-[8px] md:text-[10px] text-[#ff7eb6] uppercase leading-none">
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

const BossScene = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    strategy: "",
  });

  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = `New Quest Proposal from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AStrategy: ${formData.strategy}`;
    window.location.href = `mailto:temgoodboi@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <GameWindow title="FINAL_CHALLENGE.BOSS">
      <div className="flex flex-col items-center gap-8 py-2 md:py-6">
        {/* Boss Health Bar */}
        <div className="relative text-center w-full max-w-sm md:max-w-md shrink-0">
          <div className="text-8xl md:text-9xl mb-2 drop-shadow-2xl">🏰</div>
          <div className="h-4 md:h-6 w-full bg-gray-200 border-[3px] border-black mt-6 overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-red-600 animate-pulse"
              style={{ width: "100%" }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-pixel text-[7px] md:text-[10px] text-white uppercase font-bold">
              Boss HP: 100%
            </div>
          </div>
          <div className="font-pixel text-[8px] md:text-[12px] mt-3 text-gray-700 uppercase tracking-widest font-bold">
            Boss: Client Requirements
          </div>
        </div>

        {/* Social Media Links Panel */}
        <div className="w-full bg-[#f1f2f6] border-[4px] border-[#2f3542] p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
          <h3 className="font-thai text-lg md:text-xl mb-8 text-center uppercase tracking-widest font-bold text-[#2f3542]">
            {" "}
            Guild Social Channels / ช่องทางโซเชียลทีม{" "}
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <SocialLink
              icon={<Twitter size={32} />}
              label="Twitter"
              color="text-sky-500"
            />
            <SocialLink
              icon={<Github size={32} />}
              label="Github"
              color="text-slate-800"
            />
            <SocialLink
              icon={<Instagram size={32} />}
              label="Instagram"
              color="text-pink-600"
            />
            <SocialLink
              icon={<Linkedin size={32} />}
              label="Linkedin"
              color="text-blue-700"
            />
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="w-full bg-[#f8f9fa] border-[4px] border-[#2f3542] p-6 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
          <h3 className="font-thai text-xl md:text-2xl mb-4 text-center uppercase font-bold text-[#2f3542]">
            Initiate Battle / เริ่มต้นภารกิจกับเรา
          </h3>
          <p className="text-center text-xl md:text-2xl mb-10 leading-relaxed font-thai text-gray-500 italic">
            ส่งสาส์นท้าทายเพื่อเริ่มโปรเจกต์ใหม่ที่ยิ่งใหญ่ไปด้วยกัน!
          </p>

          <form className="space-y-6" onSubmit={handleSendMail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-thai text-[16px] font-bold uppercase text-[#2f3542] flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 inline-block"></span>{" "}
                  Hero Name (ชื่อของคุณ)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="กรอกชื่อของคุณ..."
                  className="w-full p-4 md:p-5 border-[4px] border-[#2f3542] focus:bg-pink-50 focus:outline-none font-thai text-xl shadow-inner"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="font-thai text-[16px] font-bold uppercase text-[#2f3542] flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 inline-block"></span>{" "}
                  Contact Crystal (อีเมล)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@email.com"
                  className="w-full p-4 md:p-5 border-[4px] border-[#2f3542] focus:bg-blue-50 focus:outline-none font-thai text-xl shadow-inner"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-thai text-[16px] font-bold uppercase text-[#2f3542] flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 inline-block"></span>{" "}
                Battle Strategy (รายละเอียดโปรเจกต์)
              </label>
              <textarea
                placeholder="บอกเราเกี่ยวกับโปรเจกต์ของคุณที่คุณต้องการให้เราสร้างสรรค์..."
                value={formData.strategy}
                onChange={(e) =>
                  setFormData({ ...formData, strategy: e.target.value })
                }
                className="w-full p-4 md:p-5 border-[4px] border-[#2f3542] focus:bg-yellow-50 focus:outline-none font-thai text-xl min-h-[200px] md:min-h-[300px] leading-relaxed shadow-inner"
                rows={8}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff7eb6] text-white border-[5px] border-[#2f3542] p-5 md:p-8 font-thai text-[20px] font-bold shadow-[8px_8px_0px_#2f3542] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all uppercase flex items-center justify-center gap-6"
            >
              <Mail size={24} /> INITIATE BATTLE / ส่งข้อมูลท้าทาย
            </button>
          </form>
        </div>
      </div>
    </GameWindow>
  );
};

// Helper component for social links
const SocialLink = ({ icon, label, color }) => (
  <a
    href="#"
    className="flex flex-col items-center gap-3 group cursor-pointer hover:scale-110 transition-transform"
  >
    <div
      className={`p-4 md:p-5 bg-white border-[4px] border-[#2f3542] shadow-[4px_4px_0px_#2f3542] group-hover:shadow-none group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all ${color} shadow-lg`}
    >
      {React.cloneElement(icon, { size: 36 })}
    </div>
    <span className="font-thai text-[14px] font-bold uppercase text-[#2f3542] tracking-wider">
      {label}
    </span>
  </a>
);
