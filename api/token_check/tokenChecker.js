
/**
 * Funzione che implementa il controllo dei token e il filtro delle richieste
 * @param {*} req request
 *                contiene .cookies.token che contiene il valore del token
 *            
 *                
 * @param {*} res response, usato per fornire messaggi di ritorno (errore o completamento operazione)
 * 
 * 
 * @param {*} next the function that is protected by this code and will be executed if the user is authorized
 * 
 */
exports.tokenChecker = function(req, res, next) {
    console.log("token check")
    var jwt= require("jsonwebtoken")
    //console.log(req.headers)
    var token=req.headers.token
    /*if(!token)//patch to give an alternative for token, security is a concern but hopefully it will be ok 
        token=req.body.token*/
    // se il token non è definito ritorno errore 401
    if (!token) 
        res.status(401).json({success:false,message:'Error: No token provided.'})    
    else{
        // decodifico il token, verifico il secret e controllo scadenza
        jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
            if (err) 
                // se il token è invalido ritorno errore 403
                res.status(401).json({success:false,message:'Token not valid'})
            else {
                // se tutto è ok salvo il token in req.user e eseguo il codice protetto
                req.user = decoded;
                next();
            }
        });
    }
};
    