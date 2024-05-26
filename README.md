# Personal Portfolio

## Overview
This repository hosts a React-based project designed to showcase a variety of technical skills, including front-end and back-end development, API integration, and 3D tools. The project consists of three distinct examples demonstrating past work, all in one consolidated platform.

## Project Components

### 1. Sketchfab Review Tool
This tool enables users to interact with 3D models hosted on Sketchfab. Key features include:
- **Dynamic Part Management:** Users can scan models to identify and toggle visibility of specific parts based on substring matching in their names.

### 2. Unity WebGL Integration
This component demonstrates integration of Unity with WebGL to create interactive 3D environments. Features include:
- **Interaction Between Unity and Browsers:** Users can interact with the Unity environment which in turn updates the browser display, and vice versa, demonstrating seamless integration.

### 3. ThreeJS GLTF Viewer
A tool built with ThreeJS that mirrors the functionalities of the Sketchfab and Unity projects, focusing on handling GLTF files for 3D model reviews.

## Universal Comment System
A robust comment system is integrated across all three components, enhancing user interaction and feedback. Key features include:
- **Client Role:** Clients can create comments, flag resolutions, and request clarifications.
- **Admin Role:** Admins have permissions to edit and delete comments to manage scope and ensure accurate feedback.
- **Employee Role:** Employees can respond to comments, providing updates and changes.

## Shared Backend
All three components share a common backend built with Apollo Server, GraphQL, and MongoDB, optimizing resource use and maintenance. Key aspects include:
- **User Management:** Handles user authentication and role-based permissions.
- **Model Management:** Manages a database of 3D models, facilitating dynamic data updates across different platforms.
- **Comment Management:** Manages comments linked to specific models across all platforms.

## Learning Goals
- **Performance Optimization:** Special focus on optimizing performance for low-end devices and navigating through complex network restrictions typically encountered in governmental project deployments.
- **Backend Improvement:** Enhancing backend capabilities, including implementing efficient data handling and pagination for scalable user interactions.

## Why a Single Repository?
Combining all three components into one repository allows for shared backend services, reducing redundancy and fostering a cohesive development environment.

## Current Features
### Backend
- [x] User CRUD
- [x] JWT put into place for authentication
- [x] JWT has an expiration time of 5 minutes (will be changed in future, this is for testing) which auto refreshes when new mutations and queries are called
- [x] User Role decides available queries and mutations on the server side

### Frontend
- [x] User can login and logout
- [x] User Role decides what information will be displayed on front end
- [x] User will be warned to save information when there is less than 1 minute left till the token is no longer valid via a toast
- [x] User making a call to backend (query or mutation) will refresh front end knowledge of expiration time
- [x] If time expires, all header information will be cleared out and user forced back to the login screen

## Planned Next Features
### Backend
- [ ] Adding CRUD for which models can be reviewed
- [ ] Adding CRUD for comments on models

### Frontend
- [ ] Set up interface for Admin to be able to create, update and delete User accounts
- [ ] Set up interface for Users to select from how they want to review models
- [ ] Set up interface for SketchFab API to allow users to see and interact with models
- [ ] Set up interface to support the Comment system on the SketchFab models