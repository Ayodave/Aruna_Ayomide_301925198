# Electronic Document Management Database Design — database design

My case study records department, document, document_event.

## Users

- Department staff
- Document managers
- Database designers

## Main operations

- Register a document under a department
- Search and filter documents
- Record document activity
- Summarize activity by department

## Entities

| Entity | Information stored |
| --- | --- |
| department | A department responsible for managing documents. |
| document | An electronic document assigned to one department. |
| document_event | An activity record associated with one document. |

## department

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| department_id | BIGINT | PK | Yes |
| name | TEXT | Unique | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (name).

## document

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| document_id | BIGINT | PK | Yes |
| department_id | BIGINT | FK | Yes |
| title | TEXT |  | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- department_id → department.department_id

## document_event

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| event_id | BIGINT | PK | Yes |
| document_id | BIGINT | FK | Yes |
| event_type | TEXT |  | Yes |
| occurred_at | TIMESTAMPTZ |  | Yes |
| actor_label | TEXT |  | Yes |
| details | TEXT |  | No |
- document_id → document.document_id

## Relationships and business rules

- Every department must have a name.
- Department names must be unique.
- Each document must reference an existing department.
- Document status must be one of draft, active, or archived.
- Titles must be unique within a department for documents whose status is not archived; enforce a partial unique constraint on department_id and title with status <> archived.
- Each event must reference an existing document.

## Assumptions

- Each document belongs to exactly one department, and each event belongs to exactly one document.
- For a normalization example, consider Document(document_id, department_id, department_name, title, created_at, status). Since department_id determines department_name, store department_name once in Department and retain department_id as Document's foreign key.
- Document titles must be unique within a department unless the document's status is archived.
- Synthetic IDs are drawn from a shared globally unique ID space.
- Event actor labels are synthetic text and are not references to a person table.

