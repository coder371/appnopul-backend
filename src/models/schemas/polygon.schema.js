const mongoose = require( "mongoose" )

const PolygonSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps"
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps"    
    },
    type: {
        type: String,
        enum: [ 'Polygon' ],
        required: true
    },
    coordinates: {
        type: [[ Number ]],
        required: true
    }
} );

module.exports = PolygonSchema