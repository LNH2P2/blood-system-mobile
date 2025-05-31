import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface FormInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  isRequired?: boolean
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
  multiline?: boolean
  numberOfLines?: number
}

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  isRequired = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1
}: FormInputProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {isRequired && '*'}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          error && styles.inputError
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  }
})

export default FormInput
