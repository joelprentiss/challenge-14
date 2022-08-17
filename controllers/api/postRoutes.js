const router = require('express').Router();
const {Post}= require('../../models/post');

router.post('/', async (req,res)=>{
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const postData = await Post.findOne({
            where:{
                post_id: req.body.post_id,
            },
        });
        if(!postData){
            res.status(400).json({message: 'No post matching ID'});
            return;
        }
        res.status(200).json(postData);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const postDelete = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postDelete) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postDelete);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;