import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../components/ui/Modal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import DistrictField from '../components/ui/DistrictField.jsx';
import { useRotatingIndex } from '../hooks/useRotatingIndex.js';
import {
  EDUCATION_WORDS,
  FREEBIES,
  JOURNEYS,
  METHOD_STEPS,
  PRESS_LOGOS,
  SLIDER_LINES,
  WORLD_OF_ET,
} from '../data/home.js';
import { CONTACT, MEDIA } from '../data/site.js';
import { trackEvent, trackLead } from '../lib/analytics.js';
import { submitLead } from '../lib/api.js';
import { downloadFile } from '../lib/download.js';

const PRACTICE_BOOK = FREEBIES[0];

export default function Home() {
  const videoRef = useRef(null);
  const sliderIndex = useRotatingIndex(SLIDER_LINES.length, 2600);

  const [leadOpen, setLeadOpen] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [workshopDone, setWorkshopDone] = useState(false);
  const [workshopSubmitting, setWorkshopSubmitting] = useState(false);
  const [preparing, setPreparing] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const play = () => {
      video.play().catch(() => {});
    };
    play();
    video.addEventListener('canplay', play);
    return () => video.removeEventListener('canplay', play);
  }, []);

  function startDownload(freebie) {
    setPreparing(freebie.id);
    window.setTimeout(() => {
      downloadFile(freebie.file, freebie.fileName);
      setPreparing(null);
    }, 650);
  }

  async function handlePracticeLead(event) {
    event.preventDefault();
    setPreparing('practice');
    const form = event.currentTarget;
    const district = form.elements.district.value;

    trackLead('eBookAdmin', { content_category: district, resource: 'practice_book' });

    try {
      await submitLead('eBookAdmin', {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        email: form.elements.email.value,
        district,
      });
    } catch {
      /* the download still proceeds even if the API is unreachable */
    }

    setLeadDone(true);
    window.setTimeout(() => {
      downloadFile(PRACTICE_BOOK.file, PRACTICE_BOOK.fileName);
      setPreparing(null);
    }, 650);
  }

  async function handleWorkshop(event) {
    event.preventDefault();
    setWorkshopSubmitting(true);
    const form = event.currentTarget;
    const type = form.elements.type.value;

    trackLead('Free Workshop', { content_category: type });

    try {
      await submitLead('Free Workshop', {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        email: form.elements.email.value,
        type,
        district: form.elements.district.value,
      });
    } catch {
      /* ignore network errors — registration is confirmed to the user regardless */
    }

    setWorkshopDone(true);
    setWorkshopSubmitting(false);
  }

  return (
    <>
      <main>
        {/* Hero */}
        <section className="hero section-dark">
          <video
            className="hero-background-video"
            src={MEDIA.launchVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="hero-video-overlay" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--gold">WELCOME TO THE ENTRANCE</p>
              <h1>
                To experience something <em>extraordinary.</em>
              </h1>
              <p className="hero-lede">Experience English like never before.</p>
              <div className="hero-actions">
                <a className="button button--gold" href="#journeys">
                  Enter the experience <span>↗</span>
                </a>
              </div>
            </div>
            <div className="hero-mobile-media hero-media">
              <video
                ref={videoRef}
                src={MEDIA.launchVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* World of E intro */}
        <section className="world-e-intro section-light">
          <div className="container world-e-intro-grid">
            <div>
              <h2>
                Not a different <em>YOU.</em>
                <br />
                More of <em>YOU.</em>
              </h2>
              <p className="world-e-lede">Experience English like never before.</p>
              <p className="world-e-support">Everybody teaches English. We give the therapy.</p>
              <p className="body-large">
                This is more than a place to learn English. It is an entrance to new experiences, new
                expressions, new possibilities—and a new way of discovering yourself.
              </p>
            </div>
          </div>
        </section>

        {/* Rotating statement slider */}
        <section className="experience-slider homepage-experience-slider" id="story" aria-live="polite">
          <div className="container">
            <p key={SLIDER_LINES[sliderIndex]}>{SLIDER_LINES[sliderIndex]}</p>
          </div>
        </section>

        {/* Journeys */}
        <section className="journeys section-cream" id="journeys">
          <div className="container">
            <SectionHeading
              eyebrow="Choose your entrance"
              title={
                <>
                  A journey shaped
                  <br />
                  around <em>you.</em>
                </>
              }
              note={
                <>
                  Different starting points.
                  <br />
                  One more expressive you.
                </>
              }
            />
            <div className="journey-list">
              {JOURNEYS.map((journey) => (
                <Link key={journey.number} to={journey.to} className="journey-card">
                  <span className="card-number">{journey.number}</span>
                  <span className="journey-content">
                    <h3>{journey.title}</h3>
                    <p>{journey.description}</p>
                    <span className="text-link">
                      Explore programme <span>↗</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <Link className="button button--dark" to="/courses">
              See all learning paths <span>↗</span>
            </Link>
          </div>
        </section>

        {/* Voice */}
        <section className="voice-section section-light">
          <div className="container voice-grid">
            <div>
              <p className="eyebrow">A question worth asking</p>
              <h2>
                AI can write for you.
                <br />
                <em>But it can&apos;t be you.</em>
              </h2>
            </div>
            <div>
              <p className="body-large">
                AI can generate the words, correct your grammar and prepare your presentation. But when the
                interview begins, you have to speak. When the conversation becomes real, you have to connect.
              </p>
              <p className="voice-punch">
                AI can generate the words.
                <br />
                <strong>Only you can give them your voice.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Method */}
        <section className="method section-dark">
          <div className="container">
            <SectionHeading
              light
              eyebrowGold
              eyebrow="The way we teach"
              title={
                <>
                  English that feels
                  <br />
                  <em>alive.</em>
                </>
              }
              note={
                <>
                  Education can be effective
                  <br />
                  and enjoyable at once.
                </>
              }
            />
            <div className="step-grid">
              {METHOD_STEPS.map(([title, description], index) => (
                <div className="step" key={title}>
                  <span className="step-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reimagining education */}
        <section className="education-section section-cream">
          <div className="container">
            <p className="eyebrow">Reimagining education</p>
            <h2>
              What if learning English
              <br />
              didn&apos;t feel like <em>learning English?</em>
            </h2>
            <div className="education-words">
              {EDUCATION_WORDS.map((word) => (
                <span key={word}>{word}.</span>
              ))}
            </div>
            <p className="education-close">
              We don&apos;t just reimagine English.
              <br />
              <strong>We reimagine the experience of learning it.</strong>
            </p>
          </div>
        </section>

        <div className="workshop-bridge">
          <button
            className="button button--dark education-workshop-cta"
            type="button"
            onClick={() => {
              setWorkshopOpen(true);
              setWorkshopDone(false);
            }}
          >
            Free Workshop <span>↗</span>
          </button>
        </div>

        {/* Freebies */}
        <section className="freebies-section section-light">
          <div className="container">
            <SectionHeading
              eyebrow="Free resources for your next step"
              title={
                <>
                  Take a little <em>English with you.</em>
                </>
              }
              note={
                <>
                  Useful tools for practice,
                  <br />
                  planning and progress.
                </>
              }
            />
            <div className="freebie-grid">
              {FREEBIES.map((freebie) => (
                <article className="freebie-card" key={freebie.id}>
                  <div className="freebie-image">
                    <img src={freebie.image} alt={freebie.title} />
                  </div>
                  <div className="freebie-copy">
                    <p className="freebie-kicker">Free download</p>
                    <h3>{freebie.title}</h3>
                    <p>{freebie.description}</p>
                    <button
                      className="button button--dark"
                      type="button"
                      onClick={() => {
                        if (freebie.requiresLead) {
                          setLeadOpen(true);
                          setLeadDone(false);
                        } else {
                          startDownload(freebie);
                        }
                      }}
                    >
                      {preparing === freebie.id ? (
                        <>
                          <i className="download-spinner" />
                          Preparing download…
                        </>
                      ) : (
                        freebie.cta
                      )}{' '}
                      <span>↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="press-section section-light" aria-labelledby="press-title">
          <div className="container">
            <div className="press-heading">
              <p className="eyebrow">Our work has been noticed</p>
              <h2 id="press-title">
                Featured <em>in.</em>
              </h2>
              <p>
                From classrooms to conversations, the English Therapy mission is reaching more learners every
                day.
              </p>
            </div>
            <div className="press-logo-row">
              {PRESS_LOGOS.map(([name, src]) => (
                <div className="press-logo" key={name}>
                  <img src={src} alt={name} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YOU² */}
        <section className="you-square section-gold">
          <div className="container you-square-inner">
            <p className="eyebrow">YOU → YOU²</p>
            <h2>
              People come to us for
              <br />
              English.
              <br />
              <em>
                Something more happens
                <br />
                along the way.
              </em>
            </h2>
            <p>
              Someone preparing for an interview begins believing they belong in the room.
              <br />
              Someone afraid of mistakes begins to make them—and learn from them.
              <br />
              Someone comes searching for English and begins discovering more of themselves.
            </p>
          </div>
        </section>

        {/* World of English Therapy */}
        <section className="world-section world-section--light section-cream">
          <div className="container">
            <SectionHeading
              eyebrowGold
              eyebrow="The world of English Therapy"
              title={
                <>
                  A world built
                  <br />
                  around <em>you.</em>
                </>
              }
            />
            <div className="world-grid">
              {WORLD_OF_ET.map(([title, description], index) => (
                <div key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invite */}
        <section className="invite section-gold">
          <div className="container invite-inner">
            <p className="eyebrow">WELCOME TO</p>
            <h2>
              The entrance to
              <br />
              <em>a new empire.</em>
            </h2>
            <p>
              An empire of experiences. An empire of expressions. An empire of possibilities. Built around—YOU.
            </p>
            <Link className="button button--dark" to="/courses">
              Experience English <span>↗</span>
            </Link>
          </div>
        </section>

        {/* Practice Book lead modal */}
        {leadOpen && (
          <Modal
            backdropClass="lead-modal-backdrop"
            panelClass="lead-modal"
            closeClass="lead-modal-close"
            closeLabel="Close download form"
            labelledBy="lead-title"
            onClose={() => setLeadOpen(false)}
          >
            {leadDone ? (
              <div className="lead-success">
                <p className="eyebrow eyebrow--gold">Your download is ready</p>
                <h2>Thank you.</h2>
                <p>Your Practice Book download is starting now.</p>
                <a
                  className="lead-download-link"
                  href={PRACTICE_BOOK.file}
                  download={PRACTICE_BOOK.fileName}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent('freebie_download_manual', { file_name: PRACTICE_BOOK.fileName })
                  }
                >
                  Download the Practice Book manually ↗
                </a>
              </div>
            ) : (
              <>
                <p className="eyebrow eyebrow--gold">A useful first step</p>
                <h2 id="lead-title">
                  Get your free
                  <br />
                  <em>Practice Book.</em>
                </h2>
                <p>Share your details and we’ll send the eBook straight to your download.</p>
                <form className="lead-form" onSubmit={handlePracticeLead}>
                  <label>
                    Full name
                    <input name="name" required placeholder="Your full name" />
                  </label>
                  <label>
                    Mobile number
                    <input name="phone" required type="tel" placeholder="01XXXXXXXXX" />
                  </label>
                  <label>
                    Email address
                    <input name="email" type="email" placeholder="you@example.com" />
                  </label>
                  <DistrictField />
                  <button className="button button--gold" type="submit">
                    {preparing === 'practice' ? 'Preparing download…' : 'Download Practice Book'}{' '}
                    <span>↗</span>
                  </button>
                </form>
              </>
            )}
          </Modal>
        )}

        {/* Free workshop modal */}
        {workshopOpen && (
          <Modal
            backdropClass="lead-modal-backdrop"
            panelClass="lead-modal"
            closeClass="lead-modal-close"
            closeLabel="Close workshop form"
            labelledBy="workshop-title"
            onClose={() => setWorkshopOpen(false)}
          >
            {workshopDone ? (
              <div className="lead-success">
                <p className="eyebrow eyebrow--gold">Registration complete</p>
                <h2>
                  Join the
                  <br />
                  <em>workshop.</em>
                </h2>
                <p>Your registration is complete. Join our WhatsApp group for workshop updates.</p>
                <a className="button button--gold" href={CONTACT.whatsappGroup} target="_blank" rel="noreferrer">
                  WhatsApp Group <span>↗</span>
                </a>
              </div>
            ) : (
              <>
                <p className="eyebrow eyebrow--gold">Free learning experience</p>
                <h2 id="workshop-title">
                  Join the free
                  <br />
                  <em>workshop.</em>
                </h2>
                <p>Register now to learn practical English with us.</p>
                <form className="lead-form" onSubmit={handleWorkshop}>
                  <label>
                    Full name
                    <input name="name" required placeholder="Your full name" />
                  </label>
                  <label>
                    Mobile number
                    <input name="phone" required type="tel" placeholder="01XXXXXXXXX" />
                  </label>
                  <label>
                    Email address
                    <input name="email" required type="email" placeholder="you@example.com" />
                  </label>
                  <label>
                    Type
                    <select name="type" required defaultValue="">
                      <option value="" disabled>
                        Select workshop type
                      </option>
                      <option>Offline</option>
                      <option>Online</option>
                    </select>
                  </label>
                  <DistrictField />
                  <button className="button button--gold" type="submit" disabled={workshopSubmitting}>
                    {workshopSubmitting ? 'Submitting…' : 'Register for Free Workshop'} <span>↗</span>
                  </button>
                </form>
              </>
            )}
          </Modal>
        )}
      </main>
    </>
  );
}
