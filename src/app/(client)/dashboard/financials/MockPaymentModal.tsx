"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CreditCard, Loader2, Lock } from "lucide-react";
import { processMockPayment } from "@/actions/payments";

export function MockPaymentModal({ invoice }: { invoice: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    const formData = new FormData();
    formData.append("invoice_id", invoice.id);
    formData.append("amount", invoice.amount);
    formData.append("method", "Credit Card (Mock)");
    
    const res = await processMockPayment(formData);
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Payment processed successfully!");
      setIsOpen(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-customBlueExtraDark hover:bg-customBlueDark text-white gap-2">
          <CreditCard className="w-4 h-4" />
          Pay Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            You are paying for {invoice.description}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col items-center justify-center space-y-2 py-8 my-4">
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total Amount</p>
          <p className="text-4xl font-bold text-slate-900">{formatCurrency(invoice.amount)}</p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
          <Lock className="w-4 h-4" />
          <span>This is a simulated secure payment flow.</span>
        </div>

        <DialogFooter className="sm:justify-between flex-row items-center gap-2">
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" onClick={handlePayment} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
