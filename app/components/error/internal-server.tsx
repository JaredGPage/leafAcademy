import logo from "../../../images/leafLogo.png";

export function InternalServerError() {
  return (
    <div className="h-screen w-screen bg-leafblue-400 bg-opacity-10 flex flex-col items-center justify-center">
      <picture className="mb-4 flex items-center mx-auto justify-center">
        <img className="w-1/2 h-auto" src={logo} alt="logo" />
      </picture>
      <h1 className="text-4xl font-sans text-leafblue-100 font-bold">
        500 Internal Server Error
      </h1>
      <p className="text-xl text-leafblue-100">
        Something went wrong on our end. Please try again later.
      </p>
      <a
        href="homepage/home"
        className="rounded-full w-1/4 h-10 font-semibold text-lg text-center items-center justify-center flex bg-leafblue-200 text-white"
      >
        Home
      </a>
    </div>
  );
}
