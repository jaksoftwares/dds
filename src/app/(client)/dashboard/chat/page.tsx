import { createClient } from "@/lib/supabase/server";
import { ChatInterface } from "./ChatInterface";

export default async function ClientChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch all chats involving the user
  const { data: messages } = await supabase
    .from("chats")
    .select("*")
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Messages
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Communicate directly with your account manager.
        </p>
      </header>

      <div className="max-w-3xl">
        <ChatInterface 
          initialMessages={messages || []} 
          currentUserId={user.id} 
        />
      </div>
    </div>
  );
}
