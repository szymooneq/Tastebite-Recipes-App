export const reducer = (state, action) => {
  switch (action.type) {
    case "changeTheme":
      let value = state.theme;
      if (value === "dark") {
        document.documentElement.classList.remove("dark");
        value = "light";
      } else {
        document.documentElement.classList.add("dark");
        value = "dark";
      }
      window.localStorage.setItem("theme", value);
      return { ...state, theme: value };
    case "login":
      window.localStorage.setItem("token-data", JSON.stringify(action.user));
      return { ...state, user: action.user };
    case "logout":
      window.localStorage.removeItem("token-data");
      return { ...state, user: null };
    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

export const initialState = {
  theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  user: JSON.parse(window.localStorage.getItem("token-data")) ?? null
};
