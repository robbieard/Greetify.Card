-- Gift Card Database Schema for Vercel Postgres

CREATE TABLE IF NOT EXISTS cards (
  id VARCHAR(12) PRIMARY KEY,
  template_id VARCHAR(50) NOT NULL,
  recipient_name VARCHAR(255),
  sender_name VARCHAR(255),
  message TEXT,
  photo_url VARCHAR(500),
  photo2_url VARCHAR(500),
  music_track JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_paid BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_cards_created_at ON cards(created_at);
CREATE INDEX IF NOT EXISTS idx_cards_template_id ON cards(template_id);

-- Sample data (optional)
INSERT INTO cards (id, template_id, recipient_name, sender_name, message) 
VALUES ('sample123', 'birthday', 'John Doe', 'Jane Smith', 'Happy Birthday!')
ON CONFLICT (id) DO NOTHING;