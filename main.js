/* ===================================================================
   Interactive Portfolio — Full JavaScript Bundle
   =================================================================== */


/* ===================================================================
   CUSTOM CURSOR
   =================================================================== */

(function initCursor() {
  const cursor = document.getElementById('custom-cursor');

  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let curX = 0;
  let curY = 0;

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

  const hoverTargets =
    'a, button, input, textarea, .skill-node, .project-card, .filter-btn, .terminal-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hover');
    }
  });
})();


/* ===================================================================
   BACKGROUND MUSIC
   =================================================================== */

(function initMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');

  if (!btn || !audio) return;

  let isPlaying = false;

  function updateButton() {
    const label = btn.querySelector('.sound-label');

    if (isPlaying) {
      btn.classList.remove('muted');

      if (label) {
        label.textContent = 'SOUND: ON';
      }
    } else {
      btn.classList.add('muted');

      if (label) {
        label.textContent = 'SOUND: OFF';
      }
    }
  }

  /*
    Start music.
  */
  function startMusic() {
    if (isPlaying) return;

    audio.volume = 0.35;

    audio.play()
      .then(() => {
        isPlaying = true;

        updateButton();

        removeActivationListeners();
      })
      .catch(() => {
        /*
          Browser blocked autoplay.
          We wait for user interaction.
        */
      });
  }


  /*
    Remove all activation listeners after
    music has successfully started.
  */
  function removeActivationListeners() {
    activationEvents.forEach((eventName) => {
      document.removeEventListener(
        eventName,
        handleUserInteraction
      );
    });
  }


  /*
    User interaction handler.
  */
  function handleUserInteraction() {
    startMusic();
  }


  /*
    Events that can activate music if autoplay
    was blocked by the browser.

    click
    touchstart
    keydown
    wheel = mouse scrolling
    pointerdown = mouse/touch interaction
  */
  const activationEvents = [
    'click',
    'touchstart',
    'keydown',
    'wheel',
    'pointerdown'
  ];


  /*
    Add activation listeners.
  */
  activationEvents.forEach((eventName) => {
    document.addEventListener(
      eventName,
      handleUserInteraction,
      {
        passive: true
      }
    );
  });


  /*
    Try to start automatically when the
    portfolio opens.
  */
  startMusic();


  /*
    Manual SOUND ON/OFF button.

    stopPropagation() is important here.

    Without it, clicking SOUND: OFF would:
      1. Pause the music
      2. Trigger document click
      3. Immediately start the music again

    stopPropagation prevents that.
  */
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (isPlaying) {

      audio.pause();

      isPlaying = false;

      updateButton();

    } else {

      audio.volume = 0.35;

      audio.play()
        .then(() => {
          isPlaying = true;

          updateButton();

          removeActivationListeners();
        })
        .catch(() => {});
    }
  });


  /*
    Initial button state.
  */
  updateButton();

})();


/* ===================================================================
   PARTICLE CANVAS BACKGROUND
   =================================================================== */

