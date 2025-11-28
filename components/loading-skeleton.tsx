"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "circle" | "card"
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer rounded-md",
        variant === "circle" && "rounded-full",
        variant === "card" && "rounded-lg",
        className,
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="circle" className="h-20 w-20 mx-auto" />
      <Skeleton className="h-6 w-40 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  )
}
