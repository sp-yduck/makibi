import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Target, BarChart2, Plus, Pencil, Edit } from "lucide-react";
import { cn } from "../lib/utils";
import { ProgressModal } from "../components/ProgressModal";
import { EditModal } from "../components/EditModal";
// import { TaskList } from "../components/TaskList";
import { Modal } from "../components/Modal";
import { CreateTaskForm } from "../components/CreateTaskForm";
import { getUser } from "../context/User";
import { api } from "../lib/client";
import { Objective } from "../types/okr";
import { EditObjectiveForm } from "../components/EditObjectiveForm";

export function ObjectiveDetailsPage() {
  const { objectiveId } = useParams<{ objectiveId: string }>();
  const navigate = useNavigate();
  const user = getUser();
  const [objective, setObjective] = useState<Objective>();
  const [selectedKR, setSelectedKR] = useState<string | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditObjectiveModalOpen, setIsEditObjectiveModalOpen] =
    useState(false);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: "objective-title" | "objective-description" | "kr-title";
    title: string;
    value: string;
    krId?: string;
  }>({
    isOpen: false,
    type: "objective-title",
    title: "",
    value: "",
  });

  useEffect(() => {
    setObjective(api.objectives.get(objectiveId));
  }, [objectiveId]);

  const handleUpdateObjective = (updates: Partial<typeof objective>) => {
    // updateObjective({ ...objective, ...updates });
  };

  const handleUpdateKeyResult = (
    krId: string,
    updates: Partial<(typeof objective.keyResults)[0]>
  ) => {
    const updatedKeyResults = objective.keyResults.map((kr) =>
      kr.id === krId ? { ...kr, ...updates } : kr
    );
    handleUpdateObjective({ keyResults: updatedKeyResults });
  };

  const handleProgressUpdate = (progress: number) => {
    if (selectedKR) {
      handleUpdateKeyResult(selectedKR, { progress });
    }
  };

  const handleEditSave = (value: string) => {
    switch (editModal.type) {
      case "objective-title":
        handleUpdateObjective({ title: value });
        break;
      case "objective-description":
        handleUpdateObjective({ description: value });
        break;
      case "kr-title":
        if (editModal.krId) {
          handleUpdateKeyResult(editModal.krId, { title: value });
        }
        break;
    }
    setEditModal({ ...editModal, isOpen: false });
  };

  return objective ? (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/${user.user_id}/dashboard`)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {objective.title}
              </h1>
              {/* <button
                onClick={() =>
                  setEditModal({
                    isOpen: true,
                    type: "objective-title",
                    title: "Edit Objective Title",
                    value: objective.title,
                  })
                }
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </button> */}
            </div>
          </div>
          <button
            onClick={() => setIsEditObjectiveModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Objective
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <p className="text-gray-600">{objective.description}</p>
              </div>
              {/* <button
                onClick={() =>
                  setEditModal({
                    isOpen: true,
                    type: "objective-description",
                    title: "Edit Objective Description",
                    value: objective.description,
                  })
                }
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </button> */}
            </div>

            <div className="mt-6">
              {/* <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${objective.progress}%` }}
                    className={cn(
                      "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                      objective.progress < 50
                        ? "bg-red-500"
                        : objective.progress < 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    )}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>{objective.progress}% complete</span>
                <span>
                  Due {new Date(objective.dueDate).toLocaleDateString()}
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Key Results
              </h2>
              <div className="space-y-6">
                {objective.keyResults.map((kr) => (
                  <div
                    key={kr.id}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {kr.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {/* <button
                          onClick={() =>
                            setEditModal({
                              isOpen: true,
                              type: "kr-title",
                              title: "Edit Key Result",
                              value: kr.title,
                              krId: kr.id,
                            })
                          }
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Pencil className="h-4 w-4 text-gray-500" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedKR(kr.id);
                            setIsProgressModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                          <BarChart2 className="h-5 w-5" />
                        </button> */}
                      </div>
                    </div>
                    <div className="mt-4">
                      {/* <div className="relative">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div
                            style={{ width: `${kr.progress}%` }}
                            className={cn(
                              "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                              kr.progress < 50
                                ? "bg-red-500"
                                : kr.progress < 80
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            )}
                          />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-gray-600">
                        <span>{kr.progress}% complete</span>
                        <span>
                          {kr.current} / {kr.target} {kr.unit}
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 ">
              <div className="flex items-center justify-between pb-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Related Tasks
                </h2>
                <button
                  onClick={() => {}}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Task
                </button>
              </div>
              <TaskList objectiveId={objective.id} />
            </div>
          </div> */}
        </div>

        <ProgressModal
          isOpen={isProgressModalOpen}
          onClose={() => {
            setIsProgressModalOpen(false);
            setSelectedKR(null);
          }}
          title="Update Progress"
          currentProgress={
            objective.keyResults.find((kr) => kr.id === selectedKR)?.progress ||
            0
          }
          onSave={handleProgressUpdate}
        />

        {/* <EditModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ ...editModal, isOpen: false })}
          title={editModal.title}
          initialValue={editModal.value}
          onSave={handleEditSave}
          type={
            editModal.type === "objective-description" ? "textarea" : "input"
          }
        /> */}
        <Modal
          isOpen={isEditObjectiveModalOpen}
          onClose={() => setIsEditObjectiveModalOpen(false)}
          title="Edit Objective"
        >
          <EditObjectiveForm
            onClose={() => setIsEditObjectiveModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isCreateTaskModalOpen}
          onClose={() => setIsCreateTaskModalOpen(false)}
          title="Create New Task"
        >
          <CreateTaskForm
            onClose={() => setIsCreateTaskModalOpen(false)}
            objectiveId={objective.id}
          />
        </Modal>
      </div>
    </main>
  ) : (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <Target className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Objective not found
        </h3>
        <button
          onClick={() => navigate(`/${user.user_id}/dashboard`)}
          className="mt-4 inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}
