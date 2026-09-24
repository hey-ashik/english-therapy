const ATTEMPT_KEY = 'et_quiz_attempt';
const COMPLETED_COOKIE = 'et_quiz_completed';
const LEAD_NAME_KEY = 'quizLeadName';

/**
 * Records the start of a quiz attempt in localStorage.
 */
export function createQuizAttempt() {
  if (typeof window === 'undefined') return null;
  const attempt = {
    id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    set: 'set-1',
    started_at: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify(attempt));
  } catch {
    /* ignore */
  }
  return attempt;
}

export function hasCompletedQuiz() {
  return document.cookie.split('; ').some((entry) => entry.startsWith(`${COMPLETED_COOKIE}=`));
}

export function markQuizCompleted() {
  document.cookie = `${COMPLETED_COOKIE}=1; Max-Age=${3600 * 24 * 365}; Path=/; SameSite=Lax`;
}

export function rememberQuizLeadName(name) {
  try {
    sessionStorage.setItem(LEAD_NAME_KEY, name);
  } catch {
    /* ignore */
  }
}

export function getQuizLeadName() {
  try {
    return sessionStorage.getItem(LEAD_NAME_KEY) || 'there';
  } catch {
    return 'there';
  }
}
