import GuestLists from "@/components/GuestLists";
import InputGuestData from "@/components/InputGuestData";

export default function page() {
  return (
    <div className="flex min-h-screen gap-10 w-full ">
      <div className="flex-1 flex justify-end">
        <InputGuestData />
      </div>
      <div className="flex-1 flex justify-start">
        <GuestLists />
      </div>
    </div>
  );
}
