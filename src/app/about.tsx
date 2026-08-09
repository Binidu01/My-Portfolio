import React from 'react';

// --- Icons (simple inline SVG) ---
const TeamIcon = () => (
  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const MissionIcon = () => (
  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ValuesIcon = () => (
  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// --- Team Member Component ---
const TeamMember = ({ name, role, image, description }: { name: string; role: string; image: string; description: string }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
    <div className="h-48 w-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-gray-400">
      {/* Placeholder for image - in real app use <img src={image} alt={name} /> */}
      <svg className="w-24 h-24 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-indigo-600 font-medium text-sm">{role}</p>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- Main About Page Component ---
const AboutPage = () => {
  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Co-founder",
      image: "alex.jpg",
      description: "Passionate about building products that make a difference. 10+ years in tech leadership."
    },
    {
      name: "Jamie Chen",
      role: "CTO & Co-founder",
      image: "jamie.jpg",
      description: "Full-stack architect with a love for clean code and scalable systems. Open-source contributor."
    },
    {
      name: "Taylor Smith",
      role: "Head of Design",
      image: "taylor.jpg",
      description: "Design thinker focused on human-centric experiences. Previously at leading design agencies."
    },
    {
      name: "Jordan Lee",
      role: "Product Manager",
      image: "jordan.jpg",
      description: "Bridging the gap between users and technology. Data-driven and user-obsessed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#818cf8,_transparent_50%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-800">
            About <span className="text-indigo-600">Us</span>
          </h1>
          <div className="w-24 h-1.5 bg-indigo-500 mx-auto my-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team dedicated to creating meaningful digital experiences. 
            Our mission is to empower people through thoughtful technology.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-4"><MissionIcon /></div>
            <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              To build tools that simplify complexity and bring joy to everyday tasks.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-4"><ValuesIcon /></div>
            <h3 className="text-xl font-semibold text-gray-800">Our Values</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Transparency, curiosity, and a relentless focus on user outcomes.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 text-center transition-all hover:shadow-md">
            <div className="flex justify-center mb-4"><TeamIcon /></div>
            <h3 className="text-xl font-semibold text-gray-800">Our Team</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              A diverse group of creators, engineers, and dreamers from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Meet the Team</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The people behind the product — dedicated, creative, and always pushing boundaries.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* CTA / Contact */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold">Want to work with us?</h2>
          <p className="text-indigo-100 mt-2 max-w-xl mx-auto">
            We're always looking for talented people to join our mission.
          </p>
          <button className="mt-6 bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition shadow-lg hover:shadow-xl">
            Get in touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-8 border-t border-gray-200/50">
        <p>© 2026 Your Company. All rights reserved. Built with React and Tailwind CSS v4.</p>
      </footer>
    </div>
  );
};

export default AboutPage;