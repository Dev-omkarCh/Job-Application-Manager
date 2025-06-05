import useApplicationStore from "@/store/applicationStore";
import toast from "react-hot-toast";

export const useApplication = () => {
    const { setApplications } = useApplicationStore()

    const submitApplication = async (applicationData) => {
        try {
            const response = await fetch('/api/users/application/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            const data = await response.json();
            if(data.error) toast.error(data.error);
            else toast.success('Application submitted successfully!');

        } catch (error) {
            toast.error(error.message);
        }
    }

    const editApplication = async (newData) => {
        try {
            const response = await fetch(`/api/users/application/edit/${newData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData)
            });

            const data = await response.json();
            if(data.error) toast.error(data.error);
            else toast.success(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteApplication = async (id) => {
        try {
            const response = await fetch(`/api/users/application/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if(data.error) toast.error(data.error);
            else toast.success(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }

    const getApplications = async () =>{
        try {
            const response = await fetch('/api/users/applications', {
                method: 'GET',
            });

            const data = await response.json();
            if(data.error) toast.error(data.error);
            else{
                console.log(data);
                setApplications(data);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

   return { submitApplication, getApplications, editApplication, deleteApplication };
}


