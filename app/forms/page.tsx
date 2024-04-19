import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { timeDifference } from "@/lib/utils";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const forms = await supabase.from("forms").select("*");

  const currentDate = new Date();

  return (
    <div className="max-w-[1200px] mx-auto mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {forms?.data?.length === 0
          ? "EMPTY_STATE"
          : forms?.data?.map((form) => (
              <Link href={`/forms/${form.id}`} key={form.id} className="p-1">
                <Card>
                  <CardContent className="flex flex-col p-6">
                    <p className="">{form.title}</p>
                    <p className="font-bold">
                      450<span className="ml-2 font-normal">Responses</span>
                    </p>
                    <p className="font-bold">
                      <span className="mr-2 font-normal">Created At</span>
                      {timeDifference(currentDate, new Date(form.created_at))}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
}
