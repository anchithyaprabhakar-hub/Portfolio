/* ===================================================================
   Interactive Portfolio — full JS bundle
   =================================================================== */

// ─── Custom Cursor ──────────────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  const ease = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    curX += (mouseX - curX) * ease;
    curY += (mouseY - curY) * ease;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // Grow cursor on hoverable elements
  const hoverTargets = 'a, button, input, textarea, .skill-node, .project-card, .filter-btn, .terminal-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove('hover');
  });
})();

// ─── Background Music Toggle ────────────────────────────────────────
(function initMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');

  if (!btn || !audio) return;

  let isPlaying = false;

  async function startMusic() {
    try {
      audio.volume = 0.35;
      await audio.play();

      isPlaying = true;
      btn.classList.remove('muted');

      const label = btn.querySelector('.sound-label');
      if (label) {
        label.textContent = 'SOUND: ON';
      }
    } catch (error) {
      // Browser blocked autoplay.
      // Start music after the user's first interaction.
      isPlaying = false;
      btn.classList.add('muted');

      const label = btn.querySelector('.sound-label');
      if (label) {
        label.textContent = 'SOUND: OFF';
      }
    }
  }

  // Try to start automatically when the portfolio opens.
  startMusic();

  // Fallback for browsers that block autoplay.
  const startOnInteraction = () => {
    if (!isPlaying) {
      startMusic();
    }

    document.removeEventListener('click', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
    document.removeEventListener('touchstart', startOnInteraction);
  };

  document.addEventListener('click', startOnInteraction);
  document.addEventListener('keydown', startOnInteraction);
  document.addEventListener('touchstart', startOnInteraction);

  // Manual sound toggle.
  btn.addEventListener('click', async () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;

      btn.classList.add('muted');

      const label = btn.querySelector('.sound-label');
      if (label) {
        label.textContent = 'SOUND: OFF';
      }
    } else {
      try {
        audio.volume = 0.35;
        await audio.play();

        isPlaying = true;

        btn.classList.remove('muted');

        const label = btn.querySelector('.sound-label');
        if (label) {
          label.textContent = 'SOUND: ON';
        }
      } catch (error) {
        console.log('Music could not be started:', error);
      }
    }
  });
})();

