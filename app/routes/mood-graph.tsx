// import { useEffect, useState } from "react";

import { fetchMoodData } from "../utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { MoodChart } from "../components/moodchart";
import { processData } from "../utils/moodgraph";

export interface MoodData {
  date: string;
  note: string;
  emotions: string[];
  mood: string;
  userId: string;
  percent: string;
}

export interface ProcessedMoodData {
  date: string;
  averagePercent: number;
}

export const loader = async () => {
  const data = await fetchMoodData();
  console.log(data);
  return data;
};

const App = () => {
  const data = useLoaderData<MoodData[]>();

  const chartData = processData(data);

  return (
    <div className="h-screen w-screen flex flex-col bg-leafblue-200 bg-opacity-20">
      <h1 className="flex justify-center w-[80%] mt-10 mx-auto text-3xl font-semibold text-slate-600">
        Mood Chart
      </h1>
      <div className="h-[70%] w-[80%] mt-20 flex justify-center items-center p-5 rounded-3xl mx-auto bg-white">
        {chartData.length > 0 ? (
          <MoodChart data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
