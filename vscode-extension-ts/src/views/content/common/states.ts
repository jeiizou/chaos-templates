import { Config } from '@/models/config/object';
import { atom } from 'recoil';

export const configState = atom<Config>({
  key: 'config',
  default: {},
});
