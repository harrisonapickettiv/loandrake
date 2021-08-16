# Loan Drake

Build an application that generates an amorization schedule for a simple interest loan.

---

## Description

The code is structured as several functions with a primary controller exported to the application.

## Hide Element

A function that takes an element id and hides that element from view.

## Show Element

A function that takes an element id and reveals that element to the user.

## Reset Display

A function that resets critical components of the display to ensure correct viewing by hiding the error and results elements.

## Display Error

A function that reveals an error message hidden from view. The message indicates that user must enter a Loan Amount, Loan Term, and Interest Rate.

## To Dollars

A function that takes a number and returns the a string of the number formatted as a US Dollar value.

## Get Values

A function that gets the value of "loanAmount", "loanTerm", and "loanInterest" from the user interface. Returns the values and whether they are valid input.

## Get Payment Details

A function that takes the monthly payment, loan rate, and remaining balance. Returns amounts paid to interest and principal, along with the remaining balance of the loan.

## Calculate Loan

A function that takes the total amount of the loan, the total months in the term, and the interest rate. Returns an array of details for each montly payment of the loan. Details include monthly payment amount, interest paid during period, principal paid during period, remaining balance after payment, and total interest paid to date.

## Make Table Rows

A function that takes an array of data and returns the data formatted as an HTML table row.

## Display Result

A function that takes a monthly payment schedule as an array, along with the amount of a loan. Formats and displays the monthly payment amount, loan principal, and total interest to be paid, along with the total cost of the loan. Calls makeTableRows to generate an HTML table of the payment schedule and displays it to the user.

## Loan Drake

The main application function. Calls getValues to get and validate user input. Then displays an error if getValues finds an error in input. Otherwise, calls calculateLoan followed by displayResult to generate and display a message to the user.
