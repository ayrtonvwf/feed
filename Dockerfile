FROM node:16-alpine AS builder

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY ./app ./app
COPY ./functions ./functions
COPY ./prisma ./prisma
COPY ./public ./public
COPY ./styles ./styles
COPY package.json ./
COPY remix.config.js ./
COPY remix.env.d.ts ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts
RUN yarn run build
RUN rm -R ./node_modules
RUN yarn install --frozen-lockfile --production=true --ignore-scripts

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
#

FROM gcr.io/distroless/nodejs:16 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /home/node/app/build /app/build
COPY --from=builder /home/node/app/public /app/public
COPY --from=builder /home/node/app/node_modules /app/node_modules

EXPOSE 8080

CMD [ "/app/build/index.js" ]
