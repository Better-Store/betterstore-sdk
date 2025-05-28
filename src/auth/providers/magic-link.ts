import { createApiClient } from "../../utils/axios";
import {
  CustomerSession,
  MagicLinkLoginParams,
  MagicLinkSignupParams,
} from "../types";

export class MagicLink {
  private apiClient: ReturnType<typeof createApiClient>;

  constructor(apiClient: ReturnType<typeof createApiClient>) {
    this.apiClient = apiClient;
  }

  async signup(params: MagicLinkSignupParams): Promise<void> {
    await this.apiClient.post("/auth/magic-link/signup", params);
  }

  async login(params: MagicLinkLoginParams): Promise<void> {
    await this.apiClient.post("/auth/magic-link/login", params);
  }

  async verify(token: string): Promise<CustomerSession> {
    const data: CustomerSession = await this.apiClient.post(
      "/auth/magic-link/verify",
      {
        token,
      }
    );
    return data;
  }
}
