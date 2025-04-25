import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Bell,
  Filter,
  Clock,
  CloudUpload,
  File,
} from "lucide-react";
import NewTicketModal from "../components/NewTicketModal";
import fetchAllData from "../utils/fetchAllData";
import formatTicketDate from "../utils/formatTicketDate";
import CommentCell from "../components/CommentCell";

// Main Layout Component
export default function TicketingSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [viewAllTickets, setViewAllTickets] = useState(false);

  // useEffect(() => {
  //   fetchAllData(
  //     `${import.meta.env.VITE_GETALL_TICKETS}` + "&limit=50&page=",
  //     {},
  //     setLoading,
  //     setError
  //   ).then((data) => {
  //     setTickets(data.filter((ticket)=> ticket.portal_url == (new URL(document.referrer)).hostname));
  //   });
  // }, []);

  useEffect(() => {
    const referrer = document.referrer;
    let referrerHost = "";
  
    try {
      if (referrer) {
        referrerHost = new URL(referrer).hostname;
      }
    } catch (e) {
      console.error("Invalid referrer URL:", e);
    }
  
    fetchAllData(
      `${import.meta.env.VITE_GETALL_TICKETS}` + "&limit=50&page=",
      {},
      setLoading,
      setError
    ).then((data) => {
      
      setTickets(
        data.filter((ticket) => {
          try {
            const ticketHost = ticket.portalUrl
            console.log("tickethost: ",ticket.portalUrl, "yourhost:",referrerHost);
            
            return ticketHost == referrerHost;
          } catch {
            return false;
          }
        })
      );
    });
  }, []);
  

  const sortedTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return [];
    return [...tickets].sort(
      (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
    );
  }, [tickets]);

  const visibleTickets = useMemo(() => {
    return viewAllTickets ? sortedTickets : sortedTickets.slice(0, 4);
  }, [sortedTickets, viewAllTickets]);

  const statusCards = [
    {
      title: "Open",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-300",
    },
    {
      title: "InProgress",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-600 dark:text-yellow-300",
    },
    {
      title: "Pending",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-300",
    },
    {
      title: "Resolved",
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-300",
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
                    {
                      [...tickets].filter(
                        (ticket) =>
                          ticket.status.toLowerCase() ==
                          card.title.toLowerCase()
                      ).length
                    }
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Tickets */}
            {!loading ? (
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
                        <th className="px-4 py-3 text-left">Comments</th>
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
                            {ticket.attachments &&
                            ticket.attachments.length > 0 ? (
                              <div className="flex items-center space-x-1">
                                {ticket.attachments
                                  .slice(0, 3)
                                  .map((attachment, index) => (
                                    <div
                                      key={index}
                                      className="relative group cursor-pointer"
                                      title={`Attachment ${attachment.id}`}
                                    >
                                      <a
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <File className="h-5 w-5 text-xs font-medium text-blue-600 dark:text-blue-400" />
                                      </a>
                                    </div>
                                  ))}
                                {ticket.attachments.length > 3 && (
                                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
                                    +{ticket.attachments.length - 3}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                None
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <CommentCell comment={ticket.comments} />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock size={14} className="mr-1" />{" "}
                            {formatTicketDate(ticket.createdTime)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            {formatTicketDate(ticket.updatedTime)}
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
                    {viewAllTickets ? "Show less" : "View all tickets"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-4xl text-center py-8 text-gray-400">
                Loading...
              </div>
            )}
          </div>
        </main>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal
          onClose={() => setShowNewTicketModal(false)}
          setTickets={setTickets}
          setLoading={setLoading}
          setError={setError}
        />
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