// ─── Particle Canvas Background ─────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = 60;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
  }

  particles = Array.from({ length: COUNT }, () => new Particle());

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isLight = document.body.classList.contains('light-theme');
    const col = isLight ? '0,0,0' : '255,255,255';

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col}, 0.5)`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${col}, ${0.12 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── Theme Toggle ───────────────────────────────────────────────────
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Restore saved theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
})();

// ─── Live Time Display ──────────────────────────────────────────────
(function initTime() {
  const el = document.getElementById('time-display');
  if (!el) return;

  function update() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
    el.textContent = `${time}, IST • Bangalore`;
  }
  update();
  setInterval(update, 30000);
})();

// ─── Typewriter Effect ──────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Building intelligent web solutions',
    'Crafting seamless user experiences',
    'Full-stack developer & designer',
    'AI enthusiast & open-source lover'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 35);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 70);
    }
  }
  setTimeout(tick, 1000);
})();

// ─── Terminal Commands ──────────────────────────────────────────────
(function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  if (!input || !body) return;

  const commands = {
    help: `Available commands:
  <span style="color:var(--accent-1);font-weight:bold;">about</span>     — Who am I?
  <span style="color:var(--accent-1);font-weight:bold;">skills</span>    — My tech stack
  <span style="color:var(--accent-1);font-weight:bold;">contact</span>   — Get in touch
  <span style="color:var(--accent-1);font-weight:bold;">projects</span>  — View featured work
  <span style="color:var(--accent-1);font-weight:bold;">clear</span>     — Clear terminal
  <span style="color:var(--accent-1);font-weight:bold;">help</span>      — Show this message`,
    about: 'I am Anchithya Prabhakar — a Software Engineer passionate about full-stack development, AI, and clean code.',
    skills: 'HTML/CSS, JavaScript, React/Next.js, Node/Express, Python, SQL/NoSQL, Git, Docker, Generative AI.',
    contact: 'Email: anchithyaprabhakar@gmail.com\nLinkedIn: linkedin.com/in/anchithya-prabhakar-35bb2a2a9\nGitHub: github.com/anchithyaprabhakar-hub',
    projects: 'Navigate to the Projects section or type a project name: research-paper, aegis-nsai, dosetwin, scriptify',
    'aegis-nsai': 'AEGIS-NSAI: A full-stack Neuro-Symbolic AI intrusion detection platform that integrates machine learning, rule-based reasoning, and explainable AI to analyze cyber threats in real time.',
    'dosetwin': 'DoseTwin: A Digital Twin-powered medicine management platform for patients and caregivers with medicine tracking, analytics, inventory management and caregiver monitoring.',
    'scriptify': 'Scriptify runner: A fast shell-level helper tool to manage, tag, run, and document local developer script macros and run pipelines.',
    'research-paper': 'ARTINT-S-26-01436 Research Paper: An academic research paper on Neuro-Symbolic AI threat detection.'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    // Echo the command
    const echo = document.createElement('div');
    echo.className = 'terminal-output';
    echo.innerHTML = `<span style="color:var(--text-muted);">guest@ap:~$</span> ${cmd}`;
    body.insertBefore(echo, body.querySelector('.terminal-prompt-line'));

    if (cmd === 'clear') {
      body.querySelectorAll('.terminal-output').forEach(o => o.remove());
    } else {
      const output = document.createElement('div');
      output.className = 'terminal-output';
      output.innerHTML = commands[cmd] || `<span style="color:#ff6b6b;">Command not found:</span> ${cmd}. Type <span style="color:var(--accent-1);font-weight:bold;">help</span> for a list of commands.`;
      body.insertBefore(output, body.querySelector('.terminal-prompt-line'));
    }

    body.scrollTop = body.scrollHeight;
  });
})();

// ─── Project Filter Tabs ────────────────────────────────────────────
(function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

// ─── Back to Top ────────────────────────────────────────────────────
(function initBackToTop() {
  const control = document.getElementById('back-to-top-control');
  const btn = document.getElementById('back-to-top');
  if (!control || !btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      control.classList.add('show');
    } else {
      control.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── Scroll Reveal Animation ────────────────────────────────────────
(function initScrollReveal() {
  const items = document.querySelectorAll('.glass-card, .timeline-item, .section-title, .skill-node');
  if (!items.length || !('IntersectionObserver' in window)) return;

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
})();

// ─── Active Nav Link Highlighting ───────────────────────────────────
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

// ─── Contact Form Success Overlay ───────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const overlay = document.getElementById('success-overlay');
  const resetBtn = document.getElementById('reset-form-btn');
  if (!form || !overlay) return;

  // If returning from formsubmit redirect, show success
  if (document.referrer.includes('formsubmit.co')) {
    overlay.classList.add('show');
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      overlay.classList.remove('show');
      form.reset();
    });
  }
})();

/* ===================================================================
   Project details data & modal handler
   =================================================================== */

const projectDetails = {
'research-paper': {
    title: 'ARTINT-S-26-01436 Research Paper',

    tags: [
      'Research Paper',
      'PDF Document',
      'Academic'
    ],

    image: 'NSAI.png',

    meta: 'Research Paper • 2026',

    description: `Access the research paper PDF document. Click to open and read the full content.`,

    pdfFile: 'ARTINT-S-26-01436 Research paper.pdf',

    fullDetails: `
      <p>
        This research paper is available as a PDF document. Click on the project card to open and view the full content.
      </p>

      <p>
        <a href="ARTINT-S-26-01436 Research paper.pdf" target="_blank" style="color:var(--accent-2);text-decoration:none;">
          📄 Open PDF Document
        </a>
      </p>
    `
  },

  'aegis-nsai': {
    title: 'AEGIS-NSAI',
    tags: ['Neuro-Symbolic AI', 'React', 'FastAPI', 'Explainable AI'],
    image: 'placeholder_ai.png',
    meta: 'Developed in 2026 • Full Stack & AI Developer',
    description: `A full-stack Neuro-Symbolic AI intrusion detection platform that integrates machine learning, rule-based reasoning, and explainable AI to analyze cyber threats in real time through an interactive dashboard.`,
    fullDetails: `
      <p>AEGIS-NSAI is a state-of-the-art intrusion detection platform designed to detect complex cyber attacks. By combining the pattern-matching power of deep learning with the logical guarantees of rule-based symbolic reasoning, it offers both high detection accuracy and explainable AI (XAI) outputs for security analysts.</p>

      <h4 style="margin:1.5rem 0 0.5rem;color:var(--accent-2);">
        Key Features & Architecture
      </h4>

      <ul style="padding-left:1.25rem;margin-bottom:1rem;color:var(--text-muted);">
        <li><strong>Neuro-Symbolic Reasoning:</strong> Integrates neural network threat classification with symbolic First-Order Logic rules to verify decisions and prevent false positives.</li>
        <li><strong>Explainable AI (XAI):</strong> Generates natural language explanations and logic proofs showing exactly why a specific network packet or behavior was flagged as malicious.</li>
        <li><strong>Real-time Analytics Dashboard:</strong> Interactive React frontend with dynamic graphs, real-time threat maps, and instant warning streams via WebSockets.</li>
        <li><strong>Scalable Backend:</strong> High-performance FastAPI backend processing network packets with automated threat signature matching.</li>
      </ul>

      <p>Designed to help security operations centers (SOC) make faster, more informed decisions with clear reasonings behind every AI threat flag, bridging the gap between accuracy and interpretability.</p>
    `
  },

  'dosetwin': {
  title: 'DoseTwin',

  tags: [
    'React',
    'Digital Twin',
    'Firebase',
    'Healthcare',
    'Dashboard'
  ],

  image: 'DoseTwin.png',

  meta: 'Smart Medicine Management Platform • 2026',

  description: `A Digital Twin-powered medicine management platform for patients and caregivers.`,

  fullDetails: `
    <p>
      DoseTwin is an intelligent medicine management platform built around a live Digital Twin of a medicine dispenser. It enables users and caregivers to monitor medication schedules, inventory, adherence, and health insights through an interactive dashboard.
    </p>

    <h4 style="margin:1.5rem 0 0.5rem;color:var(--accent-2);">
      Key Features
    </h4>

    <ul style="padding-left:1.25rem;margin-bottom:1rem;color:var(--text-muted);">
      <li>Digital Twin visualization of medicine dispenser.</li>
      <li>Medicine inventory tracking.</li>
      <li>Medication reminders.</li>
      <li>Caregiver monitoring dashboard.</li>
      <li>Analytics and adherence reports.</li>
      <li>Responsive React interface.</li>
    </ul>

    <p>
      Built using React, Vite, Firebase, Recharts and modern UI principles to improve medication adherence and healthcare management.
    </p>
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

      <h4 style="margin:1.5rem 0 0.5rem;color:var(--accent-2);">
        Key Features & Implementation
      </h4>

      <ul style="padding-left:1.25rem;margin-bottom:1rem;color:var(--text-muted);">
        <li>Categorize and tag commands (e.g. build, deploy, lint, debug).</li>
        <li>Shell execution sandbox protecting production environment variables.</li>
        <li>Autocomplete integrations for Zsh and Bash environments.</li>
        <li>Beautiful CLI output rendering utilizing custom ANSI formatters.</li>
      </ul>

      <p>Written in structured TypeScript for type safety and compiled into an NPM utility. Leverages native Node.js <code>child_process</code> modules with optimized stream piping for zero-lag terminal logging.</p>
    `
  }
};

// Project Details Modal Handler
document.addEventListener('DOMContentLoaded', function() {
  const detailButtons = document.querySelectorAll('.open-details-btn');
  const dialog = document.getElementById('project-dialog');
  const dialogBody = document.getElementById('dialog-body');
  const closeBtn = document.getElementById('dialog-close');

  detailButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const project = projectDetails[projectId];

      if (project) {
        // Populate dialog with project details
        const titleElement = document.getElementById('dialog-title');
        titleElement.textContent = project.title;

        dialogBody.innerHTML = `
          <div class="project-detail-container">
            <img src="${project.image}" alt="${project.title}" class="project-detail-image" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;">
            <div class="project-meta" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
              ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <p class="project-meta-info" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">${project.meta}</p>
            <div class="project-full-details" style="color: var(--text-secondary); line-height: 1.6;">
              ${project.fullDetails}
            </div>
          </div>
        `;

        // Show the dialog
        dialog.showModal();
      }
    });
  });

  // Close button handler
  closeBtn.addEventListener('click', function() {
    dialog.close();
  });

  // Close dialog when clicking outside
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) {
      dialog.close();
    }
  });
});