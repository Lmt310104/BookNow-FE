import { api } from "@/lib/api-client";

class AddressService {
    async createAddress() {
        return api.post('address/create',)
    }
}