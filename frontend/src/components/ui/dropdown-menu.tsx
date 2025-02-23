import * as React from "react"

export interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className="relative">{children}</div>
}

export interface DropdownMenuTriggerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DropdownMenuTrigger({ children, ...props }: DropdownMenuTriggerProps) {
  return <div {...props}>{children}</div>
}

export interface DropdownMenuContentProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DropdownMenuContent({ children, ...props }: DropdownMenuContentProps) {
  return (
    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" {...props}>
      {children}
    </div>
  )
}

export interface DropdownMenuItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DropdownMenuItem({ children, ...props }: DropdownMenuItemProps) {
  return (
    <div
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      {...props}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuLabelProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function DropdownMenuLabel({ children, ...props }: DropdownMenuLabelProps) {
  return (
    <div className="px-4 py-2 text-sm text-gray-900 font-medium" {...props}>
      {children}
    </div>
  )
}

export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-100 my-1" />
} 