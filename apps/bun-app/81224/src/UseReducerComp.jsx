import { useCallback, useMemo } from "react";
import ChildCompMemo from "./ChildCompMemo";

export const UseReducerComp = () => {
  const data = useMemo(() => {
    return {
      name: "mohit",
    };
  }, []);

  // const printFun = () => {
  //   console.log("a");
  // };
  const printFun = useCallback(() => {
    console.log("a");
  }, []);
  return (
    <>
      <ChildCompMemo obj={data} onClick={printFun} />
    </>
  );
};
