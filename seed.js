import "dotenv/config"
import { connectDB } from "./utils/db.js"
import User from "./models/users.model.js"
import { getSalt, hash } from "./utils/hash.js"

await connectDB()

const username = "root"
const existing = await User.findOne({ username })

if (existing) {
  console.log("Root user already exists, skipping.")
} else {
  const salt = getSalt()
  const hashed = hash("root", salt)
  const user = new User({ name: "Root Admin", username: "root", password: hashed })
  await user.save()
  console.log("Root user created successfully:", user)
}

process.exit(0)
