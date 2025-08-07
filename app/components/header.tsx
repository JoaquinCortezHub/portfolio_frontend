"use client"

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, Info, Linkedin, Mail, Twitter, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isCalendlyClicked, setIsCalendlyClicked] = useState(false);
  const [isFormEnabled, setIsFormEnabled] = useState(false);

  const handleCalendlyClick = () => {
    setIsCalendlyClicked(true)
    setIsFormEnabled(true)
    window.open("https://calendly.com/joaquinlucascortez/discovery-call", "_blank")
  }

  return (
    <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern className="absolute inset-0 opacity-45" />
      {/* Fixed Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 px-6 py-3 bg-gray-950/80 backdrop-blur-md rounded-full border border-gray-800/50">
          <a href="/" className="text-white text-sm font-medium hover:text-emerald-400 transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors ">about</a>
          <a href="#services" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors ">services</a>
          <a href="#projects" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors ">projects</a>
          <a href="/blog" className="text-gray-400 text-sm font-medium hover:text-emerald-400 transition-colors ">
            Blog
          </a>
          <div className="w-px h-4 bg-gray-700" />
          <a href="#contact" className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
            Contact
          </a>
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
        
        <div className="mb-12">
          <p className="text-gray-400 text-2xl font-medium">Hi, I'm Joaquín 👋</p>

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
          <a href="https://github.com/JoaquinCortezHub" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/joaqu%C3%ADn-cortez/" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://x.com/JoacoLCortez" className="p-3 text-gray-400 hover:text-emerald-400 transition-colors">
            <X className="h-5 w-5" />
          </a>
        </div>

        {/* CTA Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-8 text-lg rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
              Let's Work Together
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-950/80 backdrop-blur-md border-gray-800/50 text-white">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Book a Discovery Call</DialogTitle>
              <DialogDescription className="text-gray-400 mt-2 text-md">
                First, book a discovery call with me to discuss your project. After that, you'll be able to fill out a form with more details about your business.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <label className="flex gap-2 items-center">
                <Info />
                First schedule a free call with me: 
                </label>
              <Button onClick={handleCalendlyClick} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">
                Book a Call on Calendly
              </Button>
              <label className="flex gap-2 items-center">
                <Info />
                Then please fill out this form: 
                </label>
              <Button asChild disabled={!isFormEnabled} className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfrI8BeMmE3GN7Eg2tVT2acOfgAFSzc2oL111FhY3cC5faEPw/viewform?usp=dialog" target="_blank">
                  Fill Out Business Details
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
