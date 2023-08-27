import chalk from 'chalk'
import mongoose from 'mongoose'

export const DB_Connected = async () => {
  return mongoose
    .connect(process.env.DBURI)
    .then((res) => {
      console.log(chalk.bgGreen('db connected successfully'))
    })
    .catch((err) => {
      console.log(chalk.bgCyanBright(' fail to connect db'))
    })
}

