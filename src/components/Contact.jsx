import React, { useState } from "react";
import GameWindow from "./GameWindow";
import {
  Mail,
  CheckCircle2,
  X,
  Twitter,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    strategy: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSendMail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // แทนที่ ID เหล่านี้ด้วยค่าจากหน้าเว็บ EmailJS ของคุณ
    const serviceId = "service_47aym1h";
    const templateId = "template_1hjvys6";
    const publicKey = "PJvxSFnEu4JO6AYKX";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.strategy,
      to_name: "Pixel Jam Team",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("success");
        setFormData({ name: "", email: "", strategy: "" }); // ล้างฟอร์ม

        // ให้แจ้งเตือนหายไปเองหลัง 5 วินาที
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("error");
      });
  };

  return (
    <GameWindow title="FINAL_CHALLENGE.BOSS">
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-100 border-[4px] border-green-500 text-green-700 font-thai font-bold animate-bounce flex items-center justify-center gap-3">
          <CheckCircle2 /> ส่งสาส์นท้าทายสำเร็จ! ทีมงานกำลังเตรียมตัวรับศึก
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-100 border-[4px] border-red-500 text-red-700 font-thai font-bold flex items-center justify-center gap-3">
          <X /> การส่งล้มเหลว! กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
        </div>
      )}
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
              disabled={status === "sending"}
              className={`w-full text-white border-[5px] border-[#2f3542] p-5 md:p-8 font-thai text-[20px] font-bold shadow-[8px_8px_0px_#2f3542] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all uppercase flex items-center justify-center gap-6 
                ${
                  status === "sending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ff7eb6] hover:bg-[#ff5a9d]"
                }`}
            >
              <Mail size={24} />
              {status === "sending"
                ? "CASTING SPELL... (กำลังส่ง)"
                : "INITIATE BATTLE / ส่งข้อมูลท้าทาย"}
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

export default Contact;
