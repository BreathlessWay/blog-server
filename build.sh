docker-compose build --no-cache --force-rm docker_compose_blog_server \
&& docker-compose up -d docker_compose_blog_server docker_compose_blog_mongodb
