FROM mongo

LABEL maintainer="smoothSally891@yahoo.com"
# TODO: move the username and password out of here
ENV MONGO_INITDB_ROOT_USERNAME admin-user
ENV MONGO_INITDB_ROOT_PASSWORD admin-password

ADD mongo-init.js /docker-entrypoint-initdb.d/
