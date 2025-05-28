# WebSocket Connection Troubleshooting Guide

## Problem Description
You may encounter WebSocket connection errors like:
```
WebSocket connection to 'ws://localhost:5176/portfolio/?token=...' failed
[vite] failed to connect to websocket
Uncaught (in promise) Error: WebSocket closed without opened
```

## Solutions

### Solution 1: Current Configuration (Recommended)
The current `vite.config.ts` is configured with:
- WebSocket enabled on port 5177
- HMR (Hot Module Replacement) enabled
- Proper client port configuration

This should work for most development environments.

### Solution 2: Disable WebSocket (Fallback)
If you continue experiencing WebSocket issues, you can switch to a configuration that completely disables WebSocket:

```bash
# Switch to no-websocket configuration
node scripts/switch-vite-config.js no-websocket

# Restart development server
npm run dev
```

To switch back to WebSocket configuration:
```bash
# Switch back to websocket configuration
node scripts/switch-vite-config.js websocket

# Restart development server
npm run dev
```

### Solution 3: Manual Port Configuration
If you need to use different ports, edit `vite.config.ts`:

```typescript
server: {
  port: 5176,        // Main server port
  hmr: {
    port: 5177,      // WebSocket port
    host: 'localhost',
    clientPort: 5177 // Ensure client uses correct port
  }
}
```

### Solution 4: Network/Firewall Issues
If you're behind a corporate firewall or using a VPN:

1. **Check firewall settings**: Ensure ports 5176 and 5177 are not blocked
2. **Try different ports**: Change both server and HMR ports in config
3. **Use polling**: Enable polling in the watch configuration:
   ```typescript
   watch: {
     usePolling: true,
     interval: 1000
   }
   ```

### Solution 5: Clear Cache and Restart
Sometimes cached Vite client code can cause issues:

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

# Restart development server
npm run dev
```

## Verification Steps

1. **Check server startup**: Look for this message:
   ```
   VITE v6.3.5  ready in XXX ms
   ➜  Local:   http://localhost:5176/portfolio/
   ```

2. **Check browser console**: Should not show WebSocket errors

3. **Test HMR**: Make a small change to a component and verify it updates without page refresh

## Configuration Files

- `vite.config.ts` - Main configuration (WebSocket enabled)
- `vite.config.no-websocket.ts` - Fallback configuration (WebSocket disabled)
- `scripts/switch-vite-config.js` - Helper script to switch configurations

## Common Issues and Fixes

### Issue: "WebSocket closed without opened"
**Fix**: Use Solution 2 (disable WebSocket) or check firewall settings

### Issue: "failed to connect to websocket"
**Fix**: Verify ports 5176 and 5177 are available, or change ports in config

### Issue: HMR not working
**Fix**: Ensure WebSocket is properly configured or use polling mode

### Issue: Development server won't start
**Fix**: Check if ports are already in use:
```bash
# Check what's using port 5176
netstat -ano | findstr :5176

# Kill process if needed (Windows)
taskkill /PID <PID> /F
```

## Need Help?
If none of these solutions work, please provide:
1. Your operating system
2. Node.js version (`node --version`)
3. npm version (`npm --version`)
4. Complete error message from browser console
5. Complete error message from terminal
