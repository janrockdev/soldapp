"use client";

   import { Button } from "@/components/ui/button";
   import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
   import { Menu } from "lucide-react";
   import Link from "next/link";
   import dynamic from "next/dynamic";

   // Dynamically import WalletMultiButton with SSR disabled
   const WalletMultiButton = dynamic(
     () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
     { ssr: false }
   );

   export default function Navbar() {
     return (
       <header className="sticky top-0 z-50 bg-background border-b">
         <div className="container mx-auto px-4 flex h-16 items-center justify-between">
           <Link href="/" className="text-xl font-bold">
             SOLANA DAPP
           </Link>
           <nav className="hidden md:flex space-x-4 items-center">
             <Link href="/" className="text-sm font-medium hover:text-primary">
               Home
             </Link>
             <Link href="/about" className="text-sm font-medium hover:text-primary">
               About
             </Link>
             <Link href="/contact" className="text-sm font-medium hover:text-primary">
               Contact
             </Link>
             <WalletMultiButton className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium" />
           </nav>
           <div className="flex items-center space-x-2 md:hidden">
             <WalletMultiButton className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium" />
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="outline" size="icon">
                   <Menu className="h-5 w-5" />
                 </Button>
               </SheetTrigger>
               <SheetContent side="right">
                 <nav className="flex flex-col space-y-4 mt-4">
                   <Link href="/" className="text-sm font-medium hover:text-primary">
                     Home
                   </Link>
                   <Link href="/about" className="text-sm font-medium hover:text-primary">
                     About
                   </Link>
                   <Link href="/contact" className="text-sm font-medium hover:text-primary">
                     Contact
                   </Link>
                 </nav>
               </SheetContent>
             </Sheet>
           </div>
         </div>
       </header>
     );
   }