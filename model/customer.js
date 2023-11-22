const mongoose = require( "mongoose" );

const CustomerDetailsSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
      
} );
const CustomerDetails=mongoose.model("customer-details",CustomerDetailsSchema)
module.exports = CustomerDetails;