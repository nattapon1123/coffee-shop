"use client";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { useMemo } from "react";

interface CartProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ open, onClose, onCheckout }: CartProps) {
  const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart, totalPrice } = useCart();

  // useMemo คำนวณราคารวมไม่คำนวณใหม่ถ้า items ไม่เปลี่ยน
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400 }, display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#795548", color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🛒 ตะกร้าสินค้า
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* รายการสินค้า */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                ตะกร้าว่างเปล่าครับ 🛒
              </Typography>
            </Box>
          ) : (
            <List>
              {items.map((item) => (
                <Box key={item.id}>
                  <ListItem sx={{ gap: 2 }}>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ฿{item.price} x {item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "#795548" }}>
                        รวม: ฿{item.price * item.quantity}
                      </Typography>
                      {/* ปุ่มเพิ่ม/ลดจำนวน */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => decreaseQuantity(item.id)}
                          sx={{ bgcolor: "#f5f5f5" }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => increaseQuantity(item.id)}
                          sx={{ bgcolor: "#f5f5f5" }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.id)}
                          sx={{ color: "error.main", ml: 1 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">ยอดรวมทั้งหมด</Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#795548" }}>
                ฿{total}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={onCheckout}
              sx={{ bgcolor: "#795548", "&:hover": { bgcolor: "#5D4037" }, borderRadius: 2, mb: 1 }}
            >
              สั่งซื้อ
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={clearCart}
              color="error"
              sx={{ borderRadius: 2 }}
            >
              ล้างตะกร้า
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}