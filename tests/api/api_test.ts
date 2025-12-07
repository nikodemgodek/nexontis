import { assert } from 'chai';


Feature('API Testing');

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  error: string
}

interface HttpResponse<T = any> {
  status: number;
  headers: Record<string, string>;
  data: T; 
}

interface NewUser {
    name: string;
    job: string;
    id: number
    createdAt: string;
}

Scenario('Scenario 1: Get list of users', async ({ I }) => {
    const pageOneDataResponse: any = await I.sendGetRequest('/users?page=1');
    assert.equal(pageOneDataResponse.status, 200);

    const usersDataPageOne: UsersResponse = pageOneDataResponse.data;
    assert.isArray(usersDataPageOne.data);
    assert.equal(usersDataPageOne.page, 1);
    assert.equal(usersDataPageOne.per_page, 6);

    const pageTwoDataResponse: any = await I.sendGetRequest('/users?page=2');
    assert.equal(pageTwoDataResponse.status, 200);

    const usersDataPageTwo: UsersResponse = pageTwoDataResponse.data;
    assert.isArray(usersDataPageTwo.data);
    assert.equal(usersDataPageTwo.page, 2);
    assert.equal(usersDataPageTwo.per_page, 6);

    const usersWithOddIdsOnPageOne = usersDataPageOne.data.filter((user: any) => user.id % 2 !== 0);
    const usersWithOddIdsOnPageTwo = usersDataPageTwo.data.filter((user: any) => user.id % 2 !== 0);
    const concatUserNames = usersWithOddIdsOnPageOne.concat(usersWithOddIdsOnPageTwo).map((user: any) => user.first_name + ' ' + user.last_name);
    assert.deepEqual(concatUserNames, ['George Bluth', 'Emma Wong', 'Charles Morris', 'Michael Lawson', 'Tobias Funke', 'George Edwards']);
});

Scenario('Scenario 2: Create a new user', async ({ I }) => {
    const newUser = {
        name: 'John Smith',
        job: 'Plumber'
    };
    const response: any = await I.sendPostRequest('/users', newUser);
    assert.equal(response.status, 201);

    const userData: NewUser = response.data;

    assert.equal(userData.name, newUser.name);
    assert.equal(userData.job, newUser.job);

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // use to assertion to fail test, prove createdAt is not tomorrow
    const createdAtDate = userData.createdAt.split('T')[0];
    assert.equal(createdAtDate, today, 'createdAt date should be today');

});

Scenario('Scenario 3: Update a user', async ({ I }) => {
    const userId = 1;
    const response: any = await I.sendPutRequest("/users/" + userId);
    assert.equal(response.status, 200);
    const currentTime = new Date().toISOString().split('T')[0];
    const tomorrowTime = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // use to assertion to fail test, prove updatedAt is not tomorrow
    const updatedAtDate = response.data.updatedAt.split('T')[0];
    assert.equal(updatedAtDate, currentTime, 'updatedAt date should be today');
});

const delays = [0,3]

delays.forEach(delay => {
    Scenario(`Scenario 4: Validate response time with delay = ${delay}`, async ({ I }) => {
        const startTime = Date.now();
        const response: any = await I.sendGetRequest('/users?delay=' + delay);
        const endTime = Date.now();
        const responseTimeInSeconds = (endTime - startTime) / 1000;
        assert.equal(response.status, 200);
        assert.isAtLeast(responseTimeInSeconds, delay, `Response time should be at least ${delay} seconds`);

        response.data.data.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.first_name} ${user.last_name}`);
        });
    });
});

Scenario('Scenario 5: Login user without password', async ({ I }) => {
    const loginData = {
        email: 'george.bluth@reqres.in'
    };
    const response: any = await I.sendPostRequest('/login', loginData);
    assert.equal(response.status, 400);

    const userData: UsersResponse = response.data;
    assert.equal(userData.error, 'Missing password');
});