function formatPhone(phone) {

 phone = phone.replace(/\D/g, "")

 if (!phone.endsWith("@s.whatsapp.net")) {
  phone = phone + "@s.whatsapp.net"
 }

 return phone
}

module.exports = formatPhone