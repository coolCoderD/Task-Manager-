import React from 'react';
import { BackgroundBeamsWithCollision } from './ui/BackgroundWithBeams';


const Layout = ({ children }) => {

  return (
    <>
        <BackgroundBeamsWithCollision className="h-screen w-screen  flex  items-center justify-center">
          <main className="flex-grow w-full flex flex-col items-center justify-center">
            {children} {/* This will be the login form or any other page content */}
          </main>
        </BackgroundBeamsWithCollision>
        <footer className="w-full py-4  text-black text-center">
          <p>&copy; 2024 Tasklytic. All rights reserved.</p>
        </footer>
    </>


  );
};

export default Layout;
