"use client"

export default function SkillsBanner() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "OpenAI API",
    "PostgreSQL",
    "Docker",
    "REST APIs",
    "Machine Learning",
    "Tailwind CSS",
    "Git",
    "UX/UI",
    "Nest.js",
    "Scikit Learn"
  ]

  return (
    <section className="py-12 bg-gray-900/50 overflow-hidden border-y border-emerald-500/20">
      <div className="relative">
        <div className="flex animate-scroll">
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 px-6 py-3 bg-emerald-500/20 rounded-full border border-emerald-400/50 shadow-lg shadow-emerald-500/20 backdrop-blur-sm"
            >
              <span className="text-white font-medium whitespace-nowrap">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
