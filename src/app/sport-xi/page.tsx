// app/dashboard/sport-xi/page.tsx
"use client";
import { ProjectHeader } from "@/app/dashboard/ProjectHeader";
import { KanbanBoard } from "@/app/dashboard/KanbanBoard";

export default function SportXiProjectPage() {
  return (
    <div className="flex-1 p-0">
      <ProjectHeader />
      <KanbanBoard />
    </div>
  );
}

