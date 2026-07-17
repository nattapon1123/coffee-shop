"use client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";

interface SummaryProps {
  onClose: () => void;
}

export default function Summary({ onClose }: SummaryProps) {
  const { items, clearCart, totalPrice } = useCart();

  // useMemo คำนวณราคารวมและจำนวนสินค้า
  const { total, totalQty } = useMemo(() => {
    return {
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      totalQty: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [items]);

  const handleConfirm = () => {
    clearCart();
    onClose();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: "#4CAF50" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1, color: "#3E2723" }}>
  สรุปคำสั่งซื้อ
</Typography>
<Typography variant="body1" sx={{ color: "#5D4037", fontWeight: "medium" }}>
  กรุณาตรวจสอบรายการก่อนยืนยัน
</Typography>
        </Box>

        {/* รายการสินค้า */}
        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              รายการที่สั่ง ({totalQty} รายการ)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  src={item.image}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{ fontSize: "0.7rem" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ฿{item.price} x {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#795548" }}>
                  ฿{item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* สรุปราคา */}
        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              สรุปราคา
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>ราคารวมสินค้า</Typography>
              <Typography>฿{total}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>ค่าจัดส่ง</Typography>
              <Typography color="success.main">ฟรี</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ยอดรวมทั้งหมด
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#795548" }}>
                ฿{total}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* ปุ่ม */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleConfirm}
          sx={{
            bgcolor: "#795548",
            "&:hover": { bgcolor: "#5D4037" },
            borderRadius: 2,
            mb: 2,
            py: 1.5,
          }}
        >
          ยืนยันคำสั่งซื้อ ฿{total}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={onClose}
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          กลับไปสั่งเพิ่ม
        </Button>
      </Box>
    </Box>
  );
}