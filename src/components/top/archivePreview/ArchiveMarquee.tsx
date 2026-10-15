import Image from "next/image";
import TransitionLink from "@/components/common/pageTransration/TransrationLink";
import type { CSSProperties } from "react";
import type { HistoryPhoto } from "@/types/history";
import styles from "./ArchivePreview.module.css";

type Props = {
  photos: HistoryPhoto[];
  href: string;
  title: string;
};

const MIN_PER_LOOP = 8;
const SECONDS_PER_PHOTO = 6;

export default function ArchiveMarquee({ photos, href, title }: Props) {
  const repeat = Math.max(1, Math.ceil(MIN_PER_LOOP / photos.length));
  const loop = Array.from({ length: repeat }, () => photos).flat();
  const style = { "--duration": `${loop.length * SECONDS_PER_PHOTO}s` } as CSSProperties;

  return (
    <div className={styles.marquee} style={style}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
            {loop.map((photo, i) => {
              const hidden = copy === 1 || i >= photos.length;
              return (
                <li key={`${photo.src}-${i}`} className={styles.photo} aria-hidden={hidden ? true : undefined}>
                  <TransitionLink href={href} origin="self" className={styles.photoLink} tabIndex={hidden ? -1 : undefined}>
                    <Image
                      src={photo.src!}
                      alt={hidden ? "" : (photo.label ?? `${title}の様子`)}
                      fill
                      sizes="320px"
                      unoptimized
                      className={styles.photoImage}
                    />
                    {photo.label && <span className={styles.caption}>{photo.label}</span>}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
