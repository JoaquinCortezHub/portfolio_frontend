import Header from "./components/header"
import SkillsBanner from "./components/skills-banner"
import AboutMe from "./components/about-me"
import Projects from "./components/projects"
import Services from "./components/services"
import BlogPosts from "./components/blog-posts"
import Contact from "./components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <AboutMe />
      <Services />
      <SkillsBanner />
      <Projects />
      <BlogPosts />
      <Contact />
    </main>
  )
}
