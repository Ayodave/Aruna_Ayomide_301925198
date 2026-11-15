-- Fictional sample records for Electronic Document Management Database Design.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."department" ("department_id", "name", "created_at") VALUES (1, 'Records', '2025-01-10T09:00:00Z');
INSERT INTO portfolio."department" ("department_id", "name", "created_at") VALUES (2, 'Research', '2025-01-11T09:00:00Z');
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status") VALUES (11, 1, 'Retention Plan', '2025-02-01T10:00:00Z', 'active');
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status") VALUES (12, 2, 'Study Notes', '2025-02-02T10:00:00Z', 'draft');
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details") VALUES (21, 11, 'created', '2025-02-01T10:05:00Z', 'Staff A', 'Initial registration');
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details") VALUES (22, 12, 'reviewed', '2025-02-03T11:00:00Z', 'Manager B', NULL);
COMMIT;
