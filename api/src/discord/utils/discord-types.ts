/* eslint-disable camelcase */

/**
 * @description A Discord interaction event
 * @see https://discord.com/developers/docs/interactions/slash-commands#interaction */
export interface Interaction {
  id: string;
  type: 1 | 2;
  data?: ApplicationCommandInteractionData;
  guild_id: string;
  channel_id: string;
  member: GuildMember;
  token: string;
  version: number;
}

export interface ApplicationCommandInteractionData {
  id: string;
  name: string;
  options?: ApplicationCommandInteractionDataOption[]
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  value?: string | number | boolean;
  options: ApplicationCommandInteractionDataOption[]
}

export interface GuildMember {
  deaf: boolean;
  is_pending: boolean;
  joined_at: string;
  mute: boolean;
  nick: string;
  pending: boolean;
  permissions: string;
  premium_since?: string;
  roles: string[];
  user: {
    avatar: string;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
  }
}
