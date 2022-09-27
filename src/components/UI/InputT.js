function InputT(props) {
  return (
    <div className="mx-auto mb-4 w-96">
      <label
        htmlFor={props.id}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>
        {props.label}
      </label>

      <input
        type={props.type}
        id={props.id}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error && props.touch
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}
      />

      {props.error && props.touch && (
        <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  );
}

export default InputT;
