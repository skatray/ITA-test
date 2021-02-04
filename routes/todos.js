const {Router} = require('express')
const Bank = require('../models/bank')
const router = Router()

router.get('/',async (req, res) => {
    const banks = await Bank.find({}).lean()
    res.render('index',{
        title: "Home",
        isIndex:true,
        banks
    })
})
function calc(money,firts_persent,year_persent,month){

    let  p=Number(money)
    let  r=Number(firts_persent)
    let  n=Number (month)
     m=(p*(r/12)*(1+r/12)^n)/((1+r/12)^n-1)
    return m.toFixed(2)
}

router.get('/calculator',async (req, res) => {
    const banks = await Bank.find({}).lean()
    res.render('calculator',{
        title: "Mortgage  Calculator",
        isCalculator:true,
        banks
    })
})

router.get('/create',(req, res) => {
    res.render('create',{
        title: "Add Bank",
        isCreate:true
    })
})

router.get('/bank/:_id',async (req,res)=>{
try {
    const banks1 = await Bank.findById(req.params._id)
    await banks1.save();

    res.render('bank', {
        title: "Bank " + banks1.bank_name,
        _id: banks1._id,
        bank_name: banks1.bank_name,
        interest_rate: banks1.interest_rate,
        maximum_loan: banks1.maximum_loan,
        m_d_payment: banks1.m_d_payment,
        loan_term: banks1.loan_term,
        banks1,
        edit: false,
      //  calc: calc(1000,banks1.m_d_payment,banks1.interest_rate,banks1.loan_term).toString()
    })
}
catch(e)
{
    console.log(e)
    res.redirect('/')
}
})

router.get('/bank/:_id/edit',async (req,res)=>{

    const banks1 = await Bank.findById(req.params._id)
    await banks1.save();

    res.render('bank', {
        title: "Bank "+ banks1.bank_name,

        bank_name: banks1.bank_name,
        interest_rate: banks1.interest_rate,
        maximum_loan: banks1.maximum_loan,
        m_d_payment: banks1.m_d_payment,
        loan_term: banks1.loan_term,
        banks1,
        edit:true
    })
})

router.post('/bank/:_id/save',async (req, res) =>{
    let value = req.body.btn;
    if(value == 'check') {
        let banks = await Bank.findById(req.params._id).updateOne({
            bank_name: req.body.bank_name,
            interest_rate: req.body.interest_rate,
            maximum_loan: req.body.maximum_loan,
            m_d_payment: req.body.m_d_payment,
            loan_term: req.body.loan_term
        })

        res.redirect('/')
    }
    if(value=='cancel'){
        res.redirect('/bank/'+req.params._id)
        console.log('cancel')
    }
})

router.post('/create',async (req, res) =>{

    const bank = new Bank({
    bank_name: req.body.bank_name,
    interest_rate: req.body.interest_rate,
    maximum_loan: req.body.maximum_loan,
    m_d_payment: req.body.m_d_payment,
    loan_term: req.body.loan_term
})
   await bank.save()
    res.redirect('/')
})

router.post('/delete', async (req, res)=>
{

        Bank.findOneAndRemove({_id: req.body.id}, function(err){
            console.log(req.body.id+ "Deleted")
        })

    res.redirect('/')
})

module.exports = router
