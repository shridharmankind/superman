FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . ./
RUN yarn
RUN yarn env-#{env}# && yarn web-build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]