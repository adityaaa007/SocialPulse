import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import initialImage from "../assets/boy.png";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../services/storageService";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import databaseService from "../services/databaseService";

import {
  updateImagePath,
  updateNameAddress,
} from "../features/database/databaseSlice";
import { updateName } from "../features/auth/authSlice";

function Settings() {
  const { register, handleSubmit } = useForm();
  const uid = useSelector((state) => state.auth.userData.uid);

  const name = useSelector((state) => state.database.userDbData.name);
  const address = useSelector((state) => state.database.userDbData.address);

  const dispatch = useDispatch();

  const imagePath = useSelector((state) => state.database.userDbData.imagePath);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (imageFile) => {
    const url = await storageService.uploadFile({
      path: "user_image/" + uid,
      file: imageFile,
    });

    if (url) {
      const result = await databaseService.updateDocumentField({
        collectionId: "users",
        documentId: uid,
        field: "imagePath",
        value: url,
      });
      if (result) {
        dispatch(updateImagePath(url));
        const imageUrl = await storageService.downloadFile({ url: url });
        imageUrl && setImageUrl(imageUrl);
      }
    }
  };

  useEffect(() => {
    if (imagePath) {
      (async () => {
        const url = await storageService.downloadFile({ url: imagePath });
        url && setImageUrl(url);
      })();
    }
  }, [imagePath]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  const submitHandler = async (data) => {
    const updatedName = await databaseService.updateDocumentField({
      collectionId: "users",
      documentId: uid,
      field: "name",
      value: data.name,
    });

    const updatedAddress = await databaseService.updateDocumentField({
      collectionId: "users",
      documentId: uid,
      field: "address",
      value: data.address,
    });

    if (updatedName && updatedAddress) {
      dispatch(updateNameAddress({ name: data.name, address: data.address }));
      dispatch(updateName(data.name));
    }
  };

  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7] items-center flex-col md:flex-row">
      <Sidebar initialPage={"settings"}></Sidebar>
      <div className="flex-1 h-screen flex overflow-y-auto w-full md:w-full">
        <div className="flex flex-1 h-screen flex-col md:px-12 lg:px-32 px-4 gap-7 pt-10">
          <h1 className="font-semibold text-2xl">Account information</h1>

          <div className="flex flex-row gap-10">
            <img
              src={imageUrl ? imageUrl : initialImage}
              alt="profile-image"
              className="h-32 w-32 bg-neutral-700 rounded-3xl object-cover"
            />
            <div className="flex flex-col justify-evenly">
              <h4 className="font-semibold text-lg text-neutral-500">
                Profile picture
              </h4>
              <button
                className="py-3 px-4 rounded-md bg-primary text-white w-fit items-center flex gap-3 font-medium"
                onClick={() =>
                  document.getElementById("postImageInput").click()
                }
              >
                Change picture
                <ChevronRight color={"white"} size={20} />
                <input
                  id="postImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <FormInput
              label={"NAME"}
              placeholder={"John Cena"}
              type={"text"}
              style={"mt-4"}
              initialValue={name}
              {...register("name", { required: true })}
            ></FormInput>
            <FormInput
              label={"ADDRESS"}
              placeholder={"MP, India"}
              type={"text"}
              style={"mt-4"}
              {...register("address", { required: true })}
              initialValue={address}
            ></FormInput>

            <Button
              type="submit"
              style={"lg:w-96 w-fit mt-8 hover:bg-green-600 bg-green-500"}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
