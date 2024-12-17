"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Card {
  id?: number; // Allow `id` to be optional for form handling
  title: string;
  icon: string;
}

const initialCards: Card[] = [
  {
    id: 1,
    title: "Innovative Solutions",
    icon: "/image 5.png",
  },
  {
    id: 2,
    title: "Sustainable Growth",
    icon: "/image 5.png", // Example placeholder URL
  },
  {
    id: 3,
    title: "Customer Centric",
    icon: "/image 5.png", // Example placeholder URL
  },
];

const TrustedTopCompanies: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCard, setEditCard] = useState<Card | null>(null);

  const handleAddCard = (card: any) => {
    // setCards((prev) => [...prev, { id: Date.now(), ...card }]);
    console.log(card);
    setIsDialogOpen(false);
  };

  const handleEditCard = (card: Card) => {
    setCards((prev) => prev.map((item) => (item.id === card.id ? card : item)));
    setIsDialogOpen(false);
  };

  const handleDeleteCard = (id?: number) => {
    setCards((prev) => prev.filter((item) => item.id !== id));
  };

  const openAddDialog = () => {
    setEditCard(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (card: Card) => {
    setEditCard(card);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Trusted top companies</h1>
        <Button
          onClick={openAddDialog}
          className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white"
        >
          Add companies
        </Button>
      </div>
      <div className=" w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Image</th>

              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{card.title}</td>
                <td className="border px-4 py-2">
                  <div className="w-10 overflow-hidden">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={100}
                      height={100}
                    />
                  </div>
                </td>

                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => openEditDialog(card)}
                      variant="secondary"
                      className="bg-[#3DA229B3] hover:bg-[#3DA229] text-white"
                    >
                      <span>
                        <MdEdit />
                      </span>
                      <span className=" hidden md:block">Edit</span>
                    </Button>
                    <Button
                      onClick={() => handleDeleteCard(card.id)}
                      variant="destructive"
                      className="ml-2"
                    >
                      <span>
                        <MdDelete />
                      </span>
                      <span className=" hidden md:block">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editCard ? "Edit Card" : "Add Card"}</DialogTitle>
          </DialogHeader>
          <VisionCardForm
            onSubmit={editCard ? handleEditCard : handleAddCard}
            initialData={editCard || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrustedTopCompanies;

import { useForm } from "react-hook-form";

import { Input } from "../ui/input";

import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";

interface VisionCardFormProps {
  initialData?: {
    id?: number;
    title: string;
    icon: any;
  };
  onSubmit: (data: { id?: number; title: string; icon: any }) => void;
}

const VisionCardForm: React.FC<VisionCardFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: initialData || { title: "", icon: null },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.icon || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("icon", file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: { title: string; icon: any }) => {
    console.log(data);
    if (imagePreview) {
      onSubmit(data);
      reset();
      setImagePreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          {...register("title")}
          id="title"
          placeholder="Card Title"
          required
        />
      </div>
      <div>
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-gray-700"
        >
          Icon Upload
        </label>
        <input
          type="file"
          id="icon"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
          required
        />
        {imagePreview && (
          <div className="mt-2">
            <Image src={imagePreview} alt="Preview" width={100} height={100} />
          </div>
        )}
      </div>

      <div>
        <Button type="submit">
          {initialData ? "Update Card" : "Add Card"}
        </Button>
      </div>
    </form>
  );
};
