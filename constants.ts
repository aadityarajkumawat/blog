export const __is_prod__ = process.env.NODE_ENV === 'production'
export const BASE_URL = __is_prod__
  ? 'https://edysblog.vercel.app/api'
  : 'http://localhost:3000/api'
