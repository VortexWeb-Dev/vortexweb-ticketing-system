
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import MainPage from './MainPage'
import {createServer, Server, Model } from "miragejs"

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
    const tickets = [
      {
        title: "App crashes on login",
        status: "Open",
        priority: "High",
        category: "Technical Support",
        description: "The application crashes whenever I try to log in on my iPhone.",
        attachments: [],
        createdAt: new Date(2025, 3, 8).toISOString(),
        updatedAt: new Date(2025, 3, 8).toISOString()
      },
      {
        title: "Login button not responsive",
        status: "Open",
        priority: "Medium",
        category: "Technical Support",
        description: "Clicking the login button does nothing on the web version.",
        attachments: [],
        createdAt: new Date(2025, 3, 7).toISOString(),
        updatedAt: new Date(2025, 3, 7).toISOString()
      },
      {
        title: "Error 500 on dashboard",
        status: "InProgress",
        priority: "High",
        category: "Technical Support",
        description: "I'm getting a 500 server error when I open the dashboard after logging in.",
        attachments: [],
        createdAt: new Date(2025, 3, 6).toISOString(),
        updatedAt: new Date(2025, 3, 8).toISOString()
      },
      {
        title: "Push notifications not working",
        status: "InProgress",
        priority: "Low",
        category: "Technical Support",
        description: "Not receiving any push notifications even though they're enabled in settings.",
        attachments: [],
        createdAt: new Date(2025, 3, 5).toISOString(),
        updatedAt: new Date(2025, 3, 5).toISOString()
      },
      {
        title: "App freezes on settings page",
        status: "Resolved",
        priority: "Medium",
        category: "Technical Support",
        description: "Every time I open the settings page, the app becomes unresponsive.",
        attachments: [],
        createdAt: new Date(2025, 3, 4).toISOString(),
        updatedAt: new Date(2025, 3, 6).toISOString()
      },
      {
        title: "Sound not working during video calls",
        status: "Open",
        priority: "High",
        category: "Technical Support",
        description: "Audio cuts out randomly during video calls on Android.",
        attachments: [],
        createdAt: new Date(2025, 3, 3).toISOString(),
        updatedAt: new Date(2025, 3, 3).toISOString()
      }
    ];
  
    tickets.forEach(ticket => server.create("ticket", ticket));
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

  return (
    <>
    <ThemeProvider>
      <MainPage/>
    </ThemeProvider>
    </>
  )
}

export default App
