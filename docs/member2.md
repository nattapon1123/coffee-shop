# งานศึกษา React Hooks
**ชื่อ:** Member2  
**รับผิดชอบ:** useReducer, useContext, useEffect, Custom Hook
______________________________________________________________________________


## 1. useReducer
**หลักการ:** จัดการ State ซับซ้อนด้วย Reducer Function รับ Action แล้วคืน State ใหม่

**โค้ด:**
```tsx
const [state, dispatch] = useReducer(cartReducer, { items: [] });
dispatch({ type: "ADD_ITEM", payload: item });
dispatch({ type: "REMOVE_ITEM", payload: id });
```

**เหตุผล:** ตะกร้ามีหลาย action ใช้ useReducer รวม logic ไว้ที่เดียว  
**ข้อดี:** โค้ดอ่านง่าย จัดการ action ได้ชัดเจน  
**ข้อจำกัด:** โค้ดยาวกว่า useState ไม่เหมาะกับ State ง่ายๆ

______________________________________________________________________________

## 2. useContext
**หลักการ:** แชร์ข้อมูลให้ทุก Component ใช้ร่วมกันโดยไม่ต้องส่งผ่าน Props

**โค้ด:**
```tsx
const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  return useContext(CartContext);
}
```

**เหตุผล:** ข้อมูลตะกร้าต้องใช้หลาย Component พร้อมกัน  
**ข้อดี:** ไม่ต้องส่ง Props หลายชั้น  
**ข้อจำกัด:** ถ้า Context เปลี่ยน ทุก Component ที่ใช้จะ render ใหม่

______________________________________________________________________________

## 3. useEffect
**หลักการ:** ทำงานหลัง render เช่น บันทึกข้อมูล โหลดข้อมูล

**โค้ด:**
```tsx
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(state));
}, [state]);
```

**เหตุผล:** บันทึกตะกร้าลง LocalStorage อัตโนมัติเมื่อมีการเปลี่ยนแปลง  
**ข้อดี:** ทำงานอัตโนมัติหลัง render  
**ข้อจำกัด:** dependency array ผิดอาจเกิด infinite loop

______________________________________________________________________________

## 4. Custom Hook (useLocalStorage)
**หลักการ:** ฟังก์ชันที่สร้างเองโดยรวม Hook หลายตัวเพื่อนำ logic ไปใช้ซ้ำ

**โค้ด:**
```tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue] as const;
}
```

**เหตุผล:** นำ logic LocalStorage ไปใช้ซ้ำได้หลาย Component  
**ข้อดี:** โค้ดสะอาด ใช้ซ้ำได้  
**ข้อจำกัด:** ต้องตั้งชื่อขึ้นต้นด้วย use เสมอ

______________________________________________________________________________
