const { Command } = require('commander');
const GitManager = require('./index');
const program = new Command();
const gitManager = new GitManager();



program
  .command('commit <message>')
  .description('Commit changes with a message')
  .action(async (message) => {
    await gitManager.commit(message);
  });

program
  .command('push [branch]')
  .description('Push changes to a branch (default is main)')
  .action(async (branch = 'main') => {
    await gitManager.push(branch);
  });

program
  .command('backdate <message> <date>')
  .description('Commit changes with a past date')
  .action(async (message, date) => {
    await gitManager.backdateCommit(message, date);
  });

program.parse(process.argv);
