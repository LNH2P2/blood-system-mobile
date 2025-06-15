import { theme } from '@/lib/theme'
import { DonationRequest as DonationRequestType } from '@/lib/types'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

interface DonationRequest {
  id: string
  title: string
  date: string
}

interface ListRequestProps {
  donationRequests?: DonationRequestType[]
}

const mockData: DonationRequest[] = [
  {
    id: '1',
    title: 'Công ty TNHH MTV Trắc Địa Bản đồ - Cục Bản đồ - Bộ Tổng tham mưu',
    date: '10/06/2025'
  },
  {
    id: '2',
    title: 'Trường ĐH Ngoại thương',
    date: '03/06/2025'
  },
  {
    id: '4',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '5',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '6',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '7',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '8',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '9',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  },
  {
    id: '10',
    title: 'Trung tâm Máu Quốc gia - Gan tiểu cầu',
    date: '02/06/2025'
  }
]

const ListRequest = ({ donationRequests }: ListRequestProps) => {
  console.log('Donation Requests:', donationRequests)

  const renderItem = ({ item }: { item: DonationRequest }) => (
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
            {item.title}
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.date}>{item.date}</Text>{' '}
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => console.log('Edit pressed for:', item.id)}
            >
              <Feather name='more-vertical' size={18} color='#666' />
            </TouchableOpacity>
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
