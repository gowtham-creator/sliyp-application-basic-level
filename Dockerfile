
# build environment
FROM node:16-alpine as react-build
WORKDIR /app


# Create production build of React App
COPY ./package*.json ./
RUN npm install --force
COPY . ./
RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

# Copy our nginx configuration
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html


# Define environment variables for Cloud Run
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

# Substitute $PORT variable in config file with the one passed via "docker run"
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
