# RTA.PAS - Product Requirements Document
## Royal Thai Army Project Assessment System v2.1.0

**วันที่:** 12 มกราคม 2568  
**พัฒนาโดย:** Dr. Krich Intratip

---

## 1. ภาพรวมผลิตภัณฑ์

**RTA.PAS** (Royal Thai Army Project Assessment System) เป็นระบบประเมินข้อเสนอโครงการวิจัยทางทหารด้วย AI แบบอัตโนมัติ ตามเกณฑ์มาตรฐาน **กวป.ทบ.** (กรรมการวิจัยและพัฒนาการทางทหาร กองทัพบก)

### 1.1 วัตถุประสงค์
- ลดระยะเวลาในการประเมินข้อเสนอโครงการ
- เพิ่มความเป็นมาตรฐานและโปร่งใสในการประเมิน
- ให้ข้อมูลเชิงลึกแก่ผู้เสนอโครงการเพื่อปรับปรุง

---

## 2. ฟีเจอร์หลัก

### 2.1 AI Provider Integration
| Provider | Models | ค่าใช้จ่าย |
|----------|--------|-----------|
| Google Gemini | 4 models | ฟรี (มี quota) |
| OpenRouter | 12+ models | ฟรี + มีค่าใช้จ่าย |

**โมเดลแนะนำ:**
- 🆓 DeepSeek R1, DeepSeek V3 Chat
- 🆓 Qwen 3 235B, Qwen 3 30B
- 🆓 Llama 4 Maverick, Llama 3.3 70B
- 💰 Claude Sonnet 4, GPT-4o

### 2.2 PDF Text Extraction
- ใช้ PDF.js library สำหรับอ่านเนื้อหา PDF
- รองรับภาษาไทยและอังกฤษ
- แสดงตัวอย่างเนื้อหา 200 ตัวอักษรแรก
- รองรับไฟล์สูงสุด 20 MB

### 2.3 Expert Evaluation System
**3 ผู้เชี่ยวชาญจำลอง:**
1. **ดร. ประชนัย ถิตยาโรจน์** - เทคโนโลยีทหาร
2. **พล.ต.ดร. สมชัย รัตนโกศิน** - การปฏิบัติการ
3. **ดร. กัญญา สุวรรณชัยศรี** - นวัตกรรม

### 2.4 เกณฑ์การประเมิน (กวป.ทบ.)
| เกณฑ์ | คะแนนเต็ม | คำอธิบาย |
|-------|----------|----------|
| ความมีประโยชน์ | 60 | ประโยชน์ต่อกองทัพ, ยุทธศาสตร์ |
| ความเป็นไปได้ | 20 | ศักยภาพทีม, ทรัพยากร |
| ความถูกต้อง | 10 | วิธีวิทยาการวิจัย |
| ความคุ้มค่า | 10 | งบประมาณ, ROI |

### 2.5 ผลการประเมิน
- คะแนนรวมเฉลี่ยจาก 3 ผู้เชี่ยวชาญ
- คะแนนแยกตามเกณฑ์ 4 ด้าน
- ความเห็นละเอียดตามเกณฑ์
- จุดแข็ง / จุดที่ควรปรับปรุง
- ข้อเสนอแนะเฉพาะทาง
- สรุปข้อเสนอแนะโดยรวม

### 2.6 HTML Export
- ดาวน์โหลดรายงานเป็น HTML
- รูปแบบเดียวกับหน้าเว็บ
- รองรับการพิมพ์ (print-friendly)

---

## 3. User Journey

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. เลือก AI    │ ──▶ │  2. อัพโหลด PDF │ ──▶ │  3. ประเมิน     │ ──▶ │  4. ดูผลลัพธ์   │
│  + ทดสอบ API    │     │  + กรอกข้อมูล   │     │  (2-5 นาที)     │     │  + ดาวน์โหลด    │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Flow Control
- ❌ ไม่สามารถไป Step 2 จนกว่า API test ผ่าน
- ❌ ไม่สามารถประเมินจนกว่าอัพโหลด PDF

---

## 4. Technical Specifications

### 4.1 Frontend
- HTML5 + CSS3 + Vanilla JavaScript
- Responsive Design (Pastel Theme)
- PDF.js v3.11.174 (CDN)
- Google Font: Prompt

### 4.2 API Integration
**Google Gemini:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

**OpenRouter:**
```
POST https://openrouter.ai/api/v1/chat/completions
```

### 4.3 Rate Limiting
- 2 วินาที delay ระหว่าง API calls
- Fallback to default values if JSON parse fails

---

## 5. Security Considerations

- API Key เก็บใน memory เท่านั้น (ไม่ persist)
- PDF ประมวลผลใน browser (client-side)
- ไม่ส่งข้อมูลไป server ภายนอก (ยกเว้น AI API)

---

## 6. Future Enhancements

- [ ] Export เป็น PDF แทน HTML
- [ ] เพิ่ม comparison mode
- [ ] บันทึกประวัติการประเมิน (localStorage)
- [ ] รองรับหลายภาษา
- [ ] Batch evaluation (หลายโครงการพร้อมกัน)

---

**© 2026 Dr. Krich Intratip | RTA.PAS v2.1.0**
