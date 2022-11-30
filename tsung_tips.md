### Create an instance
* `/bin/launch_tsung.sh` :use this command on jumbox to generate the ssh instance on which you will use to run tsung
* ssh into the IP in the script's output, either on jumpbox or locally
* an instance is already created, just run `ssh ec2-user@44.242.165.192` from your local machine - if this doesn't work (ssh times out), then go to EC2 console to find the new IP address of our team's tsung instance

### After SSH
* tsung_example.xml is a sample configuration file that establishes various connections to https://cs291.com
* tsung_offtherails.xml contains the actual load tests, described below
* run load test: `tsung -f <<path to configuration file>> -k start`
 * -k start opens a web interface to view statistics during and after the load test
 * to access web interface: http://<<ip of ssh>>:8091
* after testing, copy logs to local if necessary: `rsync -auvL <<ip of ssh>>:tsung_logs .`

### Generating Graphics
* `ssh ec2-user@44.242.165.192` - if this doesn't work (ssh times out), then go to EC2 console to find the new IP address of our team's tsung instance
* run the load test and wait for it to complete
* plotting one configuration: `tsplot -d graphs <<name (ex: with optimization)>> tsung_logs/<<timestamp>>/tsung.log && cd graphs`
* comparing 2 (or more) configurations: `tsplot -d graphs <<name>> tsung_logs/<<timestamp1>>/tsung.log <<name2>> tsung_logs/<<timestamp2>>/tsung.log`
* on your local machine, run: `rsync -auvL ec2-user@44.242.165.192:/home/ec2-user/.tsung/log/<<timestamp>>/graphs .`
* files we should put in the report:
  * `http.png`: plots http requests per second based on status codes
  * `connected.png`: simultaneous connected users
  * `request_count.png`: similar to `http.png` but only plots cumulative number of requests per second
  * `request_mean.png`: mean duration of requests

### Testing Strategy
#### Phase 1 - Testing Individual Sessions
* __Objective: test user patterns in isolation to identify bottlenecks in our application__
* Each session models a sequence of actions a visitor to our website may take.
* 5 sessions are included in the tsung xml file
* Each session should be tested individually - (comment out the other sessions before running tsung)
* Inital run should be on an unoptimized version of our web app
* After analyzing results, rerun the session on optimized versions of our web application (ex: with vertical/horizontal scaling, caching, pagination, N + 1 query problem)
* What order should the optimizations be applied in? Vertical/horizontal scaling first, then identify bottlenecks and apply the appropriate optimization(s)
* In the tsung output logs, look for 500 and 502 requests, page response times, concurrent users, and anything else that may be included in the report or indicates a bug with our frontend (ex: 400s errors)


#### Phase 2 - Cumulative Load Testing
* __Objective: test performance of web application in a real-world usage scenario__
* Tsung test should include all sessions, each assigned a weight based on our guess of the relative commonality of each user behavior
* Initial run should be on an unoptimized version of our web app
* After analyzing results, rerun on our web app with all optimizations active
* Compare metrics from the two runs and record the improvement in terms of response times and number of maximum supported users


### Session Information
#### Session 1
This session simulates a user browsing through the items on the home page.
1. User visits home page (/)
2. User visits login page (/auth)
3. User logs in with a randomly selected credential (will redirect to /) or credentials that are already seeded in the database
4. User waits between 5 - 10 seconds
5. User logs out


#### Session 2
This session simulates an unauthenticated user browsing through the items on the home page.
1. User visits home page
2. User waits between 5 - 10 seconds
3. User logs out

#### Session 3
This session simulates an authenticated user viewing and purchasing one item, then looking at their purchase history.
1. User visits home page
2. User visits login page and logs in
3. User waits between 5 - 10 seconds
4. User accesses the page for the first item
5. User adds 1 of the first item to the cart (redirected to cart page)
6. User checks out
7. User waits 5 seconds
8. User logs out


#### Session 4
This session simulates an authenticated user creating, updating, and deleting a new item listing.
1. User visits home page
2. User visits login page and logs in
3. User uploads their item
4. Wait 1 second
5. User updates their item
6. Wait 1 second
7. User deletes their item
8. User logs out


#### Session 5
This session simulates an authenticated user leaving a review, editing their review, then deleting it.
1. User visits home page
2. User visits login page and logs in
3. User access the page for the first item
4. User uploads a review
5. Wait 5 seconds
6. User edits their review
7. Wait 5 seconds
8. User deletes their review
9. User logs out


### Questions
1. How to get id of the recently added item in Tsung?
2. How to make it so that GET requests actually renders the webpage html instead of just returning the JSON?

### explaining tsplot output
* statistics before and after
* what the axes represent
* discuss results from load testing

