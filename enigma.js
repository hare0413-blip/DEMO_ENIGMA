/***********************
 * 文字集合
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
 * ローター
 ***********************/
const R1 = "そてまひらけこあよつにをほもさぬむえなうりちれゆいのふせろやはきかすわとん゛゜";
const R2 = "ぬをけやすそえみはにまよさつあらひこてちせなうとほりのんもむきふいれゆかろわしへたお゛゜";
const R3 = "りえさこふつもわてのあむへしゆにきほとんはよろぬいかたせけまみそらうちれおやなす゛゜";

/***********************
 * リフレクタ（完全対称）
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
function forward(c, r, p) {
  const i = (A.indexOf(c) + p) % N;
  const w = r[i];
  return A[(A.indexOf(w) - p + N) % N];
}

function backward(c, rI, p) {
  const i = (A.indexOf(c) + p) % N;
  const w = rI[i];
  return A[(A.indexOf(w) - p + N) % N];
}

/***********************
 * 1文字 Enigma
 ***********************/
function encChar(c, p1, p2, p3) {
  if (!A.includes(c)) return c;

  let x = c;
  x = forward(x, R1, p1);
  x = forward(x, R2, p2);
  x = forward(x, R3, p3);
  x = REF[A.indexOf(x)];
  x = backward(x, R3I, p3);
  x = backward(x, R2I, p2);
  x = backward(x, R1I, p1);
  return x;
}

/***********************
 * 正規化（濁点・半濁点のみ）
 * ※ 拗音は扱わない
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
    .replace(/ぺ/g, "へ゜").replace(/ぽ/g, "ほ゜");
}

/***********************
 * 表示用（濁点・半濁点のみ復元）
 ***********************/
function displayJapanese(text) {
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
    .replace(/へ゜/g, "ぺ").replace(/ほ゜/g, "ぽ");
}

/***********************
 * 実行
 ***********************/
function runEnigma() {
  const raw = document.getElementById("inputText").value;

  // ① 正規化（内部用）
  const text = normalizeJapanese(raw);

  let p1 = A.indexOf(document.getElementById("pos1").value);
  let p2 = A.indexOf(document.getElementById("pos2").value);
  let p3 = A.indexOf(document.getElementById("pos3").value);

  if (p1 < 0) p1 = 0;
  if (p2 < 0) p2 = 0;
  if (p3 < 0) p3 = 0;

  // ② Enigma
  let cipher = "";
  for (const c of text) {
    cipher += encChar(c, p1, p2, p3);
    if (A.includes(c)) {
      p1 = (p1 + 1) % N;
      if (p1 === 0) p2 = (p2 + 1) % N;
      if (p1 === 0 && p2 === 0) p3 = (p3 + 1) % N;
    }
  }

  // ③ 出力
  document.getElementById("normalized").textContent = cipher;
  document.getElementById("output").textContent =
    displayJapanese(cipher);
}
