"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
    Github, Star, Code2, Phone, Mail, MapPin, ExternalLink,
    Loader2, User, GraduationCap, Briefcase, Download, ArrowUp,
    Zap, Globe, Database, ChevronRight
} from "lucide-react";
import {
    SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
    SiNodedotjs, SiTailwindcss, SiGit, SiGithub, SiHtml5, SiCss3,
    SiElectron, SiFirebase, SiMysql
} from "react-icons/si";
import React from "react";
import { IconType } from "react-icons";

// --- CONFIGURATION ---
const CONFIG = {
    name: "Binidu Ranasinghe",
    github: "Binidu01",
    tagline: "",
    bio: "Creative full-stack developer specializing in modern web technologies, AI integration, and scalable real-time systems. I transform complex problems into elegant solutions with intuitive user experiences.",
};

const TITLES = ["Full-Stack Developer", "AI Enthusiast", "Real-Time Systems Builder", "Tech Innovator"];

interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    fork: boolean;
    archived: boolean;
}

interface Skill {
    name: string;
    icon: IconType;
    color: string;
    level: number;
}

const SKILLS = {
    frontend: [
        { name: "React", icon: SiReact, color: "#61DAFB", level: 95 },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000", level: 90 },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 88 },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 95 },
        { name: "HTML5", icon: SiHtml5, color: "#E34C26", level: 98 },
        { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 92 },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4", level: 90 },
    ],
    backend: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 85 },
        { name: "Python", icon: SiPython, color: "#3776AB", level: 80 },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 85 },
        { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 75 },
    ],
    tools: [
        { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
        { name: "GitHub", icon: SiGithub, color: "#181717", level: 95 },
        { name: "Electron", icon: SiElectron, color: "#47848F", level: 70 },
    ],
};

const EDUCATION = [
    { degree: "BSc Software Engineering", institution: "Esoft Metro Campus", period: "2025-Present", status: "In Progress" },
    { degree: "HND in Computing", institution: "Esoft Metro Campus", period: "2024-2025", status: "Completed" },
];

const ACHIEVEMENTS = [
    { icon: Code2, title: "Modern Architecture", description: "Expert in building scalable, maintainable applications" },
    { icon: Zap, title: "Performance Focused", description: "Optimized applications with lightning-fast load times" },
    { icon: Globe, title: "Global Reach", description: "Projects used by thousands of users worldwide" },
    { icon: Database, title: "Data-Driven", description: "Real-time systems with robust data management" },
];

