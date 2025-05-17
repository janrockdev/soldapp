"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

export default function TransactionList() {
  const { publicKey, signTransaction } = useWallet();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [previewResult, setPreviewResult] = useState<any>(null);
  const [faucetMessage, setFaucetMessage] = useState<string | null>(null);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const fetchTransactions = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    try {
      const pubKey = new PublicKey(publicKey);
      const transactionList = await connection.getSignaturesForAddress(pubKey, { limit: 10 });
      setTransactions(transactionList);
    } catch (err) {
      setError("Failed to fetch transactions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestAirdrop = async () => {
    if (!publicKey) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setFaucetMessage(null);
    setError(null);

    try {
      const fromAirDropSignature = await connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL
      );
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature,
      });
      setFaucetMessage("Successfully received 2 SOL!");
      await fetchTransactions(); // Refresh transaction list
    } catch (err) {
      setError(
        "Failed to request airdrop: " +
          (err instanceof Error ? err.message : String(err))
      );
      console.error("Airdrop error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendTransaction = async () => {
    if (!publicKey || !signTransaction || !recipient || !amount) {
      setError("Please provide recipient address and amount, and ensure wallet is connected");
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signed = await signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);
      setError(null);
      alert(`Transaction sent: ${txid}`);
      fetchTransactions();
    } catch (err) {
      setError("Failed to send transaction");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [publicKey]);

  if (!publicKey) {
    return <p className="text-center text-muted-foreground">Connect your wallet to view transactions</p>;
  }

  return (
    <CardContent>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Faucet</h3>
        <Button
          onClick={requestAirdrop}
          disabled={loading || !publicKey}
          className="mb-4"
        >
          Request 2 SOL Airdrop
        </Button>
        {faucetMessage && <p className="text-green-500">{faucetMessage}</p>}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Send SOL</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="recipient">Recipient Address<br/><br/></Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient public key"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount (SOL)<br/><br/></Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in SOL"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={sendTransaction} disabled={loading || !recipient || !amount}>
              Send Transaction
            </Button>
          </div>
        </div>
        {previewResult && (
          <div className="mt-4">
            <h4 className="text-md font-semibold">Preview Result</h4>
            <p>Logs: {previewResult?.logs?.join(", ") || "No logs"}</p>
            <p>Error: {previewResult?.err ? JSON.stringify(previewResult.err) : "None"}</p>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      {loading && <p className="text-center">Loading transactions...</p>}
      {transactions.length === 0 && !loading && !error && (
        <p className="text-center text-muted-foreground">No transactions found</p>
      )}
      {transactions.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell className="truncate max-w-xs">{tx.signature}</TableCell>
                <TableCell>
                  {new Date(tx.blockTime * 1000).toLocaleString()}
                </TableCell>
                <TableCell>{tx.confirmationStatus}</TableCell>
                <TableCell>
                  <a
                    href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 inline" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        onClick={fetchTransactions}
        className="mt-4"
        disabled={loading || !publicKey}
      >
        Refresh Transactions
      </Button>
    </CardContent>
  );
}