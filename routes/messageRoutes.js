const express = require("express")
const sendMessage = require("../controllers/sendMessage")
const { getSocket } = require("../config/socket")
const formatPhone = require("../utils/formatPhone")

const router = express.Router()

router.post("/send", sendMessage)

// GET route
router.get("/send", async (req, res) => {

 try {

  const { phone, message } = req.query

  if (!phone || !message) {
   return res.status(400).json({
    success:false,
    error:"phone and message query required"
   })
  }

  const sock = getSocket()

  const jid = formatPhone(phone)

  await sock.sendMessage(jid,{
   text: message
  })

  res.json({
   success:true,
   phone,
   message
  })

 } catch(err){

  res.status(500).json({
   success:false,
   error:err.message
  })

 }

})

module.exports = router