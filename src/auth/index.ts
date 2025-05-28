import { createApiClient } from "../utils/axios";
import { OTP } from "./providers/otp";
import { CustomerSession } from "./types";

class Auth {
  private apiClient: ReturnType<typeof createApiClient>;
  public otp: OTP;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy, true);
    this.otp = new OTP(this.apiClient);
  }

  async retrieveSession(id: string): Promise<CustomerSession | null> {
    const data: CustomerSession = await this.apiClient.get(
      `/auth/session/${id}`
    );
    return data;
  }
}

export default Auth;
