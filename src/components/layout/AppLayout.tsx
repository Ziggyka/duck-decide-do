import { ReactNode } from "react";
import TopNav from "./TopNav";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface AppLayoutProps {
  children: ReactNode;
  hideRightSidebar?: boolean;
}

const AppLayout = ({ children, hideRightSidebar }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-1">
        <LeftSidebar />
        <main className="main-content p-6">
          {children}
        </main>
        {!hideRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
};

export default AppLayout;
