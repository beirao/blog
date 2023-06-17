import React from 'react'
import { ERC20ABI } from '../abi/ERC20.abi.json'
import { useEffect, useState } from 'react'
import {
  useAccount,
  usePrepareContractWrite,
  useContractRead,
  useNetwork,
  useContractWrite,
} from 'wagmi'

function ApproveCard(props) {
  //   const {
  //     data: allowanceValue,
  //     isSuccess: isSuccessAllowanceRead,
  //     isLoading: isLoadingAllowanceRead,
  //   } = useContractRead({
  //     address: props.addressToken,
  //     abi: ERC20ABI,
  //     functionName: 'allowance',
  //     args: [props.addressOwner, props.addressSpender],
  //   })
  return (
    <div className="border-b py-4">
      ApproveCard {props.addressToken} {props.addressOwner} {props.addressSpender}
    </div>
  )
}

export default ApproveCard
