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

type Props = {};

const Analytics = (props: Props) => {
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
          {Array.from({ length: 50 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items justify-center p-6">
                    <p className="">School Admission Form</p>
                    <p className="font-bold">
                      450<span className="ml-2 font-normal">Responses</span>
                    </p>
                    <p className="font-bold">
                      <span className="mr-2 font-normal">Created At</span>
                      24th May, 2020
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
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
