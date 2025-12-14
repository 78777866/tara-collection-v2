import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const initRef = useRef(false)

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            try {
                if (initRef.current) return

                console.log('[AuthContext] Getting session...')

                // Create a timeout promise to prevent infinite loading
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Session fetch timeout')), 4000)
                )

                const { data: { session } } = await Promise.race([
                    supabase.auth.getSession(),
                    timeoutPromise
                ])

                if (initRef.current) return

                console.log('[AuthContext] Session found:', session?.user?.id)
                setUser(session?.user ?? null)

                if (session?.user) {
                    await fetchProfile(session.user.id)
                }
            } catch (error) {
                if (initRef.current) return

                console.error('Error getting session:', error)
                if (error.message === 'Session fetch timeout') {
                    console.warn('[AuthContext] Session fetch timed out')
                }
                setUser(null)
                setProfile(null)
            } finally {
                if (!initRef.current) {
                    setLoading(false)
                    console.log('[AuthContext] Loading set to false (from getSession)')
                }
            }
        }

        getSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('[AuthContext] Auth change:', event)
                initRef.current = true

                setUser(session?.user ?? null)

                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    console.log('[AuthContext] No session, clearing profile')
                    setProfile(null)
                    setIsAdmin(false)
                }

                setLoading(false)
                console.log('[AuthContext] Loading set to false (from listener)')
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId) => {
        try {
            console.log('[AuthContext] Fetching profile for:', userId)

            // Timeout for profile fetch
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Profile fetch timeout')), 4000)
            )

            const { data, error } = await Promise.race([
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single(),
                timeoutPromise
            ])

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile(data)
            setIsAdmin(data?.role === 'admin')
            console.log('[AuthContext] Profile fetched:', data?.role)
        } catch (error) {
            console.error('Error fetching profile:', error)
            if (error.message === 'Profile fetch timeout') {
                console.warn('[AuthContext] Profile fetch timed out')
            }
        }
    }

    const signUp = async (email, password, metadata = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        })
        return { data, error }
    }

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
            setProfile(null)
            setIsAdmin(false)
        }
        return { error }
    }

    const resetPassword = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        return { data, error }
    }

    const updatePassword = async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        })
        return { data, error }
    }

    const value = {
        user,
        profile,
        loading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        refreshProfile: () => user && fetchProfile(user.id),
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
