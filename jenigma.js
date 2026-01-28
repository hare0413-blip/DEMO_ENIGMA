const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const R1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const R2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const R3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
const REF = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

function invert(r){
  const inv = Array(26);
  for(let i=0;i<26;i++) inv[A.indexOf(r[i])] = A[i];
  return inv.join("");
}
const R1I = invert(R1), R2I = invert(R2), R3I = invert(R3);

function f(c, r, p){
  const i = (A.indexOf(c) + p) % 26;
  const w = r[i];
  return A[(A.indexOf(w) - p + 26) % 26];
}
function b(c, rI, p){
  const i = (A.indexOf(c) + p) % 26;
  const w = rI[i];
  return A[(A.indexOf(w) - p + 26) % 26];
}

function encChar(c, p1, p2, p3){
  if(!A.includes(c)) return c; // 記号・スペースは通す
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

function runEnigma(){
  const text = document.getElementById("inputText").value.toUpperCase();
  let p1 = A.indexOf(document.getElementById("pos1").value.toUpperCase());
  let p2 = A.indexOf(document.getElementById("pos2").value.toUpperCase());
  let p3 = A.indexOf(document.getElementById("pos3").value.toUpperCase());
  if(p1<0)p1=0; if(p2<0)p2=0; if(p3<0)p3=0;

  let out = "";
  for(const c of text){
    out += encChar(c, p1, p2, p3);
    if(A.includes(c)){
      p1 = (p1 + 1) % 26;
      if(p1===0) p2 = (p2 + 1) % 26;
      if(p1===0 && p2===0) p3 = (p3 + 1) % 26;
    }
  }
  document.getElementById("output").textContent = out;
}
