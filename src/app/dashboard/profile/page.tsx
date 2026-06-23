"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, ImagePlus, QrCode, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { Modal } from "@/components/ui/modal";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/lib/auth-context";
import { isUsernameAvailable } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type { ProfileData } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

const BIO_MAX = 160;

export default function ProfilePage() {
  const { user } = useAuth();
  const { data, ready, update } = useAppData();
  const [form, setForm] = useState<ProfileData | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (data && !form) setForm(data.profile);
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, [data, form]);

  const handleCopy = () => {
    if (!origin || !form?.username) return;
    navigator.clipboard.writeText(`${origin}/u/${form.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    if (!form || !user || !form.username) {
      setUsernameTaken(false);
      return;
    }
    
    // Check local storage first
    if (!isUsernameAvailable(form.username, user.uid)) {
       setUsernameTaken(true);
       return;
    }

    const checkDb = async () => {
      setCheckingUsername(true);
      const db = getFirebaseDb();
      if (db) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("profile.username", "==", form.username));
        try {
           const snap = await getDocs(q);
           // Taken if there's a doc AND it's not the current user's doc
           const taken = snap.docs.some(d => d.id !== user.uid);
           setUsernameTaken(taken);
        } catch (e) {
           console.error(e);
        }
      }
      setCheckingUsername(false);
    };

    const timer = setTimeout(checkDb, 500); // debounce
    return () => clearTimeout(timer);
  }, [form?.username, user]);

  if (!ready || !data || !form) {
    return <div className="h-96 rounded-2xl skeleton" />;
  }



  const set = (key: keyof ProfileData, value: string) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const handleAvatar = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => set("avatar", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (usernameTaken) return;
    update((prev) => ({ ...prev, profile: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Build preview data from the in-progress form.
  const previewData = { ...data, profile: form };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This information appears on your public bio page.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              {form.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.avatar}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="brand-gradient flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white">
                  {(form.displayName || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                >
                  <ImagePlus className="h-4 w-4" /> Upload
                </Button>
                {form.avatar && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => set("avatar", "")}
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </Button>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files?.[0] && handleAvatar(e.target.files[0])
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={form.displayName}
                onChange={(e) => set("displayName", e.target.value)}
                placeholder="Aria Rivera"
                maxLength={50}
              />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center">
                <span className="flex h-11 items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  /u/
                </span>
                <Input
                  id="username"
                  className="rounded-l-none"
                  value={form.username}
                  onChange={(e) => set("username", slugify(e.target.value))}
                  placeholder="ariacreates"
                />
              </div>
              {form.username && (
                <div
                  className={`mt-2 flex flex-col gap-3 text-sm ${
                    usernameTaken ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {checkingUsername ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      Checking availability...
                    </span>
                  ) : usernameTaken ? (
                    <span className="flex items-center gap-1 text-xs">
                      <X className="h-3 w-3" /> This username is taken
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-1 text-xs">
                        <Check className="h-3 w-3" /> Available
                      </span>
                      {origin && (
                        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-muted/30 p-2.5 sm:flex-nowrap">
                          <span className="truncate text-sm text-foreground/80">
                            {origin}/u/{form.username}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 shrink-0 bg-background"
                              onClick={() => setQrOpen(true)}
                              title="Generate QR Code"
                            >
                              <QrCode className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 shrink-0 bg-background"
                              onClick={handleCopy}
                            >
                              {copied ? (
                                <>
                                  <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy link
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) =>
                  set("bio", e.target.value.slice(0, BIO_MAX))
                }
                placeholder="Tell people what you do…"
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {form.bio.length}/{BIO_MAX}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Bengaluru, India"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="yoursite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={!!usernameTaken}>
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save changes"
            )}
          </Button>
          {saved && (
            <span className="text-sm text-emerald-500">
              Saved successfully
            </span>
          )}
        </div>
      </div>

      <PreviewFrame data={previewData} />

      <Modal open={qrOpen} onClose={() => setQrOpen(false)} title="Your QR Code">
        <div className="flex flex-col items-center justify-center p-6 space-y-6 text-center">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-border">
            {form?.username && origin && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${origin}/u/${form.username}`)}`} 
                alt="QR Code" 
                className="h-48 w-48"
              />
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">{origin}/u/{form?.username}</p>
            <p className="mt-1 text-sm text-muted-foreground">Scan to visit your profile</p>
          </div>
          <Button 
            className="w-full" 
            onClick={() => {
              if (!form?.username || !origin) return;
              const url = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(`${origin}/u/${form.username}`)}`;
              fetch(url)
                .then(r => r.blob())
                .then(blob => {
                  const blobUrl = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.style.display = 'none';
                  a.href = blobUrl;
                  a.download = `${form.username}-qr-code.png`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(blobUrl);
                });
            }}
          >
            <Download className="mr-2 h-4 w-4" /> Download Image
          </Button>
        </div>
      </Modal>
    </div>
  );
}
