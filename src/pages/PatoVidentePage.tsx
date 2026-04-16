import AppLayout from "@/components/layout/AppLayout";
import PatoVidenteTab from "@/components/profile/PatoVidenteTab";

const PatoVidentePage = () => {
  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-3xl mx-auto">
        <PatoVidenteTab />
      </div>
    </AppLayout>
  );
};

export default PatoVidentePage;
