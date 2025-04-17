import React, { useEffect, useState } from 'react';
import TicketTimeline from './../components/TicketTimeline';

const TimelinePage = () => {
  const [ticket, setTicket] = useState({
    id: "TK-1001",
    title: "App crashes on login",
    status: "Open",
    statusHistory: [
      { status: "Open", timestamp: new Date().toISOString() }
    ],
    priority: "High",
    category: "Technical Support",
    description: "The application crashes whenever I try to log in on my iPhone.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Simulate status changes over time
  useEffect(() => {
    const statusOrder = ["Open", "InProgress", "Resolved", "Closed"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      // Move to next status
      currentIndex = (currentIndex + 1) % statusOrder.length;
      const newStatus = statusOrder[currentIndex];
      
      // Update ticket with new status and add to history
      setTicket(prevTicket => {
        // Only add status to history if it's different than current
        if (prevTicket.status !== newStatus) {
          const now = new Date().toISOString();
          return {
            ...prevTicket,
            status: newStatus,
            updatedAt: now,
            statusHistory: [
              ...prevTicket.statusHistory,
              { status: newStatus, timestamp: now }
            ]
          };
        }
        return prevTicket;
      });
    }, 5000); // Change status every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-2xl mx-auto mt-8">
  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
    <div className="flex justify-between items-start">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{ticket.title}</h2>
      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
        ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 
        ticket.status === 'InProgress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 
        ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      }`}>
        {ticket.status}
      </span>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mt-2">{ticket.description}</p>
    <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
      <span className="mr-4">
        Priority: <span className="font-medium text-gray-700 dark:text-gray-200">{ticket.priority}</span>
      </span>
      <span>
        Category: <span className="font-medium text-gray-700 dark:text-gray-200">{ticket.category}</span>
      </span>
    </div>
  </div>

  {/* Timeline component */}
  <TicketTimeline ticket={ticket} />

  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
    <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>
    <p>Last Updated: {new Date(ticket.updatedAt).toLocaleString()}</p>
  </div>
</div>

  );
};

export default TimelinePage;