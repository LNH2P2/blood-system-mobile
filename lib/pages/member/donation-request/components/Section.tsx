import { theme } from '@/lib/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface SectionProps {
  title: string
  children: React.ReactNode
  rightElement?: React.ReactNode
}

const Section = ({ title, children, rightElement }: SectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {rightElement}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color.primary
  }
})

export default Section
