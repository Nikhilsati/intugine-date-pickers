import { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
  const [toggle, setToggle] = useState(initialValue);

  const handleToggle = () => setToggle(!toggle);

  const setTrue = () => setToggle(true);

  const setFalse = () => setToggle(false);

  return {
    toggle,
    handleToggle,
    setTrue,
    setFalse,
  };
};

export default useToggle;
