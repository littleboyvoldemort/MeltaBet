import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatBdt,
  isValidBdMobile,
  MIN_DEPOSIT_BDT,
  MIN_WITHDRAW_BDT,
} from "@/lib/currency";

type DepositProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchantNumber: string;
  merchantLoading: boolean;
  submitting: boolean;
  onSubmit: (amount: number, txId: string) => void;
};

export function DepositDialog({
  open,
  onOpenChange,
  merchantNumber,
  merchantLoading,
  submitting,
  onSubmit,
}: DepositProps) {
  const [amount, setAmount] = useState("");
  const [txId, setTxId] = useState("");

  const hasMerchantNumber = merchantNumber.trim().length > 0;

  function handleSubmit() {
    if (!hasMerchantNumber) {
      toast.error("Deposits are not available yet. The merchant number will be added soon.");
      return;
    }
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed < MIN_DEPOSIT_BDT) {
      toast.error(`Minimum deposit is ${formatBdt(MIN_DEPOSIT_BDT)}`);
      return;
    }
    if (!txId.trim() || txId.trim().length < 6) {
      toast.error("Enter a valid transaction ID (TxID)");
      return;
    }
    onSubmit(parsed, txId.trim());
    setAmount("");
    setTxId("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit funds</DialogTitle>
          <DialogDescription>
            Send money via bKash or Nagad, then submit your transaction details below. Minimum
            deposit {formatBdt(MIN_DEPOSIT_BDT)}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>bKash/Nagad Number</Label>
            <div className="flex items-center gap-2 rounded-md border border-border bg-secondary p-3">
              <code className="min-w-0 flex-1 truncate text-sm">
                {merchantLoading
                  ? "Loading…"
                  : hasMerchantNumber
                    ? merchantNumber
                    : "Not configured yet"}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(merchantNumber);
                  toast.success("Number copied");
                }}
                disabled={merchantLoading || !hasMerchantNumber}
              >
                <Copy className="size-4" />
              </Button>
            </div>
            {!hasMerchantNumber && !merchantLoading ? (
              <p className="text-xs text-amber-200/90">
                The merchant number will be published here soon. Please check back later.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Send money to this number from your bKash or Nagad account.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dep-amount">Amount (৳)</Label>
            <Input
              id="dep-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min ${MIN_DEPOSIT_BDT}`}
              disabled={!hasMerchantNumber}
            />
            <p className="text-xs text-muted-foreground">
              Minimum deposit {formatBdt(MIN_DEPOSIT_BDT)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dep-tx">Transaction ID (TxID)</Label>
            <Input
              id="dep-tx"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="Send money to the merchant number and enter your TxID here"
              disabled={!hasMerchantNumber}
            />
          </div>

          <Button
            className="w-full"
            disabled={submitting || !hasMerchantNumber}
            onClick={handleSubmit}
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null} I have sent the money
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Your balance updates only after an admin confirms the payment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type WithdrawProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  submitting: boolean;
  onSubmit: (amount: number, mobileNumber: string) => void;
};

export function WithdrawDialog({ open, onOpenChange, balance, submitting, onSubmit }: WithdrawProps) {
  const [amount, setAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  function handleSubmit() {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed < MIN_WITHDRAW_BDT) {
      toast.error(`Minimum withdrawal is ${formatBdt(MIN_WITHDRAW_BDT)}`);
      return;
    }
    const number = mobileNumber.trim();
    if (!isValidBdMobile(number)) {
      toast.error("Enter a valid bKash/Nagad number");
      return;
    }
    if (parsed > balance) {
      toast.error("Amount exceeds your available balance");
      return;
    }
    onSubmit(parsed, number);
    setAmount("");
    setMobileNumber("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw funds</DialogTitle>
          <DialogDescription>
            Available balance:{" "}
            <span className="font-bold text-foreground">{formatBdt(balance)}</span>. Minimum
            withdrawal {formatBdt(MIN_WITHDRAW_BDT)}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wd-mobile">Your bKash/Nagad Number</Label>
            <Input
              id="wd-mobile"
              inputMode="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              maxLength={11}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wd-amount">Amount (Min ৳{MIN_WITHDRAW_BDT})</Label>
            <Input
              id="wd-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min ${MIN_WITHDRAW_BDT}`}
            />
            <p className="text-sm text-amber-200/90">
              Note: 10% admin commission will be deducted upon approval.
            </p>
          </div>

          <Button className="w-full" disabled={submitting} onClick={handleSubmit}>
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null} Submit Withdraw Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
