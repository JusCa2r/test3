-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    uuid UUID UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ranks table
CREATE TABLE ranks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Content Creators table
CREATE TABLE content_creators (
    id INTEGER PRIMARY KEY,
    twitch_account TEXT,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Video Editors table
CREATE TABLE video_editors (
    id INTEGER PRIMARY KEY,
    portfolio_link TEXT,
    favorite_count INTEGER,
    available BOOLEAN,
    experience_points INTEGER DEFAULT 0,
    rank_id INTEGER,
    reviews_visible BOOLEAN DEFAULT false,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (rank_id) REFERENCES ranks(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- YouTube Accounts table
CREATE TABLE youtube_accounts (
    id SERIAL PRIMARY KEY,
    content_creator_id INTEGER,
    youtube_account_url TEXT NOT NULL,
    FOREIGN KEY (content_creator_id) REFERENCES content_creators(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TikTok Accounts table
CREATE TABLE tiktok_accounts (
    id SERIAL PRIMARY KEY,
    content_creator_id INTEGER,
    tiktok_account_url TEXT NOT NULL,
    FOREIGN KEY (content_creator_id) REFERENCES content_creators(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Profiles table
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    displayed_name VARCHAR(50) NOT NULL,
    description TEXT,
    profile_picture_url TEXT,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Action Types table
CREATE TABLE action_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL
);

-- Activity Logs table
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action_id INTEGER,
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (action_id) REFERENCES action_types(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Editor Selection Methods table
CREATE TABLE editor_selection_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(50)
);

-- Quality Levels table
CREATE TABLE quality_levels (
    id SERIAL PRIMARY KEY,
    quality_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(50)
);

-- Project Pricing Types table
CREATE TABLE project_pricing_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Project Formats table
CREATE TABLE project_formats (
    id SERIAL PRIMARY KEY,
    format_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    project_type_pricing_id INTEGER,
    slug VARCHAR(50) NOT NULL,
    FOREIGN KEY (project_type_pricing_id) REFERENCES project_pricing_type(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    content_creator_id INTEGER NOT NULL,
    video_editor_id INTEGER,
    editor_selection_method_id INTEGER NOT NULL,
    quality_id INTEGER NOT NULL,
    format_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_creator_id) REFERENCES content_creators(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (video_editor_id) REFERENCES video_editors(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (editor_selection_method_id) REFERENCES editor_selection_methods(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (quality_id) REFERENCES quality_levels(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (format_id) REFERENCES project_formats(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Project Metadata table
CREATE TABLE project_metadata (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    title VARCHAR(50),
    description TEXT,
    deliverable_count INTEGER,
    estimated_delivery_time INTEGER,
    set_price DECIMAL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Project Statuses table
CREATE TABLE project_statuses (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Project Status History table
CREATE TABLE project_status_history (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    status_id INTEGER,
    changed_at TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (status_id) REFERENCES project_statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Offer Status table
CREATE TABLE offer_status (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Project Offers table
CREATE TABLE project_offers (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    initiated_by INTEGER NOT NULL,
    current_offer DECIMAL,
    custom_offer_status_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (initiated_by) REFERENCES video_editors(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (custom_offer_status_id) REFERENCES offer_status(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Offers table
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    project_offers_id INTEGER NOT NULL,
    offered_by INTEGER NOT NULL,
    offer_amount DECIMAL NOT NULL,
    offer_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_offers_id) REFERENCES project_offers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (offered_by) REFERENCES video_editors(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Project Pricing table
CREATE TABLE project_pricing (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    initial_price DECIMAL,
    final_price DECIMAL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Escrow Statuses table
CREATE TABLE escrow_statuses (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Escrow table
CREATE TABLE escrow (
    id SERIAL PRIMARY KEY,
    project_pricing_id INTEGER,
    amount DECIMAL NOT NULL,
    escrow_status_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP,
    FOREIGN KEY (project_pricing_id) REFERENCES project_pricing(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (escrow_status_id) REFERENCES escrow_statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Payment Statuses table
CREATE TABLE payment_statuses (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(50) NOT NULL
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    project_pricing_id INTEGER,
    amount DECIMAL NOT NULL,
    transaction_type TEXT,
    payment_status_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_pricing_id) REFERENCES project_pricing(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_status_id) REFERENCES payment_statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    content_creator_id INTEGER,
    video_editor_id INTEGER,
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_creator_id) REFERENCES content_creators(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (video_editor_id) REFERENCES video_editors(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- User Favorites table
CREATE TABLE user_favorites (
    id SERIAL,
    video_editor_id INTEGER,
    FOREIGN KEY (video_editor_id) REFERENCES video_editors(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Plans table
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    video_editor_id INTEGER,
    plan_name VARCHAR(50),
    description TEXT,
    price DECIMAL,
    delivery_time VARCHAR(50),
    features TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (video_editor_id) REFERENCES video_editors(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Templates table
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    content_creator_id INTEGER,
    is_predefined BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (content_creator_id) REFERENCES content_creators(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Deliverables table
CREATE TABLE deliverables (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    template_id INTEGER,
    title VARCHAR(50),
    description TEXT,
    max_revisions INTEGER,
    note TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Deliverable Revisions table
CREATE TABLE deliverable_revisions (
    id SERIAL PRIMARY KEY,
    deliverable_id INTEGER,
    revision_number INTEGER,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deliverable_id) REFERENCES deliverables(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Parameter Types table
CREATE TABLE parameter_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    default_value TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Template Parameters table
CREATE TABLE template_parameters (
    id SERIAL PRIMARY KEY,
    template_id INTEGER,
    parameter_type_id INTEGER,
    name VARCHAR(50) NOT NULL,
    value TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (parameter_type_id) REFERENCES parameter_types(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Project Example Associations table
CREATE TABLE project_example_associations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    project_example TEXT,
    note TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
);