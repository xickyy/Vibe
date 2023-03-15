# Backend Routes

## Users

1.
--- Create a new user
* Route/URL - "/users"
* Method - POST
* Status code - 201

2.
--- Get all users
* Route/URL - "/users"
* Method - GET
* Status code - 200

3.
--- Get a user by ID
* Route/URL - "/users/:userId"
* Method - GET
* Status code - 200

4.
--- Edit a user by ID
* Route/URL - "/users/:userId/edit"
* Method - PUT
* Status code - 200

5.
--- Delete a user by ID
* Route/URL - "/users/:userId"
* Method - DELETE
* Status code - 200

 ## Posts

 1.
--- Create a new Post
* Route/URL - "/users/:userId/posts"
* Method - POST
* Status code - 201

2.
--- Get all Posts
* Route/URL - "/users/:userId/posts"
* Method - GET
* Status code - 200

3.
--- Edit a Post by ID
* Route/URL - "/users/:userId/posts/:postId/edit"
* Method - PUT
* Status code - 200

4.
--- Delete a Post by ID
* Route/URL - "/users/:userId/posts/:postId"
* Method - DELETE
* Status code - 200

## Friend List

1.
--- Get all friends
* Route/URL - "/friend-list"
* Method - GET
* Status code - 200

2.
--- Add friend
* Route/URL - "/friend-list"
* Method - POST
* Status code - 200

3.
--- Delete friend
* Route/URL - "/friend-list/:friend_list_id"
* Method - DELETE
* Status code - 200

## Search

1.
--- Get a user by name
* Route/URL - "/get/users/?name"
* Method - GET
* Status code - 200

## Messages

1.
--- Get all messages for current user
* Route/URL - "/messages"
* Method - GET
* Status code - 200

2.
--- create message
* Route/URL - "/messages"
* Method - POST
* Status code - 200

3.
--- Delete friend
* Route/URL - "/messages/:messageId"
* Method - DELETE
* Status code - 200
