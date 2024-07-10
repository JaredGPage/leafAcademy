export default function NeonButtons() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="space-x-4">
        <a
          href="../"
          className="animate-background rounded-3xl inline-block from-pink-500 via-white to-black bg-[length:_400%_400%] p-0.5 [animation-duration:_1s] bg-gradient-to-r"
        >
          <span className="block rounded-full bg-black px-5 py-3 text-white">
            {" "}
            Get Started{" "}
          </span>
        </a>
        <a
          href="../"
          className="text-lime-400 border border-lime-400 animate-pulse p-2 rounded-3xl"
        >
          Neon Button
        </a>
        <a href="../" className="neon-button neon-button-pink">
          Neon Button
        </a>
        <a href="../" className="neon-button neon-button-blue">
          Neon Button
        </a>
      </div>
    </div>
  );
}
