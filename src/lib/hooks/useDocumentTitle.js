import { useEffect, useState } from "react";

export default function useDocumentTitle(title) {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle];
}
