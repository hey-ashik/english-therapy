import { Link } from 'react-router-dom';

import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useRotatingIndex } from '../hooks/useRotatingIndex.js';
import { BECOMING, E_WORLD, PATHWAYS } from '../data/experience.js';
import { EDUCATION_WORDS, SLIDER_LINES, WORLD_OF_ET } from '../data/home.js';
import { MEDIA } from '../data/site.js';

export default function Experience() {
  const sliderIndex = useRotatingIndex(SLIDER_LINES.length, 3000);

  return (
    <main className="experience-draft">
      {/* Hero */}
      <section className="experience-hero section-dark">
        <video
          className="experience-hero-video"
          src={MEDIA.launchVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="experience-hero-overlay" />
        <div className="container experience-hero-inner">
          <p className="eyebrow eyebrow--gold">WELCOME TO THE ENTRANCE</p>
          <h1>
            To experience something <em>extraordinary.</em>
          </h1>
          <p className="experience-hero-lede">Experience English like never before.</p>
          <p className="experience-hero-copy">
            This is more than a place to learn English. It is an entrance to new experiences, new expressions,
            new possibilities—and a new way of discovering yourself.
          </p>
          <p className="experience-hero-paths">Residential · Offline · Online · Jobholders · Corporate · Free</p>
          <a className="button button--gold" href="#world">
            Enter the experience <span>↗</span>
          </a>
        </div>
      </section>

      {/* Slider */}
      <section className="experience-slider" aria-live="polite">
        <div className="container">
          <p key={SLIDER_LINES[sliderIndex]}>{SLIDER_LINES[sliderIndex]}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="experience-intro section-light">
        <div className="container experience-intro-grid">
          <p className="eyebrow">WELCOME TO THE WORLD OF E.</p>
          <div>
            <h2>
              Not a different <em>YOU.</em>
              <br />
              More of YOU.
            </h2>
            <p className="body-large">
              Everybody teaches English. We give the therapy. English Therapy creates an environment where
              knowledge becomes practice, practice becomes confidence, confidence becomes expression, and
              expression opens new possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* E world */}
      <section className="e-world section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="The meaning keeps expanding"
            title={
              <>
                Every E opens
                <br />a new <em>door.</em>
              </>
            }
            note={
              <>
                And eventually, every E
                <br />
                leads back to YOU.
              </>
            }
          />
          <div className="e-world-grid">
            {E_WORLD.map(([word, description], index) => (
              <article key={word}>
                <span>0{index + 1}</span>
                <h3>E for {word}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="pathways section-light" id="world">
        <div className="container">
          <SectionHeading
            eyebrow="From learning English"
            title={
              <>
                To living <em>English.</em>
              </>
            }
            note={
              <>
                One English.
                <br />
                Many ways to experience it.
              </>
            }
          />
          <div className="pathway-grid">
            {PATHWAYS.map((pathway) => (
              <Link className="pathway-card" to={pathway.to} key={pathway.label}>
                <span className="pathway-number">{pathway.number}</span>
                <p className="eyebrow">{pathway.label}</p>
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
                <span className="text-link">
                  Explore {pathway.label.toLowerCase()} <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Becoming */}
      <section className="becoming section-dark">
        <div className="container">
          <SectionHeading
            light
            eyebrowGold
            eyebrow="The journey of becoming"
            title={
              <>
                Enter. Experience.
                <br />
                <em>Express. Evolve.</em>
              </>
            }
          />
          <div className="becoming-grid">
            {BECOMING.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* YOU² */}
      <section className="you-square section-gold">
        <div className="container you-square-inner">
          <p className="eyebrow">YOU → YOU²</p>
          <h2>
            People come to us for English.
            <br />
            <em>Something more happens along the way.</em>
          </h2>
          <p>
            Someone preparing for an interview begins believing they belong in the room. Someone afraid of
            mistakes begins to make them—and learn from them. Someone comes searching for English and begins
            discovering more of themselves.
          </p>
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

      {/* Education */}
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

      {/* World */}
      <section className="world-section section-dark">
        <div className="container">
          <SectionHeading
            light
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

      {/* Close */}
      <section className="experience-close section-gold">
        <div className="container experience-close-inner">
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
    </main>
  );
}
