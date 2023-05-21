const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utills/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);

    console.log(userCreated);

    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be created with exists email", async () => {
    const user1 = {
      name: "user Test 1",
      email: "usertest@email.com",
      password: "123",
    };

    const user2 = {
      name: "user Test 2",
      email: "usertest@email.com",
      password: "123",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Este email já está em uso.")
    );
  });
});
