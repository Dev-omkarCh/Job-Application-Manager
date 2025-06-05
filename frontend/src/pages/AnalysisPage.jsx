// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Briefcase,
//   TrendingUp,
//   Users,
//   MapPin,
//   DollarSign,
//   Search,
//   Filter,
//   BarChart3,
//   Target,
//   Clock,
// } from "lucide-react"

// import { LineChart } from "@/components/charts/LineChart"
// import { BarChart } from "@/components/charts/BarChart"
// import { PieChart as CustomPieChart } from "@/components/charts/PieChart"
// import { ScatterPlot } from "@/components/charts/ScatterPlot"
// import { Histogram } from "@/components/charts/Histogram"
// import { BoxPlot } from "@/components/charts/BoxPlot"
// import { CandlestickChart } from "@/components/charts/CandleStickChart"

// // Mock data for job applications
// const mockApplications = [
//   {
//     id: 1,
//     companyName: "Google",
//     jobRole: "Senior Frontend Developer",
//     jobDescription: "Build scalable web applications using React and TypeScript",
//     source: "LinkedIn",
//     status: "Interview",
//     email: "careers@google.com",
//     salary: 120000,
//     location: "Remote",
//     appliedDate: "2024-01-15",
//     lastUpdate: "2024-01-20",
//     responseTime: 5,
//   },
//   {
//     id: 2,
//     companyName: "Microsoft",
//     jobRole: "Full Stack Developer",
//     jobDescription: "Develop cloud-based solutions using Azure and .NET",
//     source: "Indeed",
//     status: "Applied",
//     email: "jobs@microsoft.com",
//     salary: 110000,
//     location: "Hybrid",
//     appliedDate: "2024-01-12",
//     lastUpdate: "2024-01-12",
//     responseTime: 0,
//   },
//   {
//     id: 3,
//     companyName: "Amazon",
//     jobRole: "Software Engineer",
//     jobDescription: "Work on large-scale distributed systems",
//     source: "Naukri",
//     status: "Rejected",
//     email: "recruiting@amazon.com",
//     salary: 115000,
//     location: "Onsite",
//     appliedDate: "2024-01-10",
//     lastUpdate: "2024-01-18",
//     responseTime: 8,
//   },
//   {
//     id: 4,
//     companyName: "Netflix",
//     jobRole: "React Developer",
//     jobDescription: "Build user interfaces for streaming platform",
//     source: "LinkedIn",
//     status: "Offered",
//     email: "talent@netflix.com",
//     salary: 125000,
//     location: "Remote",
//     appliedDate: "2024-01-08",
//     lastUpdate: "2024-01-22",
//     responseTime: 14,
//   },
//   {
//     id: 5,
//     companyName: "Spotify",
//     jobRole: "Frontend Engineer",
//     jobDescription: "Create music streaming experiences",
//     source: "Internshala",
//     status: "Accepted",
//     email: "jobs@spotify.com",
//     salary: 105000,
//     location: "Hybrid",
//     appliedDate: "2024-01-05",
//     lastUpdate: "2024-01-25",
//     responseTime: 20,
//   },
//   {
//     id: 6,
//     companyName: "Uber",
//     jobRole: "Software Developer",
//     jobDescription: "Build ride-sharing platform features",
//     source: "Other",
//     status: "Interview",
//     email: "careers@uber.com",
//     salary: 108000,
//     location: "Onsite",
//     appliedDate: "2024-01-03",
//     lastUpdate: "2024-01-21",
//     responseTime: 18,
//   },
//   {
//     id: 7,
//     companyName: "Meta",
//     jobRole: "Frontend Developer",
//     jobDescription: "Build social media interfaces",
//     source: "LinkedIn",
//     status: "Applied",
//     email: "careers@meta.com",
//     salary: 130000,
//     location: "Remote",
//     appliedDate: "2024-01-01",
//     lastUpdate: "2024-01-01",
//     responseTime: 0,
//   },
//   {
//     id: 8,
//     companyName: "Apple",
//     jobRole: "iOS Developer",
//     jobDescription: "Develop mobile applications",
//     source: "Indeed",
//     status: "Rejected",
//     email: "jobs@apple.com",
//     salary: 135000,
//     location: "Onsite",
//     appliedDate: "2023-12-28",
//     lastUpdate: "2024-01-05",
//     responseTime: 8,
//   },
// ]

// const statusColors = {
//   Applied: "bg-blue-100 text-blue-800",
//   Interview: "bg-yellow-100 text-yellow-800",
//   Offered: "bg-green-100 text-green-800",
//   Accepted: "bg-emerald-100 text-emerald-800",
//   Rejected: "bg-red-100 text-red-800",
// }

