import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Zap } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      description:
        "Real-time analytics platform with machine learning insights and predictive modeling for enterprise-level data processing.",
      image: "/placeholder.svg?height=300&width=400&text=Analytics+Dashboard",
      technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "AWS"],
      github: "#",
      demo: "#",
      featured: true,
      status: "Live",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and advanced inventory management system.",
      image: "/placeholder.svg?height=300&width=400&text=E-commerce+Platform",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Docker"],
      github: "#",
      demo: "#",
      featured: false,
      status: "In Development",
    },
    {
      id: 3,
      title: "Smart Content Generator",
      description:
        "AI-driven content creation tool using GPT models for automated writing assistance and SEO optimization.",
      image: "/placeholder.svg?height=300&width=400&text=Content+Generator",
      technologies: ["TypeScript", "OpenAI API", "React", "Tailwind CSS"],
      github: "#",
      demo: "#",
      featured: true,
      status: "Live",
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      description:
        "Scalable chat platform with WebSocket integration, message encryption, and advanced moderation features.",
      image: "/placeholder.svg?height=300&width=400&text=Chat+Application",
      technologies: ["Socket.io", "Express", "React", "Redis", "JWT"],
      github: "#",
      demo: "#",
      featured: false,
      status: "Live",
    },
  ]

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work in fullstack development and AI integration
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <Card
                key={project.id}
                className={`group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-emerald-400/50 transition-all duration-500 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                        index === 0 ? "h-64" : "h-48"
                      }`}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/90 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">{project.status}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <a
                        href={project.github}
                        className="p-2 bg-gray-950/80 backdrop-blur-sm rounded-full hover:bg-emerald-500/80 transition-all duration-300 hover:scale-110"
                      >
                        <Github className="h-4 w-4 text-white" />
                      </a>
                      <a
                        href={project.demo}
                        className="p-2 bg-gray-950/80 backdrop-blur-sm rounded-full hover:bg-emerald-500/80 transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4 text-white" />
                      </a>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30 hover:bg-emerald-500/30 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge className="bg-gray-800/50 text-gray-300 border-gray-700">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project) => (
              <Card
                key={project.id}
                className="group bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-sm font-medium">{project.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <a href={project.github} className="p-1.5 text-gray-400 hover:text-emerald-400 transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                      <a href={project.demo} className="p-1.5 text-gray-400 hover:text-emerald-400 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="bg-emerald-500/10 text-emerald-400 border-emerald-400/20 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  )
}
