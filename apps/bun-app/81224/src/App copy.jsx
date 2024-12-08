import "./App.css";
import Card from "./Card";
function App() {
  const cardData = [
    {
      cardTitle: "Hello World 1",
      age: 10,
    },
    {
      cardTitle: "Hello World 2",
      age: 19,
    },
    {
      cardTitle: "",
      age: 15,
    },
    {
      cardTitle: "Hello World 4",
      age: 22,
    },
  ];

  const studentData = ["A"];

  const clickFun = (e) => {
    console.log(e + " " + "s");
  };

  return (
    <>
      <div className="row">
        {/* {cardData.map((card, index) => (
          <Card key={index} title={card.cardTitle} />
        ))} */}
        {cardData.map((card, index) => {
          {
            /* if (card.age > 18) {
            return <Card key={index} title={card.cardTitle} />;
          } */
          }
          {
            /* {
            return card.age > 18 ? <Card key={index} card={card} /> : "";
          } */
          }
          return (
            <Card
              key={index}
              card={card}
              onclick={clickFun}
              btn={<a href="#">Read more</a>}
            >
              <p>children</p>
            </Card>
          );
        })}
      </div>
      <p>{studentData.length && "yes"}</p>
      {cardData[0].age > 18 && "G"}
      {/* //left side value when true then work */}
    </>
  );
}

export default App;
