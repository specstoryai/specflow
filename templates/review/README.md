# Review Templates for AI-Assisted Development

Software development has always balanced two fundamental challenges: **building the right thing** and **building the thing right**. These aren't competing concerns—they're complementary, and both require deliberate attention.

In AI-assisted development, we address these through two types of review:

| Challenge | Review Type | Focus |
|-----------|-------------|-------|
| **Build the right thing** | Intent Review | Are we solving the right problem? Did we make good decisions about scope, approach, and tradeoffs? |
| **Build the thing right** | Code Review | Is the implementation correct, maintainable, secure, and well-tested? |

These review types work together in different combinations depending on what the work requires.

---

## Why Reviews Matter More Now

Code reviews have always been about more than catching bugs. They're a knowledge-sharing mechanism, a teaching moment, and a checkpoint for architectural decisions. When AI writes our code, these purposes don't disappear—they become more important.

### The Knowledge Sharing Problem

In traditional development, the author of a PR can explain their reasoning. They understand the tradeoffs they made, the alternatives they considered, and why they chose a particular approach. Reviewers ask questions, learn context, and build shared understanding.

When an AI agent writes the code, this dynamic changes:

- **The human may not fully understand what was generated** — They guided the AI with prompts, but the implementation details might be unfamiliar
- **Context gets lost** — The reasoning behind specific choices lives in a conversation transcript, not in the developer's head
- **Tribal knowledge doesn't accumulate** — If no human deeply understands the code, the team's collective knowledge stagnates

### The Review IS the Learning

These templates encode a different philosophy: reviews aren't just quality gates—they're the primary mechanism for building shared mental models.

Intent reviews ensure the team is aligned on *what* we're building and *why*. Code reviews ensure we understand *how* it works. Together, they transfer knowledge from "code that exists" to "code the team genuinely comprehends."

Without this deliberate attention, AI-assisted development creates a new kind of technical debt: *knowledge debt*. The code works, but nobody truly understands it.

---

## How Intent and Code Reviews Work Together

The balance between intent review and code review shifts based on risk, domain, and team needs. Here are three common patterns:

### Pattern 1: Intent First, Then Code Review (Traditional)

```
Intent Review → Implementation → Code Review → Merge
```

**When to use:** High-risk changes, security-sensitive code, core infrastructure, or when the team needs deep understanding of the implementation.

The intent review ensures alignment on *what* to build before work begins. The code review ensures the implementation is sound. This is the most thorough approach—appropriate when getting it wrong is costly.

**Examples:** Payment processing, authentication systems, data migration, public API changes.

### Pattern 2: Intent Review with Optimistic Implementation (Iterative)

```
Intent Review → Implementation → Course Correction (as needed) → Merge
```

**When to use:** Serious feature work where the implementation approach is less critical than the outcome. Business logic, UI features, integrations.

The intent review establishes goals and constraints. Implementation proceeds optimistically, with course corrections based on what emerges. Code review happens selectively—when something seems off or when specific areas warrant scrutiny.

**Examples:** New dashboard features, workflow automation, reporting systems, complex UI interactions.

### Pattern 3: Intent Review Only (Lightweight)

```
Implementation → Intent Review → Merge
```

**When to use:** Prototypes, modest UI changes, exploratory work, or changes where automated quality signals provide sufficient verification.

The implementation happens first (often quickly with AI assistance), then intent review verifies the outcome matches expectations. Detailed code review is skipped—the team trusts automated checks and accepts that the code may be revised later.

**Examples:** Prototype features, styling changes, copy updates, internal tools, experiments.

---

## What Each Review Type Involves

### Intent Review

Intent review answers: **Are we building the right thing for the right reasons?**

This is often a **document review**—evaluating an architecture spec, technical design, or functional design before significant implementation begins. The goal is shared understanding: helping each other see things we might miss, surfacing concerns early, and building enough common context to move forward confidently.

#### What Gets Reviewed

| Element | Purpose |
|---------|---------|
| **Design Document** | Architecture, technical approach, functional requirements |
| **Priority & Sequencing** | What gets built first, what can wait, dependencies between pieces |
| **Key Decisions** | Major choices and their reasoning (e.g., "Use Stripe over PayPal because...") |
| **Risks & Tradeoffs** | Known limitations, deferred work, potential issues |
| **Working Prototype** | If available—instructions to run it, or a video walkthrough |

When a prototype exists, the intent review includes **functional testing**: does the prototype actually demonstrate the intended behavior? This grounds the document review in reality.

#### The Challenge: Understanding the Thinking

