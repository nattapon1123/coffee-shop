**ชื่อ:**  กฤติน อินทร์ตระกูล  รหัส 673450030-6
**รับผิดชอบ:** useReducer, useContext, useEffect, Custom Hook
____________________________________________________________________

## 1. useReducer

### ฟังก์ชันการทำงาน
useReducer เป็น Hook ที่ใช้จัดการ State ที่ซับซ้อน โดยใช้รูปแบบ Reducer Pattern ซึ่ง State จะถูกอัปเดตผ่าน Action ที่ส่งไปยัง Reducer Function แทนการอัปเดตโดยตรง ทำให้ logic การจัดการ State อยู่ที่เดียวและตรวจสอบได้ง่าย

### หลักการทำงาน
useReducer รับ 3 argument คือ reducer function, initial state และ initializer function (optional) คืนค่ากลับมาเป็น current state และ dispatch function เมื่อเรียก dispatch พร้อม action, reducer จะรับ state ปัจจุบันและ action แล้วคืน state ใหม่

### ตัวอย่างโค้ด
```tsx
// Reducer Function จัดการทุก action ของตะกร้า
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.payload) };
    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "SET_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

// การใช้งาน
const [state, dispatch] = useReducer(cartReducer, { items: [] });

// dispatch action ต่างๆ
dispatch({ type: "ADD_ITEM", payload: item });
dispatch({ type: "REMOVE_ITEM", payload: id });
dispatch({ type: "CLEAR_CART" });
```

### เหตุผลที่เลือกใช้
ตะกร้าสินค้ามีการจัดการหลาย action พร้อมกัน ได้แก่ ADD_ITEM, REMOVE_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART และ SET_CART ถ้าใช้ useState ต้องเขียนฟังก์ชันแยกหลายตัวและจัดการยาก useReducer รวม logic ทั้งหมดไว้ใน Reducer เดียว ทำให้โค้ดอ่านง่ายและบำรุงรักษาได้ดีกว่า

### ข้อดี
- รวม logic การจัดการ State ทั้งหมดไว้ที่เดียว อ่านง่ายและแก้ไขสะดวก
- แต่ละ action มีชื่อชัดเจน รู้ทันทีว่าทำอะไร
- Reducer เป็น Pure Function ทดสอบได้ง่าย
- เหมาะกับ State ที่มีหลาย action หรือ State ที่ซับซ้อน

### ข้อจำกัด
- โค้ดยาวกว่า useState สำหรับ State ง่ายๆ
- ต้องเขียน action types และ reducer เพิ่มเติม
- ไม่เหมาะกับ State ที่มีแค่ 1-2 ค่าที่ไม่ซับซ้อน

____________________________________________________________________
## 2. useContext

### ฟังก์ชันการทำงาน
useContext เป็น Hook ที่ให้ Component เข้าถึงข้อมูลจาก Context ได้โดยตรง โดยไม่ต้องส่งผ่าน props ทีละชั้น ช่วยแก้ปัญหา Props Drilling ในแอปพลิเคชันที่มีหลาย Component

### หลักการทำงาน
สร้าง Context ด้วย createContext แล้วใช้ Provider ครอบ Component ที่ต้องการแชร์ข้อมูล Component ลูกที่ต้องการใช้ข้อมูลเรียก useContext พร้อม Context ที่ต้องการ React จะหา Provider ที่ใกล้ที่สุดและคืนค่า value ให้

### ตัวอย่างโค้ด
```tsx
// สร้าง Context
const CartContext = createContext<CartContextType | null>(null);

// สร้าง Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        increaseQuantity: (id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }),
        decreaseQuantity: (id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook สำหรับใช้ Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

// การใช้งานใน Component
function MenuCard({ item }) {
  const { addItem } = useCart(); // เข้าถึงข้อมูลได้ทันที
}
```

### เหตุผลที่เลือกใช้
ข้อมูลตะกร้าสินค้าต้องใช้ใน Navbar (แสดงจำนวน), MenuCard (เพิ่มสินค้า), Cart (จัดการสินค้า) และ Summary (สรุปราคา) พร้อมกัน ถ้าใช้ Props Drilling จะต้องส่งข้อมูลผ่านหลายชั้น ทำให้โค้ดซับซ้อนและแก้ไขยาก useContext แชร์ข้อมูลได้ทันทีทุก Component

### ข้อดี
- ไม่ต้องส่ง props ผ่านหลายชั้น โค้ดสะอาดและอ่านง่าย
- ทุก Component เข้าถึงข้อมูลได้โดยตรง
- เมื่อ Context เปลี่ยน Component ที่ใช้จะอัปเดตอัตโนมัติ

