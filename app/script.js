// Configuración de gráficos con Chart.js
function initializeCharts() {
    // Gráfico de deployments
    const deployCtx = document.getElementById('deploymentsChart').getContext('2d');
    new Chart(deployCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Deployments Exitosos',
                data: [12, 19, 8, 15, 22, 18, 25],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Deployments Fallidos',
                data: [2, 3, 1, 2, 3, 1, 2],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });

    // Gráfico de uso de recursos
    const resourceCtx = document.getElementById('resourcesChart').getContext('2d');
    new Chart(resourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['CPU', 'Memoria', 'Almacenamiento', 'Red'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#4f46e5',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Toggle de modo oscuro
function setupDarkModeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Establecer tema inicial
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && prefersDark.matches)) {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Simulación de datos en tiempo real
function simulateRealTimeData() {
    const stats = {
        projects: document.querySelector('.stat-card:nth-child(1) .stat-number'),
        builds: document.querySelector('.stat-card:nth-child(2) .stat-number'),
        response: document.querySelector('.stat-card:nth-child(3) .stat-number'),
        incidents: document.querySelector('.stat-card:nth-child(4) .stat-number')
    };
    
    // Actualizar estadísticas periódicamente
    setInterval(() => {
        // Proyectos activos (fluctúa suavemente)
        const currentProjects = parseInt(stats.projects.textContent);
        const projectChange = Math.random() > 0.7 ? 1 : Math.random() > 0.9 ? -1 : 0;
        const newProjects = Math.max(8, Math.min(20, currentProjects + projectChange));
        stats.projects.textContent = newProjects;
        
        // Builds exitosos (entre 85% y 99%)
        const newBuilds = Math.floor(85 + Math.random() * 14);
        stats.builds.textContent = `${newBuilds}%`;
        
        // Tiempo de respuesta (entre 200ms y 300ms)
        const newResponse = Math.floor(200 + Math.random() * 100);
        stats.response.textContent = `${newResponse}ms`;
        
        // Actualizar texto de cambio
        const changeElements = document.querySelectorAll('.stat-change');
        changeElements.forEach(el => {
            const change = Math.floor(Math.random() * 10) - 2;
            if (change > 0) {
                el.textContent = `+${change} esta semana`;
                el.className = 'stat-change positive';
            } else if (change < 0) {
                el.textContent = `${change} esta semana`;
                el.className = 'stat-change negative';
            } else {
                el.textContent = 'Sin cambios';
                el.className = 'stat-change neutral';
            }
        });
    }, 10000); // Actualizar cada 10 segundos
}

// Actualizar hora de actividad
function updateActivityTimes() {
    const timeElements = document.querySelectorAll('.activity-time');
    const times = ['Hace 15 minutos', 'Hace 1 hora', 'Hace 3 horas', 'Hoy, 09:45 AM'];
    
    timeElements.forEach((el, index) => {
        el.textContent = times[index];
    });
}

// Manejo de botones de acción
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            // Efecto visual temporal
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular diferentes acciones según el icono
            if (icon.classList.contains('fa-play')) {
                alert('Iniciando servicio...');
            } else if (icon.classList.contains('fa-chart-line')) {
                alert('Mostrando métricas...');
            } else if (icon.classList.contains('fa-cog')) {
                alert('Abriendo configuración...');
            }
        });
    });
}

// Animación de carga inicial
function showLoadingAnimation() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.5s ease';
        container.style.opacity = '1';
    }, 100);
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();
    initializeCharts();
    setupDarkModeToggle();
    setupActionButtons();
    simulateRealTimeData();
    updateActivityTimes();
    
    // Actualizar hora cada minuto
    setInterval(updateActivityTimes, 60000);
    
    // Efecto hover en cards
    const cards = document.querySelectorAll('.stat-card, .chart-container, .activities, .projects');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Mensaje de bienvenida en consola
    console.log(`
    🚀 DevOps Dashboard inicializado
    📊 Versión: 1.0.0
    ⚡ Datos simulados en tiempo real
    🌙 Modo oscuro disponible
    `);
});