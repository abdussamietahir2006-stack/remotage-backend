# 🚀 Remotage - Scalable Virtual Assistance Platform

**Modern CMS platform with MongoDB backend, real-time editing, and AI-powered features.**

---

## ✨ Features

- 📝 **Live Content Editor** - Edit website sections in real-time
- 🖼️ **Image Management** - Automatic compression & optimization
- 📊 **Lead Management** - Track bookings and customer queries
- 🔐 **Secure Admin Panel** - Password-protected editing
- 💾 **MongoDB Persistence** - Permanent data storage
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Purple/magenta color scheme with dark sections
- ⚡ **Fast Loading** - Optimized with Vite & compression
- 🔄 **Sync Across Devices** - Cloud-based data (with production setup)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS |
| **Animation** | Framer Motion |
| **Backend** | Express.js + Node.js |
| **Database** | MongoDB + Mongoose |
| **Build Tool** | Vite |
| **Fallback Storage** | IndexedDB |
| **Icons** | Lucide React |

---

## 📋 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB Compass (for local development)
- Git (optional)

### Installation

```bash
# 1. Navigate to project
cd remotage---scalable-virtual-assistance

# 2. Install dependencies
npm install

# 3. Create .env file (already created)
# Copy from .env.example if needed

# 4. Start MongoDB (open MongoDB Compass)
# Make sure Compass shows: mongodb://localhost:27017

# 5. Start the server
npm run dev

# 6. Open in browser
# Frontend: http://localhost:3001
# API: http://localhost:3001/api
```

### Verify MongoDB Connection

Open: `check-mongodb.html` in your browser
- Should show ✅ for Backend and MongoDB if everything works

---

## 🔑 Admin Access

**Email:** `Mashood.tahir@remotage.com` (case-sensitive)  
**Password:** `remotage@12345`

### Admin Panel Actions:
1. Click "ENTER ADMIN PANEL" on homepage
2. Click any section to edit
3. Modify text, upload images, or edit JSON
4. Click "SAVE SECTION"
5. Click "PUBLISH UPDATES" to save to MongoDB

---

## 📂 Project Structure

```
remotage---scalable-virtual-assistance/
├── components/
│   ├── Login.tsx                  # Admin login
│   ├── PublicSite.tsx             # Main website
│   ├── SectionEditor.tsx          # Edit modal
│   ├── AdminLeads.tsx             # Lead viewer
│   ├── BookingModal.tsx           # Booking form
│   └── LoadingScreen.tsx          # Loading animation
├── services/
│   ├── apiService.ts              # API calls to backend
│   ├── storageService.ts          # MongoDB + IndexedDB
│   ├── geminiService.ts           # AI image generation
│   └── imageService.ts            # Image compression
├── App.tsx                        # Main application
├── index.tsx                      # Entry point
├── types.ts                       # TypeScript definitions
├── server.js                      # Express backend + MongoDB
├── .env                           # Environment variables
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── QUICK_START.md                 # Quick setup guide
├── MONGODB_SETUP.md               # Detailed MongoDB guide
└── check-mongodb.html             # Connection checker
```

---

## 🗄️ MongoDB Setup

### Local Development

1. **Download MongoDB Compass**
   - Visit: https://www.mongodb.com/products/tools/compass
   - Install and open

2. **Start Backend**
   ```bash
   npm run dev
   ```
   Should show: `✅ Connected to MongoDB`

3. **Verify Connection**
   - Open `check-mongodb.html` in browser
   - Should show all ✅ statuses

### When to Connect with MongoDB Compass

**ANSWER: Right now!** Follow these steps:

1. ✅ **Open MongoDB Compass** (download from link above)
2. ✅ **Leave connection as:** `mongodb://localhost:27017` (default)
3. ✅ **Click "Connect"**
4. ✅ **Run in terminal:** `npm run dev`
5. ✅ **Open browser:** http://localhost:3001
6. ✅ **Edit content and click "PUBLISH UPDATES"**
7. ✅ **Look in MongoDB Compass** - you'll see your data appear!

### Cloud Setup (MongoDB Atlas)

For production deployment:

1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/remotage
   ```

---

## 📊 Database Collections

### pagecontents Collection
Contains all your page sections (hero, clients, services, etc.)

### leads Collection
Contains booking queries and contact submissions
- Auto-deletes after 7 days (TTL index)

---

## 🎨 Color Scheme

Modern white + dark section design:

| Element | Color | Hex |
|---------|-------|-----|
| Background | White | `#ffffff` |
| Content Sections | Navy | `#0f172a` |
| Primary Accent | Purple | `#7c3aed` |
| Secondary Accent | Magenta | `#d946ef` |

---

## 🚀 API Endpoints

```
GET    /api/health                # Server status
GET    /api/content               # Get all content
GET    /api/content/:id           # Get section by ID
POST   /api/content               # Save/update section
DELETE /api/content/:id           # Delete section
GET    /api/leads                 # Get all leads
POST   /api/leads                 # Submit new lead
```

---

## 🖼️ Image Handling

Images are automatically:
- ✅ Compressed to 70-80% of original size
- ✅ Converted to optimized JPEG
- ✅ Stored as base64 in MongoDB
- ✅ Cached for fast loading

---

## 🔐 Security Notes

⚠️ **Important for Production:**

1. Change admin credentials in `server.js`
2. Use environment variables for secrets
3. Enable MongoDB authentication
4. Use HTTPS for deployment
5. Set CORS properly for your domain
6. Add rate limiting to API endpoints

---

## 📦 Build & Deployment

### Development
```bash
npm run dev       # Start with hot reload
```

### Production Build
```bash
npm run build     # Create optimized build
npm run preview   # Test production build
```

### Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - `MONGODB_URI` → MongoDB Atlas connection string
   - `VITE_API_BASE` → Your Vercel domain
4. Deploy!

---

## 🐛 Troubleshooting

### MongoDB not connecting
- Make sure MongoDB Compass is open and running
- Check .env has correct connection string
- Restart with: `npm run dev`

### Data not saving
- Check browser console (F12) for errors
- Verify MongoDB Compass shows connection
- Check server logs in terminal

### Port 3001 already in use
- Change PORT in .env
- Or kill process: `lsof -ti:3001 | xargs kill -9`

---

## 📝 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/remotage
PORT=3001
NODE_ENV=development
VITE_API_BASE=http://localhost:3001/api
```

See `.env.example` for all options.

---

## 📖 Documentation

- **QUICK_START.md** - Fast setup guide
- **MONGODB_SETUP.md** - Detailed MongoDB instructions
- **check-mongodb.html** - Connection status checker

---

## 🎯 How Data Now Flows

```
You Edit Content
        ↓
Click "PUBLISH UPDATES"
        ↓
Data sent to Express Backend
        ↓
Saved to MongoDB
        ↓
Refresh Page
        ↓
Data loads from MongoDB
        ↓
You see your changes! ✅
```

---

**Ready to get started?** Follow QUICK_START.md - just need to:
1. Open MongoDB Compass ✅
2. Run `npm run dev` ✅
3. Edit and save! ✅

**Happy editing! 🚀**
