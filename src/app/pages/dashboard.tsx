"use client"

import { useEffect } from "react";
import Header from "../components/NavBar";
import { ProjectHeader } from "../dashboard/ProjectHeader";
import { Sidebar } from "../components/SideBar";
import { useTaskStore } from "../store/taskStore";
import { Kanban } from "lucide-react";
import { KanbanBoard } from "../dashboard/KanbanBoard";

// components/MyComponent.jsx
export default function Dashboard() {

  const initializeData = useTaskStore((state) => state.initializeData);

  useEffect(() => {
    initializeData(); // ✅ Load project and tasks from tasks.json
  }, []);
 return (
  <div>
    <Header />
    <div className="flex"> {/* Flex row: Sidebar + Right content */}
      <Sidebar />
      <div className="flex-1 p-0"> {/* Right content takes remaining space */}
        <ProjectHeader />
        <KanbanBoard/>
      </div>
    </div>
  </div>
);
}
