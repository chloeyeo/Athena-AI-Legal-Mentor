import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import AccessibilityToolbar from './AccessibilityToolbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityToolbar />
      <Header />
      <div className="flex">
        <Navigation />
        <main 
          className="flex-1 ml-64 p-6"
          role="main"
          aria-label="Main content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}