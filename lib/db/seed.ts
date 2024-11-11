import { 
  users, ranks, contentCreators, videoEditors, profiles,
  actionTypes, qualityLevels, projectFormats, projectPricingTypes,
  projectStatuses, escrowStatuses, paymentStatuses, offerStatus,
  editorSelectionMethods, parameterTypes, templates
} from './schema';

import { hashPassword } from '@/lib/server/session';

import db from './drizzle';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed Ranks
  console.log('Seeding ranks...');
  const ranksData = await db.insert(ranks).values([
    { name: 'Novice', description: 'Beginning editor', slug: 'novice' },
    { name: 'Intermediate', description: 'Experienced editor', slug: 'intermediate' },
    { name: 'Expert', description: 'Professional editor', slug: 'expert' },
    { name: 'Master', description: 'Elite editor', slug: 'master' }
  ]).returning();

  // Seed Action Types
  console.log('Seeding action types...');
  const actionTypesData = await db.insert(actionTypes).values([
    { name: 'Login', slug: 'login' },
    { name: 'Project Creation', slug: 'project-creation' },
    { name: 'Offer Made', slug: 'offer-made' },
    { name: 'Review Posted', slug: 'review-posted' }
  ]).returning();

  // Seed Quality Levels
  console.log('Seeding quality levels...');
  const qualityLevelsData = await db.insert(qualityLevels).values([
    { qualityName: 'Standard', description: 'Good quality editing', slug: 'standard' },
    { qualityName: 'Premium', description: 'High quality editing', slug: 'premium' },
    { qualityName: 'Professional', description: 'Top tier editing', slug: 'professional' }
  ]).returning();

  // Seed Project Formats
  console.log('Seeding project formats...');
  const projectFormatsData = await db.insert(projectFormats).values([
    { formatName: 'YouTube Short', description: 'Vertical short-form content', slug: 'youtube-short' },
    { formatName: 'YouTube Video', description: 'Standard YouTube video', slug: 'youtube-video' },
    { formatName: 'TikTok', description: 'TikTok format video', slug: 'tiktok' },
    { formatName: 'Instagram Reel', description: 'Instagram Reel format', slug: 'instagram-reel' }
  ]).returning();

  // Seed Project Pricing Types
  console.log('Seeding project pricing types...');
  const pricingTypesData = await db.insert(projectPricingTypes).values([
    { name: 'Fixed Price', description: 'Set price for the project', slug: 'fixed-price' },
    { name: 'Hourly Rate', description: 'Price based on hours worked', slug: 'hourly-rate' },
    { name: 'Per Minute', description: 'Price based on video length', slug: 'per-minute' }
  ]).returning();

  // Seed Project Statuses
  console.log('Seeding project statuses...');
  const projectStatusesData = await db.insert(projectStatuses).values([
    { statusName: 'Draft', description: 'Project is being drafted', slug: 'draft' },
    { statusName: 'Open', description: 'Project is open for offers', slug: 'open' },
    { statusName: 'In Progress', description: 'Project is being worked on', slug: 'in-progress' },
    { statusName: 'Under Review', description: 'Project is being reviewed', slug: 'under-review' },
    { statusName: 'Completed', description: 'Project is completed', slug: 'completed' }
  ]).returning();

  // Seed Escrow Statuses
  console.log('Seeding escrow statuses...');
  const escrowStatusesData = await db.insert(escrowStatuses).values([
    { statusName: 'Pending', description: 'Payment pending', slug: 'pending' },
    { statusName: 'Locked', description: 'Payment locked in escrow', slug: 'locked' },
    { statusName: 'Released', description: 'Payment released', slug: 'released' }
  ]).returning();

  // Seed Payment Statuses
  console.log('Seeding payment statuses...');
  const paymentStatusesData = await db.insert(paymentStatuses).values([
    { statusName: 'Pending', description: 'Payment is pending', slug: 'pending' },
    { statusName: 'Completed', description: 'Payment is completed', slug: 'completed' },
    { statusName: 'Failed', description: 'Payment failed', slug: 'failed' },
    { statusName: 'Refunded', description: 'Payment was refunded', slug: 'refunded' }
  ]).returning();

  // Seed Offer Statuses
  console.log('Seeding offer statuses...');
  const offerStatusData = await db.insert(offerStatus).values([
    { id: 1, name: 'Pending', description: 'Offer is pending response', slug: 'pending' },
    { id: 2, name: 'Accepted', description: 'Offer was accepted', slug: 'accepted' },
    { id: 3, name: 'Rejected', description: 'Offer was rejected', slug: 'rejected' },
    { id: 4, name: 'Withdrawn', description: 'Offer was withdrawn', slug: 'withdrawn' }
  ]).returning();

  // Seed Editor Selection Methods
  console.log('Seeding editor selection methods...');
  const selectionMethodsData = await db.insert(editorSelectionMethods).values([
    { name: 'Direct Hire', description: 'Directly hire an editor', slug: 'direct-hire' },
    { name: 'Competitive', description: 'Open for multiple offers', slug: 'competitive' },
    { name: 'Interview', description: 'Interview process required', slug: 'interview' }
  ]).returning();

  // Seed Parameter Types
  console.log('Seeding parameter types...');
  const parameterTypesData = await db.insert(parameterTypes).values([
    { name: 'Duration', defaultValue: '10:00', notes: 'Video duration in minutes' },
    { name: 'Resolution', defaultValue: '1080p', notes: 'Video resolution' },
    { name: 'Format', defaultValue: 'MP4', notes: 'Video format' },
    { name: 'Style', defaultValue: 'Standard', notes: 'Editing style' }
  ]).returning();

  // Seed Users
  console.log('Seeding users...');
  const usersData = await db.insert(users).values([
    { username: 'creator1', email: 'creator1@example.com', passwordHash: await hashPassword('password1') },
    { username: 'creator2', email: 'creator2@example.com', passwordHash: await hashPassword('password2') },
    { username: 'editor1', email: 'editor1@example.com', passwordHash: await hashPassword('password3') },
    { username: 'editor2', email: 'editor2@example.com', passwordHash: await hashPassword('password4') }
  ]).returning();
  
  // Seed Content Creators
  console.log('Seeding content creators...');
  const contentCreatorsData = await db.insert(contentCreators).values([
    { id: usersData[0].id, twitchAccount: 'creator1_twitch' },
    { id: usersData[1].id, twitchAccount: 'creator2_twitch' }
  ]).returning();

  // Seed Video Editors
  console.log('Seeding video editors...');
  const videoEditorsData = await db.insert(videoEditors).values([
    { 
      id: usersData[2].id,
      portfolioLink: 'https://portfolio.editor1.com',
      favoriteCount: 15,
      available: true,
      experiencePoints: 1000,
      rankId: ranksData[2].id,
      reviewsVisible: true
    },
    {
      id: usersData[3].id,
      portfolioLink: 'https://portfolio.editor2.com',
      favoriteCount: 8,
      available: true,
      experiencePoints: 500,
      rankId: ranksData[1].id,
      reviewsVisible: true
    }
  ]).returning();

  // Seed Profiles
  console.log('Seeding profiles...');
  await db.insert(profiles).values([
    {
      id: usersData[0].id,
      firstName: 'John',
      lastName: 'Creator',
      displayedName: 'JohnCreates',
      description: 'Content creator specializing in gaming content',
      profilePictureUrl: 'https://example.com/john.jpg'
    },
    {
      id: usersData[1].id,
      firstName: 'Jane',
      lastName: 'Creator',
      displayedName: 'JaneCreates',
      description: 'Lifestyle and travel content creator',
      profilePictureUrl: 'https://example.com/jane.jpg'
    },
    {
      id: usersData[2].id,
      firstName: 'Mike',
      lastName: 'Editor',
      displayedName: 'MikeEdits',
      description: 'Professional video editor with 5 years experience',
      profilePictureUrl: 'https://example.com/mike.jpg'
    },
    {
      id: usersData[3].id,
      firstName: 'Sarah',
      lastName: 'Editor',
      displayedName: 'SarahEdits',
      description: 'Specialized in gaming and lifestyle editing',
      profilePictureUrl: 'https://example.com/sarah.jpg'
    }
  ]);

  // Seed Templates
  console.log('Seeding templates...');
  await db.insert(templates).values([
    {
      name: 'Gaming Highlights',
      description: 'Template for gaming highlight videos',
      contentCreatorId: contentCreatorsData[0].id,
      isPredefined: true
    },
    {
      name: 'Travel Vlog',
      description: 'Template for travel vlogs',
      contentCreatorId: contentCreatorsData[1].id,
      isPredefined: true
    }
  ]);

  console.log('✅ Seeding completed!');
}

// Replace the direct seed() call with an IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    await seed();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
})();