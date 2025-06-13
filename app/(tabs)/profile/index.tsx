import LoadingOverlay from '@/lib/components/Loading'
import MenuSection from '@/lib/components/MenuVertical'
import { useUserById } from '@/lib/hooks/api/useUser'
import { theme } from '@/lib/theme'
import { useRouter } from 'expo-router'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
const Profile = () => {
  const navigation = useRouter()
  const { data, isLoading } = useUserById('6848f28cddd4f001f846e347')
  console.log('data', data)
  const handleUpdateProfile = () => {
    navigation.navigate({
      pathname: '/profile/user-profile',
      params: { userProfile: data && JSON.stringify(data) }
    })
  }

  const handleUpdateAddress = () => {
    navigation.navigate({
      pathname: '/profile/user-address',
      params: { userAddress: (data && JSON.stringify(data)) || '' }
    })
  }
  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profile}>
        <Image source={{ uri: data?.image }} style={styles.avatar} />
        {/* <TouchableOpacity style={styles.cameraIcon}>
          <Ionicons name="camera" size={18} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.email}>{data && data.email}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Đã xác thực</Text>
        </View>
      </View>

      {/* Body */}
      <ScrollView style={styles.menuContainer}>
        <MenuSection
          title='Cài đặt chung'
          items={[
            {
              icon: 'account-edit',
              label: 'Thông tin cá nhân',
              highlight: true,
              onPress: () => handleUpdateProfile()
            },
            {
              icon: 'google-maps',
              label: 'Địa chỉ',
              onPress: () => handleUpdateAddress()
            },
            {
              icon: 'account-lock',
              label: 'thay đổi mật khẩu',
              highlight: true
            },
            { icon: 'history', label: 'Lịch sử hiến máu' }
          ]}
        />

        <MenuSection
          title='Bạn bè'
          items={[{ icon: 'account-group', label: 'Danh sách bạn bè' }]}
        />

        <MenuSection
          title='Nhóm'
          items={[
            { icon: 'account-multiple-plus', label: 'Tham gia nhóm' },
            { icon: 'account-remove', label: 'Xoá tài khoản', danger: true }
          ]}
        />

        <MenuSection
          items={[{ icon: 'logout', label: 'Đăng xuất', danger: true }]}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: theme.color.primary,
    height: 120,
    padding: 20,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profile: { alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff'
  },
  cameraIcon: {
    position: 'absolute',
    top: 60,
    right: '40%',
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 5
  },
  email: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  levelBadge: {
    marginTop: 6,
    backgroundColor: '#36d399',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  levelText: { color: '#fff', fontWeight: 'bold' },
  menuContainer: { marginTop: 10 }
})

export default Profile
