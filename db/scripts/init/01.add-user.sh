#!/bin/bash
set -e;

USER_ROLE="readWrite"
USER_NAME="${MONGO_INITDB_USER_USERNAME:-studio-admin}"
DB="${MONGO_INITDB_DATABASE:-studio}"

if [ -n "$MONGO_INITDB_USER_PASSWORD" ]; then
	"${mongo[@]}" "$DB" <<-EOJS
		db.createUser({
			user: $(_js_escape "$USER_NAME"),
			pwd: $(_js_escape "$MONGO_INITDB_USER_PASSWORD"),
			roles: [ { role: $(_js_escape "$USER_ROLE"), db: $(_js_escape "$DB") } ]
		})
	EOJS
fi
