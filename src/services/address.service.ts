import { api } from "@/lib/api-client";
import { Address, ResAddress } from "@/types/address";

class AddressService {
    async createAddress(data: Address) {
        return api.post('address/create', data)
    }

    async getAllAddressByUser(): Promise<{ data: { data: ResAddress[] } }> {
        return api.get('address/get-all-by-user');
    }

    async deleteAddressById(id: string) {
        return api.delete(`address/delete/${id}`);
    }
}

export default new AddressService();