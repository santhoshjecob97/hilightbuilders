CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`title` varchar(220) NOT NULL,
	`description` varchar(320) NOT NULL,
	`category` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','sample','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`email` varchar(320),
	`enquiryType` varchar(60) NOT NULL,
	`message` text,
	`consent` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_enquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lead_status_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`status` enum('NEW','CONTACTED','QUALIFIED','CONSULTATION','SITE_VISIT','PROPOSAL','NEGOTIATION','WON','LOST') NOT NULL,
	`changedBy` int,
	`note` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lead_status_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionKey` varchar(64) NOT NULL,
	`kind` enum('residential','commercial','construction','general') NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`email` varchar(320),
	`location` varchar(200) NOT NULL,
	`companyName` varchar(200),
	`designation` varchar(120),
	`businessType` varchar(140),
	`propertyType` varchar(100),
	`area` varchar(60),
	`bedrooms` varchar(30),
	`projectType` varchar(100),
	`serviceRequirements` text,
	`budget` varchar(80),
	`startDate` varchar(100),
	`possessionStatus` varchar(100),
	`requirements` text,
	`consent` boolean NOT NULL DEFAULT false,
	`status` enum('NEW','CONTACTED','QUALIFIED','CONSULTATION','SITE_VISIT','PROPOSAL','NEGOTIATION','WON','LOST') NOT NULL DEFAULT 'NEW',
	`source` enum('Organic Search','Google Ads','Meta Ads','Instagram','LinkedIn','WhatsApp','Referral','Direct','Other') NOT NULL DEFAULT 'Direct',
	`notes` text,
	`followUpAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `leads_submissionKey_unique` UNIQUE(`submissionKey`)
);
--> statement-breakpoint
CREATE TABLE `project_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`imageUrl` varchar(600) NOT NULL,
	`altText` varchar(300) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `project_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`title` varchar(200) NOT NULL,
	`projectType` enum('Residential','Commercial','Kitchen','Living Room','Bedroom','Office','Retail','Renovation') NOT NULL,
	`location` varchar(200),
	`area` varchar(80),
	`scope` text,
	`concept` text,
	`materialDirection` text,
	`status` enum('concept','in_progress','completed') NOT NULL DEFAULT 'concept',
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(180) NOT NULL,
	`title` varchar(180) NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`published` boolean NOT NULL DEFAULT false,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`role` varchar(140) NOT NULL,
	`biography` text,
	`photoUrl` varchar(600),
	`approved` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(180) NOT NULL,
	`quote` text NOT NULL,
	`projectId` int,
	`approved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploaded_floor_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`storageKey` varchar(500) NOT NULL,
	`fileName` varchar(200) NOT NULL,
	`mimeType` varchar(80) NOT NULL,
	`sizeBytes` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uploaded_floor_plans_id` PRIMARY KEY(`id`)
);
