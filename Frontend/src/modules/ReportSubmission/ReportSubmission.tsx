import { ReportForm } from "./features/reportForm";
import Header from "./layout/Header";

export function ReportSubmission() {
  return (
    <div className="h-full w-full flex flex-col gap-10">
      <Header />
      <main className="w-full h-[90%]">
        <ReportForm />
      </main>
    </div>
  );
}
