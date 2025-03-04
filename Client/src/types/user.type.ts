type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  createdAt?: string
  updatedAt?: string
  phone?: string
  address?: string
  date_of_birth?: string // ISO 8601
  avatar?: string
}
