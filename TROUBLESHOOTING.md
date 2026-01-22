# Troubleshooting - Nothing Showing on Localhost

## Quick Fixes:

1. **Make sure dev server is running:**
   ```bash
   npm run dev
   ```
   Should show: `Local: http://127.0.0.1:5173/`

2. **Check browser console (F12)** for any JavaScript errors

3. **Clear browser cache** and hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

4. **Check if port 5173 is accessible:**
   - Open: http://127.0.0.1:5173
   - Or: http://localhost:5173

5. **Reinstall dependencies if needed:**
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

## Common Issues:

- **Port already in use**: Try a different port or kill the process using port 5173
- **JavaScript errors**: Check browser console (F12 → Console tab)
- **Missing dependencies**: Run `npm install`
- **Cached build**: Clear browser cache and restart dev server