### ข้อจำกัด
- ถ้า Context value เปลี่ยน ทุก Component ที่ใช้ Context นั้นจะ re-render พร้อมกัน
- ไม่เหมาะกับข้อมูลที่เปลี่ยนบ่อยมากและมี Component ที่ใช้จำนวนมาก
- ทำให้ Component ขึ้นอยู่กับ Context ทดสอบแยกได้ยากขึ้น

____________________________________________________________________

## 3. useEffect

### ฟังก์ชันการทำงาน
useEffect เป็น Hook ที่ใช้จัดการ Side Effects ใน Component เช่น การโหลดข้อมูล การบันทึกข้อมูล การ subscribe event หรือการอัปเดต DOM โดยทำงานหลังจาก Component render เสร็จ

### หลักการทำงาน
useEffect รับ 2 argument คือ ฟังก์ชัน effect และ dependency array จะทำงานหลัง render ทุกครั้งถ้าไม่มี dependency array, ทำงานครั้งเดียวถ้า dependency array ว่าง, หรือทำงานเมื่อ dependency เปลี่ยนแปลง

### ตัวอย่างโค้ด
```tsx
// โหลดข้อมูลจาก LocalStorage ครั้งเดียวตอนเริ่ม
useEffect(() => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    const parsed = JSON.parse(saved);
    dispatch({ type: "SET_CART", payload: parsed.items || [] });
  }
}, []); // dependency array ว่าง = ทำงานครั้งเดียว

// บันทึกลง LocalStorage ทุกครั้งที่ตะกร้าเปลี่ยน
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(state));
}, [state]); // ทำงานเมื่อ state เปลี่ยน

// mounted state สำหรับแก้ Hydration warning
useEffect(() => {
  setMounted(true);
}, []); // ทำงานครั้งเดียวหลัง mount
```

### เหตุผลที่เลือกใช้
ใช้ useEffect เพื่อบันทึกข้อมูลตะกร้าลง LocalStorage อัตโนมัติทุกครั้งที่มีการเปลี่ยนแปลง และโหลดข้อมูลกลับมาเมื่อเปิดเว็บใหม่ ทำให้ข้อมูลไม่หายเมื่อ refresh หน้าเว็บ

### ข้อดี
- ทำงานอัตโนมัติหลัง render ไม่ blocking UI
- กำหนด dependency ได้ว่าจะทำงานเมื่ออะไรเปลี่ยน
- เหมาะกับการโหลดและบันทึกข้อมูล, subscribe/unsubscribe event

### ข้อจำกัด
- ถ้า dependency array ผิดพลาดอาจเกิด infinite loop ได้
- ต้อง cleanup effect เมื่อ Component ถูก unmount เช่น event listener หรือ timer
- การใช้ async function ใน useEffect ต้องระวังเรื่อง race condition

____________________________________________________________________

## 4. Custom Hook (useLocalStorage)

### ฟังก์ชันการทำงาน
Custom Hook คือฟังก์ชัน JavaScript ที่ชื่อขึ้นต้นด้วย "use" และสามารถเรียกใช้ Hook อื่นๆ ภายในได้ ใช้สำหรับ extract logic ที่ใช้ซ้ำออกมาเป็น Hook แยกต่างหาก

### หลักการทำงาน
useLocalStorage รับ key และ initial value แล้วใช้ useState เก็บค่า และ useEffect บันทึกลง LocalStorage ทุกครั้งที่ค่าเปลี่ยน พร้อม handle กรณีที่ไม่มีข้อมูลใน LocalStorage

### ตัวอย่างโค้ด
```tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  // โหลดข้อมูลจาก LocalStorage ตอนเริ่ม
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // บันทึกลง LocalStorage เมื่อค่าเปลี่ยน
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.error("Error saving to localStorage");
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// การใช้งาน
const [theme, setTheme] = useLocalStorage("theme", "light");
const [favorites, setFavorites] = useLocalStorage("favorites", []);
```

### เหตุผลที่เลือกใช้
สร้าง useLocalStorage เพราะ logic การบันทึกและโหลดข้อมูลจาก LocalStorage เป็นสิ่งที่นำไปใช้ซ้ำได้ในหลาย Component แทนที่จะเขียน useState และ useEffect ซ้ำในทุก Component

### ข้อดี
- นำ logic ไปใช้ซ้ำได้ในหลาย Component โดยไม่ต้องเขียนซ้ำ
- โค้ดสะอาด แยก concern ชัดเจน
- มี error handling รองรับกรณี LocalStorage ไม่พร้อมใช้งาน
- TypeScript Generic ทำให้ใช้ได้กับข้อมูลทุกประเภท

### ข้อจำกัด
- ชื่อ Hook ต้องขึ้นต้นด้วย "use" เสมอ
- ถ้าออกแบบ interface ไม่ดีอาจนำไปใช้ซ้ำได้ยาก
- LocalStorage มีขนาดจำกัดประมาณ 5MB ไม่เหมาะกับข้อมูลขนาดใหญ่
____________________________________________________________________