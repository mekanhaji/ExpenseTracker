import { useNavigate } from "react-router-dom";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Header = () => {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigator("/ExpenseTracker")}
      >
        Spend Wisely
      </h1>
      <span
        className="text-2xl cursor-pointer"
        onClick={() => navigator("/ExpenseTracker/settings")}
      >
        ⚙️
      </span>
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="mx-auto max-w-[625px] mt-2 px-4">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
