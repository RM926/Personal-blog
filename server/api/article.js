const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const confirmToken = require('../middlewares/confirmToken')

// 发布文章
router.post('/api/article', confirmToken, (req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content,
        date: Date(),
        tags: req.body.tags,
        isPublish: true
    }
    new db.Article(article).save()
    res.status(200).send('succeed in saving new passage.')
})

// 获取某篇文章
router.get('/api/article/:aid', (req, res) => {
    db.Article.findOne({aid: req.params.aid}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(doc)
        }
    })
})

// 删除文章并删除文章下面的评论
router.delete('/api/article/:aid', confirmToken, (req, res) => {
    // console.log(req.params)
    db.Article.remove({aid: req.params.aid}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('succeed in deleting ---' + data)
        }
    })
})

// 更新文章
router.patch('/api/article/:aid', confirmToken, (req, res) => {
    const aid = req.params.aid
    const article = {
        title: req.body.title,
        tags: req.body.tags,
        date: Date(),
        content: req.body.content,
        isPublish: true
    }
    db.Article.update({aid: aid}, article, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('succeed in updating ---' + data.title)
        }
    })
})

// 获取很多文章
router.get('/api/articles', (req, res) => {
    const payload1  = req.query.payload
    const payload  = payload1?eval('('+payload1+')'):{}
    // console.log(typeof payload) //object
    const page = payload.page
    const value = payload.value
    const limit = payload.limit - 0 || 4
    const skip = limit * (page - 1 )
    console.log('limit:' + limit,'skip:' + skip,'value:'+value)
    if (value && value !== 'all') {
        db.Article.find({tags: value, isPublish: true}).sort({date: -1}).limit(limit).skip(4).exec()
            .then((articles) => {
                res.send(articles)
        })
    } else {
        db.Article.find({isPublish: true}).sort({date: -1}).limit(limit).skip(skip).exec().then((articles) => {
            db.Article.count({isPublish:true},(err,count)=>{
                if(err){
                    console.log(err)
                }else{
                    const pageCount = Math.ceil(count/limit)
                    // console.log(articles.pageCount)
                    // console.log(pageCount)
                    res.send({
                        articles,pageCount})
                }
            })
        })
    }
})

// 搜索一些文章
router.get('/api/someArticles', (req, res) => {
    const payload1  = req.query.payload
    const payload  = payload1?eval('('+payload1+')'):{}
    const key = payload.key
    const value = payload.value
    const limit = payload.limit - 0 || 4
    const page = payload.page || 1
    const skip = 4 * (page - 1 )
    const re = new RegExp(value,'i')
    if (key === 'tags') {                                       // 根据标签来搜索文章
        const arr = value.split(' ')
        db.Article.find({isPublish:true}).find({tags: {$all: arr}})
            .sort({date: -1}).limit(limit).skip(skip).exec()
            .then((articles) => {
                db.Article.find({isPublish:true}).count({tags: {$all: arr}},(err,count) => {
                    if(err){
                        console.log(err)
                    }else{
                        const pageCount = Math.ceil(count/limit)
                        res.send({articles,pageCount})
                    }
                })
               
            })
    } else if (key === 'title') {                               // 根据标题的部分内容来搜索文章
        db.Article.find({title: re, isPublish: true})
            .sort({date: -1}).limit(4).skip(skip).exec()
            .then((articles) => {
                res.send(articles)
            })
    } else if (key === 'date') {                                // 根据日期来搜索文章
        const nextDay = value + 'T24:00:00'
        db.Article.find({date: {$gte: new Date(value), $lt: new Date(nextDay)}})
            .sort({date: -1}).limit(4).skip(skip).exec()
            .then((articles) => {
                res.send(articles)
            })
    }
})

module.exports = router
