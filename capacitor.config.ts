import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.351d57605e78419283ba2f60a1544841',
  appName: 'nextdoc-flow-studio',
  webDir: 'dist',
  server: {
    url: 'https://351d5760-5e78-4192-83ba-2f60a1544841.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e40af',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;