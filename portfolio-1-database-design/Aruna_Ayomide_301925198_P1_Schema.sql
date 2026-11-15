-- Electronic Document Management Database Design: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."department" (
  "department_id" bigint NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_department" PRIMARY KEY ("department_id"),
  CONSTRAINT "uq_department_0" UNIQUE ("name")
);
CREATE TABLE portfolio."document" (
  "document_id" bigint NOT NULL,
  "department_id" bigint NOT NULL,
  "title" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_document" PRIMARY KEY ("document_id")
);
CREATE TABLE portfolio."document_event" (
  "event_id" bigint NOT NULL,
  "document_id" bigint NOT NULL,
  "event_type" text NOT NULL,
  "occurred_at" timestamptz NOT NULL,
  "actor_label" text NOT NULL,
  "details" text,
  CONSTRAINT "pk_document_event" PRIMARY KEY ("event_id")
);
ALTER TABLE portfolio."document" ADD CONSTRAINT "fk_document_0" FOREIGN KEY ("department_id") REFERENCES portfolio."department" ("department_id");
ALTER TABLE portfolio."document_event" ADD CONSTRAINT "fk_document_event_0" FOREIGN KEY ("document_id") REFERENCES portfolio."document" ("document_id");
ALTER TABLE portfolio."document" ADD CONSTRAINT "document_status_allowed" CHECK (("status" = 'draft') OR ("status" = 'active') OR ("status" = 'archived'));
CREATE UNIQUE INDEX "document_title_unique_when_not_archived" ON portfolio."document" ("department_id", "title") WHERE (("status" = 'draft') OR ("status" = 'active'));
COMMIT;
