

# Project Documentation - React Project

## Overview:

#### Project Name: Technical Forum
<ins>**_Description:_**</ins>  
  
Enable people to collaborate on Tech topics by discussing various product **updates**,**bugs**, **fixes** etc.  
**Target Audience**: IT pros, normal users  
  
<ins>**_Features included_**</ins>:
- Authentication (Login / Register / Logout)
- Logged in users can create posts, edit own posts, delete own posts, comment on posts, edit their own comments on posts and delete own comments on posts. Logged in users also have access to Admin page and can view their user credentials (email,username).
- Guest users can view home page, catalog page and details page and can login or register.



# Project structure:

/src
  /api               # Custom react hooks for authentication / CRUD operations on comments and  posts collections

  /components        # UI components
  
  /contexts          # Added UserContext.jsx to create UseContext object, in order to define the shared data that we want to provide across the component tree.

  /hooks             # useAuth and usePersistedState (custom React hooks)

  /providers         # UserProvider 
 
  /utils             #  date.js - function which accepts raw date and uses moment.js methods to format date and return the formatted date
                       request.js - function which accepts method, url, data, options properties and modifies the options object and fetches the database by using fetch() method and finally performs validation                          on the response object and conditionally returns it.
  
  /resources
    /images          # define a function which returns an object containing a list of different device categories. Each category has url property pointing to an image URL related to this category.


  /App.css           # Tailwind CSS configuration

  /App.jsx           # Wrap components in UserProvider component in order to provide context value to its children. Define Guards and Routes to components via React Route. Use React lazy loading to dynamically                         import Admin component. Use Suspense react component to display fallback jsx until the component's children have finished loading.

 /main.jsx           # Enabled client side routing via BrowserRouter component. Wrapper App component inside BrowserRouter.

# Getting Started

Project set up:

1. Install dependencies
`npm install`
2. Start application in root directory (client-app) by running cmdlet `npm run dev` in the terminal
3. Start server by navigating to `cd server` folder and run `node .\server.js` in the terminal


# Usage

Authentication: 

- User log-in: click on Login (navigation bar), enter your email and password and click Sign in.
Email address and Password are required to log-in

- User register: click on Register (navigation bar), enter email address, username, password and repeat password and then click on Register.
Validation:
Email address should consist of @ and a following part
Username must be at least 5 characters long
Password must be at least 10 characters long
Repeat password must match password

- User Logout: authenticated users can logout by clicking on the Logout button in the navigation bar. After clicking on logout button, the user credentials are no longer stored in localStorage and the navigation bar will show Login and Register options.

# Navigation:

- Home page  - Main application page. Shows users the Categories of the technologies which are discussed in the forum. Can be accessed by clicking on the left side logo on the navigation bar.

- All Posts - Lists the latest posts and gives the user the option to see each post details, by clicking on See post on the post card.

- Admin - Authenticated users can view their profile card, which includes user profile informaiton (email, username)

- Create Post:

Authenticated users can create posts by clicking on Create Post on the navigation bar.
A Create post form is shown, where users can enter Title, Image URL and Description of the post.

Note:
Title field is required
Image URL is required
Description field is required

After the above conditions are met, the user can click on Publish. After clicking on Publish, the application redirects the user to /posts page where the user can see their new post.
If the user clicks on Cancel while in the Create Post page, the application will redirect the user to the /posts page.


- Post Details page -  Lists a details page consisting of the individual post details and a Comments section below. 

- Comments:

Authenticated users create comments by filling in the Username and Comment fields in the Post a Comment card in the Post details page. When a user posts a comment, the comments appears under Comments sectio and the user has the option to Edit or Delete it.
By clicking on Edit, the user is redirected to Edit post page, where he can update the content of the comment. The form prompts the user to enter Username and Comment. Two options are available under the Edit form (Cancel and Save). If the user enters Save, application re-direct the user to the Post Details page and the updated comment can be seen in the comments section. If the user clicks on Cancel, then the application redirects the user to the details page and the comment is not modified.
By clicking on Delete comment in the Post Details page, a pop-up dialog is shown, asking the user for admitting the delete operation. After the user clicks OK, a confirm dialog is shown, and the Details page is refreshed.

- Post:
Post owners can Edit or Delete their posts from the Details page.  By clicking on Edit, the user is redirected to Edit page, where a form with the current post data is shown. The user must fill in three input fileds to Edit the post: Title, Image URL and Description. Two options are available Edit and Cancel. If the user click on Edit, the application redirects to the Details page and the updated post is shown. If the user clicks on Cancel, the application redirect to the Details page and the Original post is shown.
By Clicking on Delete Post from the Details page the post is deleted and the user is redirected to the /posts page, where the deleted post cannot be further seen.



# API Reference:

Base URL: http://localhost:3030/
Endpoints:

Authentication: 'http://localhost:3030/users'
Comments: 'http://localhost:3030/data/comments'
Posts: 'http://localhost:3030/data/posts'



