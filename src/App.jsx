import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainPage from "./Pages/MainPage";
import { createServer, Server, Model } from "miragejs";
import mockTickets from "./mockData/mockTickets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimelinePage from "./Pages/Timeline";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// createServer({
//   routes() {
//     this.get("/api/tickets", () => [
//       {
//         id: "TK-1001",
//         title: "Server connection issue",
//         status: "Open",
//         priority: "High",
//         created: "2 hours ago",
//         updated: "30 mins ago",
//       },
//       {
//         id: "TK-1002",
//         title: "Login authentication failure",
//         status: "In Progress",
//         priority: "Medium",
//         created: "1 day ago",
//         updated: "3 hours ago",
//       },
//       {
//         id: "TK-1003",
//         title: "Dashboard data not loading",
//         status: "Open",
//         priority: "High",
//         created: "3 days ago",
//         updated: "1 day ago",
//       },
//       {
//         id: "TK-1004",
//         title: "Account password reset",
//         status: "Resolved",
//         priority: "Low",
//         created: "1 week ago",
//         updated: "2 days ago",
//       },
//       {
//         id: "TK-1005",
//         title: "Export functionality broken",
//         status: "In Progress",
//         priority: "Medium",
//         created: "5 days ago",
//         updated: "12 hours ago",
//       },
//     ])
//   },
// })

// if (window.server) {
//   window.server.shutdown();
// }


createServer({
  models: {
    ticket: Model,
  },
  seeds(server) {
    mockTickets.forEach((ticket) => server.create("ticket", ticket));
  },
  routes() {
    this.namespace = "api";

    // POST endpoint to create tickets
    this.post("/tickets", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      attrs.createdAt = new Date().toISOString();
      attrs.updatedAt = new Date().toISOString();
      return schema.tickets.create(attrs);
    });
    
    // GET endpoint to fetch all tickets
    this.get("/tickets", (schema) => {
      return schema.tickets.all();
    });
  },
});



function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Router>
        <ThemeProvider>
          {/* <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
          </Routes> */}
           <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar sidebarOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/*" element={<MainPage />} />
                
              </Routes>
            {/* Your page content goes here */}
          </main>
        </div>
      </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
