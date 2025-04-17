const tickets = [
    {
      id: "TK-1001",
      title: "App crashes on login",
      status: "Open",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 14).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "The application crashes whenever I try to log in on my iPhone.",
      attachments: [],
      createdAt: new Date(2025, 3, 14).toISOString(),
      updatedAt: new Date(2025, 3, 14).toISOString()
    },
    {
      id: "TK-1002",
      title: "Login button not responsive",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 10).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 12).toISOString() }
      ],
      priority: "Medium",
      category: "Technical Support",
      description: "Clicking the login button does nothing on the web version.",
      attachments: [],
      createdAt: new Date(2025, 3, 10).toISOString(),
      updatedAt: new Date(2025, 3, 12).toISOString()
    },
    {
      id: "TK-1003",
      title: "Error 500 on dashboard",
      status: "Resolved",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 8).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 9).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 13).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "I'm getting a 500 server error when I open the dashboard after logging in.",
      attachments: [],
      createdAt: new Date(2025, 3, 8).toISOString(),
      updatedAt: new Date(2025, 3, 13).toISOString()
    },
    {
      id: "TK-1004",
      title: "Push notifications not working",
      status: "Closed",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 6).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 7).toISOString() },
        { status: "Closed", timestamp: new Date(2025, 3, 9).toISOString() }
      ],
      priority: "Low",
      category: "Technical Support",
      description: "Not receiving any push notifications even though they're enabled in settings.",
      attachments: [],
      createdAt: new Date(2025, 3, 5).toISOString(),
      updatedAt: new Date(2025, 3, 9).toISOString()
    },
    {
      id: "TK-1005",
      title: "App freezes on settings page",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 7).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 10).toISOString() }
      ],
      priority: "Medium",
      category: "Technical Support",
      description: "Every time I open the settings page, the app becomes unresponsive.",
      attachments: [],
      createdAt: new Date(2025, 3, 7).toISOString(),
      updatedAt: new Date(2025, 3, 10).toISOString()
    },
    {
      id: "TK-1006",
      title: "Billing information not saving",
      status: "Resolved",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 4).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 8).toISOString() }
      ],
      priority: "High",
      category: "Billing",
      description: "I can't update my credit card information. The system shows an error every time I try to save.",
      attachments: [],
      createdAt: new Date(2025, 3, 4).toISOString(),
      updatedAt: new Date(2025, 3, 8).toISOString()
    },
    {
      id: "TK-1007",
      title: "Password reset email never arrives",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 9).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 11).toISOString() }
      ],
      priority: "Medium",
      category: "Account Management",
      description: "I've requested a password reset multiple times but never receive the email.",
      attachments: [],
      createdAt: new Date(2025, 3, 9).toISOString(),
      updatedAt: new Date(2025, 3, 11).toISOString()
    },
    {
      id: "TK-1008",
      title: "Data export feature not working",
      status: "Closed",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 2).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 3).toISOString() },
        { status: "Resolved", timestamp: new Date(2025, 3, 5).toISOString() },
        { status: "Closed", timestamp: new Date(2025, 3, 7).toISOString() }
      ],
      priority: "Low",
      category: "Feature Request",
      description: "When I try to export my data to CSV, the download never starts.",
      attachments: [],
      createdAt: new Date(2025, 3, 2).toISOString(),
      updatedAt: new Date(2025, 3, 7).toISOString()
    },
    {
      id: "TK-1009",
      title: "Mobile app crashes on photo upload",
      status: "Open",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 13).toISOString() }
      ],
      priority: "High",
      category: "Technical Support",
      description: "The app crashes every time I try to upload a profile photo from my gallery.",
      attachments: [],
      createdAt: new Date(2025, 3, 13).toISOString(),
      updatedAt: new Date(2025, 3, 13).toISOString()
    },
    {
      id: "TK-1010",
      title: "Cannot connect third-party integrations",
      status: "InProgress",
      statusHistory: [
        { status: "Open", timestamp: new Date(2025, 3, 8).toISOString() },
        { status: "InProgress", timestamp: new Date(2025, 3, 10).toISOString() }
      ],
      priority: "Medium",
      category: "Integration",
      description: "I'm unable to connect my Google Drive account. The authorization process gets stuck.",
      attachments: [],
      createdAt: new Date(2025, 3, 8).toISOString(),
      updatedAt: new Date(2025, 3, 10).toISOString()
    }
  ];

export default tickets;