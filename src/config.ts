export const BACKEND_URI = process.env.NODE_ENV === 'production' 
  ? 'http://ec2-16-170-237-56.eu-north-1.compute.amazonaws.com:4000' 
  : 'http://localhost:4000';