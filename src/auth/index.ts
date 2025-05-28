import { createApiClient } from "../utils/axios";
import { MagicLink } from "./providers/magic-link";
import { CustomerSession } from "./types";

class Auth {
  private apiClient: ReturnType<typeof createApiClient>;
  public magicLink: MagicLink;

  constructor(apiKey: string, proxy?: string) {
    this.apiClient = createApiClient(apiKey, proxy);
    this.magicLink = new MagicLink(this.apiClient);
  }

  async retrieveSession(id: string): Promise<CustomerSession | null> {
    const data: CustomerSession = await this.apiClient.get(
      `/auth/session/${id}`
    );
    return data;
  }
}

export default Auth;
