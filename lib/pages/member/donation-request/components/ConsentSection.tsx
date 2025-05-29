import CheckBox from 'expo-checkbox'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { theme } from '@/lib/theme'
import Section from './Section'

interface ConsentSectionProps {
  consent: boolean
  error?: string
  onChange: (value: boolean) => void
}

const ConsentSection = ({ consent, error, onChange }: ConsentSectionProps) => {
  return (
    <Section title='Cam kết'>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={consent}
          onValueChange={onChange}
          style={styles.checkbox}
          color={consent ? theme.color.primary : undefined}
        />
        <View style={styles.checkboxTextContainer}>
          <Text style={styles.checkboxText}>
            Tôi xác nhận rằng thông tin tôi cung cấp là chính xác và đồng ý hiến
            máu theo quy định *
          </Text>
          <Text style={styles.checkboxSubtext}>
            Tôi đã đọc và hiểu các điều kiện hiến máu và đồng ý với các điều
            khoản.
          </Text>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </Section>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2
  },
  checkboxTextContainer: {
    flex: 1
  },
  checkboxText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  },
  checkboxSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 16
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  }
})

export default ConsentSection
