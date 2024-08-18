# RPG TO DO LIST

### **Requirements ของโปรเจค แอปพลิเคชัน To-Do List ผสมกับระบบ RPG**

---

#### **1. ระบบผู้ใช้ (User System)**
- **User Account:**
  - ผู้ใช้สามารถลงทะเบียนบัญชีใหม่ได้ด้วยการกรอกข้อมูลดังนี้:
    - ชื่อผู้ใช้ (username)
    - อีเมล (email)
    - รหัสผ่าน (password)
    - วันที่ลงทะเบียน (created_at) จะถูกบันทึกโดยอัตโนมัติ
  - ผู้ใช้สามารถเข้าสู่ระบบด้วยชื่อผู้ใช้หรืออีเมลและรหัสผ่านที่ลงทะเบียนไว้
  - ผู้ใช้สามารถสร้างตัวละคร (Character) ได้สูงสุด 3 ตัวละครต่อบัญชี

---

#### **2. ระบบตัวละคร (Character System)**
- **Character Creation:**
  - ผู้ใช้สามารถสร้างตัวละครได้ 3 ตัวต่อบัญชี
  - แต่ละตัวละครจะมีข้อมูลดังนี้:
    - ชื่อตัวละคร (name)
    - ค่าประสบการณ์ (exp)
    - ระดับ (level)
    - จำนวนเงินในเกม (coin)
    - ค่าพลังชีวิต (health)
    - ค่าพลังงาน (stamina)
    - ค่าจุดโฟกัส (focus_point)

- **Level Up:**
  - ตัวละครจะได้รับค่าประสบการณ์ (exp) เมื่อทำงาน (Work) หรือภารกิจ (Task) เสร็จสมบูรณ์
  - เมื่อสะสม exp ได้ถึงจำนวนที่กำหนด ตัวละครจะเลื่อนระดับ (level up) และได้รับแต้ม (point) สำหรับอัพเกรดความสามารถ (spacial)

- **Spacial System:**
  - เมื่อเลเวลตัวละครเพิ่มขึ้น ผู้ใช้จะได้รับแต้มที่สามารถนำไปอัพเกรดค่า Spacial ที่มีผลต่อการทำงานของตัวละคร
  - ค่า Spacial ที่สามารถอัพเกรดได้ ได้แก่:
    - ความแข็งแกร่ง (str) ส่งผลต่อจำนวนงานที่ทำได้
    - ความฉลาด (int) ส่งผลต่อ exp ที่ได้รับ
    - ความอดทน (end) ส่งผลต่อค่าสุขภาพ
    - ความคล่องตัว (agi) ส่งผลต่อการจัดการ deadline
    - ความรับผิดชอบ (dex) ส่งผลต่อการทำ Task

---

#### **3. ระบบงานและภารกิจ (Work and Task System)**
- **Work Management:**
  - ผู้ใช้สามารถเพิ่มงาน (Work) ได้สูงสุด 3 งานต่อหนึ่งตัวละคร
  - แต่ละงานจะมีข้อมูลดังนี้:
    - ชื่องาน (name)
    - คำอธิบายงาน (desc)
    - วันที่เริ่มงาน (start)
    - วันที่ครบกำหนดส่ง (due)

- **Task Management:**
  - ในแต่ละงานสามารถมีภารกิจย่อย (Task) ได้สูงสุด 10 ภารกิจ
  - ข้อมูลของ Task ประกอบด้วย:
    - ชื่อภารกิจ (name)
    - คำอธิบายภารกิจ (desc)
    - ระดับความยาก (difficulty)
    - วันที่เริ่มภารกิจ (start)
    - วันที่ครบกำหนดส่ง (due)
  - เมื่อ Task เสร็จสิ้น ตัวละครจะได้รับ exp และ coin ตามระดับความยากของ Task นั้น
  - เมื่อจบงาน (Work) จะได้รับ exp มากขึ้น

---

