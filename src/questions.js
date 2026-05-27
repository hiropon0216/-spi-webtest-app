const baseChapters = [
  { id: "verbal-words", title: "言語：語句・意味理解", area: "verbal", target: 80 },
  { id: "verbal-relations", title: "言語：二語関係", area: "verbal", target: 70 },
  { id: "verbal-sentences", title: "言語：文の完成・並べ替え", area: "verbal", target: 60 },
  { id: "verbal-reading", title: "言語：長文読解", area: "verbal", target: 30 },
  { id: "nonverbal-rate", title: "非言語：割合・比・損益", area: "nonverbal", target: 80 },
  { id: "nonverbal-payment", title: "非言語：料金・精算・代金", area: "nonverbal", target: 50 },
  { id: "nonverbal-speed", title: "非言語：速度・時間・仕事算", area: "nonverbal", target: 70 },
  { id: "nonverbal-probability", title: "非言語：場合の数・確率", area: "nonverbal", target: 70 },
  { id: "nonverbal-logic", title: "非言語：集合・推論", area: "nonverbal", target: 80 },
  { id: "nonverbal-table", title: "非言語：表・資料読解", area: "nonverbal", target: 70 }
];

const wordBank = [
  ["周到", "準備や配慮が細部まで行き届いていること", ["急いで判断すること", "考えが偏っていること", "偶然に任せること"]],
  ["懐疑的", "物事をそのまま信じず疑いを持つ態度", ["深く感謝する態度", "強く賛成する態度", "すぐに行動する態度"]],
  ["均衡", "複数の力や量が釣り合っていること", ["不足していること", "一方だけが優先されること", "急に広がること"]],
  ["顕著", "はっきり目立っていること", ["少しずつ消えること", "内側に隠れること", "関係が薄いこと"]],
  ["暫定", "正式に決まるまで一時的に定めること", ["永久に固定すること", "完全に廃止すること", "無条件に認めること"]],
  ["包括", "全体をまとめて含むこと", ["一部だけを除くこと", "順番に並べること", "感情的に反発すること"]],
  ["冗長", "必要以上に長く無駄が多いこと", ["短く簡潔なこと", "慎重で正確なこと", "明るく活発なこと"]],
  ["示唆", "直接言わず、それとなく示すこと", ["強く否定すること", "細かく分類すること", "結果を保証すること"]],
  ["逸脱", "本来の範囲や基準から外れること", ["基準に沿うこと", "全体を補うこと", "内容を深めること"]],
  ["妥当", "状況や条件に照らして適切であること", ["根拠が乏しいこと", "急激に増えること", "同じ形を保つこと"]],
  ["煩雑", "込み入っていて面倒なこと", ["簡単で分かりやすいこと", "穏やかで安定していること", "厳しく制限されること"]],
  ["恒常的", "いつも一定して続くこと", ["一時的に起きること", "極端に変化すること", "外部から遮断されること"]],
  ["恣意的", "客観的な基準ではなく、その人の思いのままであること", ["規則に厳密であること", "全員で合意すること", "長期的に継続すること"]],
  ["精査", "細かい点まで詳しく調べること", ["大まかに眺めること", "急いで処理すること", "内容を隠すこと"]],
  ["齟齬", "物事が食い違っていること", ["よく調和していること", "急に改善すること", "丁寧に説明すること"]],
  ["踏襲", "以前からのやり方を受け継ぐこと", ["完全に新しくすること", "途中で投げ出すこと", "曖昧にぼかすこと"]],
  ["一過性", "一時的で長く続かないこと", ["長く安定して続くこと", "全体に広く及ぶこと", "根拠が明確なこと"]],
  ["乖離", "本来近いものが離れて食い違うこと", ["互いに近づくこと", "順調に増えること", "内容を要約すること"]],
  ["便宜", "都合がよいようにすること", ["不利益を増やすこと", "厳密に否定すること", "時間を遅らせること"]],
  ["蓋然性", "ある事柄が起こる確からしさ", ["絶対に起こらないこと", "過去の事実そのもの", "感情の強さ"]]
];

