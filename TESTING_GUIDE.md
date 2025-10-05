# 🧪 HD Poker Runs NC - Testing & Usage Guide

This guide walks you through testing all features of your deployed HD Poker Runs NC application.

## 🚀 Application URL
Once deployed, your application will be available at:
- **DigitalOcean**: `https://hd-poker-runs-nc-xxxxx.ondigitalocean.app`
- **Local**: `http://localhost:3000` (development)

## 🔐 User Authentication Testing

### Test 1: User Registration
1. **Navigate to Registration**:
   - Click "Register" or go to `/register`
   - Fill out the registration form:

```
Name: John Rider
Email: john.rider@example.com
Password: Test123!@#
Phone: (555) 123-4567
Role: participant (default)
```

2. **Bike Information**:
```
Make: Harley-Davidson
Model: Street Glide
Year: 2023
Color: Midnight Blue
```

3. **Emergency Contact**:
```
Name: Jane Rider
Phone: (555) 987-6543
Relationship: Spouse
```

4. **Address**:
```
Street: 123 Main St
City: Charlotte
State: NC
Zip Code: 28201
```

### Test 2: User Login
1. **Navigate to Login**: `/login`
2. **Login with credentials**:
   - Email: `john.rider@example.com`
   - Password: `Test123!@#`
3. **Verify**: Should redirect to dashboard with user profile

### Test 3: Profile Management
1. **Go to Profile**: `/profile`
2. **Update profile information**
3. **Upload avatar** (if file upload is working)
4. **Verify changes are saved**

## 🏍️ Event Management Testing

### Test 4: Create Event (Admin/Organizer)
**Note**: You'll need admin/organizer role for this test.

1. **Upgrade user role** (manually in MongoDB or via admin interface):
   - Find your user in MongoDB Atlas
   - Change `role: "organizer"` or `role: "admin"`

2. **Create New Event**:
```
Title: Blue Ridge Mountain Poker Run
Description: A scenic ride through the beautiful Blue Ridge Mountains
Date: [Select future date]
Registration Fee: $25.00
Max Participants: 50
```

3. **Start Location**:
```
Name: Harley-Davidson of Asheville
Address: 1570 Hendersonville Rd, Asheville, NC 28803
Coordinates: 35.5557, -82.5188
```

4. **End Location**:
```
Name: Thunder Road Harley-Davidson
Address: 5969 E Virginia Beach Blvd, Norfolk, VA 23502
Coordinates: 36.8628, -76.1772
```

5. **Add Stops**:
```
Stop 1:
- Name: Blue Ridge Parkway Visitor Center
- Address: 195 Hemphill Knob Rd, Asheville, NC 28803
- Required: Yes

Stop 2:
- Name: Grandfather Mountain
- Address: 2050 Blowing Rock Hwy, Linville, NC 28646
- Required: Yes
```

6. **Add Prizes**:
```
1st Place: $500 Cash Prize
2nd Place: $300 Harley Merchandise
3rd Place: $200 Gift Card
```

### Test 5: View Events
1. **Navigate to Events**: `/events`
2. **Verify event list displays**
3. **Test filtering** (by date, location, etc.)
4. **Click event details**

### Test 6: Event Registration
1. **Select an event**
2. **Click "Register"**
3. **Fill registration form**:
   - Confirm bike information
   - Emergency contact details
   - Special requests/dietary needs
4. **Submit registration**
5. **Verify registration confirmation**

## 🎯 Event Participation Testing

### Test 7: Dashboard Functionality
1. **Navigate to Dashboard**: `/dashboard`
2. **Verify displays**:
   - Upcoming registered events
   - Past events
   - User statistics
   - Recent activity

### Test 8: Event Check-in/Management
1. **Go to registered event**
2. **Test check-in process** (if implemented)
3. **View other participants**
4. **Update registration details**

