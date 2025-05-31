import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => (
  <View style={styles.header}>
    <Ionicons name='heart' size={24} color='white' />
    <Text style={styles.headerTitle}>Đăng ký hiến máu</Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.color.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12
  }
})

export default Header
