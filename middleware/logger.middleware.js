const apiLogger = (req, res, next) => {
    const start = Date.now();
  
    const logInfo = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      userRoles: req.user ? (req.user.roles || 'No roles') : 'No user',
    };
  
    console.log(JSON.stringify(logInfo));
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    })
  
    next()
  }
  
  module.exports = {
    apiLogger
  }