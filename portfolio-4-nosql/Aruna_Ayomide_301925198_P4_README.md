# Portfolio 4 — NoSQL and Advanced Data Models

I used MongoDB collection document_activity for created and updated events. These are fictional event examples based on document_event, document, department.

## Document model

| Field | Meaning |
| --- | --- |
| _id | Unique string event ID |
| eventType | One of the two selected case event labels |
| occurredAt | Native BSON Date; sample timestamps are in 2030 |
| source | Original entity, primary key and saved JSON snapshot |
| embedded | Linked record snapshots read with the event |
| references | Keys for linked sources kept outside the embedded snapshots |
| details | Event metadata whose fields vary |

Related document, department details are stored as snapshots with the event. This makes an event readable in one document. It duplicates some information, and later SQL changes do not automatically update the snapshots. PostgreSQL continues to enforce the relational rules.

## Example document

```javascript
{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "document_event",
        "key": {
            "event_id": 21
        },
        "snapshot": {
            "event_id": 21,
            "document_id": 11,
            "event_type": "created",
            "occurred_at": "2025-02-01T10:05:00Z",
            "actor_label": "Staff A",
            "details": "Initial registration"
        }
    },
    "embedded": {
        "document": [
            {
                "key": {
                    "document_id": 11
                },
                "snapshot": {
                    "document_id": 11,
                    "department_id": 1,
                    "title": "Retention Plan",
                    "created_at": "2025-02-01T10:00:00Z",
                    "status": "active"
                },
                "via": [
                    "document_event.document_id → document"
                ]
            }
        ],
        "department": [
            {
                "key": {
                    "department_id": 1
                },
                "snapshot": {
                    "department_id": 1,
                    "name": "Records",
                    "created_at": "2025-01-10T09:00:00Z"
                },
                "via": [
                    "document_event.document_id → document.department_id → department"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}
```

## Queries and results

| Query | Returned documents |
| --- | --- |
| Find the first sample event type (up to five documents). | 2 |
| Find events for the first source record using nested key fields (up to five). | 2 |
| Find events in the sample time range using a MongoDB Date filter (up to five). | 4 |
| Count documents for each event type. | 2 |

## 1. Find the first sample event type (up to five documents).

```javascript
db.getCollection("document_activity").find({"eventType":"created"}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "created",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "event_id": 21
    }
  },
  {
    "_id": "event_000003",
    "eventType": "created",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "event_id": 22
    }
  }
]
```

## 2. Find events for the first source record using nested key fields (up to five).

```javascript
db.getCollection("document_activity").find({"source.key.event_id":21}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "created",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "event_id": 21
    }
  },
  {
    "_id": "event_000002",
    "eventType": "updated",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "event_id": 21
    }
  }
]
```

## 3. Find events in the sample time range using a MongoDB Date filter (up to five).

```javascript
db.getCollection("document_activity").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "created",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "event_id": 21
    }
  },
  {
    "_id": "event_000002",
    "eventType": "updated",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "event_id": 21
    }
  },
  {
    "_id": "event_000003",
    "eventType": "created",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "event_id": 22
    }
  },
  {
    "_id": "event_000004",
    "eventType": "updated",
    "occurredAt": {
      "$date": "2030-01-01T10:03:00Z"
    },
    "source": {
      "event_id": 22
    }
  }
]
```

## 4. Count documents for each event type.

```javascript
db.getCollection("document_activity").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray();
```

| _id | documentCount |
| --- | --- |
| created | 2 |
| updated | 2 |

## Validation and suitability

MongoDB inserted 4 documents. An invalid date type was rejected with code 121 and a repeated event ID with 11000. The collection still contained 4 valid documents. The compound eventType/occurredAt index supports those access fields; this exercise does not measure its speed.

The details field can vary across event types, while the common fields have a validator. Events can be added as separate documents rather than growing one large history record.

## Run the script

Connect mongosh to a fresh exercise database and run Aruna_Ayomide_301925198_P4_MongoDB.js. It selects portfolio_nosql, creates the collection, inserts the sample documents and displays the query results. [Implementation evidence](screenshots/Aruna_Ayomide_301925198_P4_DocumentsAndQueries.png).

## References

- [MongoDB — data modelling](https://www.mongodb.com/docs/manual/data-modeling/)

