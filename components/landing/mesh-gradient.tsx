"use client";

export function MeshGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs - lighter in light mode, darker in dark mode */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-70 animate-blob transition-colors duration-300" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-70 animate-blob animation-delay-2000 transition-colors duration-300" />
      <div className="absolute top-40 left-40 w-96 h-96 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-70 animate-blob animation-delay-4000 transition-colors duration-300" />

      {/* Gradient overlay - subtle in light mode, more dramatic in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-blue-100/20 to-pink-100/20 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-pink-900/20 transition-colors duration-300" />

      {/* Grid pattern - light gray in light mode, darker in dark mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>
  );
}
