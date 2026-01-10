# Real-Time Image Gallery – React Intern Assignment

## Overview

This project is a real-time image gallery application built as part of my
 React Intern assignment.
Users can view images, react using emojis, and add comments.
All interactions update instantly for all users using a real-time database.

The main goal of this project was to understand real-time state handling, clean React structure,
and proper separation of logic and UI.

---

## Setup Instructions

1. Clone the repository

git clone <your-repo-url>
cd <project-folder>

2. Install dependencies

npm install

3. Create environment variables

Create a `.env` file in the root folder and add:

VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key  
VITE_INSTANTDB_APP_ID=your_instantdb_app_id  

4. Run the project

npm run dev

The application will start on:
http://localhost:5173

---

## API Handling Strategy

Unsplash API is used to fetch images for the gallery.

- Axios is used for API calls
- API logic is kept in a separate file
- Images are fetched using React Query with pagination
- Loading and error states are handled properly

This approach keeps the UI clean and makes the API logic reusable.

---

## InstantDB Schema and Usage

InstantDB is used to handle all real-time features like reactions, comments, and feed updates.

### Reactions Table
Stores emoji reactions for images.

Fields:
- imageId (string)
- userId (string)
- type (heart, fire, clap)
- createdAt (number)

### Comments Table
Stores comments added on images.

Fields:
- imageId (string)
- userId (string)
- text (string)
- createdAt (number)

### Feed Table
Stores global activity for reactions and comments.

Fields:
- type (reaction or comment)
- reactionType (for emoji reactions)
- imageId (string)
- userId (string)
- createdAt (number)

InstantDB automatically syncs data in real time using `db.useQuery`,
so no manual subscriptions or polling are required.

---

## Key React Decisions

- Only functional components are used
- Custom hooks are created for logic (useImageInteractions, useFeed, useImages)
- UI components do not directly access the database
- Zustand is used only for small global state like user identity
- Controlled inputs are used for comments
- Components are kept small and focused

This structure makes the code easy to understand and maintain.

---

## Challenges Faced and Solutions

1. Real-time validation errors  
Initially, InstantDB queries failed due to schema mismatch.
This was fixed by checking field names and resetting tables during development.

2. Emoji count showing undefined  
Some old reaction records did not have an emoji type.
Resetting the reactions table and ensuring type is always saved fixed the issue.

3. Comment box not visible  
The issue was caused by layout and overflow problems.
Fixing flex height and positioning resolved it.

4. Reaction count only showing 0 or 1  
This happened because reactions are toggle-based per user.
Testing with multiple browser tabs confirmed correct multi-user behavior.

---

## What I Would Improve With More Time

- Add proper user names instead of IDs
- Allow users to delete their own comments
- Improve mobile responsiveness
- Add animations for feed updates
- Add pinned comments on images

---

## Final Note

This project helped me understand real-time application behavior,
React hook architecture, and debugging data-driven UI issues.
The focus was on correctness, clarity, and learning rather than visual complexity.

---

Deployed App: https://rtgi.vercel.app   



