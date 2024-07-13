import { useState } from "react";

export default function Mood() {
  const moods = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    mood: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setSelectedMood(mood);
    }
  };

  return (
    <div className="bg-leafblue-400 bg-opacity-70 h-screen w-screen flex justify-center items-center">
      <div className="bg-white flex flex-col rounded-3xl h-[95%] w-1/2">
        <h1 className="pt-10 text-4xl flex text-gray-600 mx-auto font-semibold">
          Mood Tracker
        </h1>
        <div className="mx-auto flex h-[15%] mt-10 rounded-3xl w-[90%] p-2 border-leafblue-400 border-[3px] justify-center items-center space-x-2">
          <p className="text-gray-500 font-semibold text-xl w-1/6">
            How are you feeling today?
          </p>
          {moods.map((mood, index) => (
            <div
              key={index}
              className={`w-1/6 h-[90%] border-[3px] rounded-3xl border-leafblue-100 flex justify-center items-center cursor-pointer ${
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

        <textarea
          name="text"
          className="mx-auto flex h-[15%] mt-10 rounded-3xl w-[90%] p-3 border-leafblue-400 border-[3px] justify-center items-center space-x-2"
          placeholder="Note how you feel today.."
        />
      </div>
    </div>
  );
}
