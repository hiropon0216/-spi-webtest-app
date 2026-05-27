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

// [word, meaning, [wrong1, wrong2, wrong3]]
const wordBank = [
  ["周到", "準備や配慮が細部まで行き届いていること", ["急いで判断すること", "考えが偏っていること", "偶然に任せること"]],
  ["懐疑的", "物事をそのまま信じず疑いを持つ態度", ["深く感謝する態度", "強く賛成する態度", "すぐに行動する態度"]],
  ["均衡", "複数の力や量が釣り合っていること", ["著しく不足すること", "一方だけが優先されること", "急に広がること"]],
  ["顕著", "はっきりと目立っていること", ["少しずつ消えていくこと", "内側に隠れていること", "関係が薄いこと"]],
  ["暫定", "正式に決まるまで一時的に定めること", ["永久に固定すること", "完全に廃止すること", "無条件に認めること"]],
  ["包括", "全体をまとめて含むこと", ["一部だけを除外すること", "順番に並べること", "感情的に反発すること"]],
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
  ["蓋然性", "ある事柄が起こる確からしさ", ["絶対に起こらないこと", "過去の事実そのもの", "感情の強さ"]],
  ["看過", "見て見ぬふりをして見逃すこと", ["徹底的に追及すること", "積極的に援助すること", "詳細に記録すること"]],
  ["漸進", "少しずつ前進すること", ["急激に後退すること", "突然方向転換すること", "完全に停止すること"]],
  ["瑣末", "取るに足らない細かいこと", ["非常に重要なこと", "全体に影響すること", "根本的な問題であること"]],
  ["峻別", "厳しく区別・区分すること", ["混ぜ合わせること", "ゆるやかに移行すること", "まとめて扱うこと"]],
  ["逡巡", "ためらってなかなか決められないこと", ["迷わず即断すること", "慎重に計画を立てること", "明確に拒否すること"]],
  ["払拭", "すっかり取り除いて消すこと", ["新たに加えること", "じっくり保持すること", "部分的に修正すること"]],
  ["奔走", "目標のためにあちこち走り回ること", ["静かに待機すること", "一か所に集中すること", "遠くから見守ること"]],
  ["敷衍", "詳しく説き広げて明らかにすること", ["ごく短くまとめること", "意図的に隠すこと", "他者に委ねること"]],
  ["錯綜", "物事が入り組んで複雑になること", ["すっきりと整理されること", "単純に並ぶこと", "明快に区分されること"]],
  ["忖度", "相手の気持ちや意向を推し量ること", ["自分の意見を主張すること", "事実だけを報告すること", "感情を排して判断すること"]],
  ["辟易", "うんざりして嫌になること", ["非常に好意を持つこと", "強い関心を示すこと", "積極的に取り組むこと"]],
  ["精緻", "細かいところまで正確で丁寧なこと", ["おおざっぱで大まかなこと", "シンプルで簡素なこと", "大胆で派手なこと"]],
  ["截然", "はっきりと区別されているさま", ["曖昧でぼんやりしているさま", "徐々に変化するさま", "複雑に混ざり合うさま"]],
  ["闊達", "心が広くのびのびしていること", ["心が狭く細かいこと", "慎重で控えめなこと", "厳しく規律正しいこと"]],
  ["逼迫", "余裕がなくなって追い詰められること", ["十分な余裕があること", "徐々に改善されること", "問題が解決されること"]],
  ["擁護", "かばい守ること", ["積極的に批判すること", "中立の立場を保つこと", "完全に無視すること"]],
  ["怠惰", "怠けてだらしないこと", ["非常に勤勉なこと", "規律を重んじること", "才能に恵まれていること"]],
  ["卓越", "他よりはるかに優れていること", ["平均的であること", "やや劣っていること", "内側に隠れていること"]],
  ["恣意", "自分の思いのままに振る舞うこと", ["規則に従い行動すること", "他者の意見に従うこと", "慎重に熟慮すること"]],
  ["漸次", "少しずつ順を追って進むこと", ["一気にまとめて行うこと", "途中で止めること", "逆の順序で進めること"]]
];

// [word1, word2, relation, [choice1, choice2, choice3, choice4], correctIndex]
const relationBank = [
  ["医師", "病院", "職業と働く場所", ["教師：学校", "魚：海", "時計：時間", "作家：小説"], 0],
  ["包丁", "切る", "道具と主な用途", ["鉛筆：書く", "椅子：木材", "本：書架", "窓：明かり"], 0],
  ["春", "季節", "具体例と上位概念", ["月曜：曜日", "東京：地図", "米：調理", "机：重い"], 0],
  ["序章", "本編", "前後関係（前が先）", ["予選：決勝", "結果：原因", "夕：朝", "秋：春"], 0],
  ["作家", "小説", "作る人と成果物", ["画家：絵画", "運転手：道路", "医師：患者", "農家：市場"], 0],
  ["種", "発芽", "きっかけと変化", ["卵：孵化", "水：流れ", "紙：白い", "窓：換気"], 0],
  ["裁判官", "判決", "判断する人と出す結果", ["審判：判定", "教師：教室", "記者：事務所", "店員：商品"], 0],
  ["原因", "結果", "因果関係", ["努力：成果", "東：西", "兄：弟", "夏：海"], 0],
  ["辞書", "言葉", "調べる道具と調べられる対象", ["地図：場所", "時計：秒針", "電車：線路", "鉛筆：ノート"], 0],
  ["木材", "家具", "材料と完成品", ["小麦：パン", "布：縫う", "鉄：重い", "砂：砂浜"], 0],
  ["翻訳家", "外国語", "職業と扱う対象", ["写真家：カメラ", "弁護士：法律", "大工：木材", "シェフ：調理"], 1],
  ["序論", "結論", "文章の前後構成", ["出発：到着", "入口：出口", "昨日：今日", "問題：解答"], 0],
  ["罰則", "違反", "制裁と原因となる行為", ["賞賛：功績", "批判：欠点", "報酬：労働", "修理：故障"], 0],
  ["熱帯魚", "魚類", "種と属する分類", ["バラ：植物", "犬：哺乳類", "台風：低気圧", "電車：乗り物"], 0],
  ["練習", "上達", "行為とその結果", ["読書：知識", "食事：空腹", "旅行：疲労", "努力：改善"], 0],
  ["患者", "医師", "助けを求める者と援助者", ["依頼人：弁護士", "生徒：参考書", "客：商品", "観客：俳優"], 0],
  ["楽器", "演奏する", "道具と行為", ["絵具：描く", "テレビ：重い", "本棚：木", "靴：歩く"], 0],
  ["建築家", "設計図", "作る人と中間成果物", ["料理人：レシピ", "作家：出版社", "教師：黒板", "歌手：楽器"], 0],
  ["防止", "発生", "目的（対象行為を止める）", ["節約：浪費", "促進：停滞", "修正：誤り", "強化：弱体"], 0],
  ["喜劇", "悲劇", "対義関係", ["成功：失敗", "輸出：輸入", "攻撃：守備", "質問：回答"], 0]
];

