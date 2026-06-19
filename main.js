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

  'collab-board': {
    title: 'CollabBoard',
    tags: ['WebSockets', 'Express', 'PostgreSQL', 'Canvas API'],
    image: 'placeholder_collab.png',
    meta: 'Developed in 2024 • Full Stack Dev',
    description: `A real-time whiteboard app allowing distributed teams to brainstorm, drag items, sync workspaces, and review versions. Built from the ground up for seamless communication.`,
    fullDetails: `
      <p>CollabBoard is a collaborative vector-drawing and sticky-note canvas designed for speed and simplicity. Standard collaboration tools suffer from lag; this project solves that by utilizing direct WebSocket connections with minimal data overhead.</p>

      <h4 style="margin:1.5rem 0 0.5rem;color:var(--accent-2);">
        Key Features & Implementation
      </h4>

      <ul style="padding-left:1.25rem;margin-bottom:1rem;color:var(--text-muted);">
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