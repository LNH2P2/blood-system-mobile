export type DonationRequestResType = {
  message: string
  statusCode: number
  data: {
    id: string
    title: string
    date: string
  }
}

export type CreateDonationRequestBody = {
  userId: string
}
