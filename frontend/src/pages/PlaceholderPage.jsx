import { CONTACT } from '../data/site.js';

export default function PlaceholderPage({ title }) {
  return (
    <main className="placeholder-page container">
      <p className="eyebrow">English Therapy</p>
      <h1>{title}</h1>
      <p>This page is part of the next content pass. The route is ready for its final experience.</p>
      <a className="button button--dark" href={CONTACT.email.href}>
        Talk to our team <span>↗</span>
      </a>
    </main>
  );
}
