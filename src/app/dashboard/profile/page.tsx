"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ImagePlus, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/lib/auth-context";
import { isUsernameAvailable } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import type { ProfileData } from "@/lib/types";

const BIO_MAX = 160;

export default function ProfilePage() {
  const { user } = useAuth();
  const { data, ready, update } = useAppData();
  const [form, setForm] = useState<ProfileData | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && !form) setForm(data.profile);
  }, [data, form]);

  if (!ready || !data || !form) {
    return <div className="h-96 rounded-2xl skeleton" />;
  }

  const usernameTaken =
    form.username.length > 0 &&
    user &&
    !isUsernameAvailable(form.username, user.uid);

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
                <p
                  className={`mt-1.5 flex items-center gap-1 text-xs ${
                    usernameTaken ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {usernameTaken ? (
                    <>
                      <X className="h-3 w-3" /> This username is taken on this
                      device
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" /> Available
                    </>
                  )}
                </p>
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
              Saved to your browser
            </span>
          )}
        </div>
      </div>

      <PreviewFrame data={previewData} />
    </div>
  );
}
