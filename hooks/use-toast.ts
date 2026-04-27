"use client"

import { toast } from "sonner"

type ToastInput = {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function useToast() {
  return {
    toast: ({ title, description, action }: ToastInput) =>
      toast(title ?? "", {
        description,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      }),
  }
}
