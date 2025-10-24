import { z } from "zod"
import { sanitizeInput, validateEmail, validatePhone, validateGMCNumber } from "./utils"

// Enhanced validation schemas with security in mind
export const secureStringSchema = z.string()
  .transform(sanitizeInput)
  .refine((val) => val.length > 0, "Field is required")
  .refine((val) => val.length <= 255, "Field too long")

export const emailSchema = z.string()
  .transform(sanitizeInput)
  .refine(validateEmail, "Invalid email format")

export const phoneSchema = z.string()
  .transform(sanitizeInput)
  .refine(validatePhone, "Invalid phone number format")

export const gmcNumberSchema = z.string()
  .transform(sanitizeInput)
  .refine(validateGMCNumber, "GMC number must be 7 digits")

export const bioSchema = z.string()
  .max(1000, "Bio too long")
  .transform(sanitizeInput)
  .optional()

export const urlSchema = z.string()
  .url("Invalid URL format")
  .transform(sanitizeInput)
  .refine((url) => {
    const allowedProtocols = ['http:', 'https:']
    try {
      const parsed = new URL(url)
      return allowedProtocols.includes(parsed.protocol)
    } catch {
      return false
    }
  }, "URL must use http or https protocol")
  .optional()

// Profile validation schema
export const profileSchema = z.object({
  email: emailSchema,
  display_name: secureStringSchema.optional(),
  first_name: secureStringSchema.optional(),
  last_name: secureStringSchema.optional(),
  phone: phoneSchema.optional(),
  profession: secureStringSchema.optional(),
  specialisation: secureStringSchema.optional(),
  current_location: secureStringSchema.optional(),
  target_location: secureStringSchema.optional(),
  gmc_number: gmcNumberSchema.optional(),
  bio: bioSchema,
  linkedin_url: urlSchema,
})

// Mentor application validation schema with camelCase for form compatibility
export const mentorApplicationSchema = z.object({
  fullName: secureStringSchema,
  email: emailSchema,
  phone: phoneSchema,
  gmcNumber: gmcNumberSchema,
  specialty: secureStringSchema,
  experienceYears: z.number().int().min(0).max(50),
  bio: bioSchema,
  jobTitle: secureStringSchema.optional(),
  nhsTrust: secureStringSchema.optional(),
  hourlyRate: z.number().min(0).max(1000).optional(),
  mentorTier: z.enum(['associate', 'senior', 'principal']).optional(),
})

// CV validation schema  
export const cvSchema = z.object({
  title: secureStringSchema,
  content: z.record(z.any()), // CV content as flexible object
})

// Rate limiting helper
export const createRateLimiter = (windowMs: number, maxRequests: number) => {
  const requests = new Map<string, { count: number; resetTime: number }>()
  
  return (identifier: string): boolean => {
    const now = Date.now()
    const key = identifier
    const windowStart = now - windowMs
    
    // Clean old entries
    for (const [k, v] of requests.entries()) {
      if (v.resetTime < windowStart) {
        requests.delete(k)
      }
    }
    
    const current = requests.get(key)
    
    if (!current) {
      requests.set(key, { count: 1, resetTime: now })
      return true
    }
    
    if (current.count >= maxRequests) {
      return false
    }
    
    current.count++
    return true
  }
}