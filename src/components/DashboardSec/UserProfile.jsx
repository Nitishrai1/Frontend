"use client"

import { useState } from "react"
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GitPullRequest,
  GitFork,
  GitCommit,
} from "lucide-react"

export default function UserProfile({ userdata, platformStats, activityData, apiUrl }) {
  // eslint-disable-next-line react/prop-types
  const { email, username, ImageLink, isVerified = false } = userdata
  const stats = platformStats
  const activity = activityData

  const [showProblemStats, setShowProblemStats] = useState(true)
  const [showDevStats, setShowDevStats] = useState(false)
  const [showVisibility, setShowVisibility] = useState(false)

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Get icon for GitHub event type
  const getEventIcon = (type) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="w-4 h-4" />
      case "PullRequestEvent":
        return <GitPullRequest className="w-4 h-4" />
      case "CreateEvent":
        return <GitFork className="w-4 h-4" />
      default:
        return <Github className="w-4 h-4" />
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={ImageLink || "/placeholder.svg"}
                    alt={`${username}'s profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=random`
                    }}
                  />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-800">{username}</h2>
              <p className="text-sm text-gray-500">@sAzfUp3e</p>

              <div className="flex items-center mt-2 text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{email}</span>
              </div>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center">
                Get your Codolio Card
              </button>

              <div className="flex justify-center gap-4 mt-6 w-full">
                <button className="text-gray-500 hover:text-gray-700">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>

              <div className="w-full mt-6 border-t pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Last Refresh:</span>
                  <span>22 Mar 2025</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Profile Views:</span>
                  <span>0</span>
                </div>
              </div>

              {/* Problem Solving Stats Section */}
              <div className="w-full mt-4 border-t pt-4">
                <button
                  onClick={() => setShowProblemStats(!showProblemStats)}
                  className="w-full flex justify-between items-center font-medium text-gray-700"
                >
                  <span>Problem Solving Stats</span>
                  {showProblemStats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {showProblemStats && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="/placeholder.svg?height=20&width=20" alt="LeetCode" className="w-5 h-5 mr-2" />
                        <span className="text-sm">LeetCode</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="/placeholder.svg?height=20&width=20" alt="CodeStudio" className="w-5 h-5 mr-2" />
                        <span className="text-sm">CodeStudio</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="/placeholder.svg?height=20&width=20" alt="GeeksForGeeks" className="w-5 h-5 mr-2" />
                        <span className="text-sm">GeeksForGeeks</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src="/placeholder.svg?height=20&width=20" alt="HackerRank" className="w-5 h-5 mr-2" />
                        <span className="text-sm">HackerRank</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Development Stats Section */}
              <div className="w-full mt-4 border-t pt-4">
                <button
                  onClick={() => setShowDevStats(!showDevStats)}
                  className="w-full flex justify-between items-center font-medium text-gray-700"
                >
                  <span>Development Stats</span>
                  {showDevStats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {showDevStats && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Github className="w-5 h-5 mr-2" />
                        <span className="text-sm">GitHub</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Manage Visibility Section */}
              <div className="w-full mt-4 border-t pt-4">
                <button
                  onClick={() => setShowVisibility(!showVisibility)}
                  className="w-full flex justify-between items-center font-medium text-gray-700"
                >
                  <span>Manage Visibility</span>
                  {showVisibility ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {/* Verification Banner */}
            {!isVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="text-green-500 w-5 h-5 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">You aren't verified yet</h3>
                    <p className="text-sm text-gray-600">
                      Get verified and unlock your exclusive Codolio card with a stamp of authenticity!
                    </p>
                  </div>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
                  Verify Profile →
                </button>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Total Questions */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Questions</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </div>
                <div className="text-5xl font-bold text-gray-800">{stats.leetcode.totalQuestions}</div>
                <div className="text-sm text-gray-500 mt-2">out of {stats.leetcode.totalAvailable} available</div>
              </div>

              {/* Total Active Days */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Active Days</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </div>
                <div className="text-5xl font-bold text-gray-800">{stats.leetcode.activeDays}</div>
                <div className="text-sm text-gray-500 mt-2">Acceptance Rate: {stats.leetcode.acceptanceRate}%</div>
              </div>

              {/* Activity Graph */}
              <div className="bg-white rounded-lg shadow p-4 row-span-2 col-span-1 md:col-span-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{stats.leetcode.submissions} submissions</span>
                    <span className="text-sm text-gray-500">Max Streak {stats.leetcode.maxStreak}</span>
                    <span className="text-sm text-gray-500">Current Streak {stats.leetcode.currentStreak}</span>
                  </div>
                  <div className="flex items-center">
                    <button className="text-sm text-gray-500 border rounded px-3 py-1 flex items-center">
                      Current <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Activity Calendar (simplified representation) */}
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {activity.map((month, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="grid grid-cols-7 gap-1">
                        {month.activity.map((level, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-sm ${
                              level === 0
                                ? "bg-gray-100"
                                : level === 1
                                  ? "bg-green-200"
                                  : level === 2
                                    ? "bg-green-300"
                                    : level === 3
                                      ? "bg-green-400"
                                      : "bg-green-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{month.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contests and Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Total Contests */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-700 font-medium mb-4">Total Contests</h3>
                <div className="text-6xl font-bold text-gray-800 mb-4">{stats.leetcode.contests}</div>

                <div className="flex items-center justify-between p-2 border-t">
                  <div className="flex items-center">
                    <img src="/placeholder.svg?height=20&width=20" alt="LeetCode" className="w-5 h-5 mr-2" />
                    <span className="text-sm">LeetCode</span>
                  </div>
                  <span className="text-sm font-medium">{stats.leetcode.contests}</span>
                </div>
              </div>

              {/* Rating Graph */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-700 font-medium">Rating</h3>
                    <div className="text-3xl font-bold text-gray-800">{stats.leetcode.rating}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>Rank: {stats.leetcode.rank}</div>
                    <div>Contribution Points: {stats.leetcode.contributionPoints}</div>
                  </div>
                </div>

                {/* Simplified Rating Graph */}
                <div className="h-32 w-full">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path
                      d="M0,15 C10,5 20,25 30,10 C40,20 50,5 60,15 C70,5 80,20 90,5 L90,30 L0,30 Z"
                      fill="none"
                      stroke="rgb(255, 171, 112)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Problems Solved and Fundamentals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Problems Solved */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-medium">Problems Solved</h3>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-40 h-40">
                    {/* Circular progress indicator */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={
                          283 -
                          (283 * stats.dsa.total) / (stats.dsa.totalEasy + stats.dsa.totalMedium + stats.dsa.totalHard)
                        }
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#111827">
                        {stats.dsa.total}
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Easy</span>
                    </div>
                    <span className="text-sm font-medium">
                      {stats.dsa.easy} / {stats.dsa.totalEasy}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm">Medium</span>
                    </div>
                    <span className="text-sm font-medium">
                      {stats.dsa.medium} / {stats.dsa.totalMedium}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Hard</span>
                    </div>
                    <span className="text-sm font-medium">
                      {stats.dsa.hard} / {stats.dsa.totalHard}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fundamentals */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-700 font-medium">Fundamentals</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    {/* Circular progress indicator for HackerRank */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset="200"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
                        HackerRank
                      </text>
                      <text x="50" y="65" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#111827">
                        Value: 29
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GFG</span>
                    <span className="text-sm font-medium">{stats.gfg.problems}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">HackerRank</span>
                    <span className="text-sm font-medium">{stats.hackerrank.problems}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contest Rankings and Awards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Contest Rankings */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-700 font-medium mb-4">Contest Rankings</h3>

                <div className="flex flex-col items-center">
                  <div className="text-sm text-gray-500 mb-2">LEETCODE</div>
                  <div className="mb-2">
                    <img src="/placeholder.svg?height=60&width=60" alt="LeetCode Badge" className="w-16 h-16" />
                  </div>
                  <div className="text-4xl font-bold">{stats.leetcode.rating}</div>
                  <div className="text-sm text-gray-500">(max: 1564)</div>
                </div>
              </div>

              {/* Awards */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-700 font-medium mb-4">Awards</h3>
                <div className="text-gray-500 mb-4">{stats.awards.count}</div>

                <div className="grid grid-cols-4 gap-4">
                  {stats.awards.badges.map((badge, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=50&width=50"
                        alt={`Award Badge ${index + 1}`}
                        className="w-14 h-14"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button className="text-sm text-gray-500 hover:text-gray-700">show more</button>
                </div>
              </div>
            </div>

            {/* DSA Topic Analysis */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-700 font-medium">DSA Topic Analysis</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {stats.dsa.topicAnalysis.map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1/3 text-sm text-right pr-4">{topic.topic}</div>
                    <div className="w-2/3">
                      <div className="relative h-6 bg-blue-100 rounded">
                        <div
                          className="absolute top-0 left-0 h-6 bg-blue-500 rounded"
                          style={{ width: `${(topic.count / stats.dsa.topicAnalysis[0].count) * 100}%` }}
                        ></div>
                        <div className="absolute top-0 left-0 h-6 flex items-center justify-end px-2 w-full">
                          <span className="text-sm font-medium">{topic.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Activity */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-700 font-medium">GitHub Activity</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {stats.github.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start border-b pb-3">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">{getEventIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{activity.repo.split("/")[1]}</span>
                        <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <a
                  href="https://github.com/Nitishrai1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center justify-center"
                >
                  View more on GitHub <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

