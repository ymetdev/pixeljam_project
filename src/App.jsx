import React, { useState, useEffect } from "react";
import {Gamepad2, Users, Map as MapIcon, Sword,} from "lucide-react";

// Import Scene Components
import TitleScene from "./components/TitleScene";
import AbilitiesScene from "./components/AbilitiesScene";
import QuestsScene from "./components/QuestsScene";
import PartyScene from "./components/PartyScene";
import BossScene from "./components/BossScene";
import Comment  from "./components/Comment";

// Import UI Components
import MenuButton from "./components/MenuButton";

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
    { id: "party", label: "สมาชิกในทีม", icon: Users },
    { id: "boss", label: "ช่องทางการติดต่อ", icon: Users },
    { id: "comment", label: "ความคิดเห็น", icon: Users },
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
        case "comment":
        return <Comment />;
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
