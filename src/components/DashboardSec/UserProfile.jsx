
import { useEffect, useState } from "react"
import { Github, ExternalLink, GitPullRequest, GitFork, GitCommit, Mail } from "lucide-react"


import axios from "axios";

const leetcodeapi=import.meta.env.VITE_LC_API;
const githubapi=import.meta.env.VITE_GITHUB_API
const githubaccessToken=import.meta.env.VITE_GITHUB_TOKEN;

console.log(`lc ${leetcodeapi}`);
console.log(`github ${githubapi}`);


export default function PlatformStats({ userdata, }) {
  const { email, username, ImageLink } = userdata
  const [activeTab, setActiveTab] = useState("coding") // "coding" or "development"
  const [leetcodeData,setLeetCodedata]=useState({});
  const [githubData,setGithubdata]=useState([]);
  // Format date for display


  useEffect(()=>{
  fetchLCdata();
  fetchGithubdata();    
  },[])

  const fetchLCdata=async()=>{

    try{
      const response=await axios.get(`${leetcodeapi}`);

      setLeetCodedata(response.data);

    }catch(err){
      console.log("error in api call");

    }

  }
  const fetchGithubdata=async()=>{

    try{
      const response=await axios.get(`${githubapi}`,{
        headers:{
          Authorization:`token ${githubaccessToken}`
        }
      });
      
        setGithubdata(response.data);
        console.log(response.data);

      

    }catch(err){
      console.log("error in the api call of github data");

    }

  }
  
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

  // Calculate GitHub stats
  const calculateGithubStats = () => {
    const repos = new Set()
    let commits = 0
    let prs = 0

    githubData.forEach((event) => {
      repos.add(event.repo.name)
      if (event.type === "PushEvent") {
        commits += event.payload.commits?.length || 0
      } else if (event.type === "PullRequestEvent") {
        prs++
      }
    })

    return {
      repositories: repos.size,
      commits,
      prs,
    }
  }

  const githubStats = calculateGithubStats()

  // Generate activity calendar data from LeetCode submission calendar
  const generateActivityCalendar = () => {
    if (!leetcodeData.submissionCalendar) return []

    const calendar = leetcodeData.submissionCalendar
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const result = []

    // Group by month
    const monthlyData = {}

    Object.entries(calendar).forEach(([timestamp, count]) => {
      const date = new Date(Number.parseInt(timestamp) * 1000)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: months[date.getMonth()],
          activity: [],
        }
      }

      // Normalize activity level (0-4)
      const level = count === 0 ? 0 : count < 5 ? 1 : count < 10 ? 2 : count < 15 ? 3 : 4
      monthlyData[monthKey].activity.push(level)
    })

    // Convert to array and sort by date
    Object.values(monthlyData).forEach((month) => {
      result.push(month)
    })

    return result.slice(-6) // Last 6 months
  }

  const activityData = generateActivityCalendar()

  // Generate GitHub activity calendar data
  const generateGithubActivityCalendar = () => {
    if (!githubData || githubData.length === 0) return []

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const result = []

    // Group by month
    const monthlyData = {}

    // Sort events by date
    const sortedEvents = [...githubData].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )

    // Group events by day
    const dailyEvents = {}
    sortedEvents.forEach((event) => {
      const date = new Date(event.created_at)
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

      if (!dailyEvents[dayKey]) {
        dailyEvents[dayKey] = 0
      }
      dailyEvents[dayKey]++
    })

    // Group by month
    Object.entries(dailyEvents).forEach(([dayKey, count]) => {
      const [year, month, day] = dayKey.split("-").map(Number)
      const monthKey = `${year}-${month}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: months[month],
          activity: Array(35).fill(0), // Initialize with zeros for the month grid
        }
      }

      // Normalize activity level (0-4)
      const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 6 ? 3 : 4

      // Place the activity in the right position in the month grid
      // This is simplified - in a real implementation you'd need to calculate the exact position
      const position = Math.min(day, 34) // Ensure we don't exceed array bounds
      monthlyData[monthKey].activity[position] = level
    })

    // Convert to array and sort by date
    Object.values(monthlyData).forEach((month) => {
      result.push(month)
    })

    return result.slice(-6) // Last 6 months
  }

  const githubActivityData = generateGithubActivityCalendar()

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - User Profile */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={ImageLink || "/placeholder.svg?height=100&width=100"}
                    alt={`${username}'s profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=random`
                    }}
                  />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-800">{username}</h2>
              <p className="text-sm text-gray-500">@{username.toLowerCase().replace(/\s+/g, "")}</p>

              <div className="flex items-center mt-2 text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{email}</span>
              </div>
            </div>

            {/* Tab buttons - Moved outside the user profile card */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("coding")}
                className={`py-2 px-4 rounded-md font-medium ${
                  activeTab === "coding" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Coding
              </button>
              <button
                onClick={() => setActiveTab("development")}
                className={`py-2 px-4 rounded-md font-medium ${
                  activeTab === "development" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Development
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {activeTab === "coding" ? (
              /* LeetCode Stats */
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Total Questions */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Total Questions</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{leetcodeData.totalSolved}</div>
                    <div className="text-sm text-gray-500 mt-2">out of {leetcodeData.totalQuestions} available</div>
                  </div>

                  {/* Acceptance Rate */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Acceptance Rate</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{leetcodeData.acceptanceRate}%</div>
                    <div className="text-sm text-gray-500 mt-2">Ranking: {leetcodeData.ranking}</div>
                  </div>

                  {/* Rating */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Contribution Points</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{leetcodeData.contributionPoints}</div>
                    <div className="text-sm text-gray-500 mt-2">Reputation: {leetcodeData.reputation}</div>
                  </div>
                </div>

                {/* Activity Calendar */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-700 font-medium">Contribution Activity</h3>
                  </div>

                  {/* Activity Calendar */}
                  <div className="grid grid-cols-6 gap-1 mt-4">
                    {activityData.map((month, idx) => (
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

                {/* Problem Difficulty Breakdown */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-gray-700 font-medium mb-4">Problems Solved</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Easy</span>
                      </div>
                      <span className="text-sm font-medium">
                        {leetcodeData.easySolved} / {leetcodeData.totalEasy}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">Medium</span>
                      </div>
                      <span className="text-sm font-medium">
                        {leetcodeData.mediumSolved} / {leetcodeData.totalMedium}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">Hard</span>
                      </div>
                      <span className="text-sm font-medium">
                        {leetcodeData.hardSolved} / {leetcodeData.totalHard}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* GitHub Stats */
              <div className="space-y-6">
                {/* GitHub Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Repositories */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Repositories</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{githubStats.repositories}</div>
                    <div className="text-sm text-gray-500 mt-2">Public repositories</div>
                  </div>

                  {/* Commits */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Commits</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{githubStats.commits}</div>
                    <div className="text-sm text-gray-500 mt-2">Total commits</div>
                  </div>

                  {/* Pull Requests */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-500 text-sm font-medium">Pull Requests</h3>
                    </div>
                    <div className="text-5xl font-bold text-gray-800">{githubStats.prs}</div>
                    <div className="text-sm text-gray-500 mt-2">Total PRs raised</div>
                  </div>
                </div>

                {/* GitHub Activity Heatmap */}
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-700 font-medium">GitHub Contribution Activity</h3>
                  </div>

                  {/* Activity Calendar */}
                  <div className="grid grid-cols-6 gap-1 mt-4">
                    {githubActivityData.map((month, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="grid grid-cols-7 gap-1">
                          {month.activity.map((level, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-sm ${
                                level === 0
                                  ? "bg-gray-100"
                                  : level === 1
                                    ? "bg-blue-200"
                                    : level === 2
                                      ? "bg-blue-300"
                                      : level === 3
                                        ? "bg-blue-400"
                                        : "bg-blue-600"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GitHub Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-700 font-medium">Recent Activity</h3>
                  </div>

                  <div className="space-y-4">
                    {githubData.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-start border-b pb-3">
                        <div className="bg-gray-100 rounded-full p-2 mr-3">{getEventIcon(activity.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{activity.repo.name.split("/")[1]}</span>
                            <span className="text-xs text-gray-500">{formatDate(activity.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.type === "PushEvent"
                              ? activity.payload.commits?.[0]?.message || "Pushed commits"
                              : activity.type.replace("Event", "")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <a
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:text-blue-700 flex items-center justify-center"
                    >
                      View more on GitHub <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
