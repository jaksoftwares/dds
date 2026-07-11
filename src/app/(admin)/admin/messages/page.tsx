import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";

const statusVariant = (status: string) => {
  switch (status) {
    case "unread":
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "in_progress":
    case "reviewed":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "resolved":
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  // Fetch from contact_messages
  const { data: messagesData } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch from quotes
  const { data: quotesData } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  // Combine and sort
  const combined = [
    ...(messagesData || []).map((m) => ({
      id: m.id,
      type: "Contact Message",
      name: m.from_name,
      contact: m.from_email,
      subject: "General Enquiry",
      message: m.message,
      status: m.status,
      date: new Date(m.created_at),
    })),
    ...(quotesData || []).map((q) => ({
      id: q.id,
      type: "Quote Request",
      name: q.name,
      contact: q.email,
      subject: q.service || q.reason,
      message: q.message,
      status: q.status,
      date: new Date(q.created_at),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Enquiries & Messages
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          View and manage messages submitted through the website contact forms
          and quote requests.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:gap-6">
        <Card className="p-0 overflow-hidden shadow-sm border-slate-200">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Unified Inbox
            </span>
            <Button size="sm" variant="outline">
              Export CSV
            </Button>
          </div>

          {combined.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No messages or quotes received yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {combined.map((item, index) => (
                  <TableRow key={`${item.id}-${index}`} className="text-xs md:text-sm">
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.contact}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs font-medium text-slate-700">
                      {item.subject}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <span className="line-clamp-1 text-slate-500">
                        {item.message}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`border text-[10px] capitalize ${statusVariant(item.status)}`}
                      >
                        {item.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-slate-500 whitespace-nowrap">
                      {item.date.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </section>
    </div>
  );
}
