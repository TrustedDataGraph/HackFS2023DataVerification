import Header from "@modules/Shared/layout/Header";
import { Datalist } from "./features/dataList";

export function Dataset() {
  return (
    <div className="h-full w-full flex flex-col gap-10">
      <Header />
      <main className="w-full h-[90%]">
        <Datalist />
      </main>
    </div>
  );
}
