FROM --platform=linux/amd64 node:22-alpine

RUN apk --no-cache --no-progress add \
        g++ \
        make \
        py3-pip \
        libc6-compat

# Set /app as the working directory in container
WORKDIR /app

# Copy package file
COPY package.json ./

# Update NPM & Install dependencies
RUN npm install --no-cache

# Copy the rest of our Next.js folder into /app except
COPY . .

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run the app   
CMD ["npm", "run", "dev"]