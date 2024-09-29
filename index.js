// src/git-manager.js
const simpleGit = require('simple-git');
const git = simpleGit();

class GitManager {
  constructor() {
    this.git = simpleGit();
  }

  async commit(message) {
    try {
      await this.git.commit(message);
      console.log(`Committed with message: "${message}"`);
    } catch (error) {
      console.error("Error while committing:", error);
    }
  }

  async push(branch = 'main') {
    try {
      await this.git.push('origin', branch);
      console.log(`Pushed to branch: ${branch}`);
    } catch (error) {
      console.error("Error while pushing:", error);
    }
  }

  async pull(branch = 'main') {
    try {
      await this.git.pull('origin', branch);
      console.log(`Pulled from branch: ${branch}`);
    } catch (error) {
      console.error("Error while pulling:", error);
    }
  }

  async createBranch(branchName) {
    try {
      await this.git.checkoutLocalBranch(branchName);
      console.log(`Switched to new branch: ${branchName}`);
    } catch (error) {
      console.error("Error while creating branch:", error);
    }
  }
  async backdateCommit(message, date) {
    try {
      const options = {
        '--date': date
      };
      await this.git.commit(message, undefined, options);
      console.log(`Committed with message: "${message}" on date: ${date}`);
    } catch (error) {
      console.error("Error while backdating commit:", error);
    }
  }
  async amendCommit(message) {
    try {
      await this.git.commit(message, undefined, { '--amend': true });
      console.log(`Amended previous commit with message: "${message}"`);
    } catch (error) {
      console.error("Error while amending commit:", error);
    }
  }
  async cherryPick(commitHash) {
    try {
      await this.git.raw(['cherry-pick', commitHash]);
      console.log(`Cherry-picked commit: ${commitHash}`);
    } catch (error) {
      console.error("Error while cherry-picking commit:", error);
    }
  }
  
}

module.exports = GitManager;
