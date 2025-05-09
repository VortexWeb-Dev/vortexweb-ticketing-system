import { useState, useEffect } from "react";
import { CloudUpload, Bell, Search, LogIn } from "lucide-react";
import fetchAllData from "../utils/fetchAllData";
import fetchData from "../utils/fetchData";
import fileToBase64 from "../utils/filetob64";

function NewTicketModal({ onClose, setTickets, setLoading, setError }) {

    const [formData, setFormData] = useState({
        title: "",
        status: "Open",
        priority: "Low",
        category: "Technical Support",
        description: "",
        client_name: "John Scott",
        attachments: [],
        portal_url : new URL(document.referrer).hostname
      });
      
    //   const [tickets, setTickets] = useState([]);
      const [submitMessage, setSubmitMessage] = useState("");
      const [showSubmitMessage, setShowSubmitMessage] = useState(false);
      const [currentFiles, setCurrentFiles] = useState([]) 
      const [submitLoading, setSubmitLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      
      const handleFileChange = async(e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
          // Check file type
          const validTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp',
            'video/mp4', 'video/webm', 'video/ogg',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
          ];
          
          // Check file size (10MB max)
          const maxSize = 10 * 1024 * 1024; // 10MB in bytes
          
          const isValidType = validTypes.includes(file.type) || file.type.startsWith("video/");
          const isValidSize = file.size <= maxSize;
          
          if (!isValidType) {
            alert(`File type not supported: ${file.name}`);
          }
          if (!isValidSize) {
            alert(`File exceeds 10MB limit: ${file.name}`);
          }
          
          return isValidType && isValidSize;
        });
        
        // Store files as blob URLs
        async function handleFiles(validFiles) {
          for (const file of validFiles) {
            try {
              const base64file = await fileToBase64(file);
              setFormData(prevData => ({
                ...prevData,
                attachments: [
                  ...prevData.attachments,
                  [file.name, base64file]
                ]
              }));
            } catch (error) {
              console.error('Error converting file:', file.name, error);
            }
          }
        }
        handleFiles(validFiles)
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setSubmitLoading(true)
        
        try {
          const response = await fetch(import.meta.env.VITE_CREATE_TICKET , {
            method: "POST",
            body: JSON.stringify(formData)
          });
          
          console.log(formData);
          
          const data = await response.json();
          
          if (data.ticket) {
            console.log(data);
            fetchData(import.meta.env.VITE_GETALL_TICKETS,{}, setLoading, setError)
            .then ((data)=> {
                console.log(data.tickets)
                setTickets(data.tickets.filter((ticket) => {
                  try {
                    const ticketHost = ticket.portalUrl
                    console.log("tickethost: ",ticket.portalUrl, "yourhost:",(new URL(document.referrer).hostname));
                    
                    return ticketHost == (new URL(document.referrer).hostname);
                  } catch {
                    return false;
                  }
                }))
            }
      )
            setSubmitMessage("Ticket submitted successfully!");
            setShowSubmitMessage(true);
            
            // Reset form
            setFormData({
              title: "",
              priority: "Low",
              category: "Technical Support",
              description: "",
              client_name: ``,
              attachments: [],
              portal_url: new URL(document.referrer).hostname
            });
            
            // Refresh ticket list
            // fetchTickets();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
              setShowSubmitMessage(false);
            }, 3000);
          }
        } catch (error) {
          console.error("Error submitting ticket:", error);
          setSubmitMessage("Error submitting ticket. Please try again.");
          setShowSubmitMessage(true);
        } finally{
          setSubmitLoading(false)
        }
      };
      
      const removeAttachment = (index) => {
        setFormData(prevData => ({
          ...prevData,
          attachments: prevData.attachments.filter((_, i) => i !== index)
        }));
      };

  return (
    <div className="fixed inset-0 z-50 overflow-auto shadow-2xl bg-opacity-50 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-full overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Ticket
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
          >
            ✘
          </button>
        </div>

        <div className="p-4">

          

{showSubmitMessage && (
        <div className={`p-3 mb-4 rounded ${submitMessage.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {submitMessage}
        </div>
      )}
      
      <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Portal Url (Read Only): 
              </label>
              <input
                type="text"
                name="title"
                value={new URL(document.referrer).hostname}
                // onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the issue"
                readOnly
              />
            </div>

      <form id="createTicket" onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the issue"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Technical Support</option>
            <option>Billing</option>
            <option>Feature Request</option>
            <option>Account Access</option>
            <option>Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Please provide details about your issue..."
            required
          ></textarea>
        </div>
        

         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Attachments
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-center">
            <div className="flex flex-col items-center">
              <CloudUpload className="w-8 h-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Drag and drop files here, or{" "}
                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  browse
                  <input 
                    type="file" 
                    id="fileInput"
                    className="hidden" 
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.svg,.webp,video/*,.pdf,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Max file size: 10MB. Allowed formats: Images, Videos, PDF, DOCX
              </p>
            </div>
          </div>

          {/* Display attached files */}

           {formData.attachments.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Attached files:</p>
              <ul className="mt-2 space-y-2">
                {formData.attachments.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{file[0]}</span>
                      {/* <span className="ml-2 text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span> */}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>  
        
    
      </form>

        </div>

        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button form="createTicket" type="submit" className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm ${submitLoading ? 'disabled' : ''}`}>
           {submitLoading ? "Submitting.." : "Submit"} 
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;