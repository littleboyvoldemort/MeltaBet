import { useState } from "react";
import { Loader2 } from "lucide-react";
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
  submitting: boolean;
  onSubmit: (amount: number, txId: string) => void;
};

export function DepositDialog({ open, onOpenChange, submitting, onSubmit }: DepositProps) {
  const [amount, setAmount] = useState("");
  const [txId, setTxId] = useState("");

  function handleSubmit() {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed < MIN_DEPOSIT_BDT) {
      toast.error(`Minimum deposit is ${formatBdt(MIN_DEPOSIT_BDT)}`);
      return;
    }
    if (!txId.trim() || txId.trim().length < 6) {
      toast.error("Enter a valid bKash/Nagad transaction ID");
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
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Send money via bKash or Nagad, then submit your deposit request below. Your balance
            updates after admin approval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dep-amount">Amount (Min ৳50)</Label>
            <Input
              id="dep-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dep-tx">bKash/Nagad Transaction ID</Label>
            <Input
              id="dep-tx"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="Enter your bKash or Nagad TxID"
            />
          </div>

          <Button className="w-full" disabled={submitting} onClick={handleSubmit}>
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Submit Deposit Request
          </Button>
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
            <Label htmlFor="wd-mobile">User&apos;s bKash/Nagad Number</Label>
            <Input
              id="wd-mobile"
              inputMode="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Your bKash or Nagad number"
              maxLength={11}
            />
            <p className="text-xs text-muted-foreground">
              Enter the bKash or Nagad number where you want to receive the money.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wd-amount">Amount (৳)</Label>
            <Input
              id="wd-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min ${MIN_WITHDRAW_BDT}`}
            />
            <p className="text-xs text-muted-foreground">
              Minimum withdrawal {formatBdt(MIN_WITHDRAW_BDT)}
            </p>
          </div>

          <Button className="w-full" disabled={submitting} onClick={handleSubmit}>
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null} Request withdrawal
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            The amount is deducted immediately and sent to your number after admin processing.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
