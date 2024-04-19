"use client";
import { DonutChart } from "@tremor/react";
import React from "react";

type Props = {
  data: { name: string; value: number }[];
};

const PieChart = (props: Props) => {
  const { data } = props;
  return (
    <div>
      <DonutChart
        data={data}
        variant="pie"
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
};

export const PieChartLoader = () => {
  return (
    <div className="relative h-[266px] p-6 w-full mb-5 overflow-hidden rounded-2xl bg-white/10 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100 before:bg-gradient-to-r before:from-transparent before:via-slate-50/50 before:to-transparent">
      <div className="pie-chart absolute mt-[-40px]"></div>
    </div>
  );
};

export default PieChart;
