import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ onCheckedChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-primary"
        ref={ref}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
    )
  }
)
Switch.displayName = "Switch"

export { Switch } 