/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface CampaignInterface extends ethers.utils.Interface {
  functions: {
    "campaignDeadline()": FunctionFragment;
    "campaignGoal()": FunctionFragment;
    "cancelCampaign()": FunctionFragment;
    "cancelPledge()": FunctionFragment;
    "creator()": FunctionFragment;
    "donators(uint256)": FunctionFragment;
    "hasDeadlinePassed()": FunctionFragment;
    "isSuccessful()": FunctionFragment;
    "numPledges()": FunctionFragment;
    "pledge()": FunctionFragment;
    "pledges(address)": FunctionFragment;
    "totalPledges()": FunctionFragment;
    "updateDeadlineState(bool)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "campaignDeadline",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "campaignGoal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelCampaign",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelPledge",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "creator", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "donators",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasDeadlinePassed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isSuccessful",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numPledges",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pledge", values?: undefined): string;
  encodeFunctionData(functionFragment: "pledges", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalPledges",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateDeadlineState",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "campaignDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "campaignGoal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelPledge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "creator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "donators", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasDeadlinePassed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSuccessful",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "numPledges", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pledge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pledges", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalPledges",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDeadlineState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export class Campaign extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: CampaignInterface;

  functions: {
    campaignDeadline(overrides?: CallOverrides): Promise<[BigNumber]>;

    campaignGoal(overrides?: CallOverrides): Promise<[BigNumber]>;

    cancelCampaign(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelPledge(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    creator(overrides?: CallOverrides): Promise<[string]>;

    donators(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    hasDeadlinePassed(overrides?: CallOverrides): Promise<[boolean]>;

    isSuccessful(overrides?: CallOverrides): Promise<[boolean]>;

    numPledges(overrides?: CallOverrides): Promise<[BigNumber]>;

    pledge(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pledges(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    totalPledges(overrides?: CallOverrides): Promise<[BigNumber]>;

    updateDeadlineState(
      _hasPassed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  campaignDeadline(overrides?: CallOverrides): Promise<BigNumber>;

  campaignGoal(overrides?: CallOverrides): Promise<BigNumber>;

  cancelCampaign(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelPledge(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  creator(overrides?: CallOverrides): Promise<string>;

  donators(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  hasDeadlinePassed(overrides?: CallOverrides): Promise<boolean>;

  isSuccessful(overrides?: CallOverrides): Promise<boolean>;

  numPledges(overrides?: CallOverrides): Promise<BigNumber>;

  pledge(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pledges(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalPledges(overrides?: CallOverrides): Promise<BigNumber>;

  updateDeadlineState(
    _hasPassed: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    campaignDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    campaignGoal(overrides?: CallOverrides): Promise<BigNumber>;

    cancelCampaign(overrides?: CallOverrides): Promise<void>;

    cancelPledge(overrides?: CallOverrides): Promise<void>;

    creator(overrides?: CallOverrides): Promise<string>;

    donators(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    hasDeadlinePassed(overrides?: CallOverrides): Promise<boolean>;

    isSuccessful(overrides?: CallOverrides): Promise<boolean>;

    numPledges(overrides?: CallOverrides): Promise<BigNumber>;

    pledge(overrides?: CallOverrides): Promise<void>;

    pledges(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalPledges(overrides?: CallOverrides): Promise<BigNumber>;

    updateDeadlineState(
      _hasPassed: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    campaignDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    campaignGoal(overrides?: CallOverrides): Promise<BigNumber>;

    cancelCampaign(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelPledge(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    creator(overrides?: CallOverrides): Promise<BigNumber>;

    donators(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    hasDeadlinePassed(overrides?: CallOverrides): Promise<BigNumber>;

    isSuccessful(overrides?: CallOverrides): Promise<BigNumber>;

    numPledges(overrides?: CallOverrides): Promise<BigNumber>;

    pledge(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pledges(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalPledges(overrides?: CallOverrides): Promise<BigNumber>;

    updateDeadlineState(
      _hasPassed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    campaignDeadline(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    campaignGoal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cancelCampaign(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelPledge(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    creator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    donators(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasDeadlinePassed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isSuccessful(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numPledges(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pledge(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pledges(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalPledges(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateDeadlineState(
      _hasPassed: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
