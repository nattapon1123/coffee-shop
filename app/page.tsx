"use client";
import { useState, useCallback } from "react";
import { Box, Container, Typography, InputAdornment, TextField, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import FilterBar, { Category } from "./components/FilterBar";
import Cart from "./components/Cart";
import Summary from "./components/Summary";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleSearchChange = useCallback((value: string) => setSearchQuery(value), []);
  const handleCategoryChange = useCallback((category: Category) => setSelectedCategory(category), []);
  const handleCartOpen = useCallback(() => setCartOpen(true), []);
  const handleCartClose = useCallback(() => setCartOpen(false), []);
  const handleCheckout = useCallback(() => { setCartOpen(false); setShowSummary(true); }, []);
  const handleSummaryClose = useCallback(() => setShowSummary(false), []);

  if (showSummary) return <Summary onClose={handleSummaryClose} />;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFF8F5" }}>
      <Navbar onCartClick={handleCartOpen} />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 6, md: 10 },
          textAlign: "center",
          background: "linear-gradient(160deg, #3E2723 0%, #795548 50%, #A1887F 100%)",
        }}
      >
        {/* วงกลมตกแต่ง */}
        <Box sx={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
        <Box sx={{ position: "absolute", bottom: -60, right: -30, width: 250, height: 250, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />

        <Typography variant="h2" sx={{ fontWeight: 800, color: "white", mb: 1, fontSize: { xs: "2rem", md: "3rem" } }}>
          ☕ Coffee Shop
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
          เครื่องดื่มและขนมคุณภาพ พร้อมเสิร์ฟทุกวัน
        </Typography>

        {/* Search bar อยู่ใน Hero */}
        <Box sx={{ maxWidth: 500, mx: "auto", px: 2 }}>
          <TextField
            fullWidth
            placeholder="ค้นหาเมนูที่คุณชอบ..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#795548" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              "& fieldset": { border: "none" },
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          />
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Filter */}
        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
          {(["All", "Coffee", "Tea", "Bakery", "Dessert"] as Category[]).map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              sx={{
                borderRadius: 5,
                px: 3,
                fontWeight: "bold",
                ...(selectedCategory === cat
                  ? { bgcolor: "#795548", "&:hover": { bgcolor: "#5D4037" } }
                  : { borderColor: "#795548", color: "#795548", "&:hover": { bgcolor: "#f5ebe7" } }),
              }}
            >
              {cat === "All" ? "🍽 ทั้งหมด" :
               cat === "Coffee" ? "☕ Coffee" :
               cat === "Tea" ? "🍵 Tea" :
               cat === "Bakery" ? "🥐 Bakery" : "🍰 Dessert"}
            </Button>
          ))}
        </Stack>

        {/* เมนู */}
        <MenuList searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </Container>

      <Cart open={cartOpen} onClose={handleCartClose} onCheckout={handleCheckout} />
    </Box>
  );
}