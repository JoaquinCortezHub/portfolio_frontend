"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Archive,
  FileText,
  Inbox,
  Mail,
  Send,
  Star,
  Trash2,
} from "lucide-react"
import { useCallback, useState } from "react"

interface EmailItem {
  id: string
  from: string
  subject: string
  preview: string
  date: string
  isRead: boolean
}

const INBOX_EMAILS: EmailItem[] = [
  {
    id: "1",
    from: "Joaquin Cortez",
    subject: "Welcome to my Portfolio!",
    preview:
      "Thanks for visiting! I'm a Full-Stack & AI Developer passionate about building innovative digital products. Feel free to explore around — open the terminal and try some commands, check out my projects in Figma, or browse my blog in Safari.",
    date: "Today",
    isRead: false,
  },
  {
    id: "2",
    from: "Joaquin Cortez",
    subject: "Let's Work Together",
    preview:
      "I'm currently available for freelance projects and collaborations. Whether you need AI infrastructure, a modern web application, or ML-powered features, I'd love to discuss how I can help your business grow. Book a discovery call or fill out the form below!",
    date: "Today",
    isRead: true,
  },
]

const SIDEBAR_FOLDERS = [
  { label: "Inbox", icon: Inbox, count: 2 },
  { label: "Starred", icon: Star, count: 0 },
  { label: "Sent", icon: Send, count: 0 },
  { label: "Drafts", icon: FileText, count: 0 },
  { label: "Archive", icon: Archive, count: 0 },
  { label: "Trash", icon: Trash2, count: 0 },
]

export function MailApp() {
  const [selectedEmail, setSelectedEmail] = useState<EmailItem>(INBOX_EMAILS[0])
  const [isComposing, setIsComposing] = useState(false)

  const handleCompose = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCancelCompose = useCallback(() => {
    setIsComposing(false)
  }, [])

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-44 shrink-0 border-r border-white/5 bg-[#1c1c1e] flex flex-col">
        <button
          onClick={handleCompose}
          className="mx-2 mt-2 mb-1 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 inline-block mr-1.5" />
          Compose
        </button>
        <div className="p-1">
          {SIDEBAR_FOLDERS.map((folder) => (
            <div
              key={folder.label}
              className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs cursor-default transition-colors ${
                folder.label === "Inbox"
                  ? "bg-white/5 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <folder.icon className="w-3.5 h-3.5" />
                <span>{folder.label}</span>
              </div>
              {folder.count > 0 && (
                <span className="text-[10px] text-blue-400 font-medium">
                  {folder.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email list */}
      {!isComposing && (
        <div className="w-56 shrink-0 border-r border-white/5">
          <ScrollArea className="h-full">
            <div className="p-1">
              {INBOX_EMAILS.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                    selectedEmail.id === email.id
                      ? "bg-blue-500/10 border border-blue-500/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-medium truncate ${
                        email.isRead ? "text-gray-400" : "text-white"
                      }`}
                    >
                      {email.from}
                    </span>
                    <span className="text-[10px] text-gray-600 shrink-0">
                      {email.date}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-300 truncate">
                    {email.subject}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {email.preview}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 min-w-0">
        <ScrollArea className="h-full">
          {isComposing ? (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">New Message</h3>
                <button
                  onClick={handleCancelCompose}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 text-xs">
                  <span className="text-gray-500">To:</span>
                  <span className="text-gray-300">joaquin@cortez.dev</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 text-xs">
                  <span className="text-gray-500">Subject:</span>
                  <input
                    className="flex-1 bg-transparent text-gray-300 outline-none"
                    placeholder="Your subject..."
                    autoComplete="off"
                  />
                </div>
                <textarea
                  className="w-full h-48 p-3 bg-transparent text-sm text-gray-300 outline-none resize-none"
                  placeholder="Write your message..."
                />
              </div>
              <div className="flex gap-2">
                <a
                  href="https://calendly.com/joaquinlucascortez/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                >
                  Book a Discovery Call
                </a>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfrI8BeMmE3GN7Eg2tVT2acOfgAFSzc2oL111FhY3cC5faEPw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                >
                  Fill Out Business Details
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-1">
                {selectedEmail.subject}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <span className="font-medium text-gray-300">
                  {selectedEmail.from}
                </span>
                <span>&middot;</span>
                <span>{selectedEmail.date}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedEmail.preview}
              </p>

              {selectedEmail.id === "2" && (
                <div className="mt-6 flex gap-2">
                  <a
                    href="https://calendly.com/joaquinlucascortez/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                  >
                    Book a Discovery Call
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfrI8BeMmE3GN7Eg2tVT2acOfgAFSzc2oL111FhY3cC5faEPw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                  >
                    Fill Out Business Details
                  </a>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
