exports.globalMiddleware = (req, res, next)=> {
  console.log(`⏱️  DATE: ${new Date().toISOString()} -METHOD: ${req.method} - PATH: ${req.path}`);
  next();
}