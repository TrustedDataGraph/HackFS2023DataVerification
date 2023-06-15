import Header from "@modules/Shared/layout/Header";
import { DataSummary } from "./features/dataSummary";
import { VerificationList } from "./features/verificationList";

export function DataActivities() {
  return (
    <div className="h-full w-full flex flex-col ">
      <Header />
      <main className="w-full h-[90%]">
        <DataSummary />
        <VerificationList />
      </main>
    </div>
  );
}
