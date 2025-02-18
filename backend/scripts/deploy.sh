#!/bin/bash

# Build the application
npm run build

# Install production dependencies
npm ci --production

# Run database migrations (if any)
npm run migrate

# Start the application
npm start 