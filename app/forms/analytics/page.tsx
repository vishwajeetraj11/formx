import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BarChartHero } from "@/components/charts/bar-chart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { timeDifference, truncateString } from "@/lib/utils";

type Props = {};

const Analytics = async (props: Props) => {
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
    <div className="w-[1200px] mx-auto">
      <h1 className="text-2xl my-8 text-center">Analytics</h1>
      <h1 className="text-2xl my-8 text-left">Forms</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mb-10"
      >
        <CarouselContent>
          {forms.data?.map((form, index) => (
            <Link href={`/forms/${form.id}/analytics`} key={form.id}>
              <CarouselItem className="basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col h-28 w-48 p-6">
                      <div>
                        <p>{truncateString(form.title, 16)}</p>
                        <p className="font-bold text-xs mt-1">
                          450<span className="ml-1 font-normal">Responses</span>
                        </p>
                      </div>
                      <p className="font-bold text-xs">
                        <span className="mr-1 font-normal">Created </span>
                        {timeDifference(
                          currentDate,
                          new Date(form?.created_at),
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <BarChartHero />
    </div>
  );
};

export default Analytics;
