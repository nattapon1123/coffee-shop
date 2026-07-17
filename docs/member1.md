# งานศึกษา React Hooks
**ชื่อ:** ณํฐฐพนธ์ แสงเขียว รหัสนักศึกษา 673450034-8  
**รับผิดชอบ:** useState, useCallback, useMemo
______________________________________________________________________________

## 1. useState
**หลักการ:** จัดการตัวแปรที่เมื่อเปลี่ยนค่าแล้ว UI อัปเดตอัตโนมัติ

**โค้ด:**
```tsx
const [searchQuery, setSearchQuery] = useState("");
const [cartOpen, setCartOpen] = useState(false);
```

**เหตุผล:** ใช้จัดการค่าที่เปลี่ยนได้ เช่น คำค้นหา สถานะตะกร้า  
**ข้อดี:** ใช้ง่าย UI อัปเดตอัตโนมัติ  
**ข้อจำกัด:** ไม่เหมาะกับ State ซับซ้อนที่มีหลาย action

______________________________________________________________________________

## 2. useCallback
**หลักการ:** จำฟังก์ชันไว้ไม่ให้สร้างใหม่ทุกครั้งที่ render

**โค้ด:**
```tsx
const handleSearchChange = useCallback((value: string) => {
  setSearchQuery(value);
}, []);
```

**เหตุผล:** ป้องกัน Component ลูก render ซ้ำโดยไม่จำเป็น  
**ข้อดี:** ลดการ render ที่ไม่จำเป็น  
**ข้อจำกัด:** ไม่มีประโยชน์ถ้าไม่ส่งฟังก์ชันให้ Component ลูก

______________________________________________________________________________

## 3. useMemo
**หลักการ:** จำผลลัพธ์การคำนวณไว้ คำนวณใหม่เฉพาะเมื่อ input เปลี่ยน

**โค้ด:**
```tsx
const filteredItems = useMemo(() => {
  return menuItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });
}, [searchQuery, selectedCategory]);
```

**เหตุผล:** ไม่กรองเมนูใหม่ทุกครั้งที่ render  
**ข้อดี:** เพิ่มประสิทธิภาพการคำนวณ  
**ข้อจำกัด:** เปลืองหน่วยความจำถ้าใช้กับการคำนวณง่ายๆ

______________________________________________________________________________