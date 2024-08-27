import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { getManagedRestaurant, GetManagedRestaurantResponse } from '@/api/get-restaurant-managed'
import { Textarea } from './ui/textarea'
import { updateProfile } from '@/api/update-profile'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfile() {
  const queryClient = useQueryClient()

  const { data: storeProfile, isLoading: isLoadingStoreProfile } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity, // O staleTime é o tempo que a query pode ficar sem ser atualizada antes de ser considerada "stale" (antiga). O valor Infinity significa que a query nunca será considerada antiga
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: storeProfile?.name ?? '',
      description: storeProfile?.description ?? '',
    },
  }) // O hook useForm do React Hook Form é usado para criar um formulário controlado. O resolver zodResolver é usado para validar os dados do formulário com base no schema storeProfileSchema

  function updateProfileDataOnCache({ name, description }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  })
  
  async function handleUpdateProfile({
    name,
    description,
  }: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name,
        description,
      })
  
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis aos seus
          clientes.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3"
              disabled={isLoadingStoreProfile}
              {...register('name')}
            />
          </div>
          <div className="grid grid-cols-4 items-baseline gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3 min-h-[100px]"
              disabled={isLoadingStoreProfile}
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={isLoadingStoreProfile || isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

