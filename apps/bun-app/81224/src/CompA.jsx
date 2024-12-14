import { CompB } from "./CompB";
import { ApiHit } from "./ContextApi";

export const CompA = () => {
  const ApiHit2 = ApiHit();
  return (
    <div>
      <h1>CompA</h1>
      <CompB />
      <div>{ApiHit2}</div>
    </div>
  );
};
