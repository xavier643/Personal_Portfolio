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
