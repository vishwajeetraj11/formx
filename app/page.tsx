import FormNav from "@/components/common/form-nav";
import FormFooter from "@/components/common/form-footer";
import FormDashboard from "@/components/common/form-dashboard";

export default async function Home() {
  return (
    <>
      <FormNav />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FormDashboard />
        </div>
      </div>
      <FormFooter />
    </>
  );
}
