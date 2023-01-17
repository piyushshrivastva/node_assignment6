const router = require('express').Router();
const Blog = require('../models/Blog')


// Your routing code goes here
router.route('/').get(async (req,res)=>{
    try{
    
        //const que = req.query;
        const queryData = await Blog.find({topic : req.query.search}).skip((req.query.page-1)*5).limit(5);
        
        res.json({
            status:"Success",
            result:queryData
        })
    } catch(e){
        res.status(400).json({
            status : "",
            message:e.message, 
        })
    }
})

.post(async (req,res)=>{

    try{
        const User = await Blog.create(req.body);
        res.status(200).json({
            status : "Success",
            result : User
        })
    }
    catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

router.route("/:id").put(async (req,res)=>{
    try{
        const found = await Blog.findOne({_id:req.params.id});
        found.posted_by = "Shashank";
        found.save();
        res.json({
            status : "Success",
            result:found
        })     
    }
    catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

.delete(async (req,res)=>{
    try{
        const found = await Blog.findOne({_id:req.params.id});
        const deleted =  await Blog.deleteOne({_id:req.params.id});
        res.json({
            status : "Success",
            result:found,
            // deleted:deleted,
        })
    }   
    catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

// router.get('/blog',(req,res)=>{
//     res.json({ok:'blog'})
// })


module.exports = router;