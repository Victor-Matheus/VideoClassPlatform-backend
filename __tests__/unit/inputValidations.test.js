const users = require("../../src/models/user");
const validate = require("../../src/services/inputValidations");
const EResponseValidate = require("../../src/enums/EResponseValidate");

describe("data entry validation", () => {
  it("must return enums.EResponseValidate.valid for an email in valid format",
   () => {
    const email = "test@email.com";
    const res = validate.emailValidation(email);

    expect(res).toBe(EResponseValidate.valid);
  });

  it("must return enums.EResponseValidate.invalid for an email in an invalid format",
   () => {
    const email = "test@email";
    const res = validate.emailValidation(email);

    expect(res).toBe(EResponseValidate.invalid);
  });

  it("must return enums.EResponseValidate.valid for a name longer than two characters",
   () => {
    const name = "Robert";
    const res = validate.nameValidation(name);

    expect(res).toBe(EResponseValidate.valid);
  });

  it("must return enums.EResponseValidate.invalid for a name of less than 3 characters",
    () => {
    const name = "Hi";
    const res = validate.nameValidation(name);

    expect(res).toBe(EResponseValidate.invalid);
  });

  it("must return enums.EResponseValidate.valid for a password longer than 5 characters",
  () => {
    const password = "123456";
    const res = validate.passwordValidation(password);

    expect(res).toBe(EResponseValidate.valid);
  });

  it("must return enums.EResponseValidate.valid for a password of less than 6 characters",
  () => {
    const password = "12345";
    const res = validate.passwordValidation(password);

    expect(res).toBe(EResponseValidate.invalid);
  });
});
