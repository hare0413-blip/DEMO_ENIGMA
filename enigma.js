/***********************
 * 文字集合（48文字）
 * 清音46 + 濁点 + 半濁点
 ***********************/
const A =
  "あいうえお" +
  "かきくけこ" +
  "さしすせそ" +
  "たちつてと" +
  "なにぬねの" +
  "はひふへほ" +
  "まみむめも" +
  "やゆよ" +
  "らりるれろ" +
  "わをん" +
  "゛゜";

const N = A.length;

/***********************
 * ひらがなローター
 ***********************/
const R1 = "そてまひらけこあよつにをほもさぬむえなうりちれゆいのふせろやはきかすわとん゛゜";
const R2 = "ぬをけやすそえみはにまよさつあらひこてちせなうとほりのんもむきふいれゆかろわしへたお゛゜";
const R3 = "りえさこふつもわてのあむへしゆにきほとんはよろぬいかたせけまみそらうちれおやなす゛゜";

/***********************
 * リフレクタ（対称）
 ***********************/
const REF = A.split("").reverse().join("");

/***********************
 * 逆ローター生成
 ***********************/
function invert(r) {
  const inv = Array(N);
  for (let i = 0; i < N; i++) {
    inv[A.indexOf(r[i])] = A[i];
  }
  return inv.join("");
}

const R1I = invert(R1);
const R2I = invert(R2);
const R3I = invert(R3);

/***********************
 * ローター通過
 ***********************/
function f(c, r, p) {
  const i = (A.indexOf(c) + p) % N;
  const w = r[i];
  return A[(A.indexOf(w) - p + N) % N];
}

function b(c, rI, p) {
  const i = (A.indexOf(c) + p) % N;
  const w = rI[i];
  return A[(A.indexOf(w) - p + N) % N];
}

/***********************
 * 1文字暗号化
 ***********************/
function encChar(c, p1, p2, p3) {
  if (!A.includes(c)) return c;

  let x = c;
  x = f(x, R1, p1);
  x = f(x, R2, p2);
  x = f(x, R3, p3);
  x = REF[A.indexOf(x)];
  x = b(x, R3I, p3);
  x = b(x, R2I, p2);
  x = b(x, R1I, p1);
  return x;
}

/***********************
 * 正規化（濁点・半濁点・拗音）
 ***********************/
function normalizeJapanese(text) {
  return text
    // 濁点
    .replace(/が/g, "か゛").replace(/ぎ/g, "き゛").replace(/ぐ/g, "く゛")
    .replace(/げ/g, "け゛").replace(/ご/g, "こ゛")
    .replace(/ざ/g, "さ゛").replace(/じ/g, "し゛").replace(/ず/g, "す゛")
    .replace(/ぜ/g, "せ゛").replace(/ぞ/g, "そ゛")
    .replace(/だ/g, "た゛").replace(/ぢ/g, "ち゛").replace(/づ/g, "つ゛")
    .replace(/で/g, "て゛").replace(/ど/g, "と゛")
    .replace(/ば/g, "は゛").replace(/び/g, "ひ゛").replace(/ぶ/g, "ふ゛")
    .replace(/べ/g, "へ゛").replace(/ぼ/g, "ほ゛")
    // 半濁点
    .replace(/ぱ/g, "は゜").replace(/ぴ/g, "ひ゜").replace(/ぷ/g, "ふ゜")
    .replace(/ぺ/g, "へ゜").replace(/ぽ/g, "ほ゜")
    // 拗音（★重要：必ず分解）
    .replace(/きゃ/g, "きや").replace(/きゅ/g, "きゆ").replace(/きょ/g, "きよ")
    .replace(/しゃ/g, "しや").replace(/しゅ/g, "しゆ").replace(/しょ/g, "しよ")
    .replace(/ちゃ/g, "ちや").replace(/ちゅ/g, "ちゆ").replace(/ちょ/g, "ちよ")
    .replace(/にゃ/g, "にや").replace(/にゅ/g, "にゆ").replace(/にょ/g, "によ")
    .replace(/ひゃ/g, "ひや").replace(/ひゅ/g, "ひゆ").replace(/ひょ/g, "ひよ")
    .replace(/みゃ/g, "みや").replace(/みゅ/g, "みゆ").replace(/みょ/g, "みよ")
    .replace(/りゃ/g, "りや").replace(/りゅ/g, "りゆ").replace(/りょ/g, "りよ");
}


/***********************
 * 再合成
 ***********************/
function denormalizeJapanese(text) {
  return text
    .replace(/か゛/g, "が").replace(/き゛/g, "ぎ").replace(/く゛/g, "ぐ")
    .replace(/け゛/g, "げ").replace(/こ゛/g, "ご")
    .replace(/さ゛/g, "ざ").replace(/し゛/g, "じ").replace(/す゛/g, "ず")
    .replace(/せ゛/g, "ぜ").replace(/そ゛/g, "ぞ")
    .replace(/た゛/g, "だ").replace(/ち゛/g, "ぢ").replace(/つ゛/g, "づ")
    .replace(/て゛/g, "で").replace(/と゛/g, "ど")
    .replace(/は゛/g, "ば").replace(/ひ゛/g, "び").replace(/ふ゛/g, "ぶ")
    .replace(/へ゛/g, "べ").replace(/ほ゛/g, "ぼ")
    .replace(/は゜/g, "ぱ").replace(/ひ゜/g, "ぴ").replace(/ふ゜/g, "ぷ")
    .replace(/へ゜/g, "ぺ").replace(/ほ゜/g, "ぽ")
    // 拗音復元
    .replace(/しや/g, "しゃ").replace(/しゆ/g, "しゅ").replace(/しよ/g, "しょ")
    .replace(/ちや/g, "ちゃ").replace(/ちゆ/g, "ちゅ").replace(/ちよ/g, "ちょ")
    .replace(/にや/g, "にゃ").replace(/にゆ/g, "にゅ").replace(/によ/g, "にょ")
    .replace(/ひや/g, "ひゃ").replace(/ひゆ/g, "ひゅ").replace(/ひよ/g, "ひょ")
    .replace(/みや/g, "みゃ").replace(/みゆ/g, "みゅ").replace(/みよ/g, "みょ")
    .replace(/りや/g, "りゃ").replace(/りゆ/g, "りゅ").replace(/りよ/g, "りょ");
}

/***********************
 * 実行
 ***********************/
function runEnigma() {
  const raw = document.getElementById("inputText").value;
  const text = normalizeJapanese(raw);

  let p1 = A.indexOf(document.getElementById("pos1").value);
  let p2 = A.indexOf(document.getElementById("pos2").value);
  let p3 = A.indexOf(document.getElementById("pos3").value);

  if (p1 < 0) p1 = 0;
  if (p2 < 0) p2 = 0;
  if (p3 < 0) p3 = 0;

  let out = "";
  for (const c of text) {
    out += encChar(c, p1, p2, p3);
    if (A.includes(c)) {
      p1 = (p1 + 1) % N;
      if (p1 === 0) p2 = (p2 + 1) % N;
      if (p1 === 0 && p2 === 0) p3 = (p3 + 1) % N;
    }
  }

  document.getElementById("output").textContent =
    denormalizeJapanese(out);
}
