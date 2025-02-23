import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FiltersProps {
  onFilterChange: (filters: { search?: string, remote?: boolean }) => void
}

export function InternshipFilters({ onFilterChange }: FiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search internships..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="remote"
          onCheckedChange={(checked: boolean) => onFilterChange({ remote: checked })}
        />
        <Label htmlFor="remote">Remote Only</Label>
      </div>
    </div>
  )
} 