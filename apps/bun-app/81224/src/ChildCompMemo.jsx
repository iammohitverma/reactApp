import { memo, useRef } from "react";
const ChildCompMemo = ({ obj, onClick }) => {
  const compLoad = useRef(0);
  return (
    <>
      {obj.name}
      <div className="ChildCompMemo">test{compLoad.current++}</div>
      <button onClick={onClick}>Click</button>
    </>
  );
};
export default memo(ChildCompMemo); //memo used for prevent rerender
