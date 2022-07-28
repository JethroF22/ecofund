import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

import { Campaign, CreateCampaignFormState } from "../../types/campaign";
import { createCampaignValidationSchema } from "../../validation/forms/createCampaign";
import Button from "../common/Button";
import useCreateCampaign from "../../hooks/useCreateCampaign";

function CreateCampaignForm() {
  const { push } = useRouter();
  const { createNewCampaign } = useCreateCampaign();
  const formOptions = {
    resolver: yupResolver(createCampaignValidationSchema),
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCampaignFormState>(formOptions);
  const { acceptedFiles, getRootProps, getInputProps, isFileDialogActive } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
    });
  const inputProps = getInputProps();
  const [bannerImage, setBannerImage] = useState<File>();
  const [bannerImageError, setBannerImageError] = useState<string>();
  const [actionState, setActionState] = useState<boolean>(false);

  const onSubmit = async (formState: CreateCampaignFormState) => {
    if (bannerImage) {
      try {
        setActionState(true);
        const campaign: Campaign = {
          ...formState,
          bannerImage,
        };
        await createNewCampaign(campaign);
        push("/home");
      } catch (error) {
        console.log("error", error);
      } finally {
        setActionState(false);
      }
    } else {
      setBannerImageError("Please select a banner image");
    }
  };

  useEffect(() => {
    if (!isFileDialogActive) {
      setBannerImage(acceptedFiles[0]);
      setBannerImageError(undefined);
    }
  }, [acceptedFiles]);

  return (
    <div className="h-4/5 mt-10 w-3/5 flex flex-col items-center justify-start bg-white/40">
      <p className="my-14 text-3xl text-white">New Campaign</p>
      <form className="w-full max-w-lg">
        <div className="flex items-center justify-center -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Campaign Name
            </label>
            <input
              {...register("name")}
              className="appearance-none block w-full text-black-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="Campaign Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-black-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-black-700 focus:outline-none focus:border-gray-500"
              id="exampleFormControlTextarea1"
              rows={3}
              placeholder="Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Donation Goal
            </label>
            <div className="flex h-4/6">
              <span className="w-1/12 h-full bg-gray-300 rounded-l text-center pt-3 text-gray-500">
                $
              </span>
              <input
                {...register("campaignGoal")}
                className="appearance-none block w-full text-black-700 border border-gray-200 rounded-r py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                id="grid-city"
                type="number"
                placeholder="Donation goal (USD)"
              />{" "}
              {errors.campaignGoal && (
                <p className="text-red-500 text-xs italic">
                  {errors.campaignGoal.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div {...getRootProps()} className="w-full h-32 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Campaign Banner
            </label>
            <input
              className="hidden"
              onChange={inputProps.onChange}
              onClick={inputProps.onClick}
              type={inputProps.type}
            />
            <div className="w-full h-full bg-white cursor-pointer flex  items-center justify-center">
              {bannerImage && (
                <p className="font-bold text-gray-500 mr-5">
                  {bannerImage.name}
                </p>
              )}
              {!bannerImage && (
                <>
                  <p className="font-bold text-gray-500 mr-5">Upload image</p>
                  <FontAwesomeIcon
                    icon={faFileUpload}
                    size="2x"
                    color="#6B7280"
                  />
                </>
              )}
            </div>
            {bannerImageError && (
              <div className="text-red-500 text-xs italic">
                {bannerImageError}
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-20 items-center justify-center">
          {!actionState && (
            <Button className="w-64" onClick={handleSubmit(onSubmit)}>
              <p className="uppercase text-l">Create</p>
            </Button>
          )}
          {actionState && (
            <div className="flex items-center justify-between">
              <div className="mr-5">
                <p className="text-lg">Loading...</p>
              </div>
              <div className="w-5 h-5 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCampaignForm;
