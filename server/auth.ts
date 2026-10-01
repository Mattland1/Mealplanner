import { createHmac, createHash, timingSafeEqual } from 'node:crypto'
import type { FastifyReply, FastifyRequest } from 'fastify'

const COOKIE_NAME = 'savor_session'
const SESSION_DAYS = 30

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(createHash('sha256').update(left).digest('hex'))
  const b = Buffer.from(createHash('sha256').update(right).digest('hex'))
  return timingSafeEqual(a, b)
}

function signature(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export interface HouseholdAuth {
  enabled: boolean
  authenticated(request: FastifyRequest): boolean
  login(password: string, reply: FastifyReply): boolean
  logout(reply: FastifyReply): void
}

export function createHouseholdAuth(): HouseholdAuth {
  const password = process.env.SAVOR_PASSWORD?.trim() ?? ''
  const secret = process.env.SAVOR_SESSION_SECRET?.trim() ?? ''
  const secure = process.env.SAVOR_COOKIE_SECURE === 'true'

  if (password && secret.length < 32) {
    throw new Error('SAVOR_SESSION_SECRET must contain at least 32 characters when authentication is enabled.')
  }

  function authenticated(request: FastifyRequest): boolean {
    if (!password) return true
    const token = request.cookies[COOKIE_NAME]
    if (!token) return false
    const separator = token.lastIndexOf('.')
    if (separator < 1) return false
    const payload = token.slice(0, separator)
    const suppliedSignature = token.slice(separator + 1)
    if (!safeEqual(suppliedSignature, signature(payload, secret))) return false
    const expiresAt = Number(Buffer.from(payload, 'base64url').toString('utf8'))
    return Number.isFinite(expiresAt) && expiresAt > Date.now()
  }

  function login(suppliedPassword: string, reply: FastifyReply): boolean {
    if (!password || !safeEqual(suppliedPassword, password)) return false
    const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
    const payload = Buffer.from(String(expiresAt)).toString('base64url')
    reply.setCookie(COOKIE_NAME, `${payload}.${signature(payload, secret)}`, {
      path: '/', httpOnly: true, sameSite: 'strict', secure,
      maxAge: SESSION_DAYS * 24 * 60 * 60
    })
    return true
  }

  function logout(reply: FastifyReply) {
    reply.clearCookie(COOKIE_NAME, { path: '/', httpOnly: true, sameSite: 'strict', secure })
  }

  return { enabled: Boolean(password), authenticated, login, logout }
}
