---
title: "Owning the new loop"
date: "2026-01-31"
summary: "A meditation on the AI-speed loop that connects intent to reality—and how to stay aligned inside it."
category: "Essays"
tags:
  - agents
  - alignment
  - intent
  - evaluation
author: "Greg Ceccarelli"
image: "/images/meditations/owning_the_loop_banner.png"
---

Jake Levirne and I shipped a feature at SpecStory recently and confronted a choice that would have been unremarkable two years ago.

He had a branch that had diverged from main. The time-tested approach in old-world terms had it been manually coded is straightforward: merge main into his branch, resolve conflicts, run tests, code review the diff, merge back into main.

But understanding the diff wasn’t the point.

The point was for us to both share the meaning of the change.

So instead of performing an algorithmic merge and then pretending we could code review our way back to understanding, we replayed all of the logic on his branch directly onto main with Claude Code. We walked through what Jake intended versus what the system had become since he branched, and we reconstructed the feature as it should exist now, together.

It felt like a rebase, but not with original commits.

It was a semantic rebase: replaying intent against this changed world.

This one moment is the whole story of the agent era. Because the next skill is owning the new loop that connects intent to reality.

You’ll recognize this if:

- You’ve shipped something fast and felt vaguely uneasy.
- You’ve approved a PR because the tests passed, not because you understood it.
- You’ve asked an agent to explain its code and felt more confused after.

If none of those have happened yet, bookmark this meditation and come back in six months.

## The loop is a conditioning system

Here is the new loop many of us are running now:

- Intent: what you think you want.
- Expression: the artifact you give your agent (prompt, ticket, spec, examples, constraints).
- Execution: what gets produced.
- Evaluation: what you notice (tests, metrics, intuition, “this feels wrong”).
- Revision: updated intent after contact with reality.

Then it repeats.

In yesterday’s world, human implementation speed was a governor. Ambiguity could hide for weeks. The cost of being slightly unclear was mostly time.

But when we move at AI speed, ambiguity can’t hide.

So being in control of this loop becomes the job.

But the deeper point is what the loop does to you. A fast loop doesn’t just accelerate output. It changes what you reward. It changes what you notice. It changes what you trust. Over time, it changes your identity inside the work.

That is why this matters.

## What the loop does to people

### It turns makers into operators

When you write a function by hand you feel the shape of the work. You have texture: the tradeoffs, the “why,” the moment you realized a constraint.

When you direct an agent, you often get the result without the texture. You can ship more and feel less.

That emotional shift matters. Makers build confidence through contact with the material. Operators historically have built confidence through dashboards and green checks.

But dashboards themselves are not understanding.

If you’re not careful, you end up with a brittle kind of competence: impressive throughput, weak internal model.

### It rewires your relationship to uncertainty

The loop rewards you for producing plausible output quickly. That reward is subtle. It’s not money, it’s dopamine: the feeling of progress.

So you start to experience uncertainty as friction instead of as information. You stop asking the question that actually protects you: “Do I know what I want?”

You start hoping the agent will figure it out.

It won’t.

### It seduces you to outsource the most human step

Most people thought the biggest risk of agentic codegen was hallucination.

The biggest risk is delegated judgment.

Here’s what borrowed confidence looks like: You ask Claude to refactor a module. It comes back clean. You ask “are there edge cases I’m missing?” It says “the error handling covers the main scenarios.” You feel reassured. You merge.

Three weeks later, a customer hits a case you never considered. You go back to understand why and realize you can’t reconstruct the reasoning. The agent gave you confidence in the artifact, but you never formed your own model of why it was right.

You have no place to stand when it’s wrong.

### It makes learning optional (which is dangerous)

When you solve a problem yourself, you leave with more than the answer. You leave with the shape of the resistance: what was hard, what was tempting, what failed.

When the agent solves it, you leave with output.

If you don’t deliberately carve out moments to learn, the loop will happily train you into a kind of elegant dependency. You will get faster. You will get less capable.

Both can be true.

## What the loop will do to companies

### It moves us from “building” to evaluation

In the agent era, implementation is abundant. Attention is scarce. Judgment is scarce. So companies become attention allocation machines. The question now is “can we tell if what we built is the thing we meant?”

That’s why so many orgs feel like they’re shipping more and understanding less.

They are.

### It splits organizations into winners and losers

The winners won’t be the ones with the best models or harnesses. The winners will be the ones who build the best loops.

They will do a few things differently:

- They will treat intent artifacts as first-class (specs, examples, constraints, contracts).
- They will treat evaluation as design, not as cleanup.
- They will treat revision as a discipline, not as a panic.

