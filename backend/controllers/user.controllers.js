import Application from "../models/application.model.js";

export const submitApplication = async( req, res) =>{
    try{
        const { companyName, jobRole, jobDescription, location, salary, email, source, notes, date} = req.body;
        const userId = req.user._id;
        console.log( userId, companyName, jobRole, jobDescription, location, salary, email, source, date, notes);

        // Validate required fields
        if (!userId || !companyName || !jobRole || !source) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        // Create a new application
        const newApplication = {
            userId,
            companyName: companyName,
            jobTitle: jobRole,
            jobDescription: jobDescription || "",
            location: location || "",
            salary: salary || "",
            gmail: email || "",
            source: source || "",
            notes: notes || "",
        };

        const createdApplication = await Application.create(newApplication);
        console.log(createdApplication);
        res.status(201).json(createdApplication);
    }
    catch(e){
        console.log("Error in submitApplication Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getApplications = async( req, res) =>{
    try{
        const userId = req.user._id;
        const applications = await Application.find({ userId });

        return res.json(applications);

    }
    catch(e){
        console.log("Error in getApplications Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const editApplication = async(req, res) =>{
    try {
        const id = req.params.id;
        const { companyName, jobTitle, jobDescription, source, status, gmail, location, salary, notes, userId, date} = req.body;
        const editCount = 0;

        const application = await Application.findOne({ _id: id });

        if(application.companyName !== companyName){
            application.companyName = companyName;
            editCount++;
        }
        if(application.jobTitle !== jobTitle){
            application.jobTitle = jobTitle;
            editCount++;
        }
        if(application.jobDescription !== jobDescription){
            application.jobDescription = jobDescription;
            editCount++;
        }
        if(application.salary !== salary){
            application.salary = salary;
            editCount++;
        }
        if(application.source !== source){
            application.source = source;
            editCount++;
        }
        if(application.status !== status){
            application.status = status;
            editCount++;
        }
        if(application.gmail !== gmail){
            application.gmail = gmail;
            editCount++;
        }
        if(application.location !== location){
            application.location = location;
            editCount++;
        }
        if(application.notes !== notes){
            application.notes = notes;
            editCount++;
        }

        if(editCount === 0) return res.status(400).json({ message : "Nothing Edited!"})

        await application.save();
        return res.json({ message : "Application Edited sucessfully"});

    } 
    catch (error) {
        console.log("Error in editApplication Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteApplication = async(req, res) =>{
    try {
        const id = req.params.id;

        await Application.deleteOne({ _id : id });
        return res.json({ message : "Application Deleted sucessfully"});

    } 
    catch (error) {
        console.log("Error in editApplication Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}