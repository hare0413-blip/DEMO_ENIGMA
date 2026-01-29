/***********************
 * 文字集合（清音46）
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
  "わをん";

const N = A.length; // 46

/***********************
 * ローター（46文字対応）
 ***********************/
const R1 = "ほらひいをせなねもれちやすけたのりゆまろえふさわにこみきうとへおそあめぬかよむしつはてくんる";
const R2 = "れひすよをまおにらえほけいせのわちりてあふとやるそかぬもねみうへろさきむたこゆはめしつんくほ";
const R3 = "れひそさつらをおいえにゆけちのましふとあほりもやくねすこみはなへるたよぬむめかうわんせろきて";

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
  if (!A.includes(c)) return c; // 記号・スペースは通す

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
 * 実行
 ***********************/
function runEnigma() {
  const text = document.getElementById("inputText").value;

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

  document.getElementById("output").textContent = out;
}
