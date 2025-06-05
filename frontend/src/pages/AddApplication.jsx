"use client"

import { useState } from "react"
import { Briefcase, Sun, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/Navbar"
import { useApplication } from "@/hooks/useApplication"

export default function JobTrackr() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Add New");
  const { getApplications, submitApplication } = useApplication();
  const [ formData, setFormData ] = useState({
    companyName : "",
    jobRole : "",
    jobDescription : "",
    salary: "",
    location: "",
    email: "",
    date: Date.now(),
    source: "linkedIn",
    status: "Applied",
    notes: "",
  });

  const navigationItems = [
    { name: "Home", active: false },
    { name: "Applications", active: false },
    { name: "Add New", active: true },
    { name: "Analytics", active: false },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // submitApplication(formData);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Add New Job Application</h1>

          <div className="bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-700">
            <form className="space-y-4 md:space-y-6">
              {/* Company Name and Job Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Google"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    value={formData.companyName}
                    onChange={(e)=> setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Job Role <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    value={formData.jobRole}
                    onChange={(e)=> setFormData({ ...formData, jobRole: e.target.value })}
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Job Description</label>
                <Textarea
                  placeholder="Brief description of the job..."
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400
                   focus:border-blue-400 min-h-[100px] resize-none"
                  value={formData.jobDescription}
                  onChange={(e)=> setFormData({ ...formData, jobDescription: e.target.value })}
                />
              </div>

              {/* Salary and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Salary</label>
                  <Input
                    placeholder="e.g. $80,000 - $100,000"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    value={formData.salary}
                    onChange={(e)=> setFormData({ ...formData, salary: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Location</label>
                  <Input
                    placeholder="e.g. New York, NY or Remote"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    value={formData.location}
                    onChange={(e)=> setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              {/* Email and Date Applied */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <Input
                    placeholder="e.g. recruiter@company.com"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                    value={formData.email}
                    onChange={(e)=> setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Date Applied</label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="bg-slate-700 border-slate-600 text-white focus:border-blue-400"
                      onChange={(e)=> setFormData({ ...formData, date: e.target.value })}
                    />
                    
                  </div>
                </div>
              </div>

              {/* Source and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Source</label>
                  <Select value={formData.source} onValueChange={(value)=> setFormData({ ...formData, source: value })}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="linkedin" className="text-white hover:bg-slate-600">
                        LinkedIn
                      </SelectItem>
                      <SelectItem value="indeed" className="text-white hover:bg-slate-600">
                        Indeed
                      </SelectItem>
                      <SelectItem value="glassdoor" className="text-white hover:bg-slate-600">
                        Glassdoor
                      </SelectItem>
                      <SelectItem value="company-website" className="text-white hover:bg-slate-600">
                        Company Website
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Status</label>
                  <Select defaultValue={formData.status} onValueChange={(value)=> setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="applied" className="text-white hover:bg-slate-600">
                        Applied
                      </SelectItem>
                      <SelectItem value="interview" className="text-white hover:bg-slate-600">
                        Interview
                      </SelectItem>
                      <SelectItem value="offer" className="text-white hover:bg-slate-600">
                        Offer
                      </SelectItem>
                      <SelectItem value="rejected" className="text-white hover:bg-slate-600">
                        Rejected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Notes</label>
                <Textarea
                  placeholder="Any additional notes..."
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 min-h-[100px] 
                  resize-none"
                  value={formData.notes}
                  onChange={(e)=> setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                 onClick={handleSubmit}
                 >
                  Add Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-6 text-center text-sm text-slate-400">
        <p>© 2025 JobTrackr. All rights reserved.</p>
        <p className="mt-1">
          Made with <span className="text-red-400">❤</span> for job seekers
        </p>
      </footer>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer */}
          <div className="fixed top-0 left-0 right-0 bg-slate-800 border-b border-slate-700 z-50 md:hidden animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-blue-400">JobTrackr</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    item.active ? "text-blue-400 bg-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                  onClick={() => {
                    setActiveTab(item.name)
                    setIsDrawerOpen(false)
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
