import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, GraduationCap, Sparkles, User, HelpCircle, Bot, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Counselor Aditya. Welcome to KSV Group of Schools. Let me know if you have questions about admissions, fees structure, our sports academy, or student timetables!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "What are student login IDs for the portal?",
    "Tell me about the Sports Academy",
    "How to make online fee payments?",
    "Admissions curriculum options"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      
      const data = await response.json();
      if (response.ok && data.text) {
        setMessages([...updatedMessages, { role: "assistant", content: data.text }]);
      } else {
        setMessages([...updatedMessages, {
          role: "assistant",
          content: "I am having a brief connection issue with our administration server. Please try again in a few moments, or reach out to our office desks directly!"
        }]);
      }
    } catch (e) {
      console.error(e);
      setMessages([...updatedMessages, {
        role: "assistant",
        content: "Our virtual systems are currently updating. Please speak to our school counselors on +91 9489927664, or login to view accounts."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-launcher"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-tr from-gold-500 to-amber-600 text-slate-950 p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer relative group"
            id="chat_bot_launcher"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute right-14 bg-slate-900 border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
              Chat Counselor Aditya
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-slate-900 animate-pulse" />
          </motion.button>
        ) : (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[92vw] sm:w-[400px] h-[550px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            id="chat_bot_panel"
          >
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-primary-950 to-slate-950 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 bg-gold-400/10 border border-gold-400/30 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">Counselor Aditya AI</h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Online School Assistant</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex items-start space-x-2 w-full ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-tr from-primary-600 to-indigo-700 text-white rounded-tr-none text-left'
                      : 'bg-white/[0.04] border border-white/5 text-slate-200 rounded-tl-none text-left'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-2 w-full">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4 text-indigo-400 animate-bounce" />
                  </div>
                  <div className="p-3 bg-white/[0.04] border border-white/5 text-slate-400 text-xs rounded-2xl rounded-tl-none font-mono">
                    Aditya is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions segment */}
            <div className="p-2 border-t border-white/5 bg-slate-950/35 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug)}
                  disabled={isLoading}
                  className="inline-block text-[10px] text-slate-300 hover:text-white bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg px-2.5 py-1.5 cursor-pointer disabled:opacity-50"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-white/10 bg-slate-950 flex items-center space-x-2.5"
            >
              <input
                type="text"
                placeholder="Type your questions here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gold-500 hover:bg-gold-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:hover:bg-gold-500"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
