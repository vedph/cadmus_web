FROM node:13.8.0

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
RUN ng build

EXPOSE 4200
# start app
CMD ng serve --host 0.0.0.0
