import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LifeBuoy, CheckCircle2, AlertCircle } from "lucide-react";
import { SupportForm } from "./SupportForm";
import Link from "next/link";

export default async function ClientSupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Tickets
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Support Tickets
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Need help? Raise a ticket and our support team will assist you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Your Tickets</h2>
          {tickets && tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Link key={ticket.id} href={`/dashboard/support/${ticket.id}`} className="block group">
                  <Card className="border-slate-200 transition-colors group-hover:border-customOrange/50">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {ticket.status === 'resolved' || ticket.status === 'closed' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-customOrange" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-slate-800 group-hover:text-customOrange transition-colors">
                              {ticket.subject}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              Opened on {new Date(ticket.created_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant="outline"
                            className={
                              ticket.status === 'open' ? 'bg-orange-50 text-customOrange border-orange-200' :
                              ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                              'bg-green-50 text-green-600 border-green-200'
                            }
                          >
                            {ticket.status.replace("_", " ")}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase">
                            {ticket.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 line-clamp-2">{ticket.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
              <LifeBuoy className="w-12 h-12 text-slate-300" />
              <p>You have no open support tickets.</p>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="border-slate-200 sticky top-6">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-800">Create New Ticket</CardTitle>
              <CardDescription>We typically reply within 2 hours during business hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <SupportForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
