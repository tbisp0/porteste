#!/usr/bin/env node

/**
 * Script to switch between Vite configurations
 * Usage:
 *   node scripts/switch-vite-config.js websocket    # Enable WebSocket (default)
 *   node scripts/switch-vite-config.js no-websocket # Disable WebSocket
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const mode = args[0] || 'websocket';

const rootDir = path.resolve(__dirname, '..');
const currentConfig = path.join(rootDir, 'vite.config.ts');
const websocketConfig = path.join(rootDir, 'vite.config.ts');
const noWebsocketConfig = path.join(rootDir, 'vite.config.no-websocket.ts');

function switchConfig(targetMode) {
  try {
    if (targetMode === 'no-websocket') {
      // Backup current config
      if (fs.existsSync(currentConfig)) {
        fs.copyFileSync(currentConfig, path.join(rootDir, 'vite.config.websocket.backup.ts'));
      }
      
      // Copy no-websocket config
      if (fs.existsSync(noWebsocketConfig)) {
        fs.copyFileSync(noWebsocketConfig, currentConfig);
        console.log('✅ Switched to no-websocket configuration');
        console.log('🔄 Please restart your development server: npm run dev');
      } else {
        console.error('❌ No-websocket configuration file not found');
        process.exit(1);
      }
    } else if (targetMode === 'websocket') {
      // Restore websocket config from backup if it exists
      const backupConfig = path.join(rootDir, 'vite.config.websocket.backup.ts');
      if (fs.existsSync(backupConfig)) {
        fs.copyFileSync(backupConfig, currentConfig);
        console.log('✅ Restored websocket configuration from backup');
        console.log('🔄 Please restart your development server: npm run dev');
      } else {
        console.log('ℹ️  Current configuration already supports WebSocket');
      }
    } else {
      console.error('❌ Invalid mode. Use "websocket" or "no-websocket"');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error switching configuration:', error.message);
    process.exit(1);
  }
}

console.log(`🔧 Switching to ${mode} configuration...`);
switchConfig(mode);
