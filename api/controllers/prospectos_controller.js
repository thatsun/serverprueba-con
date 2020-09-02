const mongoose = require('mongoose');
const Prospectos= require('../models/prospectos');


exports.prospectos_change_status=(req,res,next)=>{

    Prospectos.updateOne({ _id: req.body.prosid }, { status: req.body.status})
    .exec()
    .then(result =>{
        
        res.status(200).json({message: 'updated'});
        

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });



}
exports.prospectos_get_all=(req,res,next) =>{    
    Prospectos.find()
    .select('user name lastname lastlastname adress_street adress_number adress_colony adress_cp phonenumber rfc documentsrequest status _id')
    .exec()
    .then(docs=> {
        const response={           
            prospectos: docs.map(doc=>{
                return{
                    user:doc.user,
                    name: doc.name,
                    lastname:doc.lastname,
                    lastlastname:doc.lastlastname,
                    adress_street: doc.adress_street,
                    adress_number: doc.adress_street,
                    adress_colony: doc.adress_street,
                    adress_cp: doc.adress_street,
                    phonenumber: doc.phonenumber,
                    rfc: doc.rfc,
                    documentsrequest:doc.documentsrequest,                    
                    status: doc.status,
                    Id: doc._id,
                    request: {
                        typerequest: 'GET',
                        url: 'https://serverprueba.herokuapp.com/prospectos'
                    }

                }
            })

        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.prospectos_get_by_userid=(req,res,next) =>{
    const userId= req.params.userId;
    Prospectos.find({user:userId})
    .select('user name lastname lastlastname adress_street adress_number adress_colony adress_cp phonenumber rfc documentsrequest status _id')
    .exec()
    .then(docs=> {
        const response={           
            prospectos: docs.map(doc=>{
                return{
                    user:doc.user,
                    name: doc.name,
                    lastname:doc.lastname,
                    lastlastname:doc.lastlastname,
                    adress_street: doc.adress_street,
                    adress_number: doc.adress_street,
                    adress_colony: doc.adress_street,
                    adress_cp: doc.adress_street,
                    phonenumber: doc.phonenumber,
                    rfc: doc.rfc,
                    documentsrequest:doc.documentsrequest,                    
                    status: doc.status,
                    Id: doc._id,
                    request: {
                        typerequest: 'GET',
                        url: 'https://serverprueba.herokuapp.com/prospectos/'+doc._id
                    }

                }
            })

        };
        console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.prospectos_add_prospecto=(req,res,next) =>{   
    
            console.log(req.body.file);
    
            const prospecto= new Prospectos({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                name: req.body.name,
                lastname: req.body.lastname,
                lastlastname: req.body.lastlastname,
                adress_street: req.body.adress_street,
                adress_number: req.body.adress_number,
                adress_colony: req.body.adress_colony,
                adress_cp: req.body.adress_cp,
                phonenumber: req.body.phonenumber,
                rfc: req.body.rfc,
                documentsrequest: ["",""],
                status:req.body.status
        
            });
            prospecto.save()
            .then( result =>{
                res.status(201).json({
                    message: 'prospecto creado'

                });

            })
            .catch( err =>{
                res.status(500).json({
                    error: err

                });

            });
        
    
}

exports.prospectos_get_prospecto=(req,res,next) =>{
    const Id= req.params.Id;
    Prospectos.findById(Id)
        .select('user name lastname lastlastname adress_street adress_number adress_colony adress_cp phonenumber rfc documentsrequest status _id')
        .exec()
        .then(doc =>{
            console.log("From database",doc);
            if(doc){
                
                res.status(200).json({message: 'prospecto info found',
                PropectoInfoFound: {
                    Id: doc._id,
                    user: doc.user,
                    name: doc.name,
                    lastename: doc.lastname,
                    lastlastname: doc.lastlastname,
                    adress_street: doc.adress_street,
                    adress_number: doc.adress_number,
                    adress_colony: doc.adress_colony,
                    adress_cp: doc.adress_cp,
                    phonenumber: doc.phonenumber,
                    rfc: doc.rfc,
                    documentsrequest: doc.documentsrequest,
                    status:doc.status,
                    request: {
                        typerequest: 'GET',
                        description: 'Get all prospectos',
                        url: 'https://serverprueba.herokuapp.com/prospectos'
                    } 
                 }
                });
            }
            else{
                res.status(404).json({ message: 'No valid entry found for provided ID'});
            }            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
    
    
}

exports.prospectos_edit_prospecto=(req,res,next) =>{
    const Id=req.params.Id;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }

    Prospectos.updateOne({ _id: Id }, updateOps)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Prospecto info updated succesfully',
        UpdatedProspecto: {
           
            request: {
                typerequest: 'GET',
                url: 'https://serverprueba.herokuapp.com/prospectos/'+Id
            } 
        }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
       
}

exports.prospectos_delete_prospecto=(req,res,next) =>{
    const Id=req.params.Id;

    Dog.deleteOne({_id: Id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Prospecto deleted'
        });
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
       
}