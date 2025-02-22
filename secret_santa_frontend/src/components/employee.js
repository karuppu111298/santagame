import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Api from "../services/api.service";
import { format } from 'date-fns';


const UploadCSV = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const fileInputRef = useRef(null); 

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Check if a file is selected
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }

        // Check if the file is a CSV
        const fileType = selectedFile.type;
        if (fileType !== 'text/csv') {
            setError('Please upload a valid CSV file.');
            setFile(null); // Reset the file
            return;
        }

        // Check if the file is empty
        if (selectedFile.size === 0) {
            setError('File cannot be empty.');
            setFile(null); // Reset the file
            return;
        }

        // If valid, clear error and set the file
        setError('');
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a valid CSV file.');
            return;
        }

        const formData = new FormData();
        formData.append('csvFile', file);
        try {
            Api.file_upload(formData)
                .then((res) => {
                    setResponse(res.data);
                    if(res.data.message){
                        alert(res.data.message);
                    }
                    setFile(null);
                    fileInputRef.current.value = '';
                    fetchEmployeeList();
                })
                .catch((e) => {
                    console.log(e);
                    alert("Upload failed");
                });
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
        }
    };

    useEffect(() => {
        try {
            fetchEmployeeList();
        } catch (error) {
            console.error('Error fetch file:', error);
        }
    }, []);

    const fetchEmployeeList = async () => {
        try {
            const res = await Api.employee_assign_list();
            setData(res.data.employee); 
        } catch (error) {
            console.error('Error fetching employee list:', error);
            // alert("Fetch failed");
        }
    };

    const exportData = async () => {
        try {
            fetch('http://localhost:5000/api/employee_assign_export') 
            .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to download CSV');
                }
                return response.blob(); // Get the CSV file as a blob
              })
              .then((blob) => {
                // Create a link element to trigger the download
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob); // Create an object URL for the blob
                link.download = 'users.csv'; // Specify the filename for download
                link.click(); // Trigger the download
              })
              .catch((error) => {
                alert('No data found to export:', error);
              });
        } catch (error) {
            alert('Error fetch file:', error);
        }
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd-MM-yyyy HH:mm');
    };

    return (
        <div class="page-content main-content">
        <div className="upload-container">
            <h2 className="upload-header">Upload CSV File</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="upload-input"
                    ref={fileInputRef}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-primary btn-sm">
                    Upload
                </button>
            </form>
        </div>
        <div class="employee_table m-5">
            <div class="float-right mb-2">
            <button type="button" className="upload-button" onClick={exportData}> Export </button>
            </div>
            <table className="styled-table">
                <thead>
                <tr>
                    <th>S. No.</th>
                    <th>Employe Name </th>
                    <th>Employe Email</th>
                    <th>Child Name</th>
                    <th>Child Email</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((row, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.giver ? `${row.giver.name}` : 'N/A'}</td>
                    <td>{row.giver ? `(${row.giver.email})` : 'N/A'}</td>
                    <td>{row.receiver ? `${row.receiver.name}`: 'N/A'}</td>
                    <td>{row.receiver ? `(${row.receiver.email})` : 'N/A'}</td>
                    <td>{row.createdAt ? formatDate(row.createdAt) : 'N/A'}</td> 
                    </tr>
                ))}
                 </tbody>

            </table>
         </div>
        </div>
    );
};

export default UploadCSV;
