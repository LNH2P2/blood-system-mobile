import { addressApi } from "@/lib/api/provinces";
import { useQuery } from "@tanstack/react-query";

// Query keys
const QUERY_KEYS = {
  provinces: ["provinces"],
  districts: (provinceCode: string) => ["districts", provinceCode],
  wards: (districtCode: string) => ["wards", districtCode],
} as const;

// Hook for fetching provinces
export function useProvinces() {
  return useQuery({
    queryKey: QUERY_KEYS.provinces,
    queryFn: addressApi.getProvinces,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - provinces don't change often
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for fetching districts by province code
export function useDistricts(provinceCode: string) {
  return useQuery({
    queryKey: QUERY_KEYS.districts(provinceCode),
    queryFn: () => addressApi.getDistricts(provinceCode),
    enabled: !!provinceCode, // Only run when provinceCode is provided
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for fetching wards by district code
export function useWards(districtCode: string) {
  return useQuery({
    queryKey: QUERY_KEYS.wards(districtCode),
    queryFn: () => addressApi.getWards(districtCode),
    enabled: !!districtCode, // Only run when districtCode is provided
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