// [sentence_with_blank, correct, [wrong1, wrong2, wrong3], hint]
const sentenceBank = [
  ["新しい制度は負担軽減を目的としていたが、手続きが増え、かえって業務を__した。", "複雑化", ["簡素化", "円滑化", "標準化"], "逆接の後で手続きが増えたとあるため、悪化方向の語を選びます。"],
  ["短期的な成果だけを追うと、長期的な信頼を__おそれがある。", "損なう", ["補う", "高める", "定める"], "短期成果偏重の悪影響なので、信頼を失う意味の語が自然です。"],
  ["調査結果をそのまま採用するのではなく、条件の違いを__して考える必要がある。", "考慮", ["放置", "隠蔽", "断定"], "条件差を踏まえる文脈なので、考慮が入ります。"],
  ["計画は魅力的だったが、費用対効果の面で__に乏しかった。", "妥当性", ["偶然性", "装飾性", "娯楽性"], "費用対効果から見た適切さを問うため、妥当性が合います。"],
  ["意見が対立したため、双方の主張を整理し、論点を__することにした。", "明確化", ["拡散", "混同", "省略"], "対立時は論点をはっきりさせるのが自然です。"],
  ["一部の成功例だけで全体を判断するのは、結論を__する危険がある。", "早急に一般化", ["慎重に検証", "丁寧に補足", "客観的に記録"], "一部から全体に広げすぎる危険を表します。"],
  ["彼女は反対意見にも耳を傾け、議論を__な方向へ導いた。", "建設的", ["感情的", "一方的", "否定的"], "多様な意見を取り込んで前向きに進める姿を表します。"],
  ["担当者が変わっても業務が滞らないよう、手順を__しておく必要がある。", "文書化", ["簡略化", "口頭で確認", "廃止"], "引き継ぎのために記録に残す文脈です。"],
  ["そのデータは条件が特殊すぎるため、一般的な結論に__するのは難しい。", "応用", ["転換", "矛盾", "適用"], "特殊条件→一般化の困難さを述べています。"],
  ["発言の意図を__せずに言葉の表面だけで判断すると、誤解が生じる。", "考慮", ["排除", "曲解", "省略"], "意図を踏まえて判断するという文脈です。"],
  ["繰り返し練習することで技術が__し、自信を持って本番に臨めるようになった。", "向上", ["低下", "固定", "消耗"], "練習の結果として技術が上がることを表します。"],
  ["複数の案を比較検討した結果、コスト面で最も__な方法を採用した。", "優れた", ["劣った", "複雑な", "危険な"], "比較してよい結果の案を選ぶ文脈です。"],
  ["この問題は担当部署だけでは解決が難しく、部門を__した対応が求められる。", "横断", ["縦断", "限定", "分断"], "複数の部署が連携する必要性を表します。"],
  ["証拠が不十分なまま判断を下すことは、__なリスクを招きかねない。", "不必要", ["当然の", "最小限の", "回避可能な"], "不十分な根拠による判断の危険性を述べています。"],
  ["彼はどんな批判も真摯に受け止め、自身の行動を__することを怠らなかった。", "見直す", ["正当化する", "無視する", "誇示する"], "批判を受けて自己改善する姿勢を表します。"]
];

