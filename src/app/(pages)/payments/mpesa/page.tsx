"use client";

import { useState } from "react";

const MpesaPaymentPage = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: Number(amount),
          accountReference: "DOVEPEAK-PAYMENT",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to initiate payment. Please try again.");
      } else {
        setMessage(
          data.message ||
            "STK push sent. Please check your phone and enter your M-Pesa PIN to complete the payment."
        );
      }
    } catch (err) {
      console.error("Payment error", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Make a Payment via M-Pesa
          </h1>
          <p className="text-sm text-slate-600">
            Enter the phone number and amount you wish to pay. You will receive
            an STK push on your M-Pesa line to authorize the payment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Phone Number (M-Pesa)
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="2547XXXXXXXX"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
            <p className="text-xs text-slate-500">
              Use format <span className="font-mono">2547XXXXXXXX</span> (no
              spaces or plus sign).
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Amount (KES)
            </label>
            <input
              type="number"
              required
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay with M-Pesa"}
          </button>
        </form>

        {message && (
          <div className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-800">
            {error}
          </div>
        )}

        <p className="text-xs text-center text-slate-500">
          This link is dedicated for agreed payments with Dovepeak Digital
          Solutions. If you have any questions, please contact us directly.
        </p>
      </div>
    </main>
  );
};

export default MpesaPaymentPage;
