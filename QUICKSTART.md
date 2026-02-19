# 🚀 CRM System - Quick Start Guide

## 📋 Prerequisites
- Node.js installed
- MongoDB running locally or connection string ready
- WhatsApp account for messaging integration

---

## 🎯 Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Admin Panel
cd ../admin-panel
npm install

# Mobile App
cd ../mobile-app
npm install
```

---

## ⚙️ Step 2: Configure Environment

Create `backend/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/crm
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
FB_VERIFY_TOKEN=your_facebook_webhook_verify_token
```

---

## 🗄️ Step 3: Create Admin Account

```bash
cd backend
node seed.js
```

**Admin Credentials:**
- Email: `admin@example.com`
- Password: `password123`

---

## 🚀 Step 4: Start All Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Admin Panel:**
```bash
cd admin-panel
npm run dev
```

**Terminal 3 - Mobile App:**
```bash
cd mobile-app
npx expo start
```

---

## 📱 Step 5: Connect WhatsApp

### Option A: Using Test Script (Recommended)
```bash
cd backend
node test-whatsapp.js
```

### Option B: Automatic on Server Start
WhatsApp will auto-connect when backend starts.

### How to Scan QR Code:
1. Look at backend terminal - you'll see a QR code
2. Open WhatsApp on your phone
3. Go to: **Settings → Linked Devices → Link a Device**
4. Scan the QR code from terminal
5. Wait for "✅ WhatsApp Connected Successfully!"

**Note:** Session is saved in `auth_info_baileys` folder. You only need to scan once!

---

## 🌐 Access URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Admin Panel** | http://localhost:5174 | admin@example.com / password123 |
| **Backend API** | http://localhost:5000 | - |
| **Mobile App** | Scan QR in Expo terminal | - |
| **MongoDB** | mongodb://localhost:27017/crm | - |

---

## 📱 Mobile App Setup

1. **Update API URL** in `mobile-app/services/api.js`:
   ```javascript
   const BASE_URL = 'http://YOUR_LOCAL_IP:5000/api';
   ```
   
2. **Find your IP:**
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

3. **Update the file:**
   ```javascript
   const BASE_URL = 'http://192.168.1.100:5000/api';
   ```

4. **Scan QR code** in Expo terminal with Expo Go app

---

## ✅ Verify Everything Works

### 1. Test Admin Login
- Go to http://localhost:5174/login
- Login with admin credentials
- You should see the dashboard

### 2. Test Employee Registration
- Click "Register" on login page
- Create an employee account
- Go to "Employees" page as admin
- Approve the employee

### 3. Test Lead Creation
- Go to "Leads" page
- Click "Add Lead" or upload Excel file
- Verify lead appears in table

### 4. Test WhatsApp (After Scanning QR)
- Select a lead with checkbox
- Click "Send Bulk Message"
- Enter message and send
- Check phone for WhatsApp message

### 5. Test Mobile App
- Open Expo Go app on phone
- Scan QR code from terminal
- Login with employee credentials
- View leads and create new ones

---

## 🔧 Troubleshooting

### WhatsApp QR Not Showing
```bash
# Delete auth session and restart
cd backend
Remove-Item -Recurse -Force auth_info_baileys
node test-whatsapp.js
```

### Mobile App Can't Connect
1. Check firewall allows port 5000
2. Verify IP address is correct
3. Ensure phone and PC on same WiFi

### MongoDB Connection Error
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# Or use MongoDB Compass to verify connection
```

### Port Already in Use
```bash
# Kill process on port
npx kill-port 5000
npx kill-port 5174
```

---

## 📊 Default Data Structure

### User Roles:
- **Admin**: Full access, approve employees, view all leads
- **Employee**: Limited to assigned leads only

### Lead Statuses:
- `new` - Just created
- `follow-up` - Needs follow-up
- `converted` - Successfully converted
- `lost` - Lost opportunity

### Lead Sources:
- `manual` - Created via form
- `excel` - Uploaded from Excel
- `facebook` - From Facebook Lead Ads
- `instagram` - From Instagram Lead Forms

---

## 🎯 Next Steps

1. ✅ **Connect WhatsApp** - Scan QR code
2. ✅ **Create Employees** - Register and approve
3. ✅ **Add Leads** - Manual or Excel upload
4. ✅ **Assign Leads** - Assign to employees
5. ✅ **Send Messages** - Test bulk WhatsApp
6. ✅ **Configure Webhooks** - For Facebook/Instagram

---

## 📚 Additional Resources

- **API Documentation**: See `FEATURES.md`
- **Database Schema**: See `FEATURES.md`
- **Deployment Guide**: See `FEATURES.md`

---

## 🆘 Need Help?

Common issues and solutions:

**Issue**: "Network Error" in mobile app
**Solution**: Update IP address in `services/api.js`

**Issue**: WhatsApp not sending messages
**Solution**: Verify QR code was scanned and connection is open

**Issue**: Employee can't login
**Solution**: Admin must approve employee first

**Issue**: Excel upload fails
**Solution**: Ensure columns are: Name, Phone, Email (optional)

---

**System Status**: ✅ All features implemented and ready to use!

**Last Updated**: February 17, 2026
