// 初期化
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

// 質問
const questions = [
  {
    text: "休日はどう過ごしたい？",
    choices: [
      { text: "とにかく動く", type: "T" },
      { text: "仲間と遊ぶ", type: "TR" },
      { text: "静かに過ごす", type: "P" },
      { text: "自由に動く", type: "S" }
    ]
  }
  // ←あと9問追加OK
];

// 結果データ
const resultsData = {
  T:{name:"ティラノサウルス",desc:"最強リーダー",img:"images/trex.png"},
  TR:{name:"トリケラトプス",desc:"守護タイプ",img:"images/triceratops.png"},
  V:{name:"ヴェロキラプトル",desc:"俊敏タイプ",img:"images/raptor.png"},
  B:{name:"ブラキオサウルス",desc:"温厚タイプ",img:"images/brachio.png"},
  S:{name:"ステゴサウルス",desc:"個性派",img:"images/stego.png"},
  A:{name:"アンキロサウルス",desc:"防御型",img:"images/ankylo.png"},
  SP:{name:"スピノサウルス",desc:"挑戦者",img:"images/spino.png"},
  P:{name:"パラサウロロフス",desc:"知性型",img:"images/parasauro.png"},
  Z:{name:"ザヴァケファレ",desc:"未知型",img:"images/zavake.png"},
  PI:{name:"ピナコサウルス",desc:"堅実型",img:"images/pinaco.png"}
};

let current = 0;
let scores = { T:0, TR:0, V:0, B:0, S:0, A:0, SP:0, P:0, Z:0, PI:0 };

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => scores[choice.type]++;
    choicesEl.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) showQuestion();
  else showResult();
};

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

function generateQR(text) {
  const canvas = document.getElementById("qr");
  QRCode.toCanvas(canvas, text);
}

function setupShare(name) {
  const url = "https://あなたのURL";
  const text = `私は${name}タイプでした！ #恐竜診断`;

  document.getElementById("twitterBtn").href =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  document.getElementById("lineBtn").href =
    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
}

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

showQuestion();