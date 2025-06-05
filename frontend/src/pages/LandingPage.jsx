import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Eye,
  Filter,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import useAuthStore from "@/store/auth"

export default function LandingPage() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated Snow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snow-flake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      {
        authUser ? <Navbar /> : 
        <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AppTracker
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={()=> navigate("/login")}>
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" onClick={()=> navigate("/signup")} >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
        </header>
      }
      

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">✨ Track Your Career Journey</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Job Applications
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Organize, track, and optimize your job search with our powerful application management platform. Never
              lose track of an opportunity again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3"
                onClick={() => navigate("/login")}
              >
                Start Tracking Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                Setup in 2 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">Powerful Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you stay organized and maximize your job search success rate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Add Applications</CardTitle>
                <CardDescription className="text-gray-300">
                  Quickly add new job applications with all relevant details in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">View & Manage</CardTitle>
                <CardDescription className="text-gray-300">
                  Get a comprehensive overview of all your applications in one dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Filter className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Smart Sorting</CardTitle>
                <CardDescription className="text-gray-300">
                  Sort applications by source, status, date, and priority to stay organized.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Advanced Search</CardTitle>
                <CardDescription className="text-gray-300">
                  Find applications instantly by company name, job title, or location.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Date Tracking</CardTitle>
                <CardDescription className="text-gray-300">
                  Keep track of application dates, interview schedules, and follow-ups.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your success rate and optimize your job search strategy.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Feature Highlights */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Search & Filter Like a{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Pro</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Company Search</h4>
                    <p className="text-gray-300">Find applications by company name instantly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Briefcase className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Job Title Filtering</h4>
                    <p className="text-gray-300">Filter by specific roles and positions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Location-Based</h4>
                    <p className="text-gray-300">Sort applications by city, state, or remote options</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Search Applications</span>
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Search by company, role, or location..."
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    Google
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    Software Engineer
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    San Francisco
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-gray-300">Applications Tracked</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                2.5K+
              </div>
              <div className="text-gray-300">Happy Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Job Search?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have streamlined their application process and landed their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3"
              onClick={()=> navigate("/login")}
            >
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center text-sm text-gray-400">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>4.9/5 from 500+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Briefcase className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AppTracker
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 AppTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
