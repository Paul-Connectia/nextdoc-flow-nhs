import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Security utilities for input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS vectors
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/
  return phoneRegex.test(phone)
}

export function validateGMCNumber(gmc: string): boolean {
  const gmcRegex = /^\d{7}$/
  return gmcRegex.test(gmc)
}

export function rateLimitKey(identifier: string): string {
  return `rate_limit_${identifier}_${Date.now()}`
}

/**
 * Formats exam/pathway codes for display
 * Examples: 
 * - "frca" → "FRCA"
 * - "mrcp-sce" → "MRCP-SCE" 
 * - "frcpath-histo" → "FRCPATH-HISTO"
 */
export function formatExamCode(code: string): string {
  return code.toUpperCase();
}

/**
 * Gets the full title for a pathway from templates or formats the code
 */
export function getPathwayDisplayTitle(pathwayId: string): string {
  // Dynamic import would be needed here, but for simplicity we'll just format the code
  // The ProfileIntake component will handle the template lookup
  return formatExamCode(pathwayId);
}
