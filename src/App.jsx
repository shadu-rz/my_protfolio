import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Phone, Briefcase, GraduationCap, Code2, ExternalLink, Moon, Sun, Menu, X } from 'lucide-react';

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState('dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the top of the section is within the viewport (adjust offset as needed)
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const popIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
    };

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false); // Close mobile menu
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app-container">
            {/* Scroll Progress Bar */}
            <motion.div className="progress-bar" style={{ scaleX }} />

            {/* Background Decorative Elements */}
            <div className="bg-decoration">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="floating-shape shape-code"
                >
                    <Code2 size={48} opacity={0.1} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="floating-shape shape-circle"
                />
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="floating-shape shape-dashed"
                />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="navbar"
            >
                <div className="logo-container">
                    <img src="/profile.png" alt="MS" className="nav-profile-img" />
                    <span className="logo-text">Mohamed Shaduli</span>
                </div>

                <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={activeSection === item ? 'active' : ''}
                                data-text={item} // for hover effect
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Hamburger Button (Mobile Only) */}
                    <button className="mobile-menu-btn" onClick={toggleMenu} style={{ display: 'none' }}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-background-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                </div>

                <motion.div
                    className="hero-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div variants={popIn} className="profile-img-container">
                        <img src="/profile.png" alt="Mohamed Shaduli" className="profile-img" />
                    </motion.div>

                    <motion.div variants={fadeIn} className="greeting-pill">
                        👋 Hello, World!
                    </motion.div>

                    <motion.h1 variants={fadeIn}>
                        I'm <span className="highlight-text">Mohamed Shaduli</span>
                    </motion.h1>

                    <motion.h2 variants={fadeIn} className="role-text">
                        Flutter Developer 🚀
                    </motion.h2>

                    <motion.p variants={fadeIn} className="description">
                        Building <b>pixel-perfect</b>, scalable mobile & web applications.
                        Transforming ideas into seamless cross-platform experiences.
                    </motion.p>

                    <motion.div variants={fadeIn} className="hero-buttons">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="primary-btn glow-effect"
                            onClick={() => scrollToSection('projects')}
                        >
                            View My Mastery
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="secondary-btn"
                            onClick={() => scrollToSection('contact')}
                        >
                            Let's Talk
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="scroll-indicator"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="section-header"
                    >
                        <h2 className="section-title">Who Am I?</h2>
                        <div className="title-underline"></div>
                    </motion.div>

                    <div className="about-content">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="about-card glass-card"
                        >
                            <p>
                                A passionate <b>Flutter Developer</b> with 2+ years of experience crafting high-performance apps.
                                I don't just write code; I architect solutions using <b>Clean Architecture</b> and <b>SOLID principles</b>.
                            </p>
                            <br />
                            <p>
                                Currently innovating at <b>Meridian IT Solutions</b>. I focus on <b>performance optimization</b> and <b>architectural excellence</b>, ensuring every app I build is not just functional, but a <b>masterpiece of engineering</b>.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section bg-gradient">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="section-header"
                    >
                        <h2 className="section-title">My Arsenal</h2>
                        <div className="title-underline"></div>
                    </motion.div>

                    <motion.div
                        className="skills-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={popIn} className="skill-category-card glass-card">
                            <div className="card-icon"><Code2 size={40} /></div>
                            <h3>Core Superpowers</h3>
                            <div className="skill-tags">
                                {['Flutter', 'Dart', 'Clean Architecture', 'SOLID', 'GetX', 'Bloc', 'Riverpod'].map(skill => (
                                    <span key={skill} className="skill-pill">{skill}</span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={popIn} className="skill-category-card glass-card">
                            <div className="card-icon"><Briefcase size={40} /></div>
                            <h3>Tools & Magic</h3>
                            <div className="skill-tags">
                                {['Firebase', 'RESTful API', 'Git/GitHub', 'OCR Tech', 'CI/CD', 'Hive', 'SQLite'].map(skill => (
                                    <span key={skill} className="skill-pill">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section id="experience" className="section">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="section-header"
                    >
                        <h2 className="section-title">The Journey</h2>
                        <div className="title-underline"></div>
                    </motion.div>

                    <div className="timeline-container">
                        {[
                            {
                                date: 'Jan 2024 - Present',
                                role: 'Flutter Developer',
                                company: 'Meridian IT Solutions',
                                desc: 'Building next-gen Flutter apps. Optimized manual processes by 85% using OCR. Championed Clean Architecture.'
                            },
                            {
                                date: 'Nov 2022 - Oct 2023',
                                role: 'Flutter Developer',
                                company: 'Brototype',
                                desc: 'Mastered cross-platform development. Built rock-solid foundations in state management and UI design.'
                            }
                        ].map((job, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="timeline-content glass-card hover-lift">
                                    <span className="date-badge">{job.date}</span>
                                    <h3>{job.role}</h3>
                                    <h4>{job.company}</h4>
                                    <p>{job.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Parallax/Grid */}
            <section id="projects" className="section bg-darker">
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="section-header"
                    >
                        <h2 className="section-title">Featured Works</h2>
                        <div className="title-underline"></div>
                    </motion.div>

                    <div className="projects-showcase">
                        {[
                            {
                                title: 'RAG Connect',
                                tags: ['Productivity', 'Task Management'],
                                desc: 'A centralized productivity suite for effortless Lead & Task Management, featuring smart calendars and visual workflow planning.',
                                image: '/rag-connect-logo.png',
                                color: '#580c2b' // Deep Maroon
                            },
                            {
                                title: 'HiLite Clique',
                                tags: ['CRM'],
                                desc: 'A powerhouse CRM featuring Lead & Task Management, Sales Tracking, and smart vehicle scanning.',
                                image: '/hilite-logo.png',
                                color: '#D4AF37' // Gold accent
                            },
                            {
                                title: 'Food Street',
                                tags: ['E-commerce', 'Real-time'],
                                desc: 'Seamless food ordering platform with multi-outlet management and OneSignal integration.',
                                image: '/foodstreet-logo.png',
                                color: '#ea580c' // Orange accent
                            },
                            {
                                title: 'Edunex CRM & Student App',
                                tags: ['Education', 'Payments'],
                                desc: 'Comprehensive educational platform with video classes and Razorpay payments.',
                                image: '/edunex-logo.png',
                                color: '#10b981' // Green accent
                            }
                        ].map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-card-modern"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="project-frame">
                                    {/* Project Background Image */}
                                    <div
                                        className="project-bg-img"
                                        style={{
                                            backgroundImage: `url(${project.image})`,
                                            backgroundColor: index === 0 ? '#0a1d35' : (index === 1 ? '#c2410c' : '#f0fdf4') // Fallback/Tint colors
                                        }}
                                    />

                                    <div className="project-overlay"></div>
                                    <div className="project-info">
                                        <h3>{project.title}</h3>
                                        <div className="project-tags">
                                            {project.tags.map(tag => <span key={tag} className="tag-border">{tag}</span>)}
                                        </div>
                                        <p>{project.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section id="education" className="section">
                <div className="container">
                    <h2 className="section-title centered">Education</h2>
                    <div className="education-flex">
                        <motion.div
                            className="edu-box"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <GraduationCap className="edu-icon" />
                            <div>
                                <h3>BCA</h3>
                                <p>IGNOU University (2023 - Present)</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="edu-box"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <GraduationCap className="edu-icon" />
                            <div>
                                <h3>Higher Secondary</h3>
                                <p>Navamukunda HSS (Computer Science)</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="section contact-section">
                <div className="container">
                    <motion.div
                        className="contact-card glass-card"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start a Project?</h2>
                        <p className="contact-sub">Let's build something amazing together.</p>

                        <div className="contact-links">
                            <a href="mailto:mshaduly76@gmail.com" className="contact-pill">
                                <Mail size={20} /> mshaduly76@gmail.com
                            </a>
                            <a href="tel:+919048184448" className="contact-pill">
                                <Phone size={20} /> +91 9048184448
                            </a>
                            <a href="https://linkedin.com/in/mohamed-shaduli" target="_blank" className="contact-pill">
                                <Linkedin size={20} /> LinkedIn
                            </a>
                            <a href="https://github.com/shadu-rz" target="_blank" className="contact-pill">
                                <Github size={20} /> GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="footer">
                <p>Designed & Built with ❤️ by Mohamed Shaduli</p>
            </footer>
        </div>
    );
}

export default App;
