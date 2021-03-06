const mongoose =require ('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createdompurifier = require('dompurify')
const { JSDOM }  = require('jsdom')

const dompurify = createdompurifier( new JSDOM().window)

const articleSchema = new mongoose.Schema({
title :{
    type :String ,
    required : true

},
description :{
    type :String 
    

},
markdown :{
    type :String ,
    required : true

},
date :{
    type :Date ,
    default : Date.now

},

slug :{
    type :String ,
    required : true,
    unique :true

},
sanitizedhtml:{
 type: String ,
 required:true


},
imageURL: {
    type :String ,
    required : true,
    unique :true

} 



}) 


articleSchema.pre('validate',function(next){
 if (this.title) {
     this.slug=slugify(this.title,{lower:true,strict:true})
 }

 if (this.markdown) {
     this.sanitizedhtml= dompurify.sanitize(marked(this.markdown)) 
   }
 
 
 
 
 next()

})
module.exports = mongoose.model('Article',articleSchema)








