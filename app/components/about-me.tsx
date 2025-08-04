"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Heart, Lightbulb, Play, Pause } from "lucide-react"

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const tabs = [
    {
      id: "story",
      label: "My Story",
      icon: <User className="h-4 w-4" />,
      title: "From Curiosity to Code",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed text-lg">
            My journey into tech started with a simple question: "How does this work?" That curiosity led me from
            tinkering with my first computer to building complex AI-powered applications that solve real-world problems.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Today, I bridge the gap between cutting-edge technology and practical business solutions, helping companies
            leverage the power of AI and modern web development.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
              5+ Years Experience
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
              50+ Projects
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
              Global Clients
            </Badge>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="h-4 w-4" />,
      title: "Building the Future",
      content: (
        <div className="space-y-8">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-transparent"></div>
            <div className="space-y-8">
              <div className="relative pl-12">
                <div className="absolute left-2 top-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-gray-950"></div>
                <h4 className="font-bold text-white text-lg mb-2">Senior Full-Stack Developer</h4>
                <p className="text-emerald-400 font-medium mb-3">2022 - Present</p>
                <p className="text-gray-300 leading-relaxed">
                  Leading AI integration projects and building scalable web applications for enterprise clients.
                </p>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2 top-2 w-4 h-4 bg-emerald-500/60 rounded-full border-4 border-gray-950"></div>
                <h4 className="font-bold text-white text-lg mb-2">Full-Stack Developer</h4>
                <p className="text-gray-400 font-medium mb-3">2020 - 2022</p>
                <p className="text-gray-300 leading-relaxed">
                  Developed modern web applications using React, Node.js, and cloud technologies.
                </p>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-2 top-2 w-4 h-4 bg-emerald-500/30 rounded-full border-4 border-gray-950"></div>
                <h4 className="font-bold text-white text-lg mb-2">Junior Developer</h4>
                <p className="text-gray-400 font-medium mb-3">2019 - 2020</p>
                <p className="text-gray-300 leading-relaxed">
                  Started my professional journey building responsive websites and learning modern frameworks.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "approach",
      label: "Approach",
      icon: <Lightbulb className="h-4 w-4" />,
      title: "My Development Philosophy",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <h4 className="font-bold text-emerald-300 text-lg mb-3">User-Centric Design</h4>
            <p className="text-gray-300 leading-relaxed">
              Every line of code I write is focused on creating exceptional user experiences that delight and engage.
            </p>
          </div>
          <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <h4 className="font-bold text-emerald-300 text-lg mb-3">Performance First</h4>
            <p className="text-gray-300 leading-relaxed">
              Optimized, scalable solutions that perform beautifully under any load, ensuring smooth user experiences.
            </p>
          </div>
          <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <h4 className="font-bold text-emerald-300 text-lg mb-3">AI Integration</h4>
            <p className="text-gray-300 leading-relaxed">
              Leveraging machine learning to create intelligent, adaptive applications that learn and improve.
            </p>
          </div>
          <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <h4 className="font-bold text-emerald-300 text-lg mb-3">Clean Code</h4>
            <p className="text-gray-300 leading-relaxed">
              Maintainable, well-documented code that stands the test of time and scales with your business.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "personal",
      label: "Beyond Code",
      icon: <Heart className="h-4 w-4" />,
      title: "When I'm Not Coding",
      content: (
        <div className="space-y-8">
          <p className="text-gray-300 leading-relaxed text-lg">
            I believe the best developers are well-rounded individuals. When I'm not building applications, you'll find
            me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical
            writing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎸</div>
              <p className="text-gray-300 font-medium">Music</p>
            </div>
            <div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
              <p className="text-gray-300 font-medium">Reading</p>
            </div>
            <div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏃‍♂️</div>
              <p className="text-gray-300 font-medium">Running</p>
            </div>
            <div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">✈️</div>
              <p className="text-gray-300 font-medium">Travel</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => (current + 1) % tabs.length)
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isAutoPlaying, tabs.length])

  // Reset progress when tab changes manually
  useEffect(() => {
    setProgress(0)
  }, [activeTab])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setProgress(0)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    if (!isAutoPlaying) {
      setProgress(0)
    }
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">Get to know the person behind the code</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Navigation */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tab Navigation */}
            <div className="space-y-3">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 group ${
                    activeTab === index
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                      : "bg-gray-900/30 border border-gray-800/50 text-gray-400 hover:text-gray-300 hover:bg-gray-900/50 hover:border-gray-700/50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      activeTab === index
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === index && (
                      <div className="w-full bg-emerald-500/20 rounded-full h-1 mt-2">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Auto-play Control */}
            <div className="flex items-center justify-center p-4 bg-gray-900/30 rounded-2xl border border-gray-800/50">
              <button
                onClick={toggleAutoPlay}
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors font-medium"
              >
                {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isAutoPlaying ? "Pause Auto-Play" : "Resume Auto-Play"}
              </button>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-8">
            <div className="min-h-[500px] p-8 md:p-12 bg-gray-900/20 backdrop-blur-sm rounded-3xl border border-gray-800/30">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{tabs[activeTab].title}</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>

              <div className="animate-in fade-in duration-500">{tabs[activeTab].content}</div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Indicators */}
        <div className="flex justify-center mt-12 gap-3">
          {tabs.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`transition-all duration-300 rounded-full ${
                activeTab === index ? "bg-emerald-500 w-12 h-3" : "bg-gray-700 hover:bg-gray-600 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
