import { BRAND } from '../../data/site.js';

export default function BrandLockup({ compact = false, light = false }) {
  return (
    <span className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`}>
      <img
        className="brand-mark brand-mark--logo"
        src={light ? BRAND.logoWhite : BRAND.logo}
        alt={BRAND.name}
      />
    </span>
  );
}
