-- Create initial categories
INSERT INTO categories (id, name, description, icon, color) VALUES
  ('cat_tools', 'Tools & Equipment', 'Power tools, hand tools, and equipment', 'wrench', '#10B981'),
  ('cat_electronics', 'Electronics', 'Cameras, computers, and electronic devices', 'smartphone', '#3B82F6'),
  ('cat_books', 'Books & Media', 'Books, movies, music, and educational materials', 'book-open', '#8B5CF6'),
  ('cat_clothing', 'Clothing', 'Clothes, shoes, and accessories', 'shirt', '#F59E0B'),
  ('cat_furniture', 'Furniture', 'Home and office furniture', 'armchair', '#EF4444'),
  ('cat_sports', 'Sports & Recreation', 'Sports equipment and recreational items', 'activity', '#06B6D4'),
  ('cat_skills', 'Skills & Services', 'Professional and personal services', 'user-check', '#84CC16'),
  ('cat_education', 'Education', 'Tutoring, lessons, and educational services', 'graduation-cap', '#F97316'),
  ('cat_food', 'Food & Garden', 'Fresh produce, plants, and garden items', 'apple', '#22C55E'),
  ('cat_household', 'Household Items', 'Kitchen appliances, home goods, and utilities', 'home', '#6366F1');

-- Create sample users
INSERT INTO users (id, email, username, name, bio, city, state, verified, rating, total_ratings) VALUES
  ('user_1', 'sarah@example.com', 'sarah_m', 'Sarah Martinez', 'Passionate about sustainable living and community building. Love sharing resources!', 'Portland', 'OR', true, 4.9, 23),
  ('user_2', 'david@example.com', 'david_k', 'David Kim', 'DIY enthusiast and tool collector. Happy to lend tools to neighbors.', 'Portland', 'OR', true, 4.8, 12),
  ('user_3', 'maria@example.com', 'maria_s', 'Maria Santos', 'Music teacher and guitar enthusiast. Offering lessons to the community.', 'Portland', 'OR', true, 5.0, 45),
  ('user_4', 'james@example.com', 'james_w', 'James Wilson', 'Math tutor with 10+ years experience. Love helping students succeed.', 'Portland', 'OR', true, 4.9, 67),
  ('user_5', 'emma@example.com', 'emma_d', 'Emma Davis', 'Book lover and librarian. Always happy to share great reads.', 'Portland', 'OR', true, 4.7, 18),
  ('user_6', 'alex@example.com', 'alex_c', 'Alex Chen', 'Professional photographer willing to share equipment and knowledge.', 'Portland', 'OR', true, 4.9, 34);

-- Create sample items
INSERT INTO items (id, title, description, condition, availability, type, user_id, category_id, city, state, created_at) VALUES
  ('item_1', 'Professional Camera Kit', 'Canon DSLR with multiple lenses, perfect for photography enthusiasts. Includes tripod and carrying case.', 'EXCELLENT', 'AVAILABLE', 'LEND', 'user_6', 'cat_electronics', 'Portland', 'OR', NOW() - INTERVAL '2 hours'),
  ('item_2', 'Power Drill Set', 'Complete cordless drill set with bits and carrying case. Perfect for home improvement projects.', 'GOOD', 'AVAILABLE', 'LEND', 'user_2', 'cat_tools', 'Portland', 'OR', NOW() - INTERVAL '6 hours'),
  ('item_3', 'Vintage Books Collection', 'Classic literature and rare books available for borrowing. Great for book clubs and students.', 'GOOD', 'AVAILABLE', 'LEND', 'user_5', 'cat_books', 'Portland', 'OR', NOW() - INTERVAL '2 days'),
  ('item_4', 'Organic Vegetables', 'Fresh vegetables from my garden - tomatoes, lettuce, herbs. Free for community members.', 'NEW', 'AVAILABLE', 'SHARE', 'user_1', 'cat_food', 'Portland', 'OR', NOW() - INTERVAL '1 day'),
  ('item_5', 'Camping Gear Set', 'Complete camping setup including tent, sleeping bags, and cooking equipment.', 'GOOD', 'AVAILABLE', 'LEND', 'user_2', 'cat_sports', 'Portland', 'OR', NOW() - INTERVAL '3 days'),
  ('item_6', 'Kitchen Stand Mixer', 'Professional-grade stand mixer, perfect for baking enthusiasts.', 'EXCELLENT', 'AVAILABLE', 'LEND', 'user_1', 'cat_household', 'Portland', 'OR', NOW() - INTERVAL '5 hours');

-- Create sample services
INSERT INTO services (id, title, description, price, duration, availability, user_id, category_id, city, state, created_at) VALUES
  ('service_1', 'Guitar Lessons', 'Beginner to intermediate guitar lessons. 15 years of teaching experience. Flexible scheduling available.', 25.00, 60, 'AVAILABLE', 'user_3', 'cat_skills', 'Portland', 'OR', NOW() - INTERVAL '4 hours'),
  ('service_2', 'Math Tutoring', 'High school and college level math tutoring. Specializing in algebra, calculus, and statistics.', 30.00, 60, 'AVAILABLE', 'user_4', 'cat_education', 'Portland', 'OR', NOW() - INTERVAL '1 day'),
  ('service_3', 'Photography Sessions', 'Professional portrait and event photography. Includes basic editing and digital delivery.', 150.00, 120, 'AVAILABLE', 'user_6', 'cat_skills', 'Portland', 'OR', NOW() - INTERVAL '3 days'),
  ('service_4', 'Home Repair Help', 'Basic home repairs, furniture assembly, and handyman services. Tools included.', 40.00, 60, 'AVAILABLE', 'user_2', 'cat_skills', 'Portland', 'OR', NOW() - INTERVAL '2 days'),
  ('service_5', 'Garden Consultation', 'Help planning and maintaining your garden. Specializing in organic and sustainable practices.', 35.00, 90, 'AVAILABLE', 'user_1', 'cat_skills', 'Portland', 'OR', NOW() - INTERVAL '6 hours');

