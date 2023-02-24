export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      get_phase_type: {
        Row: {
          archived: boolean
          created_at: string
          end_date: string | null
          estimate: number | null
          id: number
          image_url: string
          is_monthly: boolean
          name: string
          project_id: number
          start: string
        }
        Insert: {
          archived?: boolean
          created_at: string
          end_date?: string | null
          estimate?: number | null
          id: number
          image_url: string
          is_monthly?: boolean
          name: string
          project_id: number
          start: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          end_date?: string | null
          estimate?: number | null
          id?: number
          image_url?: string
          is_monthly?: boolean
          name?: string
          project_id?: number
          start?: string
        }
      }
      hours: {
        Row: {
          date: string
          id: number
          minutes: number | null
          notes: string | null
          phase_id: number
          user_id: string
        }
        Insert: {
          date: string
          id?: number
          minutes?: number | null
          notes?: string | null
          phase_id: number
          user_id: string
        }
        Update: {
          date?: string
          id?: number
          minutes?: number | null
          notes?: string | null
          phase_id?: number
          user_id?: string
        }
      }
      phases: {
        Row: {
          archived: boolean
          created_at: string | null
          end: string | null
          estimate: number | null
          id: number
          is_monthly: boolean
          name: string
          project_id: number
          start: string
        }
        Insert: {
          archived?: boolean
          created_at?: string | null
          end?: string | null
          estimate?: number | null
          id?: number
          is_monthly?: boolean
          name: string
          project_id: number
          start?: string
        }
        Update: {
          archived?: boolean
          created_at?: string | null
          end?: string | null
          estimate?: number | null
          id?: number
          is_monthly?: boolean
          name?: string
          project_id?: number
          start?: string
        }
      }
      projects: {
        Row: {
          archived: boolean
          client: string
          created_at: string | null
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          archived?: boolean
          client: string
          created_at?: string | null
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          archived?: boolean
          client?: string
          created_at?: string | null
          id?: number
          image_url?: string | null
          name?: string
        }
      }
      users_phases: {
        Row: {
          alert_skipped: boolean
          created_at: string
          id: number
          phase_ids: number[]
          user_id: string
        }
        Insert: {
          alert_skipped?: boolean
          created_at?: string
          id?: number
          phase_ids?: number[]
          user_id: string
        }
        Update: {
          alert_skipped?: boolean
          created_at?: string
          id?: number
          phase_ids?: number[]
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      phases_period: "prev" | "current" | "next"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
