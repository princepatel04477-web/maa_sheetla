export async function onRequest(context) {
  const { next } = context;
  // Always allow root path and all subpaths to proceed normally to the main hero section and respective pages
  return next();
}
