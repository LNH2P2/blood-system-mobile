import ConfirmationModal from '@/lib/components/ui/ConfirmationModal'
import DropdownMenu, {
  DropdownMenuItem
} from '@/lib/components/ui/DropdownMenu'
import EditRequestModal from '@/lib/components/ui/EditRequestModal'
import { theme } from '@/lib/theme'
import { DonationRequest as DonationRequestType } from '@/lib/types'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface DonationRequest {
  id: string
  title: string
  date: string
  description?: string
  location?: string
  time?: string
}

interface ListRequestProps {
  donationRequests?: DonationRequestType[]
}

const mockData: DonationRequest[] = [
  {
    id: '1',
    title: 'Công ty TNHH MTV Trắc Địa Bản đồ - Cục Bản đồ - Bộ Tổng tham mưu',
    date: '10/06/2025',
    description:
      'Tổ chức hiến máu tình nguyện cho cán bộ nhân viên và người dân khu vực',
    location: 'Tầng 1, Tòa nhà Trắc địa, 156 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    time: '08:00 - 16:00'
  },
  {
    id: '2',
    title: 'Trường ĐH Ngoại thương',
    date: '03/06/2025',
    description: 'Chương trình hiến máu sinh viên "Giọt hồng yêu thương"',
    location:
      'Hội trường A, Trường ĐH Ngoại thương, 91 Chùa Láng, Đống Đa, Hà Nội',
    time: '09:00 - 15:00'
  },
  {
    id: '4',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt cho bệnh nhân cần truyền tiểu cầu',
    location: 'Trung tâm Máu Quốc gia, 26 Trần Thủ Độ, Hoàng Mai, Hà Nội',
    time: '07:30 - 11:30'
  },
  {
    id: '5',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  },
  {
    id: '6',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  },
  {
    id: '7',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  },
  {
    id: '8',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  },
  {
    id: '9',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  },
  {
    id: '10',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025',
    description: 'Thu nhận máu chuyên biệt',
    location: 'Trung tâm Máu Quốc gia',
    time: '07:30 - 11:30'
  }
]

const ListRequest = ({ donationRequests }: ListRequestProps) => {
  console.log('Donation Requests:', donationRequests)
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    item: null as DonationRequest | null
  })

  const [editModal, setEditModal] = useState({
    visible: false,
    item: null as DonationRequest | null
  })

  const handleDeletePress = (item: DonationRequest) => {
    setDeleteModal({
      visible: true,
      item: item
    })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.item) {
      console.log('Deleted:', deleteModal.item.id)
      // Add your delete logic here
    }
    setDeleteModal({ visible: false, item: null })
  }
  const handleDeleteCancel = () => {
    setDeleteModal({ visible: false, item: null })
  }

  const handleEditPress = (item: DonationRequest) => {
    setEditModal({
      visible: true,
      item: item
    })
  }

  const handleEditSave = (updatedRequest: DonationRequest) => {
    console.log('Updated request:', updatedRequest)
    // Add your save logic here
    setEditModal({ visible: false, item: null })
  }

  const handleEditCancel = () => {
    setEditModal({ visible: false, item: null })
  }
  const getMenuItems = (item: DonationRequest): DropdownMenuItem[] => [
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      icon: 'edit-2',
      onPress: () => {
        console.log('Edit pressed for:', item.id)
        handleEditPress(item)
      }
    },
    {
      id: 'delete',
      label: 'Xóa',
      icon: 'trash-2',
      destructive: true,
      onPress: () => {
        console.log('Delete pressed for:', item.id)
        handleDeletePress(item)
      }
    }
  ]

  const renderItem = ({ item }: { item: DonationRequest }) => (
    <View style={styles.requestItem}>
      <View style={styles.dateIndicator} />
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.calendarIcon}>
            <Text style={styles.calendarText}>📅</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
            {item.title}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{item.date}</Text>
            <DropdownMenu
              items={getMenuItems(item)}
              buttonStyle={styles.moreButton}
            />
          </View>
        </View>
      </View>
    </View>
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
      <ConfirmationModal
        isVisible={deleteModal.visible}
        title='Xác nhận xóa'
        message={`Bạn có chắc chắn muốn xóa yêu cầu: "${deleteModal.item?.title}"?`}
        confirmText='Xóa'
        cancelText='Hủy'
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        destructive={true}
      />
      <EditRequestModal
        isVisible={editModal.visible}
        request={editModal.item}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  listContainer: {
    padding: 16
  },
  requestItem: {
    flexDirection: 'row',
    marginBottom: 12
  },
  dateIndicator: {
    width: 4,
    backgroundColor: theme.color.primary,
    borderRadius: 2,
    marginRight: 12
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    height: 110, // Fixed height instead of minHeight
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
  calendarIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  calendarText: {
    fontSize: 18
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%' // Ensure full height usage
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
    flex: 1,
    maxHeight: 40
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 32 // Fixed height for bottom row
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
    flex: 1
  },
  moreButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef'
  }
})

export default ListRequest
