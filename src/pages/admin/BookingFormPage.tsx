import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormItem } from "@/components/ui/FormItem";
import { Button } from "@/components/ui/button";

// Giả định dữ liệu mock đơn giản
const categories = ["Sơn móng", "Đắp gel", "Spa tay", "Spa chân", "Vẽ nail"];
const services = [
  { id: "1", name: "Sơn Gel", category: "Sơn móng", price: 200000 },
  { id: "2", name: "Đắp Gel", category: "Đắp gel", price: 300000 },
  { id: "3", name: "Spa Tay", category: "Spa tay", price: 150000 },
  // thêm các service khác
];
const staffs = [
  { id: "s1", name: "Nhân viên A" },
  { id: "s2", name: "Nhân viên B" },
];
const customers = [
  { id: "c1", fullname: "Nguyễn Văn A" },
  { id: "c2", fullname: "Trần Thị B" },
];

interface BookingFormValues {
  date: string;
  startTime: string;
  category: string;
  selectedServices: string[];
  staffId: string;
  customerId?: string;
  newCustomer?: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    dob: string;
    gender: "male" | "female" | "other";
  };
}

function BookingFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: {
      selectedServices: [],
    },
  });

  const selectedCategory = watch("category");
  const filteredServices = services.filter(
    (s) => s.category === selectedCategory
  );

  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    console.log("Booking data:", data);
  };

  const [isNewCustomer, setIsNewCustomer] = useState(false);

  return (
    <div className="px-8 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">Create Booking</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormItem label="Date" error={errors.date?.message}>
            <Input
              type="date"
              {...register("date", { required: "Date is required" })}
            />
          </FormItem>

          <FormItem label="Start Time" error={errors.startTime?.message}>
            <Input
              type="time"
              {...register("startTime", { required: "Time is required" })}
            />
          </FormItem>

          <FormItem label="Category" error={errors.category?.message}>
            <Select
              value={watch("category")}
              onValueChange={(val) => setValue("category", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem label="Staff" error={errors.staffId?.message}>
            <Select
              value={watch("staffId")}
              onValueChange={(val) => setValue("staffId", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                {staffs.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        </div>

        {selectedCategory && (
          <FormItem label="Services">
            <div className="grid grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <label key={service.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={service.id}
                    {...register("selectedServices")}
                  />
                  {service.name} ({service.price.toLocaleString()}đ)
                </label>
              ))}
            </div>
          </FormItem>
        )}

        <FormItem label="Customer">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={!isNewCustomer ? "default" : "outline"}
              onClick={() => setIsNewCustomer(false)}
            >
              Select Existing
            </Button>
            <Button
              type="button"
              variant={isNewCustomer ? "default" : "outline"}
              onClick={() => setIsNewCustomer(true)}
            >
              New Customer
            </Button>
          </div>
        </FormItem>

        {!isNewCustomer ? (
          <FormItem label="Select Customer" error={errors.customerId?.message}>
            <Select
              value={watch("customerId")}
              onValueChange={(val) => setValue("customerId", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.fullname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <FormItem label="Firstname">
                <Input {...register("newCustomer.firstname")} />
              </FormItem>
              <FormItem label="Lastname">
                <Input {...register("newCustomer.lastname")} />
              </FormItem>
            </div>
            <FormItem label="Phone">
              <Input {...register("newCustomer.phone")} />
            </FormItem>
            <FormItem label="Email">
              <Input {...register("newCustomer.email")} />
            </FormItem>
            <div className="grid grid-cols-2 gap-4">
              <FormItem label="Birthday">
                <Input type="date" {...register("newCustomer.dob")} />
              </FormItem>
              <FormItem label="Gender">
                <Select
                  value={watch("newCustomer?.gender")}
                  onValueChange={(val) =>
                    setValue("newCustomer.gender", val as any)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            </div>
          </>
        )}

        <Button type="submit" className="w-40">
          Create Booking
        </Button>
      </form>
    </div>
  );
}

export default BookingFormPage;
