FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
