import { Sequelize } from 'sequelize'

import { MYSQL_CONFIG } from '../config'

const sequelize = new Sequelize(
  MYSQL_CONFIG.database,
  MYSQL_CONFIG.username,
  MYSQL_CONFIG.password,
  {
    host: MYSQL_CONFIG.host,
    port: MYSQL_CONFIG.port,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      // 返回正确的时间戳字符串。
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+08:00',
  }
)

/** 连接数据库 */
export const connectMysql = async () => {
  const msg = (flag: boolean) =>
    `连接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服务器的mysql数据库${
      MYSQL_CONFIG.database
    }${flag ? '成功' : '失败'}!`

  try {
    console.log(
      `开始连接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服务器的mysql数据库${MYSQL_CONFIG.database}...`
    )
    await sequelize.authenticate()
    console.log(msg(true))
  } catch (error) {
    console.log(msg(false))
    console.error(error)
  }
}

export default sequelize
