**ชื่อ:**   ณํฐฐพนธ์ แสงเขียว  รหัส 673450034-8 
**รับผิดชอบ:** useState, useCallback, useMemo
____________________________________________________________________

## 1. useState

### ฟังก์ชันการทำงาน
useState เป็น Hook ที่ใช้สร้างและจัดการ State ภายใน Component เมื่อค่า State เปลี่ยนแปลง React จะทำการ render Component ใหม่โดยอัตโนมัติ ทำให้ UI แสดงผลตามข้อมูลล่าสุดเสมอ

### หลักการทำงาน
useState รับค่าเริ่มต้น (initial value) และคืนค่ากลับมาเป็น Array 2 ตัวคือ ค่าปัจจุบัน และฟังก์ชันสำหรับอัปเดตค่า เมื่อเรียกฟังก์ชันอัปเดต React จะ re-render Component และแสดงค่าใหม่

### ตัวอย่างโค้ด
```tsx
// จัดการคำค้นหา
const [searchQuery, setSearchQuery] = useState("");

// จัดการหมวดหมู่ที่เลือก
const [selectedCategory, setSelectedCategory] = useState<Category>("All");

// จัดการสถานะเปิด/ปิดตะกร้า
const [cartOpen, setCartOpen] = useState(false);

// จัดการการแสดงหน้าสรุป
const [showSummary, setShowSummary] = useState(false);
```

### เหตุผลที่เลือกใช้
ใช้ useState เพราะต้องการจัดการค่าที่เปลี่ยนแปลงได้ตามการกระทำของผู้ใช้ เช่น การพิมพ์ค้นหา การเลือกหมวดหมู่ และการเปิด/ปิดตะกร้าสินค้า ซึ่งเป็น State ที่ไม่ซับซ้อนและเหมาะกับ useState

### ข้อดี
- ใช้งานง่าย โค้ดกระชับ เข้าใจได้เร็ว
- React จัดการการ re-render ให้อัตโนมัติเมื่อ State เปลี่ยน
- เหมาะกับ State ที่มีค่าเดียวหรือไม่ซับซ้อน
- ไม่ต้องเขียน logic เพิ่มเติม

### ข้อจำกัด
- ไม่เหมาะกับ State ที่ซับซ้อนหรือมีหลาย action เช่น ตะกร้าสินค้าที่มีการ ADD, REMOVE, UPDATE ควรใช้ useReducer แทน
- ถ้ามี State หลายตัวที่เกี่ยวข้องกัน การจัดการอาจยุ่งยาก

____________________________________________________________________

## 2. useCallback

### ฟังก์ชันการทำงาน
useCallback เป็น Hook ที่ใช้จำ (memoize) ฟังก์ชัน ป้องกันไม่ให้ฟังก์ชันถูกสร้างใหม่ทุกครั้งที่ Component re-render โดยจะสร้างฟังก์ชันใหม่เฉพาะเมื่อ dependency ที่กำหนดเปลี่ยนแปลงเท่านั้น

### หลักการทำงาน
useCallback รับ 2 argument คือ ฟังก์ชันที่ต้องการจำ และ dependency array React จะคืนค่าฟังก์ชันเดิมถ้า dependency ไม่เปลี่ยน และสร้างฟังก์ชันใหม่เฉพาะเมื่อ dependency เปลี่ยนแปลง

### ตัวอย่างโค้ด
```tsx
// ฟังก์ชันค้นหาไม่ถูกสร้างใหม่ทุกครั้ง
const handleSearchChange = useCallback((value: string) => {
  setSearchQuery(value);
}, []);

// ฟังก์ชันเปลี่ยนหมวดหมู่ไม่ถูกสร้างใหม่ทุกครั้ง
const handleCategoryChange = useCallback((category: Category) => {
  setSelectedCategory(category);
}, []);

// ฟังก์ชันเพิ่มสินค้าในตะกร้า
const handleAddToCart = useCallback(() => {
  addItem(item);
}, [addItem, item]);
```

### เหตุผลที่เลือกใช้
ใช้ useCallback เพราะต้องส่งฟังก์ชันเป็น props ให้ Component ลูก เช่น SearchBar และ FilterBar ถ้าไม่ใช้ useCallback ฟังก์ชันจะถูกสร้างใหม่ทุกครั้งที่ Home Component re-render ทำให้ Component ลูก re-render ซ้ำโดยไม่จำเป็น

### ข้อดี
- ลดการ re-render ของ Component ลูกที่รับฟังก์ชันเป็น props
- เพิ่มประสิทธิภาพโดยรวมของแอปพลิเคชัน
- ช่วยให้ฟังก์ชันมี reference เดิมระหว่าง render

### ข้อจำกัด
- ถ้าใช้กับฟังก์ชันที่ไม่ได้ส่งให้ Component ลูก จะไม่มีประโยชน์และเปลืองหน่วยความจำ
- ต้องระวัง dependency array ให้ถูกต้อง ถ้าใส่ไม่ครบอาจทำให้ฟังก์ชันใช้ค่าเก่า
- โค้ดอาจดูซับซ้อนขึ้นถ้าใช้มากเกินจำเป็น

____________________________________________________________________

## 3. useMemo

### ฟังก์ชันการทำงาน
useMemo เป็น Hook ที่ใช้จำ (memoize) ผลลัพธ์ของการคำนวณ ป้องกันการคำนวณซ้ำโดยไม่จำเป็น โดยจะคำนวณใหม่เฉพาะเมื่อ dependency เปลี่ยนแปลงเท่านั้น

### หลักการทำงาน
useMemo รับ 2 argument คือ ฟังก์ชันที่คืนค่าผลลัพธ์ และ dependency array React จะจำผลลัพธ์ไว้และคืนค่าเดิมถ้า dependency ไม่เปลี่ยน

### ตัวอย่างโค้ด
```tsx
// กรองเมนูตาม search และ category
const filteredItems = useMemo(() => {
  return menuItems.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });
}, [searchQuery, selectedCategory]);

// คำนวณราคารวมในตะกร้า
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [items]);

// คำนวณราคารวมและจำนวนสินค้าในหน้าสรุป
const { total, totalQty } = useMemo(() => {
  return {
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalQty: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}, [items]);
```

### เหตุผลที่เลือกใช้
ใช้ useMemo เพราะการกรองเมนูจาก 30 รายการและการคำนวณราคารวมเป็นการคำนวณที่ทำบ่อย ถ้าไม่ใช้ useMemo จะคำนวณใหม่ทุกครั้งที่ Component re-render แม้ข้อมูลจะไม่เปลี่ยน

### ข้อดี
- ลดการคำนวณซ้ำที่ไม่จำเป็น เพิ่มประสิทธิภาพ
- เหมาะกับการกรองข้อมูล การคำนวณราคา หรือการแปลงข้อมูลที่ซับซ้อน
- ผลลัพธ์จะถูก cache ไว้และนำมาใช้ซ้ำได้

### ข้อจำกัด
- ถ้าใช้กับการคำนวณง่ายๆ จะเปลืองหน่วยความจำโดยไม่จำเป็น
- ต้องระวัง dependency array ให้ถูกต้อง
- ไม่ควรใช้กับทุก computation เพราะ overhead ของ useMemo เองอาจมากกว่าประโยชน์ที่ได้
____________________________________________________________________