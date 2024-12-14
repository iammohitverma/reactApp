import { CompA } from "./CompA";

function ContextApi() {
  return (
    <div>
      <h1>ContextApi</h1>
      <CompA />
    </div>
  );
}

function ApiHit() {
  return <h1>ApiHit function here</h1>;
}
export default ContextApi;

export { ApiHit };
