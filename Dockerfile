FROM nginx:alpine

# (opcional) copia sua config
COPY nginx.conf /etc/nginx/nginx.conf

# copia o site estático
COPY . /usr/share/nginx/html

EXPOSE 80

# o CMD padrão do nginx:alpine já inicia o Nginx no foreground
