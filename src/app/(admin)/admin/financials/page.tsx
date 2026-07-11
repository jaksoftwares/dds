import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign } from "lucide-react";
import Link from "next/link";
import { InvoiceForm, InvoiceStatusDropdown } from "./InvoiceForm";

export default async function AdminFinancialsPage() {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  const { data: profiles } = await supabase.from("profiles").select("*");
  const { data: projects } = await supabase.from("client_projects").select("id, title, client_id");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-customBlueExtraDark">
          Financial Management
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl">
          Track invoices and payments from your clients.
        </p>
      </header>

      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4 flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-lg text-slate-800">All Invoices</CardTitle>
            <CardDescription>Click on an invoice to manage it</CardDescription>
          </div>
          <InvoiceForm profiles={profiles || []} projects={projects || []} />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices && invoices.length > 0 ? invoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {invoice.profiles?.full_name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">
                      {invoice.description}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <InvoiceStatusDropdown invoice={invoice} />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No invoices found.
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
