import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'


//APP CONFIG

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

//MIDDLEWARES

app.use(express.json())
app.use(cors())

//API ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})