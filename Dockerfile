FROM composer:2.5 AS composer

COPY composer.json composer.lock ./
RUN composer install --ignore-platform-reqs --no-progress --no-autoloader --no-scripts

COPY . .
RUN composer install --ignore-platform-reqs --no-progress --optimize-autoloader

FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        zip

ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite

COPY --from=composer /app /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

WORKDIR /var/www/html
