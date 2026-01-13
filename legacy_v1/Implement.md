# แผนการพัฒนา RTA.PAS เป็น Next.js Framework

เปลี่ยนจากระบบที่ใช้ Vanilla HTML/JS ไฟล์เดียว เป็นโครงสร้าง Modern Web Application ด้วย Next.js เพื่อความปลอดภัย ความเร็ว และการจัดการโค้ดที่ง่ายขึ้น

## 1. Stack เทคโนโลยีที่เลือกใช้
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS (สำหรับการดีไซน์ที่สวยงามและ Responsive) + Lucide React (Icons)
- **PDF Processing**: `pdf-lib` หรือ `react-pdf-viewer`
- **State Management**: React Context หรือ Zustand (จัดการผลการประเมิน)
- **AI Integration**: Next.js Server Actions (เพื่อซ่อน API Key และเพิ่มความปลอดภัย)

## 2. ข้อควรระวังและการรักษามาตรฐาน (Critical Requirements)
> [!IMPORTANT]
> **UX/UI Design Integrity**: 
> การเปลี่ยนแปลงโครงสร้างต้อง **ไม่กระทบต่อ Design เดิม** ทั้งสี (Pastel Theme), Font (Prompt), อนิเมชัน (Fade/Slide), และ Layout. ทุกอย่างต้องดูเหมือนเดิม 100% ในสายตา User
>
> **Feature Parity**:
> ฟีเจอร์ทุกอย่างต้องทำงานได้เหมือนเดิม ห้ามตัดทอนฟีเจอร์ใดๆ ออก:
> - การ Upload PDF และ Preview ต้องเหมือนเดิม
> - Logic การคำนวณคะแนนต้องแม่นยำเท่าเดิม
> - Flow การใช้งาน 4 Phases ต้องเหมือนเดิม
>
> **Functional Testing**:
> ต้องมีการทดสอบระบบอย่างจริงจังเพื่อให้มั่นใจว่าใช้งานได้จริง ไม่ใช่แค่ compile ผ่าน

## 3. การจัดโครงสร้าง Component

### ส่วนกลาง (Shared Components)
- `Navbar`: เมนูเลือก Phase (Settings -> Upload -> Evaluation -> Results)
- `Card`: กรอบจัดระเบียบเนื้อหา (สไตล์เดียวกับโปรเจคเดิมแต่ยืดหยุ่นกว่า)

### แบ่งตาม Phase
- **Phase 1: Settings** (ตั้งค่า AI)
  - ฟอร์มเลือก Gemini/OpenRouter
  - ช่องใส่ API Key และเลือก Model พร้อมปุ่ม Test Connection
- **Phase 2: Project Upload** (อัปโหลดโครงการ)
  - พื้นที่ลากวางไฟล์ (Drag-and-Drop)
  - พื้นที่แสดง Preview เนื้อหาที่อ่านจาก PDF
- **Phase 3: AI Assessment** (กระบวนการประเมิน)
  - แสดงสถานะการขอความเห็นจากผู้เชี่ยวชาญทั้ง 3 ท่าน (Concurrent Request)
- **Phase 4: Assessment Results** (สรุปผล)
  - Dashboard คะแนนรวมแบบ Visual
  - รายละเอียดแยกตามมิติ (Accordions)
  - ปุ่ม Export รายงาน (PDF/HTML)

## 3. แผนการดำเนินการ (Milestones)
1. **Setup**: เริ่มโปรเจค Next.js ใหม่, ติดตั้ง Tailwind และ Fonts (Prompt)
2. **Logic Migration**: ย้าย Logic การคำนวณและ API Prompt จาก `index.html` ไปเป็น Service Helper
3. **UI Development**: สร้าง UI ทีละหน้าตาม Phase เดิม
4. **Proxy API**: ปรับการเชื่อมต่อ AI ให้ผ่าน Server-side เพื่อความปลอดภัย
5. **Testing & Polish**: ทดสอบการอ่าน PDF ภาษาไทย และปรับแต่ง UI ให้ Premium ยิ่งขึ้น

## 4. สิ่งที่ต้องพิจารณาเป็นพิเศษ
- **Thai Font**: การจัดการ Font 'Prompt' ให้โหลดคงที่ทุกเบราว์เซอร์
- **PDF Extraction**: การอ่านไฟล์ภาษาไทยใน Server-side vs Client-side
- **Security**: การป้องกันไม่ให้ API Key หลุดออกไปในฝั่ง Client

---
*จัดทำโดย: AI Assistant สำหรับโปรเจค RTA.PAS*
