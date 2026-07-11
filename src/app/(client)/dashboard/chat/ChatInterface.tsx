"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  initialMessages: any[];
  currentUserId: string;
}

export function ChatInterface({ initialMessages, currentUserId }: ChatInterfaceProps) {
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [initialMessages]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await sendMessage(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      const formElement = document.getElementById("chat-form") as HTMLFormElement;
      if (formElement) formElement.reset();
    }
  }

  return (
    <div className="flex flex-col h-[600px] border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-100 p-4">
        <h3 className="font-semibold text-slate-800">Chat with Support</h3>
        <p className="text-xs text-slate-500">We typically reply within a few minutes.</p>
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-slate-50/30" ref={scrollRef}>
        <div className="space-y-4">
          {initialMessages.length === 0 ? (
            <div className="text-center text-sm text-slate-500 my-8">
              Send a message to start a conversation with DovePeak Support.
            </div>
          ) : (
            initialMessages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;
              return (
                <div key={msg.id} className={cn("flex w-full", isMine ? "justify-end" : "justify-start")}>
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      isMine 
                        ? "bg-customOrange text-white rounded-br-none" 
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    <span className={cn(
                      "text-[10px] mt-1 block text-right",
                      isMine ? "text-orange-100" : "text-slate-400"
                    )}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      <form id="chat-form" action={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <Input 
          name="message" 
          placeholder="Type your message..." 
          className="flex-1"
          autoComplete="off"
          disabled={loading}
        />
        <Button type="submit" disabled={loading} size="icon" className="bg-customOrange hover:bg-customOrange/90 text-white shrink-0">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}
