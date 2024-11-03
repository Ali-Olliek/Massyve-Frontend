type AppConfig = {
  baseUrl: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const Config: AppConfig = {
  baseUrl: baseUrl,
};

export { Config };
