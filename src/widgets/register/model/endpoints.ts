export const REGISTER_ENDPOINTS = {
  register: () => '/exchange/v1/registration',
  createVerificationCode: (id: string) =>
    `/exchange/v1/registration/${id}/code`,
  verify: (id: string) => `/exchange/v1/registration/${id}/verify`
}
