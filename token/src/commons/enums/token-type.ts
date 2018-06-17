export enum TokenTypeEnum {
  CreateAccount,
  ForgotPassword,
  Default
}

export const getValues = () => {
  const keys = Object.keys(TokenTypeEnum).filter(
    (key) => typeof TokenTypeEnum[key as any] === 'number'
  );
  return keys.map((k) => TokenTypeEnum[k as any]);
};
