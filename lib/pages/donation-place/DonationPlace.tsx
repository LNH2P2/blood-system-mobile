import { useBooking } from '@/lib/contexts/BookingContext'
import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

interface DonationPlace {
  id: string
  title: string
  address: string
  time: string
  registerTime: string
  date: string
}

const mockData: DonationPlace[] = [
  {
    id: '1',
    title: 'Tòa nhà H14 - H15 đường Kinh Bắc Golden Gate',
    address: 'đường Trần Phú, phường Đình Bảng, TP. Từ Sơn, Bắc Ninh',
    time: '07:30 - 11:30',
    registerTime: '',
    date: '17/06/2025'
  },
  {
    id: '2',
    title: 'Tầng 3, Phòng khám Đa khoa Số 18 Quán sứ, Hoàn Kiếm, Hà Nội',
    address: '(Đăng ký HM: Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30)',
    time: '08:00 - 16:30',
    registerTime: 'Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30',
    date: '17/06/2025'
  },
  {
    id: '3',
    title:
      'Trạm Y tế phường Nhân Chính, số 132 Phố Quan Nhân, Thanh Xuân, Hà Nội',
    address: '(Đăng ký HM: Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30)',
    time: '08:00 - 16:30',
    registerTime: 'Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30',
    date: '17/06/2025'
  },
  {
    id: '4',
    title: 'Phòng khám Đa khoa số 2, số 10 ngõ 122 đường Láng, Đống Đa, Hà Nội',
    address: '(Đăng ký HM: Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30)',
    time: '08:00 - 16:30',
    registerTime: 'Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30',
    date: '17/06/2025'
  },
  {
    id: '5',
    title:
      'Hiến tiếu cầu (vui lòng đăng ký trước qua link tieucau.hienmau.vn hoặc gọi Sđt 0243 78218698)',
    address:
      'Viện Huyết học - Truyền máu TW, số 5 phố Phạm Văn Bạch, Cầu Giấy, Hà Nội',
    time: '07:00 - 16:30',
    registerTime: '',
    date: '17/06/2025'
  },
  {
    id: '6',
    title:
      'Bệnh viện Đa khoa Nông nghiệp, Km13 +500, Quốc lộ 1A, Ngọc Hồi, Thanh Trì, HN',
    address: '(Đăng ký HM: Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30)',
    time: '08:00 - 16:30',
    registerTime: 'Sáng từ 8h00 - 11h45; Chiều từ 13h30 - 16h30',
    date: '17/06/2025'
  },
  {
    id: '7',
    title:
      'Hiến máu toàn phần, Viện Huyết học - Truyền máu TW, số 5 phố Phạm Văn Bạch, Cầu Giấy, Hà Nội',
    address: '',
    time: '07:00 - 18:00',
    registerTime: '',
    date: '17/06/2025'
  },
  {
    id: '8',
    title:
      'Trung tâm Hội nghị Văn hóa tỉnh Lai Châu, TP. Lai Châu, tỉnh Lai Châu',
    address: '',
    time: '08:30 - 11:30',
    registerTime: '',
    date: '17/06/2025'
  }
]

const DonationPlace = () => {
  const router = useRouter()
  const { setSelectedPlace } = useBooking()

  const handleSelectPlace = (place: DonationPlace) => {
    setSelectedPlace({
      id: place.id,
      title: place.title,
      address: place.address,
      time: place.time,
      date: place.date
    })
    router.back()
  }

  const renderItem = ({ item }: { item: DonationPlace }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => handleSelectPlace(item)}
    >
      <View style={styles.iconContainer}>
        <View style={styles.bloodIcon}>
          <Ionicons name='water' size={20} color='white' />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        {item.address && (
          <Text style={styles.address} numberOfLines={2}>
            {item.address}
          </Text>
        )}

        <Text style={styles.dateTime}>
          {item.date} {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.primary,
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16
  },
  listContainer: {
    padding: 16
  },
  placeItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'flex-start',
    paddingTop: 4
  },
  bloodIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.color.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
    marginBottom: 4
  },
  address: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4
  },
  dateTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400'
  }
})

export default DonationPlace
