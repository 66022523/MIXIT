import { Player } from "@lottiefiles/react-lottie-player";

export default function Custom500() {
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 space-y-4 text-center">
      <Player
        className="h-60"
        src="/assets/animations/cat-in-library.json"
        loop
        autoplay
      />
      <div>
        <h1 className="font-bold">
          <u>500</u> - Server-side error occurred
        </h1>
        <p>
          There is a temporary problem with the internal system, we are urgently
          working to fix it.
        </p>
      </div>
    </div>
  );
}