const relationBank = [
  ["医師", "病院", "職業と働く場所", ["教師：学校", "魚：海", "時計：時間", "作家：小説"], 0],
  ["包丁", "切る", "道具と用途", ["椅子：座る", "本：読む", "鍵：開ける", "花：咲く"], 2],
  ["春", "季節", "具体例と上位概念", ["月曜：曜日", "東京：日本", "米：主食", "机：家具"], 0],
  ["酸素", "呼吸", "必要なものと行為", ["燃料：燃焼", "雨：傘", "窓：景色", "音：楽器"], 0],
  ["序章", "本編", "前後関係", ["予選：決勝", "入口：建物", "朝：昼", "原因：結果"], 0],
  ["作家", "小説", "作る人と成果物", ["画家：絵画", "運転手：道路", "医師：患者", "農家：市場"], 0],
  ["辞書", "意味", "調べる対象", ["地図：場所", "時計：針", "電車：駅", "鉛筆：文字"], 0],
  ["種", "発芽", "きっかけと変化", ["卵：孵化", "水：氷", "紙：印刷", "窓：換気"], 0],
  ["裁判官", "判決", "判断する人と結果", ["審判：判定", "教師：教室", "記者：新聞", "店員：商品"], 0],
  ["原因", "結果", "因果関係", ["努力：成果", "入口：出口", "兄：弟", "夏：暑い"], 0]
];

const sentenceBank = [
  ["新しい制度は負担軽減を目的としていたが、手続きが増え、かえって業務を__した。", "複雑化", ["簡素化", "円滑化", "標準化"], "逆接の後で手続きが増えたとあるため、悪化方向の語を選びます。"],
  ["短期的な成果だけを追うと、長期的な信頼を__おそれがある。", "損なう", ["補う", "高める", "定める"], "短期成果偏重の悪影響なので、信頼を失う意味の語が自然です。"],
  ["調査結果をそのまま採用するのではなく、条件の違いを__して考える必要がある。", "考慮", ["放置", "隠蔽", "断定"], "条件差を踏まえる文脈なので、考慮が入ります。"],
  ["計画は魅力的だったが、費用対効果の面で__に乏しかった。", "妥当性", ["偶然性", "装飾性", "娯楽性"], "費用対効果から見た適切さを問うため、妥当性が合います。"],
  ["意見が対立したため、双方の主張を整理し、論点を__することにした。", "明確化", ["拡散", "混同", "省略"], "対立時は論点をはっきりさせるのが自然です。"],
  ["一部の成功例だけで全体を判断するのは、結論を__する危険がある。", "早急に一般化", ["慎重に検証", "丁寧に補足", "客観的に記録"], "一部から全体に広げすぎる危険を表します。"]
];

const readingBank = [
  {
    text: "新しい仕組みを導入するとき、便利さだけで評価すると失敗しやすい。利用者がどの場面で迷うのか、既存の手順とどこで衝突するのかを事前に確認する必要がある。小さな試行で問題点を見つけ、修正してから広げる方が、結果的には定着が早い。",
    ask: "本文の主旨として最も適切なものはどれか。",
    answer: "新しい仕組みは小さく試して問題を直してから広げるべきである",
    wrong: ["便利な仕組みはすぐ全体に広げるべきである", "既存の手順は必ず廃止するべきである", "利用者の迷いは導入後に自然に解消する"]
  },
  {
    text: "資料を読むときは、大きな数値だけに注目すると判断を誤ることがある。増加率、基準年、母数の違いを確認しなければ、実態より大きく見えたり小さく見えたりする。数字そのものより、何を基準にした数字なのかを先に見ることが重要である。",
    ask: "本文で重視されていることはどれか。",
    answer: "数値の基準や母数を確認すること",
    wrong: ["最も大きな数値を選ぶこと", "増加している項目だけを見ること", "細かな数値を暗記すること"]
  },
  {
    text: "会議で意見を集める目的は、単に多数派を決めることではない。反対意見の中には、計画の弱点を示す情報が含まれている場合がある。早い段階で懸念を取り込めば、実行後の手戻りを減らすことができる。",
    ask: "本文の考え方に最も近いものはどれか。",
    answer: "反対意見は計画を改善する材料になり得る",
    wrong: ["多数派の意見だけで決めるべきである", "反対意見は実行後に扱えばよい", "会議では結論を急ぐほどよい"]
  }
];

