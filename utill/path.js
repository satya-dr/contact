const path=require('path');


module.exports=path.dirname(require.main.filename);
const userRouter = require('../routes/shop');

userRouter.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','user.html'))
})