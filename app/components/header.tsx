"use client"

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { WarpBackground } from "@/components/magicui/warp-background"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern className="absolute inset-0 opacity-45" />
      {/* Fixed Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 px-6 py-3 bg-gray-950/80 backdrop-blur-md rounded-full border border-gray-800/50">
          <a href="/" className="text-white text-sm font-medium hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="/about" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors">about</a>
          <a href="/projects" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors">services</a>
          <a href="/projects" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors">projects</a>
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
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border border-gray-800">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
            <Image
              src="/profile.jpg"
              alt="Joaquin Cortez"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        
        <div className="mt-  mb-12">
          <p className="text-gray-400 text-xl font-medium">Hi, I'm Joaquín 👋</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
            Full-stack & AI
            <br />
            <span className="text-emerald-400">Developer</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
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
      </div>
    </header>
  )
}
