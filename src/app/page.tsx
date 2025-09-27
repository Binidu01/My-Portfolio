"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Github, Star, Code2, Phone, Mail, MapPin,
  ExternalLink, Loader2, User, GraduationCap,
  Briefcase, Download, ChevronRight, ArrowUp,
  Zap, Globe, Database, Cpu
} from "lucide-react";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiGit, SiGithub, SiHtml5, SiCss3,
  SiElectron, SiFirebase, SiMysql
} from "react-icons/si";

// ------------------------------------
// ---------- CONFIGURATION ----------
// ------------------------------------
const SITE_CONFIG = {
  name: "Binidu Ranasinghe",
  github: "Binidu01",
  tagline: "Crafting Digital Excellence Through Code",
  bio: "Creative full-stack developer specializing in modern web technologies, AI integration, and scalable real-time systems. I transform complex problems into elegant solutions with intuitive user experiences.",
};

const TITLES = ["Full-Stack Developer", "AI Enthusiast", "Real-Time Systems Builder", "Tech Innovator"];

// ---------- Types ----------
interface Skill {
  name: string;
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  color: string;
  level: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  status: "Completed" | "In Progress";
}

interface Achievement {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  description: string;
}

// ---------- Data ----------
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

const EDUCATION: Education[] = [
  { degree: "BSc Software Engineering", institution: "Esoft Metro Campus", period: "2025-Present", status: "In Progress" },
  { degree: "HND in Computing", institution: "Esoft Metro Campus", period: "2024-2025", status: "Completed" },
];

const ACHIEVEMENTS: Achievement[] = [
  { icon: Code2, title: "Modern Architecture", description: "Expert in building scalable, maintainable applications" },
  { icon: Zap, title: "Performance Focused", description: "Optimized applications with lightning-fast load times" },
  { icon: Globe, title: "Global Reach", description: "Projects used by thousands of users worldwide" },
  { icon: Database, title: "Data-Driven", description: "Real-time systems with robust data management" },
];

// ------------------------------------
// ---------- WARP SPEED STARFIELD ANIMATION (CANVAS-BASED) ----------
// ------------------------------------
interface Star {
  x: number;
  y: number;
  z: number; // Z-coordinate for 3D depth
  radius: number;
  color: string;
}

