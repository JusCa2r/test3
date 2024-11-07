CREATE TABLE IF NOT EXISTS "action_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"action_id" integer,
	"ip_address" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_creators" (
	"id" integer PRIMARY KEY NOT NULL,
	"twitch_account" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deliverable_revisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"deliverable_id" integer,
	"revision_number" integer,
	"note" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deliverables" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"template_id" integer,
	"title" varchar(50),
	"description" text,
	"max_revisions" integer,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "editor_selection_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50),
	CONSTRAINT "editor_selection_methods_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "escrow" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_pricing_id" integer,
	"amount" numeric NOT NULL,
	"escrow_status_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"last_updated" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "escrow_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50) NOT NULL,
	CONSTRAINT "escrow_statuses_status_name_unique" UNIQUE("status_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_offers_id" integer NOT NULL,
	"offered_by" integer NOT NULL,
	"offer_amount" numeric NOT NULL,
	"offer_message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parameter_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"default_value" text,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50) NOT NULL,
	CONSTRAINT "payment_statuses_status_name_unique" UNIQUE("status_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_pricing_id" integer,
	"amount" numeric NOT NULL,
	"transaction_type" text,
	"payment_status_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_editor_id" integer,
	"plan_name" varchar(50),
	"description" text,
	"price" numeric,
	"delivery_time" varchar,
	"features" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" integer PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"displayed_name" varchar(50) NOT NULL,
	"description" text,
	"profile_picture_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_example_associations" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"project_example" text,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_formats" (
	"id" serial PRIMARY KEY NOT NULL,
	"format_name" varchar(50) NOT NULL,
	"description" text,
	"project_type_pricing_id" integer,
	"slug" varchar(50) NOT NULL,
	CONSTRAINT "project_formats_format_name_unique" UNIQUE("format_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"title" varchar(50),
	"description" text,
	"deliverable_count" integer,
	"estimated_delivery_time" integer,
	"set_price" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"initiated_by" integer NOT NULL,
	"current_offer" numeric,
	"custom_offer_status_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"initial_price" numeric,
	"final_price" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_pricing_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"description" text,
	"slug" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_status_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"status_id" integer,
	"changed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50) NOT NULL,
	CONSTRAINT "project_statuses_status_name_unique" UNIQUE("status_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_creator_id" integer NOT NULL,
	"video_editor_id" integer,
	"editor_selection_method_id" integer NOT NULL,
	"quality_id" integer NOT NULL,
	"format_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quality_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"quality_name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50),
	CONSTRAINT "quality_levels_quality_name_unique" UNIQUE("quality_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ranks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_creator_id" integer,
	"video_editor_id" integer,
	"rating" integer,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "template_parameters" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer,
	"parameter_type_id" integer,
	"name" varchar(50) NOT NULL,
	"value" text,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"content_creator_id" integer,
	"is_predefined" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tiktok_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_creator_id" integer,
	"tiktok_account_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_favorites" (
	"id" serial NOT NULL,
	"video_editor_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"uuid" uuid,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"last_updated" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_editors" (
	"id" integer PRIMARY KEY NOT NULL,
	"portfolio_link" text,
	"favorite_count" integer,
	"available" boolean,
	"experience_points" integer DEFAULT 0,
	"rank_id" integer,
	"reviews_visible" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "youtube_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_creator_id" integer,
	"youtube_account_url" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_action_id_action_types_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."action_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content_creators" ADD CONSTRAINT "content_creators_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deliverable_revisions" ADD CONSTRAINT "deliverable_revisions_deliverable_id_deliverables_id_fk" FOREIGN KEY ("deliverable_id") REFERENCES "public"."deliverables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deliverables" ADD CONSTRAINT "deliverables_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deliverables" ADD CONSTRAINT "deliverables_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "escrow" ADD CONSTRAINT "escrow_project_pricing_id_project_pricing_id_fk" FOREIGN KEY ("project_pricing_id") REFERENCES "public"."project_pricing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "escrow" ADD CONSTRAINT "escrow_escrow_status_id_escrow_statuses_id_fk" FOREIGN KEY ("escrow_status_id") REFERENCES "public"."escrow_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers" ADD CONSTRAINT "offers_project_offers_id_project_offers_id_fk" FOREIGN KEY ("project_offers_id") REFERENCES "public"."project_offers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers" ADD CONSTRAINT "offers_offered_by_video_editors_id_fk" FOREIGN KEY ("offered_by") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_project_pricing_id_project_pricing_id_fk" FOREIGN KEY ("project_pricing_id") REFERENCES "public"."project_pricing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_status_id_payment_statuses_id_fk" FOREIGN KEY ("payment_status_id") REFERENCES "public"."payment_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans" ADD CONSTRAINT "plans_video_editor_id_video_editors_id_fk" FOREIGN KEY ("video_editor_id") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_example_associations" ADD CONSTRAINT "project_example_associations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_formats" ADD CONSTRAINT "project_formats_project_type_pricing_id_project_pricing_type_id_fk" FOREIGN KEY ("project_type_pricing_id") REFERENCES "public"."project_pricing_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_metadata" ADD CONSTRAINT "project_metadata_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_offers" ADD CONSTRAINT "project_offers_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_offers" ADD CONSTRAINT "project_offers_initiated_by_video_editors_id_fk" FOREIGN KEY ("initiated_by") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_offers" ADD CONSTRAINT "project_offers_custom_offer_status_id_offer_status_id_fk" FOREIGN KEY ("custom_offer_status_id") REFERENCES "public"."offer_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_pricing" ADD CONSTRAINT "project_pricing_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_status_history" ADD CONSTRAINT "project_status_history_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_status_history" ADD CONSTRAINT "project_status_history_status_id_project_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."project_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_content_creator_id_content_creators_id_fk" FOREIGN KEY ("content_creator_id") REFERENCES "public"."content_creators"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_video_editor_id_video_editors_id_fk" FOREIGN KEY ("video_editor_id") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_editor_selection_method_id_editor_selection_methods_id_fk" FOREIGN KEY ("editor_selection_method_id") REFERENCES "public"."editor_selection_methods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_quality_id_quality_levels_id_fk" FOREIGN KEY ("quality_id") REFERENCES "public"."quality_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_format_id_project_formats_id_fk" FOREIGN KEY ("format_id") REFERENCES "public"."project_formats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_content_creator_id_content_creators_id_fk" FOREIGN KEY ("content_creator_id") REFERENCES "public"."content_creators"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_video_editor_id_video_editors_id_fk" FOREIGN KEY ("video_editor_id") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "template_parameters" ADD CONSTRAINT "template_parameters_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "template_parameters" ADD CONSTRAINT "template_parameters_parameter_type_id_parameter_types_id_fk" FOREIGN KEY ("parameter_type_id") REFERENCES "public"."parameter_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templates" ADD CONSTRAINT "templates_content_creator_id_content_creators_id_fk" FOREIGN KEY ("content_creator_id") REFERENCES "public"."content_creators"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tiktok_accounts" ADD CONSTRAINT "tiktok_accounts_content_creator_id_content_creators_id_fk" FOREIGN KEY ("content_creator_id") REFERENCES "public"."content_creators"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_video_editor_id_video_editors_id_fk" FOREIGN KEY ("video_editor_id") REFERENCES "public"."video_editors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_editors" ADD CONSTRAINT "video_editors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_editors" ADD CONSTRAINT "video_editors_rank_id_ranks_id_fk" FOREIGN KEY ("rank_id") REFERENCES "public"."ranks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "youtube_accounts" ADD CONSTRAINT "youtube_accounts_content_creator_id_content_creators_id_fk" FOREIGN KEY ("content_creator_id") REFERENCES "public"."content_creators"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
