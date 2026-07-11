import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TicketReplyForm } from "./TicketReplyForm";

export default async function AdminTicketDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("*, profiles(full_name, email)")
    .eq("id", params.id)
    .single();

  if (!ticket) return <div className="p-8">Ticket not found</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-4">
        <Link href="/admin/support" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-customBlueExtraDark transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Tickets
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
              {ticket.subject}
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Client: {ticket.profiles?.full_name} ({ticket.profiles?.email})
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm uppercase">
              {ticket.priority} priority
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {ticket.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Original Message</CardTitle>
              <CardDescription>
                Sent on {new Date(ticket.created_at).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{ticket.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Manage Ticket</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <TicketReplyForm ticket={ticket} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
