import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, MoreHorizontal, X, Mail, Phone } from 'lucide-react';
import * as si from 'simple-icons';

// Types
interface Education {
  degree: string;
  institution: string;
  period: string;
  status: string;
  description?: string;
  logo?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  repo: string;
  url?: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
}

// Custom Icon Components
export const JavaIcon = ({ className = "w-6 h-6", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/java-icon-svg-download-png-9632907.png?f=webp&w=128" 
    alt="Java" 
    className={className}
    {...props}
  />
);

export const CSharpIcon = ({ className = "w-6 h-6", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/c-sharp-programming-language-icon.png" 
    alt="C#" 
    className={className}
    {...props}
  />
);

export const WindowsIcon = ({ className = "w-6 h-6", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://cdn.iconscout.com/icon/free/png-256/free-windows-icon-svg-download-png-190819.png?f=webp&w=128" 
    alt="Windows" 
    className={className}
    {...props}
  />
);

export const HonoIcon = ({ className = "w-6 h-6", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/hono-6ge6rolcrcsqnvk7r685s.png/hono-lni310gpnzm7h0sumu9xrk.png?_a=DATAiZkSZAA0" 
    alt="Hono" 
    className={className}
    {...props}
  />
);

// Bini.js Custom Icon Component - using your URL
export const BiniJsIcon = ({ className = "w-8 h-8", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://skills.syvixor.com/api/icons?i=binijs&perline=12&radius=40" 
    alt="Bini.js" 
    className={className}
    {...props}
  />
);

export function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.5 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

const SimpleIcon: React.FC<{ icon: any; className?: string; fill?: string }> = ({ 
  icon, 
  className = '', 
  fill = 'currentColor' 
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

// Education Timeline Component
const EducationTimeline = () => {
  const containerRef = useRef(null);
  
  const educationData: Education[] = [
    {
      degree: "BEng (Hons) Software Engineering",
      institution: "London Metropolitan University, UK",
      period: "2025 [Sep] – 2026 [Sep]",
      status: "In Progress",
      logo: "https://sinethsandeepa.com/education/london-met.png",
    },
    {
      degree: "Higher National Diploma (HND) in Computing",
      institution: "Pearson (UK)",
      period: "2024 [Feb] – 2025 [Sep]",
      status: "Completed",
      logo: "https://sinethsandeepa.com/education/pearson.png",
    },
  ];

  // Reveal ranges expressed as fractions of the *whole* track
  const revealRanges: [number, number][] = [
    [0.14, 0.4],
    [0.6, 0.86],
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const EducationCard = ({ edu, align, progress, range }: { 
    edu: Education; 
    align: 'left' | 'right'; 
    progress: MotionValue<number>;
    range: [number, number];
  }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [20, 0]);

    return (
      <motion.div
        style={{ opacity, y }}
        className="w-full md:w-[44%] bg-white/60 backdrop-blur-sm rounded-2xl border border-black/10 p-4"
      >
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${
            edu.status === 'In Progress'
              ? 'bg-blue-500/20 text-blue-600'
              : 'bg-green-500/20 text-green-600'
          }`}
        >
          {edu.period}
        </span>
        <div className="flex items-center gap-3">
          {edu.logo && (
            <img
              src={edu.logo}
              alt={`${edu.institution} logo`}
              className="w-10 h-10 rounded-xl object-contain bg-white/80 border border-black/10 p-1.5 flex-shrink-0"
            />
          )}
          <div className="text-left min-w-0">
            <h3 className="text-base md:text-lg font-semibold leading-tight tracking-[-0.01em] text-black">
              {edu.degree}
            </h3>
            <p className="text-xs md:text-sm text-gray-600">{edu.institution}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {/* faint full-length track - hide on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-black/10 hidden md:block" />
      {/* animated draw-in line - hide on mobile */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-black origin-top hidden md:block"
        style={{ scaleY: lineScale, height: '100%' }}
      />
      {/* fixed start cap - hide on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-black/30 hidden md:block" />
      {/* fixed end cap - hide on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-2 h-2 rounded-full bg-black/30 hidden md:block" />
      {/* single dot travelling top → bottom - hide on mobile */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-3 h-3 rounded-full bg-black border-[2px] border-[#f0ede8] hidden md:block"
        style={{ top: dotTop, translateY: '-50%' }}
      />

      {/* top spacer */}
      <div className="h-6 md:h-8" />

      <div className="flex flex-col gap-6 md:gap-10">
        {educationData.map((edu, i) => {
          const align = i % 2 === 0 ? 'left' : 'right';
          return (
            <div
              key={i}
              className={`relative flex ${
                align === 'left' ? 'md:justify-start' : 'md:justify-end'
              } justify-center`}
            >
              <EducationCard
                edu={edu}
                align={align}
                progress={scrollYProgress}
                range={revealRanges[i]}
              />
            </div>
          );
        })}
      </div>

      {/* bottom spacer */}
      <div className="h-6 md:h-8" />
    </div>
  );
};

// Draggable Floating Icon Component - hide on mobile
const DraggableFloatingIcon: React.FC<{ 
  children: React.ReactNode; 
  anchor: React.CSSProperties;
  className?: string;
}> = ({ children, anchor, className = "" }) => {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, deltaX: 0, deltaY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY, deltaX: delta.x, deltaY: delta.y };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const { mouseX, mouseY, deltaX, deltaY } = dragStartRef.current;
      setDelta({
        x: deltaX + (moveEvent.clientX - mouseX),
        y: deltaY + (moveEvent.clientY - mouseY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = { mouseX: touch.clientX, mouseY: touch.clientY, deltaX: delta.x, deltaY: delta.y };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0];
      const { mouseX, mouseY, deltaX, deltaY } = dragStartRef.current;
      setDelta({
        x: deltaX + (touch.clientX - mouseX),
        y: deltaY + (touch.clientY - mouseY),
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      className={`absolute z-20 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} hidden md:block ${className}`}
      style={{
        ...anchor,
        transform: `translate(${delta.x}px, ${delta.y}px)`,
        touchAction: 'none',
        userSelect: 'none',
        filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))',
        transition: isDragging ? 'none' : 'transform 0.1s ease',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

// Technical Expertise Data
const skills: Skill[] = [
  { name: "React", icon: <SimpleIcon icon={si.siReact} className="w-6 h-6 md:w-8 md:h-8 text-[#61DAFB]" /> },
  { name: "Next.js", icon: <SimpleIcon icon={si.siNextdotjs} className="w-6 h-6 md:w-8 md:h-8 text-black" /> },
  { name: "Bini.js", icon: <BiniJsIcon className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: "Vite", icon: <SimpleIcon icon={si.siVite} className="w-6 h-6 md:w-8 md:h-8 text-[#646CFF]" /> },
  { name: "TypeScript", icon: <SimpleIcon icon={si.siTypescript} className="w-6 h-6 md:w-8 md:h-8 text-[#3178C6]" /> },
  { name: "JavaScript", icon: <SimpleIcon icon={si.siJavascript} className="w-6 h-6 md:w-8 md:h-8 text-[#F7DF1E]" /> },
  { name: "Python", icon: <SimpleIcon icon={si.siPython} className="w-6 h-6 md:w-8 md:h-8 text-[#3776AB]" /> },
  { name: "Java", icon: <JavaIcon className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: "C#", icon: <CSharpIcon className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: "PHP", icon: <SimpleIcon icon={si.siPhp} className="w-6 h-6 md:w-8 md:h-8 text-[#777BB4]" /> },
  { name: "Rust", icon: <SimpleIcon icon={si.siRust} className="w-6 h-6 md:w-8 md:h-8 text-[#000000]" /> },
  { name: "TailwindCSS", icon: <SimpleIcon icon={si.siTailwindcss} className="w-6 h-6 md:w-8 md:h-8 text-[#06B6D4]" /> },
  { name: "HTML5", icon: <SimpleIcon icon={si.siHtml5} className="w-6 h-6 md:w-8 md:h-8 text-[#E34F26]" /> },
  { name: "CSS3", icon: <SimpleIcon icon={si.siCss} className="w-6 h-6 md:w-8 md:h-8 text-[#1572B6]" /> },
  { name: "Node.js", icon: <SimpleIcon icon={si.siNodedotjs} className="w-6 h-6 md:w-8 md:h-8 text-[#339933]" /> },
  { name: ".NET", icon: <SimpleIcon icon={si.siDotnet} className="w-6 h-6 md:w-8 md:h-8 text-[#512BD4]" /> },
  { name: "Hono", icon: <HonoIcon className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: "Express", icon: <SimpleIcon icon={si.siExpress} className="w-6 h-6 md:w-8 md:h-8 text-black" /> },
  { name: "Fastify", icon: <SimpleIcon icon={si.siFastify} className="w-6 h-6 md:w-8 md:h-8 text-[#000000]" /> },
  { name: "Django", icon: <SimpleIcon icon={si.siDjango} className="w-6 h-6 md:w-8 md:h-8 text-[#092E20]" /> },
  { name: "Flask", icon: <SimpleIcon icon={si.siFlask} className="w-6 h-6 md:w-8 md:h-8 text-black" /> },
  { name: "MySQL", icon: <SimpleIcon icon={si.siMysql} className="w-6 h-6 md:w-8 md:h-8 text-[#4479A1]" /> },
  { name: "PostgreSQL", icon: <SimpleIcon icon={si.siPostgresql} className="w-6 h-6 md:w-8 md:h-8 text-[#4169E1]" /> },
  { name: "MongoDB", icon: <SimpleIcon icon={si.siMongodb} className="w-6 h-6 md:w-8 md:h-8 text-[#47A248]" /> },
  { name: "Redis", icon: <SimpleIcon icon={si.siRedis} className="w-6 h-6 md:w-8 md:h-8 text-[#DC382D]" /> },
  { name: "Firebase", icon: <SimpleIcon icon={si.siFirebase} className="w-6 h-6 md:w-8 md:h-8 text-[#FFCA28]" /> },
  { name: "Docker", icon: <SimpleIcon icon={si.siDocker} className="w-6 h-6 md:w-8 md:h-8 text-[#2496ED]" /> },
  { name: "Kubernetes", icon: <SimpleIcon icon={si.siKubernetes} className="w-6 h-6 md:w-8 md:h-8 text-[#326CE5]" /> },
  { name: "Git", icon: <SimpleIcon icon={si.siGit} className="w-6 h-6 md:w-8 md:h-8 text-[#F05032]" /> },
  { name: "Tauri", icon: <SimpleIcon icon={si.siTauri} className="w-6 h-6 md:w-8 md:h-8 text-[#FFC131]" /> },
  { name: "Linux", icon: <SimpleIcon icon={si.siLinux} className="w-6 h-6 md:w-8 md:h-8 text-[#FCC624]" /> },
  { name: "Windows", icon: <WindowsIcon className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: "macOS", icon: <SimpleIcon icon={si.siMacos} className="w-6 h-6 md:w-8 md:h-8 text-[#000000]" /> },
  { name: "Android", icon: <SimpleIcon icon={si.siAndroid} className="w-6 h-6 md:w-8 md:h-8 text-[#3DDC84]" /> },
  { name: "iOS", icon: <SimpleIcon icon={si.siIos} className="w-6 h-6 md:w-8 md:h-8 text-[#000000]" /> },
  { name: "Web", icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-[#4285F4]" /> },
];

// Helper function to generate GitHub OpenGraph image URL
const getGitHubImage = (repoName: string) => {
  return `https://opengraph.githubassets.com/1/Binidu01/${repoName}`;
};

// Quote Word Component
const QuoteWord: React.FC<{ word: string; progress: MotionValue<number>; range: [number, number] }> = ({
  word,
  progress,
  range,
}) => {
  const color = useTransform(progress, range, ['#d1d5db', '#000000']);
  return (
    <motion.span className="inline-block" style={{ color, marginRight: '0.1em' }}>
      {word}{' '}
    </motion.span>
  );
};

// Quote Section
const quoteWords = [
  'Building', 'tools', 'that', 'empower', 'developers.',
  'Creating', 'frameworks', 'for', 'the', 'future',
  'of', 'cross-platform', 'development.', 'Clean', 'code,',
  'great', 'experiences,', 'and', 'meaningful', 'solutions.',
];

// Quote Section - animation starts when section is centered
const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const progress = useTransform(scrollY, (latest) => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    const centerPosition = containerTop + (containerHeight / 2);
    const viewportCenter = window.scrollY + (viewportHeight / 2);
    
    const animationRange = 500;
    const start = centerPosition - (animationRange / 2) - viewportHeight / 2;
    const end = start + animationRange;
    
    return Math.min(Math.max((latest - start) / (end - start), 0), 1);
  });

  return (
    <div 
      ref={containerRef} 
      className="relative" 
      style={{ height: '200vh' }}
    >
      <div className="h-[10vh]" />
      
      <section 
        ref={sectionRef} 
        className="sticky top-0 w-full bg-[#f0ede8] overflow-hidden"
        style={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-xl md:text-4xl font-medium leading-relaxed tracking-[-0.02em]">
            {quoteWords.map((word, index) => {
              const start = index / quoteWords.length;
              const end = Math.min(start + (1.2 / quoteWords.length), 1);
              return (
                <QuoteWord key={index} word={word} progress={progress} range={[start, end]} />
              );
            })}
          </p>
        </div>
      </section>
      
      <div className="h-[10vh]" />
    </div>
  );
};

// Rolling Text Animation Component
const RollingText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chars = text.split('');

  return (
    <div
      className={`rolling-text-container inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
        height: '1.2em',
        verticalAlign: 'bottom',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {chars.map((char, index) => (
          <span
            key={`main-${index}`}
            className="rolling-char"
            style={{
              display: 'inline-block',
              fontFamily: 'Archivo, "Archivo Placeholder", sans-serif',
              fontSize: 'inherit',
              fontStyle: 'normal',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1.2em',
              transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
              opacity: isHovered ? 0 : 1,
              transition: isHovered 
                ? `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 30}ms, opacity 0.3s ease ${index * 30}ms` 
                : `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(chars.length - 1 - index) * 30}ms, opacity 0.3s ease ${(chars.length - 1 - index) * 30}ms`,
              position: 'relative',
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          alignItems: 'center',
        }}
      >
        {chars.map((char, index) => (
          <span
            key={`dup-${index}`}
            className="rolling-char-duplicate"
            style={{
              display: 'inline-block',
              fontFamily: 'Archivo, "Archivo Placeholder", sans-serif',
              fontSize: 'inherit',
              fontStyle: 'normal',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1.2em',
              transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
              opacity: isHovered ? 1 : 0,
              transition: isHovered 
                ? `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 30}ms, opacity 0.3s ease ${index * 30}ms` 
                : `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(chars.length - 1 - index) * 30}ms, opacity 0.3s ease ${(chars.length - 1 - index) * 30}ms`,
              position: 'relative',
              willChange: 'transform, opacity',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

// Nav toggle
const NavToggleButton: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: '#faf7f3',
        borderRadius: '12px',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#111111' }} strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="dots"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#111111' }} strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Section list - UPDATED: Added Home link, no auto-close on navigation
const NavSectionList: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const sections = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // REMOVED: onNavigate() - no longer closes the menu
    }
  };

  return (
    <div className="flex flex-col gap-1.5 px-3 md:px-5 pb-3 pt-0.5">
      {sections.map((section, i) => (
        <motion.button
          key={section.name}
          onClick={() => scrollTo(section.href)}
          className="px-4 md:px-6 py-[5px] md:py-[7px] rounded-2xl text-left font-semibold text-sm md:text-base"
          style={{ backgroundColor: '#faf7f3', color: '#111111' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RollingText text={section.name} />
        </motion.button>
      ))}
    </div>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" as const
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as const
    }
  }
};

const avatarAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.3 }
  }
};

// Profile Picture with Scroll Animation - Only works on desktop
const ProfilePicWithScroll: React.FC<{ 
  avatarUrl: string; 
  avatarAnimation: any;
  stopRef: React.RefObject<HTMLButtonElement | null>;
  heyRef: React.RefObject<HTMLHeadingElement | null>;
}> = ({ avatarUrl, avatarAnimation, stopRef, heyRef }) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [maxTravel, setMaxTravel] = useState(0);
  const [startScrollY, setStartScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip measurements on mobile
    
    const measure = () => {
      if (!spacerRef.current || !stopRef.current || !heyRef.current) return;

      const spacerRect = spacerRef.current.getBoundingClientRect();
      const stopRect = stopRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY;

      const avatarDocTop = spacerRect.top + currentScroll;
      const stopDocTop = stopRect.top + currentScroll;

      const distance = Math.max(stopDocTop - avatarDocTop, 0);
      // Stop 20px above the button
      setMaxTravel(Math.max(distance * 0.8 - 20, 0));
      setStartScrollY(currentScroll);
    };

    const timeout = setTimeout(measure, 1600);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    const img = spacerRef.current?.querySelector('img');
    if (img) img.addEventListener('load', measure);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      if (img) img.removeEventListener('load', measure);
    };
  }, [stopRef, heyRef, isMobile]);

  const progress = useTransform(scrollY, (latest) => {
    if (isMobile || maxTravel <= 0) return 0;
    const delta = latest - startScrollY;
    return Math.min(Math.max(delta / maxTravel, 0), 1);
  });

  const y = useTransform(progress, (p) => isMobile ? 0 : p * maxTravel);
  const rotateY = useTransform(progress, (p) => isMobile ? 0 : p * 180);

  return (
    <div ref={spacerRef} className="relative w-32 h-40 md:w-44 md:h-56 lg:w-52 lg:h-64 flex-shrink-0 mx-4 md:mx-12">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        variants={avatarAnimation}
        initial="hidden"
        animate="visible"
        style={{ y, zIndex: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl" style={{ perspective: 1200 }}>
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d', rotateY }}
          >
            {/* Front — grayscale, visible at rest */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              {avatarUrl ? (
                <img 
                  src={avatarUrl}
                  alt="Binidu Ranasinghe"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>

            {/* Back — color, revealed after the flip */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden', 
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {avatarUrl && (
                <img 
                  src={avatarUrl}
                  alt="Binidu Ranasinghe"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Project Card Component - Clicking goes directly to the site URL
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imageError, setImageError] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project.url) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchScreenshot = async () => {
      try {
        const url = `https://api.microlink.io?url=${encodeURIComponent(project.url!)}&screenshot=true&waitUntil=networkidle0&viewport.width=1920&viewport.height=1080`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'success' && data.data?.screenshot?.url && isMounted) {
          setScreenshotUrl(data.data.screenshot.url);
        }
      } catch (err) {
        console.error('Failed to fetch screenshot for', project.id, ':', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchScreenshot();

    return () => {
      isMounted = false;
    };
  }, [project.url, project.id]);

  const getImageUrl = () => {
    if (project.url && screenshotUrl && !imageError) {
      return screenshotUrl;
    }
    return project.image;
  };

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <motion.div
      className="group block cursor-pointer"
      variants={scaleIn}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <div className="aspect-[1.45] bg-gray-100 rounded-2xl overflow-hidden relative">
        {loading && project.url ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] md:text-xs text-gray-400 mt-2">Loading preview...</p>
          </div>
        ) : (
          <img
            src={getImageUrl()}
            alt={project.title}
            className="w-full h-full object-cover bg-gray-50"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-xs md:text-sm font-medium">Visit Project</p>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 mx-auto mt-1" />
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-3">
        <h3 className="text-base md:text-xl font-medium">{project.title}</h3>
        <p className="text-gray-500 text-xs md:text-sm line-clamp-2">{project.description}</p>
        {project.url && (
          <p className="text-[10px] md:text-xs text-gray-400 mt-1 truncate">{new URL(project.url).hostname}</p>
        )}
      </div>
    </motion.div>
  );
};

// Custom Button with Rolling Text
const RollingButton: React.FC<{ 
  text: string; 
  className?: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}> = ({ text, className = '', onClick, ref }) => {
  const [isHovered, setIsHovered] = useState(false);
  const chars = text.split('');

  return (
    <motion.button
      ref={ref}
      className={`inline-flex items-center gap-2 w-fit px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors font-medium text-sm md:text-base ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          position: 'relative',
          height: '1.2em',
          verticalAlign: 'bottom',
        }}
      >
        <span
          style={{
            display: 'flex',
            position: 'relative',
            height: '100%',
            alignItems: 'center',
          }}
        >
          {chars.map((char, index) => (
            <span
              key={`main-${index}`}
              style={{
                display: 'inline-block',
                fontFamily: 'Archivo, "Archivo Placeholder", sans-serif',
                fontSize: 'inherit',
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: '1.2em',
                transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
                opacity: isHovered ? 0 : 1,
                transition: isHovered 
                  ? `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 30}ms, opacity 0.3s ease ${index * 30}ms` 
                  : `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(chars.length - 1 - index) * 30}ms, opacity 0.3s ease ${(chars.length - 1 - index) * 30}ms`,
                position: 'relative',
                willChange: 'transform, opacity',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>

        <span
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            alignItems: 'center',
          }}
        >
          {chars.map((char, index) => (
            <span
              key={`dup-${index}`}
              style={{
                display: 'inline-block',
                fontFamily: 'Archivo, "Archivo Placeholder", sans-serif',
                fontSize: 'inherit',
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: '1.2em',
                transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                opacity: isHovered ? 1 : 0,
                transition: isHovered 
                  ? `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 30}ms, opacity 0.3s ease ${index * 30}ms` 
                  : `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(chars.length - 1 - index) * 30}ms, opacity 0.3s ease ${(chars.length - 1 - index) * 30}ms`,
                position: 'relative',
                willChange: 'transform, opacity',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
    </motion.button>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const getStartedRef = useRef<HTMLButtonElement>(null);
  const heyRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Binidu01');
        const data = await response.json();
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
        setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop');
      }
    };
    fetchAvatar();
  }, []);

  const featuredProjects: Project[] = [
    {
      id: 'bini',
      title: 'Bini.js',
      description: 'React framework for cross-platform development. One codebase, six platforms, zero boilerplate.',
      image: getGitHubImage('bini-cli'),
      slug: 'bini',
      repo: 'bini-cli',
      url: 'https://bini.js.org/',
    },
    {
      id: 'humanize',
      title: 'Hummanize-AI',
      description: 'Humanizer AI enhances machine-generated text to sound more natural and human-like.',
      image: getGitHubImage('Hummanize-AI'),
      slug: 'hummanize-ai',
      repo: 'Hummanize-AI',
      url: 'https://humanize-ai-amber.vercel.app/',
    },
    {
      id: 'travel-assistant',
      title: 'Travel Assistant AI',
      description: 'AI-powered conversational assistant for discovering hotels and planning trips across Sri Lanka.',
      image: getGitHubImage('Travel-Assistant'),
      slug: 'travel-assistant',
      repo: 'Travel-Assistant',
      url: 'https://travel-assistant-lac.vercel.app/',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0ede8] relative">
      {/* Fixed Navbar - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 md:px-4 py-3 md:py-4">
        <div
          className="shadow-lg w-full max-w-[280px] md:max-w-[320px] rounded-[20px]"
          style={{ 
            backgroundColor: '#111111', 
          }}
        >
          <div className="flex items-center justify-between gap-4 md:gap-6 pl-5 md:pl-7 pr-2 md:pr-2.5 py-[5px] md:py-[7px]">
            <a 
              href="#home" 
              className="text-[#faf7f3] no-underline hover:opacity-80 transition-opacity font-semibold text-lg md:text-xl whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Binidu
            </a>

            <NavToggleButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>

          <AnimatePresence initial={false}>
            {isMenuOpen && (
              <motion.div
                key="nav-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden rounded-b-[20px]"
              >
                <NavSectionList isOpen={isMenuOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main content with top padding to account for fixed navbar */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-3 md:px-4 pt-20 md:pt-24">
        {/* Hero Section */}
        <section id="home" className="w-full min-h-[calc(100vh-180px)] flex items-center justify-center">
          <div className="flex flex-col items-center relative w-full py-6 md:py-8 mt-[120px] md:mt-[175px] lg:mt-[190px]">
            <motion.div 
              className="relative w-full max-w-4xl mb-8 md:mb-12 lg:mb-16 flex justify-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <DraggableFloatingIcon 
                anchor={{ top: '-28%', left: '-18%' }}
                className="w-20 h-20 sm:w-[140px] sm:h-[140px] md:w-40 md:h-40"
              >
                <img 
                  src="https://framerusercontent.com/images/OLDYsHB9RMavvQrkVRNy08ZXYE.png"
                  alt="Lightning icon"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </DraggableFloatingIcon>

              <DraggableFloatingIcon 
                anchor={{ bottom: '-26%', right: '-15%' }}
                className="w-20 h-20 sm:w-[140px] sm:h-[140px] md:w-40 md:h-40"
              >
                <img 
                  src="https://framerusercontent.com/images/lIIjRX5gxRdY7UWw5wqIXicPOA.png"
                  alt="Star icon"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </DraggableFloatingIcon>
              
              <motion.h1 
                style={{ 
                  fontSize: 'clamp(48px, 11.5vw, 172px)',
                  fontFamily: '"Archivo", "Archivo Placeholder", sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: '0.9em',
                  textAlign: 'center',
                  color: '#000',
                  textDecoration: 'none',
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                variants={staggerContainer}
              >
                {['SOFTWARE', 'ENGINEER'].map((word, index) => (
                  <motion.span 
                    key={index}
                    style={{
                      fontFamily: '"Archivo", "Archivo Placeholder", sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: '0.9em',
                      color: '#000',
                      textDecoration: 'none',
                      textTransform: 'none',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      marginTop: index === 0 ? '25px' : '0', // Added 25px margin-top for SOFTWARE
                    }}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8,
                      ease: "easeOut" as const
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
            
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mx-auto mt-2 md:mt-4 gap-4 md:gap-0">
              <motion.span 
                className="font-bold whitespace-nowrap pb-0 md:pb-1"
                style={{ 
                  fontSize: 'clamp(28px, 5vw, 64px)',
                  color: '#000',
                  marginRight: '0',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                ©2026
              </motion.span>
              
              <ProfilePicWithScroll 
                avatarUrl={avatarUrl} 
                avatarAnimation={avatarAnimation}
                stopRef={getStartedRef}
                heyRef={heyRef}
              />
              
              <motion.span 
                className="font-medium tracking-wide whitespace-nowrap pb-0 md:pb-2 text-center"
                style={{ 
                  fontSize: 'clamp(12px, 1.5vw, 20px)',
                  color: '#000',
                  marginLeft: '0',
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                /BUILDING SINCE 2024
              </motion.span>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <motion.section 
          id="about" 
          className="w-full pt-[200px] md:pt-[480px] pb-16 md:pb-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto px-3 md:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[280px] items-stretch">
              {/* Left Column */}
              <div className="flex flex-col justify-between h-full">
                <motion.h2 
                  ref={heyRef}
                  className="text-[48px] md:text-[76px] font-semibold leading-[1] tracking-[-0.02em] -mt-2 md:-mt-4"
                  variants={fadeInUp}
                >
                  Hey!
                </motion.h2>
                <motion.p 
                  style={{
                    fontFamily: '"Archivo", "Archivo Placeholder", sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    letterSpacing: '-0.04em',
                    lineHeight: '1.4em',
                    textAlign: 'left',
                    color: '#111111',
                  }}
                  variants={fadeInUp}
                >
                  I'm Binidu, a software engineer and open-source creator. I build tools and frameworks that make developers' lives easier.
                </motion.p>
              </div>

              {/* Right Column */}
              <motion.div 
                className="flex flex-col justify-between h-full"
                variants={staggerContainer}
              >
                {/* First paragraph with bottom margin */}
                <motion.p 
                  variants={fadeInUp}
                  className="mb-4"
                  style={{
                    fontFamily: '"Archivo", "Archivo Placeholder", sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: '1.5em',
                    textAlign: 'left',
                    color: '#000000',
                  }}
                >
                  I'm passionate about creating developer tools, frameworks, and cross-platform solutions. My work focuses on eliminating complexity and letting developers focus on what matters.
                </motion.p>

                {/* paragraph 2 + button grouped with original tight gap */}
                <div className="space-y-4">
                  <motion.p 
                    variants={fadeInUp}
                    style={{
                      fontFamily: '"Archivo", "Archivo Placeholder", sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      lineHeight: '1.5em',
                      textAlign: 'left',
                      color: '#000000',
                    }}
                  >
                    I created Bini.js, a React framework that enables developers to ship apps across web, desktop, and mobile from a single codebase with zero boilerplate.
                  </motion.p>
                  <RollingButton 
                    text="View CV" 
                    ref={getStartedRef}
                    onClick={() => window.open('https://drive.google.com/file/d/1wqcN9xYj-VY19v-41WFrYT_h3u60Jzpf/view?usp=sharing', '_blank')}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quote Section */}
        <QuoteSection />

        {/* Education Section with Timeline */}
        <motion.section 
          id="education" 
          className="w-full py-16 md:py-24 mt-[10%] md:mt-[20%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto px-3 md:px-4">
            <motion.h2 
              className="text-[40px] md:text-[76px] font-semibold leading-[1] tracking-[-0.02em] text-black mb-8 md:mb-10 text-center"
              variants={fadeInUp}
            >
              Education
            </motion.h2>

            <EducationTimeline />
          </div>
        </motion.section>

        {/* Technical Expertise Section */}
        <motion.section 
          id="expertise" 
          className="w-full py-16 md:py-24 mt-[10%] md:mt-[20%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto px-3 md:px-4">
            <motion.h2 
              className="text-[40px] md:text-[76px] font-semibold leading-[1] tracking-[-0.02em] text-black mb-8 md:mb-12 text-center"
              variants={fadeInUp}
            >
              Technical Expertise
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4"
              variants={staggerContainer}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-black/5 hover:border-black/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center"
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-1 md:mb-2">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] md:text-sm font-medium text-gray-700">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="w-full py-16 md:py-24 mt-[10%] md:mt-[20%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto px-3 md:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 md:mb-8 gap-4 sm:gap-0">
              <motion.h2 
                className="text-[40px] md:text-[76px] font-semibold leading-[1] tracking-[-0.02em] whitespace-nowrap"
                variants={fadeInUp}
              >
                Featured Projects
              </motion.h2>
              <motion.a 
                href="https://github.com/Binidu01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-black hover:bg-black hover:text-white transition-colors ml-0 md:ml-4 flex-shrink-0 text-sm md:text-base"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RollingText text="View All on GitHub" />
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </motion.a>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
              variants={staggerContainer}
            >
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section - Icon Only Buttons with Simple Icons WhatsApp */}
        <motion.section 
          id="contact" 
          className="w-full py-10 md:py-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="max-w-5xl mx-auto px-3 md:px-4">
            <div className="text-center">
              <motion.h2 
                className="text-[40px] md:text-[76px] font-semibold leading-[1] tracking-[-0.02em] mb-3 md:mb-4"
                variants={fadeInUp}
              >
                Let's Connect.
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base"
                variants={fadeInUp}
              >
                Have a project or want to collaborate? Reach out to me through any of these channels.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3 md:gap-4 justify-center mb-6 md:mb-8"
                variants={staggerContainer}
              >
                {/* Email Button - Opens Gmail with pre-filled address */}
                <motion.a
                  href="mailto:rbinidu@gmail.com?subject=Hello%20Binidu&body=Hi%20Binidu%2C%20I%20would%20like%20to%20connect%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center transition-all hover:scale-110 hover:bg-red-500/20"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: '#EA4335' }}
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
                
                {/* WhatsApp Button with Simple Icons WhatsApp */}
                <motion.a
                  href="https://wa.me/94703850455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center transition-all hover:scale-110 hover:bg-green-500/20"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: '#25D366' }}
                >
                  <SimpleIcon icon={si.siWhatsapp} className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
                
                {/* Phone Call Button */}
                <motion.a
                  href="tel:+94787296686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center transition-all hover:scale-110 hover:bg-blue-500/20"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: '#4285F4' }}
                >
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/Binidu01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center transition-all hover:scale-110 hover:bg-black/20"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: '#181717' }}
                >
                  <SimpleIcon icon={si.siGithub} className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/binidu-ranasinghe-a6497b300/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center transition-all hover:scale-110 hover:bg-[#0A66C2]/20"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: '#0A66C2' }}
                >
                  <LinkedinIcon className="w-5 h-5 md:w-6 md:h-6" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer - CORRECTED QUICK LINKS */}
      <motion.footer 
        className="w-full bg-black text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-[1180px] mx-auto px-3 md:px-4 py-8 md:py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <motion.h2 
                className="text-[40px] md:text-[68px] font-semibold leading-tight tracking-[-0.02em]"
                variants={fadeInUp}
              >
                Building<br />
                for Developers.
              </motion.h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div>
                <motion.h4 
                  className="text-base md:text-lg font-medium mb-3 md:mb-4"
                  variants={fadeInUp}
                >
                  /Quick links
                </motion.h4>
                <motion.div 
                  className="flex flex-wrap gap-1.5 md:gap-2"
                  variants={staggerContainer}
                >
                  {['Home', 'About', 'Education', 'Expertise', 'Projects', 'Contact'].map((link) => (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-[#faf7f3] text-black text-xs md:text-sm hover:opacity-80 transition-opacity"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetId = link.toLowerCase();
                        if (targetId === 'home') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      <RollingText text={link} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
              <div>
                <motion.h4 
                  className="text-base md:text-lg font-medium mb-3 md:mb-4"
                  variants={fadeInUp}
                >
                  /Contact
                </motion.h4>
                <motion.div
                  className="flex flex-col gap-2 md:gap-3"
                  variants={staggerContainer}
                >
                  <motion.a
                    href="mailto:rbinidu@gmail.com"
                    className="text-xs md:text-sm hover:underline inline-block"
                    variants={fadeInUp}
                  >
                    <RollingText text="rbinidu@gmail.com" />
                  </motion.a>
                  <motion.a
                    href="tel:+94787296686"
                    className="text-xs md:text-sm hover:underline inline-block"
                    variants={fadeInUp}
                  >
                    <RollingText text="+94 78 729 6686" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[120px] md:text-[300px] font-bold text-white/5 leading-none pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
        >
          BINIDU
        </motion.div>
      </motion.footer>
    </div>
  );
}