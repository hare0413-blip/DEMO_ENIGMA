const A = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

const R1 = "そてまひらけこあよつにをほもさぬむえなうりちれゆいのふせろやはきかすわとん";
const R2 = "ぬをけやすそえみはにまよさつあらひこてちせなうとほりのんもむきふいれゆかろわしへたお";
const R3 = "りえさこふつもわてのあむへしゆにきほとんはよろぬいかたせけまみそらうちれおやなす";
const REF = A.split("").reverse().join("");

const N = A.length;

function invert(r){
  const inv = Array(N);
  for(let i=0;i<N;i++) inv[A.indexOf(r[i])] = A[i];
  return inv.join("");
}
const R1I = invert(R1), R2I = invert(R2), R3I = invert(R3);

function f(c, r, p){
  const i = (A.indexOf(c) + p) % N;
  const w = r[i];
  return A[(A.indexOf(w) - p + N) % N];
}
function b(c, rI, p){
  const i = (A.indexOf(c) + p) % N;
  const w = rI[i];
  return A[(A.indexOf(w) - p + N) % N];
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
