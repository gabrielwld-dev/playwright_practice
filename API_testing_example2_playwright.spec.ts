import {test, expect, request} from "@playwright/test"
import { isNumberObject } from "node:util/types";
let url = 'https://694e82ddb5bc648a93c09423.mockapi.io/api/v1/posts';

/* GET Request Validation

Send a request to retrieve a list of posts.
Verify that the response status is successful.
Check that each returned object contains id, title, and body.
Iterate through the list of returned posts.

For each post:
Verify that id is a number.
Verify that title is not empty.
Verify that body is not empty.*/

test('GET Request Validation', async({request}) => {
  const getRequest = await request.get(url);
  const listofPosts = await getRequest.json();
  expect(getRequest.status()).toBe(200);
  //id check
  for (const post of listofPosts) //check if each returned object has a property id, title and body
  {
    expect(post).toHaveProperty('id');
    if(typeof post.id != 'number')
    {
      console.log(`The post id ${post.id} is not a number.`);
    }
  }
  //title check
  for (const post of listofPosts) //check if each returned object has a property id, title and body
  {
    expect(post).toHaveProperty('title');

    if(post.title == '')
    {
      console.log(`The post id ${post.id} title is empty.`)
    }
    if(post.title.length < 5 )
    {
      console.log(`The post id ${post.id} title length is less than 5 characters.`)
    }
  }
  //body check
  for (const post of listofPosts) //check if each returned object has a property id, title and body
  {
    expect(post).toHaveProperty('body');

    if(post.body == '')
    {
      console.log(`The post id ${post.id} body is empty.`)
    }
    if(post.body == 'lol')
    {
      await getRequest.headers();
    }
  }
});

/* Conditional Logic

If a post’s title length is less than a defined minimum (for example, 5 characters):
Log a warning or mark it as invalid.

If a post’s body contains a specific keyword:
Perform an additional assertion (for example, check response headers or content type).*/

/*POST Request Validation

Send a request to create a new post using title and body.

Verify that:

The response status indicates successful creation.

The response includes a generated id.

The returned title and body match the sent data.

Conditional Response Handling

If the API returns an error status:

Assert that an error message exists in the response.

If the API returns success:

Assert that all required fields are present.

Negative Scenario

Attempt to create a post with an empty title or body.

Validate that the API responds with the appropriate error behavior.*/