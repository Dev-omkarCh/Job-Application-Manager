
import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Plus,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Mail,
  Menu,
  Sun,
  Briefcase,
  Notebook,
  IndianRupee,
  Wallpaper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Navbar from "@/components/Navbar"
import { Link } from "react-router-dom"
import { useApplication } from "@/hooks/useApplication"
import useApplicationStore from "@/store/applicationStore"
import { formatUpdatedAt } from "@/lib/dateFormat"

const initialApplications= [
  {
    id: "1",
    title: "ReactJS Development",
    company: "FynTune Solution Private Limited",
    appliedDate: "Jun 01, 2025",
    location: "on site",
    salary: "₹ 12,000 - 18,000",
    email: "omkarchikhale.dev@gmail.com",
    status: "Applied",
    source: "Internshala",
    description: "Full-time ReactJS developer position with modern tech stack",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Tech Solutions Inc",
    appliedDate: "May 28, 2025",
    location: "remote",
    salary: "₹ 25,000 - 35,000",
    email: "hr@techsolutions.com",
    status: "Interview",
    source: "LinkedIn",
    description: "Senior frontend developer role focusing on React and TypeScript",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    appliedDate: "May 25, 2025",
    location: "hybrid",
    salary: "₹ 30,000 - 45,000",
    email: "careers@startupxyz.com",
    status: "Offer",
    source: "Company Website",
    description: "Full stack position with React, Node.js, and MongoDB",
  },
]

const statusOptions = ["All Statuses", "Applied", "Interview", "Offered", "Rejected", "Declined"]
const sourceOptions = ["All Sources", "LinkedIn", "Indeed", "Company Website", "Internshala", "Naukri"]
const sortOptions = ["Newest First", "Oldest First", "Company A-Z", "Company Z-A"]

