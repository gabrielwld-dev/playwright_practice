import {test, expect, APIRequestContext} from "@playwright/test"
import { request } from "node:http";

let url = 'https://694e82ddb5bc648a93c09423.mockapi.io/api/v1/posts';
let postID: string;
/*
Requirement
1. Create a Post
Endpoint: POST /posts
Body Example:
{
  "title": "My First Post",
  "body": "This is the content of my first post."
}

Assertions:
Status code 201.
Response body contains id, title, body.
title and body match what you sent.*/

test ('Testcase1: Create a Post', async({request}) => {
  const postReturn = await postFunction(request, url, 'My First Post', 'This is the content of my first post.');
  expect(postReturn.status()).toBe(201);
  const jsonpostReturn = await postReturn.json();
  postID = jsonpostReturn.id;

  expect(jsonpostReturn).toHaveProperty("id");
  expect(jsonpostReturn).toHaveProperty("title");
  expect(jsonpostReturn).toHaveProperty("body");
  expect(jsonpostReturn.title).toBe('My First Post');
  expect(jsonpostReturn.body).toBe('This is the content of my first post.');
});

async function postFunction(request: APIRequestContext, web: string, title: string, body: string) {
  const postResponse = await request.post(web, {
    data: {title, body}
  });
  return postResponse;
}

/*
Requirement
Get All Posts

Endpoint: GET /posts

Assertions:
Status code 200.
Your newly created post exists in the list (check by id).
Each post has id, title, body.
*/

test('Testcase 2: Get All Posts', async({request}) => {
  const getReturn = await getFunction(request, url);
  expect(getReturn.status()).toBe(200);
  const jsongetReturn = await getReturn.json();
  for(const post of jsongetReturn)
  {
    if(post.id == `${postID}`)
    {
      //console.log('ok');
      expect(post.id).toBe(`${postID}`);
    }
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  }
});

async function getFunction(request: APIRequestContext, web: string) {
  const getResponse = await request.get(web);
  return getResponse;
}

/*
Requirement
Update a Post

Endpoint: PUT /posts/:id

Example: Update the body

{
  "body": "This is the updated content."
}
*/

/*
Requirement
Delete a Post

Endpoint: DELETE /posts/:id

Assertions:

Status 200 or 204.

GET /posts/:id returns 404 (post no longer exists).
*/

/*
Requirement
Edge Cases

Update a post that doesn’t exist → Assert 404.

Delete a post that doesn’t exist → Assert 404.
*/