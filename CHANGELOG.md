# CHANGELOG

All notable changes to this project will be documented in this file.

## Rules
- Entries should follow guidance from [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- Each entry should be titled with version and date
- Use semantic versioning
- Use the YYYY-MM-DD date format
- Most recent entry should be at the top


## Releases

### 1.0.3
#### Security
- Remediated jsonwebtoken vulnerability

### 1.0.2
#### Fixed
- `newPasswordRequired` flow, removed unrequired attribute params

### 1.0.1
#### Changed
- Now throws and Unauthorised on newpassword required
- `Incorrect username or password` message added to onFailure for login

### 1.0.0
#### Added
- Login method with flow for when new password is required
- RefreshSession to enable user to get a new ID token once