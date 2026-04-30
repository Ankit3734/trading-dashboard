function calc() {
    let b = document.getElementById('bal').value;
    let r = document.getElementById('rsk').value;
    let s = document.getElementById('sl').value;
    if(b && r && s) {
        let lot = (b * (r/100)) / (s * 10);
        document.getElementById('res').innerText = "LOT: " + lot.toFixed(2);
    }
}
function saveTrade() {
    let p = document.getElementById('pair').value;
    let n = document.getElementById('note').value;
    if(p && n) {
        let entry = `<p style="border-bottom: 1px solid #222; padding: 5px;"><b>${p}:</b> ${n}</p>`;
        document.getElementById('history').innerHTML += entry;
    }
}