"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <CoffeeIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          Coffee Shop
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={onCartClick}>
            <Badge badgeContent={mounted ? totalItems : 0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}