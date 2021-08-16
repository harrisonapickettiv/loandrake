const hideElement = (element) => {
  element.setAttribute("hidden", true);
  element.setAttribute("aria-hidden", true);
};

const showElement = (element) => {
  element.removeAttribute("hidden");
  element.removeAttribute("aria-hidden");
};

const resetDisplay = () => {
  document.getElementById("resultTable").innerHTML = "";
  hideElement(document.getElementById("errorMsg"));
};

const displayError = () => {
  showElement(document.getElementById("errorMsg"));
};

const toDollars = (n) => {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getValues = () => {
  const amount = parseFloat(document.getElementById("loanAmount").value);
  const term = parseFloat(document.getElementById("loanTerm").value);
  const rate = parseFloat(document.getElementById("loanInterest").value);

  const error = isNaN(amount) || isNaN(term) || isNaN(rate);

  return { error, amount, term, rate };
};

const getPaymentDetails = (payment, rate, remBalance) => {
  const interest = remBalance * (rate / 1200);
  const principal = payment - interest;
  const balance = remBalance - principal;

  return {
    payment,
    interest,
    principal,
    balance,
  };
};

const calculateLoan = (amount, term, rate) => {
  const payment = (amount * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);
  let remainBalance = amount;
  let totalInterest = 0;

  const loanData = [];
  for (let month = 1; month <= term; month++) {
    const paymentDetails = getPaymentDetails(payment, rate, remainBalance);
    remainBalance = paymentDetails.balance;
    totalInterest += paymentDetails.interest;
    loanData.push({ ...paymentDetails, totalInterest, month });
  }

  return loanData;
};

const makeTableRows = (loanData) => {
  let html = "";
  for (const {
    month,
    payment,
    principal,
    interest,
    totalInterest,
    balance,
  } of loanData) {
    html += `
    <tr>
      <td>${month}</td>
      <td>${payment.toFixed(2)}</td>
      <td>${principal.toFixed(2)}</td>
      <td>${interest.toFixed(2)}</td>
      <td>${totalInterest.toFixed(2)}</td>
      <td>${balance.toFixed(2)}</td>
    </tr>
  `;
  }
  return html;
};

const displayResult = (loanData, totalPrincipal) => {
  const { totalInterest, payment: monthlyPayment } =
    loanData[loanData.length - 1];

  document.getElementById("payment").innerHTML = toDollars(monthlyPayment);
  document.getElementById("principal").innerHTML = toDollars(totalPrincipal);
  document.getElementById("interest").innerHTML = toDollars(totalInterest);
  document.getElementById("cost").innerHTML = toDollars(
    totalPrincipal + totalInterest
  );

  document.getElementById("resultTable").innerHTML = makeTableRows(loanData);

  showElement(document.getElementById("result"));
  hideElement(document.getElementById("instructions"));
};

const loanDrake = () => {
  resetDisplay();
  const { error, amount, term, rate } = getValues();
  if (error) return displayError();
  const loanData = calculateLoan(amount, term, rate);
  displayResult(loanData, amount);
};

export { loanDrake };
