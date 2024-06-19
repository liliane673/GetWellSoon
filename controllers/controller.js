module.exports={
    home(req,res){
        try {
            res.render('home'); 
        } catch (err) {
            res.render(err)
        }
       
    }
}