#### **4. ระบบโฟกัส (Focus Mode System)**
- **Focus Mode:**
  - ผู้ใช้สามารถเปิดใช้งานโหมดโฟกัสสำหรับการทำงานที่ต้องการความตั้งใจเป็นพิเศษ
  - ในโหมดโฟกัส ตัวละครจะใช้ค่าจุดโฟกัส (focus_point) สำหรับการทำงาน
  - การใช้ Focus Mode จะเพิ่มโอกาสในการสำเร็จงานและภารกิจในเวลาที่กำหนด

- **Focus Point:**
  - ค่าจุดโฟกัส (focus_point) สามารถได้รับจากการเลเวลอัพหรือตามเหตุการณ์พิเศษ

---

#### **5. ระบบการซื้อขายและไอเทม (Coin and Items System)**
- **Coin Earning:**
  - ผู้ใช้สามารถได้รับ Coin หลังจากเสร็จสิ้นภารกิจ (Task) และงาน (Work)
  - ปริมาณ Coin ที่ได้รับขึ้นอยู่กับระดับความยากของ Task และ Work

- **Item Purchase:**
  - ผู้ใช้สามารถใช้ Coin ที่ได้รับมาซื้อไอเทมในเกม ซึ่งจะช่วยเพิ่มประสิทธิภาพของตัวละครหรือช่วยในการทำงาน

---

#### **6. ระบบเควสประจำวัน/สัปดาห์ (Daily/Weekly Quests System)**
- **Daily/Weekly Quests:**
  - ผู้ใช้จะได้รับเควสพิเศษที่ต้องทำให้เสร็จในแต่ละวันหรือสัปดาห์
  - เควสเหล่านี้สามารถให้รางวัลพิเศษ เช่น exp, coin, หรือ item ที่มีค่ามากกว่าปกติ

---

#### **7. ระบบความสำเร็จ (Achievement System)**
- **Achievements:**
  - ผู้ใช้สามารถสะสมความสำเร็จจากการทำ Task, Work, หรือการอัพเกรดตัวละคร
  - ระบบความสำเร็จจะมีเป้าหมายหรือเงื่อนไขที่ต้องทำให้สำเร็จ เช่น "ทำ Task 100 ครั้งสำเร็จ" หรือ "เลเวลตัวละครถึงระดับ 10"
  - เมื่อบรรลุความสำเร็จ ผู้ใช้จะได้รับรางวัลพิเศษ

---

#### **8. ระบบเก็บสถิติ (Statistics System)**
- **User and Character Statistics:**
  - ระบบจะบันทึกสถิติของผู้ใช้และตัวละคร เช่น จำนวน Task ที่ทำเสร็จ จำนวนงานที่ทำสำเร็จ จำนวน exp และ coin ที่ได้รับ
  - สถิติเหล่านี้จะแสดงให้ผู้ใช้เห็นเพื่อให้ทราบภาพรวมของความก้าวหน้าในระบบ

---

### **การพัฒนาแอปพลิเคชัน**
- **Backend:**
  - ใช้ Express.js และ TypeScript สำหรับพัฒนา API และ Business Logic ทั้งหมด
- **Frontend:**
  - ใช้ SwiftUI สำหรับการพัฒนา UI/UX ที่รองรับการทำงานทั้งหมดของระบบ

### **ความคาดหวังของระบบ**
- ผู้ใช้จะสามารถจัดการการทำงานในชีวิตประจำวันได้อย่างมีประสิทธิภาพผ่านการทำงานในรูปแบบเกม RPG
- ระบบจะช่วยเพิ่มความสนุกและแรงจูงใจให้กับผู้ใช้ในการทำงานและบรรลุเป้าหมายที่ตั้งไว้

---
### **ERD**


