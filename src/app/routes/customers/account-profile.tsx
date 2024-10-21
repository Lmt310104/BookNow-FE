import CustomerLayout from "@/components/layouts/customer-layout";
import AccountInfo from "@/components/shared/account-info";

export default function AccountProfileRoute() {
  return (
    <CustomerLayout>
      <main className="flex flex-1 flex-col gap-6 py-6 pl-6 bg-[#f9f9f9] overflow-y-auto">
        <h1 className="text-lg font-semibold">Thong Tin Tai Khoan</h1>
        <AccountInfo />
      </main>
    </CustomerLayout>
  );
}
