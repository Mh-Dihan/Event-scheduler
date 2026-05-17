export const events = [
  {
    id: 1,
    name: "Nusrat & Arif's Wedding",
    type: "Wedding",
    date: "2025-06-28",
    venue: "Senakunja, Dhaka Cantonment",
    client: "Nusrat Jahan & Arif Rahman",
    progress: 83,
    daysLeft: 3,
    color: "#6C5CE7",
    color2: "#a29bfe",
    bg: "linear-gradient(135deg, #faf8ff, #f0eeff)",
    initials: ["N", "A"],
    budget: 4500000,
    spent: 3735000,
    guests: 650,
  },
  {
    id: 2,
    name: "Uthshob Foundation Charity Gala",
    type: "Charity",
    date: "2025-07-07",
    venue: "Bangabandhu International Conference Center, Dhaka",
    client: "Uthshob Foundation",
    progress: 67,
    daysLeft: 12,
    color: "#00b894",
    color2: "#00cec9",
    bg: "linear-gradient(135deg, #f0fdf8, #e0faf3)",
    initials: ["U", "G"],
    budget: 3000000,
    spent: 2010000,
    guests: 420,
  },
  {
    id: 3,
    name: "Rafi's Birthday Party",
    type: "Birthday",
    date: "2025-07-13",
    venue: "Chef's Table Courtside, Dhaka",
    client: "Rafi Ahmed",
    progress: 48,
    daysLeft: 18,
    color: "#fd79a8",
    color2: "#e84393",
    bg: "linear-gradient(135deg, #fff5f8, #ffe8f1)",
    initials: ["R"],
    budget: 1200000,
    spent: 576000,
    guests: 120,
  },
  {
    id: 4,
    name: "Samira's Mehendi Night",
    type: "Other",
    date: "2025-07-20",
    venue: "The Palace Luxury Resort, Habiganj",
    client: "Samira Karim",
    progress: 32,
    daysLeft: 25,
    color: "#fdcb6e",
    color2: "#e17055",
    bg: "linear-gradient(135deg, #fffbf0, #fff5d6)",
    initials: ["S"],
    budget: 1800000,
    spent: 576000,
    guests: 250,
  },
];

export const tasks = [
  { id: 1, name: "Send final payment reminder", event: "Nusrat & Arif's Wedding", eventId: 1, priority: "high", done: false, due: "2025-06-25" },
  { id: 2, name: "Confirm seating plan updates", event: "Nusrat & Arif's Wedding", eventId: 1, priority: "high", done: false, due: "2025-06-25" },
  { id: 3, name: "Review guest list updates", event: "Uthshob Foundation Charity Gala", eventId: 2, priority: "medium", done: false, due: "2025-06-26" },
  { id: 4, name: "Confirm DJ and dhol booking", event: "Rafi's Birthday Party", eventId: 3, priority: "high", done: false, due: "2025-06-27" },
  { id: 5, name: "Book venue walkthrough", event: "Samira's Mehendi Night", eventId: 4, priority: "low", done: true, due: "2025-06-20" },
  { id: 6, name: "Send invitations", event: "Nusrat & Arif's Wedding", eventId: 1, priority: "low", done: true, due: "2025-06-18" },
  { id: 7, name: "Finalize kacchi and dessert menu", event: "Uthshob Foundation Charity Gala", eventId: 2, priority: "medium", done: false, due: "2025-06-28" },
  { id: 8, name: "Order floral stage decor", event: "Rafi's Birthday Party", eventId: 3, priority: "medium", done: true, due: "2025-06-22" },
  { id: 9, name: "Review vendor contracts", event: "Samira's Mehendi Night", eventId: 4, priority: "high", done: false, due: "2025-06-29" },
  { id: 10, name: "Set up photo booth", event: "Nusrat & Arif's Wedding", eventId: 1, priority: "low", done: false, due: "2025-06-27" },
  { id: 11, name: "Confirm transport arrangements", event: "Uthshob Foundation Charity Gala", eventId: 2, priority: "medium", done: false, due: "2025-07-01" },
  { id: 12, name: "Create event timeline", event: "Rafi's Birthday Party", eventId: 3, priority: "high", done: false, due: "2025-06-30" },
];

