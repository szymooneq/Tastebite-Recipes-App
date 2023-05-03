export interface IUser {
	uid: string
	email: string | null
	emailVerified: boolean
	isAnonymous: boolean
	stsTokenManager?: {
		refreshToken: string
		accessToken: string
		expirationTime: number
	}
	createdAt?: string
	lastLoginAt?: string
	apiKey?: string
}
