-- ==========================================================
-- PLUMTEK FULL DATABASE MYSQL EXPORT
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `plumtek_catalog`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `plumtek_catalog`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `users`;
-- Default admin user: admin@plumtek.com / admin123
INSERT INTO `users` (`id`, `email`, `password_hash`, `name`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin@plumtek.com', '$2b$10$wE08N7E.l2P2w1N08VzFqOSY/0B9H9gG/0vV.9GzQzR3sZg9JjVdG', 'Admin User', 'admin', '2026-05-20 10:02:57', '2026-05-20 10:02:57');

-- --------------------------------------------------------
-- Table structure for `enquiries`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'new',
  `ip_address` varchar(50) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `replied_at` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `inventory`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity_in_stock` int(11) NOT NULL DEFAULT 0,
  `reorder_level` int(11) DEFAULT 10,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `activity_logs`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_user_id` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `entity_type` varchar(255) NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `categories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

TRUNCATE TABLE `categories`;
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'PPR, PP-RCT Pipes', 'ppr-pp-rct-pipes', 'Premium PPR and PP-RCT Pipes', 1, 1, NOW(), NOW()),
(2, 'PPR Fittings', 'ppr-fittings', 'High quality PPR fittings', 2, 1, NOW(), NOW()),
(3, 'PERT & Push Fittings', 'pert-push-fittings', 'PERT and Push Fittings for industrial use', 3, 1, NOW(), NOW()),
(4, 'HDPE & MDPE Fittings', 'hdpe-mdpe-fittings', 'HDPE and MDPE pipe fittings', 4, 1, NOW(), NOW()),
(5, 'Hoses', 'hoses', 'Industrial and commercial hoses', 5, 1, NOW(), NOW()),
(6, 'Taps, Faucets & Accessories', 'taps-faucets-accessories', 'Premium taps and bathroom accessories', 6, 1, NOW(), NOW());

-- Table structure for `settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_name` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `data_type` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_name` (`key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for `products`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `short_description` text NOT NULL,
  `description` text NOT NULL,
  `highlights_json` text NOT NULL,
  `specs_json` text NOT NULL,
  `image_key` varchar(500) DEFAULT NULL,
  `image_data` longtext DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `products`;
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      1,
      'heavy-duty-hot-water-pipe-32mm-hdpe-1',
      'Heavy-Duty Hot Water Pipe 32mm - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Hot Water Pipe 32mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      2,
      'heavy-duty-composite-pipe-63mm-ppr-2',
      'Heavy-Duty Composite Pipe 63mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Composite Pipe 63mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-154.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      3,
      'seamless-hot-water-pipe-1-mdpe-3',
      'Seamless Hot Water Pipe 1" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Hot Water Pipe 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      4,
      'heavy-duty-composite-pipe-50mm-pert-4',
      'Heavy-Duty Composite Pipe 50mm - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Composite Pipe 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-12.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      5,
      'corrosion-resistant-uv-resistant-pipe-75mm-ppr-5',
      'Corrosion-Resistant UV Resistant Pipe 75mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant UV Resistant Pipe 75mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Wall Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      6,
      'premium-hot-water-pipe-90mm-brass-6',
      'Premium Hot Water Pipe 90mm - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Hot Water Pipe 90mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/HEALTH FAUCET 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      7,
      'reinforced-composite-pipe-40mm-mdpe-7',
      'Reinforced Composite Pipe 40mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced Composite Pipe 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      8,
      'industrial-uv-resistant-pipe-63mm-hdpe-8',
      'Industrial UV Resistant Pipe 63mm - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial UV Resistant Pipe 63mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-28.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      9,
      'high-pressure-hot-water-pipe-3-hdpe-9',
      'High-Pressure Hot Water Pipe 3" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Hot Water Pipe 3" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower Adjustable 5a ff.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      10,
      'industrial-composite-pipe-75mm-pert-10',
      'Industrial Composite Pipe 75mm - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial Composite Pipe 75mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sink Faucet.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      11,
      'corrosion-resistant-composite-pipe-50mm-stainless-steel-11',
      'Corrosion-Resistant Composite Pipe 50mm - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Composite Pipe 50mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet Wall Blue Final.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      12,
      'heavy-duty-composite-pipe-32mm-ppr-12',
      'Heavy-Duty Composite Pipe 32mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Composite Pipe 32mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0663.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      13,
      'corrosion-resistant-composite-pipe-32mm-polymer-13',
      'Corrosion-Resistant Composite Pipe 32mm - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Composite Pipe 32mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Bib Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      14,
      'premium-uv-resistant-pipe-1-mdpe-14',
      'Premium UV Resistant Pipe 1" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium UV Resistant Pipe 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Pillar Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      15,
      'corrosion-resistant-hot-water-pipe-4-stainless-steel-15',
      'Corrosion-Resistant Hot Water Pipe 4" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Hot Water Pipe 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/MINI MONOLISA.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      16,
      'high-pressure-composite-pipe-63mm-hdpe-16',
      'High-Pressure Composite Pipe 63mm - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 63mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-79.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      17,
      'heavy-duty-hot-water-pipe-75mm-chrome-17',
      'Heavy-Duty Hot Water Pipe 75mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Hot Water Pipe 75mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-161.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      18,
      'premium-composite-pipe-1-2-stainless-steel-18',
      'Premium Composite Pipe 1/2" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Composite Pipe 1/2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/All Product-129.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      19,
      'industrial-cold-water-pipe-1-2-polymer-19',
      'Industrial Cold Water Pipe 1/2" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial Cold Water Pipe 1/2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED LEVER.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      20,
      'reinforced-uv-resistant-pipe-25mm-stainless-steel-20',
      'Reinforced UV Resistant Pipe 25mm - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced UV Resistant Pipe 25mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0657.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      21,
      'premium-composite-pipe-50mm-ppr-21',
      'Premium Composite Pipe 50mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Composite Pipe 50mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/4.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      22,
      'high-pressure-cold-water-pipe-32mm-stainless-steel-22',
      'High-Pressure Cold Water Pipe 32mm - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Cold Water Pipe 32mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Smart.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      23,
      'high-pressure-uv-resistant-pipe-110mm-mdpe-23',
      'High-Pressure UV Resistant Pipe 110mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure UV Resistant Pipe 110mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO Wall 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      24,
      'heavy-duty-composite-pipe-4-hdpe-24',
      'Heavy-Duty Composite Pipe 4" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Composite Pipe 4" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-01.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      25,
      'seamless-composite-pipe-4-pert-25',
      'Seamless Composite Pipe 4" - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Composite Pipe 4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Untitled-1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      26,
      'durable-composite-pipe-20mm-chrome-26',
      'Durable Composite Pipe 20mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Durable Composite Pipe 20mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/BIB TAP LONG BODY QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      27,
      'industrial-uv-resistant-pipe-50mm-chrome-27',
      'Industrial UV Resistant Pipe 50mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial UV Resistant Pipe 50mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP GOLDEN YELLOW 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      28,
      'durable-composite-pipe-3-4-polymer-28',
      'Durable Composite Pipe 3/4" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Durable Composite Pipe 3/4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-172.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      29,
      'premium-uv-resistant-pipe-3-4-mdpe-29',
      'Premium UV Resistant Pipe 3/4" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium UV Resistant Pipe 3/4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/All Product-135.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      30,
      'premium-composite-pipe-40mm-chrome-30',
      'Premium Composite Pipe 40mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Composite Pipe 40mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-181.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      31,
      'seamless-composite-pipe-3-4-stainless-steel-31',
      'Seamless Composite Pipe 3/4" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Composite Pipe 3/4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/All Product-140.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      32,
      'pro-grade-cold-water-pipe-90mm-ppr-32',
      'Pro-Grade Cold Water Pipe 90mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Cold Water Pipe 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Pillar Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      33,
      'industrial-hot-water-pipe-2-stainless-steel-33',
      'Industrial Hot Water Pipe 2" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial Hot Water Pipe 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-85.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      34,
      'industrial-composite-pipe-4-pert-34',
      'Industrial Composite Pipe 4" - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Industrial Composite Pipe 4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Two Way Angle Valve.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      35,
      'pro-grade-hot-water-pipe-63mm-brass-35',
      'Pro-Grade Hot Water Pipe 63mm - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Hot Water Pipe 63mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/All Product-23.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      36,
      'premium-uv-resistant-pipe-1-5-ppr-36',
      'Premium UV Resistant Pipe 1.5" - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium UV Resistant Pipe 1.5" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Bib Tap Crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      37,
      'pro-grade-cold-water-pipe-2-chrome-37',
      'Pro-Grade Cold Water Pipe 2" - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Cold Water Pipe 2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sinnkfaucet ECO 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      38,
      'pro-grade-cold-water-pipe-1-mdpe-38',
      'Pro-Grade Cold Water Pipe 1" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Cold Water Pipe 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      39,
      'seamless-uv-resistant-pipe-32mm-hdpe-39',
      'Seamless UV Resistant Pipe 32mm - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless UV Resistant Pipe 32mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Screenshot 2026-05-18 at 11.29.41 AM.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      40,
      'corrosion-resistant-composite-pipe-1-brass-40',
      'Corrosion-Resistant Composite Pipe 1" - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Composite Pipe 1" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET COMFORT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      41,
      'premium-cold-water-pipe-75mm-brass-41',
      'Premium Cold Water Pipe 75mm - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Cold Water Pipe 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet Mini.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      42,
      'high-pressure-uv-resistant-pipe-90mm-brass-42',
      'High-Pressure UV Resistant Pipe 90mm - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure UV Resistant Pipe 90mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED MONOLISA EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      43,
      'seamless-composite-pipe-32mm-ppr-43',
      'Seamless Composite Pipe 32mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Composite Pipe 32mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Kitchen Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      44,
      'heavy-duty-uv-resistant-pipe-110mm-polymer-44',
      'Heavy-Duty UV Resistant Pipe 110mm - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty UV Resistant Pipe 110mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet Mini Wall.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      45,
      'durable-hot-water-pipe-3-4-polymer-45',
      'Durable Hot Water Pipe 3/4" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Durable Hot Water Pipe 3/4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      46,
      'reinforced-uv-resistant-pipe-3-4-chrome-46',
      'Reinforced UV Resistant Pipe 3/4" - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced UV Resistant Pipe 3/4" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-151.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      47,
      'heavy-duty-hot-water-pipe-1-polymer-47',
      'Heavy-Duty Hot Water Pipe 1" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Hot Water Pipe 1" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinkfaucet.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      48,
      'high-pressure-composite-pipe-1-hdpe-48',
      'High-Pressure Composite Pipe 1" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 1" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      49,
      'heavy-duty-cold-water-pipe-3-stainless-steel-49',
      'Heavy-Duty Cold Water Pipe 3" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Cold Water Pipe 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED MONOLISA 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      50,
      'pro-grade-hot-water-pipe-20mm-chrome-50',
      'Pro-Grade Hot Water Pipe 20mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Hot Water Pipe 20mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      51,
      'corrosion-resistant-uv-resistant-pipe-2-mdpe-51',
      'Corrosion-Resistant UV Resistant Pipe 2" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant UV Resistant Pipe 2" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-114.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      52,
      'high-pressure-composite-pipe-4-mdpe-52',
      'High-Pressure Composite Pipe 4" - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sink Faucet Wall Mount Mini.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      53,
      'reinforced-hot-water-pipe-75mm-mdpe-53',
      'Reinforced Hot Water Pipe 75mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced Hot Water Pipe 75mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-29.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      54,
      'durable-composite-pipe-1-hdpe-54',
      'Durable Composite Pipe 1" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Durable Composite Pipe 1" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET COMFORT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      55,
      'premium-hot-water-pipe-90mm-hdpe-55',
      'Premium Hot Water Pipe 90mm - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Hot Water Pipe 90mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/All Product-29.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      56,
      'seamless-uv-resistant-pipe-1-2-hdpe-56',
      'Seamless UV Resistant Pipe 1/2" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless UV Resistant Pipe 1/2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/F2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      57,
      'pro-grade-composite-pipe-63mm-ppr-57',
      'Pro-Grade Composite Pipe 63mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Composite Pipe 63mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Bib Tap Crystal Long Body.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      58,
      'corrosion-resistant-cold-water-pipe-40mm-mdpe-58',
      'Corrosion-Resistant Cold Water Pipe 40mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Cold Water Pipe 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      59,
      'pro-grade-composite-pipe-1-polymer-59',
      'Pro-Grade Composite Pipe 1" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Composite Pipe 1" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/Health Faucet Images''-04.jpg',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      60,
      'seamless-composite-pipe-75mm-polymer-60',
      'Seamless Composite Pipe 75mm - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Composite Pipe 75mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/Sinkfaucet eco 5 A Quadro Table Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      61,
      'premium-hot-water-pipe-63mm-pert-61',
      'Premium Hot Water Pipe 63mm - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Hot Water Pipe 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-99.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      62,
      'reinforced-uv-resistant-pipe-110mm-mdpe-62',
      'Reinforced UV Resistant Pipe 110mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced UV Resistant Pipe 110mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-18.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      63,
      'seamless-hot-water-pipe-1-stainless-steel-63',
      'Seamless Hot Water Pipe 1" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Hot Water Pipe 1" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/Wall Mixer  Vibrant.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      64,
      'high-pressure-composite-pipe-4-ppr-64',
      'High-Pressure Composite Pipe 4" - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/5 RIGHT ANGLE VALVE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      65,
      'high-pressure-composite-pipe-4-stainless-steel-65',
      'High-Pressure Composite Pipe 4" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      66,
      'seamless-composite-pipe-40mm-polymer-66',
      'Seamless Composite Pipe 40mm - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Seamless Composite Pipe 40mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET ELEGANT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      67,
      'high-pressure-hot-water-pipe-3-stainless-steel-67',
      'High-Pressure Hot Water Pipe 3" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Hot Water Pipe 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/Concealed Stop Valve Leva.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      68,
      'corrosion-resistant-uv-resistant-pipe-75mm-stainless-steel-68',
      'Corrosion-Resistant UV Resistant Pipe 75mm - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant UV Resistant Pipe 75mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/173.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      69,
      'durable-cold-water-pipe-3-brass-69',
      'Durable Cold Water Pipe 3" - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Durable Cold Water Pipe 3" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-172.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      70,
      'reinforced-cold-water-pipe-63mm-mdpe-70',
      'Reinforced Cold Water Pipe 63mm - MDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced Cold Water Pipe 63mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/BIB Tap/BIB Tap Blue 45.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      71,
      'corrosion-resistant-cold-water-pipe-1-2-hdpe-71',
      'Corrosion-Resistant Cold Water Pipe 1/2" - HDPE',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Cold Water Pipe 1/2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO 5A Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      72,
      'reinforced-composite-pipe-50mm-ppr-72',
      'Reinforced Composite Pipe 50mm - PPR',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced Composite Pipe 50mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Pillar Tap Sleek.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      73,
      'premium-cold-water-pipe-1-polymer-73',
      'Premium Cold Water Pipe 1" - Polymer',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Premium Cold Water Pipe 1" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-76.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      74,
      'corrosion-resistant-composite-pipe-1-5-stainless-steel-74',
      'Corrosion-Resistant Composite Pipe 1.5" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Composite Pipe 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0656.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      75,
      'reinforced-hot-water-pipe-3-4-brass-75',
      'Reinforced Hot Water Pipe 3/4" - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced Hot Water Pipe 3/4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP GREY 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      76,
      'pro-grade-hot-water-pipe-2-brass-76',
      'Pro-Grade Hot Water Pipe 2" - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Hot Water Pipe 2" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-183.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      77,
      'high-pressure-composite-pipe-1-5-stainless-steel-77',
      'High-Pressure Composite Pipe 1.5" - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The High-Pressure Composite Pipe 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/22 Sinkfaucet Mini Wall Mount.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      78,
      'corrosion-resistant-uv-resistant-pipe-32mm-stainless-steel-78',
      'Corrosion-Resistant UV Resistant Pipe 32mm - Stainless Steel',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Corrosion-Resistant UV Resistant Pipe 32mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-99.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      79,
      'pro-grade-cold-water-pipe-3-pert-79',
      'Pro-Grade Cold Water Pipe 3" - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade Cold Water Pipe 3" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Square Tap Photo/DSC_0651.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      80,
      'heavy-duty-cold-water-pipe-25mm-brass-80',
      'Heavy-Duty Cold Water Pipe 25mm - Brass',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Heavy-Duty Cold Water Pipe 25mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Kitchen Mixer Smart.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      81,
      'pro-grade-uv-resistant-pipe-20mm-pert-81',
      'Pro-Grade UV Resistant Pipe 20mm - PERT',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Pro-Grade UV Resistant Pipe 20mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE Becco.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      82,
      'reinforced-uv-resistant-pipe-32mm-chrome-82',
      'Reinforced UV Resistant Pipe 32mm - Chrome',
      'PPR, PP-RCT Pipes',
      'Premium industrial-grade ppr, pp-rct pipes engineered for reliability and long-term performance.',
      'The Reinforced UV Resistant Pipe 32mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/SHOWER IMAGES/HAND SHOWER delux.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      83,
      'corrosion-resistant-union-75mm-ppr-83',
      'Corrosion-Resistant Union 75mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Union 75mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      84,
      'industrial-cross-tee-40mm-ppr-84',
      'Industrial Cross Tee 40mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial Cross Tee 40mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Pillar Tap Sleek.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      85,
      'seamless-equal-tee-3-chrome-85',
      'Seamless Equal Tee 3" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Equal Tee 3" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Over Head Shower - 5A Premium.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      86,
      'corrosion-resistant-45-elbow-20mm-hdpe-86',
      'Corrosion-Resistant 45° Elbow 20mm - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant 45° Elbow 20mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-96.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      87,
      'heavy-duty-reducer-50mm-brass-87',
      'Heavy-Duty Reducer 50mm - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Reducer 50mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      88,
      'high-pressure-coupling-75mm-ppr-88',
      'High-Pressure Coupling 75mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Coupling 75mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sink Faucet Wall Mount Mini.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      89,
      'pro-grade-reducer-25mm-mdpe-89',
      'Pro-Grade Reducer 25mm - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Reducer 25mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Washing Machine Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      90,
      'high-pressure-union-3-4-polymer-90',
      'High-Pressure Union 3/4" - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Union 3/4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-03.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      91,
      'industrial-union-1-mdpe-91',
      'Industrial Union 1" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial Union 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Pillar Tap.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      92,
      'high-pressure-union-1-mdpe-92',
      'High-Pressure Union 1" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Union 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower Adjustable 5a ff.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      93,
      'seamless-stop-valve-75mm-mdpe-93',
      'Seamless Stop Valve 75mm - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Stop Valve 75mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet Mini Wall.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      94,
      'durable-coupling-4-chrome-94',
      'Durable Coupling 4" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable Coupling 4" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/107 copy.png F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      95,
      'industrial-end-cap-32mm-brass-95',
      'Industrial End Cap 32mm - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 32mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-90.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      96,
      'corrosion-resistant-cross-tee-63mm-stainless-steel-96',
      'Corrosion-Resistant Cross Tee 63mm - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Cross Tee 63mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      97,
      'seamless-reducer-4-chrome-97',
      'Seamless Reducer 4" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Reducer 4" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Screenshot 2026-05-18 at 11.29.41 AM.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      98,
      'pro-grade-reducer-40mm-hdpe-98',
      'Pro-Grade Reducer 40mm - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Reducer 40mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-121.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      99,
      'high-pressure-cross-tee-90mm-ppr-99',
      'High-Pressure Cross Tee 90mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Cross Tee 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/BIB Tap/BIB Tap Blue 45.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      100,
      'industrial-end-cap-2-hdpe-100',
      'Industrial End Cap 2" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/159.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      101,
      'seamless-90-elbow-3-chrome-101',
      'Seamless 90° Elbow 3" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless 90° Elbow 3" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-91.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      102,
      'reinforced-flange-adapter-32mm-pert-102',
      'Reinforced Flange Adapter 32mm - PERT',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Flange Adapter 32mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/Bib Tap Vibrant.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      103,
      'pro-grade-90-elbow-1-polymer-103',
      'Pro-Grade 90° Elbow 1" - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade 90° Elbow 1" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Bib Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      104,
      'premium-coupling-1-5-pert-104',
      'Premium Coupling 1.5" - PERT',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Premium Coupling 1.5" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/All Product-134.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      105,
      'durable-90-elbow-3-4-mdpe-105',
      'Durable 90° Elbow 3/4" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable 90° Elbow 3/4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      106,
      'industrial-union-25mm-chrome-106',
      'Industrial Union 25mm - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial Union 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-80.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      107,
      'reinforced-stop-valve-1-5-mdpe-107',
      'Reinforced Stop Valve 1.5" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Stop Valve 1.5" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Bib Tap EXtn.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      108,
      'heavy-duty-union-1-chrome-108',
      'Heavy-Duty Union 1" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Union 1" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP GREY 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      109,
      'pro-grade-union-20mm-chrome-109',
      'Pro-Grade Union 20mm - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Union 20mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/All Product-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      110,
      'heavy-duty-45-elbow-32mm-stainless-steel-110',
      'Heavy-Duty 45° Elbow 32mm - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty 45° Elbow 32mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO Wall 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      111,
      'reinforced-cross-tee-2-stainless-steel-111',
      'Reinforced Cross Tee 2" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Cross Tee 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Screenshot 2026-05-18 at 11.29.41 AM.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      112,
      'seamless-flange-adapter-50mm-hdpe-112',
      'Seamless Flange Adapter 50mm - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Flange Adapter 50mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Pillar Tap Sleek.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      113,
      'durable-end-cap-3-stainless-steel-113',
      'Durable End Cap 3" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable End Cap 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/BIB TAP LEVER HANLDE COLT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      114,
      'reinforced-flange-adapter-75mm-chrome-114',
      'Reinforced Flange Adapter 75mm - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Flange Adapter 75mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0655.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      115,
      'seamless-45-elbow-110mm-brass-115',
      'Seamless 45° Elbow 110mm - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless 45° Elbow 110mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0659.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      116,
      'corrosion-resistant-90-elbow-1-ppr-116',
      'Corrosion-Resistant 90° Elbow 1" - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant 90° Elbow 1" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/All Product-130.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      117,
      'pro-grade-coupling-50mm-polymer-117',
      'Pro-Grade Coupling 50mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Coupling 50mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/4 PILLAR TAP A1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      118,
      'seamless-reducer-63mm-ppr-118',
      'Seamless Reducer 63mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Reducer 63mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-161.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      119,
      'pro-grade-cross-tee-3-polymer-119',
      'Pro-Grade Cross Tee 3" - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Cross Tee 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower only Adjustable crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      120,
      'reinforced-equal-tee-75mm-pert-120',
      'Reinforced Equal Tee 75mm - PERT',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Equal Tee 75mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-167.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      121,
      'heavy-duty-equal-tee-2-hdpe-121',
      'Heavy-Duty Equal Tee 2" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Equal Tee 2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Showers/HAND SHOWER.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      122,
      'pro-grade-union-90mm-polymer-122',
      'Pro-Grade Union 90mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Union 90mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY ANGLE VALVE/TWO WAY ANGLE VALVE WHITE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      123,
      'industrial-coupling-20mm-ppr-123',
      'Industrial Coupling 20mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial Coupling 20mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Kitchen Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      124,
      'industrial-end-cap-1-mdpe-124',
      'Industrial End Cap 1" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      125,
      'pro-grade-45-elbow-4-ppr-125',
      'Pro-Grade 45° Elbow 4" - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade 45° Elbow 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/TWO WAY ANGLE VALVE/TWO WAY ANGLE VALVE WHITE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      126,
      'corrosion-resistant-cross-tee-90mm-stainless-steel-126',
      'Corrosion-Resistant Cross Tee 90mm - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Cross Tee 90mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-21.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      127,
      'pro-grade-coupling-1-2-polymer-127',
      'Pro-Grade Coupling 1/2" - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Coupling 1/2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Garden Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      128,
      'industrial-end-cap-3-stainless-steel-128',
      'Industrial End Cap 3" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/w2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      129,
      'reinforced-cross-tee-75mm-stainless-steel-129',
      'Reinforced Cross Tee 75mm - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Cross Tee 75mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-88.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      130,
      'heavy-duty-flange-adapter-1-5-hdpe-130',
      'Heavy-Duty Flange Adapter 1.5" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Flange Adapter 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE Becco.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      131,
      'high-pressure-cross-tee-20mm-polymer-131',
      'High-Pressure Cross Tee 20mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Cross Tee 20mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Health Faucet Images''-02.jpg',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      132,
      'pro-grade-cross-tee-40mm-mdpe-132',
      'Pro-Grade Cross Tee 40mm - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Cross Tee 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-85.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      133,
      'durable-reducer-4-stainless-steel-133',
      'Durable Reducer 4" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable Reducer 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-106.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      134,
      'high-pressure-cross-tee-1-mdpe-134',
      'High-Pressure Cross Tee 1" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Cross Tee 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Smart/Sink Mixer Smart Plumtek.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      135,
      'high-pressure-flange-adapter-63mm-brass-135',
      'High-Pressure Flange Adapter 63mm - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Flange Adapter 63mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-164.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      136,
      'pro-grade-90-elbow-3-ppr-136',
      'Pro-Grade 90° Elbow 3" - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade 90° Elbow 3" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/PILLAR TAP/PILLAR TAP BLUE 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      137,
      'durable-45-elbow-50mm-chrome-137',
      'Durable 45° Elbow 50mm - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable 45° Elbow 50mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      138,
      'reinforced-stop-valve-32mm-pert-138',
      'Reinforced Stop Valve 32mm - PERT',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Stop Valve 32mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/BIB Tap/BIB Tap Yellow.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      139,
      'premium-coupling-50mm-brass-139',
      'Premium Coupling 50mm - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Premium Coupling 50mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Kitchen Mixer Smart Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      140,
      'high-pressure-stop-valve-75mm-ppr-140',
      'High-Pressure Stop Valve 75mm - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Stop Valve 75mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      141,
      'heavy-duty-45-elbow-40mm-mdpe-141',
      'Heavy-Duty 45° Elbow 40mm - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty 45° Elbow 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Long Body.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      142,
      'reinforced-stop-valve-1-2-mdpe-142',
      'Reinforced Stop Valve 1/2" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Stop Valve 1/2" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Shower Hose Delux Chrome Nuts Grey.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      143,
      'heavy-duty-stop-valve-1-chrome-143',
      'Heavy-Duty Stop Valve 1" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Stop Valve 1" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-178.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      144,
      'pro-grade-stop-valve-75mm-mdpe-144',
      'Pro-Grade Stop Valve 75mm - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Stop Valve 75mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/BIB TAP QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      145,
      'seamless-end-cap-4-stainless-steel-145',
      'Seamless End Cap 4" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless End Cap 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-71.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      146,
      'pro-grade-equal-tee-63mm-stainless-steel-146',
      'Pro-Grade Equal Tee 63mm - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Equal Tee 63mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      147,
      'seamless-equal-tee-1-5-stainless-steel-147',
      'Seamless Equal Tee 1.5" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Equal Tee 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-118.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      148,
      'high-pressure-coupling-32mm-polymer-148',
      'High-Pressure Coupling 32mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Coupling 32mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/111.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      149,
      'industrial-equal-tee-1-brass-149',
      'Industrial Equal Tee 1" - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial Equal Tee 1" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower only Adjustable crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      150,
      'durable-stop-valve-110mm-chrome-150',
      'Durable Stop Valve 110mm - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable Stop Valve 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PLANET BIB TAP T HANDLE Long Boady f.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      151,
      'heavy-duty-45-elbow-20mm-pert-151',
      'Heavy-Duty 45° Elbow 20mm - PERT',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty 45° Elbow 20mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      152,
      'durable-coupling-110mm-polymer-152',
      'Durable Coupling 110mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable Coupling 110mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO Table 5A Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      153,
      'pro-grade-end-cap-3-hdpe-153',
      'Pro-Grade End Cap 3" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade End Cap 3" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/BIB TAP LONG BODY QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      154,
      'high-pressure-union-3-4-stainless-steel-154',
      'High-Pressure Union 3/4" - Stainless Steel',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure Union 3/4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/3.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      155,
      'high-pressure-end-cap-4-polymer-155',
      'High-Pressure End Cap 4" - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure End Cap 4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/5.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      156,
      'pro-grade-reducer-1-2-chrome-156',
      'Pro-Grade Reducer 1/2" - Chrome',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Reducer 1/2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET 2.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      157,
      'premium-equal-tee-20mm-hdpe-157',
      'Premium Equal Tee 20mm - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Premium Equal Tee 20mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/Long Body/Long Body Yellow.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      158,
      'high-pressure-90-elbow-20mm-polymer-158',
      'High-Pressure 90° Elbow 20mm - Polymer',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The High-Pressure 90° Elbow 20mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Mixer.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      159,
      'seamless-union-1-hdpe-159',
      'Seamless Union 1" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Seamless Union 1" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sinkfaucet Wall.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      160,
      'industrial-end-cap-1-2-ppr-160',
      'Industrial End Cap 1/2" - PPR',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 1/2" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-12.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      161,
      'reinforced-reducer-1-5-brass-161',
      'Reinforced Reducer 1.5" - Brass',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Reducer 1.5" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-108.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      162,
      'durable-end-cap-2-hdpe-162',
      'Durable End Cap 2" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Durable End Cap 2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower Adjustable 5a crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      163,
      'reinforced-flange-adapter-1-mdpe-163',
      'Reinforced Flange Adapter 1" - MDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Flange Adapter 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/All Product-147.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      164,
      'reinforced-equal-tee-4-hdpe-164',
      'Reinforced Equal Tee 4" - HDPE',
      'PPR Fittings',
      'Premium industrial-grade ppr fittings engineered for reliability and long-term performance.',
      'The Reinforced Equal Tee 4" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP GOLDEN YELLOW 90.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      165,
      'durable-pushfit-elbow-110mm-stainless-steel-165',
      'Durable Pushfit Elbow 110mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Pushfit Elbow 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/84.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      166,
      'pro-grade-compression-fitting-1-2-polymer-166',
      'Pro-Grade Compression Fitting 1/2" - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Compression Fitting 1/2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sink Faucet Table Mount Mini.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      167,
      'heavy-duty-pushfit-connector-63mm-stainless-steel-167',
      'Heavy-Duty Pushfit Connector 63mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Connector 63mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-72.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      168,
      'premium-pushfit-elbow-3-4-ppr-168',
      'Premium Pushfit Elbow 3/4" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Elbow 3/4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED MONOLISA 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      169,
      'pro-grade-compression-fitting-40mm-polymer-169',
      'Pro-Grade Compression Fitting 40mm - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Compression Fitting 40mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower Adjustable 5a ff.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      170,
      'corrosion-resistant-manifold-4-mdpe-170',
      'Corrosion-Resistant Manifold 4" - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Manifold 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-114.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      171,
      'corrosion-resistant-manifold-63mm-chrome-171',
      'Corrosion-Resistant Manifold 63mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Manifold 63mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Pillar Tap F.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      172,
      'heavy-duty-pushfit-tee-3-brass-172',
      'Heavy-Duty Pushfit Tee 3" - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Tee 3" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/7.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      173,
      'premium-pushfit-tee-1-2-mdpe-173',
      'Premium Pushfit Tee 1/2" - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 1/2" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/107.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      174,
      'high-pressure-pushfit-connector-50mm-mdpe-174',
      'High-Pressure Pushfit Connector 50mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Connector 50mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Long Body.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      175,
      'industrial-pushfit-tee-110mm-stainless-steel-175',
      'Industrial Pushfit Tee 110mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Pushfit Tee 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F f.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      176,
      'heavy-duty-pushfit-tee-25mm-ppr-176',
      'Heavy-Duty Pushfit Tee 25mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Tee 25mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/All Product-129.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      177,
      'premium-pushfit-connector-20mm-ppr-177',
      'Premium Pushfit Connector 20mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Connector 20mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-182.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      178,
      'corrosion-resistant-manifold-63mm-stainless-steel-178',
      'Corrosion-Resistant Manifold 63mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Manifold 63mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/All Product-146.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      179,
      'premium-pushfit-tee-110mm-ppr-179',
      'Premium Pushfit Tee 110mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PILLAR TAP A1 CHARCOAL f.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      180,
      'pro-grade-pushfit-tee-40mm-pert-180',
      'Pro-Grade Pushfit Tee 40mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Pushfit Tee 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/Foot Valve Flap Type With Hose Caller Block.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      181,
      'pro-grade-pushfit-tee-1-ppr-181',
      'Pro-Grade Pushfit Tee 1" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Pushfit Tee 1" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/TWO WAY BIB TAP/TWO WAY BIB TTAP GREY 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      182,
      'pro-grade-manifold-3-mdpe-182',
      'Pro-Grade Manifold 3" - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Manifold 3" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK M HANDLE.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      183,
      'reinforced-compression-fitting-40mm-ppr-183',
      'Reinforced Compression Fitting 40mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Compression Fitting 40mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/99.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      184,
      'pro-grade-pushfit-tee-40mm-pert-184',
      'Pro-Grade Pushfit Tee 40mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Pushfit Tee 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO Table 5A Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      185,
      'durable-manifold-90mm-stainless-steel-185',
      'Durable Manifold 90mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Manifold 90mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Washing Machine Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      186,
      'heavy-duty-pushfit-elbow-3-polymer-186',
      'Heavy-Duty Pushfit Elbow 3" - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Elbow 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Center White.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      187,
      'durable-compression-fitting-3-4-brass-187',
      'Durable Compression Fitting 3/4" - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Compression Fitting 3/4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Health Faucet Images''-04.jpg',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      188,
      'corrosion-resistant-pushfit-connector-110mm-pert-188',
      'Corrosion-Resistant Pushfit Connector 110mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Pushfit Connector 110mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-22.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      189,
      'premium-pushfit-connector-2-stainless-steel-189',
      'Premium Pushfit Connector 2" - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Connector 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/All Product-157.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      190,
      'industrial-pushfit-elbow-110mm-ppr-190',
      'Industrial Pushfit Elbow 110mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Pushfit Elbow 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      191,
      'heavy-duty-pushfit-elbow-63mm-pert-191',
      'Heavy-Duty Pushfit Elbow 63mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Elbow 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/All Product-33.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      192,
      'reinforced-compression-fitting-110mm-chrome-192',
      'Reinforced Compression Fitting 110mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Compression Fitting 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO Table 5A Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      193,
      'pro-grade-manifold-4-polymer-193',
      'Pro-Grade Manifold 4" - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Manifold 4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED MONOLISA 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      194,
      'premium-compression-fitting-25mm-polymer-194',
      'Premium Compression Fitting 25mm - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Compression Fitting 25mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      195,
      'premium-pushfit-tee-20mm-mdpe-195',
      'Premium Pushfit Tee 20mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 20mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-87.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      196,
      'pro-grade-manifold-2-ppr-196',
      'Pro-Grade Manifold 2" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Manifold 2" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/Garden Tap Vibrant.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      197,
      'premium-pushfit-connector-110mm-stainless-steel-197',
      'Premium Pushfit Connector 110mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Connector 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/WALL MIXER Non Telephonic.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      198,
      'premium-manifold-3-chrome-198',
      'Premium Manifold 3" - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Manifold 3" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-106.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      199,
      'reinforced-pushfit-connector-110mm-mdpe-199',
      'Reinforced Pushfit Connector 110mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Connector 110mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower Adjustable 8 a crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      200,
      'pro-grade-pushfit-connector-2-stainless-steel-200',
      'Pro-Grade Pushfit Connector 2" - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Pushfit Connector 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/Long Body/Long Body Yellow 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      201,
      'premium-compression-fitting-3-4-hdpe-201',
      'Premium Compression Fitting 3/4" - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Compression Fitting 3/4" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0661.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      202,
      'industrial-manifold-4-brass-202',
      'Industrial Manifold 4" - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Manifold 4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/All Product-25.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      203,
      'durable-pushfit-elbow-90mm-mdpe-203',
      'Durable Pushfit Elbow 90mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Pushfit Elbow 90mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Smart.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      204,
      'reinforced-pushfit-elbow-63mm-pert-204',
      'Reinforced Pushfit Elbow 63mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Elbow 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Connections Hose Heavy Duty.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      205,
      'seamless-pushfit-tee-75mm-pert-205',
      'Seamless Pushfit Tee 75mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Tee 75mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE Becco.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      206,
      'durable-pushfit-elbow-3-4-stainless-steel-206',
      'Durable Pushfit Elbow 3/4" - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Pushfit Elbow 3/4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/BIB TAP LONG BODY QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      207,
      'heavy-duty-pushfit-connector-32mm-hdpe-207',
      'Heavy-Duty Pushfit Connector 32mm - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Connector 32mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      208,
      'premium-compression-fitting-20mm-pert-208',
      'Premium Compression Fitting 20mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Compression Fitting 20mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sinnkfaucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      209,
      'industrial-pushfit-connector-4-mdpe-209',
      'Industrial Pushfit Connector 4" - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Pushfit Connector 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      210,
      'high-pressure-pushfit-elbow-75mm-brass-210',
      'High-Pressure Pushfit Elbow 75mm - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Elbow 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0660.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      211,
      'premium-pushfit-connector-110mm-chrome-211',
      'Premium Pushfit Connector 110mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Connector 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sink Mixer Ultra.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      212,
      'heavy-duty-pushfit-elbow-1-5-hdpe-212',
      'Heavy-Duty Pushfit Elbow 1.5" - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Elbow 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Pillar Tap Sleek Full Set.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      213,
      'seamless-pushfit-tee-1-5-brass-213',
      'Seamless Pushfit Tee 1.5" - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Tee 1.5" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Pillar Tap F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      214,
      'seamless-manifold-63mm-polymer-214',
      'Seamless Manifold 63mm - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Manifold 63mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Smart/Sink Mixer Smart Plumtek.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      215,
      'seamless-pushfit-elbow-110mm-chrome-215',
      'Seamless Pushfit Elbow 110mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Elbow 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-183.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      216,
      'seamless-pushfit-tee-63mm-hdpe-216',
      'Seamless Pushfit Tee 63mm - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Tee 63mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-01.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      217,
      'reinforced-manifold-4-stainless-steel-217',
      'Reinforced Manifold 4" - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Manifold 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Bib Tap Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      218,
      'durable-compression-fitting-1-2-ppr-218',
      'Durable Compression Fitting 1/2" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Compression Fitting 1/2" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-171.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      219,
      'reinforced-pushfit-connector-110mm-stainless-steel-219',
      'Reinforced Pushfit Connector 110mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Connector 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Wall Mixer Whiter Center Blue Colour.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      220,
      'high-pressure-pushfit-connector-32mm-chrome-220',
      'High-Pressure Pushfit Connector 32mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Connector 32mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-98.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      221,
      'industrial-pushfit-connector-32mm-chrome-221',
      'Industrial Pushfit Connector 32mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Pushfit Connector 32mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-170.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      222,
      'heavy-duty-pushfit-elbow-2-chrome-222',
      'Heavy-Duty Pushfit Elbow 2" - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Pushfit Elbow 2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/5.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      223,
      'high-pressure-pushfit-elbow-25mm-pert-223',
      'High-Pressure Pushfit Elbow 25mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Elbow 25mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-98.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      224,
      'high-pressure-pushfit-tee-40mm-stainless-steel-224',
      'High-Pressure Pushfit Tee 40mm - Stainless Steel',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Tee 40mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      225,
      'durable-manifold-1-5-hdpe-225',
      'Durable Manifold 1.5" - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Manifold 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      226,
      'reinforced-pushfit-tee-40mm-polymer-226',
      'Reinforced Pushfit Tee 40mm - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Tee 40mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/All Product-132.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      227,
      'high-pressure-pushfit-tee-4-ppr-227',
      'High-Pressure Pushfit Tee 4" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The High-Pressure Pushfit Tee 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-113.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      228,
      'durable-pushfit-tee-32mm-ppr-228',
      'Durable Pushfit Tee 32mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Pushfit Tee 32mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PILLAR TAP A1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      229,
      'pro-grade-pushfit-tee-40mm-brass-229',
      'Pro-Grade Pushfit Tee 40mm - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Pushfit Tee 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/SHOWER IMAGES/ONLY SHOWER.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      230,
      'seamless-manifold-25mm-chrome-230',
      'Seamless Manifold 25mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Manifold 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      231,
      'seamless-pushfit-elbow-40mm-chrome-231',
      'Seamless Pushfit Elbow 40mm - Chrome',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Elbow 40mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/12 WASHING MACHINE TAP.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      232,
      'seamless-manifold-32mm-mdpe-232',
      'Seamless Manifold 32mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Manifold 32mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet Wall Blue Final.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      233,
      'corrosion-resistant-pushfit-connector-110mm-ppr-233',
      'Corrosion-Resistant Pushfit Connector 110mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Pushfit Connector 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/F3.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      234,
      'reinforced-pushfit-connector-40mm-pert-234',
      'Reinforced Pushfit Connector 40mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Connector 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/2 LONG BODY.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      235,
      'premium-pushfit-tee-1-5-hdpe-235',
      'Premium Pushfit Tee 1.5" - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED MONOLISA EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      236,
      'seamless-compression-fitting-1-2-hdpe-236',
      'Seamless Compression Fitting 1/2" - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Compression Fitting 1/2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet Mini.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      237,
      'seamless-pushfit-elbow-40mm-pert-237',
      'Seamless Pushfit Elbow 40mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Elbow 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Sink Faucet Mini.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      238,
      'reinforced-pushfit-tee-63mm-hdpe-238',
      'Reinforced Pushfit Tee 63mm - HDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Pushfit Tee 63mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0664.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      239,
      'durable-compression-fitting-20mm-polymer-239',
      'Durable Compression Fitting 20mm - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Durable Compression Fitting 20mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/Foot Valve Flap Type With Hose Caller Block.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      240,
      'seamless-pushfit-elbow-40mm-brass-240',
      'Seamless Pushfit Elbow 40mm - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Pushfit Elbow 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Showers/Over Head Shower 5a.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      241,
      'industrial-pushfit-elbow-25mm-ppr-241',
      'Industrial Pushfit Elbow 25mm - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Industrial Pushfit Elbow 25mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-01.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      242,
      'seamless-manifold-50mm-pert-242',
      'Seamless Manifold 50mm - PERT',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Seamless Manifold 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-111.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      243,
      'reinforced-manifold-75mm-mdpe-243',
      'Reinforced Manifold 75mm - MDPE',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Reinforced Manifold 75mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/21 Sinkfaucet Mini Table Mount.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      244,
      'premium-pushfit-connector-2-polymer-244',
      'Premium Pushfit Connector 2" - Polymer',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Connector 2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 45.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      245,
      'premium-pushfit-tee-110mm-brass-245',
      'Premium Pushfit Tee 110mm - Brass',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 110mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/Foot Valve Spring Type With Hose Caller Block.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      246,
      'premium-pushfit-tee-3-4-ppr-246',
      'Premium Pushfit Tee 3/4" - PPR',
      'PERT & Push Fittings',
      'Premium industrial-grade pert & push fittings engineered for reliability and long-term performance.',
      'The Premium Pushfit Tee 3/4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-95.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      247,
      'premium-saddle-63mm-mdpe-247',
      'Premium Saddle 63mm - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Saddle 63mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/BIB Tap/BIB Tap Blue 45.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      248,
      'high-pressure-end-cap-110mm-mdpe-248',
      'High-Pressure End Cap 110mm - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure End Cap 110mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Smart.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      249,
      'durable-saddle-50mm-polymer-249',
      'Durable Saddle 50mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Durable Saddle 50mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-99.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      250,
      'industrial-end-cap-3-polymer-250',
      'Industrial End Cap 3" - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Kitchen Mixer Smart.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      251,
      'seamless-female-adaptor-90mm-hdpe-251',
      'Seamless Female Adaptor 90mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Female Adaptor 90mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/3.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      252,
      'pro-grade-end-cap-90mm-hdpe-252',
      'Pro-Grade End Cap 90mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade End Cap 90mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO Table 8A Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      253,
      'industrial-male-adaptor-63mm-ppr-253',
      'Industrial Male Adaptor 63mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Male Adaptor 63mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/All Product-31.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      254,
      'high-pressure-female-adaptor-3-brass-254',
      'High-Pressure Female Adaptor 3" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Female Adaptor 3" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Wall Mixer Whiter Center.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      255,
      'heavy-duty-female-adaptor-3-4-stainless-steel-255',
      'Heavy-Duty Female Adaptor 3/4" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Female Adaptor 3/4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-06.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      256,
      'pro-grade-compression-elbow-3-mdpe-256',
      'Pro-Grade Compression Elbow 3" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Compression Elbow 3" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/All Product-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      257,
      'premium-saddle-63mm-brass-257',
      'Premium Saddle 63mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Saddle 63mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Washing Machine Tap White.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      258,
      'durable-male-adaptor-1-5-hdpe-258',
      'Durable Male Adaptor 1.5" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Durable Male Adaptor 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/F2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      259,
      'industrial-compression-tee-20mm-mdpe-259',
      'Industrial Compression Tee 20mm - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Tee 20mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-111.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      260,
      'high-pressure-male-adaptor-63mm-chrome-260',
      'High-Pressure Male Adaptor 63mm - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Male Adaptor 63mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/173.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      261,
      'pro-grade-saddle-40mm-brass-261',
      'Pro-Grade Saddle 40mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Saddle 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE Becco.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      262,
      'reinforced-male-adaptor-90mm-hdpe-262',
      'Reinforced Male Adaptor 90mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced Male Adaptor 90mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/10.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      263,
      'reinforced-end-cap-2-stainless-steel-263',
      'Reinforced End Cap 2" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced End Cap 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Two Bib tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      264,
      'high-pressure-female-adaptor-1-5-mdpe-264',
      'High-Pressure Female Adaptor 1.5" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Female Adaptor 1.5" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/6.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      265,
      'industrial-compression-elbow-2-chrome-265',
      'Industrial Compression Elbow 2" - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Elbow 2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-119.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      266,
      'heavy-duty-saddle-4-stainless-steel-266',
      'Heavy-Duty Saddle 4" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Saddle 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/BIB TAP LEVER HANLDE COLT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      267,
      'corrosion-resistant-male-adaptor-4-stainless-steel-267',
      'Corrosion-Resistant Male Adaptor 4" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Male Adaptor 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED M.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      268,
      'seamless-saddle-50mm-brass-268',
      'Seamless Saddle 50mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Saddle 50mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/Waste Pipe Adopter.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      269,
      'high-pressure-compression-tee-4-brass-269',
      'High-Pressure Compression Tee 4" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Compression Tee 4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/All Product-157.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      270,
      'premium-compression-elbow-1-2-chrome-270',
      'Premium Compression Elbow 1/2" - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Compression Elbow 1/2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/All Product-147.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      271,
      'industrial-compression-elbow-20mm-stainless-steel-271',
      'Industrial Compression Elbow 20mm - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Elbow 20mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED MONOLISA.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      272,
      'premium-male-adaptor-4-pert-272',
      'Premium Male Adaptor 4" - PERT',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Male Adaptor 4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-180.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      273,
      'reinforced-female-adaptor-40mm-ppr-273',
      'Reinforced Female Adaptor 40mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced Female Adaptor 40mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Smart/Sink Mixer Smart Plumtek Premium Vibrant Flange.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      274,
      'pro-grade-male-adaptor-1-5-hdpe-274',
      'Pro-Grade Male Adaptor 1.5" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Male Adaptor 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-27.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      275,
      'high-pressure-female-adaptor-4-ppr-275',
      'High-Pressure Female Adaptor 4" - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Female Adaptor 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-02.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      276,
      'industrial-female-adaptor-2-hdpe-276',
      'Industrial Female Adaptor 2" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Female Adaptor 2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/SINK FAUCET/SINK FAUCET MINI BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      277,
      'high-pressure-male-adaptor-1-ppr-277',
      'High-Pressure Male Adaptor 1" - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Male Adaptor 1" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/All Product-129.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      278,
      'seamless-compression-elbow-32mm-brass-278',
      'Seamless Compression Elbow 32mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Compression Elbow 32mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-155.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      279,
      'pro-grade-saddle-25mm-polymer-279',
      'Pro-Grade Saddle 25mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Saddle 25mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-124.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      280,
      'reinforced-male-adaptor-75mm-polymer-280',
      'Reinforced Male Adaptor 75mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced Male Adaptor 75mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/157 A spindle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      281,
      'seamless-compression-elbow-110mm-hdpe-281',
      'Seamless Compression Elbow 110mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Compression Elbow 110mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Right Angle Valve.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      282,
      'seamless-compression-elbow-3-4-pert-282',
      'Seamless Compression Elbow 3/4" - PERT',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Compression Elbow 3/4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Ultra/Sink Mixer Ultra Plumtek Premium Monolisa Flange.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      283,
      'premium-end-cap-1-2-brass-283',
      'Premium End Cap 1/2" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium End Cap 1/2" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/All Product-69.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      284,
      'corrosion-resistant-female-adaptor-4-brass-284',
      'Corrosion-Resistant Female Adaptor 4" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Female Adaptor 4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/2 LONG BODY.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      285,
      'corrosion-resistant-saddle-3-4-brass-285',
      'Corrosion-Resistant Saddle 3/4" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Saddle 3/4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/Bibtap Monolisa Washing Machine.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      286,
      'high-pressure-saddle-90mm-pert-286',
      'High-Pressure Saddle 90mm - PERT',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Saddle 90mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-08.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      287,
      'corrosion-resistant-compression-tee-4-brass-287',
      'Corrosion-Resistant Compression Tee 4" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Compression Tee 4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/BIB TAP Extn QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      288,
      'seamless-end-cap-32mm-mdpe-288',
      'Seamless End Cap 32mm - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless End Cap 32mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      289,
      'heavy-duty-end-cap-25mm-hdpe-289',
      'Heavy-Duty End Cap 25mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty End Cap 25mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet Tabel Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      290,
      'heavy-duty-saddle-2-polymer-290',
      'Heavy-Duty Saddle 2" - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Saddle 2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet ECO 5A Blue Final.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      291,
      'reinforced-end-cap-90mm-brass-291',
      'Reinforced End Cap 90mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced End Cap 90mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-117.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      292,
      'high-pressure-male-adaptor-90mm-chrome-292',
      'High-Pressure Male Adaptor 90mm - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Male Adaptor 90mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/5.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      293,
      'heavy-duty-saddle-3-ppr-293',
      'Heavy-Duty Saddle 3" - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Saddle 3" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Bib Tap EXtn.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      294,
      'corrosion-resistant-end-cap-20mm-ppr-294',
      'Corrosion-Resistant End Cap 20mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant End Cap 20mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Untitled-1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      295,
      'heavy-duty-saddle-110mm-chrome-295',
      'Heavy-Duty Saddle 110mm - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Saddle 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-28.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      296,
      'heavy-duty-end-cap-3-brass-296',
      'Heavy-Duty End Cap 3" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty End Cap 3" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-06.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      297,
      'reinforced-compression-tee-3-brass-297',
      'Reinforced Compression Tee 3" - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced Compression Tee 3" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      298,
      'seamless-female-adaptor-110mm-stainless-steel-298',
      'Seamless Female Adaptor 110mm - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Female Adaptor 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-177.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      299,
      'premium-compression-tee-50mm-hdpe-299',
      'Premium Compression Tee 50mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Compression Tee 50mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Washing Machine Tap White.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      300,
      'durable-compression-elbow-3-4-pert-300',
      'Durable Compression Elbow 3/4" - PERT',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Durable Compression Elbow 3/4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sink Faucet.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      301,
      'pro-grade-saddle-3-mdpe-301',
      'Pro-Grade Saddle 3" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Pro-Grade Saddle 3" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Health Faucet Images''-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      302,
      'high-pressure-compression-elbow-2-stainless-steel-302',
      'High-Pressure Compression Elbow 2" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Compression Elbow 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK LEVER HANDLE Becco.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      303,
      'premium-compression-tee-90mm-chrome-303',
      'Premium Compression Tee 90mm - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Compression Tee 90mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET CLASSIC.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      304,
      'corrosion-resistant-female-adaptor-40mm-brass-304',
      'Corrosion-Resistant Female Adaptor 40mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Female Adaptor 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-24.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      305,
      'premium-compression-elbow-3-4-hdpe-305',
      'Premium Compression Elbow 3/4" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Compression Elbow 3/4" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Two Way Bib Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      306,
      'reinforced-end-cap-4-ppr-306',
      'Reinforced End Cap 4" - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced End Cap 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      307,
      'heavy-duty-female-adaptor-32mm-chrome-307',
      'Heavy-Duty Female Adaptor 32mm - Chrome',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Female Adaptor 32mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/173.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      308,
      'heavy-duty-saddle-2-stainless-steel-308',
      'Heavy-Duty Saddle 2" - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Saddle 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Mixer Smart.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      309,
      'durable-end-cap-110mm-polymer-309',
      'Durable End Cap 110mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Durable End Cap 110mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0662.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      310,
      'premium-end-cap-40mm-polymer-310',
      'Premium End Cap 40mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium End Cap 40mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/RIGHT ANGLE VALVE/RIGHT ANGLE VALVE GREY.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      311,
      'corrosion-resistant-female-adaptor-1-5-polymer-311',
      'Corrosion-Resistant Female Adaptor 1.5" - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Female Adaptor 1.5" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED VIBRANT EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      312,
      'industrial-female-adaptor-20mm-ppr-312',
      'Industrial Female Adaptor 20mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Female Adaptor 20mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED VIBRANT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      313,
      'high-pressure-saddle-25mm-polymer-313',
      'High-Pressure Saddle 25mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Saddle 25mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-181.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      314,
      'industrial-end-cap-25mm-hdpe-314',
      'Industrial End Cap 25mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial End Cap 25mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-74.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      315,
      'seamless-saddle-3-4-mdpe-315',
      'Seamless Saddle 3/4" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Saddle 3/4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Sink Faucet.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      316,
      'industrial-compression-tee-110mm-polymer-316',
      'Industrial Compression Tee 110mm - Polymer',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Tee 110mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO Wall 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      317,
      'premium-female-adaptor-75mm-hdpe-317',
      'Premium Female Adaptor 75mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Female Adaptor 75mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Right Angle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      318,
      'seamless-female-adaptor-1-2-hdpe-318',
      'Seamless Female Adaptor 1/2" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Female Adaptor 1/2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO M SERIES/Sinkfaucet Mini  Wall QUODRO M Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      319,
      'premium-male-adaptor-20mm-ppr-319',
      'Premium Male Adaptor 20mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Premium Male Adaptor 20mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/RIGHT ANGLE VALVE/RIGHT ANGLE VALVE WHITE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      320,
      'heavy-duty-compression-elbow-1-5-mdpe-320',
      'Heavy-Duty Compression Elbow 1.5" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Compression Elbow 1.5" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/6 SINKFAUCET TABLE MOUNT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      321,
      'industrial-compression-elbow-4-mdpe-321',
      'Industrial Compression Elbow 4" - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Elbow 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Washing Machine Tap.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      322,
      'corrosion-resistant-compression-tee-1-hdpe-322',
      'Corrosion-Resistant Compression Tee 1" - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Compression Tee 1" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Washimachine Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      323,
      'high-pressure-compression-elbow-75mm-brass-323',
      'High-Pressure Compression Elbow 75mm - Brass',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The High-Pressure Compression Elbow 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/Concealed Stop Valve Leva.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      324,
      'reinforced-compression-tee-40mm-hdpe-324',
      'Reinforced Compression Tee 40mm - HDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Reinforced Compression Tee 40mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Bib Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      325,
      'industrial-compression-elbow-25mm-mdpe-325',
      'Industrial Compression Elbow 25mm - MDPE',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Industrial Compression Elbow 25mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/All Product-133.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      326,
      'heavy-duty-female-adaptor-63mm-pert-326',
      'Heavy-Duty Female Adaptor 63mm - PERT',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Female Adaptor 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      327,
      'seamless-compression-elbow-90mm-ppr-327',
      'Seamless Compression Elbow 90mm - PPR',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Seamless Compression Elbow 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-149.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      328,
      'heavy-duty-female-adaptor-75mm-stainless-steel-328',
      'Heavy-Duty Female Adaptor 75mm - Stainless Steel',
      'HDPE & MDPE Fittings',
      'Premium industrial-grade hdpe & mdpe fittings engineered for reliability and long-term performance.',
      'The Heavy-Duty Female Adaptor 75mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO M SERIES/Sinkfaucet Mini  QUODRO M Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      329,
      'industrial-pneumatic-hose-90mm-stainless-steel-329',
      'Industrial Pneumatic Hose 90mm - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Pneumatic Hose 90mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/All Product-157.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      330,
      'high-pressure-suction-hose-32mm-mdpe-330',
      'High-Pressure Suction Hose 32mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Suction Hose 32mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/RIGHT ANGLE VALVE/RIGHT ANGLE VALVE GOLDEN.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      331,
      'reinforced-braided-hose-1-mdpe-331',
      'Reinforced Braided Hose 1" - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Braided Hose 1" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Wall Mixer Whiter Center Blue Colour.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      332,
      'heavy-duty-suction-hose-90mm-brass-332',
      'Heavy-Duty Suction Hose 90mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Suction Hose 90mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0655.JPG',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      333,
      'durable-corrugated-hose-3-4-brass-333',
      'Durable Corrugated Hose 3/4" - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Durable Corrugated Hose 3/4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/All Product-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      334,
      'premium-suction-hose-1-5-brass-334',
      'Premium Suction Hose 1.5" - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Suction Hose 1.5" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0664.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      335,
      'heavy-duty-braided-hose-40mm-ppr-335',
      'Heavy-Duty Braided Hose 40mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Braided Hose 40mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/Plumtek T Plus Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      336,
      'industrial-corrugated-hose-1-pert-336',
      'Industrial Corrugated Hose 1" - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Corrugated Hose 1" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Right Angle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      337,
      'premium-fire-hose-2-stainless-steel-337',
      'Premium Fire Hose 2" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Fire Hose 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-10.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      338,
      'pro-grade-braided-hose-50mm-hdpe-338',
      'Pro-Grade Braided Hose 50mm - HDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Pro-Grade Braided Hose 50mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-10.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      339,
      'heavy-duty-pneumatic-hose-110mm-ppr-339',
      'Heavy-Duty Pneumatic Hose 110mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Pneumatic Hose 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower only Adjustable crystal.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      340,
      'industrial-suction-hose-25mm-hdpe-340',
      'Industrial Suction Hose 25mm - HDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Suction Hose 25mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Sink Mixer.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      341,
      'durable-corrugated-hose-2-chrome-341',
      'Durable Corrugated Hose 2" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Durable Corrugated Hose 2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/107 copy.png F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      342,
      'high-pressure-corrugated-hose-2-polymer-342',
      'High-Pressure Corrugated Hose 2" - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Corrugated Hose 2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/PILLAR TAP/PILLAR TAP BLUE 90.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      343,
      'premium-fire-hose-40mm-mdpe-343',
      'Premium Fire Hose 40mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Fire Hose 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PLANET BIB TAP T HANDLE Long Boady f.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      344,
      'heavy-duty-corrugated-hose-1-2-stainless-steel-344',
      'Heavy-Duty Corrugated Hose 1/2" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Corrugated Hose 1/2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-164.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      345,
      'heavy-duty-braided-hose-1-2-pert-345',
      'Heavy-Duty Braided Hose 1/2" - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Braided Hose 1/2" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/Concealed Stop Valve Leva.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      346,
      'corrosion-resistant-pneumatic-hose-32mm-pert-346',
      'Corrosion-Resistant Pneumatic Hose 32mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Pneumatic Hose 32mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-107.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      347,
      'corrosion-resistant-garden-hose-1-5-stainless-steel-347',
      'Corrosion-Resistant Garden Hose 1.5" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Garden Hose 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sink Faucet Table Mount Mini Final.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      348,
      'high-pressure-welding-hose-4-stainless-steel-348',
      'High-Pressure Welding Hose 4" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Welding Hose 4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/77.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      349,
      'industrial-welding-hose-3-stainless-steel-349',
      'Industrial Welding Hose 3" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Welding Hose 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Garden Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      350,
      'heavy-duty-braided-hose-25mm-pert-350',
      'Heavy-Duty Braided Hose 25mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Braided Hose 25mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      351,
      'heavy-duty-braided-hose-75mm-pert-351',
      'Heavy-Duty Braided Hose 75mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Braided Hose 75mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Sink Faucet Table  Mini Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      352,
      'reinforced-garden-hose-75mm-pert-352',
      'Reinforced Garden Hose 75mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Garden Hose 75mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY ANGLE VALVE/TWO WAY ANGLE VALVE WHITE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      353,
      'seamless-fire-hose-110mm-mdpe-353',
      'Seamless Fire Hose 110mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Fire Hose 110mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      354,
      'reinforced-suction-hose-20mm-stainless-steel-354',
      'Reinforced Suction Hose 20mm - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Suction Hose 20mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/Concealed Stop Valve Leva.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      355,
      'premium-garden-hose-90mm-ppr-355',
      'Premium Garden Hose 90mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Garden Hose 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/Garden Tap Vibrant.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      356,
      'seamless-welding-hose-40mm-mdpe-356',
      'Seamless Welding Hose 40mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Welding Hose 40mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0658.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      357,
      'seamless-suction-hose-1-5-mdpe-357',
      'Seamless Suction Hose 1.5" - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Suction Hose 1.5" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PLANET BIB TAP T HANDLE Long Boady.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      358,
      'heavy-duty-welding-hose-40mm-stainless-steel-358',
      'Heavy-Duty Welding Hose 40mm - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Welding Hose 40mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/09.04.2024 Sakthi/DSC_0660.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      359,
      'high-pressure-welding-hose-3-stainless-steel-359',
      'High-Pressure Welding Hose 3" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Welding Hose 3" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      360,
      'corrosion-resistant-welding-hose-50mm-stainless-steel-360',
      'Corrosion-Resistant Welding Hose 50mm - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Welding Hose 50mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PILLAR TAP A1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      361,
      'seamless-welding-hose-2-brass-361',
      'Seamless Welding Hose 2" - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Welding Hose 2" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/HEALTH FAUCET 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      362,
      'durable-braided-hose-110mm-chrome-362',
      'Durable Braided Hose 110mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Durable Braided Hose 110mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      363,
      'reinforced-welding-hose-20mm-polymer-363',
      'Reinforced Welding Hose 20mm - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Welding Hose 20mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-06.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      364,
      'high-pressure-braided-hose-20mm-hdpe-364',
      'High-Pressure Braided Hose 20mm - HDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Braided Hose 20mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/Bib Tap Washing Machine Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      365,
      'pro-grade-welding-hose-32mm-hdpe-365',
      'Pro-Grade Welding Hose 32mm - HDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Pro-Grade Welding Hose 32mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Wall Mixer Whiter Center Blue Colour.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      366,
      'reinforced-welding-hose-1-2-stainless-steel-366',
      'Reinforced Welding Hose 1/2" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Welding Hose 1/2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/8.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      367,
      'reinforced-fire-hose-1-2-chrome-367',
      'Reinforced Fire Hose 1/2" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Fire Hose 1/2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/TWO WAY BIB TAP/TWO WAY BIB TTAP GREY 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      368,
      'heavy-duty-pneumatic-hose-90mm-ppr-368',
      'Heavy-Duty Pneumatic Hose 90mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Pneumatic Hose 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Ultra/Sink Mixer Ultra Plumtek Premium Monolisa.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      369,
      'premium-welding-hose-3-polymer-369',
      'Premium Welding Hose 3" - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Welding Hose 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-124.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      370,
      'premium-garden-hose-4-mdpe-370',
      'Premium Garden Hose 4" - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Garden Hose 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Pillar Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      371,
      'pro-grade-welding-hose-90mm-ppr-371',
      'Pro-Grade Welding Hose 90mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Pro-Grade Welding Hose 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Garden Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      372,
      'durable-braided-hose-75mm-brass-372',
      'Durable Braided Hose 75mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Durable Braided Hose 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/7.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      373,
      'seamless-pneumatic-hose-50mm-chrome-373',
      'Seamless Pneumatic Hose 50mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Pneumatic Hose 50mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-84.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      374,
      'premium-suction-hose-90mm-ppr-374',
      'Premium Suction Hose 90mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Suction Hose 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/LONG BODY BIB TAP T HANDLE FLANGE  Final.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      375,
      'durable-welding-hose-90mm-mdpe-375',
      'Durable Welding Hose 90mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Durable Welding Hose 90mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-71.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      376,
      'seamless-welding-hose-1-5-polymer-376',
      'Seamless Welding Hose 1.5" - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Welding Hose 1.5" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      377,
      'premium-suction-hose-25mm-polymer-377',
      'Premium Suction Hose 25mm - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Suction Hose 25mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/5 RIGHT ANGLE VALVE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      378,
      'industrial-braided-hose-1-2-chrome-378',
      'Industrial Braided Hose 1/2" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Braided Hose 1/2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/SHOWER IMAGES/OVER HEAD 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      379,
      'industrial-welding-hose-1-ppr-379',
      'Industrial Welding Hose 1" - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Welding Hose 1" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-17.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      380,
      'seamless-braided-hose-25mm-chrome-380',
      'Seamless Braided Hose 25mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Braided Hose 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-88.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      381,
      'corrosion-resistant-fire-hose-1-chrome-381',
      'Corrosion-Resistant Fire Hose 1" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Fire Hose 1" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Pillar Tap Sleek 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      382,
      'heavy-duty-welding-hose-20mm-brass-382',
      'Heavy-Duty Welding Hose 20mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Welding Hose 20mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/HEALTH FAUCET 4.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      383,
      'seamless-pneumatic-hose-63mm-pert-383',
      'Seamless Pneumatic Hose 63mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Pneumatic Hose 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Sink Mixer.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      384,
      'industrial-welding-hose-32mm-brass-384',
      'Industrial Welding Hose 32mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Welding Hose 32mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED VIBRANT EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      385,
      'seamless-braided-hose-20mm-pert-385',
      'Seamless Braided Hose 20mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Braided Hose 20mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-155.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      386,
      'reinforced-fire-hose-110mm-ppr-386',
      'Reinforced Fire Hose 110mm - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Fire Hose 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/RIGHT ANGLE VALVE/RIGHT ANGLE VALVE GOLDEN.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      387,
      'pro-grade-corrugated-hose-1-polymer-387',
      'Pro-Grade Corrugated Hose 1" - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Pro-Grade Corrugated Hose 1" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/5 RIGHT ANGLE VALVE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      388,
      'reinforced-corrugated-hose-20mm-pert-388',
      'Reinforced Corrugated Hose 20mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Corrugated Hose 20mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      389,
      'premium-welding-hose-50mm-pert-389',
      'Premium Welding Hose 50mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Welding Hose 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0657.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      390,
      'corrosion-resistant-garden-hose-90mm-mdpe-390',
      'Corrosion-Resistant Garden Hose 90mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Garden Hose 90mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/129.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      391,
      'high-pressure-garden-hose-1-5-hdpe-391',
      'High-Pressure Garden Hose 1.5" - HDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Garden Hose 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-11.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      392,
      'seamless-fire-hose-75mm-brass-392',
      'Seamless Fire Hose 75mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Fire Hose 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/HEALTH FAUCET 1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      393,
      'seamless-garden-hose-4-polymer-393',
      'Seamless Garden Hose 4" - Polymer',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Seamless Garden Hose 4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-96.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      394,
      'premium-corrugated-hose-25mm-chrome-394',
      'Premium Corrugated Hose 25mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Corrugated Hose 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/13 GARDEN TAP.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      395,
      'corrosion-resistant-garden-hose-25mm-chrome-395',
      'Corrosion-Resistant Garden Hose 25mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Garden Hose 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/All Product-136.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      396,
      'industrial-braided-hose-2-brass-396',
      'Industrial Braided Hose 2" - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Braided Hose 2" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/Foot Valve Flap Type With Hose Caller Block.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      397,
      'reinforced-suction-hose-4-ppr-397',
      'Reinforced Suction Hose 4" - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Suction Hose 4" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      398,
      'corrosion-resistant-braided-hose-25mm-pert-398',
      'Corrosion-Resistant Braided Hose 25mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Braided Hose 25mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Kitchen Mixer Center White.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      399,
      'high-pressure-corrugated-hose-32mm-mdpe-399',
      'High-Pressure Corrugated Hose 32mm - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Corrugated Hose 32mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED MONOLISA EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      400,
      'reinforced-fire-hose-4-mdpe-400',
      'Reinforced Fire Hose 4" - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Fire Hose 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/SINK FAUCET/SINK FAUCET Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      401,
      'premium-corrugated-hose-1-ppr-401',
      'Premium Corrugated Hose 1" - PPR',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Corrugated Hose 1" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Q/3.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      402,
      'premium-pneumatic-hose-4-mdpe-402',
      'Premium Pneumatic Hose 4" - MDPE',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Pneumatic Hose 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/09.04.2024 Sakthi/DSC_0659.JPG',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      403,
      'reinforced-garden-hose-3-4-chrome-403',
      'Reinforced Garden Hose 3/4" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Garden Hose 3/4" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-11.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      404,
      'industrial-pneumatic-hose-3-4-chrome-404',
      'Industrial Pneumatic Hose 3/4" - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Industrial Pneumatic Hose 3/4" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/107 copy.png F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      405,
      'pro-grade-welding-hose-90mm-stainless-steel-405',
      'Pro-Grade Welding Hose 90mm - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Pro-Grade Welding Hose 90mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/All Product-132.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      406,
      'reinforced-garden-hose-90mm-chrome-406',
      'Reinforced Garden Hose 90mm - Chrome',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Reinforced Garden Hose 90mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Square Tap Photo/Wall Mixer Square Tap Another Postion 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      407,
      'high-pressure-suction-hose-4-brass-407',
      'High-Pressure Suction Hose 4" - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The High-Pressure Suction Hose 4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/111.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      408,
      'premium-fire-hose-25mm-pert-408',
      'Premium Fire Hose 25mm - PERT',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Premium Fire Hose 25mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet Mini Wall.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      409,
      'corrosion-resistant-corrugated-hose-25mm-brass-409',
      'Corrosion-Resistant Corrugated Hose 25mm - Brass',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Corrugated Hose 25mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      410,
      'heavy-duty-pneumatic-hose-1-5-stainless-steel-410',
      'Heavy-Duty Pneumatic Hose 1.5" - Stainless Steel',
      'Hoses',
      'Premium industrial-grade hoses engineered for reliability and long-term performance.',
      'The Heavy-Duty Pneumatic Hose 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      411,
      'premium-angle-valve-50mm-pert-411',
      'Premium Angle Valve 50mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Angle Valve 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-21.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      412,
      'industrial-mixer-tap-75mm-hdpe-412',
      'Industrial Mixer Tap 75mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Mixer Tap 75mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Wall Mixer Whiter Center.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      413,
      'seamless-sensor-tap-2-pert-413',
      'Seamless Sensor Tap 2" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Sensor Tap 2" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/Sinkfaucet eco 5 A Quadro Wall Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      414,
      'seamless-shower-head-4-pert-414',
      'Seamless Shower Head 4" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Shower Head 4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower only Adjustable.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      415,
      'reinforced-pillar-tap-32mm-polymer-415',
      'Reinforced Pillar Tap 32mm - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Pillar Tap 32mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/OPEN UPVC CONCEALED STOP VALVE PLAIN/CONCEALED LEVER EDIT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      416,
      'seamless-mixer-tap-40mm-brass-416',
      'Seamless Mixer Tap 40mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Mixer Tap 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/All Product-67.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      417,
      'seamless-bib-tap-25mm-chrome-417',
      'Seamless Bib Tap 25mm - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Bib Tap 25mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Wall Mixer.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      418,
      'reinforced-bib-tap-110mm-ppr-418',
      'Reinforced Bib Tap 110mm - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Bib Tap 110mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/All Product-150.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      419,
      'high-pressure-concealed-valve-90mm-polymer-419',
      'High-Pressure Concealed Valve 90mm - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The High-Pressure Concealed Valve 90mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/Sinkfaucet Mini Quadro Wall Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      420,
      'seamless-sink-mixer-1-5-stainless-steel-420',
      'Seamless Sink Mixer 1.5" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Sink Mixer 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/94.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      421,
      'industrial-concealed-valve-1-stainless-steel-421',
      'Industrial Concealed Valve 1" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Concealed Valve 1" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      422,
      'seamless-sink-mixer-3-4-hdpe-422',
      'Seamless Sink Mixer 3/4" - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Sink Mixer 3/4" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-172.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      423,
      'industrial-sink-mixer-4-polymer-423',
      'Industrial Sink Mixer 4" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Sink Mixer 4" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Shower Hose Delux Chrome Nuts Grey.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      424,
      'heavy-duty-sink-mixer-63mm-pert-424',
      'Heavy-Duty Sink Mixer 63mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Sink Mixer 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/Bib Tap Vibrant.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      425,
      'durable-sink-mixer-32mm-chrome-425',
      'Durable Sink Mixer 32mm - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Sink Mixer 32mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/DRAIN ITEMS/All Product-140.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      426,
      'heavy-duty-sensor-tap-90mm-ppr-426',
      'Heavy-Duty Sensor Tap 90mm - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Sensor Tap 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-71.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      427,
      'heavy-duty-sensor-tap-2-stainless-steel-427',
      'Heavy-Duty Sensor Tap 2" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Sensor Tap 2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/MONOLISA/22 Sinkfaucet Mini Wall Mount.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      428,
      'premium-angle-valve-1-2-hdpe-428',
      'Premium Angle Valve 1/2" - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Angle Valve 1/2" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/SINK FAUCET/SINK FAUCET MINI TABLE YELLOW F f.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      429,
      'heavy-duty-concealed-valve-40mm-pert-429',
      'Heavy-Duty Concealed Valve 40mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Concealed Valve 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/Foot Valve Flap Type With Hose Caller Block.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      430,
      'industrial-shower-head-25mm-brass-430',
      'Industrial Shower Head 25mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Shower Head 25mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/SHOWER IMAGES/HAND SHOWER delux.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      431,
      'reinforced-concealed-valve-3-4-pert-431',
      'Reinforced Concealed Valve 3/4" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Concealed Valve 3/4" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Kitchen Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      432,
      'reinforced-angle-valve-20mm-stainless-steel-432',
      'Reinforced Angle Valve 20mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Angle Valve 20mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP GOLDEN YELLOW 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      433,
      'durable-sink-mixer-3-ppr-433',
      'Durable Sink Mixer 3" - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Sink Mixer 3" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Bib Tap.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      434,
      'premium-concealed-valve-3-polymer-434',
      'Premium Concealed Valve 3" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Concealed Valve 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/TWO WAY ANGLE VALVE/TWO WAY ANGLE VALVE WHITE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      435,
      'corrosion-resistant-mixer-tap-3-hdpe-435',
      'Corrosion-Resistant Mixer Tap 3" - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Mixer Tap 3" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/All Product-67.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      436,
      'durable-sink-mixer-20mm-mdpe-436',
      'Durable Sink Mixer 20mm - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Sink Mixer 20mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sink Faucet.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      437,
      'industrial-angle-valve-40mm-chrome-437',
      'Industrial Angle Valve 40mm - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Angle Valve 40mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-166.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      438,
      'durable-bib-tap-3-chrome-438',
      'Durable Bib Tap 3" - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Bib Tap 3" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-171.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      439,
      'durable-angle-valve-1-brass-439',
      'Durable Angle Valve 1" - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Angle Valve 1" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/BIB TAP Extn QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      440,
      'heavy-duty-bib-tap-63mm-pert-440',
      'Heavy-Duty Bib Tap 63mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Bib Tap 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTH FAUCET ELEGANT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      441,
      'seamless-angle-valve-2-mdpe-441',
      'Seamless Angle Valve 2" - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Angle Valve 2" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-158.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      442,
      'reinforced-mixer-tap-20mm-brass-442',
      'Reinforced Mixer Tap 20mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Mixer Tap 20mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Sinkfaucet 5A Wall M Handle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      443,
      'premium-concealed-valve-110mm-hdpe-443',
      'Premium Concealed Valve 110mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Concealed Valve 110mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Center Blue.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      444,
      'pro-grade-mixer-tap-1-5-pert-444',
      'Pro-Grade Mixer Tap 1.5" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Mixer Tap 1.5" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Wall Mixer Whiter Center Blue Colour.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      445,
      'high-pressure-bib-tap-110mm-stainless-steel-445',
      'High-Pressure Bib Tap 110mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The High-Pressure Bib Tap 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO 5A.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      446,
      'premium-shower-head-4-mdpe-446',
      'Premium Shower Head 4" - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Shower Head 4" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE/OPEN CONCEALED  STOP VALVE THREAD/PLUMTEK M HANDLE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      447,
      'corrosion-resistant-concealed-valve-50mm-mdpe-447',
      'Corrosion-Resistant Concealed Valve 50mm - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Concealed Valve 50mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Pillar Tap Sleek.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      448,
      'pro-grade-concealed-valve-1-2-pert-448',
      'Pro-Grade Concealed Valve 1/2" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Concealed Valve 1/2" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/BATH ACCESORES/157 A spindle.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      449,
      'reinforced-bib-tap-50mm-ppr-449',
      'Reinforced Bib Tap 50mm - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Bib Tap 50mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Wall Mixer Center Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      450,
      'corrosion-resistant-sink-mixer-1-5-mdpe-450',
      'Corrosion-Resistant Sink Mixer 1.5" - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Sink Mixer 1.5" - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PLANET BIB TAP T HANDLE Long Boady.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      451,
      'pro-grade-concealed-valve-1-2-polymer-451',
      'Pro-Grade Concealed Valve 1/2" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Concealed Valve 1/2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/CONNECTION HOSE/Untitled-1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      452,
      'industrial-bib-tap-20mm-chrome-452',
      'Industrial Bib Tap 20mm - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Bib Tap 20mm - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/BIB TAP LONG BODY QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      453,
      'seamless-bib-tap-40mm-brass-453',
      'Seamless Bib Tap 40mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Bib Tap 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-08.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      454,
      'seamless-sensor-tap-40mm-stainless-steel-454',
      'Seamless Sensor Tap 40mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Sensor Tap 40mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/COLT BIB TAP C HANDLE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      455,
      'heavy-duty-sensor-tap-25mm-brass-455',
      'Heavy-Duty Sensor Tap 25mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Sensor Tap 25mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"25mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Square Tap Photo/Sticker A2-10 (1).png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      456,
      'durable-sensor-tap-32mm-mdpe-456',
      'Durable Sensor Tap 32mm - MDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Sensor Tap 32mm - MDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"MDPE","Size":"32mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Two Way Angle Valve.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      457,
      'corrosion-resistant-sink-mixer-3-4-stainless-steel-457',
      'Corrosion-Resistant Sink Mixer 3/4" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Sink Mixer 3/4" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-167.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      458,
      'premium-shower-head-3-4-brass-458',
      'Premium Shower Head 3/4" - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Shower Head 3/4" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"3/4\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/All Product-130.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      459,
      'reinforced-sensor-tap-63mm-hdpe-459',
      'Reinforced Sensor Tap 63mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Sensor Tap 63mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY BIB TAP/TWO WAY BIB TTAP BLUE 90.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      460,
      'pro-grade-shower-head-110mm-stainless-steel-460',
      'Pro-Grade Shower Head 110mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Shower Head 110mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Right Angle Valve.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      461,
      'industrial-shower-head-2-polymer-461',
      'Industrial Shower Head 2" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Shower Head 2" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 45.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      462,
      'heavy-duty-sensor-tap-110mm-hdpe-462',
      'Heavy-Duty Sensor Tap 110mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Sensor Tap 110mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/159.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      463,
      'premium-sink-mixer-40mm-brass-463',
      'Premium Sink Mixer 40mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Sink Mixer 40mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SHOWER/Shower only Adjustable.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      464,
      'premium-sink-mixer-20mm-brass-464',
      'Premium Sink Mixer 20mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Sink Mixer 20mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/PILLAR TAP/PILLAR TAP GOLDEN YELLOW 90.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      465,
      'premium-shower-head-20mm-stainless-steel-465',
      'Premium Shower Head 20mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Shower Head 20mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"20mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/BIB TAP LONG BODY QUODRO BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      466,
      'heavy-duty-pillar-tap-3-polymer-466',
      'Heavy-Duty Pillar Tap 3" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Pillar Tap 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-88.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      467,
      'corrosion-resistant-pillar-tap-75mm-stainless-steel-467',
      'Corrosion-Resistant Pillar Tap 75mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Pillar Tap 75mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-176.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      468,
      'heavy-duty-bib-tap-50mm-pert-468',
      'Heavy-Duty Bib Tap 50mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Bib Tap 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/PILLAR TAP A1.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      469,
      'heavy-duty-bib-tap-40mm-hdpe-469',
      'Heavy-Duty Bib Tap 40mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Bib Tap 40mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/All Product-182.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      470,
      'industrial-pillar-tap-1-5-stainless-steel-470',
      'Industrial Pillar Tap 1.5" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Industrial Pillar Tap 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT (1)/5 RIGHT ANGLE VALVE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      471,
      'seamless-bib-tap-40mm-hdpe-471',
      'Seamless Bib Tap 40mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Seamless Bib Tap 40mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES (1)/TWO WAY ANGLE VALVE/TWO WAY ANGLE VALVE BLUE.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      472,
      'heavy-duty-concealed-valve-1-5-ppr-472',
      'Heavy-Duty Concealed Valve 1.5" - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Concealed Valve 1.5" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VALVES/1-17.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      473,
      'premium-concealed-valve-50mm-pert-473',
      'Premium Concealed Valve 50mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Concealed Valve 50mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM QUODRO SERIES/All Product-125.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      474,
      'reinforced-sink-mixer-50mm-stainless-steel-474',
      'Reinforced Sink Mixer 50mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Sink Mixer 50mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/New Handle Blue color/Sinnkfaucet ECO Wall 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      475,
      'reinforced-shower-head-63mm-pert-475',
      'Reinforced Shower Head 63mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Shower Head 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-04.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      476,
      'reinforced-sink-mixer-1-brass-476',
      'Reinforced Sink Mixer 1" - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Sink Mixer 1" - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/Planet Garden Tap T Handle.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      477,
      'pro-grade-sensor-tap-1-2-chrome-477',
      'Pro-Grade Sensor Tap 1/2" - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Sensor Tap 1/2" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet Flemingo (1)/Bib Tap Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      478,
      'pro-grade-sensor-tap-1-2-stainless-steel-478',
      'Pro-Grade Sensor Tap 1/2" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Sensor Tap 1/2" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1/2\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Sink Mixer Ultra/Sink Mixer Ultra Plumtek Premium Monolisa Flange.png',
      NULL,
      1,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      479,
      'corrosion-resistant-sensor-tap-3-ppr-479',
      'Corrosion-Resistant Sensor Tap 3" - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Sensor Tap 3" - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT/1-06.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      480,
      'durable-sensor-tap-110mm-hdpe-480',
      'Durable Sensor Tap 110mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Sensor Tap 110mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"110mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Quodro Handle Blue Color/Sink Faucet ECO Wall 5A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      481,
      'pro-grade-concealed-valve-1-5-stainless-steel-481',
      'Pro-Grade Concealed Valve 1.5" - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Concealed Valve 1.5" - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Becco Taps/Kitchen Mixer Smart Blue.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      482,
      'reinforced-concealed-valve-1-pert-482',
      'Reinforced Concealed Valve 1" - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Concealed Valve 1" - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"1\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PREMIUM TAPS/96.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      483,
      'high-pressure-sink-mixer-75mm-brass-483',
      'High-Pressure Sink Mixer 75mm - Brass',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The High-Pressure Sink Mixer 75mm - Brass is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Brass","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/HEALTHFAUCET 1/129.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      484,
      'pro-grade-sink-mixer-3-chrome-484',
      'Pro-Grade Sink Mixer 3" - Chrome',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Sink Mixer 3" - Chrome is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Chrome","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/OPEN CONCEALD STOP VALVE (1)/PVC OPEN CONCEALED STOP VALVE  PLAIN/CONCEALED M.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      485,
      'reinforced-shower-head-90mm-stainless-steel-485',
      'Reinforced Shower Head 90mm - Stainless Steel',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Reinforced Shower Head 90mm - Stainless Steel is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Stainless Steel","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Two Angle Valve.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      486,
      'corrosion-resistant-angle-valve-3-polymer-486',
      'Corrosion-Resistant Angle Valve 3" - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Angle Valve 3" - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"3\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/VIBRANT/7 SINKFAUCET WALL  MOUNT.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      487,
      'durable-shower-head-75mm-hdpe-487',
      'Durable Shower Head 75mm - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Durable Shower Head 75mm - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"75mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Leva Taps/Sinnkfaucet ECO Wall 8A.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      488,
      'heavy-duty-shower-head-1-5-hdpe-488',
      'Heavy-Duty Shower Head 1.5" - HDPE',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Heavy-Duty Shower Head 1.5" - HDPE is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"HDPE","Size":"1.5\"","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/1.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      489,
      'corrosion-resistant-mixer-tap-50mm-polymer-489',
      'Corrosion-Resistant Mixer Tap 50mm - Polymer',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Corrosion-Resistant Mixer Tap 50mm - Polymer is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"Polymer","Size":"50mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/Planet/All Product-171.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      490,
      'high-pressure-sensor-tap-40mm-pert-490',
      'High-Pressure Sensor Tap 40mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The High-Pressure Sensor Tap 40mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"40mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/SQURARE TAP IMAGES/Long Body/Long Body Yellow.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      491,
      'pro-grade-concealed-valve-90mm-ppr-491',
      'Pro-Grade Concealed Valve 90mm - PPR',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Pro-Grade Concealed Valve 90mm - PPR is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PPR","Size":"90mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/HEALTHFAUCET New 2024/Healthfaucet GUN/HEALTH FAUCET 2.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );
INSERT INTO `products` (`id`, `slug`, `name`, `category`, `short_description`, `description`, `highlights_json`, `specs_json`, `image_key`, `image_data`, `is_featured`, `created_at`, `updated_at`) VALUES (
      492,
      'premium-bib-tap-63mm-pert-492',
      'Premium Bib Tap 63mm - PERT',
      'Taps, Faucets & Accessories',
      'Premium industrial-grade taps, faucets & accessories engineered for reliability and long-term performance.',
      'The Premium Bib Tap 63mm - PERT is manufactured to exact tolerances for demanding industrial and commercial applications. Features excellent pressure rating, chemical resistance, and thermal stability.',
      '["High impact resistance","Corrosion free & long lasting","Easy installation","ISO 9001:2015 Certified"]',
      '{"Material":"PERT","Size":"63mm","Pressure Rating":"PN16 / PN20","Temperature Range":"-10°C to 95°C","Standard":"DIN 8077/8078"}',
      'All Product/PLUMTEK COLT (1)/1-02.png',
      NULL,
      0,
      '2026-05-20 10:02:57',
      '2026-05-20 10:02:57'
    );

COMMIT;
