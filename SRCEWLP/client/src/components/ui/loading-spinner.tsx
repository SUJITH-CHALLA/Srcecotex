import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-gray-300 border-t-[var(--eco-primary)]",
            sizeClasses[size],
            className
          )}
        />
        <p className="text-[var(--eco-text)] font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}