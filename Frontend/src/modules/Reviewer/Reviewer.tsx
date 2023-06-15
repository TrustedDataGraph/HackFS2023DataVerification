import Header from "@modules/Shared/layout/Header";
import { ReviewerSummary } from "./features/reviewerSummary";
import { ReviewList } from "./features/reviewList";

export function Reviewer() {
  return (
    <div className="h-full w-full flex flex-col  ">
      <Header />
      <main className="w-full h-[90%]">
        <ReviewerSummary />
        <ReviewList />
      </main>
    </div>
  );
}