// const sourceColors = {
//   LinkedIn: "#0077b5",
//   Indeed: "#2557a7",
//   Naukri: "#7b68ee",
//   Internshala: "#ff6b35",
//   Other: "#6b7280",
// }

// export default function JobAnalysisDashboard() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [sourceFilter, setSourceFilter] = useState("all")

//   // Calculate metrics
//   const totalApplications = mockApplications.length
//   const interviewCount = mockApplications.filter(
//     (app) => app.status === "Interview" || app.status === "Offered" || app.status === "Accepted",
//   ).length
//   const successCount = mockApplications.filter((app) => app.status === "Offered" || app.status === "Accepted").length
//   const interviewRate = ((interviewCount / totalApplications) * 100).toFixed(1)
//   const successRate = ((successCount / totalApplications) * 100).toFixed(1)

//   // Prepare chart data
//   const applicationTrendData = [
//     { label: "Aug", value: 3 },
//     { label: "Sep", value: 5 },
//     { label: "Oct", value: 8 },
//     { label: "Nov", value: 6 },
//     { label: "Dec", value: 4 },
//     { label: "Jan", value: totalApplications },
//   ]

//   const sourceData = Object.entries(
//     mockApplications.reduce(
//       (acc, app) => {
//         acc[app.source] = (acc[app.source] || 0) + 1
//         return acc
//       },
//       {},
//     ),
//   ).map(([source, count]) => ({
//     label: source,
//     value: count,
//     color: sourceColors[source],
//   }))

//   const statusData = Object.entries(
//     mockApplications.reduce(
//       (acc, app) => {
//         acc[app.status] = (acc[app.status] || 0) + 1
//         return acc
//       },
//       {},
//     ),
//   ).map(([status, count]) => ({
//     label: status,
//     value: count,
//     color:
//       status === "Applied"
//         ? "#3b82f6"
//         : status === "Interview"
//           ? "#f59e0b"
//           : status === "Offered"
//             ? "#10b981"
//             : status === "Accepted"
//               ? "#059669"
//               : "#ef4444",
//   }))

//   const salaryVsSuccessData = mockApplications.map((app) => ({
//     x: app.salary / 1000, // Convert to thousands
//     y: app.status === "Offered" || app.status === "Accepted" ? 1 : 0,
//     label: app.companyName,
//     color: app.status === "Offered" || app.status === "Accepted" ? "#10b981" : "#ef4444",
//   }))

//   const salaryData = mockApplications.map((app) => app.salary)

//   const responseTimeData = [
//     {
//       label: "LinkedIn",
//       values: mockApplications.filter((app) => app.source === "LinkedIn").map((app) => app.responseTime),
//     },
//     {
//       label: "Indeed",
//       values: mockApplications.filter((app) => app.source === "Indeed").map((app) => app.responseTime),
//     },
//     {
//       label: "Naukri",
//       values: mockApplications.filter((app) => app.source === "Naukri").map((app) => app.responseTime),
//     },
//     {
//       label: "Other",
//       values: mockApplications
//         .filter((app) => app.source === "Other" || app.source === "Internshala")
//         .map((app) => app.responseTime),
//     },
//   ]

//   // Stock market style data for monthly applications
//   const monthlyStockData = [
//     { date: "Aug", open: 2, high: 4, low: 1, close: 3, volume: 15 },
//     { date: "Sep", open: 3, high: 6, low: 2, close: 5, volume: 25 },
//     { date: "Oct", open: 5, high: 10, low: 4, close: 8, volume: 40 },
//     { date: "Nov", open: 8, high: 9, low: 5, close: 6, volume: 30 },
//     { date: "Dec", open: 6, high: 7, low: 3, close: 4, volume: 20 },
//     { date: "Jan", open: 4, high: 12, low: 3, close: totalApplications, volume: 50 },
//   ]

//   // Filter applications
//   const filteredApplications = mockApplications.filter((app) => {
//     const matchesSearch =
//       app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || app.status === statusFilter
//     const matchesSource = sourceFilter === "all" || app.source === sourceFilter
//     return matchesSearch && matchesStatus && matchesSource
//   })

