document.addEventListener('DOMContentLoaded', function() {
    // Animación de números contadores
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar gráficos
    const initCharts = () => {
        if (document.getElementById('problemChart')) {
            const ctx = document.getElementById('problemChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Rendimiento', 'Estrés', 'Deserción', 'Tiempo estudio'],
                    datasets: [{
                        data: [42, 68, 35, 40],
                        backgroundColor: [
                            'rgba(108, 92, 231, 0.8)',
                            'rgba(253, 121, 168, 0.8)',
                            'rgba(214, 48, 49, 0.8)',
                            'rgba(0, 206, 201, 0.8)'
                        ],
                        borderColor: [
                            'rgba(108, 92, 231, 1)',
                            'rgba(253, 121, 168, 1)',
                            'rgba(214, 48, 49, 1)',
                            'rgba(0, 206, 201, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    cutoutPercentage: 70,
                    animation: { animateScale: true },
                    legend: { position: 'right' }
                }
            });
        }
    };

    // Efecto de máquina de escribir para el título
    const typeWriter = () => {
        const titleWords = document.querySelectorAll('.title-word');
        
        titleWords.forEach((word, index) => {
            const text = word.textContent;
            word.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    word.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100 + (index * 50));
        });
    };

    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-card')) {
                    animateCounters();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .problem-text, .problem-visual').forEach(el => {
        observer.observe(el);
    });

    // Inicializar gráficos cuando sean visibles
    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCharts();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (document.getElementById('problemChart')) {
        chartObserver.observe(document.getElementById('problemChart'));
    }

    // Efecto de partículas interactivas
    const initParticles = () => {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const colors = ['rgba(138, 43, 226, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 0, 255, 0.5)'];
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    // Efecto de cursor personalizado
    const initCustomCursor = () => {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.backgroundColor = 'rgba(138, 43, 226, 0.5)';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.mixBlendMode = 'exclusion';
        cursor.style.transition = 'transform 0.1s, width 0.3s, height 0.3s, background 0.3s';
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.style.position = 'fixed';
        follower.style.width = '40px';
        follower.style.height = '40px';
        follower.style.borderRadius = '50%';
        follower.style.border = '2px solid var(--secondary)';
        follower.style.pointerEvents = 'none';
        follower.style.zIndex = '9998';
        follower.style.transform = 'translate(-50%, -50%)';
        follower.style.transition = 'transform 0.3s, width 0.3s, height 0.3s';
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('a, button, .nav-links li').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.backgroundColor = 'var(--accent)';
                follower.style.width = '60px';
                follower.style.height = '60px';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(138, 43, 226, 0.5)';
                follower.style.width = '40px';
                follower.style.height = '40px';
            });
        });
    };

    // Inicializar animaciones cuando la página carga
    window.addEventListener('load', () => {
        typeWriter();
        initParticles();
        initCustomCursor();
    });
});
