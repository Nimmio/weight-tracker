// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Dashboard } from "@/components/dashboard/dashboard";
import { weighingsQueryOptions } from "@/lib/weighings";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(weighingsQueryOptions());
  },
});

function Home() {
  const weighingsQuery = useSuspenseQuery(weighingsQueryOptions());
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Weight Tracker</h1>
      <Dashboard activeTab="overview" />
    </>
  );
}
