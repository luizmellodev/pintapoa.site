// services/userService.ts
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

const formatUser = (user: User): AuthUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "Admin",
  }
}

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
    // Obter o token e salvar no cookie
    const token = await userCredential.user.getIdToken()
    document.cookie = `firebase-token=${token}; path=/`
    
    return formatUser(userCredential.user)
  } catch (error: any) {
    console.error("Erro ao fazer login:", error)
    throw new Error(error.message || "Falha na autenticação")
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
    // Remover o cookie ao fazer logout
    document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    throw error
  }
}

export const onAuthStateChange = (callback: (user: AuthUser | null) => void): (() => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Atualizar o token no cookie quando o estado de autenticação mudar
      const token = await user.getIdToken()
      document.cookie = `firebase-token=${token}; path=/`
      callback(formatUser(user))
    } else {
      document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      callback(null)
    }
  })
}