```mermaid
erDiagram
    User {
        username str
        email str
        password str "ข้อมูลการเข้าสู่ระบบ"
        created_at datetime "วันที่ลงทะเบียน"
    }
    
    Character {
        id int "รหัสประจำตัวตัวละคร"
        name str
        exp int
        lv int
        coin int
        health int
        stamina int
        focus_point int
        user_id int "เชื่อมโยงกับ User"
    }
    
    Work {
        id int "รหัสประจำงาน"
        name str
        description str
        start_date datetime "วันที่เริ่มงาน"
        due_date datetime "กำหนดส่ง"
        status str "สถานะของงาน เช่น In Progress, Completed"
        character_id int "เชื่อมโยงกับ Character"
    }
    
    Task {
        id int "รหัสประจำภารกิจ"
        name str
        description str
        difficulty int "ความยากของภารกิจ"
        start_date datetime "วันที่เริ่มภารกิจ"
        due_date datetime "กำหนดส่งภารกิจ"
        status str "สถานะภารกิจ เช่น Not Started, In Progress, Completed"
        work_id int "เชื่อมโยงกับ Work"
    }
    
    Attribute {
        id int "รหัสประจำ Attribute"
        str int "ส่งผลต่อจำนวนงาน"
        int int "ส่งผลต่อ exp ที่ได้รับ"
        end int "ส่งผลต่อค่าสุขภาพ"
        agi int "ส่งผลต่อ deadline"
        dex int "ค่าความรับผิดชอบ"
        character_id int "เชื่อมโยงกับ Character"
    }

    Reward {
        id int "รหัสประจำรางวัล"
        type str "ประเภทของรางวัล เช่น Exp, Coin"
        amount int "จำนวนรางวัลที่ได้รับ"
        description str "รายละเอียดเพิ่มเติมของรางวัล"
        task_id int "เชื่อมโยงกับ Task"
    }

    Quest {
        id int "รหัสประจำเควส"
        name str
        description str
        type str "ประเภทของเควส เช่น Daily, Weekly"
        start_date datetime "วันที่เริ่มเควส"
        end_date datetime "วันที่สิ้นสุดเควส"
        status str "สถานะของเควส เช่น Not Started, In Progress, Completed"
        character_id int "เชื่อมโยงกับ Character"
        reward_id int "เชื่อมโยงกับ Reward"
    }

    Achievement {
        id int "รหัสประจำความสำเร็จ"
        name str
        description str
        criteria str "เงื่อนไขในการได้รับความสำเร็จ"
        reward_id int "เชื่อมโยงกับ Reward"
        character_id int "เชื่อมโยงกับ Character"
        achieved_at datetime "วันที่ได้รับความสำเร็จ"
        condition_id int "เชื่อมโยงกับ Condition"
    }

    Condition {
        id int "รหัสเงื่อนไขความสำเร็จ"
        name str "ชื่อเงื่อนไข เช่น เควสสำเร็จ, จำนวนภารกิจที่ทำ"
        description str "รายละเอียดของเงื่อนไข"
        threshold int "ค่าที่ต้องบรรลุ เช่น ทำเควสครบ 10 เควส"
        type str "ประเภทของเงื่อนไข เช่น Count, Exp, Coin"
    }

    UserStatistic {
        id int "รหัสประจำสถิติ"
        total_exp int "Exp รวมทั้งหมด"
        total_coin int "Coin รวมทั้งหมด"
        total_quests int "จำนวนเควสที่ทำสำเร็จ"
        total_achievements int "จำนวนความสำเร็จที่ได้รับ"
        user_id int "เชื่อมโยงกับ User"
    }

    CharacterStatistic {
        id int "รหัสประจำสถิติ"
        total_work int "จำนวนงานที่ทำสำเร็จ"
        total_task int "จำนวนภารกิจที่ทำสำเร็จ"
        total_quests int "จำนวนเควสที่ทำสำเร็จ"
        total_achievements int "จำนวนความสำเร็จที่ได้รับ"
        character_id int "เชื่อมโยงกับ Character"
    }

    User ||--|{ Character : "owns"
    Character ||--|{ Work : "manages"
    Character ||--|{ Attribute : "has"
    Work ||--|{ Task : "contains"
   
    Character ||--|{ Quest : "undertakes"
    Character ||--|{ Achievement : "earns"
    Quest ||--|{ Reward : "gives"
    Achievement ||--|{ Reward : "gives"
    Achievement ||--|{ Condition : "based_on"
    User ||--|{ UserStatistic : "has"
    Character ||--|{ CharacterStatistic : "has"

```