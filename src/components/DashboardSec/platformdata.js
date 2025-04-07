// This file contains mock data to populate the user profile based on real API responses
// You can replace this with actual API calls in your implementation

export const userData = {
    email: "nitish.12208500@lpu.in",
    username: "Nitish Rai",
    ImageLink: "https://avatars.githubusercontent.com/u/115301219",
    isVerified: false,
  }
  
  // Data based on LeetCode API response
  export const platformStats = {
    leetcode: {
      totalQuestions: 576,
      totalAvailable: 3491,
      activeDays: 340,
      submissions: 855,
      maxStreak: 196,
      currentStreak: 77,
      contests: 7,
      rating: 1515,
      rank: "98546",
      acceptanceRate: 64.4,
      contributionPoints: 51,
    },
    gfg: {
      problems: 37,
    },
    hackerrank: {
      problems: 29,
    },
    dsa: {
      total: 576,
      easy: 176,
      totalEasy: 867,
      medium: 341,
      totalMedium: 1813,
      hard: 59,
      totalHard: 811,
      topicAnalysis: [
        { topic: "Arrays", count: 343 },
        { topic: "Data Structures", count: 179 },
        { topic: "String", count: 134 },
        { topic: "HashMap and Set", count: 122 },
        { topic: "Algorithms", count: 105 },
        { topic: "Trees", count: 95 },
        { topic: "Dynamic Programming", count: 92 },
        { topic: "DFS", count: 91 },
        { topic: "Sorting", count: 87 },
        { topic: "Linked Lists", count: 71 },
      ],
    },
    github: {
      connected: true,
      recentActivity: [
        {
          type: "PushEvent",
          repo: "Nitishrai1/BackendProjects",
          message: "update",
          date: "2025-03-21T15:12:49Z",
        },
        {
          type: "CreateEvent",
          repo: "Nitishrai1/Meedimeet",
          message: "Created repository",
          date: "2025-03-19T02:13:51Z",
        },
        {
          type: "PullRequestEvent",
          repo: "Nitishrai1/PRM",
          message: "Merged PR #2: fixing the script file",
          date: "2025-03-14T04:03:03Z",
        },
        {
          type: "PushEvent",
          repo: "Nitishrai1/Frontend",
          message: "Update index.html: meta update",
          date: "2025-03-09T09:08:08Z",
        },
        {
          type: "PushEvent",
          repo: "Nitishrai1/Jam-delight",
          message: "update",
          date: "2025-03-03T11:34:46Z",
        },
      ],
    },
    awards: {
      count: 13,
      badges: ["badge1", "badge2", "badge3", "badge4"],
    },
  }
  
  // Convert LeetCode submission calendar to activity data format
  // This is a simplified version - in a real implementation you would parse the timestamps
  export const activityData = [
    { month: "Sep", activity: [0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0] },
    { month: "Oct", activity: [1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1] },
    { month: "Nov", activity: [2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2] },
    { month: "Dec", activity: [1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1] },
    { month: "Jan", activity: [2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2] },
    { month: "Feb", activity: [3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3] },
    { month: "Mar", activity: [2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2] },
  ]
  
  // Helper function to parse LeetCode submission calendar
  // In a real implementation, you would use this to convert the timestamp data
  export function parseSubmissionCalendar(submissionCalendar) {
    // Example implementation - this would convert the timestamp-based data to a more usable format
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const result = []
  
    // Group by month
    const monthlyData = {}
  
    Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
      const date = new Date(Number.parseInt(timestamp) * 1000)
      const monthKey = months[date.getMonth()]
  
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = []
      }
  
      // Map submission count to activity level (0-4)
      let activityLevel = 0
      if (count > 0) activityLevel = 1
      if (count >= 5) activityLevel = 2
      if (count >= 10) activityLevel = 3
      if (count >= 15) activityLevel = 4
  
      monthlyData[monthKey].push(activityLevel)
    })
  
    // Convert to array format
    Object.entries(monthlyData).forEach(([month, activity]) => {
      result.push({ month, activity })
    })
  
    return result
  }
  
  