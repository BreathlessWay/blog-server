FROM node:10.16.3-alpine
RUN mkdir -p blog-server
WORKDIR /blog-server
# add npm package
COPY package.json /blog-server/package.json
COPY .npmrc /blog-server/.npmrc
RUN npm i
# copy code
COPY . /blog-server
EXPOSE 7001
CMD npm run deploy

