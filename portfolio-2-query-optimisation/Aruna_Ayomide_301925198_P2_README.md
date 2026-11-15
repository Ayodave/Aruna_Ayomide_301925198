# Electronic Document Management Database Design — SQL queries

## 1. Show related document, department records (up to 20).

```sql
SELECT t0."document_id" AS "document_document_id",
       t0."title" AS "document_title",
       t1."department_id" AS "department_department_id",
       t1."name" AS "department_name"
FROM portfolio."document" t0
JOIN portfolio."department" t1 ON t0."department_id" = t1."department_id"
ORDER BY t0."document_id", t1."department_id"
LIMIT 20;
```

| document_document_id | document_title | department_department_id | department_name |
| --- | --- | --- | --- |
| 11 | Retention Plan | 1 | Records |
| 12 | Study Notes | 2 | Research |

## 2. Find document records where status matches "active" (up to 20).

```sql
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;
```

| document_id | department_id | title | created_at | status |
| --- | --- | --- | --- | --- |
| 11 | 1 | Retention Plan | 2025-02-01T10:00:00+00:00 | active |

## 3. Count document_event records for each document_id (up to 20 groups).

```sql
SELECT "document_id", count(*) AS record_count
FROM portfolio."document_event"
GROUP BY "document_id"
ORDER BY record_count DESC, "document_id" NULLS LAST
LIMIT 20;
```

| document_id | record_count |
| --- | --- |
| 11 | 1 |
| 12 | 1 |

## 4. Find document records where status matches "active" (up to 20).

```sql
SELECT * FROM portfolio."document"
WHERE "status" IS NOT DISTINCT FROM 'active'
ORDER BY "document_id"
LIMIT 20;
```

| document_id | department_id | title | created_at | status |
| --- | --- | --- | --- | --- |
| 11 | 1 | Retention Plan | 2025-02-01T10:00:00+00:00 | active |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.998 | 1.998, 2.451, 1.522 | Sort → Seq Scan | 163 |
| After index | 0.238 | 0.238, 0.261, 0.233 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 30 |

The median execution time changed from 1.998 ms to 0.238 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.957..1.959 rows=25 loops=1)
  Seq Scan on document (actual time=0.027..1.854 rows=25 loops=1)
Planning Time: 0.648 ms
Execution Time: 1.998 ms
```

### Before index, run 2

```text
Sort (actual time=2.404..2.407 rows=25 loops=1)
  Seq Scan on document (actual time=0.026..2.342 rows=25 loops=1)
Planning Time: 0.657 ms
Execution Time: 2.451 ms
```

### Before index, run 3

```text
Sort (actual time=1.449..1.451 rows=25 loops=1)
  Seq Scan on document (actual time=0.016..1.409 rows=25 loops=1)
Planning Time: 0.429 ms
Execution Time: 1.522 ms
```

### After index, run 1

```text
Sort (actual time=0.176..0.178 rows=25 loops=1)
  Bitmap Heap Scan on document (actual time=0.033..0.132 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.018 rows=25 loops=1)
Planning Time: 0.704 ms
Execution Time: 0.238 ms
```

### After index, run 2

```text
Sort (actual time=0.198..0.2 rows=25 loops=1)
  Bitmap Heap Scan on document (actual time=0.055..0.156 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.04..0.04 rows=25 loops=1)
Planning Time: 0.66 ms
Execution Time: 0.261 ms
```

### After index, run 3

```text
Sort (actual time=0.17..0.172 rows=25 loops=1)
  Bitmap Heap Scan on document (actual time=0.031..0.13 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.017..0.017 rows=25 loops=1)
Planning Time: 0.674 ms
Execution Time: 0.233 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Aruna_Ayomide_301925198_P2_Queries.sql, then Aruna_Ayomide_301925198_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Aruna_Ayomide_301925198_P2_QueryResults.png) · [Index comparison](screenshots/Aruna_Ayomide_301925198_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

