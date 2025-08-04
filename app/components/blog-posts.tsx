import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"

export default function BlogPosts() {
  const posts = [
    {
      id: 1,
      title: "Building Scalable AI Applications with Next.js",
      excerpt:
        "Learn how to integrate machine learning models into your Next.js applications for better user experiences.",
      image: "/placeholder.svg?height=200&width=300&text=AI+Applications",
      category: "AI Development",
      date: "2024-01-15",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Future of Full-Stack Development",
      excerpt: "Exploring emerging trends and technologies that are shaping the future of web development.",
      image: "/placeholder.svg?height=200&width=300&text=Future+Development",
      category: "Web Development",
      date: "2024-01-10",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Optimizing Database Performance at Scale",
      excerpt: "Best practices for database optimization and scaling strategies for high-traffic applications.",
      image: "/placeholder.svg?height=200&width=300&text=Database+Performance",
      category: "Backend",
      date: "2024-01-05",
      readTime: "6 min read",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Recent Blog Posts
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights and tutorials on modern development practices and AI integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-gray-900 border-gray-800 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-black font-medium">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400">{post.excerpt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
