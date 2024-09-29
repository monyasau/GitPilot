import simpleGit from 'simple-git';
import inquirer from 'inquirer';

class GitManager {
  constructor() {
    this.git = simpleGit();
  }

  async commit(message) {
    try {
      // Check for staged files
      const status = await this.git.status();

      if (status.staged && Object.keys(status.staged).length > 0) {
        // If there are staged files, commit them
        await this.git.commit(message);
        console.log(`Committed with message: "${message}"`);
      } else {
        // No staged files; let the user select files to commit
        await this.selectFilesToCommit(message);
      }
    } catch (error) {
      console.error("Error while committing:", error);
    }
  }

  async selectFilesToCommit(message) {
    try {
      const status = await this.git.status();
      // Check the files that are modified but not staged
      let fileNames=[]
      const changedFiles = Object.keys(status.files).filter(file => 
        status.files[file].working_dir === 'M'|'?' // M means modified in working directory while ?  means new file
      );
  status.files.forEach((a)=>{fileNames.push(`${a.path} ${a.working_dir==="M"?"":"(New)"}`)})
      if (changedFiles.length === 0) {
        console.log("No changed files to commit.");
        return; // No files to commit
      }
  
      // Add "All *" option to the list
      const choices = ['All *', ...fileNames];
  
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'filesToCommit',
          message: 'Select files to commit: ',
          choices: choices,
        },
      ]);
  
      const selectedFiles = answers.filesToCommit.trim();
      // If "All *" is selected, stage all changed files
      if (selectedFiles === 'All *') {
        await this.git.add('.');
      } else {
        // Stage only the selected file(s)
        await this.git.add(selectedFiles);
      }
  
      // Finally, commit the selected files
      await this.git.commit(message);
      console.log(`Committed files: ${selectedFiles}`);
    } catch (error) {
      console.error("Error while selecting files to commit:", error);
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

// module.exports = GitManager;
export default GitManager;
