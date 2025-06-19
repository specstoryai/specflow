# Task Planning for Next Development Session

Focus on the right next chunk of work that can be accomplished in a single AI coding session

## Tasks Prompt Template

Copy and customize this prompt to plan your next development session:

```
Based on my current spec in SPEC.md, help me identify the right next chunk of work for a single AI coding session.

Current state of my project:
- [Describe what currently exists - nothing, basic setup, working prototype, etc.]
- [What was accomplished in the last session, if any]
- [Any blockers or issues from previous work]

My target application fidelity is: [prototype, personal tool, alpha, beta, production]

Help me choose the right next tasks by considering:
1. Where am I in the development progression?
   - Environment setup (proving tools work)
   - Minimal change (proving development loop works)  
   - Core functionality (building toward user value)
   - Polish and refinement (improving existing features)

2. What would provide the most value right now?
   - Unblocking my development workflow
   - Proving a technical assumption
   - Adding user-visible functionality
   - Improving something that already works

3. What can realistically be accomplished in one focused session?

Please suggest a set of specific, actionable tasks for my next session, ending with:
- Update SPEC.md based on what we've implemented
- Update documentation (README.md, etc.) based on what we've implemented

Identify which tasks are meant for the AI coding agent and which are meant for me, as the human software developer.

Focus on incremental progress that builds confidence and momentum.
```

### If you need help figuring out where you are in development:

Try this exploration prompt:
```
Help me understand what stage of development I'm in for my project in SPEC.md.

Here's what I have so far:
- [Describe current state - be honest about what exists vs. what you hope exists]

Walk me through these stages and help me identify where I am:

**Stage 1 - Environment Setup**: 
- Can I create a new project in my chosen technology?
- Do my tools (editor, compiler, runtime) work together?
- Can I run a "hello world" version?

**Stage 2 - Development Loop**:
- Can I make a small change and see the result?
- Is my save/build/test/deploy cycle working?
- Do I understand how to debug issues?

**Stage 3 - Core Functionality**:
- Does my app do the main thing users need?
- Can someone actually use it for its intended purpose?
- Are the essential features working?

**Stage 4 - Polish & Refinement**:
- Is the experience smooth and reliable?
- Does it handle edge cases and errors gracefully?
- Is it ready for my target fidelity level?

Based on what I have, what stage am I in and what should I focus on next?
```

### If you need help choosing between competing priorities:

Try this exploration prompt:
```
I'm not sure what to work on next for my project in SPEC.md. Help me prioritize.

Here are some things I have in mind:
- [List 3-5 potential next tasks or areas]

Help me think through:
- Which of these would unblock other work?
- Which would give me the most confidence that I'm on the right track?
- Which would provide value to a user soonest?
- Which feels most achievable in a single session?
- Which would teach me something important about my problem domain?
- Are any of these actually premature - things I don't need yet?

Based on my current stage and goals, what should I tackle next?
```

### If you need help scoping a task to fit one session:

Try this exploration prompt:
```
I want to work on [specific feature or area] but I'm not sure how to break it down into a manageable chunk for one AI coding session.

The full feature would involve:
- [Describe the complete feature or change]

Help me think about:
- What's the smallest piece that would still be meaningful progress?
- How can I break this into stages where each stage works and adds value?
- What would be a good "spike" or proof-of-concept to start with?
- What parts can I defer to later sessions?
- What would let me validate my approach before going too far?

Suggest a specific, focused task that moves me toward this goal but is achievable in one session.
```

### If you're stuck or frustrated:

Try this exploration prompt:
```
I'm feeling stuck on my project in SPEC.md. Help me get unstuck.

What's frustrating me:
- [Describe what's not working or what feels overwhelming]

Current blockers:
- [Technical issues, knowledge gaps, or unclear requirements]

Help me identify:
- Is this a technical problem, a planning problem, or a scope problem?
- What's the smallest step I could take to make progress?
- Is there something simpler I should try first?
- Do I need to step back and reconsider my approach?
- Would it help to build something completely minimal first?

Suggest a confidence-building task that gets me moving again.
```

---

# Current Tasks

[Use this space to track your current session's tasks - update as you work]

## Session Work Items
- [ ] 
- [ ] 
- [ ] 
- [ ] Update SPEC.md based on what we've implemented
- [ ] Update documentation based on what we've implemented

## Session Notes
[Track progress, decisions, and discoveries as you work]

## For Next Time
[Capture ideas and potential next steps for future sessions]
