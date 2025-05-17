import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransactionList from "@/components/TransactionList";
import CryptoPriceCard from "@/components/CryptoPriceCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Your Next.js App
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Build modern, accessible web applications with Next.js and Shadcn/UI.
            </p>
            <Button size="lg" className="mt-6">
              Explore Now
            </Button>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CryptoPriceCard symbol="BTCUSD" name="Bitcoin" />
              <CryptoPriceCard symbol="SOLUSD" name="Solana" />
              <CryptoPriceCard symbol="SUIUSD" name="Sui" />
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="w-full max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle>Wallet Features and Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}