The hardest part of intent review isn't reading the document—it's understanding the thinking that produced it. In AI-assisted work, documents are often drafted quickly, and the reasoning may live in conversation transcripts rather than the author's head.

**As an author, make your process visible:**

- **Indicate authorship level:**
  - "AI-authored draft" — minimal human editing, needs scrutiny
  - "AI-authored, human reviewed" — I've validated the content
  - "AI-authored, heavily human edited" — I've shaped this significantly

- **Indicate document status:**
  - "This is what I think we should implement" — seeking approval
  - "These are two approaches I'm deciding between" — seeking input on direction
  - "This is an initial set of ideas" — early exploration, expect iteration

- **Provide the AI chat history** — Let reviewers see the paths you've already explored. What alternatives were considered? What questions did you ask? What did you try and reject? This context prevents reviewers from re-asking questions you've already answered.

#### Why This Works

- **Alignment before implementation.** Catching direction problems early is cheaper than fixing them in code.
- **Explicit reasoning.** Decisions and their rationale are captured, not assumed.
- **Shared mental models.** The team understands not just *what* but *why*.
- **Appropriate depth.** Reviewing a design doc takes minutes; reviewing thousands of lines of implementation takes hours.

### Code Review

Code review answers: **Is the implementation correct, secure, and maintainable?**

In AI-assisted development, code review serves a dual purpose: quality assurance *and* knowledge transfer. The person who guided the AI may not fully understand the output. The review process fills that gap.

**Line-by-line comprehension.** The review requires explaining each change's purpose:

```
Lines 164-189 (new): Added remote status check before disabling
- Good UX - Detects current connection state to provide better feedback
- Type assertions use the two-value form (ok pattern) for safety
- Variable names wasConnected, oldURL are descriptive
- Missing error handling - if remote.status call fails, we continue anyway. Should we?
```

When you articulate *why* each line exists, you transfer that knowledge into your own understanding.

**Verify it should exist.** AI agents are prone to over-engineering. The review checklist includes: "verify the code has to exist, is actually needed, and is in use." This shifts the mindset from "is this code correct?" to "should this code exist at all?"

**"Why" comments, not "how" comments.** AI-generated code often lacks context for *why* a decision was made. Reviews should flag missing "why" comments—this is how institutional knowledge gets preserved.

**Test verification through inversion.** Flip test assertions to confirm they fail. This catches tautological tests that pass regardless of correctness—a common pattern in AI-generated test suites.

---

## Choosing the Right Balance

The question isn't "intent review or code review?" but "how much of each?"

| Scenario | Intent Review | Code Review |
|----------|---------------|-------------|
| Security-sensitive changes | Thorough (upfront) | Thorough |
| Core infrastructure | Thorough (upfront) | Thorough |
| Major feature work | Thorough (upfront) | Selective |
| Standard business logic | Standard | Selective |
| UI/UX improvements | Standard | Light or none |
| Prototypes | Light (at end) | None |
| Experiments | Light (at end) | None |

**Signals that warrant more code review:**
- Security implications
- Complex algorithms or state management
- Changes to shared infrastructure
- Something feels off about the approach
- Teaching opportunity for the team

**Signals that intent review alone suffices:**
- Strong automated quality signals (tests, lint, security scans)
- Well-understood problem domain
- Changes are easily reversible
- Team has high trust in the implementation patterns

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

**The core principle:** Software development requires both building the right thing and building the thing right. Intent reviews address the first; code reviews address the second. They're complementary, not competing.

**Two types of review, one goal:**

| Review Type | Question Answered | When Critical |
|-------------|-------------------|---------------|
| **Intent Review** | Did we build the right thing? | Always—ensures alignment on goals, decisions, and tradeoffs |
| **Code Review** | Did we build it right? | When correctness, security, or learning matters |

**Three patterns for combining them:**
1. **Traditional** — Intent review upfront, code review after implementation. For high-risk work.
2. **Iterative** — Intent review upfront, selective code review as needed. For most feature work.
3. **Lightweight** — Intent review at the end, skip code review. For prototypes and low-risk changes.

**What gets captured matters:**
- Key decisions and their reasoning
- Quality signals from automated checks
- Risks, tradeoffs, and deferred work
- The "why" behind implementation choices

**Success looks like:**
- Team members can explain code they didn't write
- New joiners can understand historical decisions
- Reviews match the risk level of the work
- Knowledge accumulates rather than evaporates

The goal isn't to review less—it's to review appropriately. Match review rigor to the risk and complexity of the work. Use intent review to stay aligned on direction, code review to ensure quality and transfer knowledge. Both serve the same ultimate purpose: ensuring humans genuinely understand the systems they're building, even when AI does most of the typing.
