'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import PageContainer from '@/components/Layout/PageContainer';
import Button from '@/components/Common/Button';

export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  // Protect the dashboard route - redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // If we're not authenticated, don't render the dashboard content
  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageContainer 
      title="Your Dashboard" 
      subtitle="Welcome to your personalized dashboard"
    >
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.nickname || 'User'}!</h2>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              This is your personal dashboard where you can manage your account and access personalized content.
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <h3 className="text-xl font-medium mb-4">Your Account</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Profile Information</h4>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Email:</span> {user?.email}</li>
                  <li><span className="font-medium">Name:</span> {user?.first_name} {user?.last_name}</li>
                  <li><span className="font-medium">Role:</span> {user?.role}</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Account Management</h4>
                <div className="space-y-2">
                  <Button 
                    onClick={logout}
                    variant="destructive"
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity to display.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium mb-4">Recommended Content</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Check back soon for personalized recommendations.</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
