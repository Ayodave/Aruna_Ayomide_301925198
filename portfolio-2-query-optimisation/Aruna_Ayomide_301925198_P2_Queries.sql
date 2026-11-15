-- Show related document, department records (up to 20).
SELECT t0."document_id" AS "document_document_id",
       t0."title" AS "document_title",
       t1."department_id" AS "department_department_id",
       t1."name" AS "department_name"
FROM portfolio."document" t0
JOIN portfolio."department" t1 ON t0."department_id" = t1."department_id"
ORDER BY t0."document_id", t1."department_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."document_id" AS "document_document_id",
       t0."title" AS "document_title",
       t1."department_id" AS "department_department_id",
       t1."name" AS "department_name"
FROM portfolio."document" t0
JOIN portfolio."department" t1 ON t0."department_id" = t1."department_id"
ORDER BY t0."document_id", t1."department_id"
LIMIT 20;

-- Find document records where status matches "active" (up to 20).
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;

-- Count document_event records for each document_id (up to 20 groups).
SELECT "document_id", count(*) AS record_count
FROM portfolio."document_event"
GROUP BY "document_id"
ORDER BY record_count DESC, "document_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "document_id", count(*) AS record_count
FROM portfolio."document_event"
GROUP BY "document_id"
ORDER BY record_count DESC, "document_id" NULLS LAST
LIMIT 20;

-- Find document records where status matches "active" (up to 20).
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;
