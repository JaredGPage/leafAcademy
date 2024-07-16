// import { useEffect, useState } from "react";

import { fetchMoodData } from "../utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { MoodChart } from "../components/moodchart";
import { processData } from "../utils/moodgraph";
import { getUserSession } from "../utils/session.server";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import "../styles/ChartStyle.css";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }
  const userId = sessionUser.uid;
  const data = await fetchMoodData(userId);
  return data;
};

const App = () => {
  const data = useLoaderData<MoodData[]>();

  const chartData = processData(data);

  return (
    <div className="h-screen w-screen flex flex-col justify-center bg-leafblue-200 bg-opacity-20">
      <h1 className="hidden lg:flex justify-center w-[80%] mt-12 lg:mt-10 mx-auto text-3xl font-semibold text-slate-600">
        Mood Chart
      </h1>
      <div className="h-full w-[100%]  md:w-[80%] mt-1 lg:mt-10 flex flex-col items-center p-5 rounded-3xl mx-auto bg-white">
        <a href="/homepage/home" className="relative top-0 left-0 w-full">
          <p className="text-xl text-slate-500">{"< Back"}</p>
        </a>
        <div className="w-[100%] h-[100%] relative">
          <div className="fixed-label">Average Mood</div>
          <div className="fixed-y-labels mt-2 text-slate-500 font-semibold">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          {chartData.length > 0 ? (
            <div className="chart-wrapper mt-14 border-slate-200 border-2 rounded-3xl">
              <MoodChart data={chartData} />
              <div className="-ml-4 flex justify-center items-center mx-auto w-full">
                <p className="font-semibold text-slate-600">Date</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