The losers will just be output-addicted. They’ll merge because the tests passed. They’ll ship because the screenshot looks right. They will accumulate intent debt until the product becomes un-steerable.

### It changes what coordination means

Coordination used to mean: align in meetings, break work into tickets, integrate later.

At AI speed, “integrate later” becomes “integrate never.” You discover incompatibility after the system has already grown around it. So coordination shifts from scheduling human time to maintaining a shared mental model. The shared mental model becomes the primary control surface.

But what does that actually mean?

A shared mental model isn’t a document. It’s the ability for two people to say “wait, that doesn’t fit” and both know what “fit” means.

Practically, this looks like:

- Before you split work, you align on what properties the solution must have (not just what it does).
- You maintain a living record of decisions and their reasoning (not just outcomes).
- When someone says “that feels off,” the team has shared language to debug the feeling.

Example: At SpecStory, we wouldn’t just say “build user auth.” We’d say “auth should feel invisible to returning users, paranoid about new devices, and never ask twice for the same assertion.” Those constraints are the model. When Jake’s branch diverged, we didn’t ask “does it merge cleanly?” We asked “does it still satisfy those properties?”

## Why code review becomes less important (and what replaces it)

This sounds inflammatory, so I’ll be precise.

Code review mattered because code was the human-readable artifact that carried meaning. It was where teams checked correctness, caught edge cases, enforced style, transmitted culture, and maintained a shared understanding of how the system works.

The agent era breaks the assumption under all of that: that reading the diff is the best way to understand the change.

When we use agents to generate thousands of lines in response to a paragraph or two of our prompts, the economics shift.

You can read everything and lose the speed advantage, or skim and trust.

Most orgs will choose trust. Not because they’re reckless. Because competition will reward it.

So “review the diff” becomes a ritual that provides emotional safety but decreasing epistemic safety. Meanwhile, the true failure modes move upstream: ambiguous intent, unstated constraints, mismatched assumptions between drivers of parallel agents.

These are not caught by diff review. They are caught by shared mental alignment first, and contracts second.

That’s what the semantic rebase was: not checking whether the old branch merged cleanly, but reasserting the meaning of the change inside the current system.

## So what replaces code review?

Not nothing. A new review stack:

- Intent review: Before a significant implementation ask: is this the right problem? Are constraints explicit? Is it coherent with our current system understanding? What are the non-goals?
- Contract review: Do tests and examples define behavior? Do they match reality?
- Outcome review: Does it behave correctly under real usage?
- Drift review: Is the system still coherent with our shared model or have we been accumulating contradictions?

Code review becomes one tool among many, and often a weak one, because the main question is now “are we still aligned on what this system is?”

## My forecast and the obvious-in-hindsight sequence

If you believe the loop as I’ve described is a conditioning system, you can predict a sequence of outcomes that are semi-opaque right now:

- Phase 1: The output boom. We’re living in it. Everyone ships more. Diffs get huge. People feel powerful.
- Phase 2: The evaluation crisis. Teams realize that tests passing is not the same as understanding. Bugs shift from syntax to intent.
- Phase 3: The status game inversion. Prestige shifts from “who can build” to “who can decide.” The scarce skill is judgment under speed.
- Phase 4: The coherence premium. Companies that maintain shared mental models compound. Companies that don’t become incoherent and slow down despite higher output.
- Phase 5: The rise of loop-native roles. New roles become central: context owners, evaluation designers. Legibility is control.
- Phase 6: The market for intent artifacts. The valuable IP becomes control systems: specs, eval harnesses, decision logs, and workflows that keep agents aligned.

Why will this be obvious in hindsight? Because it’s just what happens when execution costs collapse.

## How to own the new loop (tomorrow morning)

Owning the loop is not a slogan. It’s a practice.

Before you ask an agent for anything, write down or think very hard about:

- What outcome would make you say “yes, that’s it”?
- What outcome would make you say “no, that’s wrong”?
- What are you assuming is obvious that probably isn’t?

Then prompt. When you get output, don’t rush to approve. Ask:

- What did I fail to specify?
- What did the system assume?
- What changed in the world since the last time we decided this?

And when you hit a branch that’s out of sync, don’t fight Git.

Replay the meaning. Run the semantic rebase.

Because in this agent era, the thing you are versioning is not code but rather alignment. This isn’t a new idea.

> The world’s intelligence is not selfish. It created lower things for the sake of higher ones, and attuned the higher ones to one another. Look how it subordinates, how it connects, how it assigns each thing what each deserves, and brings the better things into alignment. — V. 30
