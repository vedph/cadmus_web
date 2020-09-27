FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/apps/cadmus/ .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
