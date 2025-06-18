import ConfirmationModal from '@/lib/components/ui/ConfirmationModal'
import DropdownMenu, {
  DropdownMenuItem
} from '@/lib/components/ui/DropdownMenu'
import EditRequestModal from '@/lib/components/ui/EditRequestModal'
import {
  useDeleteDonationReqMutation,
  useUpdateDonationReqMutation
} from '@/lib/hooks/api/useDonationRequest'
import { theme } from '@/lib/theme'
import { DonationRequestItem } from '@/lib/types'
import { formatDateVN } from '@/lib/utils/dateFormat'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface ListRequestProps {
  donationRequests?: DonationRequestItem[]
}

const ListRequest = ({ donationRequests }: ListRequestProps) => {
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    item: null as DonationRequestItem | null
  })
  const [editModal, setEditModal] = useState({
    visible: false,
    item: null as DonationRequestItem | null
  })
  const { mutateAsync } = useDeleteDonationReqMutation()
  const { mutateAsync: updateMutateAsync } = useUpdateDonationReqMutation()

  const handleDeletePress = (item: DonationRequestItem) => {
    setDeleteModal({
      visible: true,
      item: item
    })
  }

  const handleDeleteConfirm = async () => {
    if (deleteModal.item) {
      await mutateAsync(deleteModal.item._id)
    }
    setDeleteModal({ visible: false, item: null })
  }
  const handleDeleteCancel = () => {
    setDeleteModal({ visible: false, item: null })
  }

  const handleEditPress = (item: DonationRequestItem) => {
    setEditModal({
      visible: true,
      item: item
    })
  }

  const handleEditSave = (updatedRequest: DonationRequestItem) => {
    console.log('Updated request:', updatedRequest)
    updateMutateAsync({
      id: updatedRequest._id,
      data: {
        scheduleDate: updatedRequest.scheduleDate,
        hospitalId: updatedRequest.hospitalId._id
      }
    })

    setEditModal({ visible: false, item: null })
  }

  const handleEditCancel = () => {
    setEditModal({ visible: false, item: null })
  }
  const getMenuItems = (item: DonationRequestItem): DropdownMenuItem[] => [
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      icon: 'edit-2',
      onPress: () => {
        console.log('Edit pressed for:', item._id)
        handleEditPress(item)
      }
    },
    {
      id: 'delete',
      label: 'Xóa',
      icon: 'trash-2',
      destructive: true,
      onPress: () => {
        console.log('Delete pressed for:', item._id)
        handleDeletePress(item)
      }
    }
  ]

  const renderItem = ({ item }: { item: DonationRequestItem }) => (
    <View style={styles.requestItem}>
      <View style={styles.dateIndicator} />
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.calendarIcon}>
            <Text style={styles.calendarText}>📅</Text>
          </View>
        </View>{' '}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
            {item.hospitalId.name}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{formatDateVN(item.scheduleDate)}</Text>
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
        data={donationRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <ConfirmationModal
        isVisible={deleteModal.visible}
        title='Xác nhận xóa'
        message={`Bạn có chắc chắn muốn xóa yêu cầu: "${deleteModal.item?.hospitalId.name}"?`}
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
    fontWeight: '500',
    flex: 1,
    letterSpacing: 0.2
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
