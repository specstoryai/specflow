# Project Specification & Planning Walkthrough

Transform your brainstorm into actionable plans using AI collaboration


## Spec Prompt Template
Copy and customize this prompt to help define what you're building:

```
Create or update the # Current Spec section of @SPEC.md based on @BRAINSTORM.md and the following:
- My app is for [user description] to let them [solve problem x, have fun playing y]
- The fidelity of my application right now will be: [prototype, personal tool, alpha (for me and my friends), beta (for a small group of strangers), production (for the world)]
- The form factor of my app will be a [web app, mobile app, desktop app, CLI tool, API, browser extension] for [macOS, Windows, iOS, Android, all platforms]
- The most important features of my application are: 
    - [e.g. a shared calendar]
    - [a family todo list]
    - [a welcome message]
- Some key technology choices for my app are:
    - Programming language and framework based on form factor and preference:
        - [preferred language]
        - [preferred framework]
        - [preferred cloud provider]
    - Packages and libraries I've already researched:
        - [package 1]
        - [package 2]
    - Cloud services I've already researched:
        - [database]
        - [application hosting]
        - [other]

Create the spec so that it's ready for an AI coding agent to begin breaking it down into a phased task list. Don't include code or specific timelines or phases in the spec.
```

### If you need help brainstorming users and needs:

Try this exploration prompt:
```
I'm trying to decide who my users are and what they really need for my project in BRAINSTORM.md.

Help me think through:
- Who are the people that would actually use this? (be specific - not just "everyone")
- What are they trying to accomplish in their daily life/work?
- What's frustrating them right now about how they handle this?
- When and where would they use my solution?
- What would success look like from their perspective?
- Are there different types of users with different needs?
- What do they care about most: speed, simplicity, power, cost, etc.?

Ask me questions to help me get clearer on who I'm building for and what they really need.
```

### If you need help brainstorming application fidelity:

Try this exploration prompt:
```
I'm trying to decide what fidelity level to target for my project in BRAINSTORM.md.

Help me understand the different levels:
- Prototype: Just proving the concept works, rough around the edges
- Personal tool: Works well enough for me to use regularly
- Alpha: Good enough for friends/colleagues who know it's early
- Beta: Polished enough for strangers to try and give feedback
- Production: Ready for anyone to use and rely on

For each level, help me think through:
- How much time/effort would this require?
- What quality standards do I need to meet?
- How much testing and polish is needed?
- What happens if things break or don't work perfectly?
- What's my real goal - learning, solving my own problem, or building something others will use?

Based on my situation and goals, what fidelity level makes the most sense to start with?
```

### If you need help brainstorming form factors:

Try this exploration prompt:
```
I'm trying to decide what form factor would work best for BRAINSTORM.md. Take into account my application application fidelity will be [fidelity].

Walk me through the main options:
- Web application (and whether it needs to work offline)
- Mobile app (native vs web-based)
- Desktop application 
- Command line tool
- API/service that others can build on
- Browser extension
- Something else I might not have considered

For each option, help me think through:
- Who would use it and in what context?
- What are the unique advantages of this format?
- What would be challenging about building it this way?
- How would people discover and start using it?

Ask me clarifying questions about my users and use cases to help narrow it down.
```

### If you need help brainstorming important features:

Try this exploration prompt:
```
I'm trying to decide what the most important features should be for my project in BRAINSTORM.md.

Help me think through:
- What's the core action users need to take? (the one thing this must do well)
- What would the simplest version look like that still solves the problem?
- What features do I think are important vs. what users actually need?
- What would users expect to be able to do based on similar tools they've used?
- What features could wait for version 2?
- Are there any features that seem obvious but might actually be distracting?

Walk me through prioritizing features from "must have" to "nice to have" and help me question my assumptions about what's really needed.
```

### If you need help brainstorming key technology choices:

Try this exploration prompt:
```
I'm trying to decide on the technology stack for my project in BRAINSTORM.md.

I plan to use an AI code generation agent, so in general I want to optimize for that. Take into account my application application fidelity will be [fidelity].

Help me think through:
- Do I actually care which programming language is used (e.g. is there already existing code or libraries I need to work with)? What language would best suit the AI?
- Given my form factor choice, what are the standard/recommended frameworks?
- What's my software development experience level? Are there choices that might be more or less well suited to my background?
- Are there specific packages that I might want to consider that would influence my technology choices?
- What kind of interactions will there be between different users of the application, if any?
- Do I need a database? What kind of data am I storing?
- Where will this be hosted/deployed? What are my options?
- Are there any specific requirements (performance, integrations, etc.) that point to certain technologies?
- What would let me build fastest vs. what would be most maintainable long-term?

Suggest a simple tech stack that matches my skill level, project needs, and application fidelity and explain the trade-offs.
```

---

# Current Spec

