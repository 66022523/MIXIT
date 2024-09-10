export default function GET(request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  )
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  return Response.json({ message: "Hello Cron!" }, { status: 200 });
}
