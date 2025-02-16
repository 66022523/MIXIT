import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  try {
    const supabase = createClient();

    // Perform a simple query to check the database connection
    const { data, error } = await supabase
      .from("circles")
      .select("count (*)", { count: "exact" });

    if (error) {
      throw new Error("Database connection failed");
    }

    return Response.json(
      {
        status: "healthy",
        message: "API is working and database is connected",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return Response.json(
      { status: "unhealthy", message: error.message },
      { status: 503 },
    );
  }
}
