import { useState } from 'react';

import Modal from '../components/ui/Modal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { COURSES, COURSE_FEATURES, FACILITIES, LIFETIME_BENEFITS } from '../data/courses.js';
import { CONTACT } from '../data/site.js';
import { trackEvent } from '../lib/analytics.js';

export default function Courses() {
  const [active, setActive] = useState(null);
  useBodyScrollLock(Boolean(active));

  return (
    <main>
      {/* Hero */}
      <section className="courses-hero section-dark">
        <div className="container courses-hero-inner">
          <div>
            <p className="eyebrow eyebrow--gold">Find your entrance</p>
            <h1>
              A course that moves at <em>your pace.</em>
            </h1>
            <p>
              Choose the learning environment that fits your life. Every English Therapy course is built to
              help you practise, participate and find your voice.
            </p>
          </div>
          <div className="course-hero-mark">
            <span>ET</span>
            <small>English is your entrance to a bigger you.</small>
          </div>
        </div>
      </section>

      {/* Course collection */}
      <section className="course-collection section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Choose your journey"
            title={
              <>
                Start where <em>you are.</em>
              </>
            }
            note={
              <>
                Five ways to begin. One intention:
                <br />
                to make English feel like yours.
              </>
            }
          />
          <div className="course-grid">
            {COURSES.map((course) => (
              <article className="course-card" key={course.number}>
                <div className={`course-card-image course-card-image--${course.number}`}>
                  <div className="course-cover-pattern" aria-hidden="true" />
                  <div className="course-cover-copy">
                    <small>ENGLISH THERAPY</small>
                    <strong>{course.cover[0]}</strong>
                    <span>{course.cover[1]}</span>
                  </div>
                  <span className="course-number">{course.number}</span>
                </div>
                <div className="course-card-body">
                  <p className="course-tag">{course.tag}</p>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <ul>
                    {course.bullets.slice(0, 3).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="course-actions">
                    <button
                      className="text-link course-detail-button"
                      type="button"
                      onClick={() => {
                        trackEvent('course_detail_view', { course_name: course.title });
                        setActive(course);
                      }}
                    >
                      Explore details <span>↗</span>
                    </button>
                    <a
                      className="button button--gold"
                      href={course.enroll}
                      onClick={() => trackEvent('course_enroll_click', { course_name: course.title })}
                    >
                      Begin this journey <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="course-method section-light">
        <div className="container course-method-grid">
          <div>
            <p className="eyebrow">The English Therapy method</p>
            <h2>
              Practical English for <em>real life.</em>
            </h2>
            <p className="body-large">
              Our courses combine the 80/20 practical learning method with ETM-led practice, daily
              conversation and steady feedback. You do not just study English—you use it.
            </p>
          </div>
          <div className="method-card">
            <strong>
              80<span>/</span>20
            </strong>
            <p>More practice. Less hesitation.</p>
            <div className="method-rule">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="course-features section-dark">
        <div className="container">
          <SectionHeading
            light
            eyebrowGold
            eyebrow="What comes with every journey"
            title={
              <>
                Built around <em>your progress.</em>
              </>
            }
            note={
              <>
                A better environment creates
                <br />a braver English speaker.
              </>
            }
          />
          <div className="feature-list">
            {COURSE_FEATURES.map((feature, index) => (
              <div key={feature}>
                <span>0{index + 1}</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="facilities-section section-light">
        <div className="container">
          <SectionHeading
            eyebrow="More than a class"
            title={
              <>
                A place to <em>become.</em>
              </>
            }
            note={
              <>
                The details around the lesson
                <br />
                make the difference.
              </>
            }
          />
          <div className="facility-grid">
            {FACILITIES.map((facility) => (
              <article className="facility-card" key={facility.title}>
                <div className="facility-icon">
                  <img src={facility.icon} alt="" />
                </div>
                <h3>{facility.title}</h3>
                <p>{facility.description}</p>
                <div className="facility-chips">
                  {facility.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lifetime benefits */}
      <section className="benefits-section section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="A little extra for the journey"
            title={
              <>
                Lifetime benefits
                <br />
                <em>for our students.</em>
              </>
            }
            note={
              <>
                Your English Therapy journey
                <br />
                keeps giving back.
              </>
            }
          />
          <div className="benefits-grid">
            {LIFETIME_BENEFITS.map(([partner, benefit], index) => (
              <div className="benefit-row" key={partner}>
                <span>0{index + 1}</span>
                <strong>{partner}</strong>
                <em>{benefit}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="course-cta section-gold">
        <div className="container course-cta-inner">
          <p className="eyebrow">Your next chapter starts here</p>
          <h2>
            Ready to find <em>your English?</em>
          </h2>
          <a className="button button--dark" href={CONTACT.whatsappCourses}>
            Talk to our team <span>↗</span>
          </a>
        </div>
      </section>

      {/* Course detail modal */}
      {active && (
        <Modal
          as="article"
          backdropClass="course-modal-backdrop"
          panelClass="course-modal"
          closeClass="course-modal-close"
          closeLabel="Close course details"
          labelledBy="course-modal-title"
          onClose={() => setActive(null)}
        >
          <div className="course-modal-media">
            {active.video.includes('youtube.com') ? (
              <iframe
                title={`${active.title} course video`}
                src={`${active.video}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video controls src={active.video} />
            )}
          </div>
          <div className="course-modal-content">
            <p className="eyebrow eyebrow--gold">
              Course {active.number} · {active.tag}
            </p>
            <h2 id="course-modal-title">{active.title}</h2>
            <p className="course-modal-description">{active.detail}</p>
            <div className="course-modal-meta">
              <div>
                <small>Investment</small>
                <strong>{active.price}</strong>
              </div>
              <div>
                <small>Format</small>
                <strong>{active.duration}</strong>
              </div>
            </div>
            <h3>What you will experience</h3>
            <ul className="course-modal-bullets">
              {active.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a className="button button--gold" href={active.enroll}>
              Begin this journey <span>↗</span>
            </a>
          </div>
        </Modal>
      )}
    </main>
  );
}
