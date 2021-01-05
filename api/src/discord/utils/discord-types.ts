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
  value?: unknown;
  options: ApplicationCommandInteractionDataOption[]
}

/** @deprecated incomplete! Update!! */
export interface GuildMember {
  id: string;
  username: string;
  discriminator: string;
}