// text, ask, answer, wrong[], note (passage-specific explanation)
const readingBank = [
  {
    text: `組織が新しい仕組みを導入するとき、便利さだけで評価すると失敗しやすい。利用者がどの場面で迷うのか、既存の手順とどこで衝突するのかを事前に確認する必要がある。小さな試行で問題点を見つけ、修正してから全体へ広げる方が、結果的には定着が早い。また、導入後も利用状況を継続的に観察し、当初想定していなかった課題が生じた場合は柔軟に改善策を講じることが求められる。`,
    ask: "本文の主旨として最も適切なものはどれか。",
    answer: "新しい仕組みは小さく試して改善してから広げ、導入後も継続的に見直すべきである",
    wrong: ["便利な仕組みはすぐに全体へ広げるべきである", "既存の手順は必ず廃止するべきである", "利用者の迷いは導入後に自然に解消する"],
    note: "本文の構造：「小さな試行→修正→展開」（第3文）と「導入後も継続観察・改善」（第4文）の2点が主旨です。\n✗「すぐ全体へ広げる」→第3文で「小さく試してから広げる」と逆のことが書かれています。\n✗「既存手順を廃止」→本文に一切書かれていない内容です。\n✗「自然に解消」→第4文で「改善策を講じることが求められる」と人の介入が必要と述べています。"
  },
  {
    text: `資料を読むときは、大きな数値だけに注目すると判断を誤ることがある。増加率・基準年・母数の違いを確認しなければ、実態より大きく見えたり小さく見えたりする。数字そのものより、何を基準にした数字なのかを先に確認することが重要である。さらに、グラフの縦軸が0から始まっていない場合は変化が誇張されて見えることにも注意が必要だ。`,
    ask: "本文で最も重視されていることはどれか。",
    answer: "数値の基準・母数・グラフの起点を確認すること",
    wrong: ["最も大きな数値を優先的に選ぶこと", "増加している項目だけを取り上げること", "細かな数値をすべて暗記すること"],
    note: "本文は「増加率・基準年・母数」（第2文）と「グラフの縦軸の起点」（第4文）の確認を求めています。正解はこの3点すべてを含んでいます。\n✗「最も大きな数値を選ぶ」→第1文で「大きな数値だけに注目すると誤る」と正反対のことが書かれています。\n✗「増加項目だけ取り上げる」→偏った読み方として否定されています。\n✗「数値を暗記する」→本文のテーマ（読み方の注意点）とは無関係です。"
  },
  {
    text: `会議で意見を集める目的は、単に多数派を決めることではない。反対意見の中には、計画の弱点を示す情報が含まれている場合がある。早い段階で懸念を取り込めば、実行後の手戻りを減らすことができる。ただし、すべての意見を無制限に取り入れると意思決定が遅れるため、議論の範囲と期限をあらかじめ設定しておくことも重要である。`,
    ask: "本文の考え方に最も近いものはどれか。",
    answer: "反対意見は計画を改善する材料になり得るが、議論の範囲と期限も必要である",
    wrong: ["多数派の意見だけで決めるべきである", "反対意見はすべて取り入れるべきである", "会議では結論を急ぐほどよい"],
    note: "本文の主張は2点：「反対意見→弱点発見・改善」（第2・3文）＋「無制限に取り入れない・期限設定が必要」（第4文）。正解はこの両方を含んでいます。\n✗「多数派で決める」→第1文で「多数派を決めることが目的ではない」と明示されています。\n✗「すべて取り入れる」→第4文で「無制限に取り入れると遅れる」と否定されています。\n✗「結論を急ぐ」→本文は反対意見を取り込む余裕が必要だと述べており、急ぐことを推奨していません。"
  },
  {
    text: `近年、技術の進歩は人々の生活を豊かにする一方で、新たな格差を生む側面もある。新しい技術が普及しても、それを使いこなせる人とそうでない人の間に溝が生まれることがある。教育や支援の仕組みが整わないまま技術だけが先行すると、恩恵を受けられない層が取り残されてしまう。したがって、技術の導入と同時に、誰もが利用できる環境を整えることが社会全体の課題である。`,
    ask: "本文の主張として最も適切なものはどれか。",
    answer: "技術の普及には、誰もが利用できる教育・支援の環境整備が不可欠である",
    wrong: ["技術の進歩は人々の生活を必ず豊かにする", "格差は技術が普及すれば自然に解消される", "技術の導入よりも教育だけを優先すべきである"],
    note: "本文の流れ：「技術進歩は格差も生む」（第1・2文）→「教育・支援なしでは恩恵を受けられない層が出る」（第3文）→「技術導入と同時に環境整備が必要」（第4文）。\n✗「必ず豊かにする」→第1文で「一方で格差を生む側面もある」と限定されています。\n✗「自然に解消」→第3文で取り残されると述べており、自然解消は書かれていません。\n✗「教育だけを優先」→第4文で「技術の導入と同時に」と述べており、教育だけの優先ではありません。"
  },
  {
    text: `近年、リモートワークの普及に伴い、働き方の多様化が進んでいる。しかし、自宅での作業は職場環境と異なり、集中力の維持が難しい場合がある。また、チームメンバーとの情報共有やコミュニケーションが対面と比べて手間がかかることも指摘されている。こうした課題に対処するため、定期的なオンライン会議や進捗管理ツールの活用が有効とされている。`,
    ask: "本文で述べられていないものはどれか。",
    answer: "リモートワークが生産性を必ず低下させるという主張",
    wrong: ["リモートワークでは集中力の維持が難しい場合がある", "情報共有やコミュニケーションに手間がかかることがある", "オンライン会議や進捗管理ツールが有効とされている"],
    note: "「述べられていないもの」を選ぶ問題です。消去法で確認します。\n✓「集中力の維持が難しい」→第2文に明記されています（不正解選択肢）。\n✓「情報共有の手間」→第3文に明記されています（不正解選択肢）。\n✓「オンライン会議・ツールが有効」→第4文に明記されています（不正解選択肢）。\n「生産性を必ず低下させる」という断言は本文のどこにも書かれていないため、これが正解です。本文は課題を述べていますが、「必ず低下」とは言っていません。"
  },
  {
    text: `企業が脱炭素化を進める動きが広がっているが、単に排出量を削減するだけでなく、使用するエネルギーの質を転換することが根本的な解決につながる。再生可能エネルギーの導入コストは近年大幅に低下しており、長期的には経済的な優位性も見込まれる。社会全体での移行を促すには、制度的な後押しと消費者意識の変化が両輪となる。`,
    ask: "本文の論旨として最も適切なものはどれか。",
    answer: "脱炭素化にはエネルギー転換が本質であり、制度整備と意識変化の両方が必要である",
    wrong: ["排出量の削減だけで環境問題は解決できる", "再生可能エネルギーは現時点でコストが高い", "消費者の意識変化だけで社会全体の移行が実現する"],
    note: "本文の主張：「排出削減だけでなくエネルギー転換が根本解決」（第1文）＋「制度的後押しと消費者意識変化が両輪で必要」（第3文）。\n✗「排出削減だけで解決」→第1文で「単に削減するだけでなく」と明示されています。\n✗「コストが高い」→第2文で「大幅に低下」と正反対のことが書かれています。\n✗「消費者意識だけで実現」→第3文の「両輪」という表現は制度整備と意識変化の両方が必要と述べており、一方だけでは不十分です。"
  },
  {
    text: `コミュニケーションにおいて、言葉の正確さだけが伝達の質を決めるわけではない。話し手の表情や声のトーン、間の取り方といった非言語的な要素が、受け手の解釈に大きく影響する。文字情報のみのやりとりでは、こうした非言語情報が欠落するため、意図が誤って伝わるリスクが高まる。重要な事項を伝える際には、媒体の特性を踏まえた補足や確認を意識的に行う必要がある。`,
    ask: "本文が伝えようとしていることとして最も適切なものはどれか。",
    answer: "非言語情報が欠如する媒体を使う場合は、補足や確認を意識的に行うべきである",
    wrong: ["言葉の正確さが最も重要なコミュニケーション要素である", "文字情報だけのやりとりは避けるべきである", "非言語情報は言語情報より常に重要である"],
    note: "本文の流れ：「言葉の正確さだけではない」（第1文）→「非言語要素が解釈に影響する」（第2文）→「文字情報では非言語が欠落しリスクが高まる」（第3文）→「補足・確認が必要」（第4文）。最終文が結論です。\n✗「言葉の正確さが最重要」→第1文で否定されています。\n✗「文字情報は避けるべき」→本文は「補足や確認が必要」と言っているだけで、文字情報を使うな、とは言っていません（言い過ぎ）。\n✗「非言語情報が常に重要」→「常に」という断定は本文に根拠がありません。"
  },
  {
    text: `学習において重要なのは、単に多くの情報を記憶することではなく、概念同士のつながりを理解することである。孤立した知識は応用が利かないが、体系的に整理された知識は問題解決の際に柔軟に活用できる。そのため、学習後には自分の言葉でまとめたり、類似問題に取り組んだりして、知識の定着と転移を促すことが効果的である。`,
    ask: "本文の考え方に最も近いものはどれか。",
    answer: "知識は体系的に整理し、自分の言葉でまとめることで応用力が高まる",
    wrong: ["多くの情報を記憶することが学習の目的である", "孤立した知識でも繰り返せば応用できるようになる", "類似問題への取り組みよりも新しい情報の習得を優先すべきである"],
    note: "本文の主張：「情報の記憶より概念のつながりの理解」（第1文）＋「体系的知識は応用できる」（第2文）＋「自分の言葉でまとめ・類似問題への取り組みが有効」（第3文）。\n✗「多く記憶することが目的」→第1文で「単に多くの情報を記憶することではなく」と否定されています。\n✗「孤立した知識でも繰り返せば応用できる」→第2文で「孤立した知識は応用が利かない」と明示されています。\n✗「新しい情報の習得を優先」→第3文では自分の言葉でまとめることや類似問題への取り組みを推奨しており、新情報の習得優先は述べられていません。"
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
      i < 40
        ? `「${term}」の意味として最も近いものを選びなさい。`
        : `次のうち「${term}」と最も近い意味で使われるものを選びなさい。`,
      choices,
      answer,
      explanation([
        `【正解】「${term}」＝「${meaning}」`,
        `【解き方】選択肢を「意味が逆のもの」「別の概念のもの」「一部だけ合うもの」の3タイプに分けると正解が絞れます。`,
        `【注意】漢字1文字ずつの印象ではなく、語全体のニュアンスで判断しましょう。`,
        `【時短】まず正解がプラス評価かマイナス評価かを確認し、一致しない選択肢を消去します。`
      ]),
      i % 4 === 0 ? "basic" : "standard",
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
        `【関係】「${item[0]}」と「${item[1]}」の関係：${item[2]}`,
        `【正解】「${correct}」が同じ関係です。`,
        `【解き方】①示された二語の関係を一言で言語化する ②選択肢の各ペアに同じ関係が成り立つか確認する、という2ステップで解きます。`,
        `【主な関係タイプ】道具と用途 / 職業と場所・成果物 / 具体例と上位概念 / 因果・前後 / 対義語`
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
        `【正解】「${item[1]}」`,
        `【根拠】${item[3]}`,
        `【解き方】①空欄の前後にある接続関係（逆接・因果・目的）を確認する ②空欄に入る語が文全体の意味をプラスにするかマイナスにするかを判断する ③選択肢を当てはめて文の流れが自然か確認する。`,
        `【注意】選択肢は意味が似ているものが多いため、文脈に合う「強さ」や「方向性」も考慮します。`
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
        `【正解】「${item.answer}」`,
        item.note,
        `【読解の基本手順】①各段落の主語と述語を確認する ②接続詞の後ろに注目する（「しかし」は逆の意見、「したがって」は結論） ③最終文・最終段落に著者の主張がまとめられることが多い。`
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
    const type = i % 5;
    if (type === 0) {
      const rate = [10, 15, 20, 25, 30][Math.floor(i / 5) % 5];
      const base = 2000 + (i % 10) * 500;
      const sale = base * (100 - rate) / 100;
      const [choices, answer] = choiceSet(`${base}円`, [`${base - 200}円`, `${base + 200}円`, `${Math.round(sale * 1.2)}円`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal",
        `定価の${rate}%引きで売ったところ、売値は${sale}円だった。定価はいくらか。`,
        choices, answer,
        explanation([
          `【考え方】${rate}%引き ＝ 定価の${100 - rate}%で売ったということです。`,
          `【手順】売値 ÷ (1 - 割引率) ＝ 定価`,
          `【計算】${sale} ÷ ${(100 - rate) / 100} ＝ ${base}円`,
          `【よくある誤り】「売値 + 売値×${rate}%」で計算すると誤りです。${rate}%引きとは定価ではなく売値を基準にした${rate}%ではありません。`
        ]),
        "standard", "割引"));
    } else if (type === 1) {
      const cost = 600 + (i % 12) * 100;
      const profit = [15, 20, 25, 30][i % 4];
      const price = cost * (100 + profit) / 100;
      const [choices, answer] = choiceSet(`${price}円`, [`${price - 100}円`, `${price + 100}円`, `${cost + profit}円`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal",
        `原価${cost}円の商品に${profit}%の利益を見込んで定価をつけた。定価はいくらか。`,
        choices, answer,
        explanation([
          `【考え方】利益率は「原価を基準」にした割合です。`,
          `【手順】定価 ＝ 原価 × (1 + 利益率)`,
          `【計算】${cost} × ${(100 + profit) / 100} ＝ ${price}円`,
          `【よくある誤り】「原価 + 利益率」のように利益率をそのまま足すのは誤りです（${cost}+${profit}＝${cost + profit}は間違い）。`
        ]),
        "standard", "損益"));
    } else if (type === 2) {
      const a = 2 + (i % 5);
      const b = a + 2;
      const total = (a + b) * (8 + (i % 4));
      const ans = total * a / (a + b);
      const [choices, answer] = choiceSet(`${ans}`, [`${total - ans}`, `${ans + a}`, `${ans - a}`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal",
        `AとBの比は${a}:${b}で、合計は${total}である。Aはいくつか。`,
        choices, answer,
        explanation([
          `【考え方】比の問題は「全体を${a + b}等分」して考えます。`,
          `【手順】A ＝ 合計 × A/(A+B) ＝ 合計 × ${a}/${a + b}`,
          `【計算】${total} × ${a}/${a + b} ＝ ${ans}`,
          `【注意】Bは${total - ans}です（合計 − A）。比の合計（${a + b}）を分母に使うのを忘れないようにします。`
        ]),
        "basic", "比"));
    } else if (type === 3) {
      const old = 80 + (i % 9) * 10;
      const inc = [10, 20, 25, 50][i % 4];
      const now = old * (100 + inc) / 100;
      const [choices, answer] = choiceSet(`${inc}%`, [`${inc + 5}%`, `${Math.round(now / old)}%`, `${100 + inc}%`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal",
        `昨年${old}個だった販売数が今年${now}個になった。増加率はどれか。`,
        choices, answer,
        explanation([
          `【考え方】増加率 ＝ (増えた量 ÷ 基準年の値) × 100`,
          `【計算】(${now} − ${old}) ÷ ${old} × 100 ＝ ${inc}%`,
          `【よくある誤り①】今年の値（${now}）をそのまま割合にしてはいけません。`,
          `【よくある誤り②】「${100 + inc}%」は今年が昨年の${100 + inc}%という意味で、増加率（${inc}%）とは別物です。`
        ]),
        "standard", "増加率"));
    } else {
      const base = 3000 + (i % 8) * 500;
      const r1 = [10, 20][i % 2];
      const r2 = [10, 15][i % 2];
      const after1 = base * (100 - r1) / 100;
      const final = after1 * (100 - r2) / 100;
      const trap = base * (100 - r1 - r2) / 100;
      const [choices, answer] = choiceSet(`${final}円`, [`${trap}円`, `${Math.round(final + 100)}円`, `${Math.round(final - 100)}円`], i);
      result.push(q(`nr-${String(i + 1).padStart(3, "0")}`, "nonverbal-rate", "nonverbal",
        `定価${base}円の商品を、まず${r1}%引きで販売し、さらにその価格からもう${r2}%引きにした。最終的な売値はいくらか。`,
        choices, answer,
        explanation([
          `【考え方】「さらにそこから割引く」場合は2段階で計算します。`,
          `【手順】1回目：${base} × ${(100 - r1) / 100} ＝ ${after1}円 → 2回目：${after1} × ${(100 - r2) / 100} ＝ ${final}円`,
          `【よくある誤り】合計${r1 + r2}%引きとして計算すると${trap}円になりますが、これは誤りです。`,
          `【理由】2段階目の割引は定価ではなく「1回目割引後の価格」に対してかかるためです。`
        ]),
        "standard", "割引"));
    }
  }
  return result;
}

