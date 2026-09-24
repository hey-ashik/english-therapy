import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderInvoice from '../components/books/OrderInvoice.jsx';
import OrderModal from '../components/books/OrderModal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import DistrictField from '../components/ui/DistrictField.jsx';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { BOOKS, QUIZ_IMAGE } from '../data/books.js';
import { CONTACT } from '../data/site.js';
import { trackEvent, trackLead } from '../lib/analytics.js';
import { submitLead } from '../lib/api.js';
import { rememberQuizLeadName } from '../lib/quiz.js';

export default function Books() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizRedirecting, setQuizRedirecting] = useState(false);

  useBodyScrollLock(Boolean(selectedBook));

  function openOrder(book) {
    trackEvent('book_order_start', { book_name: book.title });
    setSelectedBook(book);
  }

  async function handleQuizRegistration(event) {
    event.preventDefault();
    setQuizSubmitting(true);
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const district = form.elements.district.value;

    rememberQuizLeadName(name);
    trackLead('QuizRegistrationAdmin', { content_category: district });

    try {
      await submitLead('QuizRegistrationAdmin', {
        name,
        phone: form.elements.phone.value,
        district,
        email: form.elements.email.value,
      });
    } catch {
      /* continue to the quiz even if the API is unreachable */
    }

    setQuizRedirecting(true);
    window.setTimeout(() => navigate('/quiz'), 850);
  }

  if (placedOrder) {
    return (
      <OrderInvoice
        order={placedOrder}
        onClose={() => {
          setPlacedOrder(null);
          setSelectedBook(null);
        }}
      />
    );
  }

  return (
    <main className="books-page">
      {/* Hero */}
      <section className="books-hero section-dark">
        <div className="container books-hero-grid">
          <div>
            <p className="eyebrow eyebrow--gold">The English Therapy library</p>
            <h1>
              Books that turn <em>learning</em> into a daily habit.
            </h1>
            <p>Clear explanations, practical examples and the confidence to keep going—one page at a time.</p>
          </div>
          <div className="books-hero-note">
            <span>0{BOOKS.length}</span>
            <p>ways to meet English where you are.</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="books-intro section-light">
        <div className="container books-intro-grid">
          <p className="eyebrow">Learn at your own pace</p>
          <div>
            <h2>
              Keep the lesson
              <br />
              close to <em>you.</em>
            </h2>
            <p className="body-large">
              Our books are made for real learners: the ones who want a simple explanation, a useful example
              and a reason to try again. Choose the book that matches your next step.
            </p>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="book-collection section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="Explore the collection"
            title={
              <>
                Find your <em>next page.</em>
              </>
            }
            note={
              <>
                Practical English resources
                <br />
                for every starting point.
              </>
            }
          />
          <div className="book-grid">
            {BOOKS.map((book, index) => (
              <article className={`book-card${book.featured ? ' book-card--featured' : ''}`} key={book.title}>
                <div className="book-cover">
                  <img src={book.image} alt={book.title} />
                  <span className="book-index">0{index + 1}</span>
                </div>
                <div className="book-info">
                  <p className="book-tag">{book.tag}</p>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <button className="text-link book-order-button" type="button" onClick={() => openOrder(book)}>
                    Order this book <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free quiz */}
      <section className="quiz-section section-cream">
        <div className="container">
          <div className="quiz-card">
            <div className="quiz-visual">
              <img src={QUIZ_IMAGE} alt="A colourful English Therapy quiz activity" />
            </div>
            <div className="quiz-copy">
              {quizRedirecting ? (
                <>
                  <p className="eyebrow eyebrow--gold">You’re on your way</p>
                  <h2>
                    Opening your
                    <br />
                    <em>free quiz.</em>
                  </h2>
                  <p>Your details are saved. We’re taking you to the quiz now.</p>
                  <div className="quiz-loading">
                    <i className="download-spinner" />
                    Preparing your quiz…
                  </div>
                </>
              ) : (
                <>
                  <p className="eyebrow eyebrow--gold">A useful first step</p>
                  <h2>
                    Find your
                    <br />
                    <em>starting point.</em>
                  </h2>
                  <p>Take the free two-minute English quiz and discover where your next practice should begin.</p>
                  <div className="quiz-pills">
                    <span>2-minute quiz</span>
                    <span>Open to everyone</span>
                    <span>Instant direction</span>
                  </div>
                  <form className="quiz-form" onSubmit={handleQuizRegistration}>
                    <label>
                      Full name <sup>*</sup>
                      <input required name="name" placeholder="Your full name" />
                    </label>
                    <label>
                      Mobile number <sup>*</sup>
                      <input required name="phone" type="tel" placeholder="01XXXXXXXXX" />
                    </label>
                    <DistrictField />
                    <label>
                      Email address <sup>*</sup>
                      <input required name="email" type="email" placeholder="you@example.com" />
                    </label>
                    <button className="button button--gold" type="submit" disabled={quizSubmitting}>
                      {quizSubmitting ? (
                        <>
                          <i className="download-spinner quiz-spinner" />
                          Opening quiz…
                        </>
                      ) : (
                        <>
                          Start the free quiz <span>↗</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="book-cta section-gold">
        <div className="container invite-inner">
          <p className="eyebrow">Not sure where to begin?</p>
          <h2>
            Start with the book
            <br />
            <em>that meets you.</em>
          </h2>
          <p>Talk to our team and find your best next step.</p>
          <a className="button button--dark" href={CONTACT.whatsappTeam}>
            Ask our team <span>↗</span>
          </a>
        </div>
      </section>

      {selectedBook && (
        <OrderModal book={selectedBook} onClose={() => setSelectedBook(null)} onPlaced={setPlacedOrder} />
      )}
    </main>
  );
}
