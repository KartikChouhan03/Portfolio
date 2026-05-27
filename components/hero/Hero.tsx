import styles from "./Hero.module.css";
import HeroText from "./HeroText";
import NeuralCore from "./NeuralCore";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.wrapper}>
          <HeroText />
          <NeuralCore />
        </div>
      </div>
    </section>
  );
}