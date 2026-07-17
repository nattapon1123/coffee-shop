"use client";
import { Grid, Typography, Box } from "@mui/material";
import { useMemo } from "react";
import MenuCard from "./MenuCard";
import { MenuItem } from "../context/CartContext";
import { Category } from "./FilterBar";

interface MenuListProps {
  searchQuery: string;
  selectedCategory: Category;
}

// ข้อมูลเมนูสินค้า
const menuItems: MenuItem[] = [
  // Coffee (8 items)
  { id: 1, name: "Espresso", price: 60, category: "Coffee", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400", description: "กาแฟเข้มข้น หอมกรุ่น" },
  { id: 2, name: "Latte", price: 85, category: "Coffee", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400", description: "กาแฟผสมนมสด นุ่มละมุน" },
  { id: 3, name: "Cappuccino", price: 85, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400", description: "กาแฟกับโฟมนมฟูนุ่ม" },
  { id: 4, name: "Americano", price: 70, category: "Coffee", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400", description: "กาแฟดำเข้มข้น" },
  { id: 5, name: "Mocha", price: 90, category: "Coffee", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400", description: "กาแฟผสมช็อกโกแลต" },
  { id: 6, name: "Flat White", price: 85, category: "Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400", description: "กาแฟนมเข้มข้นกลมกล่อม" },
  { id: 7, name: "Cold Brew", price: 95, category: "Coffee", image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400", description: "กาแฟชงเย็นหมักนาน 12 ชั่วโมง" },
  { id: 8, name: "Macchiato", price: 80, category: "Coffee", image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400", description: "เอสเพรสโซกับโฟมนมนิดหน่อย" },

  // Tea (7 items)
  { id: 9, name: "Green Tea Latte", price: 80, category: "Tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", description: "ชาเขียวผสมนมสด" },
  { id: 10, name: "Thai Tea", price: 65, category: "Tea", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400", description: "ชาไทยหวานมัน" },
  { id: 11, name: "Chamomile Tea", price: 70, category: "Tea", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400", description: "ชาคาโมมายล์ สุขภาพดี" },
  { id: 12, name: "Earl Grey", price: 75, category: "Tea", image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400", description: "ชาเอิร์ลเกรย์หอมกรุ่น" },
  { id: 13, name: "Oolong Tea", price: 75, category: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", description: "ชาอูหลงหอมละมุน" },
  { id: 14, name: "Matcha Latte", price: 85, category: "Tea", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400", description: "มัทฉะลาเต้เข้มข้น" },
  { id: 15, name: "Taro Milk Tea", price: 80, category: "Tea", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400", description: "ชานมเผือกหวานมัน" },

  // Bakery (8 items)
  { id: 16, name: "Croissant", price: 55, category: "Bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "ครัวซองต์เนยสด กรอบนอกนุ่มใน" },
  { id: 17, name: "Blueberry Muffin", price: 65, category: "Bakery", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400", description: "มัฟฟินบลูเบอร์รี่หอมหวาน" },
  { id: 18, name: "Banana Bread", price: 60, category: "Bakery", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400", description: "ขนมปังกล้วยหอม" },
  { id: 19, name: "Cinnamon Roll", price: 70, category: "Bakery", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400", description: "ซินนามอนโรลอบใหม่หอมกรุ่น" },
  { id: 20, name: "Bagel", price: 65, category: "Bakery", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400", description: "เบเกิลนุ่มหนึบ" },
  { id: 21, name: "Scone", price: 60, category: "Bakery", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400", description: "สโคนเนยสดกรอบนอกนุ่มใน" },
  { id: 22, name: "Waffle", price: 85, category: "Bakery", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400", description: "วาฟเฟิลกรอบหอม" },
  { id: 23, name: "Danish Pastry", price: 75, category: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", description: "เดนิชเพสตรี้เนยสดชั้นๆ" },

  // Dessert (7 items)
  { id: 24, name: "Chocolate Cake", price: 90, category: "Dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "เค้กช็อกโกแลตเข้มข้น" },
  { id: 25, name: "Cheesecake", price: 95, category: "Dessert", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400", description: "ชีสเค้กนิ่มละมุน" },
  { id: 26, name: "Tiramisu", price: 100, category: "Dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", description: "ทิรามิสูอิตาเลียนแท้" },
  { id: 27, name: "Brownie", price: 75, category: "Dessert", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400", description: "บราวนี่ช็อกโกแลตเข้มข้น" },
  { id: 28, name: "Macaron", price: 85, category: "Dessert", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400", description: "มาการองหลากสีสัน" },
  { id: 29, name: "Pudding", price: 70, category: "Dessert", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", description: "พุดดิ้งครีมนุ่มหวาน" },
  { id: 30, name: "Ice Cream", price: 80, category: "Dessert", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400", description: "ไอศกรีมพรีเมียม" },
];

export default function MenuList({ searchQuery, selectedCategory }: MenuListProps) {
  // useMemo กรองเมนูตาม search และ category ไม่คำนวณใหม่ถ้า input ไม่เปลี่ยน
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (filteredItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          ไม่พบเมนูที่ค้นหาครับ 😔
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredItems.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <MenuCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}