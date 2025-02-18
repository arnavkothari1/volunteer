import sanitizeHtml from 'sanitize-html';

export const sanitizeInput = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeHtml(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeInput(item));
  }

  const result: any = {};
  for (const key in obj) {
    result[key] = sanitizeInput(obj[key]);
  }
  return result;
};

export const sanitizeMiddleware = (req: any, _res: any, next: any) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  next();
}; 