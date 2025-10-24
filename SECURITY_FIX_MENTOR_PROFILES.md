# Mentor Profile Security Fix

## Issue Fixed
**Mentor Personal Information Exposed to Public** - The mentor_profiles table was allowing public access to sensitive personal data including full names, email addresses, phone numbers, GMC numbers, and NHS trust affiliations.

## Changes Made

### Database Changes (Migration)
1. **Removed overly permissive public policy** that allowed anyone to view all data from approved mentor profiles
2. **Created restricted public policy** that allows viewing only basic professional information for approved mentors
3. **Removed problematic SECURITY DEFINER view** that was causing security warnings

### Frontend Changes
1. **Updated VideoSessionBooking component** to only access safe fields:
   - Removed access to `full_name` and `email` 
   - Changed to use `job_title` and `specialty` instead
   - Updated mentor selection dropdown to show "Specialty Mentor" instead of full names

## Security Model

### Public Access (Unauthenticated Users)
Can view **ONLY** these safe fields from approved mentor profiles:
- `bio` - Professional biography
- `job_title` - Current position 
- `specialty` - Medical specialty
- `experience_years` - Years of experience
- `average_rating` - Public rating
- `total_sessions` - Number of sessions completed
- `mentor_tier` - Mentor level (Associate, Senior, Principal)
- `mentoring_areas` - Areas of expertise
- `avatar_url` - Profile picture

### Authenticated Users
Have the same access as public users - sensitive data is not exposed even to authenticated users unless they are:
- The mentor themselves (can view/edit their own profile)
- Admin users (can manage all profiles)

### Protected Data (Never Public)
These sensitive fields are never exposed to public or general authenticated users:
- `full_name` - Real name
- `email` - Contact email
- `phone` - Phone number  
- `gmc_number` - GMC registration
- `nhs_trust` - Trust affiliation
- `stripe_account_id` - Payment details
- `verification_documents` - Identity documents

## Frontend Development Guidelines

When working with mentor profiles in frontend components:

### ✅ Safe to Use Publicly
```typescript
// These fields are safe for public display
const safeFields = [
  'bio', 'job_title', 'specialty', 'experience_years',
  'average_rating', 'total_sessions', 'mentor_tier', 
  'mentoring_areas', 'avatar_url'
];
```

### ❌ Never Use in Public Components
```typescript
// These fields should NEVER be displayed publicly
const sensitiveFields = [
  'full_name', 'email', 'phone', 'gmc_number', 
  'nhs_trust', 'stripe_account_id', 'verification_documents'
];
```

### Recommended Display Pattern
Instead of showing real names, use professional identifiers:
```typescript
// Instead of: "Dr. John Smith"
// Show: "Cardiology Specialist" or "Senior Cardiologist"
const displayName = `${mentor.specialty} ${mentor.mentor_tier}`;
```

## Contact Method
For users who want to contact mentors, they should use the platform's internal messaging/booking system rather than direct contact information.