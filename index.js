#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.blueBright.underline.bold(`Welcome to my Student Management System`));
//Generatinga a 5-digit unique ID for each student
const generateId = Math.floor(100000 * Math.random());
//Setting Student Balance
let studentBalance = 0;
//List of Courses
var courses;
(function (courses) {
    courses["webDevelopment"] = "Web Development";
    courses["gfx"] = "Graphic Designing";
    courses["videoEditing"] = "Video Editing";
    courses["AI"] = "Artificial Intelligence";
})(courses || (courses = {}));
//List of Payment Types
var paymentType;
(function (paymentType) {
    paymentType["easypaisa"] = "Easy Paisa";
    paymentType["jazzcash"] = "Jazz Cash";
    paymentType["sadapay"] = "Sada Pay";
    paymentType["banktransfer"] = "Bank Transfer";
})(paymentType || (paymentType = {}));
//list of user's choice
var status_exit;
(function (status_exit) {
    status_exit["viewstatus"] = "View Status";
    status_exit["exit"] = "Exit";
})(status_exit || (status_exit = {}));
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
const tuitionFee = {
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
        message: chalk.greenBright(`Write amount of Tution Fees you pay ${tuitionFee[answer.course]})`),
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
    choices: Object.values(status_exit),
});
if (ans.select === status_exit.viewstatus) {
    console.log(chalk.magentaBright(`\n*********STATUS*********\n`));
    console.log(`Student NAME: ${answer.student}`);
    console.log(`Student ID: ${generateId}`);
    console.log(`Course: ${answer.course}`);
    console.log(`Tuition Fee Paid: ${paymentAmount}`);
    console.log(`Balance: ${(studentBalance += paymentAmount)}`);
}
else {
    console.log(chalk.magentaBright(`Congratulations you enrolled successfully`));
}
