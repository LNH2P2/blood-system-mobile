import { Feather } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: keyof typeof Feather.glyphMap
  onPress: () => void
  destructive?: boolean
}

interface DropdownMenuProps {
  items: DropdownMenuItem[]
  triggerIcon?: keyof typeof Feather.glyphMap
  triggerSize?: number
  triggerColor?: string
  buttonStyle?: object
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  triggerIcon = 'more-vertical',
  triggerSize = 18,
  triggerColor = '#666',
  buttonStyle
}) => {
  const [visible, setVisible] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0
  })
  const buttonRef = useRef<View>(null)

  const handleTriggerPress = () => {
    if (buttonRef.current) {
      buttonRef.current.measureInWindow(
        (pageX: number, pageY: number, width: number, height: number) => {
          const screenWidth = Dimensions.get('window').width
          const screenHeight = Dimensions.get('window').height
          const dropdownWidth = 150
          const dropdownHeight = items.length * 44 + 16 // Approximate height

          // Calculate horizontal position
          let leftPosition = pageX + width - dropdownWidth

          // Ensure dropdown doesn't go off the left edge
          if (leftPosition < 16) {
            leftPosition = 16
          }

          // Ensure dropdown doesn't go off the right edge
          if (leftPosition + dropdownWidth > screenWidth - 16) {
            leftPosition = screenWidth - dropdownWidth - 16
          }

          // Calculate vertical position
          let topPosition = pageY + height + 8

          // If dropdown would go below screen, position it above the button
          if (topPosition + dropdownHeight > screenHeight - 20) {
            topPosition = pageY - dropdownHeight - 8
          }

          // Ensure dropdown doesn't go above screen
          if (topPosition < 20) {
            topPosition = 20
          }

          setDropdownPosition({
            top: topPosition,
            left: leftPosition
          })
          setVisible(true)
        }
      )
    }
  }

  const handleItemPress = (item: DropdownMenuItem) => {
    setVisible(false)
    item.onPress()
  }

  const closeMenu = () => {
    setVisible(false)
  }
  return (
    <>
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.triggerButton, buttonStyle]}
        onPress={handleTriggerPress}
      >
        <Feather name={triggerIcon} size={triggerSize} color={triggerColor} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animationType='fade'
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.dropdownContainer,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left
                }
              ]}
            >
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index === 0 && styles.firstItem,
                    index === items.length - 1 && styles.lastItem
                  ]}
                  onPress={() => handleItemPress(item)}
                >
                  <View style={styles.menuItemContent}>
                    {item.icon && (
                      <Feather
                        name={item.icon}
                        size={16}
                        color={item.destructive ? '#ef4444' : '#374151'}
                        style={styles.menuItemIcon}
                      />
                    )}
                    <Text
                      style={[
                        styles.menuItemText,
                        item.destructive && styles.destructiveText
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  triggerButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent' // Remove blur background
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    zIndex: 1000
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  lastItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemIcon: {
    marginRight: 12
  },
  menuItemText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500'
  },
  destructiveText: {
    color: '#ef4444'
  }
})

export default DropdownMenu
