FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY dist/apps/cadmus/ .

EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
