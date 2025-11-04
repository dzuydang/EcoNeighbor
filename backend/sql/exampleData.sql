-- AI was used to create example data, which will be used for testing purposes 

INSERT INTO users (full_name, email, password_hash, role, location)
VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword1', 'resident', 'Maple Street, Springfield'),
('Bob Smith', 'bob@example.com', 'hashedpassword2', 'authority', 'Downtown Office, Springfield'),
('Carol Lee', 'carol@example.com', 'hashedpassword3', 'admin', 'City Hall, Springfield'),
('David Nguyen', 'david@example.com', 'hashedpassword4', 'resident', 'Oak Avenue, Springfield'),
('Ella Martinez', 'ella@example.com', 'hashedpassword5', 'resident', 'Pine Road, Springfield');

INSERT INTO reports (user_id, title, description, photo_url, latitude, longitude, is_verified, forwarded_to_authority)
VALUES
(1, 'Overflowing Garbage Bin', 'Trash bin near Maple Park is full and attracting pests.', 'https://example.com/photos/bin1.jpg', 37.7749, -122.4194, FALSE, FALSE),
(2, 'Broken Streetlight', 'Streetlight near Main St. and 3rd Ave has been out for a week.', 'https://example.com/photos/streetlight.jpg', 37.7755, -122.4180, TRUE, TRUE),
(1, 'Graffiti on Wall', 'Graffiti found on the north wall of the community center.', NULL, 37.7730, -122.4212, FALSE, FALSE),
(4, 'Pothole on Oak Ave', 'Large pothole causing traffic slowdown near Oak and 5th.', 'https://example.com/photos/pothole.jpg', 37.7762, -122.4178, TRUE, FALSE),
(5, 'Illegal Dumping', 'Someone dumped old furniture behind Pine Plaza last night.', NULL, 37.7780, -122.4165, FALSE, TRUE);

INSERT INTO recommendations (report_id, title, advice)
VALUES
(1, 'Schedule Regular Waste Collection', 'Coordinate with the sanitation department to increase trash pickup frequency.'),
(2, 'Repair Streetlight', 'Submit a maintenance ticket to the public works team for immediate repair.'),
(3, 'Community Cleanup', 'Organize a weekend cleanup event and supply paint to cover graffiti.'),
(4, 'Road Maintenance', 'Notify transportation authorities to fill and resurface the pothole.'),
(5, 'Increase Surveillance', 'Install cameras behind Pine Plaza to deter illegal dumping.');

INSERT INTO waste_centers (name, address, material_types, contact_info, latitude, longitude, verified)
VALUES
('Springfield Recycling Center', '123 Greenway Blvd, Springfield', 'Plastic, Paper, Glass, Metal', '555-1234', 37.7741, -122.4196, TRUE),
('EcoDrop Station', '45 Elm St, Springfield', 'Electronics, Batteries', '555-5678', 37.7768, -122.4185, TRUE),
('City Compost Hub', '78 Garden Rd, Springfield', 'Organic Waste, Yard Waste', '555-9012', 37.7725, -122.4203, TRUE),
('Hazard Disposal Depot', '12 Safety Ln, Springfield', 'Chemicals, Paint, Oil', '555-3456', 37.7752, -122.4171, TRUE),
('Pine Plaza Recycling Point', '88 Pine Rd, Springfield', 'Plastic, Cardboard', '555-7890', 37.7783, -122.4162, TRUE);

INSERT INTO comments (report_id, user_id, content, upvotes, flagged)
VALUES
(1, 2, 'Thanks for reporting this! We will send a cleaning crew.', 5, FALSE),
(1, 4, 'I noticed this too near the park entrance.', 3, FALSE),
(2, 1, 'This light has been out for over a week. Dangerous for pedestrians!', 4, FALSE),
(3, 5, 'Maybe we can organize a mural project to replace the graffiti.', 2, FALSE),
(5, 3, 'Forwarded to waste management — thanks for the heads up.', 7, FALSE);
