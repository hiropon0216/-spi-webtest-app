import { chapters, questions } from "./questions.js";

const STORAGE_KEY = "spi-webtest-progress-v1";
const MOCK_SIZE = 12;
const MOCK_SECONDS = 35 * 60;

const app = document.querySelector("#app");

let state = {
  screen: "home",
  session: null
};

function loadProgress() {
  const fallback = {
    mastered: {},
    chapterResults: [],
    mockResults: [],
    streak: { lastStudyDate: "", count: 0 },
    badges: []
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function todayKey() {
  return new Date().toLocaleDateString("sv-SE");
}

function updateStreak(progress) {
  const today = todayKey();
  if (progress.streak.lastStudyDate === today) return progress;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toLocaleDateString("sv-SE");

  progress.streak.count = progress.streak.lastStudyDate === yesterdayKey ? progress.streak.count + 1 : 1;
  progress.streak.lastStudyDate = today;
  return progress;
}

function addBadge(progress, badge) {
  if (!progress.badges.includes(badge)) {
    progress.badges.push(badge);
    showToast(`${badge} を達成`);
  }
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.round(seconds));
  const min = Math.floor(safe / 60);
  const sec = String(safe % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function judge(accuracy, avgTime) {
  if (accuracy >= 80 && avgTime <= 45) return "A：本番対応レベル";
  if (accuracy >= 80) return "B：合格ライン目安に到達";
  if (accuracy >= 70) return "C：あと一歩";
  if (accuracy >= 60) return "D：基礎固めが必要";
  return "E：頻出分野の再演習が必要";
}

function getHomeStats(progress) {
  const masteredCount = questions.filter((question) => progress.mastered[question.id]).length;
  const total = questions.length;
  const mock = progress.mockResults.at(-1);
  const todayCorrect = progress.chapterResults
    .filter((result) => result.date === todayKey())
    .reduce((sum, result) => sum + result.correct, 0);

  return {
    masteredCount,
    total,
    overall: percent(masteredCount, total),
    mockAccuracy: mock ? mock.accuracy : 0,
    todayCorrect
  };
}

function render() {
  if (state.screen === "chapters") return renderChapters();
  if (state.screen === "question") return renderQuestion();
  if (state.screen === "result") return renderResult();
  return renderHome();
}

function renderHome() {
  const progress = loadProgress();
  const stats = getHomeStats(progress);
  const recommended = getRecommendedChapter(progress);

  app.innerHTML = `
    <main class="screen">
      <section class="hero-panel">
        <div class="metric-main">
          <div>
            <p class="metric-label">全体攻略率</p>
            <div class="metric-value">${stats.overall}%</div>
          </div>
          <span class="pill">連続 ${progress.streak.count || 0} 日</span>
        </div>
        <div class="progress-track" aria-label="全体攻略率">
          <div class="progress-fill" style="--value: ${stats.overall}%"></div>
        </div>
        <div class="stats-grid">
          <div class="stat"><strong>${stats.masteredCount}</strong><span>正解済み / ${stats.total}</span></div>
          <div class="stat"><strong>${stats.todayCorrect}</strong><span>今日の正解</span></div>
          <div class="stat"><strong>${stats.mockAccuracy}%</strong><span>直近模試</span></div>
        </div>
      </section>

      <section class="panel">
        <h1 class="title">SPI Webテスティング風トレーニング</h1>
        <p class="subtitle">章別で未正解を減らすか、模擬試験で35分の本番感覚を測ります。</p>
        <div class="actions">
          <button class="primary-button" data-action="chapters">章別総合問題集</button>
          <button class="secondary-button" data-action="mock">模擬試験</button>
        </div>
      </section>

      <section class="panel">
        <h2 class="panel-title">次のおすすめ</h2>
        <p class="subtitle">${recommended}</p>
      </section>
    </main>
  `;
}

function getRecommendedChapter(progress) {
  const chapter = chapters
    .map((item) => {
      const chapterQuestions = questions.filter((question) => question.chapterId === item.id);
      const mastered = chapterQuestions.filter((question) => progress.mastered[question.id]).length;
      return { ...item, remaining: chapterQuestions.length - mastered, rate: percent(mastered, chapterQuestions.length) };
    })
    .filter((item) => item.remaining > 0)
    .sort((a, b) => a.rate - b.rate)[0];

  if (!chapter) return "全章の問題を攻略済みです。模擬試験で本番感覚を維持しましょう。";
  return `${chapter.title} は未正解が ${chapter.remaining} 問あります。ここを進めると攻略率が伸びます。`;
}

function renderChapters() {
  const progress = loadProgress();
  const rows = chapters.map((chapter) => {
    const chapterQuestions = questions.filter((question) => question.chapterId === chapter.id);
    const mastered = chapterQuestions.filter((question) => progress.mastered[question.id]).length;
    const remaining = chapterQuestions.length - mastered;
    const rate = percent(mastered, chapterQuestions.length);

    return `
      <button class="chapter-row" data-chapter="${chapter.id}" ${remaining === 0 ? "disabled" : ""}>
        <span class="chapter-head">
          <strong>${chapter.title}</strong>
          <span class="chapter-meta">${rate}%</span>
        </span>
        <span class="progress-track"><span class="progress-fill" style="--value: ${rate}%"></span></span>
        <span class="chapter-meta">未正解 ${remaining} 問 / 全 ${chapterQuestions.length} 問</span>
      </button>
    `;
  }).join("");

  app.innerHTML = `
    <main class="screen">
      <div class="topbar">
        <div>
          <h1 class="title">章別総合問題集</h1>
          <p class="subtitle">正解済みの問題は出題されません。</p>
        </div>
        <button class="icon-button" data-action="home" aria-label="ホームへ戻る">⌂</button>
      </div>
      <section class="chapter-list">${rows}</section>
    </main>
  `;
}

function startChapter(chapterId) {
  const progress = loadProgress();
  const pool = questions.filter((question) => question.chapterId === chapterId && !progress.mastered[question.id]);
  if (!pool.length) {
    showToast("この章は攻略済みです");
    return;
  }

  state = {
    screen: "question",
    session: {
      type: "chapter",
      chapterId,
      startedAt: Date.now(),
      durationSec: null,
      current: 0,
      questions: shuffle(pool),
      answers: []
    }
  };
  render();
}

function startMock() {
  state = {
    screen: "question",
    session: {
      type: "mock",
      startedAt: Date.now(),
      durationSec: MOCK_SECONDS,
      current: 0,
      questions: shuffle(questions).slice(0, Math.min(MOCK_SIZE, questions.length)),
      answers: []
    }
  };
  render();
  scheduleTimer();
}

function renderQuestion() {
  const session = state.session;
  const question = session.questions[session.current];
  const progressRate = percent(session.current, session.questions.length);
  const remaining = session.durationSec ? Math.max(0, session.durationSec - (Date.now() - session.startedAt) / 1000) : null;

  app.innerHTML = `
    <main class="screen">
      <header class="test-header">
        <div class="test-meta">
          <span>${session.type === "mock" ? "模擬試験" : "章別演習"}</span>
          <span>${session.current + 1} / ${session.questions.length}</span>
          ${remaining === null ? `<span>${formatTime((Date.now() - session.startedAt) / 1000)}</span>` : `<span class="timer ${remaining < 180 ? "warning" : ""}">${formatTime(remaining)}</span>`}
        </div>
        <div class="progress-track" aria-label="進行状況">
          <div class="progress-fill" style="--value: ${progressRate}%"></div>
        </div>
      </header>
      <section class="question-card">
        <p class="question-text">${escapeHtml(question.prompt)}</p>
        <div class="choices">
          ${question.choices.map((choice, index) => `<button class="choice-button" data-choice="${index}">${escapeHtml(choice)}</button>`).join("")}
        </div>
      </section>
    </main>
  `;
}

function answerQuestion(choiceIndex) {
  const session = state.session;
  const question = session.questions[session.current];
  const correct = choiceIndex === question.answer;
  const button = app.querySelector(`[data-choice="${choiceIndex}"]`);
  button.classList.add(correct ? "correct" : "wrong");
  session.answers.push({
    questionId: question.id,
    choiceIndex,
    correct,
    elapsedSec: Math.round((Date.now() - session.startedAt) / 1000)
  });

  window.setTimeout(() => {
    if (session.current + 1 >= session.questions.length) {
      finishSession();
    } else {
      session.current += 1;
      render();
    }
  }, 280);
}

function finishSession() {
  const progress = updateStreak(loadProgress());
  const session = state.session;
  const elapsedSec = Math.round((Date.now() - session.startedAt) / 1000);
  const correct = session.answers.filter((answer) => answer.correct).length;
  const total = session.answers.length;
  const accuracy = percent(correct, total);
  const avgTime = total ? Math.round(elapsedSec / total) : 0;

  if (session.type === "chapter") {
    session.answers.forEach((answer) => {
      if (answer.correct) progress.mastered[answer.questionId] = true;
    });
    progress.chapterResults.push({
      date: todayKey(),
      chapterId: session.chapterId,
      total,
      correct,
      accuracy,
      timeSec: elapsedSec,
      avgTime
    });
  } else {
    progress.mockResults.push({
      date: todayKey(),
      total,
      correct,
      accuracy,
      timeSec: elapsedSec,
      avgTime
    });
  }

  const masteredTotal = questions.filter((question) => progress.mastered[question.id]).length;
  if (masteredTotal >= 1) addBadge(progress, "初回正解");
  if (accuracy >= 80) addBadge(progress, "80%到達");
  if (progress.streak.count >= 3) addBadge(progress, "3日連続");

  saveProgress(progress);
  state.screen = "result";
  state.session = { ...session, elapsedSec, correct, total, accuracy, avgTime };
  render();
}

function renderResult() {
  const session = state.session;
  const wrongAnswers = session.answers
    .filter((answer) => !answer.correct)
    .map((answer) => {
      const question = questions.find((item) => item.id === answer.questionId);
      return { ...answer, question };
    });

  const chapter = chapters.find((item) => item.id === session.chapterId);

  app.innerHTML = `
    <main class="screen">
      <section class="panel">
        <h1 class="title">${session.type === "mock" ? "模擬試験 結果" : `${chapter.title} 結果`}</h1>
        <div class="result-score" style="--score: ${session.accuracy}%">
          <div class="score-inner"><strong>${session.accuracy}%</strong></div>
        </div>
        <div class="stats-grid">
          <div class="stat"><strong>${session.correct}/${session.total}</strong><span>正解数</span></div>
          <div class="stat"><strong>${formatTime(session.elapsedSec)}</strong><span>所要時間</span></div>
          <div class="stat"><strong>${session.avgTime}秒</strong><span>平均</span></div>
        </div>
        <p class="pill">${judge(session.accuracy, session.avgTime)}</p>
      </section>

      <section class="panel">
        <h2 class="panel-title">不正解レビュー</h2>
        ${wrongAnswers.length ? `<div class="review-list">${wrongAnswers.map(renderReviewItem).join("")}</div>` : `<p class="subtitle">不正解はありません。いい流れです。</p>`}
      </section>

      <div class="actions">
        <button class="primary-button" data-action="${session.type === "mock" ? "mock" : "chapters"}">${session.type === "mock" ? "もう一度模試" : "章一覧へ"}</button>
        <button class="secondary-button" data-action="home">ホームへ</button>
      </div>
    </main>
  `;
}

function renderReviewItem(item) {
  return `
    <article class="review-item">
      <strong>${escapeHtml(item.question.prompt)}</strong>
      <p>あなたの回答：${escapeHtml(item.question.choices[item.choiceIndex])}</p>
      <p>正解：${escapeHtml(item.question.choices[item.question.answer])}</p>
      <p>${escapeHtml(item.question.explanation)}</p>
    </article>
  `;
}

function scheduleTimer() {
  window.setTimeout(() => {
    if (state.screen !== "question" || state.session?.type !== "mock") return;
    const elapsed = (Date.now() - state.session.startedAt) / 1000;
    if (elapsed >= state.session.durationSec) {
      finishSession();
      return;
    }
    renderQuestion();
    scheduleTimer();
  }, 1000);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const chapterId = event.target.closest("[data-chapter]")?.dataset.chapter;
  const choice = event.target.closest("[data-choice]")?.dataset.choice;

  if (action === "home") {
    state = { screen: "home", session: null };
    render();
  }
  if (action === "chapters") {
    state = { screen: "chapters", session: null };
    render();
  }
  if (action === "mock") startMock();
  if (chapterId) startChapter(chapterId);
  if (choice !== undefined) answerQuestion(Number(choice));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
