import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { hospitalApi } from "@/lib/api/hospitals";
import {
  HospitalSearchParams,
  CreateHospitalData,
  UpdateHospitalData,
  BloodInventoryItem,
} from "@/lib/types/hospital";

export function useHospitals(params?: HospitalSearchParams) {
  return useQuery({
    queryKey: ["hospitals", params],
    queryFn: () => hospitalApi.getHospitals(params),
  });
}

export function useHospital(id: string) {
  return useQuery({
    queryKey: ["hospital", id],
    queryFn: () => hospitalApi.getHospitalById(id),
    enabled: !!id,
  });
}

export function useCreateHospital() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateHospitalData) => hospitalApi.createHospital(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useUpdateHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateHospitalData }) =>
      hospitalApi.updateHospital(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["hospital", id] });
    },
  });
}

export function useDeleteHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hospitalApi.deleteHospital(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useBloodInventory(hospitalId: string) {
  return useQuery({
    queryKey: ["bloodInventory", hospitalId],
    queryFn: () => hospitalApi.getBloodInventory(hospitalId),
    enabled: !!hospitalId,
  });
}

export function useUpdateBloodInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bloodInventory,
    }: {
      id: string;
      bloodInventory: BloodInventoryItem[];
    }) => hospitalApi.updateBloodInventory(id, bloodInventory),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospital", id] });
      queryClient.invalidateQueries({ queryKey: ["bloodInventory", id] });
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useAddBloodInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      item,
    }: {
      id: string;
      item: Omit<BloodInventoryItem, "_id">;
    }) => hospitalApi.addBloodInventoryItem(id, item),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hospital", id] });
      queryClient.invalidateQueries({ queryKey: ["bloodInventory", id] });
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}
