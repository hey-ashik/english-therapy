import { FAQS } from '../data/faq.js';
import { CONTACT } from '../data/site.js';

export default function FAQ() {
  return (
    <main className="faq-page">
      <section className="faq-hero section-dark">
        <div className="container">
          <p className="eyebrow eyebrow--gold">Questions, answered</p>
          <h1>
            Start with clarity.
            <br />
            <em>Move with confidence.</em>
          </h1>
          <p>Everything you need to know before beginning your English Therapy journey.</p>
        </div>
      </section>

      <section className="faq-list-section section-light">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <p className="faq-aside">Still unsure? Our team is happy to help you find the right entrance.</p>
            <a className="button button--dark" href={CONTACT.whatsappTeam}>
              Talk to our team <span>↗</span>
            </a>
          </div>
          <div className="faq-list">
            {FAQS.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  <span>0{index + 1}</span>
                  {question}
                  <b>+</b>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
