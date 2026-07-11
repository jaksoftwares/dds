import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LifeBuoy } from "lucide-react";

export default async function AdminSupportPage() {
  const supabase = await createClient();

  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Support Tickets
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Manage and respond to client support requests.
        </p>
      </header>

      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
          <CardTitle className="text-lg text-slate-800">All Tickets</CardTitle>
          <CardDescription>Click on a ticket to view and reply</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets && tickets.length > 0 ? tickets.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {ticket.profiles?.full_name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium max-w-[200px] truncate">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="uppercase text-[10px]">
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        ticket.status === "resolved" ? "text-green-600 border-green-200 bg-green-50" : 
                        ticket.status === "open" ? "text-customOrange border-orange-200 bg-orange-50" :
                        "text-slate-600"
                      }>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/support/${ticket.id}`} className="text-customBlueExtraDark hover:underline text-sm font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No support tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