// --- STARFIELD BACKGROUND ---
function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initStars = useCallback((canvas: HTMLCanvasElement) => {
        const stars: Array<{ x: number; y: number; z: number }> = [];
        for (let i = 0; i < 500; i++) {
            stars.push({
                x: (Math.random() - 0.5) * canvas.width * 2,
                y: (Math.random() - 0.5) * canvas.height * 2,
                z: Math.random() * 1000,
            });
        }
        return stars;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: Array<{ x: number; y: number; z: number }> = [];
        let animationId = 0;

        const resize = () => {
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            stars = initStars(canvas);
        };

        const animate = () => {
            ctx.fillStyle = "rgba(0,0,0,0.12)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
            const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;

            stars.forEach(star => {
                star.z -= 2.5;
                if (star.z <= 0) {
                    star.z = 1000;
                    star.x = (Math.random() - 0.5) * canvas.width * 2;
                    star.y = (Math.random() - 0.5) * canvas.height * 2;
                }

                const scale = 500 / star.z;
                const x = star.x * scale + centerX;
                const y = star.y * scale + centerY;

                if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255,255,255,${Math.min(1, scale * 0.8)})`;
                    ctx.arc(x, y, Math.max(0.3, scale * 0.8), 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener("resize", resize);
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [initStars]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-transparent" />;
}

// --- NAVIGATION BAR ---
function Navigation({ activeSection }: { activeSection: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const sections = ["home", "about", "skills", "projects", "education", "contact"];

    useEffect(() => {
        const toggle = () => setIsVisible(window.scrollY > 300);
        window.addEventListener("scroll", toggle);
        toggle();
        return () => window.removeEventListener("scroll", toggle);
    }, []);

    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    if (!isVisible) return null;

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <div className="flex space-x-1">
                {sections.map(section => (
                    <button
                        key={section}
                        onClick={() => scrollTo(section)}
                        className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            activeSection === section ? "bg-blue-500 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>
        </nav>
    );
}

// --- SECTION COMPONENT ---
function Section({ id, title, icon, children, className = "" }: {
    id: string; title: string; icon: React.ReactNode; children: React.ReactNode; className?: string;
}) {
    return (
        <section id={id} className={`py-20 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 backdrop-blur-sm">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl">
                            {icon}
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
                </div>
                {children}
            </div>
        </section>
    );
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function Portfolio() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayTitle, setDisplayTitle] = useState("");
    const [quote, setQuote] = useState<string>("");
    const [quoteAuthor, setQuoteAuthor] = useState<string>("");

    // Scrollspy
    useEffect(() => {
        const sections = ["home", "about", "skills", "projects", "education", "contact"];
        const observers = sections.map(section => {
            const element = document.getElementById(section);
            if (!element) return null;
            const observer = new IntersectionObserver(
                ([entry]) => entry.isIntersecting && setActiveSection(section),
                { rootMargin: "-50% 0px -50% 0px" }
            );
            observer.observe(element);
            return observer;
        });
        return () => observers.forEach(obs => obs?.disconnect());
    }, []);

    // Typing animation
    useEffect(() => {
        const title = TITLES[titleIndex];
        if (displayTitle.length < title.length) {
            const timeout = setTimeout(() => setDisplayTitle(title.slice(0, displayTitle.length + 1)), 100);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayTitle("");
                setTitleIndex(prev => (prev + 1) % TITLES.length);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [displayTitle, titleIndex]);

    // Fetch GitHub data
    useEffect(() => {
        const headers: HeadersInit = {};
        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }

        Promise.all([
            fetch(`https://api.github.com/users/${CONFIG.github}`, { headers }),
            fetch(`https://api.github.com/users/${CONFIG.github}/repos?sort=updated&per_page=50`, { headers })
        ])
            .then(async ([userRes, reposRes]) => {
                const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()]);
                if (userData?.avatar_url) setAvatarUrl(`${userData.avatar_url}?s=460`);
                if (Array.isArray(reposData)) {
                    // Corrected type casting
                    const filteredRepos = (reposData as GitHubRepo[]).filter(r => !r.fork && !r.archived)
                        .sort((a, b) => b.stargazers_count - a.stargazers_count);
                    setRepos(filteredRepos);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const fetchQuote = async () => {
        try {
            const res = await fetch("/api/quote", { cache: "no-store" });
            if (!res.ok) throw new Error("Quote API failed");
            const data = await res.json();
            setQuote(data?.content || "Talk is cheap. Show me the code.");
            setQuoteAuthor(data?.author || "Linus Torvalds");
        } catch (err) {
            console.error("Quote fetch error:", err);
            setQuote("Talk is cheap. Show me the code.");
            setQuoteAuthor("Linus Torvalds");
        }
    };

    useEffect(() => { fetchQuote(); }, []);

    return (
        <div className="min-h-screen text-white relative bg-black">
            <Starfield />
            <Navigation activeSection={activeSection} />
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-8 right-8 z-50 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl transition-all hover:scale-110"
                style={{ display: activeSection === "home" ? "none" : "block" }}
            >
                <ArrowUp size={20} />
            </button>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative px-4 z-20">
                <div className="text-center max-w-6xl mx-auto">
                    {avatarUrl && (
                        <div className="mb-8">
                            <Image
                                src={avatarUrl} alt={CONFIG.name}
                                width={180} height={180}
                                className="rounded-full shadow-2xl border-4 border-white/20 mx-auto hover:scale-105 transition-transform duration-500"
                                priority unoptimized
                            />
                        </div>
                    )}
                    <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {CONFIG.name}
            </span>
                    </h1>
                    <div className="h-16 mb-8">
                        <p className="text-2xl md:text-4xl font-light text-gray-300">
                            {displayTitle}<span className="animate-pulse text-blue-400">|</span>
                        </p>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed italic">
                        {quote ? `"${quote}"` : "Loading quote..."}
                        <br />
                        <span className="text-blue-400 mt-2 block">- {quoteAuthor || "..."}</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                        <a href="/Binidu_Ranasinghe_CV.pdf" download className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3">
                            <Download size={24} />
                            <span>Download Resume</span>
                        </a>
                        <a href={`https://github.com/${CONFIG.github}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white/20 hover:border-blue-500/50 rounded-2xl hover:bg-white/5 transition-all duration-300 flex items-center space-x-3">
                            <Github size={24} />
                            <span>View GitHub</span>
                        </a>
                        <button onClick={fetchQuote} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center space-x-3">
                            <Star size={18} />
                            <span>New Quote</span>
                        </button>
                    </div>

                    <p className="text-gray-400 max-w-4xl mx-auto">{CONFIG.bio}</p>
                </div>
            </section>

            {/* --- About Section --- */}
            <Section id="about" title="About Me" icon={<User size={28} />} className="bg-black/20 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My Mission</h3>
                                <p className="text-lg leading-relaxed text-gray-200 mb-8">{CONFIG.bio}</p>
                                {/* Corrected unescaped entities */}
                                <p className="text-md leading-relaxed text-gray-400 border-l-4 border-blue-500 pl-4 italic">
                                    &ldquo;The best way to predict the future is to create it. I focus on developing sustainable, high-performance solutions that scale with user demand.&rdquo;
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Core Focus</h3>
                                {ACHIEVEMENTS.map((achievement, index) => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-blue-500/20">
                                                <Icon size={24} className="text-blue-300" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-semibold text-white mb-1">{achievement.title}</h4>
                                                <p className="text-gray-400 text-sm">{achievement.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* --- Skills Section --- */}
            <Section id="skills" title="Technical Expertise" icon={<Code2 size={28} />} className="relative z-20">
                <div className="space-y-16">
                    {Object.entries(SKILLS).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="text-3xl font-bold text-center mb-12 capitalize">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {category === 'frontend' ? 'Frontend Development' :
                      category === 'backend' ? 'Backend Development' : 'Tools & Technologies'}
                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {(skills as Skill[]).map((skill: Skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div
                                            key={skill.name}
                                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 group"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                    <Icon size={28} color={skill.color} />
                                                </div>
                                                <span className="text-sm font-bold text-blue-400">{skill.level}%</span>
                                            </div>
                                            <h4 className="font-semibold text-white mb-3">{skill.name}</h4>
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* --- Projects Section --- */}
            <Section id="projects" title="Featured Projects" icon={<Briefcase size={28} />} className="bg-black/20 relative z-20">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={64} />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(showAllProjects ? repos : repos.slice(0, 6)).map((repo) => (
                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Github size={20} className="text-blue-400" />
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400">{repo.name}</h3>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1 text-yellow-400">
                                                <Star size={16} />
                                                <span className="text-sm">{repo.stargazers_count}</span>
                                            </div>
                                            <ExternalLink className="text-gray-400 group-hover:text-blue-400 opacity-0 group-hover:opacity-100" size={18} />
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-6 line-clamp-3">{repo.description || "No description available"}</p>
                                    <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/10 text-blue-400 text-sm rounded-full">
                      {repo.language || "Code"}
                    </span>
                                        <ChevronRight className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={20} />
                                    </div>
                                </a>
                            ))}
                        </div>
                        {repos.length > 6 && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShowAllProjects(!showAllProjects)}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm font-bold rounded-2xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center space-x-3 mx-auto"
                                >
                                    <span>{showAllProjects ? "Show Less" : "View All Projects"}</span>
                                    <ChevronRight className={`transition-transform ${showAllProjects ? 'rotate-90' : ''}`} size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Section>

            {/* --- Education Section --- */}
            <Section id="education" title="Education" icon={<GraduationCap size={28} />} className="relative z-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    {EDUCATION.map((edu, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                                    <p className="text-blue-400 text-lg mb-2">{edu.institution}</p>
                                    <p className="text-gray-400">{edu.period}</p>
                                </div>
                                <span className={`px-6 py-3 rounded-full font-bold text-sm ${
                                    edu.status === "In Progress"
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                                }`}>
                  {edu.status}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* --- Contact Section --- */}
            {/* Corrected unescaped entity */}
            <Section id="contact" title="Let&apos;s Connect" icon={<Mail size={28} />} className="bg-black/20 relative z-20">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl text-center text-gray-300 mb-12">Ready to collaborate? Let&apos;s build something amazing together!</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, label: "Email Me", value: "rbinidu@gmail.com", href: "mailto:rbinidu@gmail.com", color: "blue", description: "Send me an email" },
                            { icon: Phone, label: "Call Me", value: "+94 78 729 6686", href: "tel:+94787296686", color: "green", description: "Give me a call" },
                            { icon: MapPin, label: "My Location", value: "Matara, Sri Lanka", href: "https://maps.app.goo.gl/PZ6Qx3ZX7Sdo1Yxf8", color: "purple", description: "Find me on the map" }
                        ].map((contact, index) => {
                            const Icon = contact.icon;
                            return (
                                <a
                                    key={index}
                                    href={contact.href}
                                    target={contact.href.startsWith('http') ? "_blank" : undefined}
                                    rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 text-center block"
                                >
                                    <div className={`inline-flex items-center justify-center p-4 ${
                                        contact.color === 'green' ? 'bg-green-500/20' :
                                            contact.color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                                    } rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={32} className={`${
                                            contact.color === 'green' ? 'text-green-400' :
                                                contact.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                                        }`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{contact.label}</h3>
                                    <p className="text-gray-300 mb-2">{contact.value}</p>
                                    <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {contact.description}
                                    </p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* --- Footer --- */}
            <footer className="py-12 border-t border-white/10 bg-black/30 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400 mb-4">© {new Date().getFullYear()} {CONFIG.name}. Crafted with precision and passion.</p>
                    <p className="text-sm text-gray-500">Built with Next.js, React, TypeScript & Tailwind CSS</p>
                </div>
            </footer>
        </div>
    );
}