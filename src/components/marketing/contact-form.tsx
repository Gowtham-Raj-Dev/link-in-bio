"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

const CONTACT_EMAIL = "support@codelove.in";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If you have a Web3Forms Access Key in your .env.local file, it will send directly.
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (accessKey) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `Enquiry from Linkin Bio - ${form.name}`,
            from_name: form.name,
            Website: "Linkin Bio (linkinbio.codelove.in)"
          }),
        });

        if (response.ok) {
          setSent(true);
          setForm({ name: "", email: "", message: "" });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback: Open the user's email client pre-filled.
      const subject = encodeURIComponent(`Enquiry from Linkin Bio - ${form.name}`);
      const body = encodeURIComponent(`Website: Linkin Bio (linkinbio.codelove.in)\n\n${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSent(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?"
        />
      </div>
      <Button type="submit" disabled={isSubmitting || sent} className="w-full sm:w-auto">
        {isSubmitting ? (
          "Sending..."
        ) : sent ? (
          <>
            <Check className="h-4 w-4" /> Message Sent
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Prefer email? Write to us directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
