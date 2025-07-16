import 'dotenv/config'

export default {
  expo: {
    name: 'mmabcdefg',
    slug: 'mmabcdefg',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'mmabcdefg',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.wa2goose.ExpoQR2',
      infoPlist: {
        NSCameraUsageDescription:
          'Ứng dụng cần quyền truy cập camera để quét mã QR và chụp ảnh đại diện.',
        NSPhotoLibraryUsageDescription:
          'Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh đại diện và tải lên ảnh.'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/icon.png',
        backgroundColor: '#ffffff'
      },
      edgeToEdgeEnabled: true,
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'RECEIVE_BOOT_COMPLETED',
        'VIBRATE'
      ]
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/icon.png'
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#199A8E'
        }
      ],
      'expo-camera',
      'expo-image-picker',
      [
        'expo-notifications',
        {
          icon: './assets/images/icon.png',
          color: '#199A8E',
          defaultChannel: 'default'
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
}
