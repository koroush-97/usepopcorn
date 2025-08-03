import { useState } from "react";

export function useLocalstorageState(initialState) {
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
}
