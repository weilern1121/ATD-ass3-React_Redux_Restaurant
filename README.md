
# ATD-ass3- Full Stack project
Name: Tomer Kulla
ID: 308235944 <br/>
Name: Noam Weiler
ID: 203570619 <br/>

## ABOUT:

	React-Redux application for Fast-Food Review Platform.
	Support all the features as described at: 
	https://www.cs.bgu.ac.il/~majeek/atd/192/assignments/3/

## DESIGN:

* root: the project's dependencies, the web-configuration and all codes' sub-folders.
* public: holds icons, logos and photos.
* src: separated to client and server (will be described next).
* server:	Our database stored in MongoDB and contains 2 databases:
		Restaurants and users. NOTE – each restaurant holds her own reviews.
		In addition, we defined 3 schemas : one for each of our database and one for more general requests ( like user search)  		to facilitate  the mongoDB- server integration.

* client:	implemented using the MVC pattern, contains redux-store and components that contain actions, reducer, saga and enums.
		In our project we used Reactstrap framework.

		
## SERVER:
- server.js :	the main function of the server, used to initial the server (connet the mongoDB, set body-parser, 
						add API routes and port-listening initialization).
- api:			contains 3 different classes (one per each schema), each class have her own method for client requests.
- model:			contains 3 mongoose.Schema (will described below).
		
## CLIENT:
* main.js:	use initialState.js , reducers.js and sagas.js to initial a client.
* components: contains 4 components: 
	- App (include login/register).
	- Restaurants (for all the restaurant functionality, include single restaurant page).
	- RiviewPage (for represent a user review, include sort and filter of all restaurants reviews).
	- Review (for single review functionality – details, edit and delete).


## SCHEMAS: 
* defined in src/server/model , mongoose.Schema typed. <br>
* app, fields:
	- tags
* restaurant, fields:
	- name
	- location
	- average
	- reviews: (array such as every object in the array is a review):
		- username
		- bathroomRate
		- cleanRate
		- staffRate
		- driveRate
		- deliveryRate
		- foodRate
		- pic
		- date
* user, fields:
	- name
	- location
	- pic

## FEATURES:
* Each feature corporates server request and might include local usage of the received state from the server (like reviews sort).
* Each feature sends a request to the server via actions.js and catch the server’s respond via reducer.js (NOTE- actions.js and reducer.js of the correspond component, combined in the main.js during the client initialization).
* Each client’s action is dispatched to the Store via saga. The renderToReducer function in the sagas sends a promise to the sever, fetch the returned data from the server and moved it back the to the store.

* Core Features:
	- Register : required a unique user name, a location and a profile picture.
	- View profile: of other users’ information and reviews.
	- Edit profile: change user name(for a not-already taken one), location and profile picture.
	- user reviews: view own review, ability to delete\edit them.
	- Write a restaurant review: include optional picture.
	- View restaurant: include sort and filter the restaurants’ reviews. Already logged in user that  have a review in a specific restaurant can edit/delete his own review.
	- Search restaurant: empty search will provide all the restaurants in our database as a result. Search options: name, location, name and location. Each option may include filter (of average restaurant reviews rank). Another search option is the closer/better restaurant search: closer – smaller search radius, better- larger search radius (more high ranked restaurants), the results are sorter by score. 
	- search user: by user name, the result is same as ‘View profile’.
	- Login/Logout: by username.


## FLOW EXAMPLE:

**Register**
1)	**App/Register.js** : a client clicked the ‘Register’ button.

2)	**App/Register.js**: onSubmit – creating a user request object and send it via this.props.register (the register function got mapped into this.props in mapStateToProps during the connect initialization in client/main.js ).

3)	**App/actions.js**: The register function takes the user fields’ argument , parsed it into json object and send it (by axios) to the server. This specific function sends the request to the url ‘http://localhost:800/api/app/users’ . Note- we added a proxy field to the webpack.config.js to simplify the sent address.

4)	**App/saga.js**: the saga middleware catches the AppActions type (i.e. register) from previous step, wrap it with header and typeOf method and send it to the server as a yield call function. 

5)	**Server.js**: the server already routed the requests (during initialization), the ‘http://localhost:800/api/app’ assigned to ‘src/server/api/app’.

6)	**Server/api/app.js**: check that all fields are legal (otherwise send an error), check that name is not already have been taken (otherwise send an error), create a new user instance (by the UserModel schema), add it to the database and return a json to the client.

7)	**App/saga.js**:check the returned promise from the server, if it have an error message- fetch a fail message back to client (via App/actions.js) otherwise- sent the respond json from server to the App/actions.js .

8)	**App/actions.js**: [the continuation of step 3] if error occurred in the server side- dispatch an error and sent back to user. Otherwise- dispatch a register-confirmation enum object with the user json’s object.


9)	**App/reducer.js**: catch the error – and set the current client state error field to the server’s error response. Otherwise (i.e. catch a register-confirmation enum object) , set the client state’s current user to the received user, set the client state’s isConnected field to true and the isLoading to false.

10)	**App/Register.js**: [back to the beginning function] the local function componentDidUpdate check if there are any changes in the props. If error received- set the error state and print an error message to the client. Else- the new window (of the registration page) get closed.

## EXTRA FEATURES:
* Option of mixing sort and filter reviews in the same query, option to reset queries.
* Stars rank – updated on every edit/delete/add review in the restaurant.

	

## HOW TO RUN: 
* Open 2 terminal windows/cmd in the main folder.
* To Start Server:
	inside the main folder-
	run:
1.	npm install
2.	npm run server

* To Start User
	inside main folder-
	run:
1.npm install (no need if already made in server)
2.npm run dev
