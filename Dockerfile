
### STAGE 1: Build ###
FROM node:alpine AS dependencies
RUN apk update \
    && apk add --update alpine-sdk \
    && apk del alpine-sdk \
    && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
    && npm cache verify \
    && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd
COPY ./client/package*.json ./client/
COPY ./client/src/ ./client/src
COPY ./client/public/ ./client/public
COPY package*.json index.js  ./

# Build react bundle static files
FROM dependencies AS build
WORKDIR /app
COPY --from=dependencies  ./client ./
# Installing react-scripts globally lets us 
# run the "npm run build" command without it being
# added to the node_modules folder.
ENV DISABLE_ESLINT_PLUGIN=true
RUN npm install react-scripts@4.0.3 -g && \
    npm install --only=production && \
    npm run build

### STAGE 2: Run ###
FROM node:alpine as release
WORKDIR /usr/src/app
COPY --from=build /app/build ./build/
COPY --from=dependencies /package.json /index.js ./
RUN npm install --only=production

USER 1001
CMD ["node", "/usr/src/app/index.js"]
