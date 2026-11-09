# Electronic Document Management System (EDMS) Normalisation

## 1. Introduction

Normalisation is a way of organising data in a database so that information is stored properly without unnecessary repetition. It helps prevent problems when records are added, updated or deleted.

For the Electronic Document Management System (EDMS), this is important because the system manages different types of information, including departments, staff accounts, documents, document versions, access permissions and user activities. Storing all these details in one table would make the database difficult to maintain, especially when several users work with the same documents.

The database is therefore organised into three stages of normalisation: First Normal Form (1NF), Second Normal Form (2NF) and Third Normal Form (3NF).

The examples below use fictional staff members and documents to show how the information is organised at each stage.

## 2. Starting Point: Unnormalised Data (UNF)

Before normalisation, document information can be stored in one table, with several details grouped together. For example, a document may have different versions, several users may have access to it, and different activities may be carried out on it.

The following table shows what this could look like before normalisation.

**EDMS Document Records (Unnormalised)**

| Document ID | Document Title | Department | Owner | Versions | Users with Access | Activities |
|---|---|---|---|---|---|---|
| D001 | Staff Policy | Human Resources | Amina Yusuf | V1, V2 | Amina, David | Upload, Review, Approval |
| D002 | IT Security Policy | IT | David Okoro | V1 | David, Amina | Upload, Review |

There are a few problems with this arrangement:

- The Versions field contains more than one value.
- The Users with Access field contains several names in one cell.
- The Activities field also contains several values in one cell.
- Department and owner information may be repeated across different records.
- Making changes to staff or document information may require updating several records.

This arrangement is known as an Unnormalised Form (UNF). The main issue is that some fields contain lists instead of individual values.

## 3. First Normal Form (1NF)

First Normal Form requires each field to contain a single value. Where a field contains a list, the individual values are separated into different records.

For the EDMS, this means that each document version, user access entry and activity is recorded separately.

**Document Version Records (1NF)**

| Document ID | Document Title | Version Number | File Name | Uploaded By |
|---|---|---|---|---|
| D001 | Staff Policy | 1 | Staff_Policy_V1.pdf | Amina Yusuf |
| D001 | Staff Policy | 2 | Staff_Policy_V2.pdf | Amina Yusuf |
| D002 | IT Security Policy | 1 | IT_Security_V1.pdf | David Okoro |

**Document Access Records (1NF)**

| Document ID | Document Title | User |
|---|---|---|
| D001 | Staff Policy | Amina Yusuf |
| D001 | Staff Policy | David Okoro |
| D002 | IT Security Policy | David Okoro |

**Activity Records (1NF)**

| Activity ID | Document ID | User | Activity Type |
|---|---|---|---|
| A001 | D001 | Amina Yusuf | Upload |
| A002 | D001 | David Okoro | Review |
| A003 | D001 | David Okoro | Approval |
| A004 | D002 | David Okoro | Upload |
| A005 | D002 | Amina Yusuf | Review |

At this stage, each field contains one value, and the lists have been separated into individual records.

**What changes at this stage?**

The document versions, users with access and activities are no longer grouped together in the same field. Each version or activity has its own record, while each user-document access entry is recorded separately.

This removes the problem of storing multiple values in one field. However, some details, such as document titles and user names, still appear more than once.

## 4. Second Normal Form (2NF)

Second Normal Form requires a table to already be in 1NF. It also requires every non-key field to depend on the whole primary key, rather than just part of a combined key.

A combined key is made up of two or more fields that work together to identify a record.

In the EDMS, the `document_id` and `version_number` fields can work together to identify a particular version of a document.

Consider the following table:

**Document Version Records**

| Document ID | Version Number | Document Title | File Name | Uploaded By |
|---|---|---|---|---|
| D001 | 1 | Staff Policy | Staff_Policy_V1.pdf | Amina Yusuf |
| D001 | 2 | Staff Policy | Staff_Policy_V2.pdf | Amina Yusuf |
| D002 | 1 | IT Security Policy | IT_Security_V1.pdf | David Okoro |

**Combined Primary Key:** `document_id` + `version_number`.

Looking at the table, the document title depends only on `document_id`. It does not depend on the version number.

For example, the title Staff Policy remains the same for both version 1 and version 2. There is no need to repeat the document title in every version record.

To address this, the information is separated into two tables.

**Document Table**

| Document ID (PK) | Document Title |
|---|---|
| D001 | Staff Policy |
| D002 | IT Security Policy |

**Document_Version Table**

| Document ID (PK, FK) | Version Number (PK) | File Name | Uploaded By |
|---|---|---|---|
| D001 | 1 | Staff_Policy_V1.pdf | Amina Yusuf |
| D001 | 2 | Staff_Policy_V2.pdf | Amina Yusuf |
| D002 | 1 | IT_Security_V1.pdf | David Okoro |

The Document table now stores each document title once, while Document_Version keeps the details of each saved version.

**What changes at this stage?**

