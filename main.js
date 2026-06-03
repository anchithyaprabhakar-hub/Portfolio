// Project details data for dialog popups
const projectDetails = {
  'ai-workspace': {
    title: 'AI-Driven Workspace Agent',
    tags: ['Gemini API', 'NodeJS', 'Vite', 'CSS Grid'],
    image: 'placeholder_ai.png',
    meta: 'Developed in 2025 • Lead Engineer',
    description: `An intelligent dashboard agent that analyzes workspace documents, generates semantic action plans, and schedules tasks dynamically. Built to bridge the gap between static documents and actionable tasks.`,
    fullDetails: `
      <p>This project was built to solve productivity bottlenecks in distributed teams. By leveraging advanced generative AI models via the Gemini API, the workspace agent parses documentation, extracts actionable items, and syncs them directly into team backlogs.</p>
      <h4 style="margin: 1.5rem 0 0.5rem 0; color: var(--accent-2);">Key Features & Implementation</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li>Multi-format document parsing (Markdown, PDF, HTML, JSON).</li>
        <li>Generative agentic task planning using the Google Antigravity SDK.</li>
        <li>Interactive graph dashboard displaying project dependencies.</li>
        <li>Secure local database storage with periodic cloud sync.</li>
      </ul>
      <p>The frontend uses vanilla CSS with modern flex/grid layouts and CSS transitions. The backend is designed as an optimized, lightweight Express API service to ensure speed and low memory footprints.</p>
    `
  },
  'collab-board': {
    title: 'CollabBoard',
    tags: ['WebSockets', 'Express', 'PostgreSQL', 'Canvas API'],
    image: 'placeholder_collab.png',
    meta: 'Developed in 2024 • Full Stack Dev',
    description: `A real-time whiteboard app allowing distributed teams to brainstorm, drag items, sync workspaces, and review versions. Built from the ground up for seamless communication.`,
    fullDetails: `
      <p>CollabBoard is a collaborative vector-drawing and sticky-note canvas designed for speed and simplicity. Standard collaboration tools suffer from lag; this project solves that by utilizing direct WebSocket connections with minimal data overhead.</p>
      <h4 style="margin: 1.5rem 0 0.5rem 0; color: var(--accent-2);">Key Features & Implementation</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li>Ultra-low latency draw operations with raw HTML5 Canvas.</li>
        <li>Conflict resolution using Operational Transformation (OT) rules.</li>
        <li>Drag-and-drop sticky notes with custom color-mix properties.</li>
        <li>User presence indicators showing active cursors in real-time.</li>
      </ul>
      <p>Built with PostgreSQL to store coordinates and board configurations. The CSS is designed to scale dynamically for tablets and desktop displays, with fully responsive viewports.</p>
    `
  },
  'scriptify': {
    title: 'Scriptify Runner',
    tags: ['TypeScript', 'Shell', 'CLI', 'NodeJS'],
    image: 'placeholder_cli.png',
    meta: 'Developed in 2024 • Creator & Dev',
    description: `A fast shell-level helper tool to manage, tag, run, and document local developer script macros and run pipelines securely.`,
    fullDetails: `
      <p>Developers frequently deal with dozens of project-specific shell scripts. Scriptify provides an intuitive graphical command dashboard alongside a command-line runner to organize, explain, and trigger project commands easily.</p>
      <h4 style="margin: 1.5rem 0 0.5rem 0; color: var(--accent-2);">Key Features & Implementation</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-muted);">
        <li>Categorize and tag commands (e.g. build, deploy, lint, debug).</li>
        <li>Shell execution sandbox protecting production environment variables.</li>
        <li>Autocomplete integrations for Zsh and Bash environments.</li>
        <li>Beautiful CLI output rendering utilizing custom ANSI formatters.</li>
      </ul>
      <p>Written in structured TypeScript for type safety and compiled into an NPM utility. Leverages native Node.js <code>child_process</code> modules with optimized stream piping for zero-lag terminal logging.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTypewriter();
  initParticles();
  initTerminal();
  initThemeToggle();
  initProjectFiltering();
  initProjectDialog();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   Custom Cursor Logic
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const speed = 0.15; // Smoothness factor

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation loop to smooth cursor follow
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * speed;
    cursorY += dy * speed;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover states
  const interactables = document.querySelectorAll('a, button, input, textarea, .filter-btn, .skill-node, .open-details-btn');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ==========================================================================
   Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const words = ['Building intelligent web solutions.', 'Designing premium experiences.', 'Full-Stack Developer & Innovator.', 'Problem solver & systems builder.'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 2000; // Time displaying complete word

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = delay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   Interactive Particles Background
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 25000));
  const connectionDistance = 120;
  let mouse = { x: null, y: null, radius: 150 };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce boundaries
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction (repel)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx / dist * force * 1.5;
          this.y -= dy / dist * force * 1.5;
        }
      }
    }

    draw() {
      const isLight = document.body.classList.contains('light-theme');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.25)';
      ctx.fill();
    }
  }

  function setupParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connection lines
    const isLight = document.body.classList.contains('light-theme');
    const lineColor = isLight ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - (dist / connectionDistance)) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = lineColor + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupParticles();
    }, 200);
  });

  setupParticles();
  animate();
}

/* ==========================================================================
   Retro Interactive CLI Terminal
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  if (!terminalInput || !terminalBody) return;

  // Make whole terminal widget focus input on click
  const terminalWidget = document.querySelector('.terminal-widget');
  terminalWidget.addEventListener('click', () => {
    terminalInput.focus();
  });

  const commands = {
    help: 'List available commands: help, about, skills, projects, experience, contact, clear',
    about: 'Prints brief background bio about Anchithya.',
    skills: 'Shows a retro skill-level ASCII matrix chart.',
    projects: 'Summarizes key software engineering projects.',
    experience: 'Lists relevant educational and work history.',
    contact: 'Displays email and contact channels.',
    clear: 'Clears the terminal history.'
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim();
      const command = inputVal.toLowerCase().split(' ')[0];
      
      // Echo command
      appendOutput(`guest@ap:~$ ${inputVal}`, 'terminal-prompt');

      if (command) {
        handleCommand(command);
      }
      
      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function handleCommand(cmd) {
    switch (cmd) {
      case 'help':
        let helpText = 'Available commands:\n';
        for (const [name, desc] of Object.entries(commands)) {
          helpText += `  <span style="color: var(--accent-2); font-weight: bold;">${name.padEnd(12)}</span> - ${desc}\n`;
        }
        appendOutput(helpText);
        break;
      
      case 'about':
        appendOutput(`Name: Anchithya Prabhakar
Role: Software Engineer / Web Architect
Focus: Full Stack, Intelligent Apps, Performance

Bio: I build high-speed client-side interfaces and scalable backend solutions.
Currently completing Computer Science degree and seeking placement opportunities.
I specialize in responsive designs, performance tuning, and clean software architecture.`);
        break;

      case 'skills':
        appendOutput(`Skills Matrix:
  HTML/CSS/JS  [█████████░] 90% (Proficient)
  React/NextJS [████████░░] 80% (Advanced)
  Node/Express [████████░░] 80% (Advanced)
  Python/APIs  [███████░░░] 70% (Intermediate)
  Git/GitHub   [█████████░] 90% (Proficient)
  Docker       [██████░░░░] 60% (Familiar)
  AI/LLM Sync  [████████░░] 80% (Advanced)`);
        break;

      case 'projects':
        appendOutput(`Projects list:
1. <span style="color: var(--accent-1); font-weight:bold;">AI Workspace Agent</span> - Workspace document planner utilizing Gemini API.
2. <span style="color: var(--accent-1); font-weight:bold;">CollabBoard</span> - Real-time websocket brainstorming sticky canvas.
3. <span style="color: var(--accent-1); font-weight:bold;">Scriptify Runner</span> - Fast local project shell-command helper.

Type <span style="color: var(--accent-2);">projects --details</span> or scroll down to the "Featured Work" section to view complete profiles.`);
        break;

      case 'experience':
        appendOutput(`Milestones:
* 2025 - Present: Open Source developer (Vite tools, LLM workflows)
* 2024 (Summer): TechInnovate Solutions (Software Engineer Intern)
* 2022 - 2026: Global Institute of Technology (BS Computer Science)`);
        break;

      case 'contact':
        appendOutput(`Let's connect:
* Email: <a href="mailto:anchithya@example.com" style="text-decoration: underline; color: var(--accent-2);">anchithya@example.com</a>
* GitHub: <a href="https://github.com" target="_blank" style="text-decoration: underline; color: var(--accent-2);">github.com</a>
* LinkedIn: <a href="https://linkedin.com" target="_blank" style="text-decoration: underline; color: var(--accent-2);">linkedin.com</a>

Or use the "Let's Connect" form below to send an direct message!`);
        break;

      case 'clear':
        // Find all outputs and prompts except terminal welcome and the current input line
        const outputLines = terminalBody.querySelectorAll('.terminal-output');
        outputLines.forEach(line => line.remove());
        break;

      default:
        appendOutput(`Command not found: <span style="text-decoration: line-through; color: var(--text-muted);">${cmd}</span>. Type <span style="color: var(--text-muted);">help</span> to view all commands.`);
    }
  }

  function appendOutput(htmlContent, className = '') {
    const div = document.createElement('div');
    div.className = 'terminal-output ' + className;
    div.innerHTML = htmlContent;
    // Insert before the prompt line
    const promptLine = terminalBody.querySelector('.terminal-prompt-line');
    terminalBody.insertBefore(div, promptLine);
  }
}

/* ==========================================================================
   Theme Toggling (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
}

/* ==========================================================================
   Projects Grid Category Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          // Small delay for fade transition
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Accessible HTML5 <dialog> Modals
   ========================================================================== */
function initProjectDialog() {
  const dialog = document.getElementById('project-dialog');
  const openButtons = document.querySelectorAll('.open-details-btn');
  const closeButton = document.getElementById('dialog-close');
  const dialogBody = document.getElementById('dialog-body');

  if (!dialog || !closeButton || !dialogBody) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const data = projectDetails[projectKey];

      if (data) {
        // Populate modal data
        dialogBody.innerHTML = `
          <img src="${data.image}" alt="${data.title} Mockup Preview" style="width: 100%; border-radius: 8px; margin-bottom: 1.5rem;">
          <div class="dialog-tag-container">
            ${data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${data.title}</h2>
          <div class="dialog-meta" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">${data.meta}</div>
          <p style="font-weight: 500; font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-main);">${data.description}</p>
          <hr style="border: 0; border-top: 1px solid var(--border-color); margin-bottom: 1.5rem;">
          <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);">${data.fullDetails}</div>
        `;
        
        dialog.showModal();
        // Remove scroll from body when modal is open
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close dialog functions
  const closeDialog = () => {
    dialog.close();
    document.body.style.overflow = 'auto';
  };

  closeButton.addEventListener('click', closeDialog);

  // Close on clicking backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      closeDialog();
    }
  });

  dialog.addEventListener('cancel', () => {
    document.body.style.overflow = 'auto';
  });
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const overlay = document.getElementById('success-overlay');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form || !overlay || !resetBtn) return;

  form.addEventListener('submit', () => {
    // Show loading state while redirecting to FormSubmit
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = `<span>Redirecting...</span>`;
  });

  resetBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
  });
}

/* ==========================================================================
   Active Navigation Link ScrollSpy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('nav a.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // offset header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
