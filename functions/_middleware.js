export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  // If arriving at root path on Sunrise Fab Tex domains
  if (
    (hostname.includes("sunrisefabtex.com") || hostname.includes("sunrisefabtex.in")) &&
    url.pathname === "/"
  ) {
    url.pathname = "/sunrise-fab-tex";
    return Response.redirect(url.toString(), 302);
  }

  // If arriving at root path on Maa Sheetla domain
  if (hostname.includes("maasheetla.com") && url.pathname === "/") {
    url.pathname = "/maa-sheetla";
    return Response.redirect(url.toString(), 302);
  }

  return next();
}
