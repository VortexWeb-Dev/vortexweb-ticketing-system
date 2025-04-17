import React from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertCircle, X } from 'lucide-react';

// Status definitions with icons and colors
const STATUS_CONFIG = {
  Open: { 
    icon: AlertCircle, 
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500"
  },
  InProgress: { 
    icon: Clock, 
    color: "text-blue-500",
    bgColor: "bg-blue-100", 
    borderColor: "border-blue-500"
  },
  Resolved: { 
    icon: CheckCircle, 
    color: "text-green-500",
    bgColor: "bg-green-100",
    borderColor: "border-green-500"  
  },
  Closed: { 
    icon: X, 
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-500"  
  }
};

// All possible statuses in order
const STATUS_ORDER = ["Open", "InProgress", "Resolved", "Closed"];

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const TicketTimeline = ({ ticket }) => {
  const [statusHistory, setStatusHistory] = useState(ticket.statusHistory || []);
  const currentStatus = ticket.status;
  
  // Find the current status index in our predefined order
  const currentStatusIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="py-4">
    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Status Timeline</h3>
    <div className="flex flex-col space-y-0">
      {STATUS_ORDER.map((status, index) => {
        const historyItem = statusHistory.find(item => item.status === status);
        const isActive = currentStatusIndex >= index;
        const StatusIcon = STATUS_CONFIG[status].icon;
  
        return (
          <div key={status} className="flex items-start relative">
            {/* Timeline line */}
            {index < STATUS_ORDER.length - 1 && (
              <div className={`absolute top-6 left-3.5 w-0.5 h-full ${
                'bg-gray-200'
              }`}></div>
            )}
  
            {/* Status node */}
            <div className="flex items-center z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center 
                ${isActive ? STATUS_CONFIG[status].bgColor : 'bg-gray-100 dark:bg-gray-800'} 
                ${isActive ? STATUS_CONFIG[status].borderColor : 'border-gray-300 dark:border-gray-600'} 
                border`}>
                <StatusIcon className={`w-4 h-4 ${isActive ? STATUS_CONFIG[status].color : 'text-gray-400 dark:text-gray-500'}`} />
              </div>
            </div>
  
            {/* Status information */}
            <div className="ml-4 pb-6">
              <div className="flex items-center">
                <h4 className={`font-medium ${
                  isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {status}
                </h4>
              </div>
              {historyItem && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(historyItem.timestamp)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
  
  );
};

export default TicketTimeline;