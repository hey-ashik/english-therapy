import { Link, NavLink } from 'react-router-dom';

import BrandLockup from './BrandLockup.jsx';
import { CONTACT, NAV_LINKS } from '../../data/site.js';
import { useUiStore } from '../../store/useUiStore.js';

const navClass = ({ isActive }) => (isActive ? 'active-nav' : undefined);

export default function Header() {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand-link" onClick={closeMobileMenu}>
          <BrandLockup />
        </Link>

        <button className="menu-toggle" aria-expanded={mobileMenuOpen} onClick={toggleMobileMenu}>
          <span /> <span /> <span />
          <span className="sr-only">Toggle menu</span>
        </button>

        <nav className={`main-nav${mobileMenuOpen ? ' main-nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} className={navClass} to={link.to} onClick={closeMobileMenu}>
              {link.label}
            </NavLink>
          ))}
          <a className="header-cta" href={CONTACT.phoneSecondary.href}>
            Talk to us <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
