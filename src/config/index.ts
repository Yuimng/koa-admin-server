import fs from 'fs'
import path from 'path'

export const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private-key.pem')
)

export const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, './keys/public-key.pem')
)

export const APP_HOST = process.env.APP_HOST as string
export const APP_PORT = +(process.env.APP_PORT as string)

export const MYSQL_CONFIG = {
  database: process.env.MYSQL_DATABASE as string,
  username: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  host: process.env.MYSQL_HOST as string,
  port: +(process.env.MYSQL_PORT as string),
} // mysql配置

export const ADMIN_CONFIG = {
  username: process.env.ADMIN_USERNAME as string,
  password: process.env.ADMIN_PASSWORD as string,
  name: process.env.ADMIN_NAME as string,
}
