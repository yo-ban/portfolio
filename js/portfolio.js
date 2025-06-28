class PortfolioManager {
    constructor() {
        this.projectsData = null;
        this.projectTypes = null;
        this.filteredProjects = null;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.renderProjects();
            this.setupEventListeners();
            this.updateActiveFilter();
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
            this.showError();
        }
    }

    async loadProjects() {
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        const data = await response.json();
        this.projectsData = data.projects;
        this.projectTypes = data.projectTypes;
        this.filteredProjects = this.projectsData;
    }

    renderProjects(projects = this.filteredProjects) {
        const projectGrid = document.querySelector('.project-grid');
        if (!projectGrid) return;

        projectGrid.innerHTML = '';

        if (projects.length === 0) {
            projectGrid.innerHTML = '<p class="no-projects">該当するプロジェクトが見つかりませんでした。</p>';
            return;
        }

        // Sort projects by date (newest first) and featured status
        const sortedProjects = [...projects].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.date) - new Date(a.date);
        });

        sortedProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const article = document.createElement('article');
        article.className = 'project-card';
        article.setAttribute('data-project-id', project.id);
        article.setAttribute('data-project-type', project.type);

        const projectType = this.projectTypes[project.type] || { icon: '📋', label: 'Project' };
        
        // Create achievements HTML
        let achievementsHtml = '';
        if (project.achievements && project.achievements.length > 0) {
            achievementsHtml = '<div class="project-achievements">';
            project.achievements.forEach(achievement => {
                let icon = '🏆';
                if (achievement.type === 'medal') icon = '🥈';
                if (achievement.type === 'publication') icon = '📄';
                if (achievement.type === 'contribution') icon = '🤝';
                
                achievementsHtml += `
                    <span class="achievement">
                        <span class="achievement-icon">${icon}</span>
                        ${achievement.value}
                    </span>
                `;
            });
            achievementsHtml += '</div>';
        }

        // Create skills HTML
        const skillsHtml = project.skills.map(skill => 
            `<span class="skill-pill">${skill}</span>`
        ).join('');

        // Create links HTML
        const linksHtml = [];
        if (project.links.demo) {
            linksHtml.push(`<a href="${project.links.demo}" class="project-link" target="_blank">Demo →</a>`);
        }
        if (project.links.github) {
            linksHtml.push(`<a href="${project.links.github}" class="project-link" target="_blank">GitHub →</a>`);
        }
        if (project.links.article) {
            linksHtml.push(`<a href="${project.links.article}" class="project-link" target="_blank">詳細 →</a>`);
        }

        article.innerHTML = `
            <span class="project-type-badge">${projectType.icon}</span>
            <h4>${project.title}</h4>
            <p class="project-description">${project.description}</p>
            ${achievementsHtml}
            <div class="project-skills">
                ${skillsHtml}
            </div>
            <div class="project-links">
                ${linksHtml.join('')}
            </div>
        `;

        // Add click event for project detail (future implementation)
        article.addEventListener('click', (e) => {
            // Prevent navigation when clicking on links
            if (e.target.classList.contains('project-link') || e.target.closest('.project-link')) {
                return;
            }
            // Future: Navigate to project detail page
            // window.location.href = `/projects/${project.id}.html`;
        });

        return article;
    }

    filterProjects(type) {
        this.currentFilter = type;
        
        if (type === 'all') {
            this.filteredProjects = this.projectsData;
        } else {
            this.filteredProjects = this.projectsData.filter(project => 
                project.type === type
            );
        }
        
        this.renderProjects();
        this.updateActiveFilter();
    }

    updateActiveFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            if (filter === this.currentFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filterType = e.target.getAttribute('data-filter');
                this.filterProjects(filterType);
            });
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    showError() {
        const projectGrid = document.querySelector('.project-grid');
        if (projectGrid) {
            projectGrid.innerHTML = `
                <div class="error-message">
                    <p>プロジェクトの読み込みに失敗しました。</p>
                    <button onclick="location.reload()">再読み込み</button>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});