
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  LoaderCircle,
  Clock3,
} from "lucide-react";

import { marketplaceShoppingApi } from "../../api/marketplaceShoppingApi";
import { useCart } from "../../context/CartContext";

export default function MarketplacePaymentCallback() {
  const [params] = useSearchParams();
  const { clearCart } = useCart();

  const reference =
    params.get("reference") || params.get("trxref");

  const [state, setState] = useState({
    loading: true,
    status: "pending",
    message: "Verifying your payment...",
    payment: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!reference) {
        setState({
          loading: false,
          status: "failed",
          message: "Payment reference is missing.",
          payment: null,
        });
        return;
      }

      try {
        const data =
          await marketplaceShoppingApi.verifyPayment(reference);

        if (cancelled) return;

        const paid =
          data.success && data.payment_status === "paid";

        if (paid) {
          const pending = JSON.parse(
            sessionStorage.getItem("igati_pending_payment") ||
              "null"
          );

          // Clear only the cart associated with this checkout.
          if (pending?.reference === reference) {
            clearCart();
            sessionStorage.removeItem("igati_pending_payment");
          }
        }

        setState({
          loading: false,
          status: paid ? "paid" : "pending",
          message: data.message,
          payment: data,
        });
      } catch (error) {
        if (cancelled) return;

        setState({
          loading: false,
          status: "pending",
          message:
            "We could not confirm your payment yet. " +
            "Please check again shortly.",
          payment: null,
        });
      }
    }

    verify();

    return () => {
      cancelled = true;
    };
  }, [reference, clearCart]);

  async function retryVerification() {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const data =
        await marketplaceShoppingApi.verifyPayment(reference);

      const paid =
        data.success && data.payment_status === "paid";

      if (paid) {
        const pending = JSON.parse(
          sessionStorage.getItem("igati_pending_payment") ||
            "null"
        );

        if (pending?.reference === reference) {
          clearCart();
          sessionStorage.removeItem("igati_pending_payment");
        }
      }

      setState({
        loading: false,
        status: paid ? "paid" : "pending",
        message: data.message,
        payment: data,
      });
    } catch {
      setState({
        loading: false,
        status: "pending",
        message: "Payment verification is temporarily unavailable.",
        payment: null,
      });
    }
  }

  const paid = state.status === "paid";
  const failed = state.status === "failed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF7] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
        {state.loading ? (
          <LoaderCircle
            size={60}
            className="mx-auto animate-spin text-[#6C994E]"
          />
        ) : paid ? (
          <CheckCircle2
            size={64}
            className="mx-auto text-green-600"
          />
        ) : failed ? (
          <XCircle
            size={64}
            className="mx-auto text-red-500"
          />
        ) : (
          <Clock3
            size={64}
            className="mx-auto text-amber-500"
          />
        )}

        <h1 className="mt-6 text-2xl font-bold text-[#073B4C]">
          {state.loading
            ? "Verifying Payment"
            : paid
            ? "Payment Successful!"
            : failed
            ? "Payment Error"
            : "Payment Not Confirmed"}
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {state.message}
        </p>

        {reference && (
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-sm">
            <p className="text-slate-500">Payment reference</p>
            <p className="mt-1 break-all font-semibold">
              {reference}
            </p>
          </div>
        )}

        {paid && state.payment && (
          <p className="mt-4 font-semibold text-green-700">
            {state.payment.currency}{" "}
            {Number(state.payment.amount).toLocaleString()}
          </p>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!paid && reference && (
            <button
              onClick={retryVerification}
              disabled={state.loading}
              className="rounded-xl bg-[#6C994E] px-5 py-3 font-semibold text-white disabled:opacity-50"
            >
              Check Payment Again
            </button>
          )}

          <Link
            to="/marketplace"
            className="rounded-xl bg-[#073B4C] px-5 py-3 font-semibold text-white"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
