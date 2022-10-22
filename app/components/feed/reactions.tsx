import React from "react";

export const MyReactions: React.FC = () => (
  <div className="flex">
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl bg-sky-200">👍</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">😂</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">😮</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">❤️</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">😠</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
    <div className="flex flex-col justify-center items-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">😥</button>
      <span className="block text-slate-800 text-sm">100</span>
    </div>
  </div>
);
