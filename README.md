Project description:

- tracking of ongoing tasks
- tasks have a description, start time, end time and labels
- tasks must describe very simple or specific pieces of work
- tasks can be grouped into projects
- projects represent a larger body of work that each individual task is contributing to
- labels provide a framework for analysing time spent at various types of tasks


Features:

- tasks:
	- at the "/" route quickly add a task with an input box
	- a task page is loaded where a timer counts down from the duration entered
	- once the duration ends, the user is prompted to update the end time
	- if end time is update, the page will display a "task finished" message

- calendar view:
	- similar in design to google calendar
	- at a glance you can see ongoing tasks on a day / week / month view
	- tasks can be added or planned similar to how meetings are planned on google calendar

- dashboard:
	- view of ongoing tasks
	- interface to add new tasks and projects
	- metrics on time spent at various labels: time stealers highlighted

- project page:
	- a homepage for each project been worked on
	- detailed project description
	- Type: ongoing vs deadline
	- timeline for the project
	- displays active tasks and planned tasks
	- google drive integration to provide access to the file structure of the project


Database tables:

- tasks:
	- id (auto increment)
	- description
	- start time
	- duration (mins)
	- end time

- projects:
	- id (auto increment)
	- description
	- type
	- start time
	- end time

- labels:
	- label name
	- task

- project-tasks:
	- project name
	- task