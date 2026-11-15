// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("document_activity")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("document_activity", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "created",
                    "updated"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "document_event"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "event_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("document_activity").insertMany([
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
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "updated",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "document_event",
                    "key": {
                        "event_id": 21
                    },
                    "field": "details",
                    "value": "Initial registration"
                }
            ],
            "examples": {
                "metadata": "illustrative metadata"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "document_event",
            "key": {
                "event_id": 22
            },
            "snapshot": {
                "event_id": 22,
                "document_id": 12,
                "event_type": "reviewed",
                "occurred_at": "2025-02-03T11:00:00Z",
                "actor_label": "Manager B",
                "details": null
            }
        },
        "embedded": {
            "document": [
                {
                    "key": {
                        "document_id": 12
                    },
                    "snapshot": {
                        "document_id": 12,
                        "department_id": 2,
                        "title": "Study Notes",
                        "created_at": "2025-02-02T10:00:00Z",
                        "status": "draft"
                    },
                    "via": [
                        "document_event.document_id → document"
                    ]
                }
            ],
            "department": [
                {
                    "key": {
                        "department_id": 2
                    },
                    "snapshot": {
                        "department_id": 2,
                        "name": "Research",
                        "created_at": "2025-01-11T09:00:00Z"
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
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "updated",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "document_event",
            "key": {
                "event_id": 22
            },
            "snapshot": {
                "event_id": 22,
                "document_id": 12,
                "event_type": "reviewed",
                "occurred_at": "2025-02-03T11:00:00Z",
                "actor_label": "Manager B",
                "details": null
            }
        },
        "embedded": {
            "document": [
                {
                    "key": {
                        "document_id": 12
                    },
                    "snapshot": {
                        "document_id": 12,
                        "department_id": 2,
                        "title": "Study Notes",
                        "created_at": "2025-02-02T10:00:00Z",
                        "status": "draft"
                    },
                    "via": [
                        "document_event.document_id → document"
                    ]
                }
            ],
            "department": [
                {
                    "key": {
                        "department_id": 2
                    },
                    "snapshot": {
                        "department_id": 2,
                        "name": "Research",
                        "created_at": "2025-01-11T09:00:00Z"
                    },
                    "via": [
                        "document_event.document_id → document.department_id → department"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "document_event",
                    "key": {
                        "event_id": 22
                    },
                    "field": "details",
                    "value": null
                }
            ],
            "examples": {
                "metadata": "illustrative metadata"
            }
        }
    }
]));
  await db.getCollection("document_activity").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("document_activity").find({"eventType":"created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("document_activity").find({"source.key.event_id":21}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("document_activity").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("document_activity").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("document_activity").insertOne({...{
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
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("document_activity").insertOne({
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
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("document_activity").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
