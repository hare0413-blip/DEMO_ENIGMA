console.log("enigma.js loaded");

// アルファベット
const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ローター
const R1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const R2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const R3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
const REF = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// --------------------
// 逆配線
// --------------------
function inv(r) {
  let x = Array(26);
  for (let i = 0; i < 26; i++) {
    x[A.indexOf(r[i])] = A[i];
  }
  return x.join("");
}

const R1I = inv(R1);
const R2I = inv(R2);
const R3I = inv(R3);

// --------------------
// ローター通過
// --------------------
function f(c, r, p) {
  let i = (A.indexOf(c) + p) % 26;
  let w = r[i];
  return A[(A.indexOf(w) - p + 26) % 26];
}

function b(c, r, p) {
  let i = (A.indexOf(c) + p) % 26;
  let w = r[i];
  return A[(A.indexOf(w) - p + 26) % 26];
}

// --------------------
// 1文字暗号化
// --------------------
function encChar(c, p1, p2, p3) {
  if (!A.includes(c)) return c;

  c = f(c, R1, p1);
  c = f(c, R2, p2);
  c = f(c, R3, p3);
  c = REF[A.indexOf(c)];
  c = b(c, R3I, p3);
  c = b(c, R2I, p2);
  c = b(c, R1I, p1);

  return c;
}

// --------------------
// 実行
// --------------------
function runEnigma() {
  const text = document.getElementById("inputText").value.toUpperCase();
