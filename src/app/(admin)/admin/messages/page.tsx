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

const mockMessages = [
  {
    name: "Douglas Akhonya",
    company: "Kellian Autogarage",
    subject: "Website revamp & SEO",
    status: "New",
    receivedAt: "Today, 09:24",
  },
  {
    name: "Victor Siero",
    company: "Kids Beyond Limit",
    subject: "Maintenance & support plan",
    status: "In progress",
    receivedAt: "Yesterday, 16:10",
  },
  {
    name: "Eunice Njeri",
    company: "JKUAT Social Robotics",
    subject: "Custom web platform",
    status: "Closed",
    receivedAt: "2 days ago",
  },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "New":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "In progress":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const AdminMessagesPage = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Enquiries & messages
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          View and manage messages submitted through the website contact forms
          and call-to-action sections.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 md:gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Inbox
            </span>
            <Button size="sm" variant="outline">
              Export CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Received</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMessages.map((message, index) => (
                <TableRow key={`${message.name}-${index}`} className="text-xs md:text-sm">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">
                        {message.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {message.company}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <span className="line-clamp-2 text-slate-700">
                      {message.subject}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`border text-[10px] ${statusVariant(message.status)}`}
                    >
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-slate-500">
                    {message.receivedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-4 md:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            How to integrate
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Connect this module to your preferred data store or CRM. For
            example, wire it to your Next.js API routes, a database, or an
            external service like HubSpot or Zoho.
          </p>
          <ul className="text-xs md:text-sm text-slate-600 space-y-1 list-disc list-inside">
            <li>Replace the mock data array with live data from your backend.</li>
            <li>
              Add row-level actions (view, reply, assign, close) to match your
              workflow.
            </li>
            <li>
              Secure this area with authentication and role-based access
              control.
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default AdminMessagesPage;
