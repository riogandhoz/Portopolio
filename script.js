document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.getElementById('project-list');
    const addProjectForm = document.getElementById('add-project-form');
    const contactForm = document.getElementById('contact-form');
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    let projects = [
        { id: 1, title: 'Project 1', description: 'Description of Project 1' },
        { id: 2, title: 'Project 2', description: 'Description of Project 2' },
        { id: 3, title: 'Project 3', description: 'Description of Project 3' },
    ];

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const modeText = document.body.classList.contains('dark-mode') ? 'Mode Terang' : 'Mode Gelap';
        document.getElementById('themeToggle').textContent = modeText;
    });

    // Function to render the projects
    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'col-md-4 mb-4';
            projectElement.innerHTML = `
                <div class="card project-card">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-info edit-project" data-id="${project.id}">Edit</button>
                            <button class="btn btn-sm btn-danger delete-project" data-id="${project.id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            projectList.appendChild(projectElement);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-project').forEach(button => {
            button.addEventListener('click', editProject);
        });
        document.querySelectorAll('.delete-project').forEach(button => {
            button.addEventListener('click', deleteProject);
        });
    }

    // Function to add a new project
    function addProject(event) {
        event.preventDefault();
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const newProject = {
            id: Date.now(),
            title: title,
            description: description
        };
        projects.push(newProject);
        renderProjects();
        document.getElementById('add-project-form').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
        modal.hide();
        Swal.fire('Success', 'Project added successfully!', 'success');
    }

    // Function to edit a project
    function editProject(event) {
        const projectId = parseInt(event.target.getAttribute('data-id'));
        const project = projects.find(p => p.id === projectId);
        Swal.fire({
            title: 'Edit Project',
            html:
                `<input id="swal-input1" class="swal2-input" value="${project.title}">` +
                `<textarea id="swal-input2" class="swal2-textarea">${project.description}</textarea>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                project.title = result.value[0];
                project.description = result.value[1];
                renderProjects();
                Swal.fire('Updated!', 'Your project has been updated.', 'success');
            }
        });
    }

    // Function to delete a project
    function deleteProject(event) {
        const projectId = parseInt(event.target.getAttribute('data-id'));
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                projects = projects.filter(p => p.id !== projectId);
                renderProjects();
                Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
            }
        });
    }

    // Function to handle the contact form submission
    function handleContact(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        console.log('Contact form submitted:', { name, email, message });
        
        Swal.fire('Thank you!', 'Your message has been sent.', 'success');
        contactForm.reset();
    }

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    });

    // Initial render of projects
    renderProjects();

    // Event listeners for the forms
    addProjectForm.addEventListener('submit', addProject);
    contactForm.addEventListener('submit', handleContact);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
