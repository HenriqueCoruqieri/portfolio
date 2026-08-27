import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

const match = process.env.CLOUDINARY_URL?.match(
  /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/,
)

if (match) {
  cloudinary.config({
    api_key: match[1],
    api_secret: match[2],
    cloud_name: match[3],
    secure: true,
  })
}

export { cloudinary }
