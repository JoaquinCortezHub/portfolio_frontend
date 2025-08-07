"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Mail, MessageCircle, Github, Linkedin, Twitter, MapPin, Info, X } from "lucide-react"
import Link from "next/link"

export default function Contact() {

  const handleCalendlyClick = () => {
    window.open("https://calendly.com/joaquinlucascortez/discovery-call", "_blank")
  }
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-950 via-green-900/20 to-emerald-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Card className="bg-gray-900 border-gray-800 px-8 py-6 mb-12">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mr-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Let's Chat</h3>
                  <p className="text-gray-400">Schedule a consultation</p>
                </div>
              </div>
              <Dialog>
          <DialogTrigger asChild>
            <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 bg-transparent hover:text-white hover"
            >
                Book a Call
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
              <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfrI8BeMmE3GN7Eg2tVT2acOfgAFSzc2oL111FhY3cC5faEPw/viewform?usp=dialog" target="_blank">
                  Fill Out Business Details
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6 text-white">Follow Me</h3>
          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" size="icon" className="border-emerald-400 bg-transparent">
              <Link href={"https://github.com/JoaquinCortezHub"}>
              <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-emerald-400 bg-transparent">
              <Link href={"https://www.linkedin.com/in/joaqu%C3%ADn-cortez/"}>
              <Linkedin className=" h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="border-emerald-400 bg-transparent">
              <Link href={"https://x.com/JoacoLCortez"}>
              <X className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Available for remote work worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
