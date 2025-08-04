import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Brain, Smartphone, Database, Cloud, Zap, ArrowRight, Sparkles } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Full-Stack Development",
      description:
        "End-to-end web application development using modern frameworks and best practices for scalable solutions.",
      features: ["React/Next.js", "Node.js/Python", "Database Design"],
      size: "large",
      highlight: true,
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Integration",
      description: "Implement machine learning models and AI-powered features into your applications.",
      features: ["ML Models", "OpenAI API", "Custom AI Solutions"],
      size: "large",
      highlight: true,
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Development",
      description: "Cross-platform mobile applications with React Native.",
      features: ["React Native", "iOS/Android"],
      size: "small",
      highlight: false,
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Design",
      description: "Scalable database architecture and optimization.",
      features: ["PostgreSQL", "MongoDB", "Redis"],
      size: "small",
      highlight: false,
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Solutions",
      description: "Deploy and manage applications on cloud platforms with DevOps best practices.",
      features: ["AWS/Azure", "Docker", "CI/CD"],
      size: "medium",
      highlight: false,
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Optimize application performance and user experience.",
      features: ["Speed Optimization", "SEO", "Analytics"],
      size: "medium",
      highlight: false,
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-900/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">What I Offer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your business needs
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02] ${
                service.highlight
                  ? "border-emerald-400/50 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                  : "border-gray-800/50 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-500/10"
              } ${
                service.size === "large"
                  ? "md:col-span-2 lg:col-span-3"
                  : service.size === "medium"
                    ? "md:col-span-2 lg:col-span-2"
                    : "md:col-span-2 lg:col-span-2"
              }`}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      service.highlight
                        ? "bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/25"
                        : "bg-emerald-500/20 group-hover:bg-emerald-500/30"
                    }`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>

                  {service.highlight && (
                    <div className="px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                      <span className="text-emerald-400 text-xs font-medium">Popular</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs border border-emerald-400/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full group/btn transition-all duration-300 ${
                    service.highlight
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-semibold shadow-lg shadow-emerald-500/25"
                      : "bg-transparent border border-emerald-400/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400"
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {/* Glow Effect */}
              {service.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-emerald-400/30">
            <div className="text-emerald-400">
              <Zap className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Need something custom?</p>
              <p className="text-gray-400 text-sm">Let's discuss your unique requirements</p>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
