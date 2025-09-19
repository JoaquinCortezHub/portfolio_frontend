import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity-image'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface RichTextRendererProps {
  content: any[]
  className?: string
}

const components: PortableTextComponents = {
  block: {
    // Headings
    h1: ({ children, value }) => (
      <h1 className="text-4xl font-bold mb-6 text-white bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 text-white">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6 text-emerald-400">
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4 text-emerald-300">
        {children}
      </h4>
    ),
    h5: ({ children, value }) => (
      <h5 className="text-lg font-medium mb-2 mt-3 text-white">
        {children}
      </h5>
    ),
    h6: ({ children, value }) => (
      <h6 className="text-base font-medium mb-2 mt-3 text-gray-200">
        {children}
      </h6>
    ),

    // Paragraphs
    normal: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-4">
        {children}
      </p>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 my-6 italic text-gray-200 bg-emerald-500/5 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300 ml-4">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-300 leading-relaxed">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-gray-300 leading-relaxed">
        {children}
      </li>
    ),
  },

  marks: {
    // Text formatting
    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-emerald-300">
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-800 text-emerald-400 px-2 py-1 rounded text-sm font-mono border border-gray-700">
        {children}
      </code>
    ),

    // Links
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/50 hover:decoration-emerald-300 transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },

  types: {
    // Images
    image: ({ value }) => {
      if (!value?.asset) return null

      const { width, height } = value.asset.metadata?.dimensions || { width: 800, height: 600 }

      return (
        <div className="my-8 rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50">
          <Image
            src={urlFor(value).width(800).quality(80).url()}
            alt={value.alt || 'Content image'}
            width={width}
            height={height}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
          {value.caption && (
            <div className="p-4 text-sm text-gray-400 text-center italic">
              {value.caption}
            </div>
          )}
        </div>
      )
    },

    // Code blocks
    code: ({ value }) => {
      if (!value?.code) return null

      return (
        <div className="my-6">
          <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto">
            <code className="text-emerald-400 font-mono text-sm leading-relaxed">
              {value.code}
            </code>
          </pre>
          {value.filename && (
            <div className="text-xs text-gray-500 mt-2 font-mono">
              {value.filename}
            </div>
          )}
        </div>
      )
    },

    // Break/Divider
    break: () => (
      <hr className="my-8 border-gray-800" />
    ),
  },

  unknownType: ({ value, isInline }) => {
    console.warn('Unknown block type:', value._type, value)
    return isInline ? (
      <span className="text-red-400 text-sm">
        [Unknown type: {value._type}]
      </span>
    ) : (
      <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm my-4">
        Unknown block type: {value._type}
      </div>
    )
  },
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return (
      <div className="text-gray-500 italic p-8 text-center bg-gray-900/30 rounded-lg border border-gray-800">
        No content available
      </div>
    )
  }

  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <PortableText value={content} components={components} />
    </div>
  )
}