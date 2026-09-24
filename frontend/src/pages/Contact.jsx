import { Link } from 'react-router-dom';

import SectionHeading from '../components/ui/SectionHeading.jsx';
import { CONTACT_OPTIONS } from '../data/contact.js';
import { CONTACT } from '../data/site.js';

export default function Contact() {
  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero section-dark">
        <div className="container contact-hero-inner">
          <p className="eyebrow eyebrow--gold">Let’s find your next step</p>
          <h1>
            Good questions lead to <em>good beginnings.</em>
          </h1>
          <p>
            Whether you are choosing a course, looking for a book or simply wondering where to start, our team
            is ready to listen.
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="contact-options section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Start a conversation"
            title={
              <>
                Choose what feels <em>right.</em>
              </>
            }
            note={
              <>
                No complicated forms.
                <br />
                Just a clear next step.
              </>
            }
          />
          <div className="contact-option-grid">
            {CONTACT_OPTIONS.map((option, index) => (
              <a className="contact-option" href={option.href} key={option.title}>
                <span className="contact-option-index">0{index + 1}</span>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <strong>
                  {option.label} <span>↗</span>
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="contact-location section-cream">
        <div className="container contact-location-grid">
          <div>
            <p className="eyebrow">Come say hello</p>
            <h2>
              Find us in <em>Mirpur.</em>
            </h2>
            <p className="body-large">
              Visit the English Therapy campus for a conversation, course guidance or a closer look at the
              environment where our learners practise every day.
            </p>
            <div className="address-block">
              <strong>English Therapy Campus</strong>
              <p>
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
                <br />
                {CONTACT.address[2]}
              </p>
              <a className="text-link" href={CONTACT.mapLink} target="_blank" rel="noreferrer">
                Open in Google Maps <span>↗</span>
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="English Therapy campus location" src={CONTACT.mapEmbed} loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta section-gold">
        <div className="container contact-cta-inner">
          <p className="eyebrow">Your English journey starts with a conversation</p>
          <h2>
            Tell us where
            <br />
            <em>you want to go.</em>
          </h2>
          <div className="contact-cta-actions">
            <Link className="button button--dark" to="/courses">
              Explore courses <span>↗</span>
            </Link>
            <a className="text-link" href={CONTACT.whatsapp}>
              Talk on WhatsApp <span>↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
