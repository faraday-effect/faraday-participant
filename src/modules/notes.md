# Overall Structure
- Course
  - Theme
    - Topic
      - Module

Modules can have substructure that is
specific to each module.
  - Code contains listings, notes, cue cards
  - Quiz contains questions
  - Etc. 

# Interfaces

## Preparation
- Syllabus
  - Teacher info
    - Name, title
    - Location, phone, email
    - Office hours
  - Learning outcomes
  - Description
  - Textbooks (bibliography, links)
  - Academic integrity
- Course content
  - Topics/modules
  - Associate learning outcomes
- Course schedule
  - Calendar
  - 2x75, 3x50 in same term
- Manage
  - Institution
  - Department
  - Course
  - Offering
    - Section
    - Time
    - Room
  - Calendar
    - Semester
    - Fixed dates
      - Holidays
      - Exams
  - Users
  - Permissions

## Presentation
- Podium
  - Support temporary participant view
- Participant
- Projector

## Evaluation
- Dashboard
  - Chronology/timeline
  - Attendance
- Grading

# App Containers
- User-facing
  - Single framework
  - Flash messages, etc.
  - Registration
  - Account management
- Projector
  - Probably different

# Modules
Plugins for different course elements.
Support rendering to multiple interfaces.
- Code
- Quiz
- Survey
- Q and A
- Sign-in
- Announcement
- Welcome

# Components
- Listing
- Cue card
- Prose (not for display)
- Slide (for display)
- Video
- Image
- Chart (e.g., D3)
- PDF page
- Flash
- Calendar/Clock
- Timer
- Progress

# Examples
## Quiz Module
- Preparation
  - Create quiz
  - Edit quiz
- Presentation
  - Podium
    - Start quiz
    - Stop quiz
    - Monitor progress
    - Detailed results
  - Projector
    - Progress
    - Time remaining
    - Summary results
  - Participant
    - Answer quiz
    - Summary results (?)
- Evaluation
  - Dashboard
    - Aggregate quiz results
      (e.g, three quizzes for the day)
    - Follow-up actions based on results

# Open Issues
  - How to store student responses?
  - How to version assignment/quiz
    and associated student response?
    - Version number seems clunky.
    - Quiz (e.g.): create document containing
      quiz itself (duplicate)
      and all student responses.
    - Quiz grades itself