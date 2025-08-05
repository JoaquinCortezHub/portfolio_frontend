import React from "react";
import { User, Briefcase, Heart, Lightbulb, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const tabs = [
	{
		id: "story",
		label: "My Background",
		icon: <User className="h-4 w-4" />,
		title: "From commerce student to software developer",
		content: (
			<div className="space-y-6">
				<p className="text-gray-300 leading-relaxed text-lg">
					After studying international commerce for a semester, I decided to
					take an 180° turn and dive into tech. I started doing some graphic
					design work, to then break into UX/UI design, which I studied for
					almost 2 years. After an eye-opening year in the USA, I realized
					building meaningful, innovative products was what I really loved.
					Since then, I have been polishing and bettering my programming skills
					to offer high-quality products to my clients.
				</p>
				<div className="flex flex-wrap gap-3 mt-6">
					<Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
						2+ Years Experience
					</Badge>
					<Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
						15+ Projects
					</Badge>
					<Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm">
						+2000 hours studied
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
							<h4 className="font-bold text-white text-lg mb-2">
								Full-Stack & AI Developer
							</h4>
							<p className="text-emerald-400 font-medium mb-3">
								2023 - Present
							</p>
							<p className="text-gray-300 leading-relaxed">
								Creating high-perfornance, scalabale AI & ML projects that drive
								massive growth.
							</p>
						</div>
						<div className="relative pl-12">
							<div className="absolute left-2 top-2 w-4 h-4 bg-emerald-500/60 rounded-full border-4 border-gray-950"></div>
							<h4 className="font-bold text-white text-lg mb-2">
								Front-End Developer
							</h4>
							<p className="text-gray-400 font-medium mb-3">2022 - 2023</p>
							<p className="text-gray-300 leading-relaxed">
								Developed modern web applications using React, Next.js, and
								Tailwind CSS.
							</p>
						</div>
						<div className="relative pl-12">
							<div className="absolute left-2 top-2 w-4 h-4 bg-emerald-500/30 rounded-full border-4 border-gray-950"></div>
							<h4 className="font-bold text-white text-lg mb-2">
								UX/UI Designer
							</h4>
							<p className="text-gray-400 font-medium mb-3">2021 - 2022</p>
							<p className="text-gray-300 leading-relaxed">
								Designing intuitive, user-friendly interfaces that enhance user
								experience.
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
					<h4 className="font-bold text-emerald-300 text-lg mb-3">
						User-Centric Design
					</h4>
					<p className="text-gray-300 leading-relaxed">
						Every line of code I write is focused on creating exceptional user
						experiences that delight and engage.
					</p>
				</div>
				<div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
					<h4 className="font-bold text-emerald-300 text-lg mb-3">
						Performance First
					</h4>
					<p className="text-gray-300 leading-relaxed">
						Optimized, scalable solutions that perform beautifully under any
						load, ensuring smooth user experiences.
					</p>
				</div>
				<div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
					<h4 className="font-bold text-emerald-300 text-lg mb-3">
						Data-Driven Results
					</h4>
					<p className="text-gray-300 leading-relaxed">
						Leveraging AI & ML to create intelligent, adaptive applications that
						learn and improve.
					</p>
				</div>
				<div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
					<h4 className="font-bold text-emerald-300 text-lg mb-3">
						Personalized Solutions
					</h4>
					<p className="text-gray-300 leading-relaxed">
						Tailored solutions that meet your unique needs and drive measurable
						results.
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
					I believe the best developers are well-rounded individuals. When I'm
					not building applications, you'll find me exploring new technologies,
					playing my guitar, or hiking somewhere here in my hometown.
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					<div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
						<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
							🎸
						</div>
						<p className="text-gray-300 font-medium">Music</p>
					</div>
					<div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
						<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
							📚
						</div>
						<p className="text-gray-300 font-medium">Reading</p>
					</div>
					<div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
						<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
							🏃‍♂️
						</div>
						<p className="text-gray-300 font-medium">Running</p>
					</div>
					<div className="group text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
						<div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
							✈️
						</div>
						<p className="text-gray-300 font-medium">Travel</p>
					</div>
				</div>
			</div>
		),
	},
];
