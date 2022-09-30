import { animateSpin } from "../svg";

export default function LoadingButton(props) {
  return props.loading ? (
    <button disabled type="button" className="text-sm px-5 py-2.5 mb-2 font-medium rounded-lg inline-flex items-center text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600">
      {animateSpin}
      {props.loadingMessage}
    </button>
  ) : (
    <button disabled="" type="submit" className={`text-sm px-5 py-2.5 mb-2 font-medium rounded-lg text-white inline-flex items-center ${
        props.disabled
          ? "bg-blue-400 dark:bg-blue-500 cursor-default"
          : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      }`}>
      {props.children}
    </button>
  );
}
