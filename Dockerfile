FROM node:20-bookworm-slim AS builder
ENV NODE_ENV=development
WORKDIR /docs

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates git && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install --include=optional

RUN ARCH=$(node -p "process.arch"); \
    if [ "$ARCH" = "arm64" ]; then \
      npm i --no-save sass-embedded-linux-arm64; \
    else \
      npm i --no-save sass-embedded-linux-x64; \
    fi

COPY amocrm_docs_md ./amocrm_docs_md

RUN npm run docs:build

FROM nginx:1.29-alpine AS runtime
ENV PORT=8080

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /docs/amocrm_docs_md/.vuepress/dist /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run/nginx /var/log/nginx \
    /usr/share/nginx/html /etc/nginx

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


