FROM nginx:alpine

# Static files
COPY . /usr/share/nginx/html

# Clean up git or unused files from the web root
RUN rm -rf /usr/share/nginx/html/.git

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
