const { getSocket } = require("../config/socket")
const formatPhone = require("../utils/formatPhone")

async function sendMessage(req, res) {

 try {

  const { phone, message } = req.body

  if (!phone || !message) {
   return res.status(400).json({
    success: false,
    error: "phone and message required"
   })
  }

  const sock = getSocket()

  const jid = formatPhone(phone)

  await sock.sendMessage(jid, {
   text: message
  })

  res.json({
   success: true,
   phone
  })

 } catch (error) {

  res.status(500).json({
   success: false,
   error: error.message
  })

 }

}

module.exports = sendMessage