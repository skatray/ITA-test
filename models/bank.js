const {Schema, model} = require('mongoose')

const schema = new Schema({
    bank_name:{
    type: String,
    required:true
},
    interest_rate:{
        type: String,
        required:true
},
    maximum_loan:{
        type: String,
        required:true
},
    m_d_payment:{
        type: String,
        required:true
},
    loan_term:{
        type: String,
        required:true
},
})

module .exports = model('Bank', schema)
