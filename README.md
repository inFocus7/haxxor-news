# haxxor-news
### My implementation of the final curriculum task using ReactJS + Bootstrap since I'm not the best a stylings.

# Routes
## /
Fetches the top stories and displays them.


## /new
Fetches latest stories and displays them.


## /user/:id
Fetches user alongside user information (their submissions) and displays them.

## /submission/:id
Fetches the submission with that id. (W.I.P)

# TODO:
- Asynchronously fetch & display submissions to increase loading speeds.
- Implement comments and replies on stories
- If viewing a comment submission, show post with the comment being the focus
- Implement global navigation selection.
- Debug problems (such as when loading multiple content).
- Add a Tooltip to some badges

# NOTE:
My implementations are probably pretty bad bad, still getting used to doing this on my own. I spent a lot of time with promises since I still don't fully understand how they work, so my async loading implementation might take a while.