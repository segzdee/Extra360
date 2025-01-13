# Backend Dockerfile
FROM php:8.1-fpm-alpine

WORKDIR /app

RUN apk add --no-cache \
    curl \
    libpq \
    libzip-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo_mysql

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --optimize-autoloader --no-dev

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]

