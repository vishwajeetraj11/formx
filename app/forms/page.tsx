// import { AddFieldModal } from "@/components/modals/add-field";
import FormNav from "@/components/common/form-nav";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const forms = await supabase.from("forms").select("*");

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {forms?.data?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items justify-center p-6">
              <p className="">{form.title}</p>
              <p className="font-bold">
                450<span className="ml-2 font-normal">Responses</span>
              </p>
              <p className="font-bold">
                <span className="mr-2 font-normal">Created At</span>
                {form.created_at.toString()}
              </p>
            </CardContent>
          </Card>
        ) : (
          forms?.data?.map((form) => (
            <Link href={`/forms/${form.id}`} key={form.id} className="p-1">
              <Card>
                <CardContent className="flex flex-col items justify-center p-6">
                  <p className="">{form.title}</p>
                  <p className="font-bold">
                    450<span className="ml-2 font-normal">Responses</span>
                  </p>
                  <p className="font-bold">
                    <span className="mr-2 font-normal">Created At</span>
                    {form.created_at.toString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
