CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  firm_name TEXT NOT NULL,
  gst_no TEXT,
  contact_no TEXT NOT NULL,
  email TEXT,
  city TEXT,
  state TEXT,
  category TEXT,
  preferred_desk TEXT,
  notes TEXT,
  page TEXT,
  referrer TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'New',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_contact ON enquiries(contact_no);
CREATE INDEX IF NOT EXISTS idx_enquiries_timestamp ON enquiries(timestamp);
CREATE INDEX IF NOT EXISTS idx_enquiries_state ON enquiries(state);
