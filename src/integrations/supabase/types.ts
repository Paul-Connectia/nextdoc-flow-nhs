export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action_details: Json | null
          action_type: string
          admin_id: string
          created_at: string
          id: string
          reason: string | null
          target_id: string | null
          target_table: string | null
          target_user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          admin_id: string
          created_at?: string
          id?: string
          reason?: string | null
          target_id?: string | null
          target_table?: string | null
          target_user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          admin_id?: string
          created_at?: string
          id?: string
          reason?: string | null
          target_id?: string | null
          target_table?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          context_type: string | null
          conversation_id: string
          created_at: string
          id: string
          messages: Json
          specialty: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context_type?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          messages?: Json
          specialty?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context_type?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          messages?: Json
          specialty?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_queries: {
        Row: {
          created_at: string
          device: string | null
          id: string
          query: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          device?: string | null
          id?: string
          query: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          device?: string | null
          id?: string
          query?: string
          timestamp?: string
        }
        Relationships: []
      }
      cpd_completions: {
        Row: {
          certificate_url: string | null
          completed_at: string
          id: string
          module_id: string
          score: number | null
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string
          id?: string
          module_id: string
          score?: number | null
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string
          id?: string
          module_id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cpd_completions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "cpd_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      cpd_modules: {
        Row: {
          category: string
          certificate_template: string | null
          content_url: string | null
          created_at: string
          credits: number | null
          description: string | null
          id: string
          subscription_required: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          certificate_template?: string | null
          content_url?: string | null
          created_at?: string
          credits?: number | null
          description?: string | null
          id?: string
          subscription_required: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          certificate_template?: string | null
          content_url?: string | null
          created_at?: string
          credits?: number | null
          description?: string | null
          id?: string
          subscription_required?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cvs: {
        Row: {
          ai_feedback: Json | null
          ai_score: number | null
          content: Json
          created_at: string
          id: string
          pdf_url: string | null
          status: string | null
          template_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_feedback?: Json | null
          ai_score?: number | null
          content?: Json
          created_at?: string
          id?: string
          pdf_url?: string | null
          status?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_feedback?: Json | null
          ai_score?: number | null
          content?: Json
          created_at?: string
          id?: string
          pdf_url?: string | null
          status?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hr_partners: {
        Row: {
          company_name: string
          contact_person: string
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          payout_details: Json | null
          phone: string | null
          referral_code: string | null
          total_earnings: number | null
          total_referrals: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          contact_person: string
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          payout_details?: Json | null
          phone?: string | null
          referral_code?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          payout_details?: Json | null
          phone?: string | null
          referral_code?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interview_questions: {
        Row: {
          created_at: string
          difficulty: string
          id: string
          question_text: string
          question_type: string
          role: string
          specialty: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          difficulty: string
          id?: string
          question_text: string
          question_type: string
          role: string
          specialty?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          id?: string
          question_text?: string
          question_type?: string
          role?: string
          specialty?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          ai_feedback: Json | null
          created_at: string
          difficulty_level: string | null
          duration_minutes: number | null
          id: string
          overall_score: number | null
          questions: Json | null
          responses: Json | null
          session_type: string
          specialization: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_feedback?: Json | null
          created_at?: string
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          overall_score?: number | null
          questions?: Json | null
          responses?: Json | null
          session_type?: string
          specialization?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_feedback?: Json | null
          created_at?: string
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          overall_score?: number | null
          questions?: Json | null
          responses?: Json | null
          session_type?: string
          specialization?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_applications: {
        Row: {
          admin_notes: string | null
          application_data: Json
          created_at: string
          documents: Json | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          application_data: Json
          created_at?: string
          documents?: Json | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          application_data?: Json
          created_at?: string
          documents?: Json | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          availability_schedule: Json | null
          avatar_url: string | null
          average_rating: number | null
          bio: string | null
          calendly_link: string | null
          created_at: string
          email: string
          experience_years: number | null
          full_name: string
          gmc_number: string | null
          hourly_rate: number | null
          id: string
          is_verified: boolean | null
          job_title: string | null
          mentor_tier: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas: string[] | null
          nhs_trust: string | null
          phone: string | null
          referral_code: string | null
          specialty: string | null
          status: Database["public"]["Enums"]["mentor_status"] | null
          stripe_account_id: string | null
          total_earnings: number | null
          total_sessions: number | null
          updated_at: string
          user_id: string
          verification_documents: Json | null
        }
        Insert: {
          availability_schedule?: Json | null
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          calendly_link?: string | null
          created_at?: string
          email: string
          experience_years?: number | null
          full_name: string
          gmc_number?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          job_title?: string | null
          mentor_tier?: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas?: string[] | null
          nhs_trust?: string | null
          phone?: string | null
          referral_code?: string | null
          specialty?: string | null
          status?: Database["public"]["Enums"]["mentor_status"] | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id: string
          verification_documents?: Json | null
        }
        Update: {
          availability_schedule?: Json | null
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          calendly_link?: string | null
          created_at?: string
          email?: string
          experience_years?: number | null
          full_name?: string
          gmc_number?: string | null
          hourly_rate?: number | null
          id?: string
          is_verified?: boolean | null
          job_title?: string | null
          mentor_tier?: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas?: string[] | null
          nhs_trust?: string | null
          phone?: string | null
          referral_code?: string | null
          specialty?: string | null
          status?: Database["public"]["Enums"]["mentor_status"] | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id?: string
          verification_documents?: Json | null
        }
        Relationships: []
      }
      mentorship_sessions: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          mentee_feedback: string | null
          mentee_id: string
          mentor_feedback: string | null
          mentor_id: string
          payment_status: string | null
          rating: number | null
          scheduled_at: string
          session_notes: string | null
          session_type: string
          status: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentee_feedback?: string | null
          mentee_id: string
          mentor_feedback?: string | null
          mentor_id: string
          payment_status?: string | null
          rating?: number | null
          scheduled_at: string
          session_notes?: string | null
          session_type: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentee_feedback?: string | null
          mentee_id?: string
          mentor_feedback?: string | null
          mentor_id?: string
          payment_status?: string | null
          rating?: number | null
          scheduled_at?: string
          session_notes?: string | null
          session_type?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentorship_sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      nhs_trusts: {
        Row: {
          active: boolean | null
          contact_email: string | null
          created_at: string
          id: string
          license_expiry: string | null
          name: string
          region: string
          specialties: string[] | null
          sponsorship_license: boolean | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          active?: boolean | null
          contact_email?: string | null
          created_at?: string
          id?: string
          license_expiry?: string | null
          name: string
          region: string
          specialties?: string[] | null
          sponsorship_license?: boolean | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          active?: boolean | null
          contact_email?: string | null
          created_at?: string
          id?: string
          license_expiry?: string | null
          name?: string
          region?: string
          specialties?: string[] | null
          sponsorship_license?: boolean | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      plab_questions: {
        Row: {
          category: string
          correct_answer: string
          cpd_tag: boolean | null
          created_at: string
          difficulty: string
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          rationale: string
          updated_at: string
        }
        Insert: {
          category: string
          correct_answer: string
          cpd_tag?: boolean | null
          created_at?: string
          difficulty: string
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          rationale: string
          updated_at?: string
        }
        Update: {
          category?: string
          correct_answer?: string
          cpd_tag?: boolean | null
          created_at?: string
          difficulty?: string
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          rationale?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          current_location: string | null
          display_name: string | null
          email: string
          experience_years: number | null
          first_name: string | null
          gmc_number: string | null
          id: string
          last_name: string | null
          linkedin_url: string | null
          onboarding_completed: boolean | null
          phone: string | null
          profession: string | null
          specialization: string | null
          subscription_end_date: string | null
          subscription_status: string | null
          target_location: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_location?: string | null
          display_name?: string | null
          email: string
          experience_years?: number | null
          first_name?: string | null
          gmc_number?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profession?: string | null
          specialization?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          target_location?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          current_location?: string | null
          display_name?: string | null
          email?: string
          experience_years?: number | null
          first_name?: string | null
          gmc_number?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profession?: string | null
          specialization?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          target_location?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          product_id: string
          product_name: string
          status: string | null
          stripe_payment_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          product_id: string
          product_name: string
          status?: string | null
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          product_id?: string
          product_name?: string
          status?: string | null
          stripe_payment_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_sessions: {
        Row: {
          answers: Json | null
          completed: boolean | null
          created_at: string
          current_question: number | null
          filters: Json | null
          flagged_questions: number[] | null
          id: string
          quiz_type: string
          score: number | null
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed?: boolean | null
          created_at?: string
          current_question?: number | null
          filters?: Json | null
          flagged_questions?: number[] | null
          id?: string
          quiz_type: string
          score?: number | null
          total_questions: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed?: boolean | null
          created_at?: string
          current_question?: number | null
          filters?: Json | null
          flagged_questions?: number[] | null
          id?: string
          quiz_type?: string
          score?: number | null
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_tracking: {
        Row: {
          created_at: string
          id: string
          payout_date: string | null
          payout_status: string | null
          referral_code: string
          referred_user_id: string | null
          referrer_id: string
          referrer_type: string
          reward_amount: number | null
          reward_currency: string | null
          subscription_confirmed: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          payout_date?: string | null
          payout_status?: string | null
          referral_code: string
          referred_user_id?: string | null
          referrer_id: string
          referrer_type: string
          reward_amount?: number | null
          reward_currency?: string | null
          subscription_confirmed?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          payout_date?: string | null
          payout_status?: string | null
          referral_code?: string
          referred_user_id?: string | null
          referrer_id?: string
          referrer_type?: string
          reward_amount?: number | null
          reward_currency?: string | null
          subscription_confirmed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          id: string
          subscription_required: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          subscription_required: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          subscription_required?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_usage_tracking: {
        Row: {
          created_at: string
          feature: string
          id: string
          reset_date: string
          updated_at: string
          usage_count: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feature: string
          id?: string
          reset_date?: string
          updated_at?: string
          usage_count?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          feature?: string
          id?: string
          reset_date?: string
          updated_at?: string
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      mentor_profiles_public: {
        Row: {
          avatar_url: string | null
          average_rating: number | null
          bio: string | null
          calendly_link: string | null
          created_at: string | null
          experience_years: number | null
          id: string | null
          job_title: string | null
          mentor_tier: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas: string[] | null
          specialty: string | null
          total_sessions: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          calendly_link?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string | null
          job_title?: string | null
          mentor_tier?: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas?: string[] | null
          specialty?: string | null
          total_sessions?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          calendly_link?: string | null
          created_at?: string | null
          experience_years?: number | null
          id?: string | null
          job_title?: string | null
          mentor_tier?: Database["public"]["Enums"]["mentor_tier"] | null
          mentoring_areas?: string[] | null
          specialty?: string | null
          total_sessions?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_top_referrers: {
        Args: { limit_count?: number; time_filter?: string }
        Returns: {
          confirmed_referrals: number
          display_name: string
          email: string
          referrer_type: string
          total_referrals: number
          total_rewards: number
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_mentor_earnings: {
        Args: { amount_to_add: number; mentor_profile_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "mentor" | "hr_partner" | "user"
      application_status:
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "info_requested"
      mentor_status:
        | "pending"
        | "approved"
        | "rejected"
        | "suspended"
        | "inactive"
      mentor_tier: "associate" | "senior" | "principal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "mentor", "hr_partner", "user"],
      application_status: [
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "info_requested",
      ],
      mentor_status: [
        "pending",
        "approved",
        "rejected",
        "suspended",
        "inactive",
      ],
      mentor_tier: ["associate", "senior", "principal"],
    },
  },
} as const
