import DashBoardLayout from "@/components/layouts/dashboard-layout";

export const DashboardRoute = () => {
  return (
    <DashBoardLayout>
      <main className="flex flex-1 flex-col gap-6 p-6  bg-muted/40 overflow-y-auto"></main>
    </DashBoardLayout>
  );
};
