import logo from "../../../images/leafLogo.png";

export function NotFound() {
  return (
    <div className="h-screen w-screen bg-leafblue-400 bg-opacity-10 flex flex-col items-center justify-center">
      <picture className="mb-4 flex items-center mx-auto justify-center">
        <img className="w-1/2 h-auto" src={logo} alt="logo" />
      </picture>
      <h1 className="text-4xl font-sans text-leafblue-100 font-bold">
        404 Oops
      </h1>
      <p className="text-xl text-leafblue-100">
        What you are looking for does not exist!
      </p>
      <div className="mt-10 w-full justify-center items-center flex">
        <a
          href="home"
          className="rounded-full w-1/4 h-10 font-semibold text-lg text-center items-center justify-center flex bg-leafblue-200 text-white"
        >
          Home
        </a>
      </div>
    </div>
  );
}
