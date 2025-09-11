import { FunnelPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverFilterProps {
  filters: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function PopoverFilter({ filters, selected, onChange }: PopoverFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <FunnelPlusIcon />
          <span className="sr-only">Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Filter</span>
            <Button
              variant="secondary"
              className="h-7 rounded-full px-2 py-1 text-xs"
              onClick={() => {
                onChange([]);
              }}
            >
              Reset all
            </Button>
          </div>
          <div className="flex flex-col gap-2 capitalize">
            {filters.map((label, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox
                  id={`filter-${index + 1}`}
                  checked={selected.includes(label)}
                  onCheckedChange={(checked) =>
                    onChange(
                      checked
                        ? [...selected, label]
                        : selected.filter((item) => item !== label)
                    )
                  }
                />
                <Label htmlFor={`filter-${index + 1}`}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverFilter;
