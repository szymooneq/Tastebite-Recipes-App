import { useEffect } from "react";

export default function useWebsiteTitle(title) {
  const setTitle = newTitle => {
    document.title = newTitle
  }

  useEffect(() => {
    if (title) {
      setTitle(title)
    }
  }, [title])

  return setTitle
}