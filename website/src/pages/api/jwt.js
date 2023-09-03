import jwt from 'jsonwebtoken'
export default function handler(req, res) {
  
    if(req.query.uid){
        const token=jwt.sign({uid:req.query.uid},'ndfsjhbdsfjhdndnk')
        res.json(token)
       
    }
    else if(req.query.jwt){
        console.log(req.query.jwt)
        var decodedClaims = jwt.verify(req.query.jwt.toString(), 'ndfsjhbdsfjhdndnk');
        res.json(decodedClaims)
    }
    else {
        res.status(404).header('data insufficent')
    }
}