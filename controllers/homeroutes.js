const router = require('express').Router();
const {User, Comments, Post}= require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req,res)=>{
    try{
        const postData = await Post.findAll({
            include:[
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })
        const posts = postData.map((posts)=> posts.get({plain:true}));
        
        res.render('homepage',{
            posts,
            logged_in: req.session.logged_in
        
        });

    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/post/:id', async(req,res)=>{
    try{
        const postData = await Post.findByPk(req.params.id,{
            include:[
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })
        const post =postData.get({plain: true});
        res.render('post',{
            post,
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
        if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;