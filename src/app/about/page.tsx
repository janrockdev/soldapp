import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>About SolDapp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                SolDapp is a modern web application built with Next.js, Tailwind CSS, and Shadcn/UI, designed to provide a seamless experience for interacting with the Solana blockchain.
              </p>
              <p className="text-muted-foreground">
                Key features include:
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Phantom wallet integration for secure Solana transactions</li>
                <li>Real-time price tracking for Bitcoin, Solana, and Sui</li>
                <li>Transaction history and preview for your wallet</li>
                <li>Devnet faucet to request 2 SOL for testing</li>
              </ul>
              <p className="text-muted-foreground">
                Our mission is to make blockchain interactions simple, accessible, and user-friendly. Explore the app to manage your Solana wallet and stay updated on crypto prices.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}