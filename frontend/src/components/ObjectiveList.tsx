import { Target } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { cn, getProgressColor } from "../lib/utils";
// import { TimeProgressBar } from "./TimeProgressBar";
import { getUser } from "../context/User";
import { Objective } from "../types/okr";

interface ObjectiveListProps {
  objectives: Objective[];
}

export function ObjectiveList({ objectives }: ObjectiveListProps) {
  return objectives.length === 0 ? (
    <div className="text-center py-12">
      <Target className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No objectives</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new objective.
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {objectives.map((objective) => (
        <ObjectiveCard key={objective.id} objective={objective} />
      ))}
    </div>
  );
}

interface ObjectiveCardProps {
  objective: Objective;
}

function ObjectiveCard({ objective }: ObjectiveCardProps) {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div
      className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => navigate(`/${user.user_id}/objective/${objective.id}`)}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {objective.title}
          </h3>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
        <p className="mt-1 text-sm text-gray-500">{objective.description}</p>

        <div className="mt-6 space-y-4">
          <div>
            {/* <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${objective.progress}%` }}
                  className={cn(
                    "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center",
                    getProgressColor(objective.progress)
                  )}
                />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span>{objective.progress}% complete</span>
            </div> */}
          </div>

          {/* <TimeProgressBar
            startDate={objective.startDate}
            dueDate={objective.dueDate}
          /> */}
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6">
        <div className="text-sm">
          <span className="font-medium text-gray-900">
            {objective.keyResults.length} Key Results
          </span>
        </div>
      </div>
    </div>
  );
}
