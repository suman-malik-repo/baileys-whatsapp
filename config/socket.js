const {
 default: makeWASocket,
 useMultiFileAuthState,
 DisconnectReason,
 fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const qrcode = require("qrcode-terminal")
const P = require("pino")

let sock


async function startWhatsApp() {

 const { state, saveCreds } = await useMultiFileAuthState("./auth")

 const { version } = await fetchLatestBaileysVersion()

 sock = makeWASocket({
  version,
  auth: state,
  logger: P({ level: "silent" }),
  browser: ["Chrome","Desktop","1.0"]
 })

 sock.ev.on("creds.update", saveCreds)

 sock.ev.on("connection.update", async (update) => {

  const { connection, lastDisconnect, qr } = update

  if (qr) {
   console.log("Scan QR Code")
   qrcode.generate(qr, { small: true })
  }

  if (connection === "open") {
   console.log("WhatsApp Connected Successfully")
  }

  if (connection === "close") {

   const reason =
    lastDisconnect?.error?.output?.statusCode

   console.log("Connection closed reason:", reason)

   if (reason !== DisconnectReason.loggedOut) {

    console.log("Reconnecting...")
    startWhatsApp()

   } else {

    console.log("Logged out. Delete auth folder and scan again.")

   }

  }

 })

}

function getSocket() {
 return sock
}

module.exports = { startWhatsApp, getSocket }