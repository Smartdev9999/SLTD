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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content_en: string | null
          content_la: string | null
          content_th: string | null
          content_zh: string | null
          created_at: string
          id: string
          image_url: string | null
          section_key: string
          sort_order: number | null
          title_en: string | null
          title_la: string | null
          title_th: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          content_en?: string | null
          content_la?: string | null
          content_th?: string | null
          content_zh?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          section_key: string
          sort_order?: number | null
          title_en?: string | null
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          content_en?: string | null
          content_la?: string | null
          content_th?: string | null
          content_zh?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          section_key?: string
          sort_order?: number | null
          title_en?: string | null
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          active: boolean | null
          created_at: string
          deadline: string | null
          department: string | null
          description_en: string | null
          description_la: string | null
          description_th: string | null
          description_zh: string | null
          employment_type: string | null
          id: string
          location: string | null
          requirements_en: string | null
          requirements_la: string | null
          requirements_th: string | null
          requirements_zh: string | null
          title_en: string
          title_la: string | null
          title_th: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          deadline?: string | null
          department?: string | null
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          requirements_en?: string | null
          requirements_la?: string | null
          requirements_th?: string | null
          requirements_zh?: string | null
          title_en: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          deadline?: string | null
          department?: string | null
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          requirements_en?: string | null
          requirements_la?: string | null
          requirements_th?: string | null
          requirements_zh?: string | null
          title_en?: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          content_en: string | null
          content_la: string | null
          content_th: string | null
          content_zh: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_la: string | null
          excerpt_th: string | null
          excerpt_zh: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          title_en: string
          title_la: string | null
          title_th: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content_en?: string | null
          content_la?: string | null
          content_th?: string | null
          content_zh?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_la?: string | null
          excerpt_th?: string | null
          excerpt_zh?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title_en: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content_en?: string | null
          content_la?: string | null
          content_th?: string | null
          content_zh?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_la?: string | null
          excerpt_th?: string | null
          excerpt_zh?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          title_en?: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description_en: string | null
          description_la: string | null
          description_th: string | null
          description_zh: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          location: string | null
          status: string | null
          title_en: string
          title_la: string | null
          title_th: string | null
          title_zh: string | null
          updated_at: string
          year: string | null
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          status?: string | null
          title_en: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
          year?: string | null
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          status?: string | null
          title_en?: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean | null
          created_at: string
          description_en: string | null
          description_la: string | null
          description_th: string | null
          description_zh: string | null
          icon: string | null
          id: string
          sort_order: number | null
          title_en: string
          title_la: string | null
          title_th: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          title_en: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description_en?: string | null
          description_la?: string | null
          description_th?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          title_en?: string
          title_la?: string | null
          title_th?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          setting_key: string
          updated_at: string
          value_en: string | null
          value_la: string | null
          value_th: string | null
          value_zh: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          setting_key: string
          updated_at?: string
          value_en?: string | null
          value_la?: string | null
          value_th?: string | null
          value_zh?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          setting_key?: string
          updated_at?: string
          value_en?: string | null
          value_la?: string | null
          value_th?: string | null
          value_zh?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_editor: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
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
      app_role: ["admin", "editor"],
    },
  },
} as const
