# Use an official PHP runtime as the base image
FROM php:7.4-apache

# Set environment variables
ENV DEBIAN_FRONTEND noninteractive

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    wget \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer (PHP package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory within the container
WORKDIR /var/www/html

# Copy your local ProjectSend code into the container
COPY . /var/www/html

# Run Composer to install ProjectSend's PHP dependencies
RUN composer install

RUN chmod -R 777 /var/www/html/includes/sys.config.sample.php \
    /var/www/html/upload/files \
    /var/www/html/upload/temp

# Expose port 80 (Apache)
EXPOSE 80

# Start Apache web server
CMD ["apache2-foreground"]