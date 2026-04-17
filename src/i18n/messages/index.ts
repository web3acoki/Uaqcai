import { zhMessages, type MessageKey } from './zh';
import { enMessages } from './en';

export type { MessageKey };

export const MESSAGES: Record<'zh' | 'en', Record<MessageKey, string>> = {
  zh: zhMessages as unknown as Record<MessageKey, string>,
  en: enMessages,
};
