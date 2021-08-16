import { loanDrake } from "./loanDrake";

document.getElementById("btnSubmit").onclick = (event) => {
  event.preventDefault();
  loanDrake();
};
