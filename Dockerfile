### Stage 1: Compile and Build the codebase ###
FROM node:alpine as build
WORKDIR /usr/local/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### Stage 2: Run the app ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/planning-poker-angular /usr/share/nginx/html
EXPOSE 80
