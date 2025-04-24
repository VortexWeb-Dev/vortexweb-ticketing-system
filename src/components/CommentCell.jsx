import { useState } from 'react';
import { X } from 'lucide-react';

// CommentCell component to be used in the table
const CommentCell = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Number of characters to show in the preview
  const previewLength = 50;
  
  // Create preview text with ellipsis if needed
  const previewText = comment.length > previewLength 
    ? `${comment.substring(0, previewLength)}...` 
    : comment;
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <div 
        onClick={openModal}
        className="cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        {previewText}
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Comment Details
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment}
              </p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default CommentCell;