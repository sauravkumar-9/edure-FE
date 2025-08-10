"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface dropDownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  maxVisibleItems?: number;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export default function DropDown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  maxVisibleItems = 5,
  className = "",
  triggerClassName = "",
  contentClassName = "",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",
}: dropDownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showSearch = options.length > maxVisibleItems;
  const displayOptions = searchTerm ? filteredOptions : options;

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className={`w-full ${className} ${triggerClassName}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`${contentClassName}`}>
        {showSearch && (
          <div className="p-2 sticky top-0 bg-white z-10">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        <div
          style={{
            maxHeight: `${maxVisibleItems * 40}px`,
            overflowY: "auto",
          }}
        >
          {displayOptions.length > 0 ? (
            displayOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
                onMouseDown={(e) => {
                  // Prevent the dropdown from closing when selecting an item
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {option}
              </SelectItem>
            ))
          ) : (
            <div className="py-2 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
