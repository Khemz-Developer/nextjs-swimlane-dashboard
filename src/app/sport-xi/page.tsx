// app/dashboard/sport-xi/page.tsx
"use client";
import { ProjectHeader } from "@/app/components/kanban-dashboard-components/ProjectHeader";
import { KanbanBoard } from "../components/kanban-dashboard-components/KanbanBoard";

export default function SportXiProjectPage() {
  return (
    <div className="flex-1 p-0">
      <ProjectHeader />
      <KanbanBoard />
    </div>
  );
}

