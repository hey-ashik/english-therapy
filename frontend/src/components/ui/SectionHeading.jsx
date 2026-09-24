/**
 * Standard section heading: eyebrow + title on the left, optional note on the right.
 */
export default function SectionHeading({ eyebrow, eyebrowGold = false, title, note, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <div>
        <p className={`eyebrow${eyebrowGold ? ' eyebrow--gold' : ''}`}>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}
