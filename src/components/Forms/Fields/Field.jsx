import PreviewImage from "./PreviewImage"

const Text = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>{props.label}</label>

      <input
        type={props.type}
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error && props.touch
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`} />

      {props.error && props.touch && (
        <p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

const Number = (props) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>
        {props.label}
      </label>

      <input
        type={props.type}
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        step={props.step}
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error && props.touch
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`} />

      {props.error && props.touch && (
        <p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

const Textarea = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>
        {props.label}</label>

      <textarea
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        rows="4"
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error && props.touch
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}></textarea>

      {props.error && props.touch && (
        <p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

const Select = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium ${
          props.error && props.touch
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"
        } `}>
        {props.label}
      </label>

      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
          props.error && props.touch
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}>
          <option className="bg-gray-100" value="" disabled hidden>Wybierz opcję</option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {props.error && props.touch && (
        <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

const Checkbox = (props) => {
  return (
    <div className="mb-4">
      {props.options.map((option, id) => (
        <div key={id} className="flex items-center mb-4">
          <input
            type={props.type}
            name={props.name}
            value={option.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            checked={props.value.find(x => x === option.value) || false}
            className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

          <label
            htmlFor={option.value}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

const File = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium ${
          props.error
            ? "text-red-700 dark:text-red-500"
            : "text-gray-900 dark:text-gray-300"} `}>{props.label}</label>

      {(props.img || props.file) && !props.error && <PreviewImage file={props.file} img={props.img} />}

      <input
        type="file"
        name={props.name}
        onChange={e => props.onChange(e.target.files[0])}
        className={`w-full border text-sm rounded-lg outline-none ${
          props.error
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`} />

      {props.error && (
        <p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
          {props.error}
        </p>
      )}
    </div>
  )
}

const Switch = (props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {props.label}
      </label>

      <label
        htmlFor={props.name}
        className="inline-flex relative items-center cursor-pointer">

        <input
          type="checkbox"
          id={props.name}
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className="sr-only peer" />

        <div className="w-11 h-6 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full bg-gray-200 dark:bg-gray-700 dark:border-gray-600 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:border after:rounded-full after:transition-all after:bg-white after:border-gray-300 peer-checked:after:border-white"></div>

        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {props.value ? "Aktywny" : "Ukryty"}
        </span>

      </label>
    </div>
  )
}

export default function Field(props) {
  switch (props.type) {
    case "text":
      return <Text {...props} />
    case "textarea":
      return <Textarea {...props} />
    case "email":
      return <Text {...props} type="email" />
    case "password":
      return <Text {...props} type="password" />
    case "number":
      return <Number {...props} />
    case "select":
      return <Select {...props} />
    case "checkbox":
      return <Checkbox {...props} />
    case "file":
      return <File {...props} />
    case "switch":
      return <Switch {...props} />
    default:
      break
  }
}
