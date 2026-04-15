export type AttendanceStatus = "attending" | "not_attending";

export type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string;
          full_name: string;
          attendance_status: AttendanceStatus;
          guest_count: number | null;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          attendance_status: AttendanceStatus;
          guest_count?: number | null;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          full_name?: string;
          attendance_status?: AttendanceStatus;
          guest_count?: number | null;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type RsvpRow = Database["public"]["Tables"]["rsvps"]["Row"];
