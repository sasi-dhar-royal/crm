# CRM System - Complete Setup Checklist

## ✅ Installation Checklist

- [ ] Node.js installed (v14 or higher)
- [ ] MongoDB installed and running
- [ ] Git installed (optional)

## ✅ Backend Setup

- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Create `.env` file with required variables
- [ ] Run `node seed.js` to create admin account
- [ ] Start server with `npm run dev`
- [ ] Verify "Server running on port 5000" message
- [ ] Verify "MongoDB Connected" message

## ✅ WhatsApp Connection

- [ ] Run `node test-whatsapp.js` in backend folder
- [ ] QR code appears in terminal
- [ ] Open WhatsApp on phone
- [ ] Go to Settings → Linked Devices
- [ ] Scan QR code from terminal
- [ ] See "✅ WhatsApp Connected Successfully!" message
- [ ] `auth_info_baileys` folder created

## ✅ Admin Panel Setup

- [ ] Navigate to `admin-panel` folder
- [ ] Run `npm install`
- [ ] Start dev server with `npm run dev`
- [ ] Open http://localhost:5174 in browser
- [ ] Login with admin@example.com / password123
- [ ] Dashboard loads successfully

## ✅ Mobile App Setup

- [ ] Navigate to `mobile-app` folder
- [ ] Run `npm install`
- [ ] Find your local IP address (ipconfig/ifconfig)
- [ ] Update IP in `services/api.js`
- [ ] Start Expo with `npx expo start`
- [ ] Install Expo Go app on phone
- [ ] Scan QR code with Expo Go
- [ ] App loads successfully

## ✅ Feature Testing

### Authentication
- [ ] Admin can login to admin panel
- [ ] Employee can register (mobile or web)
- [ ] Admin can see pending employees
- [ ] Admin can approve employee
- [ ] Approved employee can login
- [ ] Unapproved employee cannot login

### Lead Management
- [ ] Admin can create lead manually
- [ ] Employee can create lead manually
- [ ] Admin can upload Excel file
- [ ] Leads appear in list
- [ ] Admin can assign lead to employee
- [ ] Employee sees only assigned leads
- [ ] Admin sees all leads

### Lead Updates
- [ ] Can update lead status
- [ ] Can add notes to lead
- [ ] Can set follow-up date
- [ ] Changes save successfully
- [ ] Mobile app syncs with backend

### WhatsApp Messaging
- [ ] Can select multiple leads
- [ ] Can send bulk message
- [ ] Messages deliver to WhatsApp
- [ ] Message logs saved in database
- [ ] Delivery status tracked
- [ ] Employee can only message assigned leads
- [ ] Admin can message all leads

### Dashboard Analytics
- [ ] Admin dashboard shows total leads
- [ ] Shows today's leads count
- [ ] Shows converted leads count
- [ ] Employee performance chart displays
- [ ] Lead source chart displays
- [ ] Employee dashboard shows assigned leads
- [ ] Shows follow-ups due

### Mobile App Features
- [ ] Login screen works
- [ ] Registration works
- [ ] Dashboard displays stats
- [ ] Lead list shows all assigned leads
- [ ] Can create new lead
- [ ] Can view lead details
- [ ] Can update lead status
- [ ] Can add notes
- [ ] Call button works
- [ ] WhatsApp button works
- [ ] Pull to refresh works

## ✅ Advanced Features

### Excel Upload
- [ ] Prepare sample CSV/XLSX file
- [ ] Columns: Name, Phone, Email
- [ ] Upload via admin panel
- [ ] Leads imported successfully
- [ ] Source tagged as "excel"

### Social Media Webhooks
- [ ] Facebook webhook endpoint configured
- [ ] Instagram webhook endpoint configured
- [ ] Verification token set in .env
- [ ] Test webhook with sample data

### Cron Jobs
- [ ] Follow-up reminder cron runs daily at 9 AM
- [ ] Leads with today's follow-up date identified
- [ ] Reminders logged in console
- [ ] (Optional) Email/push notifications sent

## ✅ Security Checks

- [ ] Passwords are hashed (not plain text in DB)
- [ ] JWT tokens expire after 30 days
- [ ] Admin-only routes protected
- [ ] Employee can't access other's leads
- [ ] API validates all inputs
- [ ] Error messages don't expose sensitive data

## ✅ Production Readiness

- [ ] Change admin password from default
- [ ] Update JWT_SECRET to random string
- [ ] Set strong MongoDB password
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV=production
- [ ] Remove console.logs (or use proper logger)
- [ ] Test on production-like environment
- [ ] Backup database regularly

## ✅ Deployment

### Backend
- [ ] Choose hosting (Heroku/Render/Railway)
- [ ] Set environment variables
- [ ] Deploy backend
- [ ] Verify API endpoint works
- [ ] Test database connection

### Admin Panel
- [ ] Update API URL to production backend
- [ ] Build production bundle: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Test deployed admin panel

### Mobile App
- [ ] Update API URL to production backend
- [ ] Configure app.json for build
- [ ] Build APK: `eas build --platform android`
- [ ] Test APK on device
- [ ] Submit to Play Store (optional)

## 🎉 Final Verification

- [ ] All services running
- [ ] WhatsApp connected
- [ ] Admin can login
- [ ] Employees can be approved
- [ ] Leads can be created
- [ ] Messages can be sent
- [ ] Mobile app works on phone
- [ ] Data persists after restart

---

**Status**: Ready for Production ✅

**Date Completed**: _________________

**Notes**: _________________________
