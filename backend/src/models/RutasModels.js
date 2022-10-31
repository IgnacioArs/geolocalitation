import {Schema,model} from 'mongoose'


const RutaSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    inicioLatitude:{
        type:String,
        require:true
    },
    inicioLongitude:{
        type:String,
        require:true
    },
    llegadaLatitude:{
        type:String,
        require:true
    },
    llegadaLongitude:{
        type:String,
        require:true
    },
    llegadaLatitudeDelta:{
        type:String,
        require:true
    },
    llegadaLongitudeDelta:{
        type:String,
        require:true
    }

},{
    timestamps:true
})

export default  model('Rutas',RutaSchema)