import { chapters, questions } from "./questions.js";

const STORAGE_KEY = "spi-webtest-progress-v2";
const OLD_STORAGE_KEY = "spi-webtest-progress-v1";
const MOCK_SIZE = 60;
const MOCK_SECONDS = 35 * 60;
const CHAPTER_TARGET_MINUTES = 15;
const MOCK_CONFIG = {
  verbal: { label: "言語模試", size: 40, seconds: 15 * 60 },
  nonverbal: { label: "非言語模試", size: 20, seconds: 20 * 60 }
};

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
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY) || "{}";
    return { ...fallback, ...JSON.parse(raw) };
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
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function shuffleChoices(question) {
  const choices = question.choices.map((choice, index) => ({
    text: choice,
    originalIndex: index
  }));
  const shuffled = shuffle(choices);
  return {
    ...question,
    choices: shuffled.map((choice) => choice.text),
    answer: shuffled.findIndex((choice) => choice.originalIndex === question.answer),
    originalAnswer: question.answer,
    correctChoice: question.choices[question.answer]
  };
}

function prepareSessionQuestions(pool) {
  return shuffle(pool).map(shuffleChoices);
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
    todayCorrect,
    badges: progress.badges.length
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
        <h1 class="title">SPI Webテスティング トレーニング</h1>
        <p class="subtitle">章別で未正解を減らすか、言語・非言語の模試で本番感覚を測ります。</p>
        <div class="actions">
          <button class="primary-button" data-action="chapters">章別総合問題集</button>
          <button class="secondary-button" data-action="mock-verbal">言語模試</button>
          <button class="secondary-button" data-action="mock-nonverbal">非言語模試</button>
        </div>
      </section>

      <section class="panel">
        <h2 class="panel-title">次のおすすめ</h2>
        <p class="subtitle">${recommended}</p>
      </section>

      <section class="panel">
        <h2 class="panel-title">進捗管理</h2>
        <div class="actions compact-actions">
          <button class="secondary-button" data-action="export">進捗をコピー</button>
          <button class="secondary-button" data-action="import">進捗を復元</button>
          <button class="secondary-button danger-button" data-action="reset">進捗をリセット</button>
        </div>
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
          <p class="subtitle">正解済みの問題は出題されません。章を選ぶと未正解問題だけを続けて解きます。</p>
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
      questions: prepareSessionQuestions(pool),
      answers: []
    }
  };
  render();
}

