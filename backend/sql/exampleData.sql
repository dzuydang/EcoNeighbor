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
(5, 'Illegal Dumping', 'Someone dumped old furniture behind Pine Plaza last night.', NULL, 37.7780, -122.4200, FALSE, TRUE);
