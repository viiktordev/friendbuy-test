export const inputHandler = ([arg1, arg2, arg3]: string[]) => ({
  get: () => ({ key: arg2 }),
  set: () => ({ key: arg2, value: arg3 }),
  unset: () => ({ key: arg2 }),
  numequalto: () => ({ value: arg2 }),
})