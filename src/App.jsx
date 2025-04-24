import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import MainPage from "./Pages/MainPage";
// import { createServer, Server, Model } from "miragejs";
import mockTickets from "./mockData/mockTickets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimelinePage from "./Pages/Timeline";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// createServer({
//   models: {
//     ticket: Model,
//   },
//   seeds(server) {
//     mockTickets.forEach((ticket) => server.create("ticket", ticket));
//   },
//   routes() {
//     this.namespace = "api";

//     // POST endpoint to create tickets
//     this.post("/tickets", (schema, request) => {
//       const attrs = JSON.parse(request.requestBody);
//       attrs.createdAt = new Date().toISOString();
//       attrs.updatedAt = new Date().toISOString();
//       return schema.tickets.create(attrs);
//     });
    
//     // GET endpoint to fetch all tickets
//     this.get("/tickets", (schema) => {
//       return schema.tickets.all();
//     });
//   },
// });



function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Router>
        <ThemeProvider>
          
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
          </main>
        </div>
      </div>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
