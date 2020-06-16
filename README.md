# Med-helper App

###### An embedded screenshot of the app
[Main page of Med-helper](https://drive.google.com/file/d/14amS98fDgdLjD38KxsZIfdinlbnlMDFK/view?usp=sharing)


###### Explanations of the technologies used
**Back-end**
- Ruby 2.5.1
- Rails 6.0.3

**Database**
- PostgreSQL 12.3

**Front-end**
- React 16.13.1

###### A couple paragraphs about the general approach you took
**Problem Statement**
- Too many medication.
- To be taken at different times.
- Different instructions.

**Solution**
Medication Taking App to _sort and display_ to user the time required to take their medication and when to stop.

###### Link to your user stories – who are your users, what do they want, and why?
As a medication taker, I need to record down what medication needs to be taken.
As a medication taker, I need to know how to take my medication.
As a medication taker, I need to sort out the time for each medication to be taken daily.
As a medication taker, I need a reminder/an overview of when I need to take my medication.

###### Installation instructions for any dependencies
- git clone
- cd to folder
- bundle install
- npm install
- rails db:create
- rails db:migrate
- rails s

###### wireframes – sketches of major views / interfaces in your application

![Wireframe for Med-helper](https://drive.google.com/file/d/1wNibl3FsDJczmaKAxZqwa9KVETFlwyzl/view?usp=sharing)

###### Descriptions of any unsolved problems or major hurdles you had to overcome
**unsolved problems**
- The flow is not as fluid as I intended it to but the main function is up.
- Input validation.
- Reminder
- Fine tune dates and time.

**major hurdles**
React components:
  - Needs to figure out what's parent and child.
  - Passing data in props and state.
  - Edit and Delete issues (throw errors - mainly caused by rails).
  - The basic to begin with:
    Gitbook (Thanks Akira Wong)
    React and rails app for class review (Thanks Stuart Myers).
    Checkout Tasty-ly app (Thanks Jessica).
    Heroku again (Thanks Benjamin Li again) - Missing some css for react-datepicker after loading to Heroku. CSS links from url works. Remote links doesn't work.
    Did a lot of googling and stack overflow-ing.