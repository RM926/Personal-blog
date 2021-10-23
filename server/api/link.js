const express = require('express')
const Link = require('../db/db.js').Link
const router = express.Router()
const confirmToken = require('../middlewares/confirmToken')

router.get('/api/links',(req,res) => {
  Link.find().sort({date:-1}).exec().then((allLink) => {
      res.status(200).send(allLink)
  })
  
})
router.patch('/api/link/:id',confirmToken,(req,res)=>{
  const id = req.params.id
  const link = {
    name:req.body.name,
    weblink:req.body.weblink,
    mottom:req.body.mottom,
    date:new Date()
  }
  Link.updateOne({_id:id},link,(err,data) => {
    console.log(link)
    if(err){
      console.log(err)
    }else{
      res.status(200).send({
        message:'patch link is successful'
      })
    }
  })
})

router.delete('/api/link/:id',confirmToken,(req,res)=> {
  const id = req.params.id
  Link.remove({_id:id},(err,data)=> {
    if(err){
      console.log(err)
    }else{
      res.status(200).send('delete successful')
    }
  })
})

router.post('/api/link',confirmToken,(req,res) => {
  const link = {
    name:req.body.name,
    weblink:req.body.weblink,
    mottom:req.body.mottom,
    date:new Date()
  }
  new Link(link).save((err,link)=>{
    if(err){
      console.log(err)
    }else{
      console.log(link)
      res.status(200).send({
        message:'save is ok',
        link:link._doc
      })
    }
  })
})




module.exports = router