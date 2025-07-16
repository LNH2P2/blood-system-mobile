import { useBooking } from '@/lib/contexts/BookingContext'
import { useGetListHospitalQuery } from '@/lib/hooks/api/useDonationRequest'
import { theme } from '@/lib/theme'
import { Hospital } from '@/lib/types'
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

const DonationPlace = () => {
  const router = useRouter()
  const { setSelectedPlace } = useBooking()
  const { data: hospitals } = useGetListHospitalQuery()
  console.log('Hospitals:', hospitals?.data)

  const handleSelectPlace = (hospital: Hospital) => {
    setSelectedPlace({
      id: hospital._id,
      title: hospital.name,
      address: `${hospital.address}, ${hospital.district}, ${hospital.province}`,
      time: hospital.operatingHours,
      date: '17/06/2025' // Current date
    })
    router.back()
  }

  const renderItem = ({ item }: { item: Hospital }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => handleSelectPlace(item)}
    >
      <View style={styles.iconContainer}>
        <View style={styles.bloodIcon}>
          <Ionicons name='medical' size={20} color='white' />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.address} numberOfLines={2}>
          {item.address}, {item.district}, {item.province}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons name='time-outline' size={14} color='#666' />
          <Text style={styles.operatingHours}>{item.operatingHours}</Text>
        </View>

        {item.contactInfo.phone && (
          <View style={styles.infoRow}>
            <Ionicons name='call-outline' size={14} color='#666' />
            <Text style={styles.phone}>{item.contactInfo.phone}</Text>
          </View>
        )}

        {item.services && item.services.length > 0 && (
          <View style={styles.servicesContainer}>
            {item.services.slice(0, 2).map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
            {item.services.length > 2 && (
              <Text style={styles.moreServices}>
                +{item.services.length - 2} khác
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={hospitals?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
    marginBottom: 6
  },
  address: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  operatingHours: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  },
  phone: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 6,
    fontWeight: '500'
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 6
  },
  serviceTag: {
    backgroundColor: '#e8f2ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 3
  },
  serviceText: {
    fontSize: 10,
    color: '#3b82f6',
    fontWeight: '600'
  },
  moreServices: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
    fontWeight: '500'
  },
  dateTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400'
  }
})

export default DonationPlace
