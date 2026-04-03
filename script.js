// =====================
// 初期化（統計）
// =====================
function initStats() {
  if (!localStorage.getItem("dinoStats")) {
    const initial = {
      T:0, TR:0, V:0, B:0, S:0,
      A:0, SP:0, P:0, Z:0, PI:0,
      total:0
    };
    localStorage.setItem("dinoStats", JSON.stringify(initial));
  }
}
initStats();

// =====================
// 質問（10問）
// =====================
const questions = [
  {
    text: "休日はどう過ごしたい？",
    choices: [
      { text: "とにかく動く", type: "T" },
      { text: "仲間と遊ぶ", type: "TR" },
      { text: "静かに過ごす", type: "P" },
      { text: "自由に動く", type: "S" }
    ]
  },
  {
    text: "あなたの強みは？",
    choices: [
      { text: "パワー", type: "T" },
      { text: "協調性", type: "TR" },
      { text: "頭脳", type: "P" },
      { text: "柔軟さ", type: "SP" }
    ]
  },
  {
    text: "困難に直面したら？",
    choices: [
      { text: "突破する", type: "T" },
      { text: "助け合う", type: "B" },
      { text: "考える", type: "P" },
      { text: "流れに任せる", type: "S" }
    ]
  },
  {
    text: "好きな環境は？",
    choices: [
      { text: "競争がある", type: "V" },
      { text: "安心できる", type: "B" },
      { text: "静か", type: "P" },
      { text: "変化がある", type: "SP" }
    ]
  },
  {
    text: "集団での役割は？",
    choices: [
      { text: "リーダー", type: "T" },
      { text: "支える", type: "TR" },
      { text: "分析", type: "P" },
      { text: "自由", type: "S" }
    ]
  },
  {
    text: "新しい環境では？",
    choices: [
      { text: "すぐ主導", type: "T" },
      { text: "仲良くする", type: "B" },
      { text: "様子を見る", type: "PI" },
      { text: "楽しむ", type: "SP" }
    ]
  },
  {
    text: "あなたの性格は？",
    choices: [
      { text: "強気", type: "T" },
      { text: "優しい", type: "B" },
      { text: "冷静", type: "P" },
      { text: "個性的", type: "Z" }
    ]
  },
  {
    text: "危険に直面したら？",
    choices: [
      { text: "戦う", type: "T" },
      { text: "守る", type: "A" },
      { text: "逃げる", type: "S" },
      { text: "考える", type: "P" }
    ]
  },
  {
    text: "目標への向かい方は？",
    choices: [
      { text: "一直線", type: "T" },
      { text: "仲間と", type: "TR" },
      { text: "計画的", type: "PI" },
      { text: "柔軟", type: "SP" }
    ]
  },
  {
    text: "自分を一言で言うと？",
    choices: [
      { text: "最強", type: "T" },
      { text: "守護者", type: "A" },
      { text: "知性派", type: "P" },
      { text: "未知", type: "Z" }
    ]
  }
];

// =====================
// 結果データ（10種）
// =====================
const resultsData = {
  T:{name:"ティラノサウルス",desc:"最強リーダー",img:"images/trex.png"},
  TR:{name:"トリケラトプス",desc:"仲間を守る",img:"images/triceratops.png"},
  V:{name:"ヴェロキラプトル",desc:"俊敏な戦略家",img:"images/raptor.png"},
  B:{name:"ブラキオサウルス",desc:"優しい巨人",img:"images/brachio.png"},
  S:{name:"ステゴサウルス",desc:"個性派",img:"images/stego.png"},
  A:{name:"アンキロサウルス",desc:"鉄壁の防御",img:"images/ankylo.png"},
  SP:{name:"スピノサウルス",desc:"挑戦者",img:"images/spino.png"},
  P:{name:"パラサウロロフス",desc:"知性派",img:"images/parasauro.png"},
  Z:{name:"ザヴァケファレ",desc:"未知の存在",img:"images/zavake.png"},
  PI:{name:"ピナコサウルス",desc:"堅実タイプ",img:"images/pinaco.png"}
};

// =====================
let current = 0;
let selectedType = null;
let scores = { T:0, TR:0, V:0, B:0, S:0, A:0, SP:0, P:0, Z:0, PI:0 };

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

// =====================
// 質問表示
// =====================
function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  choicesEl.innerHTML = "";
  selectedType = null;

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      document.querySelectorAll("#choices button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
      selectedType = choice.type;
    };

    choicesEl.appendChild(btn);
  });
}

// =====================
// 次へボタン
// =====================
nextBtn.onclick = () => {
  if (!selectedType) {
    alert("選択してください！");
    return;
  }

  scores[selectedType]++;
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

// =====================
// 統計
// =====================
function updateStats(type) {
  const stats = JSON.parse(localStorage.getItem("dinoStats"));
  stats[type]++;
  stats.total++;
  localStorage.setItem("dinoStats", JSON.stringify(stats));
}

function getPercentage(type) {
  const stats = JSON.parse(localStorage.getItem("dinoStats"));
  return stats.total === 0 ? 0 : Math.round((stats[type]/stats.total)*100);
}

// =====================
// QR
// =====================
function generateQR(text) {
  const canvas = document.getElementById("qr");
  QRCode.toCanvas(canvas, text);
}

// =====================
// SNS
// =====================
function setupShare(name) {
  const url = "https://itohiroki0224.github.io/dinosaur-test/";
  const text = `私は${name}タイプでした！ #恐竜診断`;

  document.getElementById("twitterBtn").href =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  document.getElementById("lineBtn").href =
    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
}

// =====================
// 結果表示
// =====================
function showResult() {
  const maxType = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);

  updateStats(maxType);
  const percent = getPercentage(maxType);
  const result = resultsData[maxType];

  resultEl.innerHTML = `
    <h2>${result.name}</h2>
    <img src="${result.img}" class="result-img">
    <p>${result.desc}</p>
    <p class="percent">全体の ${percent}%</p>

    <canvas id="qr"></canvas>

    <div class="share">
      <a id="twitterBtn" target="_blank">Xでシェア</a>
      <a id="lineBtn" target="_blank">LINEで送る</a>
    </div>
  `;

  setupShare(result.name);
  generateQR(result.name);
  resultEl.classList.remove("hidden");
}

// =====================
showQuestion();
