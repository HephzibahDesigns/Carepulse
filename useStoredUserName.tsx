import { useState, useEffect } from "react";

export function useStoredUserName() {
  const [userName, setUserName] = useState<string>("Unknown User");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUserName(storedName);
  }, []);

  return userName;
}
