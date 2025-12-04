export type AppConfig = {
  name: string;
  title: string;
  token?: string;
};

export type ScalarSource = {

  title: string;

  slug: string;
  url: string;

  default: boolean;
};

export type ScalarAuthentication = {
  securitySchemes: Record<string, { token: string }>;
};
