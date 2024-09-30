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
  // status.files.forEach((a)=>{fileNames.push(`${a.path} ${a.working_dir==="M"?"":"(New)"}`)})
      // Get files with status 'M' (modified) or '?' (untracked/new)
      const changedFiles = status.files.filter(file => 
        file.working_dir === 'M' || file.working_dir === '?'
      );

      if (changedFiles.length === 0) {
        console.log("No changed files to commit.");
        return;
      }

      // Prepare choices with display names (e.g., append "(New)" for untracked files)
      const choices = ['All *', ...changedFiles.map(file => ({
        name: `${file.path} ${file.working_dir === '?' ? '(New)' : ''}`,
        value: file.path
      }))];

  
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',  // Allows multiple selections
          name: 'filesToCommit',
          required:true,
          message: 'Select files to commit:',
          choices: choices,
        },
      ]);
      const selectedFiles = answers.filesToCommit;

      // Stage all files if "All *" is selected, or stage the specific file
      if (selectedFiles.includes('All *')) {
        await this.git.add('.');
      } else {
        // Otherwise, stage the selected files
        await this.git.add(selectedFiles);
      }
      // Commit the staged files
      await this.git.commit(message);
      console.log(`Committed files: ${selectedFiles}`);
    } catch (error) {
      console.error("Error while selecting files to commit:", error);
    }
  }
  async undoLastCommit() {
    try {
      await this.git.reset(['--soft', 'HEAD~1']);
      console.log('Last commit undone.');
    } catch (error) {
      console.error("Error while undoing last commit:", error);
    }
  }
  
  async unstageFiles(files) {
    try {
      await this.git.reset(files);
      console.log('Files unstaged.');
    } catch (error) {
      console.error("Error while unstaging files:", error);
    }
  }
  async listBranches() {
    try {
      const branchSummary = await this.git.branch();
      console.log(branchSummary.all);
    } catch (error) {
      console.error("Error listing branches:", error);
    }
  }
  
  async deleteBranch(branchName) {
    try {
      await this.git.deleteLocalBranch(branchName);
      console.log(`Branch ${branchName} deleted.`);
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  }
  async createTag(tagName, message) {
    try {
      await this.git.addTag(tagName);
      await this.git.raw(['tag', '-a', tagName, '-m', message]);
      console.log(`Tag ${tagName} created with message: "${message}"`);
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  }
  
  async listTags() {
    try {
      const tags = await this.git.tags();
      console.log(tags.all);
    } catch (error) {
      console.error("Error listing tags:", error);
    }
  }
  async stashChanges() {
    try {
      await this.git.stash();
      console.log('Changes stashed.');
    } catch (error) {
      console.error("Error stashing changes:", error);
    }
  }
  
  async applyStash(stashIndex = 0) {
    try {
      await this.git.stash(['apply', `stash@{${stashIndex}}`]);
      console.log('Stash applied.');
    } catch (error) {
      console.error("Error applying stash:", error);
    }
  }
  
  async listStashes() {
    try {
      const stashes = await this.git.stashList();
      console.log(stashes.all);
    } catch (error) {
      console.error("Error listing stashes:", error);
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
  async setGitConfig(key, value, global = false) {
    try {
      await this.git.addConfig(key, value, global ? 'global' : undefined);
      console.log(`Git config set: ${key} = ${value}`);
    } catch (error) {
      console.error("Error setting Git config:", error);
    }
  }
  
  async getGitConfig(key) {
    try {
      const value = await this.git.getConfig(key);
      console.log(`Git config ${key}: ${value}`);
    } catch (error) {
      console.error("Error getting Git config:", error);
    }
  }
  
  async resolveConflicts() {
    try {
      const status = await this.git.status();
      if (status.conflicted.length > 0) {
        console.log("Conflicting files:", status.conflicted);
        // Implement user choices to resolve conflicts
      } else {
        console.log("No merge conflicts.");
      }
    } catch (error) {
      console.error("Error checking for merge conflicts:", error);
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
