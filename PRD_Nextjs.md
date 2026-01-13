# RTA.PAS (Next.js Version) - Product Requirements Document
## Royal Thai Army Project Assessment System v3.0.0 (Next.js Migration)

**วันที่:** 12 มกราคม 2568  
**พัฒนาโดย:** Dr. Krich Intratip  
**Migration Framework:** Next.js 14 (App Router)

---

## 1. ภาพรวมผลิตภัณฑ์

**RTA.PAS** (Royal Thai Army Project Assessment System) เป็นระบบประเมินข้อเสนอโครงการวิจัยทางทหารด้วย AI แบบอัตโนมัติ ที่ถูกพัฒนาใหม่อยู่บนพื้นฐานของ **Next.js 14** เพื่อประสิทธิภาพ, ความปลอดภัย, และความยั่งยืนของระบบ (Scalability) โดยยังคงรักษาประสบการณ์ใช้งาน (UX/UI) และฟีเจอร์เดิมของเวอร์ชัน Legacy ไว้อย่างครบถ้วน

### 1.1 วัตถุประสงค์
- **Modernize:** ยกระดับเทคโนโลยีจาก Vanilla JS สู่ Modern Web Framework (Next.js + React)
- **Maintainability:** โครงสร้างโค้ดแบบ Component-based เพื่อให้ง่ายต่อการดูแลและพัฒนาต่อ
- **Performance:** ใช้ Server Components และ Optimization ของ Next.js
- **Fidelity:** รักษาหน้าร้าน (UI) และการใช้งาน (UX) ให้เหมือนระบบเดิม 100%

---

## 2. ฟีเจอร์หลัก (คงเดิมตาม Legacy)

### 2.1 AI Provider Integration (Updated for v3.0)
ระบบรองรับการเชื่อมต่อกับ AI Provider เดิมที่ผู้ใช้คุ้นเคย โดยมีการระบุ Model ID ตามที่ผู้ใช้ต้องการ (Legacy ID Preservation):

| Provider | Models (Legacy IDs) | หมายเหตุ |
|----------|---------------------|-----------|
| **Google Gemini** | `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.5-flash-lite`, `gemini-2.0-flash` | ใช้ ID เดิมเพื่อความต่อเนื่อง |
| **OpenRouter** | `deepseek-r1`, `deepseek-v3`, `qwen-3`, `llama-4`, `claude-sonnet-4`, `gpt-4o` | รวม 14 models (ฟรี & จ่ายเงิน) |

### 2.2 PDF Text Extraction (Client-Side)
- **Library:** `pdfjs-dist` (v5.4.530)
- **Method:** Dynamic Import (เพื่อหลีกเลี่ยง SSR Errors)
- **Capability:** อ่านภาษาไทย/อังกฤษ, ขนาดไฟล์สูงสุด 20 MB

### 2.3 Expert Evaluation System (Server Actions)
จำลองผู้เชี่ยวชาญ 3 ท่านเช่นเดิม แต่ย้าย Logic การเรียก API ไปที่ **Server Actions** เพื่อความปลอดภัยของ API Key (Masking/Proxy):
1. **ดร. ประชนัย ถิตยาโรจน์** (เทคโนโลยีทหาร)
2. **พล.ต.ดร. สมชัย รัตนโกศิน** (การปฏิบัติการ)
3. **ดร. กัญญา สุวรรณชัยศรี** (นวัตกรรม)

### 2.4 เกณฑ์การประเมิน
- ความมีประโยชน์ (60%)
- ความเป็นไปได้ (20%)
- ความถูกต้อง (10%)
- ความคุ้มค่า (10%)

### 2.5 ผลการประเมิน & Reporting
- แสดงผลแบบ Dashboard (Tailwind CSS)
- **HTML Export:** ระบบ Generate HTML Blob ที่ฝั่ง Client (React) โดยจำลองโครงสร้างไฟล์ HTML แบบ Single-file (Inline CSS/JS) เพื่อให้สามารถดาวน์โหลดและเปิดดูผลลัพธ์ได้แบบ Offline เหมือนระบบเดิม

---

## 3. Technical Architecture (New)

### 3.1 Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (with `@theme inline`)
- **Icons:** `lucide-react`
- **PDF Engine:** `pdfjs-dist` (Client-side worker)
- **AI Integration:** Server Actions (`app/actions/ai.ts`)

### 3.2 Key Components
```
app/
├── globals.css          # Global Styles & Pastel Theme Variables
├── layout.tsx           # Root Layout & Fonts (Prompt)
├── page.tsx             # Main State Manager (Client Component)
└── actions/
    └── ai.ts            # Secure API Calls (Gemini/OpenRouter)

components/
├── Navbar.tsx           # Tab Navigation
├── PhaseSettings.tsx    # AI Config Form
├── PhaseUpload.tsx      # PDF Drag & Drop + Processing
├── PhaseEvaluation.tsx  # Expert Logic & Progress Tracking
├── PhaseResults.tsx     # Result Dashboard & HTML Export
├── PhaseGuide.tsx       # Accordion Guide (Static)
└── PhaseAbout.tsx       # About Info (Static)
```

### 3.3 Data Flow
1. **User Input:** API Key & PDF -> `page.tsx` State
2. **Upload:** `PhaseUpload` extracts text -> `projectData`
3. **Evaluation:** `PhaseEvaluation` calls `ai.ts` (Server Action) -> Returns Expert JSON
4. **Display:** `PhaseResults` renders JSON data
5. **Export:** Client-side generation of HTML file using `projectData` + `evaluationResults`

---

## 4. Security Enhancements
- **Proxy Requests:** AI API calls ทำผ่าน Next.js Server Actions ทำให้ไม่เปิดเผย Endpoints โดยตรงบน Client
- **Type Safety:** ใช้ TypeScript Interface (`ExpertResponse`, `AIConfig`) ลดข้อผิดพลาดขณะ Runtime
- **Env Ready:** รองรับการย้าย API Keys ไป `env` variable ในอนาคต (ปัจจุบันยังรองรับ User Input เพื่อความยืดหยุ่น)

---

## 5. Next Steps
- [ ] Comparison Mode (เปรียบเทียบโครงการ)
- [ ] Persistent Storage (Database Integration)
- [ ] User Authentication (NextAuth)

---

**© 2026 Dr. Krich Intratip | RTA.PAS Next.js Edition**
