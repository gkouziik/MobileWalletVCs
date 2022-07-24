export type CreateWalletParamType = {
  image_url: string;
  key_management_mode: string;
  label: string;
  wallet_dispatch_type: string;
  wallet_key: string;
  wallet_name: string;
  wallet_type: string;
  wallet_webhook_urls: [];
  onCallback: (token?: string, error?: Error) => any;
};

export type CreateWalletResponseType = {
  created_at: string;
  key_management_mode: string;
  settings: {
    default_label: string;
    image_url: string;
    'wallet.dispatch_type': string;
    'wallet.id': string;
    'wallet.name': string;
    'wallet.type': string;
    'wallet.webhook_urls': [];
  };
  token: string;
  updated_at: string;
  wallet_id: string;
};
