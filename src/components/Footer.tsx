import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">SOLANA DAPP</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              React template for Solana Dapps with Shadcn/UI.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Email: email@email.com
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Phone: +44 (0)XXXX XXX XXX
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jan Rock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}