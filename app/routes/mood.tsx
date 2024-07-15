import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { saveMood } from "../utils/db.server";
import { getUserSession } from "../utils/session.server";
import emotionsData from "../utils/emotions.json";
import "../styles/Moodelector.css";

type ActionData = {
  error?: string;
};

type Emotion = {
  emotion: string;
  categories: string[];
};

const categorizeEmotion = (value: number): string => {
  if (value < 40) return "bad";
  if (value < 70) return "neutral";
  return "good";
};

const sortEmotions = (value: number): Emotion[] => {
  const category = categorizeEmotion(value);

  const sortedEmotions = emotionsData.emotions.sort((a, b) => {
    const aMatches = a.categories.includes(category);
    const bMatches = b.categories.includes(category);

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return a.emotion.localeCompare(b.emotion);
  });

  return sortedEmotions;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    return redirect("/login");
  }

  return sessionUser;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const mood = formData.get("mood");
  const note = formData.get("note");
  const percent = formData.get("percent");

  const emotions = JSON.parse(
    formData.get("selectedEmotions") as string
  ) as string[];

  const sessionUser = await getUserSession(request);

  const userId = sessionUser?.uid;

  if (!userId) {
    return redirect("/login");
  }

  if (
    typeof mood !== "string" ||
    typeof note !== "string" ||
    typeof percent !== "string" ||
    !Array.isArray(emotions) ||
    emotions.some((emotion) => typeof emotion !== "string")
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  await saveMood({ userId, mood, percent, note, emotions });

  return redirect("/homepage/home");
};

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const actionData = useActionData<ActionData>();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [sortedEmotions, setSortedEmotions] = useState<Emotion[]>(
    sortEmotions(50)
  );
  const [sliderValue, setSliderValue] = useState<number>(50);

  const updateMood = (value: number) => {
    if (value < 20) setSelectedMood("Bad");
    else if (value < 40) setSelectedMood("Okay");
    else if (value < 60) setSelectedMood("Neutral");
    else if (value < 80) setSelectedMood("Good");
    else setSelectedMood("Great");
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSliderValue(value);
    updateMood(value);
    setSortedEmotions(sortEmotions(value));
  };

  const handleEmotionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emotion = event.target.value;
    setSelectedEmotions((prevSelectedEmotions) => {
      if (prevSelectedEmotions.includes(emotion)) {
        return prevSelectedEmotions.filter((e) => e !== emotion);
      } else {
        return [...prevSelectedEmotions, emotion];
      }
    });
  };

  return (
    <div className="bg-leafblue-400 bg-opacity-40 h-screen w-screen flex justify-center items-center">
      <div className="bg-white flex flex-col rounded-3xl h-[99%] lg:h-[95%] w-[99%] md:w-3/4 lg:w-1/2">
        <a href="/homepage/home" className="relative top-4 left-4">
          <p className="text-xl text-slate-500">{"< Back"}</p>
        </a>
        <h1 className="pt-4 lg:pt-6 text-2xl lg:text-4xl flex text-gray-600 mx-auto font-semibold">
          Mood Tracker
        </h1>
        <p className="text-gray-500 font-semibold pl-5 pt-2 lg:hidden w-full">
          How are you feeling today?
        </p>
        <div className="mx-auto flex h-[15%] mt-1 lg:mt-10 rounded-3xl w-[98%] lg:w-[90%] p-2 bg-leafblue-200 bg-opacity-10 justify-center items-center space-x-1 lg:space-x-2">
          <p className="text-gray-500 font-semibold hidden lg:block text-xl w-1/6">
            How are you feeling today?
          </p>
          <div className="w-4/5 lg:w-5/6 h-[90%] flex flex-col justify-center items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-4 rounded-lg appearance-none cursor-pointer mood-slider"
            />
            <p className="mt-2 text-lg text-slate-600 font-semibold">
              {selectedMood
                ? selectedMood
                : "Move the slider to select your mood"}
            </p>
          </div>
        </div>

        <Form
          method="post"
          className="flex flex-col items-center w-full h-[70%]"
        >
          <input type="hidden" name="mood" value={selectedMood ?? ""} />
          <input type="hidden" name="percent" value={sliderValue ?? ""} />
          <textarea
            name="note"
            className="mx-auto flex h-[15%] pl-8 mt-2 overflow-y-scroll scrollbar-none lg:mt-10 rounded-3xl w-[98%] lg:w-[90%] p-3 border-leafblue-400 border-[3px] ring-1 ring-inset ring-leafblue-200 justify-center items-center space-x-2 focus:ring-inset focus:ring-4 focus:ring-leaf-200 focus:border-none focus:outline-none"
            placeholder="Note how you feel today.."
          />
          <div className="h-[70%] mt-4 flex flex-col overflow-y-scroll scrollbar-none w-[100%] lg:w-[90%]">
            <h3 className="pl-8 pt-3 text-leafblue-100 font-semibold">
              Select Your Emotions
            </h3>
            <ul className="flex flex-col w-[100%] p-5 space-y-2">
              {sortedEmotions.map((emotionObj) => {
                const emotion = emotionObj.emotion;
                const isSelected = selectedEmotions.includes(emotion);
                return (
                  <li
                    key={emotion}
                    className={`rounded-3xl w-full p-2 font-semibold  ${
                      isSelected
                        ? "bg-leafblue-400 bg-opacity-85 text-white "
                        : "bg-leafblue-400 bg-opacity-30 text-slate-500"
                    }`}
                  >
                    <label className="flex text-center items-center pl-2 hover:cursor-pointer">
                      <input
                        type="checkbox"
                        value={emotion}
                        checked={isSelected}
                        onChange={handleEmotionChange}
                        className="hidden" // Hide the checkbox itself
                      />
                      <span className="text-center flex items-center justify-center mx-auto">
                        {emotion}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <input
            type="hidden"
            name="selectedEmotions"
            value={JSON.stringify(selectedEmotions)}
          />
          <button
            type="submit"
            className="mt-4 mb-2 p-2 bg-leafblue-400 text-white rounded-xl"
          >
            Submit
          </button>
          {actionData?.error && (
            <p className="text-red-500 mt-2">{actionData.error}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
