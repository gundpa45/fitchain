# 🌍 Earth Image Setup Guide

## Quick Setup Steps

### Step 1: Save Your Earth Image
1. **Right-click** on the Earth image you provided
2. **Save it** as `earth.jpg` 
3. **Place it** in the folder: `frontend/public/images/earth.jpg`

### Step 2: Verify the Setup
The CSS is already configured to use your image! Once you save the image file, it will automatically appear as the background.

## File Structure
```
frontend/
├── public/
│   └── images/
│       ├── earth.jpg  ← Your Earth image goes here
│       └── README.md
└── src/
    └── components/
        └── LandingPage.css  ← Already configured!
```

## What's Already Done ✅
- ✅ CSS configured to use `/images/earth.jpg`
- ✅ Dark overlay added for text readability
- ✅ Background only appears on hero section (not when scrolling)
- ✅ Responsive design for all screen sizes
- ✅ Fixed attachment for parallax effect
- ✅ Fallback gradient if image doesn't load

## Expected Result
Once you add the image, you'll see:
- 🌍 Your beautiful Earth image as the hero background
- ⭐ Stars and space atmosphere from your image
- 📝 Readable text with proper contrast
- 📱 Works perfectly on mobile and desktop
- 🎯 Background only on landing page hero section

## Troubleshooting
If the image doesn't appear:
1. Check the file name is exactly: `earth.jpg`
2. Check the file is in: `frontend/public/images/`
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Check browser console for any errors

That's it! Your Earth image will be live on the landing page! 🚀