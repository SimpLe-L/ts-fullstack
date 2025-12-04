import type { UserInsert, UserSelect } from '@repo/shared'
import type { AxiosError } from 'axios'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useRequest } from './useRquest'

export const useGetUserQuery = () => {
  const { requestInstance } = useRequest()
  return useQuery<UserSelect[], AxiosError>({
    queryKey: ['user-list'],
    queryFn: async () => {
      const { data } = await requestInstance.get('/users')
      return data
    },
  })
}

export const useGetUserInfoQuery = (id: number) => {
  const { requestInstance } = useRequest()
  return useQuery<UserSelect[], AxiosError>({
    queryKey: ['user-info', id],
    queryFn: async () => {
      const { data } = await requestInstance.get(`/users/${id}`)
      return data
    },
  })
}

export const useCreateUserMutation = () => {
  const { requestInstance } = useRequest()
  return useMutation<UserInsert, boolean, AxiosError>({
    mutationFn: async (user) => {
      const { data } = await requestInstance.post('/users', user)
      return data
    },
    onSuccess: () => {
      const queryClient = useQueryClient()
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    },
  })
}

