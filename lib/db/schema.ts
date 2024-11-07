import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  uuid: uuid('uuid').unique().default('gen_random_uuid()'),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
  lastUpdated: timestamp('last_updated'),
});

// Content Creators
export const contentCreators = pgTable('content_creators', {
  id: integer('id').primaryKey().references(() => users.id),
  twitchAccount: text('twitch_account'),
});

// Video Editors
export const videoEditors = pgTable('video_editors', {
  id: integer('id').primaryKey().references(() => users.id),
  portfolioLink: text('portfolio_link'),
  favoriteCount: integer('favorite_count'),
  available: boolean('available'),
  experiencePoints: integer('experience_points').default(0),
  rankId: integer('rank_id').references(() => ranks.id),
  reviewsVisible: boolean('reviews_visible').default(false),
});

// Ranks
export const ranks = pgTable('ranks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// YouTube Accounts
export const youtubeAccounts = pgTable('youtube_accounts', {
  id: serial('id').primaryKey(),
  contentCreatorId: integer('content_creator_id').references(() => contentCreators.id),
  youtubeAccountUrl: text('youtube_account_url').notNull(),
});

// TikTok Accounts
export const tiktokAccounts = pgTable('tiktok_accounts', {
  id: serial('id').primaryKey(),
  contentCreatorId: integer('content_creator_id').references(() => contentCreators.id),
  tiktokAccountUrl: text('tiktok_account_url').notNull(),
});

// Profiles
export const profiles = pgTable('profiles', {
  id: integer('id').primaryKey().references(() => users.id),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  displayedName: varchar('displayed_name', { length: 50 }).notNull(),
  description: text('description'),
  profilePictureUrl: text('profile_picture_url'),
});

// Activity Logs
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  actionId: integer('action_id').references(() => actionTypes.id ),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Action Types
export const actionTypes = pgTable('action_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  contentCreatorId: integer('content_creator_id').references(() => contentCreators.id).notNull(),
  videoEditorId: integer('video_editor_id').references(() => videoEditors.id),
  editorSelectionMethodId: integer('editor_selection_method_id').references(() => editorSelectionMethods.id).notNull(),
  qualityId: integer('quality_id').references(() => qualityLevels.id).notNull(),
  formatId: integer('format_id').references(() => projectFormats.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Editor Selection Methods
export const editorSelectionMethods = pgTable('editor_selection_methods', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).unique().notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }),
});

// Quality Levels
export const qualityLevels = pgTable('quality_levels', {
  id: serial('id').primaryKey(),
  qualityName: varchar('quality_name', { length: 50 }).unique().notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }),
});

