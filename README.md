# Runs

![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/run-app)
<a target="_blank" href="https://github.com/Siphon880gh/run-app" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

:page_facing_up: Description:
---
By Weng Fei Fung. I feel inspired to tackle a 3 mile run, and I need to make a running app that I can control in the next few hours before I lose that motivation.

:open_file_folder: Table of Contents:
---
- [Description](#description)
- [Live Demo](#computer-live-demo)
- [Preview](#camera-preview)
- [Installation and Usage](#minidisc-installation-and-usage)
- [Future Version](#e-mail-meet-the-team)

:computer: Live Demo:
---
<a href="https://siphon880gh.github.io/run-app/" target="_blank">Check it out</a>

:camera: Preview:
---
![image](/docs/weeks.png)

![image](/docs/week.png)

## :minidisc: Installation and Advance Use:
Run as a HTML file. No needed hands-on setup. Your running goals and tasks are saved on your device, preferably on the same phone you bring with you on your runs.

If you want to tweak the weeks and interval. How it works is index.html is just pure HTML that links to programs/_program_/week#.html. That's just a convention to keep things structured. You can add HTML as you like and structure the folders/files of program and weeks however you want. 

At the actual week HTML file, notice there's Javascript mixed into the HTML. This was done purposely so you can create as many weeks as possible without linking to new JS files. Anyhow, you can just edit the intervals array with the desire time and the desire type of run (walk, jog, run). The type can really be any word. You can change the color of the active interval at colorOnTypeWildcard object using hex, rgba, rgb, or color; this object's keys are just partial searches of the type; so you can have different colors for run, walk, jog, or whatever word you use.

## :crystal_ball: Future version
- Further customization by the user rather than having to code it. So will upgrade from jQuery (great for rapid development) to React (more maintenable and scalable).