### Test 9: Unregister from Event
1. **Find registered event**
2. **Click "Unregister"**
3. **Confirm cancellation**
4. **Verify removal from participant list**

## 🗺️ Map and Location Testing

### Test 10: Interactive Maps
1. **View event details with map**
2. **Verify start/end locations display correctly**
3. **Check route/stops on map**
4. **Test map interactions** (zoom, pan)

## 📱 Mobile Responsiveness Testing

### Test 11: Mobile Interface
1. **Open app on mobile device or resize browser**
2. **Test navigation menu**
3. **Verify forms work on mobile**
4. **Check map functionality on touch devices**
5. **Test image uploads on mobile**

## 🔒 Security Testing

### Test 12: Authentication Security
1. **Try accessing protected routes without login**
2. **Verify JWT token expiration**
3. **Test password reset** (if implemented)
4. **Try accessing admin functions as regular user**

### Test 13: Input Validation
1. **Test form validation**:
   - Empty required fields
   - Invalid email formats
   - Weak passwords
   - Invalid phone numbers
2. **Test XSS protection** (try entering HTML/JavaScript in forms)
3. **Test file upload restrictions**

## 🚨 Error Handling Testing

### Test 14: Error Scenarios
1. **Test network offline scenarios**
2. **Try invalid URLs** (`/nonexistent-page`)
3. **Test server errors** (if possible)
4. **Verify error messages are user-friendly**

## ⚡ Performance Testing

### Test 15: Load Times
1. **Measure page load times**
2. **Test with slow network connection**
3. **Verify image optimization**
4. **Check API response times**

## 🎨 UI/UX Testing

### Test 16: User Experience
1. **Navigation flow testing**
2. **Form usability**
3. **Button and link functionality**
4. **Visual consistency**
5. **Accessibility** (keyboard navigation, screen reader compatibility)

## 📊 Data Testing

### Test 17: Data Persistence
1. **Create data and refresh page**
2. **Log out and log back in**
3. **Verify data integrity**
4. **Test data updates and deletions**

## 🔧 Admin Functions Testing

### Test 18: Admin Dashboard (Admin role required)
1. **User management**
2. **Event approval/management**
3. **System statistics**
4. **Bulk operations**

## 📧 Notification Testing

### Test 19: Email Notifications (if configured)
1. **Registration confirmations**
2. **Event reminders**
3. **Password reset emails**
4. **Event updates**

## 🗂️ Data Export Testing

### Test 20: Reports and Export
1. **Participant lists**
2. **Event reports**
3. **User statistics**
4. **CSV/PDF exports**

## 🏁 Testing Checklist

- [ ] User registration works
- [ ] User login/logout works  
- [ ] Profile updates save correctly
- [ ] Events display properly
- [ ] Event creation works (admin/organizer)
- [ ] Event registration works
- [ ] Maps display locations correctly
- [ ] Mobile interface is responsive
- [ ] Authentication security works
- [ ] Form validation works
- [ ] Error messages are clear
- [ ] Page load times are acceptable
- [ ] Navigation is intuitive
- [ ] Data persists correctly
- [ ] Admin functions work (if applicable)
- [ ] Email notifications work (if configured)

## 🐛 Bug Reporting

When you find issues, document them with:

1. **Steps to reproduce**
2. **Expected behavior** 
3. **Actual behavior**
4. **Browser/device information**
5. **Screenshots** (if applicable)

## 📈 Performance Metrics to Monitor

- **Page load time**: < 3 seconds
- **API response time**: < 1 second  
- **Mobile score**: > 90 (Google PageSpeed)
- **Accessibility score**: > 90
- **User registration success rate**: > 95%

## 🎯 Success Criteria

Your application is ready for production when:

✅ All authentication flows work smoothly
✅ Events can be created, viewed, and managed
✅ Registration process is intuitive
✅ Mobile experience is excellent
✅ Security measures are in place
✅ Performance meets standards
✅ Error handling is user-friendly