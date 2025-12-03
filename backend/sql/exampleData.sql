-- AI was used to create example data, which will be used for testing purposes 

INSERT INTO users (full_name, email, password_hash, role, location)
VALUES
('Jyothi Shankar', 'jyothi.shankar@sjsu.edu', 'hashedpassword1', 'resident', 'Maple Street, Springfield'),
('Dzuy Dang', 'dzuy.dang@sjsu.edu', 'hashedpassword2', 'authority', 'Downtown Office, Springfield'),
('Hayden Tu', 'hayden.tu@sjsu.edu', 'hashedpassword3', 'admin', 'City Hall, Springfield');

INSERT INTO reports (user_id, title, description, photo_url, latitude, longitude, is_verified, forwarded_to_authority)
VALUES
(1, 'Overflowing Garbage Bin', 'Trash bin near Maple Park is full and attracting pests.', '/images/trash-can.jpg', 37.7749, -122.4194, FALSE, FALSE),
(2, 'Broken Streetlight', 'Streetlight near Main St. and 3rd Ave has been out for a week.', '/images/faulty-streetlights.jpg', 37.7755, -122.4180, TRUE, TRUE),
(1, 'Graffiti on Wall', 'Graffiti found on the north wall of the community center.', NULL, 37.7730, -122.4212, FALSE, FALSE),
(2, 'Pothole on Oak Ave', 'Large pothole causing traffic slowdown near Oak and 5th.', '/images/potholes.jpg', 37.7762, -122.4178, FALSE, FALSE),
(3, 'Illegal Dumping', 'Someone dumped old furniture behind Pine Plaza last night.', NULL, 37.7780, -122.4165, FALSE, FALSE),
(3, 'Leaking Fire Hydrant', 'Water is leaking steadily from the base of the hydrant on Elm St.', '/images/firehydrant.png', 37.7724, -122.4201, FALSE, FALSE),
(2, 'Damaged Bench', 'Park bench near the playground has a broken wooden plank.', NULL, 37.7718, -122.4220, FALSE, FALSE),
(1, 'Blocked Drain', 'Storm drain on 9th Ave is clogged with leaves and debris.', '/images/blocked_drains.png', 37.7743, -122.4187, FALSE, FALSE),
(2, 'Fallen Tree Branch', 'Large branch fell across the sidewalk after strong winds.', '/images/tree_branch.png', 37.7758, -122.4199, TRUE, TRUE),
(3, 'Abandoned Vehicle', 'A car has been left unmoved for over a week near Cedar St.', NULL, 37.7765, -122.4215, FALSE, FALSE),
(2, 'Noise Complaint', 'Loud machinery noise coming from construction site late at night.', NULL, 37.7771, -122.4173, FALSE, FALSE),
(1, 'Vandalized Bus Stop', 'Glass panel shattered at the bus stop near 12th and Market.', '/images/bus_shelter.png', 37.7739, -122.4158, FALSE, FALSE),
(2, 'Water Main Break', 'Significant water pooling on the street due to pipe burst.', NULL, 37.7727, -122.4169, TRUE, TRUE);

INSERT INTO waste_centers 
(name, address, material_types, contact_info, latitude, longitude, verified, about)
VALUES
('Springfield Recycling Center', 
 '123 Greenway Blvd, Springfield', 
 'Plastic, Paper, Glass, Metal', 
 '555-1234', 
 37.7741, 
 -122.4196, 
 TRUE, 
 'A full-service recycling facility handling common household recyclables such as plastic, paper, glass, and metal.'),

('EcoDrop Station', 
 '45 Elm St, Springfield', 
 'Electronics, Batteries', 
 '555-5678', 
 37.7768, 
 -122.4185, 
 TRUE, 
 'Specializes in safe disposal and recycling of electronic waste and batteries.'),

('City Compost Hub', 
 '78 Garden Rd, Springfield', 
 'Organic Waste, Yard Waste', 
 '555-9012', 
 37.7725, 
 -122.4203, 
 TRUE, 
 'Community composting site accepting organic and yard waste for local compost production.'),

('Hazard Disposal Depot', 
 '12 Safety Ln, Springfield', 
 'Chemicals, Paint, Oil', 
 '555-3456', 
 37.7752, 
 -122.4171, 
 TRUE, 
 'Dedicated to the safe disposal of household hazardous materials such as paint, chemicals, and oils.'),

('Pine Plaza Recycling Point', 
 '88 Pine Rd, Springfield', 
 'Plastic, Cardboard', 
 '555-7890', 
 37.7783, 
 -122.4162, 
 TRUE, 
 'Convenient drop-off location for recyclable plastic and cardboard materials.');

INSERT INTO comments (report_id, user_id, content, upvotes, flagged)
VALUES
(1, 2, 'Thanks for reporting this! We will send a cleaning crew.', 5, FALSE),
(1, 3, 'I noticed this too near the park entrance.', 3, FALSE),
(2, 1, 'This light has been out for over a week. Dangerous for pedestrians!', 4, FALSE),
(3, 2, 'Maybe we can organize a mural project to replace the graffiti.', 2, FALSE),
(5, 3, 'Forwarded to waste management — thanks for the heads up.', 7, FALSE);
