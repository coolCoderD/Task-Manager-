import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/BackgroundWithBeams.jsx";
import {Link} from "react-router-dom";
import Layout from "./Layout.jsx";

export function BackgroundBeamsWithCollisionDemo() {
return (
  <Layout>
    <div>
    <h2
      className="text-5xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight"
    >
      Take Control of Your Day with{" "}<br/>
      <div
        className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]"
      >
        <div
          className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"
        >
          <span>Tasklytic.</span>
        </div>
        <div
          className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4"
        >
          <span>Tasklytic.</span>
        </div>
      </div>

    </h2>
    </div>
    <div className="relative inline-flex  mt-9 group">
        <div
            className="absolute transition-all  duration-1000 opacity-70 -inset-px bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <Link to='/login'
            className="relative inline-flex items-center justify-center px-8 py-4 text-2xl lg:text-3xl font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
            role="button">Get Started
        </Link>
    </div>
  </Layout>
);

      
}
