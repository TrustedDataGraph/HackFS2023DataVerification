import Header from "@modules/Shared/layout/Header";
import { Datalist } from "./features/dataList";
import { getDataset } from "@modules/Shared/Services";

export function Dataset() {
  getDataset(1);
  return (
    <div className="h-full w-full flex flex-col gap-10">
      <Header />
      <main className="w-full h-[90%]">
        <Datalist />
      </main>
    </div>
  );
}
