"use client";

import { useState } from "react";
import { tabs } from "@/lib/constants";
export default function AboutMe() {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index: number) => {
		setActiveTab(index);
	};

	return (
		<section id="about" className="py-24 px-6 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
						About Me
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Get to know the person behind the code
					</p>
				</div>

				{/* Main Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
					{/* Left Side - Navigation */}
					<div className="lg:col-span-4 space-y-6">
						{/* Tab Navigation */}
						<div className="space-y-3">
							{tabs.map((tab, index) => (
								<button
									key={tab.id}
									onClick={() => handleTabClick(index)}
									className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 group hover:cursor-pointer ${
										activeTab === index
											? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
											: "bg-gray-900/30 border border-gray-800/50 text-gray-400 hover:text-gray-300 hover:bg-gray-900/50 hover:border-gray-700/50"
									}`}
								>
									<div
										className={`p-3 rounded-xl transition-all duration-300 ${
											activeTab === index
												? "bg-emerald-500 text-white"
												: "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
										}`}
									>
										{tab.icon}
									</div>
									<div className="flex-1">
										<span className="font-medium">{tab.label}</span>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Right Side - Content */}
					<div className="lg:col-span-8">
						<div className="min-h-[500px] p-8 md:p-12 bg-gray-900/20 backdrop-blur-sm rounded-3xl border border-gray-800/30">
							<div className="mb-8">
								<h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
									{tabs[activeTab].title}
								</h3>
								<div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
							</div>

							<div className="animate-in fade-in duration-500">
								{tabs[activeTab].content}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
