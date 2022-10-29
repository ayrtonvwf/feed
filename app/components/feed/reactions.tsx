import React from "react";

export const MyReactions: React.FC = () => (
  <div className="flex">
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full bg-sky-200 text-center text-2xl hover:text-3xl">
        👍
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">
        😂
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">
        😮
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">
        ❤️
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">
        😠
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <button className="block h-12 w-12 rounded-full text-center text-2xl hover:text-3xl">
        😥
      </button>
      <span className="block text-sm text-slate-800">100</span>
    </div>
  </div>
);
