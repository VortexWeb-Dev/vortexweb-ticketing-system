import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Bell,
  Filter,
  Clock,
  CloudUpload
} from "lucide-react";
import NewTicketModal from "../components/NewTicketModal";
import fetchData from "../utils/fetchData";
import formatTicketDate from '../utils/formatTicketDate'

// Main Layout Component
export default function TicketingSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [viewAllTickets, setViewAllTickets] = useState(false)

  useEffect(() => {
    fetchData("api/tickets", {}, setLoading, setError).then((data) => {
    //   const safeTickets = Array.isArray(data?.tickets) ? data.tickets : [];
      setTickets(data.tickets);
    });
  }, []);
  

  const sortedTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return [];
    return [...tickets].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [tickets]);
  

  const visibleTickets = useMemo(() => {
    return viewAllTickets ? sortedTickets : sortedTickets.slice(0, 4);
  }, [sortedTickets, viewAllTickets]);

  const statusCards = [
    {
      title: 'Open',
      count: 12,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-300',
    },
    {
      title: 'InProgress',
      count: 5,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-600 dark:text-yellow-300',
    },
    {
      title: 'Pending',
      count: 3,
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-600 dark:text-purple-300',
    },
    {
      title: 'Resolved',
      count: 27,
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-300',
    },
  ];
  
  return (
    <div className={` h-screen flex flex-col`}>
      <div className="flex flex-1 overflow-hidden dark:bg-gray-900">

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">

          {/* Content */}
          <div className="p-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track and manage your support tickets
                </p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
              >
                <Plus size={18} className="mr-1" />
                Create New Ticket
              </button>
            </div>

            {/* Ticket Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statusCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-sm ${card.bgColor} dark:shadow dark:border dark:border-gray-700 dark:bg-opacity-20`}
                >
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {card.title}
                  </h3>
                  <p
                    className={`text-3xl font-bold ${card.textColor} dark:text-white`}
                  >
                    {[...tickets].filter((ticket)=>ticket.status.toLowerCase() == card.title.toLowerCase()).length}
                  </p>
                </div>
              ))}
            </div>

           
            {/* Recent Tickets */}
            {
                !loading ?

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Tickets
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Filter size={18} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full">
  <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
    <tr>
      <th className="px-4 py-3 text-left">ID</th>
      <th className="px-4 py-3 text-left">Title</th>
      <th className="px-4 py-3 text-left">Status</th>
      <th className="px-4 py-3 text-left">Priority</th>
      <th className="px-4 py-3 text-left">Category</th>
      <th className="px-4 py-3 text-left">Attachments</th>
      <th className="px-4 py-3 text-left">Created</th>
      <th className="px-4 py-3 text-left">Last Updated</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    {visibleTickets.map((ticket) => (
      <tr
        key={ticket.id}
        className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
      >
        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
          TKTV{ticket.id}
        </td>
        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
          {ticket.title}
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={ticket.status} />
        </td>
        <td className="px-4 py-3">
          <PriorityBadge priority={ticket.priority} />
        </td>
        <td className="px-4 py-3 dark:text-gray-50 text-gray-700">
          <StatusBadge status={ticket.category} />
        </td>
        <td className="px-4 py-3">
  {ticket.attachments && ticket.attachments.length > 0 ? (
    <div className="flex items-center space-x-1">
      {ticket.attachments.slice(0, 3).map((attachment, index) => (
        <div key={index} className="relative group cursor-pointer" title={attachment.name}>
          {attachment.type.startsWith('image/') ? (
            <img 
              src={attachment.blobUrl} 
              alt={attachment.name}
              className="h-8 w-8  rounded" 
            />
          ) : attachment.type.startsWith('video/') ? (
            <div className="relative h-8 w-8 rounded overflow-hidden">
              <video 
                src={attachment.blobUrl} 
                className="absolute inset-0 w-full h-full object-cover"
                muted 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          ) : attachment.type === 'application/pdf' ? (
            <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-red-600 dark:text-red-400">PDF</span>
            </div>
          ) : attachment.type.includes('document') ? (
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">DOC</span>
            </div>
          ) : (
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
              <span className="text-xs">{attachment.type.split('/')[1]?.toUpperCase().slice(0, 3) || 'FILE'}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded transition-opacity duration-200"></div>
        </div>
      ))}
      {ticket.attachments.length > 3 && (
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
          +{ticket.attachments.length - 3}
        </div>
      )}
    </div>
  ) : (
    <span className="text-xs text-gray-500 dark:text-gray-400">None</span>
  )}
</td>
        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock size={14} className="mr-1" /> {formatTicketDate(ticket.createdAt)}
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
          {formatTicketDate(ticket.updatedAt)}
        </td>
      </tr>
    ))}
  </tbody>
</table>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-center">
              <button
          className="text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => setViewAllTickets((prev) => !prev)}
        >
          {viewAllTickets ? 'Show less' : 'View all tickets'}
        </button>
              </div>
            </div>
     
            : 
           
                <div className="text-4xl text-center py-8 text-gray-400">
                    Loading...
                </div>
            
                }

          </div>
        </main>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal onClose={() => setShowNewTicketModal(false)} setTickets={setTickets} setLoading={setLoading} setError={setError} />
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const badgeStyles = {
    Open: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400",
    InProgress:
      "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400",
    Resolved:
      "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
    Closed: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400",
  };

  return (
    <span
      className={`${badgeStyles[status]} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {status}
    </span>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }) {
  const priorityStyles = {
    High: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400",
    Medium:
      "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400",
    Low: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
  };

  return (
    <span
      className={`${priorityStyles[priority]} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {priority}
    </span>
  );
}
