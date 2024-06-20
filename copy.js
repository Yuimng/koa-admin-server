const fs = require('fs')

fs.mkdir('./dist/src/config/keys', { recursive: true }, (err) => {console.log(err)})

const privatePath = './src/config/keys/private-key.pem'
const publicPath = './src/config/keys/public-key.pem'

const distPrivatePath = './dist/src/config/keys/private-key.pem'
const distPublicPath = './dist/src/config/keys/public-key.pem'

fs.writeFileSync(distPrivatePath, fs.readFileSync(privatePath))
fs.writeFileSync(distPublicPath, fs.readFileSync(publicPath))
