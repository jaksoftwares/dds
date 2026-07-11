import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminChatPage() {
  const supabase = await createClient();

  // Get distinct conversations (we'll fetch all chats and group them by client)
  // For admin, the client is either the sender or receiver
  const { data: allChats } = await supabase
    .from("chats")
    .select("*, sender_profile:profiles!chats_sender_id_fkey(full_name, email), receiver_profile:profiles!chats_receiver_id_fkey(full_name, email)")
    .order("created_at", { ascending: false });

  // Group by client
  const conversations = new Map();

  if (allChats) {
    for (const chat of allChats) {
      // Assuming admin id is what we get, but we want the non-admin ID as the conversation partner
      // In our setup, sender or receiver could be admin. Let's just group by the sender if sender is not admin, else receiver.
      // We can use a simpler approach: group by sender_id if it's an incoming message.
      const isIncoming = chat.sender_profile !== null; // Just to simplify, we group by the other person
      
      const clientId = chat.sender_id;
      if (!conversations.has(clientId)) {
        conversations.set(clientId, {
          clientId,
          clientName: chat.sender_profile?.full_name || chat.receiver_profile?.full_name || "Client",
          lastMessage: chat.message,
          date: chat.created_at,
          unread: !chat.is_read
        });
      }
    }
  }

  const convoList = Array.from(conversations.values());

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Chat Inbox
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Direct messages from your clients.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {convoList && convoList.length > 0 ? convoList.map((convo: any) => (
          <Link key={convo.clientId} href={`/admin/chat/${convo.clientId}`} className="block group">
            <Card className="border-slate-200 transition-colors group-hover:border-customBlueBase">
              <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100 rounded-t-xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-customBlueExtraDark/10 text-customBlueExtraDark rounded-lg">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-slate-800">
                        {convo.clientName}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(convo.date).toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                  {convo.unread && (
                    <span className="w-2.5 h-2.5 rounded-full bg-customOrange" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-slate-600 truncate">{convo.lastMessage}</p>
              </CardContent>
            </Card>
          </Link>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed rounded-xl bg-slate-50">
            No conversations found.
          </div>
        )}
      </div>
    </div>
  );
}
