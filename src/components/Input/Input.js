const InputText = (props) => {
  return (
    <div className="mb-4">
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
        name={props.id}
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
};

const InputTextarea = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>
        {props.label}
      </label>

      <textarea
        id={props.id}
        name={props.id}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        rows="4"
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}></textarea>

      {props.error ? (
        <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      ) : null}
    </div>
  );
};

const InputSelect = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {props.label}
      </label>

      <select
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.onChange}
        //onBlur={props.onBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const InputCheckbox = (props) => {
  return (
    <div className="mb-4">
      {props.options.map((option) => (
        <div key={option.value} className="flex items-center mb-4">
          <input
            type={props.type}
            name={props.name}
            value={option.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            checked={props.value.find(x => x === option.value) || false}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={option.value}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const InputFile = (props) => {
  return (
    <>
      <input
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
    </>
  );
};

const InputSwitch = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id}
        className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          id={props.id}
          name={props.id}
          checked={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {props.value ? "Aktywny" : "Ukryty"}
        </span>
      </label>
    </div>
  );
};

function Input(props) {
  switch (props.type) {
    case "select":
      return <InputSelect {...props} />;
    case "password":
      return <InputText {...props} type="password" />;
    case "email":
      return <InputText {...props} type="email" />;
    case "checkbox":
      return <InputCheckbox {...props} />;
    case "file":
      return <InputFile {...props} />;
    case "switch":
      return <InputSwitch {...props} />;
    case "textarea":
      return <InputTextarea {...props} />;
    default:
      return <InputText {...props} />;
  }
}

Input.defaultProps = {
  type: "text",
  isValid: false,
  showError: false
};

export default Input;
