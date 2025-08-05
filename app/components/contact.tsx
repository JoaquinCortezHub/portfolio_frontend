import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Github, Linkedin, Twitter, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-950 via-green-900/20 to-emerald-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Me</h3>
                  <p className="text-gray-400">joaquin@example.com</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-semibold">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
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
              <Button
                variant="outline"
                className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
              >
                Book a Call
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6 text-white">Follow Me</h3>
          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" size="icon" className="border-emerald-400 hover:bg-emerald-400/20 bg-transparent">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-emerald-400 hover:bg-emerald-400/20 bg-transparent">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-emerald-400 hover:bg-emerald-400/20 bg-transparent">
              <Twitter className="h-5 w-5" />
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
