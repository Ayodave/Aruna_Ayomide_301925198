# Electronic Document Management Database Design — ER diagram

```mermaid
erDiagram
    direction LR
    department {
        bigint department_id PK
        text name UK
        timestamptz created_at
    }
    document {
        bigint document_id PK
        bigint department_id FK
        text title
        timestamptz created_at
        text status
    }
    document_event {
        bigint event_id PK
        bigint document_id FK
        text event_type
        timestamptz occurred_at
        text actor_label
        text details "Optional"
    }
    department ||--o{ document : "department_id"
    document ||--o{ document_event : "document_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Aruna_Ayomide_301925198_ERDiagram.png)
