import { useEffect } from 'react';

/**
 * Accessible modal shell. Closes on backdrop click and Escape.
 *
 * @param {string} backdropClass  CSS class of the backdrop (e.g. "lead-modal-backdrop")
 * @param {string} panelClass     CSS class of the dialog panel (e.g. "lead-modal")
 * @param {string} closeClass     CSS class of the close button
 */
export default function Modal({
  backdropClass,
  panelClass,
  closeClass,
  closeLabel = 'Close',
  labelledBy,
  as: Panel = 'section',
  onClose,
  children,
}) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className={backdropClass}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <Panel className={panelClass} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <button className={closeClass} type="button" aria-label={closeLabel} onClick={onClose}>
          ×
        </button>
        {children}
      </Panel>
    </div>
  );
}
