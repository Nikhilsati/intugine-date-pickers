import { useState } from "react";

const useActive = (initialValue: number = 0) => {
  const [active, setActive] = useState(initialValue);

  const handleActive = (active: number) => setActive(active);

  return {
    active,
    handleActive,
  };
};

export default useActive;
