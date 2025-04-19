import { createContext, useState, useRef, useEffect } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recruitments/with-company');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <JobContext.Provider
            value={{
                jobs,
                setJobs,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};
