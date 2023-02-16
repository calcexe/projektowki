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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
