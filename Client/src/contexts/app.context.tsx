import { createContext, useState } from 'react'
import { getAccessTokenFromLocalStorage, getProfileFromLS } from '../utils/authLS'
import { User } from '../types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile: profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
