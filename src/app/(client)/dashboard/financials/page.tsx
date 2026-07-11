import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreditCard, ReceiptText, ArrowUpRight, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { MockPaymentModal } from "./MockPaymentModal";

export default async function ClientFinancialsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch Invoices
  const { data: invoices } = await supabase
    .from("invoices")
    .select(`
      *,
      client_projects (title)
    `)
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch Payments
  // The policy allows clients to read payments for their invoices, but for simplicity we will just join them or fetch payments directly.
  // Actually, we can fetch payments where the invoice belongs to this user.
  let { data: payments } = await supabase
    .from("payments")
    .select(`
      *,
      invoices!inner (client_id, description)
    `)
    .eq("invoices.client_id", user.id)
    .order("created_at", { ascending: false });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Financials
        </h1>
        <p className="text-slate-600 mt-1 text-sm md:text-base">
          Manage your invoices and track your payment history.
        </p>
      </header>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 bg-slate-100">
          <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:text-customOrange">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white data-[state=active]:text-customOrange">
            Payment History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {invoices && invoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="border-slate-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-lg text-slate-800">{invoice.description}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {invoice.client_projects?.title ? `Project: ${invoice.client_projects.title}` : "General Service"}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={invoice.status === "paid" ? "default" : invoice.status === "overdue" ? "destructive" : "secondary"}
                        className={invoice.status === "paid" ? "bg-green-600" : invoice.status === "pending" ? "bg-orange-100 text-customOrange" : ""}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 border-t border-slate-100 mt-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> 
                          Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "Upon receipt"}
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          {formatCurrency(invoice.amount)}
                        </p>
                      </div>
                      {invoice.status === "pending" || invoice.status === "overdue" ? (
                        <MockPaymentModal invoice={invoice} />
                      ) : (
                        <Button size="sm" variant="outline" className="gap-2">
                          <ReceiptText className="w-4 h-4" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
              <ReceiptText className="w-12 h-12 text-slate-300" />
              <p>You have no pending or past invoices.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {payments && payments.length > 0 ? (
            <Card className="border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Invoice Reference</th>
                      <th className="px-6 py-4 font-medium">Method</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-slate-800 font-medium truncate max-w-[200px]">
                          {payment.invoices?.description || "Invoice Payment"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {payment.method || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={payment.status === "completed" ? "text-green-600 border-green-200 bg-green-50" : "text-slate-600"}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-customOrange hover:text-customOrange/80 hover:bg-orange-50">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center text-slate-500 border-dashed bg-transparent flex flex-col items-center gap-4">
              <DollarSign className="w-12 h-12 text-slate-300" />
              <p>No payment history found.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
