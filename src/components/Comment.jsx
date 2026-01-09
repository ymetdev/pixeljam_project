import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, MoreVertical, Send, User, Trophy, Shield } from 'lucide-react';

const App = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "สมชาย ใจดี",
      role: "Hero",
      avatar: null,
      content: "นี่เป็นดีไซน์ที่ดูสะอาดตามากครับ! ชอบการใช้สีที่ดูสบายตาแบบนี้",
      timestamp: "2 ชม. ที่แล้ว",
      
      replies: [
        {
          id: 101,
          author: "GM_Admin",
          role: "ผู้ดูแลระบบ",
          avatar: null,
          content: "ขอบคุณมากครับคุณสมชาย ทางเราตั้งใจออกแบบให้ใช้งานง่ายที่สุดครับ",
          timestamp: "1 ชม. ที่แล้ว",
          likes: 5,
        }
      ]
    },
    {
      id: 2,
      author: "วิภาดา สวยงาม",
      role: "Hero",
      avatar: null,
      content: "อยากให้เพิ่มโหมดมืด (Dark Mode) เข้าไปด้วยจังเลยค่ะ จะได้อ่านตอนกลางคืนได้สะดวก",
      timestamp: "30 นาทีที่แล้ว",
      
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: "คุณ (Player 1)",
      role: "Hero",
      avatar: null,
      content: newComment,
      timestamp: "เมื่อสักครู่",
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const CommentCard = ({ data, isReply = false }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-8 md:ml-16 mt-6' : 'mt-8'}`}>
      {/* Avatar Container */}
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 border-[3px] border-[#2f3542] shadow-[3px_3px_0px_rgba(0,0,0,0.1)] flex items-center justify-center bg-white ${data.role === 'ผู้ดูแลระบบ' ? 'text-indigo-600' : 'text-gray-500'}`}>
          {data.role === 'ผู้ดูแลระบบ' ? <Shield size={24} /> : <User size={24} />}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="bg-white border-[4px] border-[#2f3542] p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] relative">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="font-bold text-[#2f3542] text-lg mr-2 uppercase tracking-tight">{data.author}</span>
              {data.role === 'ผู้ดูแลระบบ' && (
                <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase border-[2px] border-[#2f3542]">
                  ADMIN
                </span>
              )}
              <span className="block text-[11px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{data.timestamp}</span>
            </div>
            <button className="text-[#2f3542] hover:scale-110 transition-transform">
              <MoreVertical size={18} />
            </button>
          </div>
          
          <p className="text-[#2f3542] leading-relaxed font-medium">
            {data.content}
          </p>
        </div>

        {/* Action Buttons */}
       

        {/* Nested Replies */}
        {data.replies && data.replies.map(reply => (
          <CommentCard key={reply.id} data={reply} isReply={true} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f2f6] py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Panel */}
        <div className="bg-[#2f3542] border-[4px] border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 border-[3px] border-black p-2 animate-bounce">
                <Trophy size={24} className="text-black" />
            </div>
            <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-[0.1em]">
                    Guild Chat Log
                </h1>
                <p className="text-pink-400 text-xs font-bold uppercase tracking-widest">
                    Total Comments: {comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)}
                </p>
            </div>
          </div>
          <MessageSquare className="text-white/20" size={40} />
        </div>

        {/* Input Section (Contact Form Style) */}
        <div className="bg-white border-[4px] border-[#2f3542] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] mb-12">
          <h3 className="text-lg font-bold text-[#2f3542] mb-4 uppercase flex items-center gap-2">
            <span className="w-3 h-3 bg-pink-500 inline-block"></span>
            Add to Conversation / ร่วมแสดงความเห็น
          </h3>
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="กรอกข้อความของคุณที่นี่..."
              className="w-full p-5 border-[4px] border-[#2f3542] focus:bg-pink-50 focus:outline-none font-medium text-lg shadow-inner min-h-[120px] resize-none"
            />
            <button 
              onClick={handlePostComment}
              className="mt-4 w-full md:w-auto md:absolute md:bottom-6 md:right-6 bg-[#ff7eb6] hover:bg-[#ff5a9d] text-white border-[4px] border-[#2f3542] py-3 px-8 font-bold shadow-[4px_4px_0px_#2f3542] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase flex items-center justify-center gap-3"
            >
              <Send size={18} />
              Post Comment
            </button>
          </div>
        </div>

    

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentCard key={comment.id} data={comment} />
          ))}
        </div>

        {/* Footer/Load More */}
        <div className="mt-16 text-center">
          <button className="bg-white border-[4px] border-[#2f3542] px-10 py-4 text-[#2f3542] font-black uppercase tracking-widest shadow-[6px_6px_0px_#2f3542] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all">
            Load More Messages
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;