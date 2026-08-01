import type {
  AddressResponse,
  CreateAddressInput,
  UpdateAddressInput,
  UpdateMyProfileInput,
  UserProfileResponse,
} from '@contracts/users/user.schema';

import { request } from '@/lib/http/client';

export function getMyProfile() {
  return request<UserProfileResponse>({
    method: 'GET',
    url: '/users/me',
  });
}

export function updateMyProfile(input: UpdateMyProfileInput) {
  return request<UserProfileResponse>({
    method: 'PATCH',
    url: '/users/me',
    data: input,
  });
}

export function listAddresses() {
  return request<AddressResponse[]>({
    method: 'GET',
    url: '/users/addresses',
  });
}

export function createAddress(input: CreateAddressInput) {
  return request<AddressResponse>({
    method: 'POST',
    url: '/users/addresses',
    data: input,
  });
}

export function updateAddress(id: string, input: UpdateAddressInput) {
  return request<AddressResponse>({
    method: 'PATCH',
    url: `/users/addresses/${id}`,
    data: input,
  });
}

export function deleteAddress(id: string) {
  return request<{ deleted: boolean }>({
    method: 'DELETE',
    url: `/users/addresses/${id}`,
  });
}

export function setDefaultAddress(id: string) {
  return request<AddressResponse>({
    method: 'PATCH',
    url: `/users/addresses/${id}/default`,
  });
}