function startMock(area) {
  const config = MOCK_CONFIG[area];
  const pool = questions.filter((question) => question.area === area);
  state = {
    screen: "question",
    session: {
      type: "mock",
      area,
      label: config.label,
      startedAt: Date.now(),
      durationSec: config.seconds,
      current: 0,
      questions: prepareSessionQuestions(pool).slice(0, Math.min(config.size, pool.length)),
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
  const timeRate = session.durationSec ? percent(remaining, session.durationSec) : 100;

  app.innerHTML = `
    <main class="screen">
      <header class="test-header">
        <div class="test-meta">
          <span>${session.type === "mock" ? session.label : "章別演習"}</span>
          <span>${session.current + 1} / ${session.questions.length}</span>
          ${remaining === null ? `<span>${formatTime((Date.now() - session.startedAt) / 1000)}</span>` : `<span class="timer ${remaining < 180 ? "warning" : ""}" data-timer>${formatTime(remaining)}</span>`}
          <button class="mini-button" data-action="home" aria-label="ホームへ戻る">ホーム</button>
        </div>
        <div class="progress-track" aria-label="進行状況">
          <div class="progress-fill" style="--value: ${progressRate}%"></div>
        </div>
        ${remaining === null ? "" : `
          <div class="progress-track timer-track" aria-label="残り時間">
            <div class="progress-fill timer-fill" data-time-fill style="--value: ${timeRate}%"></div>
          </div>
        `}
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
  app.querySelectorAll(".choice-button").forEach((choice) => {
    choice.disabled = true;
  });
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
  }, 220);
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
  if (masteredTotal >= 100) addBadge(progress, "100問攻略");
  if (accuracy >= 80) addBadge(progress, "80%到達");
  if (progress.streak.count >= 3) addBadge(progress, "3日連続");

  saveProgress(progress);
  state.screen = "result";
  state.session = { ...session, elapsedSec, correct, total, accuracy, avgTime };
  render();
}

function renderResult() {
  const session = state.session;
  const reviewedAnswers = session.answers
    .map((answer) => {
      const question = questions.find((item) => item.id === answer.questionId);
      const sessionQuestion = session.questions.find((item) => item.id === answer.questionId);
      return { ...answer, question: sessionQuestion || question };
    });
  const actualWrongAnswers = reviewedAnswers.filter((answer) => !answer.correct);
  const wrongAnswers = reviewedAnswers;

  const chapter = chapters.find((item) => item.id === session.chapterId);
  const weakTags = summarizeWeakTags(actualWrongAnswers);
  const areaStats = summarizeAreas(session.answers);

  app.innerHTML = `
    <main class="screen">
      <section class="panel">
        <h1 class="title">${session.type === "mock" ? `${session.label} 結果` : `${chapter.title} 結果`}</h1>
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
        <h2 class="panel-title">分野別</h2>
        <div class="review-list">${areaStats.map(renderAreaStat).join("")}</div>
      </section>

      <section class="panel">
        <h2 class="panel-title">次に伸ばすところ</h2>
        <p class="subtitle">${weakTags.length ? weakTags.join(" / ") : "大きな弱点はありません。この調子で模試に進みましょう。"}</p>
      </section>

      <section class="panel">
        <h2 class="panel-title">全問レビュー</h2>
        <div class="review-list">${reviewedAnswers.map(renderReviewItem).join("")}</div>
      </section>

      <div class="actions">
        <button class="primary-button" data-action="${session.type === "mock" ? `mock-${session.area}` : "chapters"}">${session.type === "mock" ? "もう一度模試" : "章一覧へ"}</button>
        <button class="secondary-button" data-action="home">ホームへ</button>
      </div>
    </main>
  `;
}

function summarizeWeakTags(wrongAnswers) {
  const counts = new Map();
  wrongAnswers.forEach((answer) => {
    const tag = answer.question?.tag || "未分類";
    counts.set(tag, (counts.get(tag) || 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);
}

function summarizeAreas(answers) {
  const rows = new Map();
  answers.forEach((answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    const label = question?.area === "verbal" ? "言語" : "非言語";
    const row = rows.get(label) || { label, total: 0, correct: 0 };
    row.total += 1;
    if (answer.correct) row.correct += 1;
    rows.set(label, row);
  });
  return [...rows.values()];
}

function renderAreaStat(item) {
  const rate = percent(item.correct, item.total);
  return `
    <article class="review-item">
      <strong>${item.label}：${rate}%</strong>
      <div class="progress-track"><span class="progress-fill" style="--value: ${rate}%"></span></div>
      <p>${item.correct}/${item.total} 問正解</p>
    </article>
  `;
}

function renderReviewItem(item) {
  return `
    <article class="review-item">
      <strong>${escapeHtml(item.question.prompt)}</strong>
      <p>${item.correct ? "結果：正解" : "結果：不正解"}</p>
      <p>あなたの回答：${escapeHtml(item.question.choices[item.choiceIndex])}</p>
      <p>正解：${escapeHtml(item.question.choices[item.question.answer])}</p>
      <p>${escapeHtml(item.question.explanation)}</p>
    </article>
  `;
}

function exportProgress() {
  const payload = JSON.stringify(loadProgress());
  navigator.clipboard?.writeText(payload)
    .then(() => showToast("進捗をコピーしました"))
    .catch(() => window.prompt("進捗データをコピーしてください", payload));
}

function importProgress() {
  const payload = window.prompt("復元する進捗データを貼り付けてください");
  if (!payload) return;
  try {
    const parsed = JSON.parse(payload);
    if (!parsed || typeof parsed !== "object") throw new Error("invalid");
    saveProgress(parsed);
    showToast("進捗を復元しました");
    render();
  } catch {
    showToast("進捗データを読み込めませんでした");
  }
}

function resetProgress() {
  if (!window.confirm("進捗をすべてリセットします。よろしいですか？")) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(OLD_STORAGE_KEY);
  showToast("進捗をリセットしました");
  render();
}

function scheduleTimer() {
  window.setTimeout(() => {
    if (state.screen !== "question" || state.session?.type !== "mock") return;
    const elapsed = (Date.now() - state.session.startedAt) / 1000;
    const remaining = Math.max(0, state.session.durationSec - elapsed);
    if (elapsed >= state.session.durationSec) {
      finishSession();
      return;
    }
    const timer = app.querySelector("[data-timer]");
    if (timer) {
      timer.textContent = formatTime(remaining);
      timer.classList.toggle("warning", remaining < 180);
    }
    const timeFill = app.querySelector("[data-time-fill]");
    if (timeFill) {
      timeFill.style.setProperty("--value", `${percent(remaining, state.session.durationSec)}%`);
    }
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
  if (action === "mock-verbal") startMock("verbal");
  if (action === "mock-nonverbal") startMock("nonverbal");
  if (action === "export") exportProgress();
  if (action === "import") importProgress();
  if (action === "reset") resetProgress();
  if (chapterId) startChapter(chapterId);
  if (choice !== undefined) answerQuestion(Number(choice));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
