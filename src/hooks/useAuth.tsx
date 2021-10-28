import { useContext } from 'react'

import { AuthContext, AuthProps } from '../context/AuthContext'

type useAuthProps = AuthProps & {
  onAuthSave: (data: AuthProps) => void
}

export function useAuth(): useAuthProps {
  const auth = useContext(AuthContext)

  return auth
}
