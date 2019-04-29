# Janus


## General Information
[JanusJobs](https://pip.pypa.io/en/stable/) is a job advertising site, allowing users to sign in with their Google Accounts and advertise their jobs on a message-board like site. These advertisements will have only crucial information such as employer, title, and job description, with profile images and a link to the employer's site or primary advertisement when clicked.

## Server-Side Documentation
*Note: This is a summary, for full server-side code documentation please see:*

## Client-Side Documentation
*Note: This is a summary, for full client-side code documentation please see:*

### Initial Loading
When the page initially loads, the page will send GET requests for entities relating to job postings, if this request returns empty lists then there will be a message telling the viewer that no jobs have been posted yet and they will be encouraged to post the first.

### Job Appearances
Once jobs have been successfully fetched, job postings will display on the page, these posting will reveal a job description when hovered over (or tapped on if on mobile). If during the creation of the job the user was signed in to their Google account, then their profile image will accompany the posting. Otherwise, a random profile image (a randomly coloured square) will appear instead as a default.

### Submitting Jobs
When posting a job, the user will need to input several details: job title, employer, job description, and a link to their page. Upon clicking "Submit", *index.js* will first check that no inputs were left blank and the URL is in a valid form. The only exception to this check is when a user is signed in, the employer name will automatically be set to their own account name, this is only a placeholder and can be changed however otherwise it will be used when the job has been posted.

### General Page Use and Navigation
In the top left of the navbar there is an "About Janus" button, this will lead to an expanding side bar giving a little information about the site and also containing links to the documentation.

In the top right of the navbar there are two buttons: "Post a Job" and "Sign in", the use of the job posting button is detailed in the section above. The Google sign in button will allow the user to sign into their google account, once signed in, a login message will appear under the Janus logo and the employer information will be auto filled when posting a job. Furthermore, if logged in the "Sign in" button will be replaced with a "Sign Out" to reverse the process.

All signing in is incorporated with sessions so that if a user was to sign in to their account from one location, all locations accessing the site would not also be logged on to their account. For further details please see the Server-Side documentation.

The navbar, excluding the logo and collapsible menu button, is sticky, meaning that once enough entries are on the page that scrolling is required, the buttons and search bar will remain at the top of the visible page.

### Searching Jobs
The search bar allows the user to search for jobs with any keywords or strings within the employer name or the job title. Clicking "Search All", will reveal the search results. Clicking "Search All" again when nothing is in the search bar will go back to the homepage and show all of the jobs that have been posted.

## Licensing


## Known Bugs
When hovering over a posted job, the job should expand to reveal the job description, however occasionally the most recent posting will show the description as undefined. If jobs are continued to be posted after this, the description will later appear correctly after further jobs have been posted. Similarly, if the page is refreshed the description appears correctly also.