export const meetings = [
  { id: 1, title: "Seating Plan Approval Meeting", time: "10:00 AM - 10:30 AM", client: "Venue Coordinator - Farhana Chowdhury", type: "video", event: "Nusrat & Arif's Wedding", color: "#e8f5e9" },
  { id: 2, title: "Initial Planning Call for Samira's Mehendi Night", time: "10:45 AM - 11:15 AM", client: "Client - Samira Karim", type: "call", event: "Samira's Mehendi Night", color: "#fce4ec" },
  { id: 3, title: "Vendor Review Call", time: "2:00 PM - 2:45 PM", client: "Vendor - Gulshan Decor Studio", type: "video", event: "Uthshob Foundation Charity Gala", color: "#e3f2fd" },
  { id: 4, title: "Catering Tasting Session", time: "3:30 PM - 4:30 PM", client: "Kacchi Bhai Catering", type: "in-person", event: "Nusrat & Arif's Wedding", color: "#fff3e0" },
  { id: 5, title: "Budget Review", time: "5:00 PM - 5:30 PM", client: "Client - Rafi Ahmed", type: "call", event: "Rafi's Birthday Party", color: "#ede7f6" },
];

export const vendors = [
  { id: 1, name: "Gulshan Decor Studio", category: "Florals & Decor", status: "Active", contact: "Nabila Hossain", email: "nabila@gulshandecor.bd", phone: "+880 1711-019200", events: ["Nusrat & Arif's Wedding", "Uthshob Foundation Charity Gala"], rating: 4.8 },
  { id: 2, name: "Dhaka Beats", category: "DJ / Music", status: "Pending", contact: "Hasan Mahmud", email: "hasan@dhakabeats.bd", phone: "+880 1711-018400", events: ["Rafi's Birthday Party"], rating: 4.5 },
  { id: 3, name: "Chhobi Studio", category: "Photography", status: "Reply Pending", contact: "Jannatul Ferdous", email: "jannat@chhobistudio.bd", phone: "+880 1711-017600", events: ["Uthshob Foundation Charity Gala"], rating: 4.9 },
  { id: 4, name: "Kacchi Bhai Catering", category: "Catering", status: "Confirmed", contact: "Chef Mamun", email: "mamun@kacchibhai.bd", phone: "+880 1711-016800", events: ["Nusrat & Arif's Wedding", "Samira's Mehendi Night"], rating: 4.7 },
  { id: 5, name: "Shohoz Transport", category: "Transportation", status: "Active", contact: "Tanvir Islam", email: "tanvir@shohoztransport.bd", phone: "+880 1711-016000", events: ["Uthshob Foundation Charity Gala"], rating: 4.3 },
  { id: 6, name: "Projukti AV", category: "Audio/Visual", status: "Confirmed", contact: "Mahin Sultana", email: "mahin@projuktiav.bd", phone: "+880 1711-015200", events: ["Nusrat & Arif's Wedding", "Rafi's Birthday Party"], rating: 4.6 },
];

export const templates = [
  { id: 1, name: "Event Budget Tracker", tag: "Finance", desc: "Track and manage expenses across key categories.", icon: "$" },
  { id: 2, name: "Guest Seating Plan", tag: "Guest Management", desc: "Plan guest seating with drag & drop layout.", icon: "S" },
  { id: 3, name: "Vendor Onboarding Checklist", tag: "Vendors", desc: "Step-by-step tasks to onboard new vendors efficiently.", icon: "OK" },
  { id: 4, name: "RSVP Tracker", tag: "Guest Management", desc: "Track guest responses, meal choices & special notes.", icon: "R" },
  { id: 5, name: "Timeline Planner", tag: "Planning", desc: "Visual day-of timeline for events and ceremonies.", icon: "T" },
  { id: 6, name: "Vendor Contract Checklist", tag: "Legal", desc: "Ensure all vendor agreements are signed and filed.", icon: "C" },
  { id: 7, name: "Social Media Plan", tag: "Marketing", desc: "Schedule posts and manage event social content.", icon: "M" },
  { id: 8, name: "Run of Show", tag: "Operations", desc: "Minute-by-minute event execution guide.", icon: "RS" },
];

