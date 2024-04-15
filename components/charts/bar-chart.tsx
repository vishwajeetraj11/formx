"use client";
import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Amphibians",
    "Number of responses": 2488,
  },
  {
    name: "Birds",
    "Number of responses": 1445,
  },
  {
    name: "Crustaceans",
    "Number of responses": 743,
  },
  {
    name: "Ferns",
    "Number of responses": 281,
  },
  {
    name: "Arachnids",
    "Number of responses": 251,
  },
  {
    name: "Corals",
    "Number of responses": 232,
  },
  {
    name: "Algae",
    "Number of responses": 98,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartHero = () => (
  <BarChart
    data={chartdata}
    index="name"
    categories={["Number of responses"]}
    colors={["green"]}
    valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />
);
