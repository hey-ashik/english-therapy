import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COUNTDOWN_SECONDS, QUIZ_QUESTIONS, SECONDS_PER_QUESTION } from '../data/quiz.js';
import { trackEvent } from '../lib/analytics.js';
import { createQuizAttempt, getQuizLeadName, hasCompletedQuiz, markQuizCompleted } from '../lib/quiz.js';

import '../styles/quiz.css';

function countScore(answers) {
  return answers.reduce((total, answer, index) => total + (answer === QUIZ_QUESTIONS[index].answer ? 1 : 0), 0);
}

export default function Quiz() {
  const navigate = useNavigate();
  const [leadName] = useState(getQuizLeadName);
  const [stage, setStage] = useState(() => (hasCompletedQuiz() ? 'locked' : 'intro'));
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [answers, setAnswers] = useState([]);
  const [timedOut, setTimedOut] = useState(false);

  const question = QUIZ_QUESTIONS[questionIndex];
  const isLast = questionIndex === QUIZ_QUESTIONS.length - 1;

  // "Get ready" countdown
  useEffect(() => {
    if (stage !== 'ready') return undefined;
    if (countdown === 0) {
      setStage('question');
      setSecondsLeft(SECONDS_PER_QUESTION);
      return undefined;
    }
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, countdown]);

  // Per-question timer
  useEffect(() => {
    if (stage !== 'question' || timedOut) return undefined;
    if (secondsLeft === 0) {
      setTimedOut(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [stage, secondsLeft, timedOut]);

  // Auto-advance after a timeout
  useEffect(() => {
    if (!timedOut || stage !== 'question') return undefined;
    const timer = window.setTimeout(() => next(), 1400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timedOut, stage]);

  function start() {
    createQuizAttempt();
    trackEvent('quiz_start', { question_count: QUIZ_QUESTIONS.length });
    setCountdown(COUNTDOWN_SECONDS);
    setStage('ready');
  }

  function choose(option) {
    if (timedOut) return;
    setAnswers((current) => {
      const updated = [...current];
      updated[questionIndex] = option;
      return updated;
    });
  }

  function next() {
    if (stage !== 'question') return;
    if (isLast) {
      markQuizCompleted();
      trackEvent('quiz_complete', { score: countScore(answers) });
      setStage('results');
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setTimedOut(false);
  }

  if (stage === 'locked') {
    return (
      <main className="quiz-module">
        <section className="quiz-dialog quiz-dialog--locked">
          <div className="quiz-icon">✓</div>
          <p className="quiz-kicker">Quiz already completed</p>
          <h1>
            Your English journey
            <br />
            <em>is already moving.</em>
          </h1>
          <p className="quiz-instruction">
            This quiz allows one attempt per user. Keep practising and come back later for your next step.
          </p>
          <button className="quiz-action" type="button" onClick={() => navigate('/books')}>
            Explore English <span>↗</span>
          </button>
        </section>
      </main>
    );
  }

  if (stage === 'intro') {
    return (
      <main className="quiz-module">
        <section className="quiz-dialog quiz-dialog--intro">
          <div className="quiz-icon">✦</div>
          <p className="quiz-kicker">Welcome, {leadName}</p>
          <h1>
            Ready to discover
            <br />
            <em>your English?</em>
          </h1>
          <p className="quiz-instruction">
            A quick challenge: {QUIZ_QUESTIONS.length} multiple-choice questions. You have {SECONDS_PER_QUESTION}{' '}
            seconds for each one. Choose the best answer, then continue.
          </p>
          <button className="quiz-action" type="button" onClick={start}>
            Next <span>↗</span>
          </button>
        </section>
      </main>
    );
  }

  if (stage === 'ready') {
    return (
      <main className="quiz-module">
        <section className="quiz-dialog quiz-dialog--ready">
          <div className="quiz-countdown">{countdown}</div>
          <h1>Get Ready!</h1>
          <p>
            Quiz starting in {countdown} second{countdown === 1 ? '' : 's'}
          </p>
        </section>
      </main>
    );
  }

  if (stage === 'results') {
    const score = countScore(answers);
    return (
      <main className="quiz-module">
        <section className="quiz-results">
          <p className="quiz-kicker">Quiz complete · Set 1</p>
          <h1>
            {score}
            <span>/{QUIZ_QUESTIONS.length}</span>
          </h1>
          <p className="quiz-result-note">
            {score >= 7
              ? 'Great work—keep building your confidence.'
              : 'Keep practising—your next step starts here.'}
          </p>
          <div className="quiz-review">
            {QUIZ_QUESTIONS.map((item, index) => {
              const correct = answers[index] === item.answer;
              return (
                <div className={`quiz-review-row ${correct ? 'is-correct' : 'is-wrong'}`} key={item.prompt}>
                  <span>
                    Q{index + 1}: {answers[index] || 'No answer'}
                  </span>
                  <span>Correct: {item.answer}</span>
                </div>
              );
            })}
          </div>
          <button className="quiz-action" type="button" onClick={() => navigate('/books')}>
            Explore more English <span>↗</span>
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="quiz-module">
      <section className="quiz-card-module">
        <div className={`quiz-timer ${secondsLeft <= 3 ? 'is-danger' : ''}`}>{secondsLeft}</div>
        <p className="quiz-kicker">
          Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
        </p>
        <h1>{question.prompt}</h1>
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={option}
              className={answers[questionIndex] === option ? 'is-selected' : ''}
              type="button"
              disabled={timedOut}
              onClick={() => choose(option)}
            >
              <strong>({String.fromCharCode(97 + index)})</strong> {option}
            </button>
          ))}
        </div>
        {timedOut && <p className="quiz-timeout">Time’s up. Moving to the next question.</p>}
        <div className="quiz-progress">
          <span style={{ width: `${((questionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
        </div>
        <div className="quiz-footer">
          <span>
            {questionIndex + 1}/{QUIZ_QUESTIONS.length}
          </span>
          <button className="quiz-action" type="button" onClick={next}>
            {isLast ? 'Finish' : 'Next'} <span>↗</span>
          </button>
        </div>
      </section>
    </main>
  );
}
