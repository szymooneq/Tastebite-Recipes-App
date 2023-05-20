import { z } from 'zod'
import { authErrorMessages, defaultErrorMessages } from './messages'

const { invalid_email } = authErrorMessages

const email = z.string(defaultErrorMessages).email(invalid_email)

const password = z.string(defaultErrorMessages)

const confirmPassword = z.string(defaultErrorMessages)

export { email, password, confirmPassword }