-- Create sample events
INSERT INTO events (id, title, description, start_date, end_date, location, max_attendees, is_free, organizer_id, city, state, created_at) VALUES
  ('event_1', 'Community Garden Workday', 'Join us for a morning of planting, weeding, and harvesting in our community garden. All skill levels welcome! Tools and refreshments provided.', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '3 hours', 'Northpark Community Garden', 30, true, 'user_1', 'Portland', 'OR', NOW() - INTERVAL '1 day'),
  ('event_2', 'Skill Share Workshop: Basic Home Repairs', 'Learn essential home repair skills from experienced neighbors. Bring your questions and small projects! Materials provided.', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days' + INTERVAL '3 hours', 'Community Center - Room A', 20, true, 'user_2', 'Portland', 'OR', NOW() - INTERVAL '2 days'),
  ('event_3', 'Neighborhood Cleanup Day', 'Let''s work together to keep our neighborhood beautiful. Supplies provided, just bring your enthusiasm and work gloves!', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days' + INTERVAL '3 hours', 'Central Park Entrance', 60, true, 'user_1', 'Portland', 'OR', NOW() - INTERVAL '3 days'),
  ('event_4', 'Holiday Food Drive', 'Help us collect non-perishable food items for local families in need this holiday season. Every donation makes a difference.', NOW() + INTERVAL '9 days', NOW() + INTERVAL '9 days' + INTERVAL '8 hours', 'Multiple Drop-off Points', 100, true, 'user_4', 'Portland', 'OR', NOW() - INTERVAL '4 days'),
  ('event_5', 'Tech Help for Seniors', 'Volunteer to help senior community members with smartphones, tablets, and computers. Patience and kindness required!', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '3 hours', 'Senior Center', 15, true, 'user_6', 'Portland', 'OR', NOW() - INTERVAL '1 day'),
  ('event_6', 'Community Potluck Dinner', 'Bring a dish to share and meet your neighbors! A great way to build community connections and try new foods.', NOW() + INTERVAL '8 days', NOW() + INTERVAL '8 days' + INTERVAL '3 hours', 'Community Hall', 120, true, 'user_3', 'Portland', 'OR', NOW() - INTERVAL '2 days');

-- Create sample reviews
INSERT INTO reviews (id, rating, comment, author_id, target_id, item_id, created_at) VALUES
  ('review_1', 5, 'Amazing camera equipment! Alex was very helpful and the gear was in perfect condition. Highly recommend!', 'user_1', 'user_6', 'item_1', NOW() - INTERVAL '1 day'),
  ('review_2', 5, 'The drill set was exactly what I needed for my project. David was flexible with pickup time. Great neighbor!', 'user_3', 'user_2', 'item_2', NOW() - INTERVAL '3 days'),
  ('review_3', 4, 'Beautiful collection of books. Emma has great taste in literature. Will definitely borrow again!', 'user_4', 'user_5', 'item_3', NOW() - INTERVAL '5 days');

INSERT INTO reviews (id, rating, comment, author_id, target_id, service_id, created_at) VALUES
  ('review_4', 5, 'Maria is an excellent guitar teacher! Patient, knowledgeable, and makes learning fun. Highly recommend her lessons.', 'user_1', 'user_3', 'service_1', NOW() - INTERVAL '2 weeks'),
  ('review_5', 5, 'James helped me understand calculus concepts I''ve been struggling with. Great tutor and very patient!', 'user_2', 'user_4', 'service_2', NOW() - INTERVAL '1 week');

-- Create sample event attendees
INSERT INTO event_attendees (id, user_id, event_id, status, joined_at) VALUES
  ('attendee_1', 'user_2', 'event_1', 'REGISTERED', NOW() - INTERVAL '1 day'),
  ('attendee_2', 'user_3', 'event_1', 'REGISTERED', NOW() - INTERVAL '2 days'),
  ('attendee_3', 'user_4', 'event_1', 'REGISTERED', NOW() - INTERVAL '1 day'),
  ('attendee_4', 'user_5', 'event_2', 'REGISTERED', NOW() - INTERVAL '1 day'),
  ('attendee_5', 'user_6', 'event_2', 'REGISTERED', NOW() - INTERVAL '3 days'),
  ('attendee_6', 'user_1', 'event_5', 'REGISTERED', NOW() - INTERVAL '2 days'),
  ('attendee_7', 'user_2', 'event_6', 'REGISTERED', NOW() - INTERVAL '1 day'),
  ('attendee_8', 'user_5', 'event_6', 'REGISTERED', NOW() - INTERVAL '2 days');

-- Update user ratings based on reviews
UPDATE users SET 
  rating = (SELECT AVG(rating::numeric) FROM reviews WHERE target_id = users.id),
  total_ratings = (SELECT COUNT(*) FROM reviews WHERE target_id = users.id)
WHERE id IN (SELECT DISTINCT target_id FROM reviews);
