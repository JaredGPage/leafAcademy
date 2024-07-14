import { ChangeEvent, useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { saveMood } from "../utils/db.server";
import { getUserSession } from "../utils/session.server";
import emotions from "../utils/emotions.json";

type ActionData = {
  error?: string;
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
    !Array.isArray(emotions) ||
    emotions.some((emotion) => typeof emotion !== "string")
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  await saveMood({ userId, mood, note, emotions });

  return redirect("/homepage/home");
};

export default function Mood() {
  const moods = ["Terrible", "Bad", "Okay", "Good", "Great"];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const actionData = useActionData<ActionData>();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    mood: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setSelectedMood(mood);
    }
  };

  const handleEmotionChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className="bg-leafblue-400 bg-opacity-70 h-screen w-screen flex justify-center items-center">
      <div className="bg-white flex flex-col rounded-3xl h-[99%] lg:h-[95%] w-[99%] md:w-3/4 lg:w-1/2">
        <h1 className="pt-5 lg:pt-10 text-2xl lg:text-4xl flex text-gray-600 mx-auto font-semibold">
          Mood Tracker
        </h1>
        <p className="text-gray-500 font-semibold pl-5 pt-2 lg:hidden w-full">
          How are you feeling today?
        </p>
        <div className="mx-auto flex h-[15%] mt-1 lg:mt-10 rounded-3xl w-[98%] lg:w-[90%] p-2 border-leafblue-400 border-[3px] justify-center items-center space-x-1 lg:space-x-2">
          <p className="text-gray-500 font-semibold hidden lg:block text-xl w-1/6">
            How are you feeling today?
          </p>
          {moods.map((mood, index) => (
            <div
              key={index}
              className={`w-1/5 lg:w-1/6 h-[90%] border-[3px] rounded-3xl border-leafblue-100 flex justify-center items-center cursor-pointer ${
                selectedMood === mood ? "bg-leafblue-100" : ""
              }`}
              onClick={() => setSelectedMood(mood)}
              onKeyPress={(event) => handleKeyPress(event, mood)}
              role="button"
              tabIndex={0}
            >
              <p>{mood}</p>
            </div>
          ))}
        </div>

        <Form
          method="post"
          className="flex flex-col items-center w-full h-[70%]"
        >
          <input type="hidden" name="mood" value={selectedMood ?? ""} />
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
              {emotions.emotions.map((emotion) => {
                const isSelected = selectedEmotions.includes(emotion);
                return (
                  <li
                    key={emotion}
                    className={`rounded-3xl w-full p-2 font-semibold  ${
                      isSelected
                        ? "bg-leafblue-400 bg-opacity-85 text-white "
                        : "bg-leafblue-400 bg-opacity-40 text-slate-500"
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
            className="mt-4 p-2 bg-leafblue-400 text-white rounded-xl"
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
