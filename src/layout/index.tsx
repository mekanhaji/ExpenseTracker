type AppLayoutProps = {
  children: React.ReactNode;
};

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Expense Tracer</h1>
      <span className="text-2xl cursor-pointer">⚙️</span>
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
