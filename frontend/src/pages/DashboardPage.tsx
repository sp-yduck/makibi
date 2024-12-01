import React, { useEffect, useState } from "react";
import { Plus, Target, CheckSquare, MessageCircle } from "lucide-react";
import { Objective } from "../types/okr";
import { Modal } from "../components/Modal";
import { CreateObjectiveForm } from "../components/CreateObjectiveForm";
import { TaskList } from "../components/TaskList";
import { ObjectiveList } from "../components/ObjectiveList";
import { AIChat } from "../components/AIChat";
import { api } from "../lib/client";

export function DashboardPage() {
  // const objectives = useOKRStore((state) => state.objectives);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"objectives" | "tasks" | "ai">(
    "objectives"
  );
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    setObjectives(api.objectives.list());
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "objectives":
        return <ObjectiveList objectives={objectives} />;
      case "tasks":
        return <TaskList />;
      case "ai":
        return <AIChat />;
      default:
        return null;
    }
  };
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("objectives")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "objectives"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Target className="h-5 w-5 inline mr-2" />
              Objectives
            </button>
            {/* <button
              onClick={() => setActiveTab("tasks")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "tasks"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CheckSquare className="h-5 w-5 inline mr-2" />
              Tasks
            </button> */}
            {/* <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "ai"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle className="h-5 w-5 inline mr-2" />
              AI Assistant
            </button> */}
          </div>
          {activeTab !== "ai" && (
            <button
              onClick={() =>
                activeTab === "objectives"
                  ? setIsCreateModalOpen(true)
                  : setIsCreateTaskModalOpen(true)
              }
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              New {activeTab === "objectives" ? "Objective" : "Task"}
            </button>
          )}
        </div>

        {renderContent()}

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Objective"
        >
          <CreateObjectiveForm onClose={() => setIsCreateModalOpen(false)} />
        </Modal>

        <Modal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          title="Create New Task"
        >
          <></>
          {/* <CreateTaskForm onClose={() => setIsCreateTaskModalOpen(false)} /> */}
        </Modal>
      </div>
    </main>
  );
}
