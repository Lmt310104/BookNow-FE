import { api } from "@/lib/api-client";
import { Address } from "@/types/address";

class AddressService {
    async createAddress(data: Address) {
        return api.post('address/create', data)
    }
}

export default new AddressService();