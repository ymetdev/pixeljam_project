import React, { useState } from "react";
import { Star, MoreVertical, CheckCircle } from "lucide-react";
import GameWindow from "./GameWindow";

const ReviewScene = () => {
  const [reviews] = useState([
    {
      id: 1,
      author: "คุณสมชาย ใจดี",
      rating: 5,
      content:
        "สินค้าคุณภาพดีมากครับ การจัดส่งรวดเร็วทันใจ แพ็คของมาอย่างดีไม่มีรอยบุบเลย แนะนำร้านนี้ครับ!",
      date: "2 วันที่แล้ว",
      verified: true,
    },
    {
      id: 2,
      author: "คุณวิภาดา สวยงาม",
      rating: 4,
      content:
        "เนื้อผ้าดีมาก ใส่สบาย แต่สีจริงอาจจะดรอปกว่าในรูปนิดหน่อย โดยรวมแล้วพอใจมากค่ะ",
      date: "1 สัปดาห์ที่แล้ว",
      verified: true,
    },
    {
      id: 3,
      author: "คุณกิตติศักดิ์ นักรบ",
      rating: 5,
      content:
        "คุ้มค่าคุ้มราคาที่สุดครับ หามานานแล้วรุ่นนี้ เจอร้านนี้ราคาดีสุด บริการหลังการขายก็ดีมาก",
      date: "2 สัปดาห์ที่แล้ว",
      verified: true,
    },
  ]);

  return (
    <GameWindow title="CUSTOMER_REVIEWS.EXE" noPadding={false}>
      <div className="max-w-4xl mx-auto">
        {/* Header Panel */}
        <div className="mb-10 pt-4">
          <h1 className="text-3xl md:text-4xl font-black text-[#2f3542] uppercase tracking-[0.05em] font-sans">
            Customer Reviews
          </h1>
          <p className="text-[#2f3542] text-sm font-bold uppercase tracking-widest mt-2 opacity-70">
            Avg. Rating: 4.4 / 5.0 (Based on {reviews.length} reviews)
          </p>
        </div>

        {/* Section Divider */}
        <div className="mb-8 border-b-[4px] border-[#2f3542] pb-2 flex justify-between items-end">
          <h2 className="text-xl font-black text-[#2f3542] uppercase tracking-wider flex items-center gap-2 font-thai">
            <span className="w-4 h-4 bg-yellow-400 inline-block"></span>
            All Reviews / รีวิวทั้งหมด
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase">
            Sorted by: Newest
          </span>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 mb-12">
          {reviews.map((review) => (
            <ReviewCard key={review.id} data={review} />
          ))}
        </div>

        {/* Footer Button */}
        <div className="pb-10 text-center">
          <button className="bg-white border-[4px] border-[#2f3542] px-8 py-3 text-[#2f3542] font-black uppercase tracking-widest shadow-[6px_6px_0px_#2f3542] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all text-sm">
            Show All Reviews
          </button>
        </div>
      </div>
    </GameWindow>
  );
};

const RenderStars = ({ rating }) => (
  <div className="flex gap-1 mb-2">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#fbbf24" : "none"}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ))}
  </div>
);

const ReviewCard = ({ data }) => (
  <div className="w-full">
    <div className="bg-white border-[4px] border-[#2f3542] p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.05)] relative group hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-[#2f3542] text-lg font-thai">
              {data.author}
            </span>
            {data.verified && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 border-[2px] border-green-700 text-[9px] font-black uppercase">
                <CheckCircle size={10} /> Verified Buyer
              </div>
            )}
          </div>
          <RenderStars rating={data.rating} />
          <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {data.date}
          </span>
        </div>

        <button className="text-[#2f3542] opacity-20 group-hover:opacity-100 transition-opacity p-1">
          <MoreVertical size={18} />
        </button>
      </div>

      <p className="text-[#2f3542] leading-relaxed font-thai text-base md:text-lg mt-4 italic">
        "{data.content}"
      </p>
    </div>
  </div>
);

export default ReviewScene;
