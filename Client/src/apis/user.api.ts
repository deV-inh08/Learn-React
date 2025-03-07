import { User } from '../types/user.type'
import { SuccessResponse } from '../types/util.type'
import http from '../utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
  confirm_password?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('user', body)
  },

  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      // require upload-avatar must header
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