export default function JobTracker() {
  const {applications, setApplications} = useApplicationStore();
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [sourceFilter, setSourceFilter] = useState("All Sources")
  const [sortBy, setSortBy] = useState("Newest First")
  const [editingApp, setEditingApp] = useState(null)
  const [viewingApp, setViewingApp] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getApplications, editApplication, deleteApplication} = useApplication();

  useEffect(()=>{
    getApplications();
  },[]);

  const filteredAndSortedApplications = useMemo(() => {
    const filtered = applications.filter((app) => {
      const matchesSearch =
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.source.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "All Statuses" || app.status === statusFilter
      const matchesSource = sourceFilter === "All Sources" || app.source === sourceFilter

      return matchesSearch && matchesStatus && matchesSource
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Oldest First":
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        case "Company A-Z":
          return a.company.localeCompare(b.companyName)
        case "Company Z-A":
          return b.company.localeCompare(a.companyName)
        default: // Newest First
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
    })

    return filtered
  }, [applications, searchQuery, statusFilter, sourceFilter, sortBy])

  const handleEdit = (app) => {
    setEditingApp(app)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id) => {
    console.log(id);
    setApplications(applications.filter((app) => app._id !== id));
    deleteApplication(id);
  }

  const handleView = (app) => {
    setViewingApp(app)
    setIsViewDialogOpen(true)
  }

  const handleSaveEdit = (updatedApp) => {

    console.log(updatedApp);
    editApplication(updatedApp);
    setApplications(applications.map((app) => {
        return app._id === updatedApp._id ? updatedApp : app
    }));


    setIsEditDialogOpen(false)
    setEditingApp(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-600 hover:bg-blue-700"
      case "Interview":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "Rejected":
        return "bg-red-600 hover:bg-red-700"
      case "Offer":
        return "bg-green-600 hover:bg-green-700"
      case "Offered":
        return "bg-green-600 hover:bg-green-700"
      case "Declined":
        return "bg-gray-600 hover:bg-gray-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const handleStatusChange = (appId, newStatus) => {
    // setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app)))
    setApplications(applications.map((app) => {
        return app._id === appId ? { ...app, status: newStatus } : app
    }));
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Your Job Applications</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 w-fit">
            <Plus className="h-4 w-4 mr-2 font-extrabold" />
            <Link to={"/add"}>Add New</Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by company, role, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="text-white hover:bg-slate-600">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {sourceOptions.map((source) => (
                      <SelectItem key={source} value={source} className="text-white hover:bg-slate-600">
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort and View Toggle */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option} className="text-white hover:bg-slate-600">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-600 text-gray-400 hover:text-white"
                    }
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-600 text-gray-400 hover:text-white"
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedApplications.map((app) => (
              <Card key={app._id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{app.jobTitle}</h3>
                      <p className="text-blue-400 text-sm">{app.companyName}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-700 border-slate-600">
                        <DropdownMenuItem onClick={() => handleView(app)} className="text-white hover:bg-slate-600">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(app)} className="text-white hover:bg-slate-600">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(app._id)}
                          className="text-red-400 hover:bg-slate-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Applied: {formatUpdatedAt(app.updatedAt)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {app.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {app.salary}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {app.gmail}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(app.status)} text-white`}>{app.status}</Badge>
                      <Select
                        value={app.status}
                        onValueChange={(value) => handleStatusChange(app._id, value)}
                      >
                        <SelectTrigger className="w-24 h-7 bg-slate-700 border-slate-600 text-white text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="Applied" className="text-white hover:bg-slate-600 text-xs">
                            Applied
                          </SelectItem>
                          <SelectItem value="Interview" className="text-white hover:bg-slate-600 text-xs">
                            Interview
                          </SelectItem>
                          <SelectItem value="Offered" className="text-white hover:bg-slate-600 text-xs">
                            Offered
                          </SelectItem>
                          <SelectItem value="Rejected" className="text-white hover:bg-slate-600 text-xs">
                            Rejected
                          </SelectItem>
                          <SelectItem value="Declined" className="text-white hover:bg-slate-600 text-xs">
                            Declined
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-xs text-gray-500">{app.source}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedApplications.map((app) => (
              <Card key={app._id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-white mb-1">{app.jobTitle}</h3>
                          <p className="text-blue-400 text-sm">{app.companyName}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex justify-center items-center">
                            <Calendar className="h-4 w-4 mr-2" />{formatUpdatedAt(app.updatedAt)}
                          </span>
                          <span className="flex justify-center items-center">
                            <MapPin className="h-4 w-4 mr-2" />{app.location}
                          </span>
                          <span className="flex justify-center items-center">
                            <DollarSign className="h-4 w-4 mr-2" />{app.salary}
                          </span>
                          <span className="flex justify-center items-center">
                            <Wallpaper className="h-4 w-4 mr-2" />{app.source}
                          </span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(app.status)} text-white`}>{app.status}</Badge>
                        <Select
                          value={app.status}
                          onValueChange={(value) => handleStatusChange(app._id, value)}
                        >
                          <SelectTrigger className="w-28 h-8 bg-slate-700 border-slate-600 text-white text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="Applied" className="text-white hover:bg-slate-600">
                              Applied
                            </SelectItem>
                            <SelectItem value="Interview" className="text-white hover:bg-slate-600">
                              Interview
                            </SelectItem>
                            <SelectItem value="Offered" className="text-white hover:bg-slate-600">
                              Offered
                            </SelectItem>
                            <SelectItem value="Rejected" className="text-white hover:bg-slate-600">
                              Rejected
                            </SelectItem>
                            <SelectItem value="Declined" className="text-white hover:bg-slate-600">
                              Declined
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(app)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(app)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(app._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-center text-gray-400 mt-8">
          Showing {filteredAndSortedApplications.length} of {applications.length} applications
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 JobTrackr. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with <span className="text-red-500">❤</span> for job seekers
            </p>
          </div>
        </div>
      </footer>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} className="">
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md ">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          {editingApp && (
            <EditApplicationForm
              application={editingApp}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg w-[95vw] max-h-[90vh]">
          <DialogHeader className="pb-4 border-b border-slate-600">
            <DialogTitle className="text-xl font-bold">Application Details</DialogTitle>
          </DialogHeader>
          {viewingApp && <ViewApplicationDetails application={viewingApp} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EditApplicationForm({
  application,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(application)

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.jobTitle}
          onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.companyName}
          onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="salary">Salary</Label>
        <Input
          id="salary"
          value={formData.salary}
          onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          onChange={(e) => setFormData((prev) => ({ ...prev, updatedAt: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="Applied" className="text-white">
              Applied
            </SelectItem>
            <SelectItem value="Interview" className="text-white">
              Interview
            </SelectItem>
            <SelectItem value="Offered" className="text-white">
              Offered
            </SelectItem>
            <SelectItem value="Rejected" className="text-white">
              Rejected
            </SelectItem>
            <SelectItem value="Declined" className="text-white">
              Declined
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.jobDescription || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, jobDescription: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
          rows={8}
        />
      </div>
      <div>
        <Label htmlFor="description">Additional Note</Label>
        <Textarea
          id="description"
          value={formData.notes || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
          className="bg-slate-700 border-slate-600 text-white"
          rows={6}
        />
      </div>
      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-600 text-gray-300">
          Cancel
        </Button>
      </div>
    </form>
  )
}

function ViewApplicationDetails({ application }) {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-600 pb-4">
        <h3 className="text-xl font-bold text-white mb-2">{application.jobTitle}</h3>
        <p className="text-blue-400 text-lg font-medium">{application.companyName}</p>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <Badge
          className={`${
            application.status === "Applied"
              ? "bg-blue-600"
              : application.status === "Interview"
                ? "bg-yellow-600"
                : application.status === "Rejected"
                  ? "bg-red-600"
                  : application.status === "Offered"
                    ? "bg-green-600"
                    : application.status === "Declined"
                      ? "bg-gray-600"
                      : "bg-gray-600"
          } text-white px-4 py-2 text-sm font-medium`}
        >
          {application.status}
        </Badge>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-gray-300 font-medium">Applied Date</span>
          </div>
          <p className="text-white text-lg">{formatUpdatedAt(application.updatedAt)}</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-gray-300 font-medium">Location</span>
          </div>
          <p className="text-white text-lg capitalize">{application.location}</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-gray-300 font-medium">Salary Range</span>
          </div>
          <p className="text-white text-lg font-semibold">{application.salary}</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Mail className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-gray-300 font-medium">Contact Email</span>
          </div>
          <p className="text-white text-lg break-all">{application.gmail}</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Search className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-gray-300 font-medium">Source</span>
          </div>
          <p className="text-white text-lg">{application.source}</p>
        </div>

        {application.jobDescription && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Edit2 className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-gray-300 font-medium">Description</span>
            </div>
            <div className="text-white leading-relaxed">
              {application.jobDescription.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}
        {application.notes && (
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Notebook className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-gray-300 font-medium">Additional Note</span>
            </div>
            <div className="text-white leading-relaxed h-fit max-w-full flex flex-col ">
              {application.notes.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
