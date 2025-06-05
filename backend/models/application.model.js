import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        default : ""
    },
    location:{
        type: String,
        default: ""
    },
    salary:{
        type: String,
        default: ""
    },
    gmail:{
        type: String,
        default: ""
    },
    date:{
        type:Date,
        default:Date.now,
    },
    status: {
        type: String,
        enum: ["Applied", "Interview", "Offer", "Rejected", "Accepted"],
        default: "Applied"
    },
    source:{
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ""
    },


},{timestamps : true});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
