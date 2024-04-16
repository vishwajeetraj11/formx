export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      form_fields: {
        Row: {
          default_value: string | null
          error_message: string | null
          field_order: number
          field_type: Database["public"]["Enums"]["field_type"]
          form_id: number
          form_title: string
          help_text: string | null
          id: number
          image_url: string | null
          label: string
          max_error: string | null
          max_value: number | null
          min_error: string | null
          min_value: number | null
          name: string
          options: string[] | null
          placeholder: string | null
          regex: string | null
          regex_error: string | null
          regex_type: Database["public"]["Enums"]["regex_type"] | null
          required: boolean
          validation_type: Database["public"]["Enums"]["validation_type"] | null
        }
        Insert: {
          default_value?: string | null
          error_message?: string | null
          field_order: number
          field_type: Database["public"]["Enums"]["field_type"]
          form_id: number
          form_title: string
          help_text?: string | null
          id?: never
          image_url?: string | null
          label: string
          max_error?: string | null
          max_value?: number | null
          min_error?: string | null
          min_value?: number | null
          name?: string
          options?: string[] | null
          placeholder?: string | null
          regex?: string | null
          regex_error?: string | null
          regex_type?: Database["public"]["Enums"]["regex_type"] | null
          required?: boolean
          validation_type?:
            | Database["public"]["Enums"]["validation_type"]
            | null
        }
        Update: {
          default_value?: string | null
          error_message?: string | null
          field_order?: number
          field_type?: Database["public"]["Enums"]["field_type"]
          form_id?: number
          form_title?: string
          help_text?: string | null
          id?: never
          image_url?: string | null
          label?: string
          max_error?: string | null
          max_value?: number | null
          min_error?: string | null
          min_value?: number | null
          name?: string
          options?: string[] | null
          placeholder?: string | null
          regex?: string | null
          regex_error?: string | null
          regex_type?: Database["public"]["Enums"]["regex_type"] | null
          required?: boolean
          validation_type?:
            | Database["public"]["Enums"]["validation_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          author_id: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          published: boolean
          published_at: string | null
          status: Database["public"]["Enums"]["form_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: never
          published?: boolean
          published_at?: string | null
          status?: Database["public"]["Enums"]["form_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: never
          published?: boolean
          published_at?: string | null
          status?: Database["public"]["Enums"]["form_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          field_id: number
          form_id: number
          id: number
          response: string[] | null
          response_date: string | null
          user_id: string | null
        }
        Insert: {
          field_id: number
          form_id: number
          id?: never
          response?: string[] | null
          response_date?: string | null
          user_id?: string | null
        }
        Update: {
          field_id?: number
          form_id?: number
          id?: never
          response?: string[] | null
          response_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "form_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      field_type:
        | "INPUT_TEXT"
        | "INPUT_TEXT_AREA"
        | "INPUT_NUMBER"
        | "INPUT_CHECKBOX"
        | "INPUT_RADIO"
        | "COLOR_PICKER"
        | "DATE_PICKER"
        | "TIME_PICKER"
        | "SELECT"
        | "MULTI_SELECT"
        | "FILE_UPLOAD"
        | "INPUT_PASSWORD"
        | "INPUT_EMAIL"
        | "INPUT_URL"
      form_status: "DRAFT" | "PUBLISHED" | "DELETED" | "UNPUBLISHED"
      regex_type: "CONTAINS" | "NOT_CONTAINS" | "MATCHES" | "NOT_MATCHES"
      validation_type: "LENGTH" | "REGEX"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
