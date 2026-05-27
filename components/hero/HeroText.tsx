import styles from "./Hero.module.css";

export default function HeroText() {
  return (
    <div className={styles.content}>
      <span className={styles.greeting}>
        NAMASTE! I'M
      </span>

      <h1 className={styles.title}>
        <span>KARTIK</span>
        <span className={styles.outline}>
          CHOUHAN
        </span>
      </h1>

      <p className={styles.role}>
        Full-Stack Developer & AI/ML Engineer
      </p>

      <p className={styles.description}>
        Building intelligent systems with
        computer vision, backend engineering,
        and automation.
      </p>

      <div className={styles.actions}>
        <button>
          View Projects
        </button>

        <button>
          Resume
        </button>
      </div>
    </div>
  );
}