function buildPayment() {
  const result = [];
  for (let i = 0; i < 50; i += 1) {
    const type = i % 4;
    if (type === 0) {
      // 消費税込み価格の計算（単純な単価×個数より一段難しい）
      const unit = 200 + (i % 6) * 50;
      const count = 3 + (i % 5);
      const subtotal = unit * count;
      const tax = Math.round(subtotal * 0.1);
      const total = subtotal + tax;
      const [choices, answer] = choiceSet(`${total}円`, [`${subtotal}円`, `${tax}円`, `${total + 100}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal",
        `1個${unit}円（税抜き）の商品を${count}個購入した。消費税10%を加えた合計はいくらか。`,
        choices, answer,
        explanation([
          `【手順】税抜き合計 → 消費税額 → 税込み合計 の順に求めます。`,
          `【計算】${unit} × ${count} ＝ ${subtotal}円（税抜き）→ ${subtotal} × 1.1 ＝ ${total}円（税込み）`,
          `【よくある誤り】「${subtotal}円」は税抜き価格です。消費税${tax}円を加えた${total}円が正解です。`,
          `【確認】${subtotal} × 0.1 ＝ ${tax}円が消費税額、${subtotal} + ${tax} ＝ ${total}円で検算できます。`
        ]),
        "standard", "消費税"));
    } else if (type === 1) {
      const people = 3 + (i % 4);
      const total = people * (900 + (i % 6) * 100);
      const each = total / people;
      const [choices, answer] = choiceSet(`${each}円`, [`${Math.floor(total / (people + 1))}円`, `${each + 100}円`, `${each - 100}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal",
        `${people}人で食事をし、合計${total}円を均等に払うことにした。1人あたりいくらか。`,
        choices, answer,
        explanation([
          `【手順】1人あたり ＝ 合計 ÷ 人数`,
          `【計算】${total} ÷ ${people} ＝ ${each}円`,
          `【注意】「${Math.floor(total / (people + 1))}円」は${people + 1}人で割った誤りです。人数を確認してから計算します。`,
          `【実務ヒント】割り勘問題では「誰が多く払ったか」ではなく「最終的に均等になる金額」を求めます。`
        ]),
        "basic", "精算"));
    } else if (type === 2) {
      const adult = 800 + (i % 4) * 100;
      const child = adult / 2;
      const a = 2 + (i % 3);
      const c = 2 + (i % 4);
      const total = adult * a + child * c;
      const [choices, answer] = choiceSet(`${total}円`, [`${adult * (a + c)}円`, `${total - child}円`, `${total + child}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal",
        `大人料金は${adult}円、子ども料金は${child}円である。大人${a}人、子ども${c}人の合計はいくらか。`,
        choices, answer,
        explanation([
          `【手順】種類別に小計を求めてから合計します。`,
          `【計算】大人分：${adult} × ${a} ＝ ${adult * a}円　子ども分：${child} × ${c} ＝ ${child * c}円`,
          `【合計】${adult * a} + ${child * c} ＝ ${total}円`,
          `【よくある誤り】全員を大人料金（${adult}円）で計算すると${adult * (a + c)}円になりますが、子ども料金を見落とした誤りです。`
        ]),
        "standard", "料金"));
    } else {
      const price = 350 + (i % 7) * 50;
      const paid = Math.ceil(price / 500) * 500;
      const change = paid - price;
      const [choices, answer] = choiceSet(`${change}円`, [`${change + 50}円`, `${change - 50}円`, `${paid}円`], i);
      result.push(q(`npay-${String(i + 1).padStart(3, "0")}`, "nonverbal-payment", "nonverbal",
        `${price}円の商品を買い、${paid}円を支払った。おつりはいくらか。`,
        choices, answer,
        explanation([
          `【手順】おつり ＝ 支払い額 − 商品代金`,
          `【計算】${paid} − ${price} ＝ ${change}円`,
          `【確認】${price} + ${change} ＝ ${paid}円（商品代 + おつり ＝ 支払い額）で検算します。`,
          `【注意】${paid}円は「支払い額」です。おつりとは別物なので、そのまま答えにしないよう注意します。`
        ]),
        "basic", "釣り銭"));
    }
  }
  return result;
}

function buildSpeed() {
  const result = [];
  // 往復平均速度の設定（調和平均）：整数になる組み合わせ
  const roundTripPairs = [
    [30, 60, 40],   // 調和平均40、算術平均45（罠）
    [40, 60, 48],   // 調和平均48、算術平均50（罠）
    [30, 45, 36],   // 調和平均36、算術平均37.5（罠）
    [60, 90, 72],   // 調和平均72、算術平均75（罠）
    [20, 30, 24]    // 調和平均24、算術平均25（罠）
  ];
  for (let i = 0; i < 70; i += 1) {
    const type = i % 4;
    if (type === 0) {
      const speed = [40, 50, 60, 80][i % 4];
      const time = [1.5, 2, 2.5, 3][Math.floor(i / 4) % 4];
      const dist = speed * time;
      const [choices, answer] = choiceSet(`${time}時間`, [`${time + 0.5}時間`, `${time - 0.5}時間`, `${dist / speed + 1}時間`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal",
        `時速${speed}kmで${dist}km進むのにかかる時間はどれか。`,
        choices, answer,
        explanation([
          `【公式】時間 ＝ 距離 ÷ 速さ（「は・じ・き」の「じ」を求める）`,
          `【計算】${dist} ÷ ${speed} ＝ ${time}時間`,
          `【単位確認】速さが「時速km」なら距離は「km」・時間は「時間」でそろえます。`,
          `【確認】${speed} × ${time} ＝ ${dist}km で検算できます。`
        ]),
        "basic", "速度"));
    } else if (type === 1) {
      const a = [12, 15, 20][i % 3];
      const b = [6, 10, 12][i % 3];
      const days = cleanNumber(1 / (1 / a + 1 / b));
      const [choices, answer] = choiceSet(`${days}日`, [`${Math.round((a + b) / 2)}日`, `${Math.min(a, b)}日`, `${Math.max(a, b)}日`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal",
        `Aが1人でやると${a}日、Bが1人でやると${b}日かかる仕事がある。2人で協力すると何日かかるか。`,
        choices, answer,
        explanation([
          `【考え方】1日あたりの仕事量（仕事率）で考えます。全体の仕事量を1とします。`,
          `【手順】Aの1日の仕事量 ＝ 1/${a}　Bの1日の仕事量 ＝ 1/${b}`,
          `【計算】2人の合計：1/${a} + 1/${b} ＝ ${cleanNumber(1 / a + 1 / b)}　→　かかる日数：1 ÷ ${cleanNumber(1 / a + 1 / b)} ＝ ${days}日`,
          `【よくある誤り】日数を単純に平均（(${a}+${b})/2＝${Math.round((a + b) / 2)}日）しても正解になりません。`
        ]),
        "standard", "仕事算"));
    } else if (type === 2) {
      // 往復の平均速度（調和平均）：SPI頻出の「算術平均が罠」パターン
      const [speedA, speedB, hmean] = roundTripPairs[Math.floor(i / 4) % roundTripPairs.length];
      const arith = (speedA + speedB) / 2;
      const [choices, answer] = choiceSet(`時速${hmean}km`, [`時速${arith}km`, `時速${speedA}km`, `時速${speedB}km`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal",
        `A地点からB地点まで時速${speedA}kmで行き、B地点からA地点まで時速${speedB}kmで戻った。往復の平均時速はどれか。`,
        choices, answer,
        explanation([
          `【考え方】往復の平均時速は「単純な平均」ではなく「調和平均」で求めます。`,
          `【手順】距離をDとすると、往復時間 ＝ D/${speedA} + D/${speedB}　往復距離 ＝ 2D`,
          `【計算】平均速度 ＝ 2D ÷ (D/${speedA} + D/${speedB}) ＝ 2×${speedA}×${speedB}÷(${speedA}+${speedB}) ＝ ${hmean}km/h`,
          `【重要】「(${speedA}+${speedB})÷2＝${arith}km/h」は不正解です。速さの平均は単純平均より必ず小さくなります。`
        ]),
        "standard", "往復"));
    } else {
      // 整数になる出会い問題の設定 [speedA, speedB, gap, distA, distB]
      const meetConfigs = [
        [40, 60, 50, 20, 30],
        [60, 40, 50, 30, 20],
        [50, 70, 60, 25, 35],
        [30, 70, 80, 24, 56],
        [40, 60, 80, 32, 48]
      ];
      const [speedA, speedB, gap, distA, distB] = meetConfigs[Math.floor(i / 4) % meetConfigs.length];
      const timeMeet = gap / (speedA + speedB);
      const [choices, answer] = choiceSet(`${distA}km`, [`${distB}km`, `${gap}km`, `${speedA + speedB}km`], i);
      result.push(q(`ns-${String(i + 1).padStart(3, "0")}`, "nonverbal-speed", "nonverbal",
        `A・Bが${gap}km離れた地点から向かい合って同時に出発した。AはB方向へ時速${speedA}km、Bはそちらへ時速${speedB}kmで進む。出会うまでにAが進む距離はどれか。`,
        choices, answer,
        explanation([
          `【考え方】向かい合って進む2人が近づく速さ ＝ 速さの和 ＝ ${speedA}+${speedB} ＝ ${speedA + speedB}km/h`,
          `【手順①】出会うまでの時間 ＝ ${gap} ÷ ${speedA + speedB} ＝ ${timeMeet}時間`,
          `【手順②】Aが進む距離 ＝ ${speedA} × ${timeMeet} ＝ ${distA}km`,
          `【確認】Bが進む距離 ＝ ${distB}km　合計：${distA}+${distB} ＝ ${gap}km ✓`
        ]),
        "standard", "出会い"));
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
    const type = i % 4;
    if (type === 0) {
      const red = 2 + (i % 5);
      const white = 3 + (i % 4);
      const correct = frac(red, red + white);
      const [choices, answer] = choiceSet(correct, [frac(white, red + white), frac(red, white), frac(1, red + white)], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal",
        `赤玉${red}個、白玉${white}個が入った袋から1個取り出す。赤玉が出る確率はどれか。`,
        choices, answer,
        explanation([
          `【公式】確率 ＝ 求めたい場合の数 ÷ 全体の場合の数`,
          `【計算】赤玉${red}個 ÷ 全体${red + white}個 ＝ ${correct}`,
          `【注意】分母は「袋の中の全体（赤${red}+白${white}＝${red + white}）」です。「赤だけの個数${red}」を分母にしないよう注意します。`,
          `【選択肢確認】「${frac(white, red + white)}」は白玉の確率、「${frac(red, white)}」は赤:白の比（確率ではない）です。`
        ]),
        "basic", "確率"));
    } else if (type === 1) {
      const n = 3 + (i % 4);
      const r = 2 + (i % 2);
      const perm = Array.from({ length: r }, (_, k) => n - k).reduce((a, b) => a * b, 1);
      const [choices, answer] = choiceSet(`${perm}通り`, [`${perm / n}通り`, `${perm + r}通り`, `${n * r}通り`], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal",
        `${n}人の中から${r}人を選んで一列に並べる並べ方は何通りか。`,
        choices, answer,
        explanation([
          `【考え方】選んで「並べる」ので、順序を区別する「順列」です。`,
          `【公式】nPr ＝ n × (n−1) × … × (n−r+1)　（n個からr個を取り出す順列）`,
          `【計算】${Array.from({ length: r }, (_, k) => n - k).join(" × ")} ＝ ${perm}通り`,
          `【区別ポイント】「並べる（順序あり）」→ 順列、「選ぶだけ（順序なし）」→ 組み合わせ`
        ]),
        "standard", "順列"));
    } else if (type === 2) {
      const total = 6 + (i % 5);
      const choose = 2 + (i % 2);
      let comb = 1;
      for (let k = 0; k < choose; k += 1) comb = comb * (total - k) / (k + 1);
      comb = Math.round(comb);
      const [choices, answer] = choiceSet(`${comb}通り`, [`${total * choose}通り`, `${comb - 1}通り`, `${total + choose}通り`], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal",
        `${total}人の中から${choose}人を選ぶ組み合わせは何通りか。`,
        choices, answer,
        explanation([
          `【考え方】選ぶだけで「並べない」ので、順序を区別しない「組み合わせ」です。`,
          `【公式】nCr ＝ nPr ÷ r! ＝ 順列 ÷ r人の並べ方`,
          `【計算】${total}C${choose} ＝ ${Array.from({ length: choose }, (_, k) => total - k).join(" × ")} ÷ ${Array.from({ length: choose }, (_, k) => k + 1).join(" × ")} ＝ ${comb}通り`,
          `【よくある誤り】「${total} × ${choose}＝${total * choose}」は各人を1番目・2番目と区別した場合で、組み合わせより多くなります。`
        ]),
        "standard", "組み合わせ"));
    } else {
      const eyes = i % 2 === 0 ? 6 : 4;
      const target = 1 + (i % (eyes - 1));
      const correct = frac(1, eyes);
      const [choices, answer] = choiceSet(correct, [frac(target, eyes), frac(2, eyes), frac(eyes - 1, eyes)], i);
      result.push(q(`npr-${String(i + 1).padStart(3, "0")}`, "nonverbal-probability", "nonverbal",
        `${eyes}面のサイコロを1回投げるとき、${target}の目が出る確率はどれか。`,
        choices, answer,
        explanation([
          `【考え方】${eyes}面サイコロでは各目が出る場合は1通りずつ、全体で${eyes}通りです。`,
          `【計算】${target}の目が出る確率 ＝ 1 ÷ ${eyes} ＝ ${correct}`,
          `【確認】全目の確率の和 ＝ ${eyes} × (1/${eyes}) ＝ 1（確率の和は必ず1になります）`,
          `【注意】「${frac(target, eyes)}」は${target}が出る確率ではなく、${target}通りある場合の割合です。`
        ]),
        "basic", "確率"));
    }
  }
  return result;
}

const logicPropositions = [
  {
    premise: "PならばQである。Qでないことが分かった。",
    choices: ["Pである", "Pでない", "Qである", "何も言えない"],
    answer: 1,
    exp: [
      "【考え方】「PならばQ」の対偶は「QでないならPでない」です。",
      "【解答】Qでないことが分かった → 対偶より Pでないことが確実です。",
      "【注意】「QならばP」（逆）は成り立つとは限りません。対偶だけが確実です。",
      "【覚え方】元の命題と「対偶」は真偽が一致。「逆」と「裏」は一致するとは限りません。"
    ]
  },
  {
    premise: "PならばQである。PならばRである。今Pであることが分かった。",
    choices: ["QかつRである", "QまたはRである", "Qのみである", "Rのみである"],
    answer: 0,
    exp: [
      "【考え方】Pが真ならば、2つの条件からQもRも必ず真です。",
      "【解答】P→Q（Qが真）かつ P→R（Rが真）なので、QとRの両方が成立します。",
      "【注意】「QまたはR」（どちらか一方）ではなく「QかつR」（両方）が正解です。",
      "【確認】「かつ」は両方が成立、「または」は少なくとも一方が成立、という意味です。"
    ]
  },
  {
    premise: "すべてのAはBである。すべてのBはCである。",
    choices: ["すべてのAはCである", "すべてのCはAである", "AはBでない場合がある", "CはBでない場合がある"],
    answer: 0,
    exp: [
      "【考え方】三段論法です。A⊆B かつ B⊆C ならば A⊆C が成り立ちます。",
      "【解答】AはB、BはCなので、AはCであることが確実に言えます。",
      "【注意】「すべてのCはAである」（逆）は確実ではありません。CにはAでないものが含まれる場合があります。",
      "【図で考える】AはBの内側、BはCの内側にあるイメージです。"
    ]
  },
  {
    premise: "PまたはQである。Pでないことが分かった。",
    choices: ["Qである", "Qでない", "PかつQである", "何も言えない"],
    answer: 0,
    exp: [
      "【考え方】「PまたはQ」は少なくとも一方が成り立つという意味です。",
      "【解答】Pが偽 → 残るQが必ず真でなければ「PまたはQ」が偽になってしまいます。",
      "【注意】「または」は「どちらか一方（あるいは両方）が真」を意味します。",
      "【確認】「PかつQ」ではなく、Pが偽なので成り立ちません。Qだけが確実です。"
    ]
  },
  {
    premise: "PならばQである。PならばRでない。今Rであることが分かった。",
    choices: ["Pである", "Pでない", "Qである", "Qでない"],
    answer: 1,
    exp: [
      "【考え方】「PならばRでない」の対偶は「RならばPでない」です。",
      "【解答】Rが真 → 対偶より Pでないことが確実です。",
      "【注意】PでないことはわかりますがQについては不明です。P→Qはわかっても、QはPがないと確定しません。",
      "【手順】①対偶を作る（PならばRでない → RならばPでない）②Rが真であることを当てはめる。"
    ]
  }
];

const logicOrders = [
  {
    premise: "AはBより背が高く、CはAより低い。",
    choices: ["BはCより高い", "AはCより高い", "CはBより高い", "Bが最も低い"],
    answer: 1,
    exp: [
      "【考え方】分かっている関係だけを整理します。C < A、A < B（Bより低いのがA）。",
      "【解答】C < A が確実なので「AはCより高い」は必ず言えます。",
      "【不確実な点】BとCの大小関係：C < A < B なら B > C ですが、BとAの差・AとCの差によっては順序が不明です。",
      "【注意】「確実に言えること」だけを選ぶのがポイントです。可能性ではなく確実性を問われています。"
    ]
  },
  {
    premise: "A、B、C、D、Eの5人が一列に並んでいる。AはBの隣にいる。CはDより前にいる。",
    choices: ["AはCより前である", "BはDより後ろである", "AとBは連続して並んでいる", "CとDは隣り合っている"],
    answer: 2,
    exp: [
      "【考え方】「隣にいる」という条件は、連続して並んでいることを意味します。",
      "【解答】AはBの隣 → AとBが連続していることは確実に言えます。",
      "【不確実な点】CとDは「CがDより前」ですが、「隣」とは限りません（間に他の人がいる可能性あり）。",
      "【注意】「前にいる」は順番が前であることだけを示し、「隣」とは異なります。"
    ]
  },
  {
    premise: "P、Q、Rの3人で試験を受けた。PはQより高得点。RはPより高得点ではなかった。",
    choices: ["Qが最も高い", "Pが最も低い", "RはQより高い", "Rが最も低いとは言えない"],
    answer: 3,
    exp: [
      "【考え方】分かっている関係：Q < P（PがQより高い）　R ≦ P（RはP以下）",
      "【解答】R ≦ P だが R と Q の大小は不明です。Rが最も低いとは確実には言えません（R = Pの可能性もあります）。",
      "【注意】「より高得点ではなかった」は「P以下」を意味します。「P未満」（Pより必ず低い）とは異なります。",
      "【確認】もしR > Q なら順序はQ < R ≦ P。R ≦ Q なら R ≦ Q < P。どちらもあり得ます。"
    ]
  },
  {
    premise: "1から5の番号カードがある。A、B、Cがそれぞれ1枚ずつ引いた。AはBより大きい番号。CはAと同じ番号ではない。",
    choices: ["BはCより小さい", "AはCより大きい", "CはBより大きい可能性がある", "AはBの2倍である"],
    answer: 2,
    exp: [
      "【確実な情報】B < A（AはBより大きい）、C ≠ A（CはAと異なる）",
      "【解答】CとBの大小は制約されていません。C > BもC < BもC = Bも可能です。「CはBより大きい可能性がある」は正しい。",
      "【不確実①】BとCの大小：不明（どちらが大きくても矛盾しない）",
      "【不確実②】AとCの大小：C ≠ Aだが、C > Aも C < Aもあり得ます。「AはCより大きい」は確実ではありません。"
    ]
  },
  {
    premise: "X、Y、Z、Wの4人の年齢を比べた。XはYより年上、ZはYより年下、WはXより年上である。",
    choices: ["WはZより年上である", "XはZより年下である", "YはWより年上である", "ZはWと同じ年齢の可能性がある"],
    answer: 0,
    exp: [
      "【整理】年齢の順番：Z < Y < X < W（順番にすべての不等号をつなぐ）",
      "【検証】Z < Y、Y < X（XはYより年上）、X < W（WはXより年上）を合わせると Z < Y < X < W",
      "【解答】W > X > Y > Z なので WはZより確実に年上です。",
      "【注意】この問題は4つの関係が連鎖しているため、まず不等号をすべて書き出して一本線にまとめることが重要です。"
    ]
  }
];

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
      const neither = total - union;
      const useNeither = (i % 2 === 0);
      const [choices, answer] = useNeither
        ? choiceSet(`${neither}人`, [`${total - a}人`, `${total - b}人`, `${union}人`], i)
        : choiceSet(`${union}人`, [`${a + b}人`, `${union - both}人`, `${total - union}人`], i);
      const prompt = useNeither
        ? `${total}人のうち、英語が得意な人は${a}人、数学が得意な人は${b}人、両方得意な人は${both}人である。どちらも得意でない人は何人か。`
        : `${total}人のうち、英語が得意な人は${a}人、数学が得意な人は${b}人、両方得意な人は${both}人である。少なくともどちらか一方が得意な人は何人か。`;
      const expLines = useNeither
        ? [
          `【図で整理】英語のみ：${a - both}人、数学のみ：${b - both}人、両方：${both}人　→　合計：${union}人`,
          `【計算】少なくともどちらか一方（和集合）：${a} + ${b} − ${both} ＝ ${union}人`,
          `【答え】どちらも得意でない：${total} − ${union} ＝ ${neither}人`,
          `【よくある誤り】「${a + b}人」は両方得意な人を二重にカウントした誤りです。必ず「両方」分を1回引きます。`
        ]
        : [
          `【公式】少なくともどちらか一方（和集合） ＝ A + B − 両方`,
          `【計算】${a} + ${b} − ${both} ＝ ${union}人`,
          `【なぜ引くか】${a}人と${b}人を足すと「両方得意な人${both}人」を2回数えてしまうからです。`,
          `【よくある誤り】「${a + b}人」は重複を除かない誤りです。`
        ];
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal",
        prompt, choices, answer, explanation(expLines), "standard", "集合"));
    } else if (type === 1) {
      const prop = logicPropositions[Math.floor(i / 3) % logicPropositions.length];
      const [choices, answer] = choiceSet(prop.choices[prop.answer], prop.choices.filter((_, idx) => idx !== prop.answer), i);
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal",
        `${prop.premise}\nこのとき確実に言えるものはどれか。`,
        choices, answer, explanation(prop.exp), "standard", "命題"));
    } else {
      const ord = logicOrders[Math.floor(i / 3) % logicOrders.length];
      const [choices, answer] = choiceSet(ord.choices[ord.answer], ord.choices.filter((_, idx) => idx !== ord.answer), i);
      result.push(q(`nl-${String(i + 1).padStart(3, "0")}`, "nonverbal-logic", "nonverbal",
        `${ord.premise}\nこのとき確実に言えるものはどれか。`,
        choices, answer, explanation(ord.exp), "basic", "順序"));
    }
  }
  return result;
}

function buildTable() {
  const result = [];
  // 加重平均の設定：整数になる組み合わせ [人数A, 人数B, 平均A, 平均B, 加重平均, 単純平均（罠）]
  const wAvgConfigs = [
    [30, 20, 60, 75, 66, 67.5],
    [20, 30, 65, 75, 71, 70],
    [30, 10, 62, 70, 64, 66],
    [25, 15, 60, 76, 66, 68],
    [40, 10, 60, 80, 64, 70]
  ];
  for (let i = 0; i < 70; i += 1) {
    const type = i % 4;
    if (type === 0) {
      // 加重平均（単純平均が罠）
      const cfg = wAvgConfigs[Math.floor(i / 4) % wAvgConfigs.length];
      const [na, nb, avgA, avgB, wAvg, simplAvg] = cfg;
      const label = ["男性", "女性"][i % 2 === 0 ? 0 : 1];
      const label2 = ["女性", "男性"][i % 2 === 0 ? 0 : 1];
      const [choices, answer] = choiceSet(`${wAvg}点`, [`${simplAvg}点`, `${wAvg + 2}点`, `${wAvg - 2}点`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal",
        `${label}${na}人の平均点が${avgA}点、${label2}${nb}人の平均点が${avgB}点だった。全員の平均点はどれか。`,
        choices, answer,
        explanation([
          `【考え方】人数が異なるので「加重平均」を使います。単純に(${avgA}+${avgB})÷2をしてはいけません。`,
          `【計算】全合計点：${na}×${avgA} + ${nb}×${avgB} ＝ ${na * avgA + nb * avgB}点`,
          `全員数：${na} + ${nb} ＝ ${na + nb}人`,
          `平均：${na * avgA + nb * avgB} ÷ ${na + nb} ＝ ${wAvg}点`,
          `【よくある誤り】「(${avgA}+${avgB})÷2＝${simplAvg}点」は人数を無視した単純平均で誤りです。`
        ]),
        "standard", "加重平均"));
    } else if (type === 1) {
      const last = 100 + (i % 8) * 10;
      const rate = [10, 20, 25, 30][i % 4];
      const now = last * (100 + rate) / 100;
      const [choices, answer] = choiceSet(`${rate}%`, [`${100 + rate}%`, `${rate - 5}%`, `${Math.round(now - last)}%`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal",
        `前年売上が${last}万円、今年売上が${now}万円だった。前年比の増加率はどれか。`,
        choices, answer,
        explanation([
          `【公式】増加率 ＝ (今年 − 前年) ÷ 前年 × 100`,
          `【計算】(${now} − ${last}) ÷ ${last} × 100 ＝ ${rate}%`,
          `【よくある誤り①】「${100 + rate}%」は今年が前年の${100 + rate}%という意味（前年比）で、増加率とは違います。`,
          `【よくある誤り②】今年の値${now}を分母にしないよう注意。分母は必ず「基準年（前年）」です。`
        ]),
        "standard", "資料読解"));
    } else if (type === 2) {
      const x = 12 + (i % 5) * 3;
      const y = 18 + (i % 5) * 3;
      const z = 24 + (i % 5) * 3;
      const total = x + y + z;
      const [choices, answer] = choiceSet(`${total}万円`, [`${total - x}万円`, `${total + x}万円`, `${Math.round(total / 3)}万円`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal",
        `A部門${x}万円、B部門${y}万円、C部門${z}万円の売上がある。3部門の合計はいくらか。`,
        choices, answer,
        explanation([
          `【計算】${x} + ${y} + ${z} ＝ ${total}万円`,
          `【確認】A+B+C ＝ ${x}+${y}+${z} ＝ ${total}万円`,
          `【注意】「${Math.round(total / 3)}万円」は平均値です。問題は合計を聞いています。`,
          `【時短】表や資料問題では「合計か平均か構成比か」を先に確認してから計算を始めます。`
        ]),
        "basic", "合計"));
    } else {
      const items = [40 + (i % 5) * 10, 60 + (i % 4) * 10, 50 + (i % 6) * 5];
      const total = items[0] + items[1] + items[2];
      const pct = Math.round(items[0] / total * 100);
      const pctB = Math.round(items[1] / total * 100);
      const [choices, answer] = choiceSet(`${pct}%`, [`${pct + 5}%`, `${pct - 5}%`, `${pctB}%`], i);
      result.push(q(`nt-${String(i + 1).padStart(3, "0")}`, "nonverbal-table", "nonverbal",
        `A商品${items[0]}個、B商品${items[1]}個、C商品${items[2]}個売れた。A商品の売上は全体の何%か（小数点以下四捨五入）。`,
        choices, answer,
        explanation([
          `【公式】構成比 ＝ 部分 ÷ 全体 × 100`,
          `【計算】全体：${items[0]}+${items[1]}+${items[2]} ＝ ${total}個`,
          `A商品の割合：${items[0]} ÷ ${total} × 100 ≈ ${pct}%`,
          `【注意】「${pctB}%」はB商品の構成比です。どの商品の割合を求めるか確認してから計算します。`
        ]),
        "standard", "構成比"));
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
