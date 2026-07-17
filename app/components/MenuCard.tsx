"use client";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCallback } from "react";
import { MenuItem, useCart } from "../context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

const categoryColors: Record<string, string> = {
  Coffee: "#795548",
  Tea: "#4CAF50",
  Bakery: "#FF9800",
  Dessert: "#E91E63",
};

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart();

  // useCallback ป้องกัน function ถูกสร้างใหม่ทุกครั้งที่ render
  const handleAddToCart = useCallback(() => {
    addItem(item);
  }, [addItem, item]);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{
          objectFit: "cover",
          height: 180,
          minHeight: 180,
          maxHeight: 180,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>
          <Chip
            label={item.category}
            size="small"
            sx={{
              bgcolor: categoryColors[item.category],
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {item.description}
        </Typography>
        <Typography variant="h6" sx={{ color: "#795548", fontWeight: "bold" }}>
          ฿{item.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            bgcolor: "#795548",
            "&:hover": { bgcolor: "#5D4037" },
            borderRadius: 2,
          }}
        >
          เพิ่มลงตะกร้า
        </Button>
      </CardActions>
    </Card>
  );
}
