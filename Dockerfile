FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 5173

RUN sed -i 's/listen\s\+80;/listen 5173;/' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]