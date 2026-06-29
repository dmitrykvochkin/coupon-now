# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for issue
operations from inside this repository.

## Conventions

- Create an issue with `gh issue create --title "..." --body "..."`.
- Read an issue with `gh issue view <number> --comments`.
- List issues with `gh issue list` and filter by state, label, and assignee.
- Comment with `gh issue comment <number> --body "..."`.
- Apply labels with `gh issue edit <number> --add-label "..."`.
- Close with `gh issue close <number> --comment "..."`.

Infer the repo from `git remote -v`; `gh` does this automatically when run
inside this clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

