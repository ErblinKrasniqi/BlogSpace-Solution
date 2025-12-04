# 1. Use official Node image
FROM node:20-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the project files
COPY . .

# 5. Make sure images folder exists
RUN mkdir -p images

# 6. The app listens on port 8080
EXPOSE 8080

# 7. Start the app
CMD ["node", "app.js"]
