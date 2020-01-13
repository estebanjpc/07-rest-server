const jwt = require('jsonwebtoken');


// ### verificar token

let verificaToken = (req,res,next)=>{
    let token = req.get('token');

    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


    // res.json({
    //     token
    // });


};


// ### verificar ADMIN_ROLE

let verificaAdminRole = (req,res,next)=>{
    let usuario = req.usuario;

    console.log('############');
    console.log('ROLE: ',usuario.role);
    
    if(usuario.role === 'ADMIN_ROLE'){
        next();
        return;
    }

    res.json({
        ok: false,
        err:{
            message: 'El usuario no es admin'
        }
    });


}


module.exports = {
    verificaToken,
    verificaAdminRole
}