export const payments = [
  { id: 1, desc: "Nusrat & Arif's Wedding - Venue deposit", amount: 1500000, status: "paid", date: "2025-06-20", event: "Nusrat & Arif's Wedding" },
  { id: 2, desc: "Uthshob Foundation Charity Gala - Catering", amount: 820000, status: "paid", date: "2025-06-18", event: "Uthshob Foundation Charity Gala" },
  { id: 3, desc: "Rafi's Birthday Party - DJ deposit", amount: 120000, status: "pending", date: "2025-06-22", event: "Rafi's Birthday Party" },
  { id: 4, desc: "Nabila Hossain - Dessert table (Declined)", amount: 150000, status: "declined", date: "2025-06-22", event: "Nusrat & Arif's Wedding" },
  { id: 5, desc: "Samira's Mehendi Night - Venue booking", amount: 350000, status: "paid", date: "2025-06-19", event: "Samira's Mehendi Night" },
  { id: 6, desc: "Gulshan Decor Studio - Floral arrangement", amount: 480000, status: "paid", date: "2025-06-17", event: "Nusrat & Arif's Wedding" },
  { id: 7, desc: "Chhobi Studio - Deposit", amount: 200000, status: "pending", date: "2025-06-24", event: "Uthshob Foundation Charity Gala" },
  { id: 8, desc: "Projukti AV - Equipment", amount: 320000, status: "paid", date: "2025-06-15", event: "Nusrat & Arif's Wedding" },
];

export const alerts = [
  { id: 1, type: "success", message: "Seating plan needs approval for", link: "Uthshob Foundation Charity Gala" },
  { id: 2, type: "error", message: "Nabila Hossain's payment was declined for", link: "Nusrat & Arif's Wedding", extra: "(Dessert table)" },
  { id: 3, type: "error", message: "DJ not confirmed", link: "Rafi's Birthday Party" },
  { id: 4, type: "error", message: "Photo vendor reply pending", link: "Uthshob Foundation Charity Gala" },
];

export const inboxMessages = [
  { id: 1, from: "Farhana Chowdhury", subject: "Seating plan approved!", preview: "Hi Dihan, I've reviewed the seating plan and everything looks great...", time: "10:32 AM", unread: true, tag: "Wedding" },
  { id: 2, from: "Payment Gateway", subject: "Payment Declined - Nabila Hossain", preview: "We were unable to process the payment of BDT 150,000 for the dessert table...", time: "9:15 AM", unread: true, tag: "Alert" },
  { id: 3, from: "Samira Karim", subject: "Confirmed mehendi night date", preview: "Hi! Just wanted to confirm that July 20th works perfectly for us...", time: "Yesterday", unread: false, tag: "Mehendi" },
  { id: 4, from: "Chhobi Studio", subject: "Quote request follow-up", preview: "Hi, I wanted to follow up on the quote I sent last week for the charity gala...", time: "Yesterday", unread: false, tag: "Vendor" },
  { id: 5, from: "Chef Mamun", subject: "Menu options for Nusrat's wedding", preview: "Dear Dihan, I've put together three menu options for you to review...", time: "2 days ago", unread: false, tag: "Wedding" },
  { id: 6, from: "Rafi Ahmed", subject: "Birthday party headcount update", preview: "Hey Dihan! Quick update - we're now expecting around 120 guests instead of 100...", time: "2 days ago", unread: false, tag: "Birthday" },
];

export const integrations = [
  { id: 1, name: "Google Calendar", icon: "CAL", desc: "Sync events and meetings", status: "connected" },
  { id: 2, name: "Stripe", icon: "PAY", desc: "Process payments seamlessly", status: "connected" },
  { id: 3, name: "Slack", icon: "MSG", desc: "Get team notifications", status: "pending" },
  { id: 4, name: "Zoom", icon: "VID", desc: "Schedule video meetings", status: "pending" },
  { id: 5, name: "Gmail", icon: "MAIL", desc: "Send and manage emails", status: "pending" },
  { id: 6, name: "Notion", icon: "DOC", desc: "Sync notes and docs", status: "pending" },
  { id: 7, name: "QuickBooks", icon: "ACC", desc: "Accounting integration", status: "pending" },
  { id: 8, name: "Mailchimp", icon: "MKT", desc: "Email marketing campaigns", status: "pending" },
];
