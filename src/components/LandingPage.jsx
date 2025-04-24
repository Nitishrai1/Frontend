import { CheckCircle, Clock, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TaskyLandingPage() {
    const navigate=useNavigate();

    const handleLogin=()=>navigate('/login');
    const handleSignUp=()=>navigate('/signup')
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Tasky</h1>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-green-700 hover:text-green-500">Features</a></li>
              <li><a href="#pricing" className="text-green-700 hover:text-green-500">Pricing</a></li>
              <li><a href="#contact" className="text-green-700 hover:text-green-500">Contact</a></li>
            </ul>
            <button className="px-4 py-2 text-green-700 border border-green-700 rounded-md hover:bg-green-100 transition-colors duration-300" onClick={handleLogin}>
              Login
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300" onClick={handleSignUp}>
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-green-100 to-blue-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Manage Your Tasks with Ease</h2>
            <p className="text-xl text-blue-700 mb-8">Tasky helps you organize, track, and complete your tasks efficiently.</p>
            <button className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition-colors duration-300 shadow-md">
              Get Started for Free
            </button>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<List className="w-12 h-12 text-green-500" />}
                title="Task Organization"
                description="Easily create, categorize, and prioritize your tasks."
              />
              <FeatureCard
                icon={<Clock className="w-12 h-12 text-blue-500" />}
                title="Time Tracking"
                description="Monitor the time spent on each task to improve productivity."
              />
              <FeatureCard
                icon={<CheckCircle className="w-12 h-12 text-green-500" />}
                title="Progress Tracking"
                description="Visualize your progress with intuitive charts and reports."
              />
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-8">Ready to Boost Your Productivity?</h2>
            <p className="text-xl text-green-700 mb-8">Join thousands of users who have transformed their task management with Tasky.</p>
            <button onClick={handleLogin} className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 transition-colors duration-300 shadow-md">
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2024 Tasky. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-green-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-300">Terms of Service</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
      <p className="text-blue-600">{description}</p>
    </div>
  )
}