// Project Formats
export const projectFormats = pgTable('project_formats', {
  id: serial('id').primaryKey(),
  formatName: varchar('format_name', { length: 50 }).unique().notNull(),
  description: text('description'),
  projectTypePricingId: integer('project_type_pricing_id').references(() => projectPricingTypes.id),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Project Pricing Types
export const projectPricingTypes = pgTable('project_pricing_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Project Metadata
export const projectMetadata = pgTable('project_metadata', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  title: varchar('title', { length: 50 }),
  description: text('description'),
  deliverableCount: integer('deliverable_count'),
  estimatedDeliveryTime: integer('estimated_delivery_time'),
  setPrice: decimal('set_price'),
});

// Project Statuses
export const projectStatuses = pgTable('project_statuses', {
  id: serial('id').primaryKey(),
  statusName: varchar('status_name', { length: 50 }).unique().notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Project Status History
export const projectStatusHistory = pgTable('project_status_history', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  statusId: integer('status_id').references(() => projectStatuses.id),
  changedAt: timestamp('changed_at'),
});

// Project Offers
export const projectOffers = pgTable('project_offers', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  initiatedBy: integer('initiated_by').references(() => videoEditors.id).notNull(),
  currentOffer: decimal('current_offer'),
  customOfferStatusId: integer('custom_offer_status_id').references(() => offerStatus.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// Offer Status
export const offerStatus = pgTable('offer_status', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Offers
export const offers = pgTable('offers', {
  id: serial('id').primaryKey(),
  projectOffersId: integer('project_offers_id').references(() => projectOffers.id).notNull(),
  offeredBy: integer('offered_by').references(() => videoEditors.id).notNull(),
  offerAmount: decimal('offer_amount').notNull(),
  offerMessage: text('offer_message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Escrow Statuses
export const escrowStatuses = pgTable('escrow_statuses', {
  id: serial('id').primaryKey(),
  statusName: varchar('status_name', { length: 50 }).unique().notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Escrow
export const escrow = pgTable('escrow', {
  id: serial('id').primaryKey(),
  projectPricingId: integer('project_pricing_id').references(() => projectPricing.id),
  amount: decimal('amount').notNull(),
  escrowStatusId: integer('escrow_status_id').references(() => escrowStatuses.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  lastUpdated: timestamp('last_updated'),
});

// Project Pricing
export const projectPricing = pgTable('project_pricing', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  initialPrice: decimal('initial_price'),
  finalPrice: decimal('final_price'),
});

// Payments
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  projectPricingId: integer('project_pricing_id').references(() => projectPricing.id),
  amount: decimal('amount').notNull(),
  transactionType: text('transaction_type'),
  paymentStatusId: integer('payment_status_id').references(() => paymentStatuses.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Payment Statuses
export const paymentStatuses = pgTable('payment_statuses', {
  id: serial('id').primaryKey(),
  statusName: varchar('status_name', { length: 50 }).unique().notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 50 }).notNull(),
});

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  contentCreatorId: integer('content_creator_id').references(() => contentCreators.id),
  videoEditorId: integer('video_editor_id').references(() => videoEditors.id),
  rating: integer('rating'),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

// User Favorites
export const userFavorites = pgTable('user_favorites', {
  id: serial('id'),
  videoEditorId: integer('video_editor_id').references(() => videoEditors.id),
});

// Projects
export const projectsRelations = relations(projects, ({ many }) => ({
  projectOffers: many(projectOffers),
  projectPricing: many(projectPricing),
  projectMetadata: many(projectMetadata),
  projectStatusHistory: many(projectStatusHistory),
  escrow: many(escrow),
  payments: many(payments),
  questions: many(questions),
  deliverables: many(deliverables),
  projectExampleAssociations: many(projectExampleAssociations),
}));

// Users
export const usersRelations = relations(users, ({ many }) => ({
  activityLogs: many(activityLogs),
  profiles: many(profiles),
  contentCreators: many(contentCreators),
  videoEditors: many(videoEditors),
  userFavorites: many(userFavorites),
}));

// Content Creators
export const contentCreatorsRelations = relations(contentCreators, ({ one, many }) => ({
  user: one(users, {
    fields: [contentCreators.id],
    references: [users.id],
  }),
  youtubeAccounts: many(youtubeAccounts),
  tiktokAccounts: many(tiktokAccounts),
  projects: many(projects),
  templates: many(templates),
  reviews: many(reviews)
}));

// Video Editors
export const videoEditorsRelations = relations(videoEditors, ({ one, many }) => ({
  user: one(users, {
    fields: [videoEditors.id],
    references: [users.id],
  }),
  rank: one(ranks, {
    fields: [videoEditors.rankId],
    references: [ranks.id],
  }),
  projects: many(projects),
  plans: many(plans),
  reviews: many(reviews),
  userFavorites: many(userFavorites),
}));

// Plans
export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  videoEditorId: integer('video_editor_id').references(() => videoEditors.id),
  planName: varchar('plan_name', { length: 50 }),
  description: text('description'),
  price: decimal('price'),
  deliveryTime: varchar('delivery_time'),
  features: text('features'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Questions
export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Deliverables
export const deliverables = pgTable('deliverables', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  templateId: integer('template_id').references(() => templates.id),
  title: varchar('title', { length: 50 }),
  description: text('description'),
  maxRevisions: integer('max_revisions'),
  note: text('note'),
});

// Deliverable Revisions
export const deliverableRevisions = pgTable('deliverable_revisions', {
  id: serial('id').primaryKey(),
  deliverableId: integer('deliverable_id').references(() => deliverables.id),
  revisionNumber: integer('revision_number'),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Templates
export const templates = pgTable('templates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  contentCreatorId: integer('content_creator_id').references(() => contentCreators.id),
  isPredefined: boolean('is_predefined').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// Template Parameters
export const templateParameters = pgTable('template_parameters', {
  id: serial('id').primaryKey(),
  templateId: integer('template_id').references(() => templates.id),
  parameterTypeId: integer('parameter_type_id').references(() => parameterTypes.id),
  name: varchar('name', { length: 50 }).notNull(),
  value: text('value'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Parameter Types
export const parameterTypes = pgTable('parameter_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  defaultValue: text('default_value'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Project Example Associations
export const projectExampleAssociations = pgTable('project_example_associations', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id),
  projectExample: text('project_example'),
  note: text('note')
});
// Inferring types for easier usage
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ContentCreator = typeof contentCreators.$inferSelect;
export type NewContentCreator = typeof contentCreators.$inferInsert;
export type VideoEditor = typeof videoEditors.$inferSelect;
export type NewVideoEditor = typeof videoEditors.$inferInsert;
export type Rank = typeof ranks.$inferSelect;
export type NewRank = typeof ranks.$inferInsert;
export type YoutubeAccount = typeof youtubeAccounts.$inferSelect;
export type NewYoutubeAccount = typeof youtubeAccounts.$inferInsert;
export type TiktokAccount = typeof tiktokAccounts.$inferSelect;
export type NewTiktokAccount = typeof tiktokAccounts.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type EditorSelectionMethod = typeof editorSelectionMethods.$inferSelect;
export type NewEditorSelectionMethod = typeof editorSelectionMethods.$inferInsert;
export type QualityLevel = typeof qualityLevels.$inferSelect;
export type NewQualityLevel = typeof qualityLevels.$inferInsert;
export type ProjectFormat = typeof projectFormats.$inferSelect;
export type NewProjectFormat = typeof projectFormats.$inferInsert;
export type ProjectPricingType = typeof projectPricingTypes.$inferSelect;
export type NewProjectPricingType = typeof projectPricingTypes.$inferInsert;
export type ProjectMetadata = typeof projectMetadata.$inferSelect;
export type NewProjectMetadata = typeof projectMetadata.$inferInsert;
export type ProjectStatus = typeof projectStatuses.$inferSelect;
export type NewProjectStatus = typeof projectStatuses.$inferInsert;
export type ProjectStatusHistory = typeof projectStatusHistory.$inferSelect;
export type NewProjectStatusHistory = typeof projectStatusHistory.$inferInsert;
export type ProjectOffer = typeof projectOffers.$inferSelect;
export type NewProjectOffer = typeof projectOffers.$inferInsert;
export type OfferStatus = typeof offerStatus.$inferSelect;
export type NewOfferStatus = typeof offerStatus.$inferInsert;
export type Offer = typeof offers.$inferSelect;
export type NewOffer = typeof offers.$inferInsert;
export type EscrowStatus = typeof escrowStatuses.$inferSelect;
export type NewEscrowStatus = typeof escrowStatuses.$inferInsert;
export type Escrow = typeof escrow.$inferSelect;
export type NewEscrow = typeof escrow.$inferInsert;
export type ProjectPricing = typeof projectPricing.$inferSelect;
export type NewProjectPricing = typeof projectPricing.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type PaymentStatus = typeof paymentStatuses.$inferSelect;
export type NewPaymentStatus = typeof paymentStatuses.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type UserFavorite = typeof userFavorites.$inferSelect;
export type NewUserFavorite = typeof userFavorites.$inferInsert;
export type Plan = typeof plans.$inferSelect;
export type NewPlan = typeof plans.$inferInsert;
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export type Deliverable = typeof deliverables.$inferSelect;
export type NewDeliverable = typeof deliverables.$inferInsert;
export type DeliverableRevision = typeof deliverableRevisions.$inferSelect;
export type NewDeliverableRevision = typeof deliverableRevisions.$inferInsert;
export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
export type TemplateParameter = typeof templateParameters.$inferSelect;
export type NewTemplateParameter = typeof templateParameters.$inferInsert;
export type ParameterType = typeof parameterTypes.$inferSelect;
export type NewParameterType = typeof parameterTypes.$inferInsert;
export type ProjectExampleAssociation = typeof projectExampleAssociations.$inferSelect;
export type NewProjectExampleAssociation = typeof projectExampleAssociations.$inferInsert;