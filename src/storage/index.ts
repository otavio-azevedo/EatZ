import * as SecureStore from 'expo-secure-store';
import { StorageKey } from '../types';

export const saveObject = async <T>(
  key: StorageKey,
  object: T,
): Promise<void> => {
  const jsonValue = JSON.stringify(object);
  saveValue(key, jsonValue);
};

export const saveValue = async (
  key: StorageKey,
  value: string,
): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
};

export const getObject = async <T>(key: StorageKey): Promise<T | null> => {
  const jsonValue = await getValue(key);

  if (!jsonValue) return null;

  return JSON.parse(jsonValue) as T;
};

export const getValue = async (key: StorageKey): Promise<string | null> => {
  return SecureStore.getItemAsync(key);
};

export const clear = async (key: StorageKey): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};

export const getObjectOrCreate = async <T>(
  key: StorageKey,
  createFn: () => Promise<T>,
): Promise<T> => {
  const item = await getObject(key);

  if (!item) {
    const newItem = await createFn();
    await saveObject(key, newItem);
    return newItem;
  }

  return item as T;
};

export const getValueOrCreate = async (
  key: StorageKey,
  createFn: () => Promise<string>,
): Promise<string> => {
  const item = await getValue(key);

  if (!item) {
    const newItem = await createFn();
    await saveValue(key, newItem);
    return newItem;
  }

  return item;
};
