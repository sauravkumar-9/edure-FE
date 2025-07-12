import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FilterCondition = {
  id: string;
  column: string;
  operator: string;
  value: string | string[];
  logicalOperator: "AND" | "OR";
};

interface DataTableAdvancedFilterProps {
  columns: any[];
  onApply: (filters: FilterCondition[]) => void;
  onReset: () => void;
}

export function DataTableAdvancedFilter({
  columns,
  onApply,
}: // onReset,
DataTableAdvancedFilterProps) {
  const [conditions, setConditions] = useState<FilterCondition[]>([
    {
      id: crypto.randomUUID(),
      column: "",
      operator: "",
      value: "",
      logicalOperator: "AND",
    },
  ]);

  const getDefaultOperator = (columnId: string) => {
    if (!columnId) return "";
    const column = columns.find((col) => col.id === columnId);
    const type = column?.columnDef.meta?.type || "string";

    if (type === "enum") return "equals";
    if (type === "number") return "equals";
    return "contains";
  };

  const getOperatorsForColumn = (columnId: string) => {
    if (!columnId) return [];
    const column = columns.find((col) => col.id === columnId);
    const type = column?.columnDef.meta?.type || "string";
    // const enumValues = column?.columnDef.meta?.enum || [];

    if (type === "enum") {
      return [
        { value: "equals", label: "equals" },
        { value: "notEquals", label: "not equals" },
      ];
    }

    if (type === "number") {
      return [
        { value: "equals", label: "equals" },
        { value: "notEquals", label: "not equals" },
        { value: "greaterThan", label: "greater than" },
        { value: "lessThan", label: "less than" },
        { value: "greaterThanOrEqual", label: "≥" },
        { value: "lessThanOrEqual", label: "≤" },
      ];
    }

    // Default string operators
    return [
      { value: "contains", label: "contains" },
      { value: "notContains", label: "not contains" },
      { value: "equals", label: "equals" },
      { value: "notEquals", label: "not equals" },
      { value: "startsWith", label: "starts with" },
      { value: "endsWith", label: "ends with" },
    ];
  };

  const addCondition = () => {
    const lastCondition = conditions[conditions.length - 1];
    if (
      !lastCondition.column ||
      !lastCondition.operator ||
      !lastCondition.value
    ) {
      return;
    }

    setConditions([
      ...conditions,
      {
        id: crypto.randomUUID(),
        column: "",
        operator: "",
        value: "",
        logicalOperator: "AND",
      },
    ]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length <= 1) return;
    setConditions(conditions.filter((cond) => cond.id !== id));
  };

  const updateCondition = (
    id: string,
    field: keyof FilterCondition,
    value: any
  ) => {
    setConditions(
      conditions.map((cond) => {
        if (cond.id === id) {
          // When column changes, reset operator and value
          if (field === "column") {
            return {
              ...cond,
              column: value,
              operator: getDefaultOperator(value),
              value: "",
            };
          }
          return { ...cond, [field]: value };
        }
        return cond;
      })
    );
  };

  const applyFilters = () => {
    const validConditions = conditions.filter(
      (cond) =>
        cond.column &&
        cond.operator &&
        (Array.isArray(cond.value)
          ? cond.value.length > 0
          : cond.value.toString().trim() !== "")
    );

    if (validConditions.length === conditions.length) {
      onApply(validConditions);
    }
  };

  // const resetFilters = () => {
  //   setConditions([
  //     {
  //       id: crypto.randomUUID(),
  //       column: "",
  //       operator: "",
  //       value: "",
  //       logicalOperator: "AND",
  //     },
  //   ]);
  //   onReset();
  // };

  const handleRemoveAll = () => {
    setConditions([
      {
        id: crypto.randomUUID(),
        column: "",
        operator: "",
        value: "",
        logicalOperator: "AND",
      },
    ]);
  };

  const getColumnType = (columnId: string) => {
    if (!columnId) return "string";
    const column = columns.find((col) => col.id === columnId);
    return column?.columnDef.meta?.type || "string";
  };

  const getEnumValues = (columnId: string) => {
    if (!columnId) return [];
    const column = columns.find((col) => col.id === columnId);
    return column?.columnDef.meta?.enum || [];
  };

  const renderValueInput = (condition: FilterCondition) => {
    if (!condition.column || !condition.operator) {
      return (
        <Input
          disabled
          placeholder="Select column and operator first"
          className="w-[150px]"
        />
      );
    }

    const type = getColumnType(condition.column);
    const enumValues = getEnumValues(condition.column);

    if (type === "enum") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[150px] justify-between",
                !condition.value && "text-muted-foreground"
              )}
            >
              {condition.value && Array.isArray(condition.value)
                ? `${condition.value.length} selected`
                : "Select value"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search value..." />
              <CommandEmpty>No value found</CommandEmpty>
              <CommandGroup>
                {enumValues.map((value: string) => (
                  <CommandItem
                    key={value}
                    onSelect={() => {
                      const currentValue = condition.value || [];
                      const newValue = Array.isArray(currentValue)
                        ? currentValue.includes(value)
                          ? currentValue.filter((v) => v !== value)
                          : [...currentValue, value]
                        : [value];

                      updateCondition(condition.id, "value", newValue);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        Array.isArray(condition.value) &&
                          condition.value.includes(value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Input
        value={condition.value as string}
        onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
        placeholder="Value"
        className="w-[150px]"
        type={type === "number" ? "number" : "text"}
      />
    );
  };

  const isConditionComplete = (condition: FilterCondition) => {
    return (
      condition.column &&
      condition.operator &&
      (Array.isArray(condition.value)
        ? condition.value.length > 0
        : condition.value.toString().trim() !== "")
    );
  };

  const canAddCondition = conditions.every(isConditionComplete);
  const canApplyFilters =
    conditions.length > 0 && conditions.every(isConditionComplete);

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-background">
      <div className="flex flex-wrap items-center gap-2">
        {conditions.map((condition, index) => (
          <div key={condition.id} className="flex items-center gap-2 w-full">
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              <Select
                value={condition.column}
                onValueChange={(value) =>
                  updateCondition(condition.id, "column", value)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.columnDef.meta?.label || column.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={condition.operator}
                onValueChange={(value) =>
                  updateCondition(condition.id, "operator", value)
                }
                disabled={!condition.column}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue
                    placeholder={
                      condition.column
                        ? "Select operator"
                        : "Select column first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {getOperatorsForColumn(condition.column).map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {renderValueInput(condition)}

              {conditions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCondition(condition.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {index > 0 && (
              <div className="flex items-center gap-1 bg-muted rounded-md px-2 py-1 text-xs ml-auto">
                <button
                  onClick={() =>
                    updateCondition(
                      condition.id,
                      "logicalOperator",
                      condition.logicalOperator === "AND" ? "OR" : "AND"
                    )
                  }
                  className={`${
                    condition.logicalOperator === "AND"
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  AND
                </button>
                <span>/</span>
                <button
                  onClick={() =>
                    updateCondition(
                      condition.id,
                      "logicalOperator",
                      condition.logicalOperator === "OR" ? "AND" : "OR"
                    )
                  }
                  className={`${
                    condition.logicalOperator === "OR"
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  OR
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={addCondition}
            disabled={!canAddCondition}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Condition
          </Button>
          {conditions.length > 1 && (
            <Button variant="outline" size="sm" onClick={handleRemoveAll}>
              <X className="h-4 w-4 mr-2" />
              Remove All
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={applyFilters} disabled={!canApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
