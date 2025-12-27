import {test, expect, APIRequestContext} from '@playwright/test'
let postId: string;
let weburl = 'https://694e82ddb5bc648a93c09423.mockapi.io/api/v1/posts';

test ('testPOST&GET', async({request}) => {
  const postreq = await postFunction(request, weburl, 'Buy groceries', 'Get milk, eggs, and bread');
  const jsonpost = await postreq.json();
  postId = jsonpost.id;
  
  const getreq = await getFunction(request, `${weburl}/${postId}`);
  const getjson = await getreq.json();
  const a = await getreq.body();
  expect(getreq.status()).toBe(200);
  expect(getjson.id).toBe(`${postId}`);
  expect(getjson.title).toBe('Buy groceries');
  expect(getjson.body).toBe('Get milk, eggs, and bread');
});

test ('testPUT', async({request}) => {
  const putreq = await putFunction(request, `${weburl}/${postId}`, 'koj', 'lol');
  const jsonput = await putreq.json();
  expect(jsonput.title).toBe('koj');
  expect(jsonput.body).toBe('lol');
});

test ('testDELETE', async({request}) => {
  const deletereq = await deleteFunction(request, `${weburl}/${postId}`);
  expect((await (getFunction(request, `${weburl}/${postId}`))).status()).toBe(404);
});

async function postFunction(request: APIRequestContext, web: string, title: string, body: string) {
  const postResponse = await request.post(web, {
    data: {
      title,
      body
    },
  });
  return postResponse;
}

async function getFunction(request: APIRequestContext, web: string){
  const getResponse = await request.get(web);
  return getResponse;
}

async function deleteFunction(request: APIRequestContext, web: string) {
  const deleteResponse = await request.delete(web);
  return deleteResponse;
}

async function putFunction(request: APIRequestContext, web: string, title: string, body: string) {
  const putResponse = await request.put(web, {
    data:{
    title, body
  },
  });
  return putResponse;
}