function q(id, chapterId, area, prompt, choices, answer, explanation, difficulty = "standard", tag = "") {
  return { id, chapterId, area, prompt, choices, answer, explanation, difficulty, tag };
}

function explanation(lines) {
  return lines.join("\n");
}

function rotate(list, n) {
  const shift = n % list.length;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

function choiceSet(correct, wrongs, n) {
  const pool = [correct];
  [...wrongs, ...fallbackChoices(correct)].forEach((choice) => {
    if (pool.length < 4 && !pool.includes(choice)) pool.push(choice);
  });
  const choices = rotate(pool.slice(0, 4), n);
  return [choices, choices.indexOf(correct)];
}

function fallbackChoices(correct) {
  if (/^\d+(?:\.\d+)?%$/.test(correct)) {
    const value = Number(correct.replace("%", ""));
    return [`${value + 5}%`, `${Math.max(1, value - 5)}%`, `${value + 10}%`, `${value * 2}%`];
  }
  if (/^\d+(?:\.\d+)?円$/.test(correct)) {
    const value = Number(correct.replace("円", ""));
    return [`${value + 100}円`, `${Math.max(0, value - 100)}円`, `${value + 200}円`, `${Math.max(0, value - 200)}円`];
  }
  if (/^\d+(?:\.\d+)?万円$/.test(correct)) {
    const value = Number(correct.replace("万円", ""));
    return [`${value + 5}万円`, `${Math.max(0, value - 5)}万円`, `${value + 10}万円`, `${Math.max(0, value - 10)}万円`];
  }
  if (/^\d+(?:\.\d+)?人$/.test(correct)) {
    const value = Number(correct.replace("人", ""));
    return [`${value + 1}人`, `${Math.max(0, value - 1)}人`, `${value + 2}人`, `${Math.max(0, value - 2)}人`];
  }
  if (/^\d+(?:\.\d+)?個$/.test(correct)) {
    const value = Number(correct.replace("個", ""));
    return [`${value + 1}個`, `${Math.max(0, value - 1)}個`, `${value + 2}個`, `${Math.max(0, value - 2)}個`];
  }
  if (/^\d+(?:\.\d+)?日$/.test(correct)) {
    const value = Number(correct.replace("日", ""));
    return [`${value + 1}日`, `${Math.max(0, value - 1)}日`, `${value + 2}日`, `${Math.max(0, value - 2)}日`];
  }
  if (/^\d+(?:\.\d+)?時間$/.test(correct)) {
    const value = Number(correct.replace("時間", ""));
    return [`${value + 0.5}時間`, `${Math.max(0.5, value - 0.5)}時間`, `${value + 1}時間`, `${Math.max(0.5, value - 1)}時間`];
  }
  if (/^\d+(?:\.\d+)?m$/.test(correct)) {
    const value = Number(correct.replace("m", ""));
    return [`${value + 100}m`, `${Math.max(0, value - 100)}m`, `${value + 200}m`, `${Math.max(0, value - 200)}m`];
  }
  if (/^\d+通り$/.test(correct)) {
    const value = Number(correct.replace("通り", ""));
    return [`${value + 1}通り`, `${Math.max(1, value - 1)}通り`, `${value + 2}通り`, `${Math.max(1, value - 2)}通り`];
  }
  if (/^\d+\/\d+$/.test(correct)) return ["1/2", "1/3", "2/3", "3/4", "1/4"];
  if (/^\d+:\d+$/.test(correct)) return ["1:2", "2:3", "3:4", "4:5"];
  return ["どれも当てはまらない", "本文からは判断できない", "上記の反対である", "一部だけ当てはまる"];
}

function buildWords() {
  const result = [];
  for (let i = 0; i < 80; i += 1) {
    const [term, meaning, wrong] = wordBank[i % wordBank.length];
    const [choices, answer] = choiceSet(meaning, rotate(wrong, i), i);
    result.push(q(
      `vw-${String(i + 1).padStart(3, "0")}`,
      "verbal-words",
      "verbal",
      `「${term}」の意味として最も近いものを選びなさい。`,
      choices,
      answer,
      explanation([
        `考え方：${term}は「${meaning}」という意味です。`,
        "注意点：漢字の印象だけで選ばず、文中で言い換えられる意味を選びます。",
        "時短ポイント：迷ったら、選択肢を肯定・否定・変化・状態のどれに当たるか分類します。"
      ]),
      i % 3 === 0 ? "basic" : "standard",
      "語句"
    ));
  }
  return result;
}

function buildRelations() {
  const result = [];
  for (let i = 0; i < 70; i += 1) {
    const item = relationBank[i % relationBank.length];
    const choices = rotate(item[3], i);
    const correct = item[3][item[4]];
    result.push(q(
      `vr-${String(i + 1).padStart(3, "0")}`,
      "verbal-relations",
      "verbal",
      `次の二語の関係と同じ関係になる組み合わせを選びなさい。\n\n${item[0]}：${item[1]}`,
      choices,
      choices.indexOf(correct),
      explanation([
        `考え方：${item[0]}と${item[1]}は「${item[2]}」の関係です。`,
        `正解は「${correct}」です。同じ型で説明できる組み合わせを選びます。`,
        "時短ポイント：二語関係は、道具と用途、職業と場所、具体例と上位概念、因果関係に分けると速く解けます。"
      ]),
      i % 4 === 0 ? "basic" : "standard",
      "二語関係"
    ));
  }
  return result;
}

function buildSentences() {
  const result = [];
  for (let i = 0; i < 60; i += 1) {
    const item = sentenceBank[i % sentenceBank.length];
    const [choices, answer] = choiceSet(item[1], item[2], i);
    result.push(q(
      `vs-${String(i + 1).padStart(3, "0")}`,
      "verbal-sentences",
      "verbal",
      `空欄に入る語として最も適切なものを選びなさい。\n\n${item[0]}`,
      choices,
      answer,
      explanation([
        `考え方：文脈上は「${item[1]}」が最も自然です。`,
        `根拠：${item[3]}`,
        "時短ポイント：空欄の前後にある逆接、因果、目的語を先に確認します。"
      ]),
      i % 5 === 0 ? "basic" : "standard",
      "空欄補充"
    ));
  }
  return result;
}

function buildReading() {
  const result = [];
  for (let i = 0; i < 30; i += 1) {
    const item = readingBank[i % readingBank.length];
    const [choices, answer] = choiceSet(item.answer, item.wrong, i);
    result.push(q(
      `vl-${String(i + 1).padStart(3, "0")}`,
      "verbal-reading",
      "verbal",
      `${item.text}\n\n${item.ask}`,
      choices,
      answer,
      explanation([
        "考え方：本文全体で繰り返されている主張を選びます。",
        `正解根拠：本文は「${item.answer}」という方向の内容を述べています。`,
        "注意点：本文にない極端な表現や、一部だけを強調した選択肢は避けます。"
      ]),
      "standard",
      "長文"
    ));
  }
  return result;
}

function buildRate() {
  const result = [];
  for (let i = 0; i < 80; i += 1) {
    const type = i % 4;
    if (type === 0) {
      const rate = [10, 15, 20, 25, 30][Math.floor(i / 4) % 5];
      const base = 2000 + (i % 10) * 500;
      const sale = base * (100 - rate) / 100;
      const [choices, answer] = choiceSet(`${base}円`, [`${base - 200}円`, `${base + 200}円`, `${Math.round(sale * 1.2)}円`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal", `定価の${rate}%引きで売ったところ、売値は${sale}円だった。定価はいくらか。`, choices, answer, explanation([`考え方：${rate}%引きは定価の${100 - rate}%で売ったという意味です。`, `式：${sale} ÷ ${(100 - rate) / 100} = ${base}`, "注意点：割引後の金額に割引率を足しても元の定価には戻りません。"]), "standard", "割引"));
    } else if (type === 1) {
      const cost = 600 + (i % 12) * 100;
      const profit = [15, 20, 25, 30][i % 4];
      const price = cost * (100 + profit) / 100;
      const [choices, answer] = choiceSet(`${price}円`, [`${price - 100}円`, `${price + 100}円`, `${cost + profit}円`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal", `原価${cost}円の商品に${profit}%の利益を見込んで定価をつけた。定価はいくらか。`, choices, answer, explanation([`考え方：利益率は原価を基準にします。`, `式：${cost} × ${(100 + profit) / 100} = ${price}`, "時短ポイント：利益を乗せる問題は、原価×1.xxで処理します。"]), "standard", "損益"));
    } else if (type === 2) {
      const a = 2 + (i % 5);
      const b = a + 2;
      const total = (a + b) * (8 + (i % 4));
      const ans = total * a / (a + b);
      const [choices, answer] = choiceSet(`${ans}`, [`${total - ans}`, `${ans + a}`, `${ans - a}`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal", `AとBの比は${a}:${b}で、合計は${total}である。Aはいくつか。`, choices, answer, explanation([`考え方：全体を${a + b}等分したうち、Aは${a}等分です。`, `式：${total} × ${a}/${a + b} = ${ans}`, "注意点：比の合計を分母にするのを忘れないようにします。"]), "basic", "比"));
    } else {
      const old = 80 + (i % 9) * 10;
      const inc = [10, 20, 25, 50][i % 4];
      const now = old * (100 + inc) / 100;
      const [choices, answer] = choiceSet(`${inc}%`, [`${inc + 5}%`, `${Math.round(now / old)}%`, `${100 + inc}%`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal", `昨年${old}個だった販売数が今年${now}個になった。増加率はどれか。`, choices, answer, explanation([`考え方：増加率は増えた量を昨年の値で割ります。`, `式：(${now} - ${old}) ÷ ${old} × 100 = ${inc}%`, "注意点：今年の値をそのまま割合にしないようにします。"]), "standard", "増加率"));
    }
  }
  return result;
}

function buildPayment() {
  const result = [];
  for (let i = 0; i < 50; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const unit = 120 + (i % 8) * 30;
      const count = 4 + (i % 5);
      const total = unit * count;
      const [choices, answer] = choiceSet(`${total}円`, [`${total - unit}円`, `${total + unit}円`, `${unit + count}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal", `1個${unit}円の商品を${count}個買った。代金はいくらか。`, choices, answer, explanation([`式：${unit} × ${count} = ${total}`, "時短ポイント：単価×個数の基本型です。単位を円でそろえます。"]), "basic", "代金"));
    } else if (type === 1) {
      const people = 3 + (i % 4);
      const total = people * (900 + (i % 6) * 100);
      const extra = 300 + (i % 3) * 100;
      const paid = total + extra;
      const each = total / people;
      const [choices, answer] = choiceSet(`${each}円`, [`${paid / people}円`, `${each + extra}円`, `${each - 100}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal", `${people}人で食事をし、合計${total}円を均等に払うことにした。1人あたりはいくらか。`, choices, answer, explanation([`式：${total} ÷ ${people} = ${each}`, "注意点：精算問題では、誰が多く払ったかより、最終的に均等にする金額を先に求めます。"]), "basic", "精算"));
    } else {
      const adult = 800 + (i % 4) * 100;
      const child = adult / 2;
      const a = 2 + (i % 3);
      const c = 2 + (i % 4);
      const total = adult * a + child * c;
      const [choices, answer] = choiceSet(`${total}円`, [`${adult * (a + c)}円`, `${total - child}円`, `${total + child}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal", `大人料金は${adult}円、子ども料金は${child}円である。大人${a}人、子ども${c}人の合計はいくらか。`, choices, answer, explanation([`式：${adult}×${a} + ${child}×${c} = ${total}`, "注意点：人数ごとに単価が違うときは、項目別に小計を出します。"]), "standard", "料金"));
    }
  }
  return result;
}

function buildSpeed() {
  const result = [];
  for (let i = 0; i < 70; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const speed = [40, 50, 60, 80][i % 4];
      const time = [1.5, 2, 2.5, 3][Math.floor(i / 4) % 4];
      const dist = speed * time;
      const [choices, answer] = choiceSet(`${time}時間`, [`${time + 0.5}時間`, `${time - 0.5}時間`, `${dist + speed}時間`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal", `時速${speed}kmで${dist}km進むのにかかる時間はどれか。`, choices, answer, explanation([`考え方：時間 = 距離 ÷ 速さです。`, `式：${dist} ÷ ${speed} = ${time}時間`, "時短ポイント：時速とkmで単位がそろっているか確認します。"]), "basic", "速度"));
    } else if (type === 1) {
      const a = [12, 15, 20][i % 3];
      const b = [6, 10, 12][i % 3];
      const days = cleanNumber(1 / (1 / a + 1 / b));
      const [choices, answer] = choiceSet(`${days}日`, [`${Math.round((a + b) / 2)}日`, `${Math.min(a, b)}日`, `${Math.max(a, b)}日`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal", `Aが1人で行うと${a}日、Bが1人で行うと${b}日かかる仕事がある。2人で行うと何日か。`, choices, answer, explanation([`考え方：1日あたりの仕事量で考えます。`, `式：1 ÷ (1/${a} + 1/${b}) = ${days}日`, "注意点：日数を単純に平均してはいけません。"]), "standard", "仕事算"));
    } else {
      const speed = [60, 75, 80, 90][i % 4];
      const minutes = [20, 24, 30, 40][Math.floor(i / 4) % 4];
      const dist = speed * minutes;
      const [choices, answer] = choiceSet(`${dist}m`, [`${dist - speed}m`, `${dist + speed}m`, `${speed + minutes}m`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal", `分速${speed}mで${minutes}分歩くと、何m進むか。`, choices, answer, explanation([`式：${speed} × ${minutes} = ${dist}m`, "時短ポイント：分速なら時間も分でそろえます。"]), "basic", "距離"));
    }
  }
  return result;
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function frac(n, d) {
  const g = gcd(n, d);
  return `${n / g}/${d / g}`;
}

function cleanNumber(value) {
  return Number(value.toFixed(2)).toString();
}

function buildProbability() {
  const result = [];
  for (let i = 0; i < 70; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const red = 2 + (i % 5);
      const white = 3 + (i % 4);
      const correct = frac(red, red + white);
      const [choices, answer] = choiceSet(correct, [frac(white, red + white), frac(red, white), frac(1, red + white)], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal", `赤玉${red}個、白玉${white}個が入った袋から1個取り出す。赤玉が出る確率はどれか。`, choices, answer, explanation([`考え方：確率 = 条件に合う数 ÷ 全体の数です。`, `式：${red} ÷ ${red + white} = ${correct}`, "注意点：分母は赤玉だけでなく、袋の中の全体です。"]), "basic", "確率"));
    } else if (type === 1) {
      const n = 3 + (i % 4);
      const factorial = Array.from({ length: n }, (_, k) => k + 1).reduce((a, b) => a * b, 1);
      const [choices, answer] = choiceSet(`${factorial}通り`, [`${factorial / n}通り`, `${factorial + n}通り`, `${n * n}通り`], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal", `${n}人を一列に並べる並べ方は何通りか。`, choices, answer, explanation([`考え方：異なる${n}人を並べるので${n}!です。`, `式：${Array.from({ length: n }, (_, k) => n - k).join("×")} = ${factorial}`, "時短ポイント：並べる順序を区別するなら順列です。"]), "standard", "順列"));
    } else {
      const total = 6 + (i % 5);
      const choose = 2;
      const comb = total * (total - 1) / 2;
      const [choices, answer] = choiceSet(`${comb}通り`, [`${total * choose}通り`, `${comb - 1}通り`, `${total + choose}通り`], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal", `${total}個の中から2個を選ぶ組み合わせは何通りか。`, choices, answer, explanation([`考え方：順序を区別しないので組み合わせです。`, `式：${total}×${total - 1}÷2 = ${comb}`, "注意点：A,BとB,Aを別に数えないため、最後に2で割ります。"]), "standard", "組み合わせ"));
    }
  }
  return result;
}

function buildLogic() {
  const result = [];
  for (let i = 0; i < 80; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const total = 30 + (i % 5) * 5;
      const a = 14 + (i % 6);
      const b = 12 + (i % 5);
      const both = 5 + (i % 4);
      const union = a + b - both;
      const [choices, answer] = choiceSet(`${union}人`, [`${a + b}人`, `${union - both}人`, `${total - union}人`], i);
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal", `${total}人のうち、英語が得意な人は${a}人、数学が得意な人は${b}人、両方得意な人は${both}人である。少なくともどちらか一方が得意な人は何人か。`, choices, answer, explanation([`考え方：少なくとも一方は和集合です。`, `式：${a} + ${b} - ${both} = ${union}`, "注意点：両方得意な人は二重に数えているため1回引きます。"]), "standard", "集合"));
    } else if (type === 1) {
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal", "PならばQである。Qでないことが分かった。このとき確実に言えるものはどれか。", ["Pである", "Pでない", "Qである", "何も言えない"], 1, explanation(["考え方：「PならばQ」の対偶は「QでないならPでない」です。", "正解：Qでないので、Pでないことが確実です。", "注意点：「QならばP」と逆にしてはいけません。"]), "standard", "命題"));
    } else {
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal", "AはBより高く、CはAより低い。このとき確実に言えるものはどれか。", ["BはCより高い", "AはCより高い", "CはBより高い", "Bが最も低い"], 1, explanation(["考え方：分かっている順序だけを線にします。", "AはCより高いことは確実です。BとCの関係は情報不足で決まりません。", "時短ポイント：推論では、確実に言えることだけを選びます。"]), "basic", "順序"));
    }
  }
  return result;
}

function buildTable() {
  const result = [];
  for (let i = 0; i < 70; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const a = 80 + (i % 6) * 10;
      const b = a + 20;
      const c = a + 40;
      const avg = (a + b + c) / 3;
      const [choices, answer] = choiceSet(`${avg}人`, [`${a + b + c}人`, `${avg + 10}人`, `${avg - 10}人`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal", `月曜${a}人、火曜${b}人、水曜${c}人の来店者があった。3日間の平均は何人か。`, choices, answer, explanation([`式：(${a}+${b}+${c}) ÷ 3 = ${avg}`, "注意点：合計ではなく平均を聞かれている点に注意します。"]), "basic", "平均"));
    } else if (type === 1) {
      const last = 100 + (i % 8) * 10;
      const rate = [10, 20, 25, 30][i % 4];
      const now = last * (100 + rate) / 100;
      const [choices, answer] = choiceSet(`${rate}%`, [`${100 + rate}%`, `${rate - 5}%`, `${Math.round(now - last)}%`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal", `前年売上が${last}万円、今年売上が${now}万円だった。前年比の増加率はどれか。`, choices, answer, explanation([`式：(${now}-${last}) ÷ ${last} × 100 = ${rate}%`, "注意点：前年比は前年を基準にします。今年を分母にしません。"]), "standard", "資料読解"));
    } else {
      const x = 12 + (i % 5) * 3;
      const y = 18 + (i % 5) * 3;
      const z = 24 + (i % 5) * 3;
      const total = x + y + z;
      const [choices, answer] = choiceSet(`${total}万円`, [`${total - x}万円`, `${total + x}万円`, `${Math.round(total / 3)}万円`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal", `A部門${x}万円、B部門${y}万円、C部門${z}万円の売上がある。合計はいくらか。`, choices, answer, explanation([`式：${x}+${y}+${z} = ${total}万円`, "時短ポイント：表の列・行のどちらを合計する問題か、先に確認します。"]), "basic", "合計"));
    }
  }
  return result;
}

const generatedQuestions = [
  ...buildWords(),
  ...buildRelations(),
  ...buildSentences(),
  ...buildReading(),
  ...buildRate(),
  ...buildPayment(),
  ...buildSpeed(),
  ...buildProbability(),
  ...buildLogic(),
  ...buildTable()
];

const CHAPTER_SIZE = 20;

function splitGeneratedQuestions() {
  const splitChapters = [];
  const splitQuestions = [];

  baseChapters.forEach((chapter) => {
    const items = generatedQuestions.filter((question) => question.chapterId === chapter.id);
    const totalParts = Math.ceil(items.length / CHAPTER_SIZE);
    for (let part = 0; part < totalParts; part += 1) {
      const partItems = items.slice(part * CHAPTER_SIZE, (part + 1) * CHAPTER_SIZE);
      const splitId = `${chapter.id}-${String(part + 1).padStart(2, "0")}`;
      splitChapters.push({
        id: splitId,
        title: `${chapter.title} ${part + 1}`,
        area: chapter.area,
        parentId: chapter.id,
        target: partItems.length
      });
      partItems.forEach((question) => {
        splitQuestions.push({
          ...question,
          chapterId: splitId,
          parentChapterId: chapter.id
        });
      });
    }
  });

  return { splitChapters, splitQuestions };
}

const split = splitGeneratedQuestions();

export const chapters = split.splitChapters;
export const questions = split.splitQuestions;
