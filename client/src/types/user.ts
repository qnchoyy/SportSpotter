export type User = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserPayload = {
  username?: string;
  firstName?: string;
  lastName?: string;
};
