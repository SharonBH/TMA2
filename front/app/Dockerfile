# Stage 1 - the build process
FROM node:8.9.0 as build-deps
WORKDIR app
COPY . ./
RUN npm install
COPY . ./
RUN npm rebuild node-sass
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]