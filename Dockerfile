# Pull from Current node alpine docker image
FROM node:current-alpine

# Set src/app as work directory
WORKDIR src/app

# Copy All project files
COPY . .
RUN yarn cache clean
# Build
RUN yarn install
RUN yarn add axios
RUN yarn build

# Expose & Set ENV port to 3020
EXPOSE 3020
ENV PORT 3020

# Serve the build
CMD ["yarn", "start"]
