export type LogItemRow = Database["public"]["Tables"]["log_items"]["Row"];
export type LogItemInsert = Database["public"]["Tables"]["log_items"]["Insert"];
export type LogItemUpdate = Database["public"]["Tables"]["log_items"]["Update"];
export type LogRow = Database["public"]["Tables"]["logs"]["Row"];
export type LogInsert = Database["public"]["Tables"]["logs"]["Insert"];
export type LogViewRow = Database["public"]["Views"]["logs_summary"]["Row"];

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      log_items: {
        Row: {
          created_at: string;
          log_uuid: string;
          note: string;
          uuid: string;
        };
        Insert: {
          created_at?: string;
          log_uuid?: string;
          note?: string;
          uuid?: string;
        };
        Update: {
          created_at?: string;
          log_uuid?: string;
          note?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "log_items_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs";
            referencedColumns: ["uuid"];
          },
          {
            foreignKeyName: "log_items_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs_summary";
            referencedColumns: ["uuid"];
          },
        ];
      };
      log_permissions: {
        Row: {
          access_level: string;
          created_at: string;
          log_uuid: string;
          user_uuid: string;
          uuid: string;
        };
        Insert: {
          access_level: string;
          created_at?: string;
          log_uuid: string;
          user_uuid: string;
          uuid?: string;
        };
        Update: {
          access_level?: string;
          created_at?: string;
          log_uuid?: string;
          user_uuid?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "log_permissions_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs";
            referencedColumns: ["uuid"];
          },
          {
            foreignKeyName: "log_permissions_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs_summary";
            referencedColumns: ["uuid"];
          },
          {
            foreignKeyName: "log_permissions_user_uuid_fkey";
            columns: ["user_uuid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      log_sharing_keys: {
        Row: {
          claimer_uuid: string | null;
          created_at: string;
          id: string;
          log_uuid: string;
        };
        Insert: {
          claimer_uuid?: string | null;
          created_at?: string;
          id?: string;
          log_uuid?: string;
        };
        Update: {
          claimer_uuid?: string | null;
          created_at?: string;
          id?: string;
          log_uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "log_sharing_keys_claimer_uuid_fkey";
            columns: ["claimer_uuid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "log_sharing_keys_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs";
            referencedColumns: ["uuid"];
          },
          {
            foreignKeyName: "log_sharing_keys_log_uuid_fkey";
            columns: ["log_uuid"];
            isOneToOne: false;
            referencedRelation: "logs_summary";
            referencedColumns: ["uuid"];
          },
        ];
      };
      logs: {
        Row: {
          created_at: string;
          last_log_at: string;
          name: string;
          uuid: string;
        };
        Insert: {
          created_at?: string;
          last_log_at?: string;
          name?: string;
          uuid?: string;
        };
        Update: {
          created_at?: string;
          last_log_at?: string;
          name?: string;
          uuid?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      logs_summary: {
        Row: {
          created_at: string | null;
          last_updated_at: string | null;
          name: string | null;
          uuid: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      auth_can_add_permission: {
        Args: {
          _log_uuid: string;
        };
        Returns: boolean;
      };
      auth_can_see_log_name: {
        Args: {
          _log_uuid: string;
        };
        Returns: boolean;
      };
      auth_has_permission: {
        Args: {
          _log_uuid: string;
        };
        Returns: boolean;
      };
      auth_is_owner: {
        Args: {
          _log_uuid: string;
        };
        Returns: boolean;
      };
      sharing_key_log_uuid_unchanged: {
        Args: {
          _invite_uuid: string;
          _new_log_uuid: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
