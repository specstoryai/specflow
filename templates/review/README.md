# Review Templates for AI-Assisted Development

Code reviews have always been about more than catching bugs. They're a knowledge-sharing mechanism, a teaching moment, and a checkpoint for architectural decisions. When AI writes our code, these purposes don't disappear—they become more important.

## The Knowledge Sharing Problem

In traditional development, the author of a PR can explain their reasoning. They understand the tradeoffs they made, the alternatives they considered, and why they chose a particular approach. Reviewers ask questions, learn context, and build shared understanding.

When an AI agent writes the code, this dynamic changes:

- **The human may not fully understand what was generated** — They guided the AI with prompts, but the implementation details might be unfamiliar
- **Context gets lost** — The reasoning behind specific choices lives in a conversation transcript, not in the developer's head
- **Tribal knowledge doesn't accumulate** — If no human deeply understands the code, the team's collective knowledge stagnates

## Rethinking Reviews for AI-Written Code

These review templates encode a different philosophy: **the review IS the learning**.

### Line-by-Line Comprehension

The review commands require explaining each change's purpose with line number references. This isn't bureaucracy—it's forcing genuine understanding:

```
Lines 164-189 (new): Added remote status check before disabling
- Good UX - Detects current connection state to provide better feedback
- Type assertions use the two-value form (ok pattern) for safety
- Variable names wasConnected, oldURL are descriptive
- Missing error handling - if remote.status call fails, we continue anyway. Should we?
```

When you (or your AI reviewer) articulate *why* each line exists, you transfer that knowledge into your own understanding.

### Verify It Should Exist

AI agents are prone to over-engineering. They add error handling for impossible cases, create abstractions for single uses, and implement features nobody asked for. The review checklist includes:

> "verify the code has to exist, is actually needed, and is in use"

This shifts the reviewer's mindset from "is this code correct?" to "should this code exist at all?"

### "Why" Comments, Not "How" Comments

AI-generated code often lacks the crucial context of *why* a decision was made. The code explains what it does (the "how"), but not the reasoning. Reviews should flag missing "why" comments and add them—this is how institutional knowledge gets preserved.

### Test Verification Through Inversion

The templates include an unusual practice: flip test assertions to confirm they fail. This catches tautological tests that pass regardless of correctness—a common pattern in AI-generated test suites that optimize for coverage metrics rather than actual verification.

## Intent Reviews: A Higher-Level Paradigm

The code review templates above improve knowledge sharing within the traditional review model. But there's a more fundamental question: **should we be reviewing code at all?**

When one developer with AI assistance can generate 10x the code they could write manually, traditional line-by-line code review becomes a bottleneck. Reviewing thousands of lines of AI-generated code is slow, exhausting, and often misses the forest for the trees.

**Intent Review** represents a paradigm shift: **intent, not code, is the unit of work that matters.**

### What is an Intent Review?

Instead of reviewing the specific code that was generated, you review the outcome of a high-level goal. An intent like "Implement basic subscription billing" gets approved in 5-10 minutes based on whether the goal was achieved correctly—not by scrutinizing every line of implementation.

The review surfaces what humans actually need to evaluate:

| Element | Purpose |
|---------|---------|
| **Description** | The high-level intent and its goals |
| **Quality Signals** | Automated checks—tests passing, lint clean, security scans, agent critique |
| **Key Decisions** | Auto-captured reasoning from pairing conversations (e.g., "Use Stripe over PayPal") |
| **Changes Summary** | LLM-generated human-readable summary of what changed |
| **Risks & Tradeoffs** | Outstanding items, deferred work, potential issues |

### Why Intent Reviews Work

**Focus on what and why, not how.** The implementation details matter less than whether the right thing was built for the right reasons. Quality signals and automated checks verify the "how" is sound.

**Preserve critical context.** Key decisions get captured during development, not reconstructed during review. When someone chose Stripe over PayPal, that reasoning is recorded—not lost in a conversation transcript.

**Explicit gates enforce alignment.** An "Approve Intent" or "Request Changes" action replaces the traditional PR model. The team explicitly agrees on direction before code merges, preventing late-discovery disagreements.

**Artifact linkage creates interrogable history.** Each intent links to pairing transcripts, code diffs, decisions, and quality signals. New team members can understand not just what the code does, but why it exists and how it evolved.

### When to Use Each Approach

Intent Reviews and code-level reviews serve different purposes:

**Use Intent Reviews when:**
- Work is scoped as a coherent goal or feature
- Automated quality signals can verify correctness
- The team needs to stay aligned on direction, not implementation details
- Velocity matters and code volume would overwhelm traditional review

**Use Code Reviews when:**
- You need to deeply understand specific implementation choices
- Security-sensitive code requires line-by-line scrutiny
- Teaching moments—a junior developer (human or AI) needs detailed feedback
- The intent was achieved but you suspect the approach has issues

### The Hybrid Model

In practice, most teams will use both. Intent Reviews become the primary gate for merging work—fast, focused on outcomes, preserving context. Code reviews become a selective tool for situations requiring deeper inspection.

The goal isn't to eliminate code review but to make it optional rather than mandatory. When everything must go through line-by-line review, the process breaks down at AI-agent scale. When intent-level review is the default and code-level review is strategic, the team maintains both velocity and quality.

---

## Using These Templates

### commands/code-review.md

For reviewing uncommitted local changes. Run as a Claude Code command:

```
/code-review
```

Reviews the current `git diff` and untracked files, providing line-by-line analysis.

### commands/pr-review.md

For reviewing pull requests. Run with a PR number:

```
/pr-review 123
```

Fetches the PR diff via GitHub CLI and applies the same structured review.

## Adapting for Your Team

These templates assume Go development. Adapt the checklist items for your language and conventions:

- Replace "Go lang idiomatic code" with your language's idioms
- Adjust the file ignore patterns (`.specstory/`, `.claude/`, etc.) for your tooling
- Add domain-specific review criteria relevant to your codebase

## The Goal: Humans Stay in the Loop

AI can write code faster than humans. But velocity without understanding creates technical debt of a different kind—*knowledge debt*. These review templates ensure that even when AI does the typing, humans maintain genuine comprehension of their codebase.

The review becomes the moment where knowledge transfers from "code that exists" to "code the team understands."

---

## Key Takeaways

**The fundamental shift:** In AI-assisted development, reviews aren't just quality gates—they're the primary mechanism for knowledge transfer. The person who guided the AI may not fully understand the output. The review process must fill that gap.

**Two levels of review:**
1. **Intent Reviews** — Fast, outcome-focused, preserves decisions and context. The new default for most work.
2. **Code Reviews** — Deep, line-by-line comprehension. Strategic use for security, teaching, or when something seems off.

**What gets captured matters:**
- Key decisions and their reasoning
- Quality signals from automated checks
- Risks, tradeoffs, and deferred work
- The "why" behind implementation choices

**Success looks like:**
- Team members can explain code they didn't write
- New joiners can understand historical decisions
- Reviews take minutes, not hours
- Knowledge accumulates rather than evaporates

The goal isn't to review less—it's to review *smarter*. Intent-level review for velocity and alignment, code-level review for depth and learning. Both serve the same purpose: ensuring humans genuinely understand the systems they're building, even when AI does most of the typing.
