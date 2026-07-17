"use client";
import { Box, Button } from "@mui/material";
import { useCallback } from "react";

export type Category = "All" | "Coffee" | "Tea" | "Bakery" | "Dessert";

const categories: Category[] = ["All", "Coffee", "Tea", "Bakery", "Dessert"];

interface FilterBarProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  // useCallback ป้องกัน function ถูกสร้างใหม่ทุกครั้งที่ render
  const handleClick = useCallback(
    (category: Category) => {
      onChange(category);
    },
    [onChange]
  );

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "contained" : "outlined"}
          onClick={() => handleClick(category)}
          sx={{ borderRadius: 3 }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
}