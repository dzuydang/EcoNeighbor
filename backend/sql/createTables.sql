-- =========================================
-- USERS (Residents, Authorities, Admins)
-- =========================================
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'resident',  -- 'resident', 'authority', or 'admin'
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- COMMUNITY REPORTS (Feature 1)
-- =========================================
CREATE TABLE IF NOT EXISTS reports (
    report_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    photo_url TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    is_verified BOOLEAN DEFAULT FALSE,
    forwarded_to_authority BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ALERTS (Feature 3)
-- =========================================
CREATE TABLE IF NOT EXISTS alerts (
    alert_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    severity VARCHAR(20),  -- e.g., Low, Medium, High, Critical
    category VARCHAR(50),  -- e.g., Air, Water, Waste, Fire
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE
);

-- =========================================
-- RECOMMENDATIONS (Feature 4)
-- =========================================
CREATE TABLE IF NOT EXISTS recommendations (
    rec_id SERIAL PRIMARY KEY,
    alert_id INT REFERENCES alerts(alert_id) ON DELETE CASCADE,
    title VARCHAR(100),
    advice TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- VERIFIED WASTE MANAGEMENT CENTERS (Feature 7)
-- =========================================
CREATE TABLE IF NOT EXISTS waste_centers (
    center_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    material_types TEXT,   -- e.g. "Plastic, Paper, Glass"
    contact_info VARCHAR(100),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    verified BOOLEAN DEFAULT TRUE
);

-- =========================================
-- COMMENTS (Feature 10 Simplified Discussion)
-- =========================================
CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    report_id INT REFERENCES reports(report_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    upvotes INT DEFAULT 0,
    flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);