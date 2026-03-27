import { ReactNode, useState, createContext, useContext } from "react";
import TopNav from "./TopNav";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({ collapsed: false, setCollapsed: () => {} });
export const useSidebarCollapse = () => useContext(SidebarContext);

interface AppLayoutProps {
  children: ReactNode;
  hideRightSidebar?: boolean;
}

const AppLayout = ({ children, hideRightSidebar }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
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
    </SidebarContext.Provider>
  );
};

export default AppLayout;
