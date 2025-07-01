FROM node:24 AS build
WORKDIR /app
COPY . .
RUN ./deploy.sh
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/docs /app/docs
COPY --from=build /app/examples/demo/build /app/examples
