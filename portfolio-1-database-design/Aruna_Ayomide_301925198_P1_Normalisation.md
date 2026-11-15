# Electronic Document Management Database Design — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| document_id | document_event records (list) |
| --- | --- |
| 11 | [21] |
| 12 | [22] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| document_event.event_id | document_event.document_id | document_event.event_type | document.document_id | document.department_id | document.title | department.department_id | department.name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 21 | 11 | created | 11 | 1 | Retention Plan | 1 | Records |
| 22 | 12 | reviewed | 12 | 2 | Study Notes | 2 | Research |

Key: event_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## document_event_example

| document_event.event_id | document_event.document_id | document_event.event_type | document.document_id | document.department_id | document.title | department.department_id | department.name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 21 | 11 | created | 11 | 1 | Retention Plan | 1 | Records |
| 22 | 12 | reviewed | 12 | 2 | Study Notes | 2 | Research |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## department

| department_id | name | created_at |
| --- | --- | --- |
| 1 | Records | 2025-01-10T09:00:00+00:00 |
| 2 | Research | 2025-01-11T09:00:00+00:00 |

## document

| document_id | department_id | title | created_at | status |
| --- | --- | --- | --- | --- |
| 11 | 1 | Retention Plan | 2025-02-01T10:00:00+00:00 | active |
| 12 | 2 | Study Notes | 2025-02-02T10:00:00+00:00 | draft |

## document_event

| event_id | document_id | event_type | occurred_at | actor_label | details |
| --- | --- | --- | --- | --- | --- |
| 21 | 11 | created | 2025-02-01T10:05:00+00:00 | Staff A | Initial registration |
| 22 | 12 | reviewed | 2025-02-03T11:00:00+00:00 | Manager B | NULL |

## Dependencies

- department: (department_id) → name, created_at
- document: (document_id) → department_id, title, created_at, status
- document_event: (event_id) → document_id, event_type, occurred_at, actor_label, details

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