The document title moves into the Document table because it describes the document itself, not an individual version. This removes the partial dependency and avoids repeating the same title across several version records.

The same check applies to other tables. For example, in Document_Access, the permission fields depend on the combination of `document_id` and `user_id`. They describe the rights of a particular user over a particular document. There is no partial dependency in this example.

## 5. Third Normal Form (3NF)

Third Normal Form requires a table to already satisfy 2NF. It also ensures that non-key fields depend on the primary key and not on another non-key field.

In simple terms, information about a department should be kept in the Department table rather than repeated in every staff record.

Consider the following example:

**User Account Records**

| User ID | Full Name | Email | Department ID | Department Name |
|---|---|---|---|---|
| U001 | Amina Yusuf | amina@example.com | DEP01 | Human Resources |
| U002 | David Okoro | david@example.com | DEP02 | IT |
| U003 | Amina Yusuf | amina@example.com | DEP01 | Human Resources |

In this example, the Department Name depends on Department ID, rather than directly on User ID.

For instance, DEP01 represents Human Resources. The department name is therefore repeated whenever another staff member belongs to the same department.

This is called a transitive dependency. It happens when a non-key field depends on another non-key field instead of depending directly on the primary key.

To remove this repetition, the department information is separated into its own table.

**Department Table**

| Department ID (PK) | Department Name |
|---|---|
| DEP01 | Human Resources |
| DEP02 | IT |

**User_Account Table**

| User ID (PK) | Full Name | Email | Department ID (FK) |
|---|---|---|---|
| U001 | Amina Yusuf | amina@example.com | DEP01 |
| U002 | David Okoro | david@example.com | DEP02 |
| U003 | Amina Yusuf | amina@example.com | DEP01 |

The Department ID in User_Account is a foreign key that connects each staff member to the correct department.

**What changes at this stage?**

Department details are stored separately instead of being repeated in every user record. If the name of a department changes, it only needs to be updated in the Department table.

This avoids having different department names recorded for the same department and makes the records easier to maintain.

## 6. Final Normalised Database Structure

After applying the three stages of normalisation, the EDMS database is organised into six tables. Each table has a specific purpose and stores information relating to one part of the system.

| Table | Primary Key | Purpose |
|---|---|---|
| Department | department_id | Stores department names and identifies each department. |
| User_Account | user_id | Stores staff details, login information and assigned roles. |
| Document | document_id | Stores document details, ownership and retention information. |
| Document_Version | version_id | Stores individual document versions and their file references. |
| Document_Access | access_id | Records the permissions assigned to users for individual documents. |
| Activity_Record | activity_id | Keeps records of activities such as uploads, reviews, approvals and signatures. |

The tables are connected through foreign keys, which allow information to be linked without repeating the same details across different tables.

For example:

- `department_id` links User_Account and Document to Department.
- `owner_id` links Document to User_Account.
- `document_id` links Document_Version and Document_Access to Document.
- `uploaded_by` links Document_Version to User_Account.
- `user_id` links Document_Access and Activity_Record to User_Account.
- `granted_by` links Document_Access to User_Account.
- `checked_out_by` links Document to User_Account.
- `document_id` and `version_id` in Activity_Record link activities to the relevant document and version.

### Automatically Generated IDs in the Final Design

The examples above use `document_id` and `version_number` together to identify each document version. However, the agreed database design uses an automatically generated `version_id` as the primary key in Document_Version.

The combination of `document_id` and `version_number` still has a unique constraint. This ensures that the same document cannot have two records with the same version number.

The Document_Access table follows the same approach. It uses an automatically generated `access_id` as its primary key, while a unique constraint on `document_id` and `user_id` prevents the same user from having duplicate access records for one document.

An automatically generated ID provides a simple way to identify and reference individual records. However, using an ID alone does not make a table properly normalised. The other fields must still depend on the correct key.

### Other Fields Retained in the Final Design

The examples above show selected fields to make the normalisation process easier to follow. The final database design retains the other agreed fields as well.

| Table | Additional fields |
|---|---|
| Department | None. All fields are shown. |
| User_Account | username, password_hash, role, account_status |
| Document | category, keywords, document_status, upload_date, retention_end_date, checked_out_by, checked_out_at |
| Document_Version | storage_reference, extracted_text, created_at |
| Document_Access | can_view, can_edit, can_approve, can_sign, granted_by, date_granted |
| Activity_Record | version_id, comments, signature_reference, activity_date |

These fields remain part of the final design, including those marked as optional.

## 7. Conclusion

The normalisation process helps organise the EDMS database so that information is stored in the appropriate tables without unnecessary repetition.

At the first stage, repeated lists are separated into individual records. At the second stage, fields that depend on only part of a combined key are moved into the appropriate table. At the third stage, information that depends on another non-key field is separated to avoid transitive dependencies.

The final design contains six tables covering departments, staff accounts, documents, document versions, access permissions and activity records. This arrangement makes it easier to manage information, maintain accurate records and keep related data consistent as the system is used.
