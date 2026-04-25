import { useState } from 'react';
import { Send, Sparkles, X, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: "Hello. I'm Hari's AI assistant. How can I help you today? Feel free to ask about his background, expertise, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: userMsg
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'model', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "System communication error. Please try reaching out via contact form instead." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className={`fixed z-50 bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded ? 'inset-4 md:inset-12 rounded-3xl' : 'bottom-6 right-6 w-[350px] sm:w-[420px] h-[600px] rounded-2xl'}`}>
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-medium text-white text-sm">AI Assistant</h3>
            </div>
            <div className="flex gap-2 text-zinc-500">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors hidden sm:block">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-black to-[#0a0a0a]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm font-light leading-relaxed ${msg.role === 'user' ? 'bg-white text-black rounded-2xl rounded-tr-sm' : 'bg-zinc-900/50 border border-white/5 text-zinc-300 rounded-2xl rounded-tl-sm'}`}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-invert prose-sm">
                       <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl rounded-tl-sm flex gap-1.5">
                   <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                   <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                 </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 shrink-0 bg-black">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600 font-light"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black rounded-full hover:scale-105 transition-transform disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
