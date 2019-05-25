<h1><b> HAXXOR-NEWS </b></h1>

### My implementation of the final curriculum task using ReactJS + Bootstrap since I'm not the best a stylings.

# Routes
## /
Fetches the top stories and displays them.


## /new
Fetches latest stories and displays them.


## /user/:id
Fetches user alongside user information (their submissions) and displays them.

## /submission
Fetches the submission with id passed as an 'id' parameter. (W.I.P)

# TODO:
- Asynchronously fetch & display submissions to increase loading speeds.
- Think of way to only fetch (x + (y*numOfLoadMoreClks)) submission. Would use this approach, but getting user comments involves going through <i>all</i> of their submissions, which could interfere with that logic. Since I have to parse through all to get x posts, it would still be slow. [Note: I could add a function which fetches all posts (normally) until I find x of whatever they're trying to search for, then stall the fetching, store the remainder of posts a user has made, and fetch those when necessary...]
- Implement comments and replies on stories.
- If viewing a comment submission, show post with the comment being the focus.
- Implement sync/reload button. [User: If syncing, I could parse through their current submission ids and compare with their submissions fetched, if theres a difference, update submissions shown.] [Posts: Same as user] [Note: I could look into the APIs subscriptions thing to see if something could be of use there.]
- Implement global navigation selection. (or a better one which updates well)
- Debug problems (such as when loading multiple content).
- Add a Tooltip to some badges.
- Implement filters (sorting by...)

# NOTE:
My implementations are probably pretty bad bad, still getting used to doing this on my own. I spent a lot of time with promises since I still don't fully understand how they work, so my async loading implementation might take a while.

# HOSTING:
#### https://trusting-hodgkin-b75c5f.netlify.com/

<i style="color: red"> Mobile unfriendly. Causes Brave Browser (mobile) to crash. Possibly due to all the data and components loading in... :-( </i>