(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let w;
  let h;
  let particles;

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


  particles = Array.from(
    { length: COUNT },
    () => new Particle()
  );


  function draw() {
    ctx.clearRect(0, 0, w, h);

    const isLight =
      document.body.classList.contains('light-theme');

    const col =
      isLight
        ? '0,0,0'
        : '255,255,255';


    particles.forEach((p) => {

      p.x += p.vx;
      p.y += p.vy;


      if (p.x < 0 || p.x > w) {
        p.vx *= -1;
      }


      if (p.y < 0 || p.y > h) {
        p.vy *= -1;
      }


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(${col}, 0.5)`;

      ctx.fill();
    });


    /*
      Draw connecting lines.
    */
    for (let i = 0; i < particles.length; i++) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const dx =
          particles[i].x -
          particles[j].x;

        const dy =
          particles[i].y -
          particles[j].y;

        const dist =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (dist < 140) {

          ctx.beginPath();

          ctx.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx.strokeStyle =
            `rgba(${col}, ${
              0.12 * (1 - dist / 140)
            })`;

          ctx.lineWidth = 0.6;

          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

})();


/* ===================================================================
   THEME TOGGLE
   =================================================================== */

(function initTheme() {
  const btn =
    document.getElementById('theme-toggle');

  if (!btn) return;


  /*
    Restore saved theme.
  */
  if (
    localStorage.getItem('theme') ===
    'light'
  ) {
    document.body.classList.add(
      'light-theme'
    );
  }


  btn.addEventListener('click', () => {

    document.body.classList.toggle(
      'light-theme'
    );

    localStorage.setItem(
      'theme',
      document.body.classList.contains(
        'light-theme'
      )
        ? 'light'
        : 'dark'
    );

  });

})();


/* ===================================================================
   LIVE TIME DISPLAY
   =================================================================== */

(function initTime() {
  const el =
    document.getElementById(
      'time-display'
    );

  if (!el) return;


  function update() {

    const now = new Date();

    const time =
      now.toLocaleTimeString(
        'en-US',
        {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata'
        }
      );


    el.textContent =
      `${time}, IST • Bangalore`;
  }


  update();

  setInterval(
    update,
    30000
  );

})();


/* ===================================================================
   TYPEWRITER EFFECT
   =================================================================== */

(function initTypewriter() {

  const el =
    document.getElementById(
      'typewriter-text'
    );

  if (!el) return;


  const phrases = [
    'Building intelligent web solutions',
    'Crafting seamless user experiences',
    'Full-stack developer & designer',
    'AI enthusiast & open-source lover'
  ];


  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;


  function tick() {

    const current =
      phrases[phraseIdx];


    if (deleting) {

      charIdx--;

      el.textContent =
        current.substring(
          0,
          charIdx
        );


      if (charIdx === 0) {

        deleting = false;

        phraseIdx =
          (phraseIdx + 1) %
          phrases.length;

        setTimeout(
          tick,
          400
        );

        return;
      }


      setTimeout(
        tick,
        35
      );

    } else {

      charIdx++;

      el.textContent =
        current.substring(
          0,
          charIdx
        );


      if (
        charIdx ===
        current.length
      ) {

        deleting = true;

        setTimeout(
          tick,
          1800
        );

        return;
      }


      setTimeout(
        tick,
        70
      );
    }
  }


  setTimeout(
    tick,
    1000
  );

})();


/* ===================================================================
   TERMINAL COMMANDS
   =================================================================== */

(function initTerminal() {

  const input =
    document.getElementById(
      'terminal-input'
    );

  const body =
    document.getElementById(
      'terminal-body'
    );

  if (!input || !body) return;


  const commands = {

    help: `
Available commands:

  <span style="color:var(--accent-1);font-weight:bold;">about</span>
      — Who am I?

  <span style="color:var(--accent-1);font-weight:bold;">skills</span>
      — My tech stack

  <span style="color:var(--accent-1);font-weight:bold;">contact</span>
      — Get in touch

  <span style="color:var(--accent-1);font-weight:bold;">projects</span>
      — View featured work

  <span style="color:var(--accent-1);font-weight:bold;">clear</span>
      — Clear terminal

  <span style="color:var(--accent-1);font-weight:bold;">help</span>
      — Show this message
`,

    about:
      'I am Anchithya Prabhakar — a Software Engineer passionate about full-stack development, AI, and clean code.',

    skills:
      'HTML/CSS, JavaScript, React/Next.js, Node/Express, Python, SQL/NoSQL, Git, Docker, Generative AI.',

    contact:
      'Email: anchithyaprabhakar@gmail.com\nLinkedIn: linkedin.com/in/anchithya-prabhakar-35bb2a2a9\nGitHub: github.com/anchithyaprabhakar-hub',

    projects:
      'Navigate to the Projects section or type a project name: research-paper, aegis-nsai, dosetwin, scriptify',

    'aegis-nsai':
      'AEGIS-NSAI: A full-stack Neuro-Symbolic AI intrusion detection platform that integrates machine learning, rule-based reasoning, and explainable AI to analyze cyber threats in real time.',

    dosetwin:
      'DoseTwin: A Digital Twin-powered medicine management platform for patients and caregivers with medicine tracking, analytics, inventory management and caregiver monitoring.',

    scriptify:
      'Scriptify Runner: A fast shell-level helper tool to manage, tag, run, and document local developer script macros and pipelines.',

    'research-paper':
      'ARTINT-S-26-01436 Research Paper: An academic research paper on Neuro-Symbolic AI threat detection.'
  };


  input.addEventListener(
    'keydown',
    (e) => {

      if (e.key !== 'Enter') return;


      const cmd =
        input.value
          .trim()
          .toLowerCase();


      input.value = '';


      if (!cmd) return;


      /*
        Echo command.
      */
      const echo =
        document.createElement(
          'div'
        );

      echo.className =
        'terminal-output';

      echo.innerHTML =
        `<span style="color:var(--text-muted);">guest@ap:~$</span> ${cmd}`;


      body.insertBefore(
        echo,
        body.querySelector(
          '.terminal-prompt-line'
        )
      );


      /*
        Clear terminal.
      */
      if (cmd === 'clear') {

        body
          .querySelectorAll(
            '.terminal-output'
          )
          .forEach(
            (o) => o.remove()
          );

      } else {

        const output =
          document.createElement(
            'div'
          );

        output.className =
          'terminal-output';


        output.innerHTML =
          commands[cmd] ||
          `<span style="color:#ff6b6b;">
            Command not found:
          </span>
          ${cmd}.
          Type
          <span style="color:var(--accent-1);font-weight:bold;">
            help
          </span>
          for a list of commands.`;


        body.insertBefore(
          output,
          body.querySelector(
            '.terminal-prompt-line'
          )
        );
      }


      body.scrollTop =
        body.scrollHeight;
    }
  );

})();


/* ===================================================================
   PROJECT FILTER TABS
   =================================================================== */

(function initFilters() {

  const buttons =
    document.querySelectorAll(
      '.filter-btn'
    );

  const cards =
    document.querySelectorAll(
      '.project-card'
    );


  if (!buttons.length) return;


  buttons.forEach((btn) => {

    btn.addEventListener(
      'click',
      () => {

        buttons.forEach((b) => {

          b.classList.remove(
            'active'
          );

          b.setAttribute(
            'aria-selected',
            'false'
          );

        });


        btn.classList.add(
          'active'
        );

        btn.setAttribute(
          'aria-selected',
          'true'
        );


        const filter =
          btn.dataset.filter;


        cards.forEach((card) => {

          if (
            filter === 'all' ||
            card.dataset.category ===
              filter
          ) {

            card.style.display = '';

            card.style.opacity =
              '1';

            card.style.transform =
              'scale(1)';

          } else {

            card.style.opacity =
              '0';

            card.style.transform =
              'scale(0.95)';


            setTimeout(() => {

              card.style.display =
                'none';

            }, 300);
          }

        });

      }
    );

  });

})();


/* ===================================================================
   BACK TO TOP
   =================================================================== */

(function initBackToTop() {

  const control =
    document.getElementById(
      'back-to-top-control'
    );

  const btn =
    document.getElementById(
      'back-to-top'
    );


  if (!control || !btn) return;


  window.addEventListener(
    'scroll',
    () => {

      if (
        window.scrollY > 400
      ) {

        control.classList.add(
          'show'
        );

      } else {

        control.classList.remove(
          'show'
        );

      }

    },
    {
      passive: true
    }
  );


  btn.addEventListener(
    'click',
    () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  );

})();


/* ===================================================================
   SCROLL REVEAL ANIMATION
   =================================================================== */

(function initScrollReveal() {

  const items =
    document.querySelectorAll(
      '.glass-card, .timeline-item, .section-title, .skill-node'
    );


  if (
    !items.length ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }


  items.forEach((el) => {

    el.style.opacity = '0';

    el.style.transform =
      'translateY(30px)';

    el.style.transition =
      'opacity 0.6s ease, transform 0.6s ease';

  });


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                '1';

              entry.target.style.transform =
                'translateY(0)';

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );


  items.forEach((el) => {

    observer.observe(el);

  });

})();


/* ===================================================================
   ACTIVE NAV LINK HIGHLIGHTING
   =================================================================== */

(function initNavHighlight() {

  const sections =
    document.querySelectorAll(
      'section[id]'
    );

  const navLinks =
    document.querySelectorAll(
      '.nav-link'
    );


  if (
    !sections.length ||
    !navLinks.length
  ) {
    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const id =
                entry.target.id;


              navLinks.forEach(
                (link) => {

                  link.classList.toggle(
                    'active',
                    link.getAttribute(
                      'href'
                    ) ===
                      '#' + id
                  );

                }
              );

            }

          }
        );

      },
      {
        rootMargin:
          '-40% 0px -55% 0px'
      }
    );


  sections.forEach(
    (section) => {
      observer.observe(section);
    }
  );

})();


/* ===================================================================
   CONTACT FORM SUCCESS OVERLAY
   =================================================================== */

(function initContactForm() {

  const form =
    document.getElementById(
      'contact-form'
    );

  const overlay =
    document.getElementById(
      'success-overlay'
    );

  const resetBtn =
    document.getElementById(
      'reset-form-btn'
    );


  if (!form || !overlay) return;


  /*
    Show success overlay after
    FormSubmit redirect.
  */
  if (
    document.referrer.includes(
      'formsubmit.co'
    )
  ) {

    overlay.classList.add(
      'show'
    );

  }


  if (resetBtn) {

    resetBtn.addEventListener(
      'click',
      () => {

        overlay.classList.remove(
          'show'
        );

        form.reset();

      }
    );

  }

})();


/* ===================================================================
   PROJECT DETAILS DATA
   =================================================================== */

const projectDetails = {


  /* ─────────────────────────────────────────────
     RESEARCH PAPER
     ───────────────────────────────────────────── */

  'research-paper': {

    title:
      'ARTINT-S-26-01436 Research Paper',

    tags: [
      'Research Paper',
      'PDF Document',
      'Academic'
    ],

    image:
      'NSAI.png',

    meta:
      'Research Paper • 2026',

    description:
      'Access the research paper PDF document. Click to open and read the full content.',

    pdfFile:
      'ARTINT-S-26-01436 Research paper.pdf',

    fullDetails: `

      <p>
        This research paper is available as a PDF
        document. Click below to open and view
        the complete research paper.
      </p>

      <p>

        <a
          href="ARTINT-S-26-01436 Research paper.pdf"
          target="_blank"
          rel="noopener"
          style="
            color:var(--accent-2);
            text-decoration:none;
          "
        >
          📄 Open PDF Document
        </a>

      </p>

    `
  },


  /* ─────────────────────────────────────────────
     AEGIS-NSAI
     ───────────────────────────────────────────── */

  'aegis-nsai': {

    title:
      'AEGIS-NSAI',

    tags: [
      'Neuro-Symbolic AI',
      'React',
      'FastAPI',
      'Explainable AI'
    ],

    image:
      'AEGIS-NSAI.png',

    meta:
      'Developed in 2026 • Full Stack & AI Developer',

    description:
      'A full-stack Neuro-Symbolic AI intrusion detection platform that integrates machine learning, rule-based reasoning, and explainable AI to analyze cyber threats in real time through an interactive dashboard.',

    fullDetails: `

      <p>
        AEGIS-NSAI is a full-stack Neuro-Symbolic AI
        intrusion detection platform designed to
        detect and analyze complex cyber threats.
      </p>

      <p>
        The platform combines neural network based
        threat classification with symbolic reasoning
        and explainable AI to provide both intelligent
        detection and understandable security decisions.
      </p>


      <h4
        style="
          margin:1.5rem 0 0.5rem;
          color:var(--accent-2);
        "
      >
        Key Features & Architecture
      </h4>


      <ul
        style="
          padding-left:1.25rem;
          margin-bottom:1rem;
          color:var(--text-muted);
        "
      >

        <li>
          <strong>
            Neuro-Symbolic Reasoning:
          </strong>

          Combines machine learning based
          classification with symbolic rules
          to verify threat decisions.
        </li>


        <li>
          <strong>
            Explainable AI:
          </strong>

          Provides understandable explanations
          for detected cyber threats.
        </li>


        <li>
          <strong>
            Interactive Dashboard:
          </strong>

          React-based interface for viewing
          predictions, confidence levels,
          explanations and threat information.
        </li>


        <li>
          <strong>
            FastAPI Backend:
          </strong>

          Python-based backend for processing
          threat prediction requests.
        </li>

      </ul>


      <p>
        AEGIS-NSAI focuses on bridging the gap
        between AI detection accuracy and
        explainability in cybersecurity.
      </p>

    `
  },


  /* ─────────────────────────────────────────────
     DOSETWIN
     ───────────────────────────────────────────── */

  'dosetwin': {

    title:
      'DoseTwin',

    tags: [
      'React',
      'Digital Twin',
      'Firebase',
      'Healthcare',
      'Dashboard'
    ],

    image:
      'DoseTwin.png',

    meta:
      'Smart Medicine Management Platform • 2026',

    description:
      'A Digital Twin-powered medicine management platform for patients and caregivers.',

    fullDetails: `

      <p>
        DoseTwin is an intelligent medicine
        management platform built around a
        Digital Twin of a medicine dispenser.
      </p>


      <p>
        The platform helps users and caregivers
        monitor medication schedules, inventory,
        adherence and health-related insights
        through an interactive dashboard.
      </p>


      <h4
        style="
          margin:1.5rem 0 0.5rem;
          color:var(--accent-2);
        "
      >
        Key Features
      </h4>


      <ul
        style="
          padding-left:1.25rem;
          margin-bottom:1rem;
          color:var(--text-muted);
        "
      >

        <li>
          Digital Twin visualization of
          medicine dispenser.
        </li>


        <li>
          Medicine inventory tracking.
        </li>


        <li>
          Medication reminders.
        </li>


        <li>
          Caregiver monitoring dashboard.
        </li>


        <li>
          Analytics and adherence reports.
        </li>


        <li>
          Responsive React interface.
        </li>

      </ul>


      <p>
        Built using React, Vite, Firebase,
        Recharts and modern UI principles
        to improve medication management
        and adherence.
      </p>

    `
  },


  /* ─────────────────────────────────────────────
     SCRIPTIFY
     ───────────────────────────────────────────── */

  'scriptify': {

    title:
      'Scriptify Runner',

    tags: [
      'TypeScript',
      'Shell',
      'CLI',
      'NodeJS'
    ],

    image:
      'placeholder_cli.png',

    meta:
      'Developed in 2024 • Creator & Dev',

    description:
      'A fast shell-level helper tool to manage, tag, run, and document local developer script macros and run pipelines securely.',

    fullDetails: `

      <p>
        Scriptify is a developer-focused
        shell-level helper tool for managing
        and running local development scripts.
      </p>


      <h4
        style="
          margin:1.5rem 0 0.5rem;
          color:var(--accent-2);
        "
      >
        Key Features
      </h4>


      <ul
        style="
          padding-left:1.25rem;
          margin-bottom:1rem;
          color:var(--text-muted);
        "
      >

        <li>
          Categorize and tag commands.
        </li>

        <li>
          Shell execution support.
        </li>

        <li>
          Autocomplete integrations.
        </li>

        <li>
          Custom terminal output formatting.
        </li>

      </ul>


      <p>
        Written in TypeScript with Node.js
        tooling for developer workflows.
      </p>

    `
  }

};


/* ===================================================================
   PROJECT DETAILS MODAL HANDLER
   =================================================================== */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    const detailButtons =
      document.querySelectorAll(
        '.open-details-btn'
      );


    const dialog =
      document.getElementById(
        'project-dialog'
      );


    const dialogBody =
      document.getElementById(
        'dialog-body'
      );


    const closeBtn =
      document.getElementById(
        'dialog-close'
      );


    const titleElement =
      document.getElementById(
        'dialog-title'
      );


    if (
      !dialog ||
      !dialogBody ||
      !closeBtn ||
      !titleElement
    ) {
      return;
    }


    /* ─────────────────────────────────────────
       OPEN PROJECT DETAILS
       ───────────────────────────────────────── */

    detailButtons.forEach(
      (button) => {

        button.addEventListener(
          'click',
          function (e) {

            e.preventDefault();


            const projectId =
              this.getAttribute(
                'data-project'
              );


            const project =
              projectDetails[
                projectId
              ];


            if (!project) return;


            /*
              Set title.
            */
            titleElement.textContent =
              project.title;


            /*
              Populate modal.
            */
            dialogBody.innerHTML = `

              <div
                class="project-detail-container"
              >

                <img
                  src="${project.image}"
                  alt="${project.title}"
                  class="project-detail-image"
                  style="
                    width:100%;
                    height:300px;
                    object-fit:cover;
                    border-radius:12px;
                    margin-bottom:1.5rem;
                  "
                >


                <div
                  class="project-meta"
                  style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:0.5rem;
                    margin-bottom:1rem;
                  "
                >

                  ${project.tags
                    .map(
                      (tag) =>
                        `<span class="project-tag">${tag}</span>`
                    )
                    .join('')}

                </div>


                <p
                  class="project-meta-info"
                  style="
                    color:var(--text-muted);
                    font-size:0.95rem;
                    margin-bottom:1.5rem;
                  "
                >
                  ${project.meta}
                </p>


                <div
                  class="project-full-details"
                  style="
                    color:var(--text-secondary);
                    line-height:1.6;
                  "
                >

                  ${project.fullDetails}

                </div>

              </div>

            `;


            /*
              Open modal.
            */
            dialog.showModal();

          }
        );

      }
    );


    /* ─────────────────────────────────────────
       CLOSE BUTTON
       ───────────────────────────────────────── */

    closeBtn.addEventListener(
      'click',
      function () {
        dialog.close();
      }
    );


    /* ─────────────────────────────────────────
       CLOSE WHEN CLICKING OUTSIDE
       ───────────────────────────────────────── */

    dialog.addEventListener(
      'click',
      function (e) {

        if (
          e.target === dialog
        ) {
          dialog.close();
        }

      }
    );

  }
);