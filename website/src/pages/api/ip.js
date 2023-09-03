const requestIp = require('request-ip');
export default async function myRoute(
    req,
    res
  ) {
    const detectedIp = requestIp.getClientIp(req)
    res.send({detectedIp})
  }