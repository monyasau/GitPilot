# Gitpilot

![Gitpilot](https://img.shields.io/badge/version-1.0.0-blue) ![npm](https://img.shields.io/badge/npm-v7.24.0-red)

Gitpilot is a command-line interface (CLI) tool designed to simplify and streamline common Git operations. With an intuitive command structure, Gitpilot allows you to manage your Git repositories efficiently.

## Features

- **Time travel** create and push commit into the past or future, yes i'm serious, checkout( `backdate` | `commitOn` ) commands
- **Commit changes** with a custom message or by selecting files interactively.
- **Push and pull** changes to and from branches.
- **Create and switch branches** effortlessly.
- **Manage tags** with the ability to create and list annotated tags.
- **Stash changes** and apply stashes as needed.
- **Undo commits** or amend the last commit with a new message.
- **Cherry-pick commits** from your Git history.
- **Resolve merge conflicts** and manage Git configurations easily.

## Advantages

- Saves time and effort by simplifying command syntax.
- Streamlines Git operations for developers of all levels.
- Simplifies complex Git commands through a user-friendly interface.
- Enhances Git workflow efficiency.

## Installation

To install Gitpilot globally, run:

```bash
npm install -g gitpilot
```

### Usage

Once installed globally, you can access Gitpilot commands directly from your terminal. Simply type `gitpilot <command>` followed by any necessary arguments. Refer to the specific command descriptions for detailed usage instructions.

**Example:**

To commit staged changes with a message "Updated README":

```Bash
gitpilot commit "Updated README"
```

## Basic Commands

Commit changes:

```bash
gitpilot commit "Your commit message"
```

Undo the last commit:

```bash
gitpilot commit "Your commit message"
```

Commit to specific time (past or future):

```bash
gitpilot backdate "Your commit message" "2000-03-22"
```

> OR

```bash
gitpilot commitOn "Your commit message" "2000-03-22"
```

Edit the last commit's message:

```bash
gitpilot amend-commit "New commit message"
```

Push changes:

```bash
gitpilot push [branch]
```

Pull changes:

```bash
gitpilot pull [branch]
```

Create a new branch:

```bash
gitpilot create-branch <branchName>
```

List all branches:

```bash
gitpilot list-branches
```

Delete a local branch:

```bash
gitpilot delete-branch <branchName>
```

Create an annotated tag:

```bash
gitpilot create-tag <tagName> "Your tag message"
```

List all tags:

```bash
gitpilot list-tags
```

Stash changes:

```bash
gitpilot stash
```

Apply a stash:

```bash
gitpilot apply-stash [stashIndex]
```

List all stashes:

```bash
gitpilot list-stashes
```

Unstage files:

```bash
gitpilot unstage <files...>
```

Cherry-pick a commit:

```bash
gitpilot cherry-pick <commitHash>
```

Resolve merge conflicts:

```bash
gitpilot resolve-conflicts
```

Set Git configuration:

```bash
gitpilot set-config <key> <value> [global]
```

Get Git configuration:

```bash
gitpilot get-config <key>
```
