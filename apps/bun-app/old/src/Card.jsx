import styles from "./cardStyle.module.css";

function Card({ card, onclick, btn, children }) {
  const readMore = () => {
    return "Read More";
  };
  const btnClick = (e, title) => {
    e.preventDefault();
    console.log("Event:", e);
    console.log("Card Title:", title);
    onclick(title);
  };
  return (
    <div className={styles.card}>
      <img src="/img.jpg" alt="" />
      <h2 className={card.cardTitle ? styles.success : styles.danger}>
        {card.cardTitle}
      </h2>
      <p className={`success ${card.cardTitle ? "success" : "danger"}`}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci error
        necessitatibus explicabo officiis
      </p>
      {readMore()}
      {children}
      {btn}
      <br />
      <a
        href="#"
        className={styles["more-btn"]}
        onClick={(e) => btnClick(e, card.cardTitle)}
      >
        Button
      </a>
    </div>
  );
}
export default Card;
