// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Dashboard, DashboardTabs } from "@/components/dashboard/dashboard";
import { weighingsQueryOptions } from "@/lib/weighings";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/$tab")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(weighingsQueryOptions());
  },
});

function Home() {
  const weighingsQuery = useSuspenseQuery(weighingsQueryOptions());
  const { tab } = Route.useParams();
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Weight Tracker</h1>
      <Dashboard activeTab={tab as DashboardTabs} />
    </>
  );
}
