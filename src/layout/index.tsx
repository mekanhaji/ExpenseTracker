type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
