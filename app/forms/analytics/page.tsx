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
