import { useState } from "react";
import AppLayout from "../../layout";
import CreateUpdateExpenseModal from "./components/CreateUpdateExpenseModal";
import ExpenseRecordsList from "./components/ExpenseRecordsList";
import ExpenseProgressHeader from "./components/ExpenseProgressHeader";

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string | null>(null);

  return (
    <AppLayout>
      <main className="my-2 flex flex-col items-center gap-4">
        <ExpenseProgressHeader />

        <CreateUpdateExpenseModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          setUpdateId={setUpdateId}
          updateId={updateId}
        />

        <ExpenseRecordsList
          setIsDialogOpen={setIsDialogOpen}
          setUpdateId={setUpdateId}
          updateId={updateId}
        />
      </main>
    </AppLayout>
  );
};

export default Home;
