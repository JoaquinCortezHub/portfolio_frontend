"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgb(16 185 129 / 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse" />
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400/40 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 px-6 py-3 bg-gray-950/80 backdrop-blur-md rounded-full border border-gray-800/50">
          <a href="/" className="text-white text-sm font-medium hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="/blog" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors">
            Blog
          </a>
          <div className="w-px h-4 bg-gray-700" />
          <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border border-gray-800">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
            <Image
              src="/placeholder.svg?height=96&width=96&text=JC"
              alt="Joaquin Cortez"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <p className="text-gray-400 text-lg font-medium">Hi, I'm Joaquín 👋</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
            Full-stack & AI
            <br />
            <span className="text-emerald-400">Developer</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            I love building eye-catching products with data-driven results that make an impact on people.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <a href="#" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>

        {/* CTA Button */}
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
          Let's Work Together
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </header>
  )
}