//   const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <Icon className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//         <p className="text-xs text-muted-foreground">{subtitle}</p>
//         {trend && (
//           <div className="flex items-center pt-1">
//             <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
//             <span className="text-xs text-green-500">{trend}</span>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Job Application Analytics</h1>
//               <p className="text-gray-600 mt-1">Advanced data visualization and insights</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline" size="sm">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Export Data
//               </Button>
//               <Button size="sm">
//                 <BarChart3 className="h-4 w-4 mr-2" />
//                 Generate Report
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             title="Total Applications"
//             value={totalApplications}
//             subtitle="This month"
//             icon={Briefcase}
//             trend="+12% from last month"
//           />
//           <StatCard
//             title="Interview Rate"
//             value={`${interviewRate}%`}
//             subtitle={`${interviewCount} interviews`}
//             icon={Users}
//             trend="+5% from last month"
//           />
//           <StatCard
//             title="Success Rate"
//             value={`${successRate}%`}
//             subtitle={`${successCount} offers/accepted`}
//             icon={Target}
//             trend="+8% from last month"
//           />
//           <StatCard
//             title="Avg. Response Time"
//             value="9.1 days"
//             subtitle="From application"
//             icon={Clock}
//             trend="-1.2 days improvement"
//           />
//         </div>

//         {/* Advanced Charts */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="trends">Trends</TabsTrigger>
//             <TabsTrigger value="analysis">Analysis</TabsTrigger>
//             <TabsTrigger value="insights">Insights</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Application Trend (Stock Market Style)</CardTitle>
//                   <CardDescription>Monthly application activity with volume</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <CandlestickChart data={monthlyStockData} title="" width={500} height={300} />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Applications by Source</CardTitle>
//                   <CardDescription>Distribution across platforms</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <CustomPieChart data={statusData} title="" />
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Source Performance</CardTitle>
//                   <CardDescription>Applications per platform</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <BarChart data={sourceData} title="" horizontal />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Monthly Application Trend</CardTitle>
//                   <CardDescription>Growth over time</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <LineChart data={applicationTrendData} title="" color="#10b981" />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="trends" className="space-y-6">
//             <div className="grid grid-cols-1 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Application Timeline (Candlestick View)</CardTitle>
//                   <CardDescription>Stock market style visualization of application activity</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <CandlestickChart data={monthlyStockData} title="" width={800} height={400} />
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Application Growth</CardTitle>
//                   <CardDescription>Cumulative applications over time</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <LineChart
//                     data={[
//                       { label: "Week 1", value: 2 },
//                       { label: "Week 2", value: 4 },
//                       { label: "Week 3", value: 6 },
//                       { label: "Week 4", value: 8 },
//                     ]}
//                     title=""
//                     color="#8b5cf6"
//                   />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Success Rate Trend</CardTitle>
//                   <CardDescription>Interview success over time</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <LineChart
//                     data={[
//                       { label: "Aug", value: 20 },
//                       { label: "Sep", value: 25 },
//                       { label: "Oct", value: 30 },
//                       { label: "Nov", value: 28 },
//                       { label: "Dec", value: 35 },
//                       { label: "Jan", value: Number.parseInt(interviewRate) },
//                     ]}
//                     title=""
//                     color="#f59e0b"
//                   />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="analysis" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Salary vs Success Rate</CardTitle>
//                   <CardDescription>Correlation between salary and offer success</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <ScatterPlot
//                     data={salaryVsSuccessData}
//                     title=""
//                     xLabel="Salary (in thousands)"
//                     yLabel="Success (0=No, 1=Yes)"
//                     width={450}
//                     height={300}
//                   />
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Salary Distribution</CardTitle>
//                   <CardDescription>Histogram of salary ranges</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Histogram data={salaryData} bins={6} title="" color="#06b6d4" width={450} height={300} />
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Response Time Analysis</CardTitle>
//                 <CardDescription>Box plot showing response time distribution by source</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <BoxPlot data={responseTimeData} title="" width={800} height={300} />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="insights" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <DollarSign className="h-5 w-5 mr-2" />
//                     Salary Insights
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Average</span>
//                       <span className="font-medium">
//                         ${(salaryData.reduce((a, b) => a + b, 0) / salaryData.length).toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Highest</span>
//                       <span className="font-medium">${Math.max(...salaryData).toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Lowest</span>
//                       <span className="font-medium">${Math.min(...salaryData).toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Median</span>
//                       <span className="font-medium">
//                         ${salaryData.sort((a, b) => a - b)[Math.floor(salaryData.length / 2)].toLocaleString()}
//                       </span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <MapPin className="h-5 w-5 mr-2" />
//                     Location Preferences
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {["Remote", "Hybrid", "Onsite"].map((location) => {
//                       const count = mockApplications.filter((app) => app.location === location).length
//                       const percentage = ((count / totalApplications) * 100).toFixed(0)
//                       return (
//                         <div key={location} className="flex items-center justify-between">
//                           <span className="text-sm">{location}</span>
//                           <div className="flex items-center space-x-2">
//                             <div className="w-16 bg-gray-200 rounded-full h-2">
//                               <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
//                             </div>
//                             <span className="text-sm font-medium">{count}</span>
//                           </div>
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Target className="h-5 w-5 mr-2" />
//                     Performance Metrics
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Applications</span>
//                       <span className="font-medium">{totalApplications}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Interviews</span>
//                       <span className="font-medium">{interviewCount}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Offers</span>
//                       <span className="font-medium">{successCount}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Conversion Rate</span>
//                       <span className="font-medium">{successRate}%</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Key Insights */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Key Insights & Recommendations</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-blue-50 rounded-lg">
//                     <h4 className="font-semibold text-blue-900 mb-2">🎯 Best Performing Source</h4>
//                     <p className="text-sm text-blue-800">
//                       LinkedIn shows the highest success rate with{" "}
//                       {(
//                         (mockApplications.filter(
//                           (app) => app.source === "LinkedIn" && (app.status === "Offered" || app.status === "Accepted"),
//                         ).length /
//                           mockApplications.filter((app) => app.source === "LinkedIn").length) *
//                         100
//                       ).toFixed(0)}
//                       % conversion
//                     </p>
//                   </div>
//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <h4 className="font-semibold text-green-900 mb-2">💰 Salary Sweet Spot</h4>
//                     <p className="text-sm text-green-800">
//                       Applications in the $115K-$125K range show higher success rates
//                     </p>
//                   </div>
//                   <div className="p-4 bg-yellow-50 rounded-lg">
//                     <h4 className="font-semibold text-yellow-900 mb-2">⏱️ Response Time</h4>
//                     <p className="text-sm text-yellow-800">
//                       Average response time is 9.1 days. Follow up after 7 days for better results
//                     </p>
//                   </div>
//                   <div className="p-4 bg-purple-50 rounded-lg">
//                     <h4 className="font-semibold text-purple-900 mb-2">📈 Growth Trend</h4>
//                     <p className="text-sm text-purple-800">
//                       Application volume increased 12% this month. Maintain momentum!
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Applications Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Applications</CardTitle>
//             <CardDescription>Manage and track your job applications</CardDescription>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search companies or roles..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="Applied">Applied</SelectItem>
//                   <SelectItem value="Interview">Interview</SelectItem>
//                   <SelectItem value="Offered">Offered</SelectItem>
//                   <SelectItem value="Accepted">Accepted</SelectItem>
//                   <SelectItem value="Rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={sourceFilter} onValueChange={setSourceFilter}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="Filter by source" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Sources</SelectItem>
//                   <SelectItem value="LinkedIn">LinkedIn</SelectItem>
//                   <SelectItem value="Indeed">Indeed</SelectItem>
//                   <SelectItem value="Naukri">Naukri</SelectItem>
//                   <SelectItem value="Internshala">Internshala</SelectItem>
//                   <SelectItem value="Other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left p-2 font-medium">Company</th>
//                     <th className="text-left p-2 font-medium">Role</th>
//                     <th className="text-left p-2 font-medium">Source</th>
//                     <th className="text-left p-2 font-medium">Status</th>
//                     <th className="text-left p-2 font-medium">Salary</th>
//                     <th className="text-left p-2 font-medium">Location</th>
//                     <th className="text-left p-2 font-medium">Applied</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredApplications.map((app) => (
//                     <tr key={app.id} className="border-b hover:bg-gray-50">
//                       <td className="p-2">
//                         <div>
//                           <div className="font-medium">{app.companyName}</div>
//                           <div className="text-sm text-gray-500 truncate max-w-32">{app.email}</div>
//                         </div>
//                       </td>
//                       <td className="p-2">
//                         <div className="font-medium">{app.jobRole}</div>
//                         <div className="text-sm text-gray-500 truncate max-w-48">{app.jobDescription}</div>
//                       </td>
//                       <td className="p-2">
//                         <Badge variant="outline">{app.source}</Badge>
//                       </td>
//                       <td className="p-2">
//                         <Badge className={statusColors[app.status]}>{app.status}</Badge>
//                       </td>
//                       <td className="p-2 font-medium">${app.salary.toLocaleString()}</td>
//                       <td className="p-2">
//                         <div className="flex items-center">
//                           <MapPin className="h-3 w-3 mr-1 text-gray-400" />
//                           {app.location}
//                         </div>
//                       </td>
//                       <td className="p-2 text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

import Navbar from '@/components/Navbar'
import React from 'react'

const AnalysisPage = () => {
  return (
    <>
    <Navbar />
      <div className='h-[90vh] w-dvh flex justify-center items-center text-2xl '>
        Will be live Soon... 🚀
      </div>
    </>
    
  )
}

export default AnalysisPage
