"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Link2, Pencil, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { LINK_ICONS } from "@/lib/constants";
import { createId, cn } from "@/lib/utils";
import type { LinkItem } from "@/lib/types";

export default function LinksPage() {
  const { data, ready, update } = useAppData();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editing, setEditing] = useState<LinkItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  useEffect(() => {
    if (data) setLinks(data.links);
  }, [data]);

  if (!ready || !data) return <div className="h-96 rounded-2xl skeleton" />;

  const persist = (next: LinkItem[]) => {
    setLinks(next);
    update((prev) => ({ ...prev, links: next }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    persist(arrayMove(links, oldIndex, newIndex));
  };

  const openAdd = () => {
    setEditing({ id: createId(), title: "", url: "", icon: "Link2" });
    setModalOpen(true);
  };
  const openEdit = (link: LinkItem) => {
    setEditing({ ...link });
    setModalOpen(true);
  };

  const saveLink = () => {
    if (!editing || !editing.title.trim() || !editing.url.trim()) return;
    const exists = links.some((l) => l.id === editing.id);
    persist(
      exists
        ? links.map((l) => (l.id === editing.id ? editing : l))
        : [...links, editing]
    );
    setModalOpen(false);
    setEditing(null);
  };

  const deleteLink = (id: string) =>
    persist(links.filter((l) => l.id !== id));

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Links</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit and drag to reorder your links.
            </p>
          </div>
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Link
          </Button>
        </div>

        {links.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <span className="brand-gradient mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <Link2 className="h-6 w-6 text-white" />
            </span>
            <p className="font-medium">No links yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first link to get started.
            </p>
            <Button className="mt-5" onClick={openAdd}>
              <Plus className="h-4 w-4" /> Add Link
            </Button>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={links} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {links.map((link) => (
                  <SortableLink
                    key={link.id}
                    link={link}
                    onEdit={() => openEdit(link)}
                    onDelete={() => deleteLink(link.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <PreviewFrame data={{ ...data, links }} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing && links.some((l) => l.id === editing.id) ? "Edit link" : "Add link"}
      >
        {editing && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="My YouTube channel"
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={editing.url}
                onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                placeholder="https://youtube.com/@you"
              />
            </div>
            <div>
              <Label>Icon</Label>
              <div className="grid grid-cols-8 gap-2">
                {LINK_ICONS.map((name) => (
                  <button
                    key={name}
                    onClick={() => setEditing({ ...editing, icon: name })}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-lg border transition-colors",
                      editing.icon === name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <Icon name={name} className="h-[18px] w-[18px]" />
                  </button>
                ))}
              </div>
            </div>
            <Button
              className="w-full"
              onClick={saveLink}
              disabled={!editing.title.trim() || !editing.url.trim()}
            >
              Save link
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function SortableLink({
  link,
  onEdit,
  onDelete,
}: {
  link: LinkItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5",
        isDragging && "z-10 shadow-xl"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon name={link.icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{link.title}</p>
        <p className="truncate text-xs text-muted-foreground">{link.url}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onEdit} aria-label="Edit">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        aria-label="Delete"
        className="text-red-500 hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
