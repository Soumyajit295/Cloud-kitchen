const crypto = require('crypto')

const order_id = "order_QHK5sdoYoQaHuR"
const payment_id = "pay_1234567890abcdef"
const secret = "T67imtcio32eihRIKD63NH2K"

const genarated_signature = crypto.createHmac('sha256',"T67imtcio32eihRIKD63NH2K").update(order_id+'|'+payment_id).digest('hex')

console.log(genarated_signature)