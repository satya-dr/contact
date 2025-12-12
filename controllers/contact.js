const registeredContact=[];


exports.getAddContact=(req,res,next)=>{
    res.render('add-contact',{
        pageTitle:"Add Contact"
    })
}
exports.postAddContact=(req,res,next)=>{
    console.log("successfull:-",req.body);
    registeredContact.push(req.body)
    res.render('contact-added',{
        pageTitle:"Added Successfull"
    })
}
exports.getContact = (req, res, next) => {
    console.log(registeredContact);
    res.render('user', {
        contacts: registeredContact,
        pageTitle: "My contact"
    });
}