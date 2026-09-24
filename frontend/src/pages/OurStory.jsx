import { useState } from 'react';
import { Link } from 'react-router-dom';

import SectionHeading from '../components/ui/SectionHeading.jsx';
import { FOUNDER_IMAGE, GALLERY, IMPACT_STATS, SUCCESS_STORIES } from '../data/story.js';

export default function OurStory() {
  const [storyIndex, setStoryIndex] = useState(0);
  const story = SUCCESS_STORIES[storyIndex];
  const step = (delta) =>
    setStoryIndex((storyIndex + delta + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);

  return (
    <main className="story-page">
      {/* Hero */}
      <section className="story-hero section-dark">
        <div className="container story-hero-inner">
          <p className="eyebrow eyebrow--gold">Our story</p>
          <h1>
            English learning with a <em>human</em> heartbeat.
          </h1>
          <p>
            We help people move from knowing English to living it—with confidence, clarity and a voice that
            feels like their own.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="story-intro section-light">
        <div className="container story-intro-grid">
          <p className="eyebrow">Why English Therapy exists</p>
          <div>
            <h2>
              Everybody teaches English.
              <br />
              <span>We make it personal.</span>
            </h2>
            <p className="body-large">
              English Therapy began with a simple belief: language learning should not erase your personality.
              It should give you more ways to show up, connect and create opportunities.
            </p>
            <p className="body-large">
              Our classrooms, online sessions and learning resources are designed around that belief. We
              combine structure with encouragement, practice with play, and language with real life.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="founder-section section-cream">
        <div className="container founder-grid">
          <div className="founder-image-wrap">
            <img src={FOUNDER_IMAGE} alt="Md. Saiful Islam, Founder and CEO of English Therapy" />
          </div>
          <div className="founder-copy">
            <p className="eyebrow">The person behind the idea</p>
            <h2>
              Meet the voice that started <em>the movement.</em>
            </h2>
            <h3>Md. Saiful Islam</h3>
            <p className="founder-role">Founder &amp; CEO · English Therapy</p>
            <p>
              Saiful Islam founded English Therapy to make quality English education more accessible, practical
              and deeply motivating for learners in Bangladesh and beyond.
            </p>
            <p>
              Over the years, he has taught more than 45,000 learners directly, built a growing community
              through free educational content, and authored bestselling English learning books including{' '}
              <em>English Therapy</em>, <em>English Grammar</em>, <em>Vocab Therapy</em> and{' '}
              <em>English Therapy Level 02</em>.
            </p>
            <a className="text-link" href="#impact">
              See our journey <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="impact-section section-dark" id="impact">
        <div className="container">
          <SectionHeading
            light
            eyebrowGold
            eyebrow="The work so far"
            title={
              <>
                Built on trust.
                <br />
                <em>Growing with you.</em>
              </>
            }
            note={
              <>
                A learning community made
                <br />
                for ambitious, everyday people.
              </>
            }
          />
          <div className="impact-stats">
            {IMPACT_STATS.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="success-section section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Our learners, in their own words"
            title={
              <>
                The success
                <br />
                <em>stories.</em>
              </>
            }
            note={
              <>
                Every voice carries a
                <br />
                different kind of courage.
              </>
            }
          />
          <div className="success-feature">
            <div className="success-video">
              <iframe
                title={story.title}
                src={`https://www.youtube.com/embed/${story.id}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="success-copy">
              <span className="success-index">
                {String(storyIndex + 1).padStart(2, '0')} / {String(SUCCESS_STORIES.length).padStart(2, '0')}
              </span>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <a
                className="text-link"
                href={`https://www.youtube.com/watch?v=${story.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch the story on YouTube <span>↗</span>
              </a>
            </div>
          </div>
          <div className="success-controls">
            <button type="button" onClick={() => step(-1)} aria-label="Previous success story">
              ←
            </button>
            <div className="success-dots" aria-label="Success story gallery">
              {SUCCESS_STORIES.map((item, index) => (
                <button
                  key={item.id}
                  className={`success-dot ${index === storyIndex ? 'success-dot--active' : ''}`}
                  type="button"
                  aria-label={`Show success story ${index + 1}`}
                  aria-current={index === storyIndex ? 'true' : undefined}
                  onClick={() => setStoryIndex(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => step(1)} aria-label="Next success story">
              →
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="Inside English Therapy"
            title={
              <>
                Learning is better
                <br />
                when it feels <em>alive.</em>
              </>
            }
            note={
              <>
                Real rooms. Real people.
                <br />
                Real progress.
              </>
            }
          />
          <div className="story-gallery">
            {GALLERY.map((image, index) => (
              <figure className={`gallery-image gallery-image--${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="story-cta section-gold">
        <div className="container invite-inner">
          <p className="eyebrow">Your story starts with a step</p>
          <h2>
            Come experience
            <br />
            <em>English differently.</em>
          </h2>
          <p>Find the learning path that meets you where you are.</p>
          <Link className="button button--dark" to="/courses">
            Explore our courses <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
