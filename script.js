let currentAccountId = null;

// ADD ACCOUNT
function addAccount() {
  let name = document.getElementById("accountName").value;

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  let newAccount = {
    id: Date.now(),
    name: name
  };

  accounts.push(newAccount);

  localStorage.setItem("accounts", JSON.stringify(accounts));

  loadAccounts();
}

// LOAD ACCOUNTS
function loadAccounts() {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  let select = document.getElementById("accountSelect");
  select.innerHTML = "";

  accounts.forEach(acc => {
    select.innerHTML += `<option value="${acc.id}">${acc.name}</option>`;
  });

  if (accounts.length > 0) {
    currentAccountId = accounts[0].id;
    loadTrades();
  }
}

// SWITCH ACCOUNT
function switchAccount(id) {
  currentAccountId = Number(id);
  loadTrades();
}

// SAVE TRADE
function saveTrade() {
  let trades = JSON.parse(localStorage.getItem("trades")) || [];

  let entry = +document.getElementById("entry").value;
  let exit = +document.getElementById("exit").value;
  let qty = +document.getElementById("qty").value;
  let direction = document.getElementById("direction").value;
  let fees = +document.getElementById("fees").value;

  let pnl;

  if (direction === "long") {
    pnl = (exit - entry) * qty;
  } else {
    pnl = (entry - exit) * qty;
  }

  let trade = {
    accountId: currentAccountId,
    symbol: document.getElementById("symbol").value,
    pnl: pnl - fees
  };

  trades.push(trade);

  localStorage.setItem("trades", JSON.stringify(trades));

  loadTrades();
}

// LOAD TRADES (ACCOUNT WISE)
function loadTrades() {
  let trades = JSON.parse(localStorage.getItem("trades")) || [];

  let filtered = trades.filter(t => t.accountId === currentAccountId);

  let container = document.getElementById("history");
  container.innerHTML = "";

  filtered.forEach(t => {
    container.innerHTML += `
      <div>${t.symbol} | ${t.pnl}$</div>
    `;
  });
}

// INIT
loadAccounts();