-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. department pk. Expected: pk_department, SQLSTATE 23505.
INSERT INTO portfolio."department" ("department_id", "name", "created_at")
VALUES (1, 'New Department', '2025-03-01T09:00:00Z');

-- 2. department unique. Expected: uq_department_0, SQLSTATE 23505.
INSERT INTO portfolio."department" ("department_id", "name", "created_at")
VALUES (101, 'Records', '2025-03-02T09:00:00Z');

-- 3. department id not null. Expected: department_id, SQLSTATE 23502.
INSERT INTO portfolio."department" ("department_id", "name", "created_at")
VALUES (NULL, 'New Department', '2025-03-03T09:00:00Z');

-- 4. department name not null. Expected: name, SQLSTATE 23502.
INSERT INTO portfolio."department" ("department_id", "name", "created_at")
VALUES (102, NULL, '2025-03-04T09:00:00Z');

-- 5. department created at not null. Expected: created_at, SQLSTATE 23502.
INSERT INTO portfolio."department" ("department_id", "name", "created_at")
VALUES (103, 'New Department', NULL);

-- 6. document pk. Expected: pk_document, SQLSTATE 23505.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (11, 1, 'Other Plan', '2025-03-05T10:00:00Z', 'active');

-- 7. document fk. Expected: fk_document_0, SQLSTATE 23503.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (104, 9001, 'Other Plan', '2025-03-06T10:00:00Z', 'active');

-- 8. document id not null. Expected: document_id, SQLSTATE 23502.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (NULL, 1, 'Other Plan', '2025-03-07T10:00:00Z', 'active');

-- 9. document department not null. Expected: department_id, SQLSTATE 23502.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (105, NULL, 'Other Plan', '2025-03-08T10:00:00Z', 'active');

-- 10. document title not null. Expected: title, SQLSTATE 23502.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (106, 1, NULL, '2025-03-09T10:00:00Z', 'active');

-- 11. document created at not null. Expected: created_at, SQLSTATE 23502.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (107, 1, 'Other Plan', NULL, 'active');

-- 12. document status not null. Expected: status, SQLSTATE 23502.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (108, 1, 'Other Plan', '2025-03-10T10:00:00Z', NULL);

-- 13. event pk. Expected: pk_document_event, SQLSTATE 23505.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (21, 11, 'updated', '2025-03-11T12:00:00Z', 'Staff C', 'Metadata update');

-- 14. event fk. Expected: fk_document_event_0, SQLSTATE 23503.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (109, 9002, 'updated', '2025-03-12T12:00:00Z', 'Staff C', 'Metadata update');

-- 15. event id not null. Expected: event_id, SQLSTATE 23502.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (NULL, 11, 'updated', '2025-03-13T12:00:00Z', 'Staff C', NULL);

-- 16. event document not null. Expected: document_id, SQLSTATE 23502.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (110, NULL, 'updated', '2025-03-14T12:00:00Z', 'Staff C', NULL);

-- 17. event type not null. Expected: event_type, SQLSTATE 23502.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (111, 11, NULL, '2025-03-15T12:00:00Z', 'Staff C', NULL);

-- 18. event occurred at not null. Expected: occurred_at, SQLSTATE 23502.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (112, 11, 'updated', NULL, 'Staff C', NULL);

-- 19. event actor not null. Expected: actor_label, SQLSTATE 23502.
INSERT INTO portfolio."document_event" ("event_id", "document_id", "event_type", "occurred_at", "actor_label", "details")
VALUES (113, 11, 'updated', '2025-03-16T12:00:00Z', NULL, NULL);

-- 20. document status check. Expected: document_status_allowed, SQLSTATE 23514.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (114, 1, 'Other Plan', '2025-03-17T10:00:00Z', 'pending');

-- 21. document title partial unique. Expected: document_title_unique_when_not_archived, SQLSTATE 23505.
INSERT INTO portfolio."document" ("document_id", "department_id", "title", "created_at", "status")
VALUES (115, 1, 'Retention Plan', '2025-03-18T10:00:00Z', 'active');
