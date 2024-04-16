import FormNav from "@/components/common/form-nav";
import FormFooter from "@/components/common/form-footer";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <FormNav />
      <FormFooter />
    </div>
  );
}
