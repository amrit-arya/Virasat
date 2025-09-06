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
      data: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          id: number
          user_id: string
          type: string
          bank: string
          account_number: string
          balance: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          bank: string
          account_number: string
          balance: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          bank?: string
          account_number?: string
          balance?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      investments: {
        Row: {
          id: number
          user_id: string
          type: string
          scheme: string | null
          company: string | null
          units: string | null
          shares: string | null
          current_value: string
          gain_loss: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          scheme?: string | null
          company?: string | null
          units?: string | null
          shares?: string | null
          current_value: string
          gain_loss?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          scheme?: string | null
          company?: string | null
          units?: string | null
          shares?: string | null
          current_value?: string
          gain_loss?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      health_records: {
        Row: {
          id: number
          user_id: string
          type: string
          provider: string
          date: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          provider: string
          date: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          provider?: string
          date?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      medications: {
        Row: {
          id: number
          user_id: string
          name: string
          dosage: string
          frequency: string
          prescribed_by: string
          start_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          dosage: string
          frequency: string
          prescribed_by: string
          start_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          dosage?: string
          frequency?: string
          prescribed_by?: string
          start_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      passwords: {
        Row: {
          id: number
          user_id: string
          service: string
          username: string
          password: string
          category: string
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          service: string
          username: string
          password: string
          category?: string
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          service?: string
          username?: string
          password?: string
          category?: string
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_questions: {
        Row: {
          id: number
          user_id: string
          service: string
          question: string
          answer: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          service: string
          question: string
          answer: string
          category?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          service?: string
          question?: string
          answer?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          id: number
          user_id: string
          type: string
          address: string
          area: string
          value: string
          registration_number: string | null
          purchase_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          address: string
          area: string
          value: string
          registration_number?: string | null
          purchase_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          address?: string
          area?: string
          value?: string
          registration_number?: string | null
          purchase_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          id: number
          user_id: string
          type: string
          model: string
          registration_number: string
          purchase_value: string | null
          current_value: string | null
          insurance_expiry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          model: string
          registration_number: string
          purchase_value?: string | null
          current_value?: string | null
          insurance_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          model?: string
          registration_number?: string
          purchase_value?: string | null
          current_value?: string | null
          insurance_expiry?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_policies: {
        Row: {
          id: number
          user_id: string
          type: string
          provider: string
          policy_number: string
          premium_amount: string
          coverage_amount: string
          start_date: string
          end_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          provider: string
          policy_number: string
          premium_amount: string
          coverage_amount: string
          start_date: string
          end_date: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          provider?: string
          policy_number?: string
          premium_amount?: string
          coverage_amount?: string
          start_date?: string
          end_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      nominees: {
        Row: {
          id: number
          user_id: string
          name: string
          relationship: string
          phone: string | null
          email: string | null
          address: string | null
          percentage: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          name: string
          relationship: string
          phone?: string | null
          email?: string | null
          address?: string | null
          percentage: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          name?: string
          relationship?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          percentage?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
    Enums: {},
  },
} as const