const STAR_COUNT = 500;
const MAX_Z = 1000;
const FOCAL_DISTANCE = 500; // Determines the sense of perspective
const SPEED = 2.5;

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // FIX 1: Add ESLint suppression comment to ignore the strict warning on '_'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setStars] = useState<Star[]>([]);

  // Initialization: Populate stars with random 3D coordinates
  const initializeStars = useCallback((canvas: HTMLCanvasElement) => {
    const newStars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      newStars.push({
        // Spread stars randomly across a wide area (width*2)
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * MAX_Z, // Random depth
        radius: 0.5,
        color: "#ffffff",
      });
    }
    setStars(newStars);
  }, []);

  // Animation Loop: Updates star positions and redraws the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle initial sizing and resize events
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars(canvas);
    };
    handleResize();

    let animationFrameId: number;

    const draw = () => {
      if (!ctx) return;

      const { width, height } = canvas;
      const halfW = width / 2;
      const halfH = height / 2;

      // Clear canvas with a slight transparent layer for a subtle motion blur/trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // The focal point is fixed exactly at the center
      const focalX = halfW;
      const focalY = halfH;

      setStars((prevStars) =>
          prevStars.map((star) => {

            // 1. Store previous position for drawing the trail
            const prevScale = FOCAL_DISTANCE / star.z;
            const prevX = star.x * prevScale + focalX;
            const prevY = star.y * prevScale + focalY;

            // 2. Move star forward
            star.z -= SPEED;

            // 3. Reset star if it passes the viewer (z <= 0)
            if (star.z <= 0) {
              star.z = MAX_Z;
              star.x = (Math.random() - 0.5) * width * 2;
              star.y = (Math.random() - 0.5) * height * 2;
            }

            // 4. Project 3D to 2D
            const scale = FOCAL_DISTANCE / star.z;
            const projectedX = star.x * scale + focalX;
            const projectedY = star.y * scale + focalY;
            const size = star.radius * scale;

            // 5. Draw the star as a short trail
            if (projectedX > 0 && projectedX < width && projectedY > 0 && projectedY < height) {
              // Draw line for the trail
              ctx.beginPath();
              // Fade out stars further away (smaller scale)
              ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, scale * 0.7)})`;
              ctx.lineWidth = size;
              ctx.lineCap = 'round';
              ctx.moveTo(prevX, prevY);
              ctx.lineTo(projectedX, projectedY);
              ctx.stroke();
            }

            return star;
          })
      );

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [initializeStars]);

  return (
      <canvas
          ref={canvasRef}
          // The key change here: fixed and covers the entire viewport
          className="fixed inset-0 opacity-80 pointer-events-none z-0"
      />
  );
}

// ------------------------------------
// ---------- HELPER COMPONENTS (Unchanged) ----------
// ------------------------------------

function useScrollspy(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const observers = sections.map(section => {
      const element = document.getElementById(section);
      if (!element) return null;

      const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          },
          { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sections]);

  return activeSection;
}

function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

function FloatingNav({ activeSection }: { activeSection: string }) {
  const [isVisible, setIsVisible] = useState(false);
  // FIX: Use "home" (matches hero section id) instead of "hero" to keep scrollspy in sync
  const sections = ["home", "about", "skills", "projects", "education", "contact"];

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-2xl">
        <div className="flex space-x-1">
          {sections.map((section) => (
              <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === section
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
          ))}
        </div>
      </nav>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
      <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <ArrowUp size={20} className="group-hover:animate-bounce" />
      </button>
  );
}

function Section({ id, title, icon, children, className = "" }: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
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

function SkillCard({ skill, index, category: _category }: { skill: Skill; index: number; category: string }) {
  // FIX 2: Add ESLint suppression comment to ignore the strict warning on '_category'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Icon = skill.icon;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
      <div
          className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Icon size={28} style={{ color: skill.color }} />
            </div>
            <span className="text-sm font-bold text-blue-400">{skill.level}%</span>
          </div>
          <h3 className="font-semibold text-white mb-3">{skill.name}</h3>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: isVisible ? `${skill.level}%` : "0%" }}
            ></div>
          </div>
        </div>
      </div>
  );
}

function ProjectCard({ project, index }: { project: GitHubRepo; index: number }) {
  return (
      <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Github size={20} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star size={16} />
                <span className="text-sm font-medium">{project.stargazers_count}</span>
              </div>
              <ExternalLink className="text-gray-400 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" size={18} />
            </div>
          </div>

          <p className="text-gray-300 mb-6 line-clamp-3">
            {project.description || "No description available"}
          </p>

          <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-white/10 text-blue-400 text-sm font-medium rounded-full">
            {project.language || "Code"}
          </span>
            <ChevronRight className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={20} />
          </div>
        </div>
      </a>
  );
}

function VerticalFeature({ achievement, index }: { achievement: Achievement; index: number }) {
  const Icon = achievement.icon;

  return (
      <div
          className="flex items-start space-x-4 animate-fade-in"
          style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-blue-500/20 transform group-hover:scale-105 transition-transform duration-300">
          <Icon size={24} className="text-blue-300" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{achievement.title}</h3>
          <p className="text-gray-400 text-sm">{achievement.description}</p>
        </div>
      </div>
  );
}

// ------------------------------------
// ---------- MAIN PORTFOLIO COMPONENT ----------
// ------------------------------------
export default function ModernPortfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Animations
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState("");

  const activeSection = useScrollspy(["home", "about", "skills", "projects", "education", "contact"]);
  const scrollY = useParallax();

  // Typing animation
  useEffect(() => {
    const title = TITLES[titleIndex];
    if (displayTitle.length < title.length) {
      const timeout = setTimeout(() => setDisplayTitle(title.slice(0, displayTitle.length + 1)), 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayTitle("");
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [displayTitle, titleIndex]);

  // Fetch GitHub data - HD AVATAR FIX APPLIED HERE
  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${SITE_CONFIG.github}`),
      fetch(`https://api.github.com/users/${SITE_CONFIG.github}/repos?sort=updated&per_page=50`),
    ])
        .then(async ([userRes, reposRes]) => {
          const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()]);

          if (userData?.avatar_url) {
            // Apply HD Fix: Request larger size (e.g., 460px) from GitHub
            const hdAvatarUrl = `${userData.avatar_url}${userData.avatar_url.includes('?') ? '&' : '?'}s=460`;
            setAvatarUrl(hdAvatarUrl);
          }

          if (Array.isArray(reposData)) {
            const filteredRepos = reposData
                .filter((r) => !r.fork && !r.archived)
                .sort((a, b) => b.stargazers_count - a.stargazers_count);
            setRepos(filteredRepos);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">

        {/* --- Background Effects (z-index 0) --- */}
        <Starfield />

        {/* Subtle color flares (z-index 10) */}
        <div className="fixed inset-0 opacity-30 z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10"></div>
        </div>

        {/* Content Layers (z-20 and up) */}
        <FloatingNav activeSection={activeSection} />
        <BackToTop />

        {/* Hero Section (z-index 20) */}
        <section id="home" className="min-h-screen flex items-center justify-center relative px-4 z-20">

          <div className="text-center relative z-10 max-w-6xl mx-auto">
            {avatarUrl && (
                <div className="mb-8 animate-fade-in">
                  <div className="relative inline-block">
                    <Image
                        src={avatarUrl}
                        alt={SITE_CONFIG.name}
                        // REDUCED SIZE HERE: 180x180
                        width={180}
                        height={180}
                        className="rounded-full shadow-2xl border-4 border-white/20 mx-auto"
                        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                        priority
                        unoptimized={true}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30"></div>
                  </div>
                </div>
            )}

            <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </span>
            </h1>

            <div className="h-16 mb-8">
              <p className="text-2xl md:text-4xl font-light text-gray-300">
                {displayTitle}
                <span className="animate-pulse text-blue-400">|</span>
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              {SITE_CONFIG.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in">
              <a
                  href="/Binidu_Ranasinghe_CV.pdf"
                  download
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <Download size={24} className="group-hover:animate-bounce" />
                <span>Download Resume</span>
              </a>
              <a
                  href={`https://github.com/${SITE_CONFIG.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 border-2 border-white/20 hover:border-blue-500/50 backdrop-blur-sm rounded-2xl hover:bg-white/5 transition-all duration-300 flex items-center space-x-3"
              >
                <Github size={24} className="group-hover:rotate-12 transition-transform" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- About Section (z-index 20) --- */}
        <Section id="about" title="About Me" icon={<User size={28} />} className="bg-black/20 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    My Mission
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-200 mb-8">
                    {SITE_CONFIG.bio}
                  </p>
                  <p className="text-md leading-relaxed text-gray-400 border-l-4 border-blue-500 pl-4 italic">
                    &quot;The best way to predict the future is to create it. I focus on developing sustainable, high-performance solutions that scale with user demand.&quot;
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Core Focus
                  </h3>
                  <div className="space-y-8">
                    {ACHIEVEMENTS.map((achievement, index) => (
                        <VerticalFeature key={index} achievement={achievement} index={index} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Section>

        {/* --- Skills Section (z-index 20) --- */}
        <Section id="skills" title="Technical Expertise" icon={<Code2 size={28} />} className="relative z-20">
          <div className="space-y-16">
            {(Object.entries(SKILLS) as [string, Skill[]][]).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-3xl font-bold text-center mb-12 capitalize">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {category === 'frontend' ? 'Frontend Development' :
                      category === 'backend' ? 'Backend Development' : 'Tools & Technologies'}
                </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} category={category} />
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </Section>

        {/* --- Projects Section (z-index 20) --- */}
        <Section id="projects" title="Featured Projects" icon={<Briefcase size={28} />} className="bg-black/20 relative z-20">
          {loading ? (
              <div className="flex justify-center py-20">
                <div className="relative">
                  <Loader2 className="animate-spin text-blue-500" size={64} />
                  <div className="absolute inset-0 animate-ping">
                    <Cpu className="text-purple-500" size={64} />
                  </div>
                </div>
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(showAllProjects ? repos : repos.slice(0, 6)).map((repo, index) => (
                      <ProjectCard key={repo.id} project={repo} index={index} />
                  ))}
                </div>
                {repos.length > 6 && (
                    <div className="text-center mt-12">
                      <button
                          onClick={() => setShowAllProjects(!showAllProjects)}
                          className="group px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm font-bold rounded-2xl hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center space-x-3 mx-auto"
                      >
                        <span>{showAllProjects ? "Show Less" : "View All Projects"}</span>
                        <ChevronRight className={`group-hover:translate-x-1 transition-transform ${showAllProjects ? 'rotate-90' : ''}`} size={20} />
                      </button>
                    </div>
                )}
              </>
          )}
        </Section>

        {/* --- Education Section (z-index 20) --- */}
        <Section id="education" title="Education" icon={<GraduationCap size={28} />} className="relative z-20">
          <div className="max-w-4xl mx-auto space-y-8">
            {EDUCATION.map((edu, index) => (
                <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-blue-400 text-lg mb-2">{edu.institution}</p>
                      <p className="text-gray-400">{edu.period}</p>
                    </div>
                    <div className="flex-shrink-0">
                  <span
                      className={`px-6 py-3 rounded-full font-bold text-sm ${
                          edu.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-green-500/20 text-green-400 border border-green-500/30"
                      }`}
                  >
                    {edu.status}
                  </span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </Section>

        {/* --- Contact Section (z-index 20) --- */}
        <Section id="contact" title="Let&apos;s Connect" icon={<Mail size={28} />} className="bg-black/20 relative z-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center text-gray-300 mb-12">
              Ready to collaborate? Let&apos;s build something amazing together!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a
                  href="mailto:rbinidu@gmail.com"
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-blue-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={32} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">rbinidu@gmail.com</p>
              </a>

              <a
                  href="tel:+94787296686"
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:scale-105 text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-green-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+94 78 729 6686</p>
              </a>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-purple-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={32} className="text-purple-400" />
                </div>
                <h3 className="text-ellipsis text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-gray-300">Matara, Sri Lanka</p>
              </div>
            </div>
          </div>
        </Section>

        {/* --- Footer (z-index 20) --- */}
        <footer className="py-12 border-t border-white/10 bg-black/30 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                © {new Date().getFullYear()} {SITE_CONFIG.name}. Crafted with precision and passion.
              </p>
              <p className="text-sm text-gray-500">
                Built with Next.js, React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>

        {/* --- Global Styles --- */}
        <style jsx global>{`
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.8s ease forwards; }

          html { scroll-behavior: smooth; }

          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6, #8b5cf6);
            border-radius: 4px;
          }

          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }

          .backdrop-blur-md {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
  );
}
