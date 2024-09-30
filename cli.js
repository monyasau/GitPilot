#!/usr/bin/env node

import { Command } from 'commander';
import GitManager from './index.js';
const program = new Command();
const gitManager = new GitManager();

program
  .name('Gitpilot')
  .description('Git operations')
  .version('1.0.0');

// Commit command
program
  .command('commit <message>')
  .description('Commit changes with a message')
  .action(async (message) => {
    await gitManager.commit(message);
  });

// Push command
program
  .command('push [branch]')
  .description('Push changes to a branch (default is main)')
  .action(async (branch = 'main') => {
    await gitManager.push(branch);
  });

// Backdate commit command
program
  .command('backdate <message> <date>')
  .description('Commit changes with a past date (use ISO 8601 date format)')
  .action(async (message, date) => {
    await gitManager.backdateCommit(message, date);
  });

// Pull command
program
  .command('pull [branch]')
  .description('Pull changes from a branch (default is main)')
  .action(async (branch = 'main') => {
    await gitManager.pull(branch);
  });

// Create a new branch and switch to it
program
  .command('create-branch <branchName>')
  .description('Create a new branch and switch to it')
  .action(async (branchName) => {
    await gitManager.createBranch(branchName);
  });

// List all branches
program
  .command('list-branches')
  .description('List all branches in the repository')
  .action(async () => {
    await gitManager.listBranches();
  });

// Delete a local branch
program
  .command('delete-branch <branchName>')
  .description('Delete a local branch')
  .action(async (branchName) => {
    await gitManager.deleteBranch(branchName);
  });

// Create an annotated tag
program
  .command('create-tag <tagName> <message>')
  .description('Create an annotated tag with a message')
  .action(async (tagName, message) => {
    await gitManager.createTag(tagName, message);
  });

// List all tags
program
  .command('list-tags')
  .description('List all tags in the repository')
  .action(async () => {
    await gitManager.listTags();
  });

// Stash changes
program
  .command('stash')
  .description('Stash changes')
  .action(async () => {
    await gitManager.stashChanges();
  });

// Apply stash by index
program
  .command('apply-stash [stashIndex]')
  .description('Apply a stash by its index (default is 0)')
  .action(async (stashIndex = 0) => {
    await gitManager.applyStash(stashIndex);
  });

// List all stashes
program
  .command('list-stashes')
  .description('List all stashes')
  .action(async () => {
    await gitManager.listStashes();
  });

// Undo the last commit
program
  .command('undo-last-commit')
  .description('Undo the last commit')
  .action(async () => {
    await gitManager.undoLastCommit();
  });

// Unstage files
program
  .command('unstage <files...>')
  .description('Unstage files (provide a list of file paths)')
  .action(async (files) => {
    await gitManager.unstageFiles(files);
  });

// Amend the last commit
program
  .command('amend-commit <message>')
  .description('Amend the previous commit with a new message')
  .action(async (message) => {
    await gitManager.amendCommit(message);
  });

// Cherry-pick a commit by hash
program
  .command('cherry-pick <commitHash>')
  .description('Cherry-pick a commit by its hash')
  .action(async (commitHash) => {
    await gitManager.cherryPick(commitHash);
  });

// Resolve merge conflicts
program
  .command('resolve-conflicts')
  .description('Check and resolve merge conflicts')
  .action(async () => {
    await gitManager.resolveConflicts();
  });

// Set Git configuration
program
  .command('set-config <key> <value> [global]')
  .description('Set Git config (use "global" flag for global config)')
  .action(async (key, value, global) => {
    const isGlobal = global === 'global';
    await gitManager.setGitConfig(key, value, isGlobal);
  });

// Get Git configuration
program
  .command('get-config <key>')
  .description('Get Git config value by key')
  .action(async (key) => {
    await gitManager.getGitConfig(key);
  });

program.parse(process.argv);
