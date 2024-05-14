#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";


console.log(chalk.blueBright.underline.bold(`Welcome to my Student Management System`));

//Generatinga a 5-digit unique ID for each student
const generateId: number = Math.floor(100000 * Math.random());

//Setting Student Balance
let studentBalance: number = 0;


//List of Courses
enum courses{
  webDevelopment = "Web Development",
  gfx = "Graphic Designing",
  videoEditing = "Video Editing",
  AI = "Artificial Intelligence",
}

//List of Payment Types
enum paymentType {
  easypaisa = "Easy Paisa",
  jazzcash = "Jazz Cash",
  sadapay = "Sada Pay",
  banktransfer = "Bank Transfer",
}

//list of user's choice
enum status_exit {
    viewstatus = "View Status",
    exit = "Exit"
}

//Taking User Input
let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: chalk.greenBright("Enter student name: "),
    validate: function validateInput(value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty name";
    },
  },
  {
    name: "course",
    type: "list",
    message: chalk.greenBright("Pleae Select a course to be enrolled:"),
    choices: Object.values(courses),
  },
]);

//Defining Tuition Fee for each course
const tuitionFee: { [key: string]: number } = {
  "Web Development": 3000,
  "Graphic Designing": 6000,
  "Video Editing": 45000,
  "Artificial Intelligence": 10000,
};
console.log(`\nTuition Fee: ${tuitionFee[answer.course]}`);
console.log(`Balace ${studentBalance}\n`);

//"Setting Payment Method and Amount"
let paymentAmount;
let paymentMethod = await inquirer.prompt({
  name: "paymentType",
  type: "list",
  message: chalk.greenBright("Please Select a Payment method:"),
  choices: Object.values(paymentType),
});

//Validate if the user enter a valid amount
async function enterPaymentAmount() {
  const paymentMethod = await inquirer.prompt({
    name: "amount",
    type: "input",
    message: chalk.greenBright(`Enter Amount to pay: ${tuitionFee[answer.course]})`),
    validate: function validateInput(value) {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue) && floatValue >= 0) {
        return true;
      }
      return "\nPlease enter a valid non-negative number\n";
    },
  });
  paymentAmount = parseFloat(paymentMethod.amount);
  return paymentAmount;
}
//Validate if paid amount is equal to the course tuition fee
await enterPaymentAmount();
while (paymentAmount !== tuitionFee[answer.course]) {
  console.log(`\nPlease pay the exact amount\n`);
  await enterPaymentAmount();
}
console.log(`\nYou are successfully enrolled in ${answer.course}\n`);


//After Enrolling ask if user want to view status or exit the management System
let ans = await inquirer.prompt({
  name: "select",
  type: "list",
  message: chalk.greenBright("What would you want to next?"),
  choices:Object.values(status_exit),
});
if (ans.select === status_exit.viewstatus) {
  console.log(chalk.magentaBright(`\n*********STATUS*********\n`));
  console.log(`Student NAME: ${answer.student}`);
  console.log(`Student ID: ${generateId}`);
  console.log(`Course: ${answer.course}`);
  console.log(`Tuition Fee Paid: ${paymentAmount}`);
  console.log(`Balance: ${(studentBalance += paymentAmount)}`);
} else {
  console.log(chalk.magentaBright(`Congratulations you enrolled successfully`));
}
