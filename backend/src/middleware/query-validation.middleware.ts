export const validateQuery = (req: any, res: any, next: any) => {
  const allowedParams = ['category', 'difficulty', 'creator', 'page', 'limit'];
  const query = req.query;

  // Check for invalid query parameters
  const hasInvalidParams = Object.keys(query).some(key => !allowedParams.includes(key));
  
  if (hasInvalidParams) {
    return res.status(400).json({
      error: `Invalid query parameters. Allowed parameters are: ${allowedParams.join(', ')}`
    });
  }

  // Validate enum values if present
  if (query.category && !['Development', 'Design', 'Marketing'].includes(query.category)) {
    return res.status(400).json({ error: 'Invalid category value' });
  }

  if (query.difficulty && !['Beginner', 'Intermediate', 'Advanced'].includes(query.difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty value' });
  }

  next();
}; 