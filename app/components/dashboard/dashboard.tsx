import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chart } from "../chart/chart";
import { Link } from "@tanstack/react-router";
import { WeightForm } from "../form/form";
import {
  fetchDashboardData,
  fetchGoalData,
  updateGoalWeight,
} from "@/lib/weighings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WeightTable } from "../history/history";
import { Skeleton } from "../ui/skeleton";
import StatsCard from "../dashboardStatsCard/dashboardStatsCard";
import { useState } from "react";
import { EditGoalWeightDialog } from "../editGoalDialog/editGoalDialog";
export type DashboardTabs = "overview" | "history" | "add";
interface DashboardProps {
  activeTab: DashboardTabs;
}

export function Dashboard({ activeTab }: DashboardProps) {
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);

  const {
    data = {
      currentWeight: 0,
      currentWeightChange: "+ 0",
      startingWeight: 0,
      startingWeightChange: "+ 0",
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weighing"],
    queryFn: fetchDashboardData,
  });

  const {
    data: goalData = {
      goalWeight: 0,
      toGo: 0,
    },
    isLoading: isLoadingGoal,
    isError: isErrorGoal,
  } = useQuery({
    queryKey: ["goalWeight"],
    queryFn: fetchGoalData,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateGoalWeight,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goalWeight"],
      });
    },
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>
            Your weight tracking journey at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Current Weight"
              value={`${data.currentWeight} kg`}
              trend={`${data.currentWeightChange} kg`}
              isLoading={isLoading}
            />

            <StatsCard
              title="Starting Weight"
              value={`${data.startingWeight} kg`}
              trend={`${data.startingWeightChange} kg total`}
              isLoading={isLoading}
            />

            <StatsCard
              title="Goal Weight"
              value={`${goalData.goalWeight} kg`}
              trend={`${goalData.toGo} kg to go`}
              isLoading={isLoadingGoal}
              editable={true}
              onEditClick={() => {
                setIsEditGoalOpen(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger asChild value="overview">
            <Link to="/$tab" params={{ tab: "overview" }}>
              Overview
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="history">
            <Link to="/$tab" params={{ tab: "history" }}>
              History
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="add">
            <Link to="/$tab" params={{ tab: "add" }}>
              Add Entry
            </Link>
          </TabsTrigger>
        </TabsList>
        {activeTab === "overview" && (
          <Card className="pb-4">
            <CardHeader>
              <CardTitle>Weight Trend</CardTitle>
              <CardDescription>Your progress over time</CardDescription>
            </CardHeader>

            <CardContent className="pt-6 pb-12">{<Chart />}</CardContent>
          </Card>
        )}
        {activeTab === "history" && (
          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>All your recorded entries</CardDescription>
            </CardHeader>
            <CardContent>{<WeightTable />}</CardContent>
          </Card>
        )}
        {activeTab === "add" && (
          <Card>
            <CardHeader>
              <CardTitle>Add Weight Entry</CardTitle>
              <CardDescription>Record your current weight</CardDescription>
            </CardHeader>
            <CardContent>{<WeightForm />}</CardContent>
          </Card>
        )}
      </Tabs>
      <EditGoalWeightDialog
        open={isEditGoalOpen}
        currentGoal={100}
        onOpenChange={setIsEditGoalOpen}
        onSave={(weight: number) => {
          mutation.mutate({ data: { weight } });
        }}
      />
    </div>
  );
}
