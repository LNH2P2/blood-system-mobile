import React, { createContext, ReactNode, useContext, useState } from 'react'

interface DonationPlace {
  id: string
  title: string
  address: string
  time: string
  date: string
}

interface BookingContextType {
  selectedPlace: DonationPlace | null
  selectedDate: Date | null
  setSelectedPlace: (place: DonationPlace | null) => void
  setSelectedDate: (date: Date | null) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlace, setSelectedPlace] = useState<DonationPlace | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <BookingContext.Provider
      value={{
        selectedPlace,
        selectedDate,
        setSelectedPlace,
        setSelectedDate
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
