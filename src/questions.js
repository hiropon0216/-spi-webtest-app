export const chapters = [
  { id: "verbal-words", title: "言語：語句・意味理解", area: "verbal" },
  { id: "verbal-relations", title: "言語：二語関係", area: "verbal" },
  { id: "verbal-sentences", title: "言語：文の完成・並べ替え", area: "verbal" },
  { id: "nonverbal-rate", title: "非言語：割合・比・損益", area: "nonverbal" },
  { id: "nonverbal-speed", title: "非言語：速度・時間・仕事算", area: "nonverbal" },
  { id: "nonverbal-probability", title: "非言語：場合の数・確率", area: "nonverbal" },
  { id: "nonverbal-logic", title: "非言語：集合・推論", area: "nonverbal" },
  { id: "nonverbal-table", title: "非言語：表・資料読解", area: "nonverbal" }
];

export const questions = [
  {
    id: "vw-001",
    chapterId: "verbal-words",
    area: "verbal",
    prompt: "「周到」の意味として最も近いものを選びなさい。",
    choices: ["勢いがあること", "準備が行き届いていること", "すばやく判断すること", "考えが偏っていること"],
    answer: 1,
    explanation: "周到は、細かな点まで注意が行き届いている状態を表します。"
  },
  {
    id: "vw-002",
    chapterId: "verbal-words",
    area: "verbal",
    prompt: "「懐疑的」の意味として最も近いものを選びなさい。",
    choices: ["深く感謝している", "強く賛成している", "疑いを持っている", "急いで進めている"],
    answer: 2,
    explanation: "懐疑的は、物事をそのまま信じず疑いを持つ態度です。"
  },
  {
    id: "vw-003",
    chapterId: "verbal-words",
    area: "verbal",
    prompt: "「均衡」の意味として最も近いものを選びなさい。",
    choices: ["釣り合い", "不足", "優先", "拡大"],
    answer: 0,
    explanation: "均衡は、複数の力や量が釣り合っていることです。"
  },
  {
    id: "vr-001",
    chapterId: "verbal-relations",
    area: "verbal",
    prompt: "次の二語の関係と同じ関係になる組み合わせを選びなさい。\n\n医師：病院",
    choices: ["教師：学校", "魚：海", "時計：時間", "作家：小説"],
    answer: 0,
    explanation: "医師が働く場所が病院です。同じく教師が働く場所は学校です。"
  },
  {
    id: "vr-002",
    chapterId: "verbal-relations",
    area: "verbal",
    prompt: "次の二語の関係と同じ関係になる組み合わせを選びなさい。\n\n包丁：切る",
    choices: ["椅子：座る", "本：読む", "鍵：開ける", "花：咲く"],
    answer: 2,
    explanation: "包丁は切るための道具です。鍵は開けるための道具です。"
  },
  {
    id: "vr-003",
    chapterId: "verbal-relations",
    area: "verbal",
    prompt: "次の二語の関係と同じ関係になる組み合わせを選びなさい。\n\n春：季節",
    choices: ["月曜：曜日", "机：家具", "東京：日本", "米：主食"],
    answer: 0,
    explanation: "春は季節の一種です。月曜は曜日の一種です。"
  },
  {
    id: "vs-001",
    chapterId: "verbal-sentences",
    area: "verbal",
    prompt: "次の文の空欄に入る語として最も適切なものを選びなさい。\n\n新しい制度は、現場の負担を減らすことを目的としていたが、実際には手続きが増え、かえって業務を＿＿した。",
    choices: ["簡素化", "円滑化", "複雑化", "標準化"],
    answer: 2,
    explanation: "手続きが増えて負担が増した文脈なので、複雑化が適切です。"
  },
  {
    id: "vs-002",
    chapterId: "verbal-sentences",
    area: "verbal",
    prompt: "次の文を自然な順序に並べ替えたとき、最も適切なものを選びなさい。\n\nA そのため、事前の検証が欠かせない。\nB 新しい施策は効果が予測しにくい。\nC しかし、検証せずに導入すると現場に混乱を招く。\nD 効果が大きければ全社展開する価値がある。",
    choices: ["B-D-C-A", "D-B-A-C", "C-A-B-D", "B-C-D-A"],
    answer: 0,
    explanation: "施策の予測困難性を述べ、価値を認めたうえで、検証なし導入のリスクと結論につなげます。"
  },
  {
    id: "vs-003",
    chapterId: "verbal-sentences",
    area: "verbal",
    prompt: "空欄に入る語として最も適切なものを選びなさい。\n\n短期的な成果だけを追うと、長期的な信頼を＿＿おそれがある。",
    choices: ["補う", "損なう", "高める", "定める"],
    answer: 1,
    explanation: "短期成果偏重の悪影響として、信頼を損なうが自然です。"
  },
  {
    id: "nr-001",
    chapterId: "nonverbal-rate",
    area: "nonverbal",
    prompt: "定価の20%引きで売ったところ、売値は2400円だった。定価はいくらか。",
    choices: ["2800円", "3000円", "3200円", "3600円"],
    answer: 1,
    explanation: "20%引きは定価の80%。2400 ÷ 0.8 = 3000円です。"
  },
  {
    id: "nr-002",
    chapterId: "nonverbal-rate",
    area: "nonverbal",
    prompt: "ある商品を原価800円で仕入れ、25%の利益を見込んで定価をつけた。定価はいくらか。",
    choices: ["900円", "1000円", "1040円", "1200円"],
    answer: 1,
    explanation: "利益は原価の25%。800 × 1.25 = 1000円です。"
  },
  {
    id: "nr-003",
    chapterId: "nonverbal-rate",
    area: "nonverbal",
    prompt: "A:B = 3:5、B:C = 2:7 のとき、A:C を最も簡単な整数比で表しなさい。",
    choices: ["3:7", "6:35", "5:21", "7:15"],
    answer: 1,
    explanation: "Bをそろえるため、A:B=6:10、B:C=10:35。よってA:C=6:35です。"
  },
  {
    id: "ns-001",
    chapterId: "nonverbal-speed",
    area: "nonverbal",
    prompt: "時速60kmで走る車が90km進むのにかかる時間はどれか。",
    choices: ["1時間", "1時間15分", "1時間30分", "2時間"],
    answer: 2,
    explanation: "時間 = 距離 ÷ 速さ。90 ÷ 60 = 1.5時間 = 1時間30分です。"
  },
  {
    id: "ns-002",
    chapterId: "nonverbal-speed",
    area: "nonverbal",
    prompt: "Aさんが1人で行うと12日、Bさんが1人で行うと6日かかる仕事がある。2人で行うと何日かかるか。",
    choices: ["3日", "4日", "5日", "6日"],
    answer: 1,
    explanation: "1日の仕事量はAが1/12、Bが1/6。合計1/4なので4日です。"
  },
  {
    id: "ns-003",
    chapterId: "nonverbal-speed",
    area: "nonverbal",
    prompt: "分速80mで歩く人が、2.4km進むのにかかる時間はどれか。",
    choices: ["20分", "24分", "30分", "36分"],
    answer: 2,
    explanation: "2.4km=2400m。2400 ÷ 80 = 30分です。"
  },
  {
    id: "np-001",
    chapterId: "nonverbal-probability",
    area: "nonverbal",
    prompt: "赤玉3個、白玉2個が入った袋から1個取り出す。赤玉が出る確率はどれか。",
    choices: ["1/5", "2/5", "3/5", "3/2"],
    answer: 2,
    explanation: "全体5個のうち赤玉は3個なので、確率は3/5です。"
  },
  {
    id: "np-002",
    chapterId: "nonverbal-probability",
    area: "nonverbal",
    prompt: "A、B、C、Dの4人を一列に並べる並べ方は何通りか。",
    choices: ["8通り", "12通り", "16通り", "24通り"],
    answer: 3,
    explanation: "4人の並べ方は4! = 4×3×2×1 = 24通りです。"
  },
  {
    id: "np-003",
    chapterId: "nonverbal-probability",
    area: "nonverbal",
    prompt: "1から6までの数字が書かれたカードから1枚選ぶ。偶数が出る確率はどれか。",
    choices: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanation: "偶数は2,4,6の3枚。全体6枚なので3/6=1/2です。"
  },
  {
    id: "nl-001",
    chapterId: "nonverbal-logic",
    area: "nonverbal",
    prompt: "A、B、Cの3人がいる。AはBより背が高く、CはAより背が低い。このとき確実に言えるものはどれか。",
    choices: ["BはCより背が高い", "AはCより背が高い", "CはBより背が高い", "Bは最も背が低い"],
    answer: 1,
    explanation: "CはAより低いので、AはCより高いことが確実です。BとCの関係は不明です。"
  },
  {
    id: "nl-002",
    chapterId: "nonverbal-logic",
    area: "nonverbal",
    prompt: "30人のうち、英語が得意な人は18人、数学が得意な人は15人、両方得意な人は8人である。少なくともどちらか一方が得意な人は何人か。",
    choices: ["17人", "23人", "25人", "33人"],
    answer: 2,
    explanation: "和集合は18 + 15 - 8 = 25人です。"
  },
  {
    id: "nl-003",
    chapterId: "nonverbal-logic",
    area: "nonverbal",
    prompt: "PならばQである。Qでないことが分かった。このとき確実に言えるものはどれか。",
    choices: ["Pである", "Pでない", "Qである", "何も言えない"],
    answer: 1,
    explanation: "PならばQの対偶は、QでないならPでない、です。"
  },
  {
    id: "nt-001",
    chapterId: "nonverbal-table",
    area: "nonverbal",
    prompt: "ある店の月曜から水曜の売上は、月曜12万円、火曜15万円、水曜18万円だった。3日間の平均売上はいくらか。",
    choices: ["14万円", "15万円", "16万円", "18万円"],
    answer: 1,
    explanation: "(12+15+18) ÷ 3 = 15万円です。"
  },
  {
    id: "nt-002",
    chapterId: "nonverbal-table",
    area: "nonverbal",
    prompt: "A店の売上は前年100万円、今年125万円だった。前年比の増加率はどれか。",
    choices: ["20%", "25%", "30%", "125%"],
    answer: 1,
    explanation: "増加分は25万円。25 ÷ 100 = 25%です。"
  },
  {
    id: "nt-003",
    chapterId: "nonverbal-table",
    area: "nonverbal",
    prompt: "4日間の来店者数が、80人、90人、110人、120人だった。合計は何人か。",
    choices: ["300人", "360人", "400人", "420人"],
    answer: 2,
    explanation: "80+90+110+120 = 400人です。"
  }
];
