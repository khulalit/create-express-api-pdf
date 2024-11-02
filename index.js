#!/usr/bin/env node

const inquirer = require("inquirer");
const simpleGit = require("simple-git");
const path = require("path");
const chalk = require("chalk");

const git = simpleGit();

const repoUrl =
  "https://github.com/khulalit/express-js-pdf-starter-template.git";

const promptUser = async () => {
  const questions = [
    {
      type: "input",
      name: "projectName",
      message: "Enter the name of your project:",
    },
  ];
  return inquirer.prompt(questions);
};

const cloneRepo = async (projectName) => {
  const targetDir = path.join(process.cwd(), projectName);
  await git.clone(repoUrl, targetDir);
  console.log(chalk.green(`Repository cloned into ${targetDir}`));
};

const run = async () => {
  const args = process.argv.slice(2); // Get command-line arguments
  let projectName;

  // Check if the project name is provided as an argument
  if (args.length > 0) {
    projectName = args[0];
  } else {
    const answers = await promptUser();
    projectName = answers.projectName;
  }

  console.log(chalk.blue("Welcome to Create Express API PDF CLI! 🎉"));
  await cloneRepo(projectName);
  console.log(chalk.green("Project setup complete! 🎊"));
  console.log(
    `\nTo get started, navigate into your project directory and run:\n`
  );
  console.log(chalk.yellow(`cd ${projectName}`));
  console.log(chalk.yellow("npm install"));
  console.log(chalk.yellow("npm start"));
};

run().catch((err) => {
  console.error(chalk.red("Error:"), err);
});
