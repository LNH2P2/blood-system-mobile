import { theme } from '@/lib/theme'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface DonationRequest {
  id: string
  title: string
  date: string
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

const ListRequest = () => {
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
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
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
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22,
    marginBottom: 8
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400'
  }
})

export default ListRequest
