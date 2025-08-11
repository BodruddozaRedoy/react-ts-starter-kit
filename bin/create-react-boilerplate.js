#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { generateBoilerplate } = require('../src/generator');

program
  .version('1.0.0')
  .description('Create a new React boilerplate project')
  .argument('[project-name]', 'Name of the project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (projectName, options) => {
    try {
      let answers = {};
      
      if (!projectName) {
        const nameAnswer = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'What is your project name?',
            default: 'my-react-app',
            validate: (input) => {
              if (!input.trim()) {
                return 'Project name cannot be empty';
              }
              if (fs.existsSync(input)) {
                return 'Directory already exists';
              }
              return true;
            }
          }
        ]);
        projectName = nameAnswer.projectName;
      }

      if (!options.yes) {
        answers = await inquirer.prompt([
          // {
          //   type: 'confirm',
          //   name: 'useTypeScript',
          //   message: 'Would you like to use TypeScript?',
          //   default: true
          // },
          {
            type: 'confirm',
            name: 'useRouter',
            message: 'Would you like to include React Router?',
            default: true
          },
          // {
          //   type: 'confirm',
          //   name: 'useStyledComponents',
          //   message: 'Would you like to use Styled Components?',
          //   default: false
          // },
          {
            type: 'confirm',
            name: 'useRedux',
            message: 'Would you like to include Redux Toolkit?',
            default: false
          },
          // {
          //   type: 'confirm',
          //   name: 'useTesting',
          //   message: 'Would you like to include testing setup (Jest + React Testing Library)?',
          //   default: false
          // },
          {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager would you like to use?',
            choices: ['npm', 'yarn', 'pnpm'],
            default: 'npm'
          }
        ]);
      } else {
        // Default values
        answers = {
          useTypeScript: true,
          useRouter: true,
          // useStyledComponents: false,
          useRedux: false,
          // useTesting: false,
          packageManager: 'npm'
        };
      }

      console.log(chalk.blue('\n🚀 Creating React boilerplate...\n'));
      
      await generateBoilerplate(projectName, answers);
      
      console.log(chalk.green('\n✅ React boilerplate created successfully!\n'));
      console.log(chalk.yellow('Next steps:'));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white(`  ${answers.packageManager} install`));
      console.log(chalk.white(`  ${answers.packageManager} start`));
      console.log(chalk.white('\nHappy coding! 🎉\n'));
      
    } catch (error) {
      console.error(chalk.red('Error creating boilerplate:'), error.message);
      process.exit(1);
    }
  });

program.parse(); 