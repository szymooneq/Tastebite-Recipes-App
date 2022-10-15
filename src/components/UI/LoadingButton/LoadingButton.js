import { animateSpin } from "../svg";

export default function LoadingButton(props) {
  return props.loading ? (
    <button disabled type="button" className="text-sm px-5 py-2.5 mb-2 font-medium rounded-lg inline-flex items-center text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600">
      {animateSpin}
      {props.loadingMessage}
    </button>
  ) : (
    <button disabled="" type="submit" className={`text-sm px-5 py-2.5 mb-2 font-medium rounded-lg text-white inline-flex items-center ${
        props.disabled
          ? "bg-green-400 dark:bg-green-500 cursor-default"
          : "bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      }`}>
      {props.children}
    </button>
  );
}
