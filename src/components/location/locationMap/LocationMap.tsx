import styles from "./LocationMap.module.css";

type Props = {
  src: string;
  title: string;
};

export default function LocationMap({ src, title }: Props) {
  return (
    <div className={styles.map}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={styles.frame}
      />
    </div>
  );
}
