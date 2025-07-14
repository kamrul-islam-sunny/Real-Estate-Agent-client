'use client'
import { ContactPieChart } from '@/components/dashboard/components/ContactPieChart';
import DashboardSkeleton from '@/components/dashboard/components/DashboardSkeleton';
import { PropertiesChart } from '@/components/dashboard/components/PropertyChart';
import { BlogActivity } from '@/components/dashboard/components/RecentBlogs';
import { TeamMembers } from '@/components/dashboard/components/TeamMembers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHandleFindBlogQuery } from '@/redux/features/blogs/blogApi';
import { useHandleFindContactQuery } from '@/redux/features/contact/contactApi';
import { useHandleGetPropertiesQuery } from '@/redux/features/properties/propertiesApi';
import { useHandleFindTeamMemberQuery } from '@/redux/features/team/teamApi';
import { Building2, FileText, MessageSquare, Users2 } from 'lucide-react';
import React from 'react';

const Dashboard = () => {

   const { data: propertiesData,isLoading:propertiesLoading } = useHandleGetPropertiesQuery({});
  const properties = propertiesData?.payload?.data || [];

  const { data: blogsData,isLoading:blogsLoading } = useHandleFindBlogQuery({});
  const blogs = blogsData?.payload?.findEdBlog || [];

  const { data: contactsData,isLoading:contactsLoading } = useHandleFindContactQuery({});
  const contacts = contactsData?.payload?.data || [];

  const { data: membersData,isLoading:membersLoading } = useHandleFindTeamMemberQuery({});
  const members = membersData?.payload?.findEdTeam || [];

  const unreadContacts = contacts.filter((contact) => !contact.isRead).length;
  const importantContacts = contacts.filter(
    (contact) => contact.isImportant
  ).length;
  if (propertiesLoading || blogsLoading || contactsLoading || membersLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="text-muted-foreground">
          Heres an overview of your property management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Properties Card */}
        <Card className="group relative overflow-hidden border border-blue-100/50 hover:border-blue-200 transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white transition-all duration-300 group-hover:from-blue-100/80" />
          <div className="absolute right-4 top-4 rounded-full bg-blue-100/30 p-2 backdrop-blur-sm group-hover:bg-blue-100/50 transition-colors">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-blue-800/80">
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-blue-700">
                {properties.length}
              </span>
              <span className="text-xs text-blue-600/70 mb-1">total</span>
            </div>
            <p className="text-xs text-blue-600/60 mt-2">
              <span className="font-medium">
                {properties.filter((p) => p.sale === "buy").length}
              </span>{" "}
              for sale •{" "}
              <span className="font-medium">
                {properties.filter((p) => p.sale === "rent").length}
              </span>{" "}
              for rent
            </p>
          </CardContent>
        </Card>

        {/* Blog Posts Card */}
        <Card className="group relative overflow-hidden border border-purple-100/50 hover:border-purple-200 transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white transition-all duration-300 group-hover:from-purple-100/80" />
          <div className="absolute right-4 top-4 rounded-full bg-purple-100/30 p-2 backdrop-blur-sm group-hover:bg-purple-100/50 transition-colors">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-purple-800/80">
              Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-purple-700">
                {blogs.length}
              </span>
              <span className="text-xs text-purple-600/70 mb-1">articles</span>
            </div>
            <p className="text-xs text-purple-600/60 mt-2">
            
              <span className="font-medium line-clamp-1">
              Latest:{blogs[0]?.name || "No posts"}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Inquiries Card */}
        <Card className="group relative overflow-hidden border border-green-100/50 hover:border-green-200 transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white transition-all duration-300 group-hover:from-green-100/80" />
          <div className="absolute right-4 top-4 rounded-full bg-green-100/30 p-2 backdrop-blur-sm group-hover:bg-green-100/50 transition-colors">
            <MessageSquare className="h-5 w-5 text-green-600" />
          </div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-green-800/80">
              Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-green-700">
                {contacts.length}
              </span>
              <span className="text-xs text-green-600/70 mb-1">total</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-xs bg-green-100/70 text-green-700 px-2 py-1 rounded-full border border-green-200/50">
                {unreadContacts} unread
              </span>
              <span className="text-xs bg-green-100/70 text-green-700 px-2 py-1 rounded-full border border-green-200/50">
                {importantContacts} important
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Team Card */}
        <Card className="group relative overflow-hidden border border-amber-100/50 hover:border-amber-200 transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white transition-all duration-300 group-hover:from-amber-100/80" />
          <div className="absolute right-4 top-4 rounded-full bg-amber-100/30 p-2 backdrop-blur-sm group-hover:bg-amber-100/50 transition-colors">
            <Users2 className="h-5 w-5 text-amber-600" />
          </div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium text-amber-800/80">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-amber-700">
                {members.length}
              </span>
              <span className="text-xs text-amber-600/70 mb-1">active</span>
            </div>
            <p className="text-xs text-amber-600/60 mt-2">
              Latest:{" "}
              <span className="font-medium">
                {members[0]?.name || "No members"}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PropertiesChart properties={properties} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle>Contact Status (Pie)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ContactPieChart contacts={contacts} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Blog Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogActivity blogs={blogs.slice(0, 3)} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMembers members={members.slice(0, 4)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;