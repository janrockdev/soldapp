"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    // Reset submission message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground">
                  Have questions or feedback? Reach out to us using the form below or our contact details.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name<br/><br/></Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email<br/><br/></Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message<br/><br/></Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    required
                  />
                </div>
                <Button type="submit">Submit</Button>
                {submitted && (
                  <p className="text-green-500">Thank you for your message! We’ll get back to you soon.</p>
                )}
              </form>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Contact Details</h3>
                <p className="text-muted-foreground">
                  Email: <a href="mailto:contact@myapp.com" className="text-primary hover:underline">email@email.com</a>
                </p>
                <p className="text-muted-foreground">
                  Phone: +44 (0)XXXX XXX XXX
                </p>
                <p className="text-muted-foreground">
                  Address: 123 Blockchain St, Crypto City, CC 12345
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}