package com.example.importer_microservice.model;
public enum ImportStatus {
    READY_FOR_IMPORT,   // received push from QA; not yet physically acknowledged
    RECEIVED,           // importer has recorded receipt
    STORED,             // put into storage
    COMPLETED           // fully processed
}
