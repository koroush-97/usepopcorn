import { useState, useEffect } from "react";

export function useLocalstorageState(initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value]
  );
}
