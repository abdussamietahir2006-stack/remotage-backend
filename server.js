import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration - restrict to frontend origins
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://remotage-frontend.vercel.app" // production
    ],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/remotage';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ==================== SCHEMAS ====================

// Lead Schema - for queries and bookings
const LeadSchema = new mongoose.Schema({
  type: { type: String, enum: ['query', 'booking'], required: true },
  fullName: String,
  email: String,
  message: String,
  reason: String,
  date: String,
  time: String,
  day: String,
  createdAt: { type: Date, default: Date.now }
});

// Auto-delete leads after 7 days
LeadSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

// Page Content Schema - stores all page sections
const PageContentSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  data: mongoose.Schema.Types.Mixed,
  lastModified: { type: Date, default: Date.now },
  version: { type: Number, default: 1 }
}, { timestamps: true });

// ==================== MODELS ====================
const Lead = mongoose.model('Lead', LeadSchema);
const PageContent = mongoose.model('PageContent', PageContentSchema);

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// GET all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new lead
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ message: 'Lead saved successfully', lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET page content by ID
app.get('/api/content/:id', async (req, res) => {
  try {
    const content = await PageContent.findOne({ id: req.params.id });
    
    if (content) {
      console.log(`✅ [MongoDB] Retrieved content ID: ${req.params.id} (v${content.version})`);
      console.log(`📊 Contains ${content.data?.sections?.length || 0} sections`);
      res.json(content.data);
    } else {
      console.log(`ℹ️ [MongoDB] No content found for ID: ${req.params.id}`);
      res.json(null);
    }
  } catch (error) {
    console.error(`❌ [MongoDB] Error retrieving content:`, error);
    res.status(500).json({ error: error.message });
  }
});

// GET all page content
app.get('/api/content', async (req, res) => {
  try {
    const contents = await PageContent.find();
    const result = {};
    contents.forEach(c => {
      result[c.id] = c.data;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST/UPDATE page content
app.post('/api/content', async (req, res) => {
  try {
    const { id, data } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Content ID is required' });
    }

    console.log(`💾 [MongoDB] Saving content with ID: ${id}`);
    console.log(`📊 Data structure:`, {
      hasId: data?.id,
      hasSections: data?.sections?.length,
      firstSectionId: data?.sections?.[0]?.id,
      imageUrls: data?.sections?.map(s => ({ id: s.id, hasImage: !!s.content?.imageUrl }))
    });

    const updated = await PageContent.findOneAndUpdate(
      { id },
      { 
        data,
        lastModified: new Date(),
        $inc: { version: 1 }
      },
      { upsert: true, new: true }
    );

    console.log(`✅ [MongoDB] Successfully saved version ${updated.version} of content ID: ${id}`);
    console.log(`📅 Last modified: ${updated.lastModified}`);

    res.json({ message: 'Content saved successfully', content: updated });
  } catch (error) {
    console.error(`❌ [MongoDB] Error saving content:`, error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE page content
app.delete('/api/content/:id', async (req, res) => {
  try {
    await PageContent.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Remotage server running on port ${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}`);
  console.log(`🔗 MongoDB: ${MONGODB_URI}`);
});
