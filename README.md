# Swami Vibekananda College of Education (SVCE) - Official Web Portal

Official institutional website and Mandatory Disclosure portal for **Swami Vibekananda College of Education**, Aurangabad, Keshiary, Paschim Medinipur, West Bengal - 721133.

Managed by **Sahid Khudiram Memorial Trust**.

---

## 🏛️ Accreditations & Recognitions
- **NCTE Recognized (D.El.Ed)**: Order No. `ERC/7-162.6.8/NCTE/D.El.Ed./2013/21191` (Code: ERCAPP77) | Intake: 50 seats
- **NCTE Recognized (B.Ed)**: Order No. `F. No. 234.2.1(Part-2)/APP3967/B.Ed./2016/52099` (Code: ERCAPP3967) | Intake: 50 seats
- **Affiliated to**:
  - West Bengal Board of Primary Education (WBBPE) - Memo No. `83/WBBPE/DELED/2024/081-04/2023`
  - Baba Saheb Ambedkar Education University (BSAEU / WBUTTEPA) & Vidyasagar University

---

## 📂 Project Structure
```
├── .htaccess                  # Apache Clean URL Rewrites (/home, extensionless URLs)
├── index.html                 # Main Homepage
├── about.html                 # About Us & Trust Governance
├── academics.html             # D.El.Ed & B.Ed Course Specifications
├── faculty.html               # 15 B.Ed & 10 D.El.Ed Certified Faculty Rosters & NCTE Table
├── students.html              # 50 Admitted Students Database (Session 2026–2028)
├── mandatory-disclosure.html  # Statutory & Regulatory Disclosures
├── gallery.html               # Campus Infrastructure & Lab Gallery
├── contact.html               # Campus Address & Inquiry Form
├── admin-login.html          # Admin Login Portal (Supabase Auth)
├── admin-dashboard.html      # Administrative Control Panel
├── env.example.js            # Environment Variables Template
├── css/
│   ├── style.css              # Master Design System & Responsive Variables
│   └── components.css         # UI Components, Tables, Modals, Forms
├── js/
│   ├── env.js                 # Local Environment Config (Git-ignored)
│   ├── supabase-config.js     # Supabase Client Initialization
│   ├── data.js                # Structured Datasets
│   ├── main.js                # Navigation, Modals, Tickers
│   └── tables.js              # Table Search, Filter, Pagination & Export
└── assets/
    ├── images/                # Vector Graphics, Vivekananda Emblem & Campus Photo
    └── pdf/                   # 9 Signed Official PDF Documents
```

---

## 🚀 Quick Start (Node.js & TypeScript)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 🔐 Supabase Database & Admin Authentication
1. Open [`.env`](file:///c:/Users/hp/OneDrive/Desktop/sv%20col%20edu/.env) at the root of the project.
2. Enter your live Supabase credentials:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
3. The `.env` file is automatically ignored by Git in [`.gitignore`](file:///c:/Users/hp/OneDrive/Desktop/sv%20col%20edu/.gitignore) for security.
4. [`src/services/supabase.ts`](file:///c:/Users/hp/OneDrive/Desktop/sv%20col%20edu/src/services/supabase.ts) automatically initializes the Supabase client.
